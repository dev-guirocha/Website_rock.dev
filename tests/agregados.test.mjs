import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resumoAssessoria, resumoPme, ultimosMeses } from '../src/lib/agregados.js';
import { htmlRanking, htmlCategorias, rotulosMes } from '../src/lib/tabelas.js';

const P = (mes, captacao, receita, clientes) => ({ mes, captacao, receita, clientes });
const fxA = {
  meses: ['2026-01', '2026-02', '2026-03'],
  assessores: [
    { id: 'A', nome: 'Assessor A', serie: [P('2026-01', 100, 10, 5), P('2026-02', -50, 20, 5), P('2026-03', 200, 30, 6)] },
    { id: 'B', nome: 'Assessor B', serie: [P('2026-01', 300, 5, 2), P('2026-02', 0, 5, 2), P('2026-03', -100, 10, 4)] },
  ],
};
const fxP = {
  meses: ['2026-01', '2026-02'],
  categorias: [
    { id: 'x', nome: { pt: 'Xis', en: 'Ex' }, serie: [{ mes: '2026-01', vendas: 100, custo: 60 }, { mes: '2026-02', vendas: 200, custo: 100 }] },
    { id: 'y', nome: { pt: 'Ípsilon', en: 'Why' }, serie: [{ mes: '2026-01', vendas: 50, custo: 40 }, { mes: '2026-02', vendas: 50, custo: 20 }] },
  ],
};

test('ultimosMeses corta do fim', () => {
  assert.deepEqual(ultimosMeses(fxA.meses, 2), ['2026-02', '2026-03']);
  assert.deepEqual(ultimosMeses(fxA.meses, 12), fxA.meses);
});

test('resumoAssessoria soma o período e ordena o ranking', () => {
  const r = resumoAssessoria(fxA, { n: 2 });
  assert.equal(r.captacao, 50);
  assert.equal(r.receita, 65);
  assert.equal(r.clientes, 10);
  assert.equal(r.receitaPorCliente, 4);
  assert.deepEqual(r.ranking.map((a) => [a.id, a.captacao]), [['A', 150], ['B', -100]]);
  assert.deepEqual(resumoAssessoria(fxA, { n: 3 }).ranking.map((a) => a.captacao), [250, 200]);
});

test('resumoAssessoria filtra por assessor e recusa id desconhecido', () => {
  const r = resumoAssessoria(fxA, { n: 3, assessor: 'B' });
  assert.equal(r.captacao, 200);
  assert.equal(r.ranking.length, 1);
  assert.throws(() => resumoAssessoria(fxA, { assessor: 'Z' }), /desconhecido/);
});

test('resumoPme calcula margem e margem %', () => {
  const r = resumoPme(fxP);
  assert.equal(r.vendas, 400);
  assert.equal(r.custo, 220);
  assert.equal(r.margem, 180);
  assert.equal(r.margemPct, 45);
  assert.deepEqual(r.porCategoria.map((c) => [c.id, c.vendas, c.margem]), [['x', 300, 140], ['y', 100, 40]]);
  assert.equal(resumoPme(fxP, { n: 1, categoria: 'y' }).margemPct, 60);
  assert.throws(() => resumoPme(fxP, { categoria: 'z' }), /desconhecida/);
});

test('tabelas geram linhas com data-attributes e escapam texto', () => {
  const ranking = resumoAssessoria(fxA, { n: 2 }).ranking;
  const html = htmlRanking(ranking, 'pt');
  assert.equal(html.split('<tr data-assessor=').length - 1, 2);
  assert.match(html, /<td class="num negativo">/);
  assert.match(htmlCategorias(resumoPme(fxP).porCategoria, 'en'), /data-categoria="y"><th scope="row">Why</);
  assert.match(htmlRanking([{ id: 'X', nome: '<b>', captacao: 1 }], 'pt'), /&lt;b&gt;/);
  assert.deepEqual(rotulosMes([{ mes: '2026-03', captacao: 1000 }], 'captacao', 'pt').map((r) => r.texto), ['mar/26']);
});

test('ultimosMeses recusa período inválido', () => {
  for (const n of [0, -1, NaN]) assert.throws(() => ultimosMeses(fxA.meses, n), /período inválido/);
});

test('resumos recusam período vazio e série sem mês do período', () => {
  assert.throws(() => resumoAssessoria({ meses: [], assessores: fxA.assessores }), /sem meses/);
  assert.throws(() => resumoPme({ meses: [], categorias: fxP.categorias }), /sem meses/);
  const semFev = { meses: fxA.meses, assessores: [{ id: 'A', nome: 'A', serie: [P('2026-01', 1, 1, 1), P('2026-03', 1, 1, 1)] }] };
  assert.throws(() => resumoAssessoria(semFev, { n: 3 }), /mês ausente na série de A: 2026-02/);
  const pmeSem = { meses: fxP.meses, categorias: [{ id: 'x', nome: 'X', serie: [{ mes: '2026-01', vendas: 1, custo: 0 }] }] };
  assert.throws(() => resumoPme(pmeSem), /mês ausente/);
});

test('ranking e categorias desempatam por código, não por localeCompare', () => {
  const d = { meses: ['2026-01'], assessores: [
    { id: 'a', nome: 'a', serie: [P('2026-01', 10, 0, 0)] },
    { id: 'B', nome: 'B', serie: [P('2026-01', 10, 0, 0)] },
  ] };
  assert.deepEqual(resumoAssessoria(d).ranking.map((a) => a.id), ['B', 'a']);
  const c = { meses: ['2026-01'], categorias: [
    { id: 'a', nome: 'a', serie: [{ mes: '2026-01', vendas: 5, custo: 1 }] },
    { id: 'B', nome: 'B', serie: [{ mes: '2026-01', vendas: 5, custo: 1 }] },
  ] };
  assert.deepEqual(resumoPme(c).porCategoria.map((x) => x.id), ['B', 'a']);
});
