import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gerarAssessoria, gerarPme, mulberry32, MESES } from '../scripts/gerar-demos.mjs';

const ler = (f) => readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const serializar = (x) => JSON.stringify(x, null, 2) + '\n';

test('o PRNG é determinístico', () => {
  const a = mulberry32(42), b = mulberry32(42);
  assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
  assert.notDeepEqual([mulberry32(1)()], [mulberry32(2)()]);
});

test('os JSON versionados são idênticos ao que o gerador produz', () => {
  assert.equal(ler('src/data/demos/assessoria.json'), serializar(gerarAssessoria()));
  assert.equal(ler('src/data/demos/pme.json'), serializar(gerarPme()));
});

test('assessoria: 8 assessores fictícios × 12 meses', () => {
  const d = gerarAssessoria();
  assert.equal(d.ficticio, true);
  assert.equal(d.nome, 'Assessoria Horizonte');
  assert.deepEqual(d.meses, MESES);
  assert.equal(MESES.length, 12);
  assert.deepEqual(d.assessores.map((a) => a.nome), 'ABCDEFGH'.split('').map((l) => `Assessor ${l}`));
  for (const a of d.assessores) {
    assert.deepEqual(a.serie.map((p) => p.mes), MESES);
    for (const p of a.serie) {
      assert.ok(Number.isInteger(p.captacao) && Number.isInteger(p.receita) && Number.isInteger(p.clientes));
      assert.ok(p.clientes >= 10 && p.receita > 0);
    }
  }
  console.log(`# pontos conferidos: ${d.assessores.length * MESES.length}`);
});

test('pme: 4 categorias × 12 meses com custo menor que a venda', () => {
  const d = gerarPme();
  assert.equal(d.nome, 'Café & Cia');
  assert.deepEqual(d.categorias.map((c) => c.id), ['bebidas', 'salgados', 'doces', 'graos']);
  for (const c of d.categorias) for (const p of c.serie) assert.ok(p.custo > 0 && p.custo < p.vendas, `${c.id} ${p.mes}`);
});
