import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const PASTA = 'src/textos';
const arquivos = readdirSync(PASTA).filter((f) => f.endsWith('.json'));

function coletar(no, caminho, out) {
  if (Array.isArray(no)) no.forEach((n, i) => coletar(n, `${caminho}[${i}]`, out));
  else if (no && typeof no === 'object') {
    const chaves = Object.keys(no);
    if (chaves.includes('pt') || chaves.includes('en')) out.push({ caminho, no });
    else chaves.forEach((k) => coletar(no[k], `${caminho}.${k}`, out));
  }
}

test('todo texto bilíngue tem pt e en não vazios', () => {
  const achados = [];
  for (const f of arquivos) coletar(JSON.parse(readFileSync(join(PASTA, f), 'utf8')), f, achados);
  assert.ok(achados.length > 0, 'nenhum texto bilíngue conferido');
  const ruins = achados.filter(({ no }) =>
    Object.keys(no).sort().join() !== 'en,pt' || ['pt', 'en'].some((l) => typeof no[l] !== 'string' || no[l].trim() === ''));
  assert.deepEqual(ruins.map((r) => r.caminho), []);
  console.log(`# textos bilíngues conferidos: ${achados.length} em ${arquivos.length} arquivos`);
});

test('a checagem pega texto sem tradução (prova que não é vazia)', () => {
  const achados = [];
  coletar({ a: { pt: 'x' } }, 'fixture', achados);
  assert.equal(achados.length, 1);
  assert.notEqual(Object.keys(achados[0].no).sort().join(), 'en,pt');
});
