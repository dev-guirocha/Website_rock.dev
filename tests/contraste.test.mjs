import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { razao } from '../src/lib/contraste.js';

const css = readFileSync('src/styles/global.css', 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));

const TEXTO = [
  ['texto', 'fundo'], ['texto', 'superficie'], ['texto-suave', 'fundo'], ['texto-suave', 'superficie'],
  ['primaria', 'fundo'], ['primaria', 'superficie'], ['primaria-texto', 'primaria'], ['acento', 'fundo'],
  ['acento', 'superficie'], ['acento-texto', 'acento'], ['painel-texto', 'painel'], ['painel-suave', 'painel'],
  ['painel-acento', 'painel'], ['painel-negativo', 'painel'], ['painel', 'painel-acento'],
  ['painel-texto', 'painel-borda'],
];
const BORDA_DE_CAMPO = [['texto-suave', 'fundo'], ['painel-suave', 'painel']];

test('a função de contraste acerta os extremos e reprova par fraco', () => {
  assert.equal(Math.round(razao('#000000', '#FFFFFF')), 21);
  assert.equal(razao('#777777', '#777777'), 1);
  assert.ok(razao('#9AA7B8', '#FAFAF7') < 4.5, 'par sabidamente fraco precisa reprovar');
});

test('todo par de texto do tema passa 4,5:1', () => {
  const fracos = TEXTO.filter(([a, b]) => {
    assert.ok(tokens[a] && tokens[b], `token ausente: ${a} ou ${b}`);
    return razao(tokens[a], tokens[b]) < 4.5;
  }).map(([a, b]) => `${a}/${b}: ${razao(tokens[a], tokens[b]).toFixed(2)}`);
  assert.deepEqual(fracos, []);
  console.log(`# pares de texto conferidos: ${TEXTO.length}`);
});

test('bordas de campo passam 3:1', () => {
  const fracas = BORDA_DE_CAMPO.filter(([a, b]) => razao(tokens[a], tokens[b]) < 3).map(([a, b]) => `${a}/${b}`);
  assert.deepEqual(fracas, []);
});
