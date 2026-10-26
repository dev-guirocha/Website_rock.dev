import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const SCRIPT = resolve('scripts/crivo.mjs');

function montar(arquivos) {
  const raiz = mkdtempSync(join(tmpdir(), 'crivo-'));
  for (const [rel, texto] of Object.entries(arquivos)) {
    mkdirSync(dirname(join(raiz, rel)), { recursive: true });
    writeFileSync(join(raiz, rel), texto);
  }
  return raiz;
}

function rodar(raiz, termos, extra = {}) {
  const lista = join(raiz, 'lista.txt');
  if (termos) writeFileSync(lista, termos.join('\n') + '\n');
  return spawnSync(process.execPath, [SCRIPT], {
    encoding: 'utf8',
    env: { ...process.env, CI: '', CRIVO_RAIZ: raiz, CRIVO_LISTA: termos ? lista : join(raiz, 'nao-existe.txt'), ...extra },
  });
}

test('acusa termo da lista presente como palavra inteira', () => {
  const r = rodar(montar({ 'src/a.json': '{"t":"abacaxi maduro"}' }), ['abacaxi']);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stderr, /"abacaxi"/);
});

test('não acusa termo que só aparece dentro de outra palavra', () => {
  const r = rodar(montar({ 'src/a.json': '{"t":"abacaxi maduro"}' }), ['abac']);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /1 termos × 1 arquivos conferidos/);
});

test('acusa CPF em qualquer arquivo varrido', () => {
  const cpf = ['123', '456', '789'].join('.') + '-09';
  const r = rodar(montar({ 'docs/n.md': `doc ${cpf}` }), ['abacaxi']);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stderr, /CPF/);
});

test('acusa e-mail fora da lista permitida e aceita o e-mail do site', () => {
  const alheio = 'fulano' + '@' + 'exemplo.com.br';
  assert.equal(rodar(montar({ 'src/a.astro': alheio }), ['abacaxi']).status, 1);
  assert.equal(rodar(montar({ 'src/a.astro': 'dev.guirocha' + '@' + 'gmail.com' }), ['abacaxi']).status, 0);
});

test('acusa link de WhatsApp no dist com número diferente do contato.json', () => {
  const contato = JSON.stringify({ whatsapp: '5511900000001' });
  const igual = montar({ 'src/config/contato.json': contato, 'dist/index.html': 'wa.me/5511900000001?text=oi' });
  const outro = montar({ 'src/config/contato.json': contato, 'dist/index.html': 'wa.me/5511900000002?text=oi' });
  assert.equal(rodar(igual, ['abacaxi']).status, 0);
  const r = rodar(outro, ['abacaxi']);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stderr, /WhatsApp/);
});

test('sem lista: falha fora do CI e roda só os genéricos no CI', () => {
  const raiz = montar({ 'src/a.json': '{}' });
  assert.equal(rodar(raiz, null).status, 1);
  const noCi = rodar(raiz, null, { CI: 'true' });
  assert.equal(noCi.status, 0, noCi.stdout + noCi.stderr);
  assert.match(noCi.stdout + noCi.stderr, /só padrões genéricos/);
});

test('zero arquivo conferido é falha', () => {
  const r = rodar(montar({ 'outra/x.txt': 'nada' }), ['abacaxi']);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /nenhum arquivo conferido/);
});

test('termo com metacaractere de regex é tratado como literal', () => {
  const sem = rodar(montar({ 'src/a.json': '{"t":"abc"}' }), ['a.c']);
  assert.equal(sem.status, 0, sem.stdout + sem.stderr);
  const com = rodar(montar({ 'src/a.json': '{"t":"a.c"}' }), ['a.c']);
  assert.equal(com.status, 1, com.stdout + com.stderr);
});

test('a fronteira de palavra trata letra não ASCII como letra', () => {
  const colado = rodar(montar({ 'src/a.json': '{"t":"ação"}' }), ['a']);
  assert.equal(colado.status, 0, colado.stdout + colado.stderr);
  const isolado = rodar(montar({ 'src/a.json': '{"t":"vá a ação"}' }), ['a']);
  assert.equal(isolado.status, 1, isolado.stdout + isolado.stderr);
});

test('falha fechada: sem conseguir ler o git log, o crivo falha', () => {
  const raiz = montar({ 'src/a.json': '{}', 'lista.txt': 'abacaxi\n' });
  const r = spawnSync(process.execPath, [SCRIPT], {
    encoding: 'utf8',
    cwd: raiz,
    env: { ...process.env, CI: '', CRIVO_RAIZ: '', CRIVO_LISTA: join(raiz, 'lista.txt'), GIT_CEILING_DIRECTORIES: dirname(raiz) },
  });
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stderr, /não consegui ler as mensagens de commit/);
});

test('nome de imagem com @ (ex.: 2x) não é e-mail', () => {
  const r = rodar(montar({ 'src/a.astro': 'logo' + '@' + '2x.png' }), ['abacaxi']);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test('sem CRIVO_LISTA, lê a lista pelo .crivo-lista na raiz', () => {
  const raiz = montar({ 'src/a.json': '{"t":"abacaxi maduro"}', 'lista.txt': 'abacaxi\n' });
  writeFileSync(join(raiz, '.crivo-lista'), join(raiz, 'lista.txt') + '\n');
  const git = (...a) => spawnSync('git', ['-c', 'user.email=t@t.t', '-c', 'user.name=t', ...a], { cwd: raiz, encoding: 'utf8' });
  git('init', '-q', '-b', 'main');
  git('commit', '-q', '--allow-empty', '-m', 'inicio');
  const r = spawnSync(process.execPath, [SCRIPT], {
    encoding: 'utf8',
    cwd: raiz,
    env: { ...process.env, CI: '', CRIVO_RAIZ: '', CRIVO_LISTA: '', GIT_CEILING_DIRECTORIES: dirname(raiz) },
  });
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stderr, /"abacaxi"/);
  assert.match(r.stdout, /1 termos/);
});

test('.crivo-lista gravado com BOM continua funcionando', () => {
  const raiz = montar({ 'src/a.json': '{"t":"abacaxi maduro"}', 'lista.txt': 'abacaxi\n' });
  writeFileSync(join(raiz, '.crivo-lista'), '\uFEFF' + join(raiz, 'lista.txt') + '\n');
  const git = (...a) => spawnSync('git', ['-c', 'user.email=t@t.t', '-c', 'user.name=t', ...a], { cwd: raiz, encoding: 'utf8' });
  git('init', '-q', '-b', 'main');
  git('commit', '-q', '--allow-empty', '-m', 'inicio');
  const r = spawnSync(process.execPath, [SCRIPT], {
    encoding: 'utf8',
    cwd: raiz,
    env: { ...process.env, CI: '', CRIVO_RAIZ: '', CRIVO_LISTA: '', GIT_CEILING_DIRECTORIES: dirname(raiz) },
  });
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stderr, /"abacaxi"/);
});
