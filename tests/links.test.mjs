import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { todosHtml } from './_dist.mjs';

const redirects = JSON.parse(readFileSync('src/data/redirects.json', 'utf8'));
const rotas = JSON.parse(readFileSync('src/data/rotas.json', 'utf8'));

function existe(caminho, raiz = 'dist') {
  const limpo = decodeURI(caminho.split(/[?#]/)[0]);
  const alvo = join(raiz, limpo);
  if (limpo.endsWith('/')) return existsSync(join(alvo, 'index.html'));
  return (existsSync(alvo) && statSync(alvo).isFile()) || existsSync(join(alvo, 'index.html'));
}

function arquivoDe(caminho, raiz) {
  const limpo = decodeURI(caminho.split(/[?#]/)[0]);
  const alvo = join(raiz, limpo);
  if (limpo.endsWith('/')) return join(alvo, 'index.html');
  return existsSync(alvo) && statSync(alvo).isFile() ? alvo : join(alvo, 'index.html');
}

function linksQuebrados(arquivosHtml, raiz = 'dist') {
  const problemas = [];
  let conferidos = 0;
  for (const f of arquivosHtml) {
    const html = readFileSync(f, 'utf8');
    const alvos = [];
    for (const m of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) alvos.push(m[1]);
    for (const m of html.matchAll(/content="\d+;\s*url=(\/(?!\/)[^"]*)"/g)) alvos.push(m[1]);
    for (const m of html.matchAll(/href="([^"]*)"/g)) {
      const h = m[1];
      conferidos++;
      if (h.startsWith('#')) alvos.push(h);
      else if (!/^(\/|https?:|mailto:|tel:)/.test(h)) problemas.push(`${f}: href relativo: ${h}`);
    }
    for (const alvo of alvos) {
      if (!alvo.startsWith('#')) conferidos++;
      const [caminho, ancora] = [alvo.split('#')[0], alvo.includes('#') ? alvo.split('#')[1] : null];
      if (caminho && !existe(alvo, raiz)) { problemas.push(`${f}: inexistente: ${alvo}`); continue; }
      if (ancora) {
        const destino = caminho ? arquivoDe(alvo, raiz) : f;
        if (!existsSync(destino) || !readFileSync(destino, 'utf8').includes(`id="${ancora}"`)) problemas.push(`${f}: âncora sem id: ${alvo}`);
      }
    }
  }
  return { problemas, conferidos };
}

test('a checagem de link acusa caminho inexistente', () => {
  assert.equal(existe('/nao-existe/'), false);
  assert.equal(existe('/'), true);
});

test('linksQuebrados acusa inexistente, relativo e âncora sem id', () => {
  const raiz = mkdtempSync(join(tmpdir(), 'links-'));
  writeFileSync(join(raiz, 'index.html'), '<a href="/nao-existe/">a</a><a href="relativo/">b</a><a href="/#sem-id">c</a><a href="/">ok</a>');
  const { problemas } = linksQuebrados([join(raiz, 'index.html')], raiz);
  assert.equal(problemas.length, 3, problemas.join(', '));
  assert.ok(problemas.some((p) => p.includes('inexistente: /nao-existe/')));
  assert.ok(problemas.some((p) => p.includes('relativo: relativo/')));
  assert.ok(problemas.some((p) => p.includes('âncora sem id: /#sem-id')));
});

test('nenhum link interno quebrado no dist', () => {
  const { problemas, conferidos } = linksQuebrados(todosHtml());
  assert.ok(conferidos > 0, 'nenhum link conferido');
  assert.deepEqual(problemas, []);
  console.log(`# links internos conferidos: ${conferidos}`);
});

test('destinos dos redirects são caminhos simples e o canonical é absoluto sem fragmento', () => {
  for (const [antiga, destino] of Object.entries(redirects)) {
    assert.match(destino, /^\/[a-z0-9/_-]*(#[a-z0-9_-]+)?$/, antiga);
    const html = readFileSync(join('dist', antiga), 'utf8');
    const c = html.match(/<link rel="canonical" href="([^"]*)"/)[1];
    assert.match(c, /^https:\/\/squadrockdev\.com\.br\//, antiga);
    assert.ok(!c.includes('#'), `${antiga}: canonical com fragmento`);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/, antiga);
  }
});

test('os 17 redirects existem, têm noindex e apontam para rota existente', () => {
  assert.equal(Object.keys(redirects).length, 17);
  for (const [antiga, destino] of Object.entries(redirects)) {
    const f = join('dist', antiga);
    assert.ok(existsSync(f), `${f} não existe`);
    const html = readFileSync(f, 'utf8');
    assert.match(html, /<meta name="robots" content="noindex, follow">/, antiga);
    assert.ok(html.includes(`url=${destino}"`), `${antiga} não aponta para ${destino}`);
    assert.ok(existe(destino), `destino inexistente: ${destino}`);
  }
});

test('o sitemap lista as 11 rotas nos 2 idiomas', () => {
  const xml = readFileSync('dist/sitemap.xml', 'utf8');
  assert.equal(rotas.length, 11);
  assert.equal(xml.split('<loc>').length - 1, 22);
  assert.doesNotMatch(xml, /\.html</);
  assert.match(xml, /<loc>https:\/\/squadrockdev\.com\.br\/en\/demos\/assistente-ia\/<\/loc>/);
  assert.match(readFileSync('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/squadrockdev\.com\.br\/sitemap\.xml/);
});
