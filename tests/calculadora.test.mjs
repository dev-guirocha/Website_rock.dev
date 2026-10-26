import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcular, LIMITES } from '../src/lib/calculadora.js';
import { pagina, LANGS } from './_dist.mjs';
import { moeda } from '../src/lib/formato.js';

test('calcula custo mensal e anual', () => {
  assert.deepEqual(calcular({ horasMes: 20, custoHora: 80, pessoas: 3 }), { custoMensal: 4800, custoAnual: 57600, mesesRetorno: null, semInvestimento: true });
});

test('retorno em meses com uma casa', () => {
  assert.equal(calcular({ horasMes: 20, custoHora: 80, pessoas: 3, investimento: 9600 }).mesesRetorno, 2);
  assert.equal(calcular({ horasMes: '10', custoHora: '70', pessoas: '1', investimento: '1000' }).mesesRetorno, 1.4);
});

test('sem investimento ou com custo zero não há retorno', () => {
  assert.equal(calcular({ horasMes: 20, custoHora: 80, pessoas: 3, investimento: '' }).mesesRetorno, null);
  assert.equal(calcular({ horasMes: 0, custoHora: 80, pessoas: 3, investimento: 1000 }).mesesRetorno, null);
});

test('entrada negativa ou não numérica falha', () => {
  assert.throws(() => calcular({ horasMes: -1, custoHora: 80, pessoas: 3 }), /inválida/);
  assert.throws(() => calcular({ horasMes: 'abc', custoHora: 80, pessoas: 3 }), /inválida/);
});

test('a página já mostra o resultado do padrão sem JS', () => {
  for (const lang of LANGS) assert.ok(pagina(lang, 'calculadora/').includes(moeda(4800, lang)), lang);
});

test('vazio, nulo ou ausente nos três obrigatórios é inválido', () => {
  const base = { horasMes: 20, custoHora: 80, pessoas: 3 };
  for (const campo of ['horasMes', 'custoHora', 'pessoas']) {
    for (const vazio of ['', null, undefined]) assert.throws(() => calcular({ ...base, [campo]: vazio }), /inválida/, `${campo} ${vazio}`);
  }
});

test('acima do limite falha', () => {
  assert.deepEqual(LIMITES, { horasMes: 744, custoHora: 100000, pessoas: 10000, investimento: 1e9 });
  assert.throws(() => calcular({ horasMes: 745, custoHora: 80, pessoas: 3 }), /inválida/);
  assert.throws(() => calcular({ horasMes: 20, custoHora: 100001, pessoas: 3 }), /inválida/);
  assert.throws(() => calcular({ horasMes: 20, custoHora: 80, pessoas: 10001 }), /inválida/);
  assert.throws(() => calcular({ horasMes: 20, custoHora: 80, pessoas: 3, investimento: 2e9 }), /inválida/);
});

test('com os quatro no máximo o resultado é finito', () => {
  const r = calcular(LIMITES);
  assert.ok(Number.isFinite(r.custoMensal) && Number.isFinite(r.custoAnual) && Number.isFinite(r.mesesRetorno));
});

test('custo zero com investimento informado: sem retorno, mas não é falta de investimento', () => {
  const r = calcular({ horasMes: 0, custoHora: 80, pessoas: 3, investimento: 1000 });
  assert.equal(r.semInvestimento, false);
  assert.equal(r.mesesRetorno, null);
  assert.equal(calcular({ horasMes: 1, custoHora: 1, pessoas: 1 }).semInvestimento, true);
});

test('a página não duplica o aria-live e aceita meia hora', () => {
  for (const lang of LANGS) {
    const h = pagina(lang, 'calculadora/');
    assert.ok(!h.includes('aria-live'), lang);
    assert.match(h, /name="horasMes"[^>]*step="any"/, lang);
    assert.match(h, /name="horasMes"[^>]*max="744"/, lang);
  }
});
