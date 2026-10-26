import { test } from 'node:test';
import assert from 'node:assert/strict';
import { moeda, compacto, numero, pct, mesCurto } from '../src/lib/formato.js';
import { esc, jsonEmbutido } from '../src/lib/html.js';

const norm = (s) => s.replace(/\s/g, ' ');

test('moeda em real nos dois idiomas', () => {
  assert.equal(norm(moeda(1234, 'pt')), 'R$ 1.234');
  assert.equal(norm(moeda(1234, 'en')), 'R$1,234');
  assert.equal(norm(moeda(12.5, 'pt', 2)), 'R$ 12,50');
});

test('compacto abrevia milhões', () => {
  assert.match(norm(compacto(1234567, 'pt')), /^R\$ ?1,2 ?mi$/);
  assert.match(norm(compacto(1234567, 'en')), /^R\$1\.2M$/);
  assert.match(norm(compacto(-250000, 'pt')), /^-.*250/);
});

test('numero, pct e mesCurto', () => {
  assert.equal(norm(numero(1234567, 'pt')), '1.234.567');
  assert.equal(pct(12.34, 'pt'), '12,3%');
  assert.equal(pct(12.34, 'en'), '12.3%');
  assert.equal(mesCurto('2026-03', 'pt'), 'mar/26');
  assert.equal(mesCurto('2026-03', 'en'), 'Mar 26');
});

test('esc escapa HTML', () => {
  assert.equal(esc(`<a href="x">'&'</a>`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;');
});

test('jsonEmbutido não deixa <, > nem & literais e preserva o valor', () => {
  const v = { a: '</script><b>&' };
  const j = jsonEmbutido(v);
  assert.ok(!/[<>&]/.test(j), j);
  assert.deepEqual(JSON.parse(j), v);
});

test('formato recusa idioma desconhecido', () => {
  assert.throws(() => moeda(1, 'es'), /idioma desconhecido/);
  assert.throws(() => compacto(1, 'es'), /idioma desconhecido/);
  assert.throws(() => numero(1, 'es'), /idioma desconhecido/);
  assert.throws(() => pct(1, 'es'), /idioma desconhecido/);
  assert.throws(() => mesCurto('2026-03', 'es'), /idioma desconhecido/);
});

test('mesCurto recusa mês fora do formato AAAA-MM', () => {
  assert.throws(() => mesCurto('2026-13', 'pt'), /mês inválido/);
  assert.throws(() => mesCurto('2026-00', 'pt'), /mês inválido/);
  assert.throws(() => mesCurto('março', 'pt'), /mês inválido/);
});
