import { test } from 'node:test';
import assert from 'node:assert/strict';
import { t, href, htmlLang, preencher, LANGS } from '../src/lib/i18n.js';

test('t escolhe o idioma e aceita string simples', () => {
  assert.equal(t({ pt: 'Olá', en: 'Hi' }, 'en'), 'Hi');
  assert.equal(t('Rock .dev', 'pt'), 'Rock .dev');
});

test('t falha quando falta o idioma ou o texto está vazio', () => {
  assert.throws(() => t({ pt: 'Olá' }, 'en'), /sem tradução/);
  assert.throws(() => t({ pt: '', en: 'Hi' }, 'pt'), /sem tradução/);
});

test('href monta as rotas PT na raiz e EN em /en/', () => {
  assert.equal(href('pt', ''), '/');
  assert.equal(href('en', ''), '/en/');
  assert.equal(href('pt', 'demos/vendas-pme/'), '/demos/vendas-pme/');
  assert.equal(href('en', '/sobre/'), '/en/sobre/');
  assert.equal(href('pt', 'solucoes/#bi'), '/solucoes/#bi');
});

test('htmlLang e LANGS', () => {
  assert.deepEqual(LANGS, ['pt', 'en']);
  assert.equal(htmlLang('pt'), 'pt-BR');
  assert.equal(htmlLang('en'), 'en');
});

test('preencher troca variáveis e falha na ausente', () => {
  assert.equal(preencher('Últimos {n} meses', { n: 3 }), 'Últimos 3 meses');
  assert.throws(() => preencher('{nome} liderou', {}), /variável ausente: nome/);
});

test('idioma desconhecido falha alto em t objeto, href e htmlLang', () => {
  assert.throws(() => href('es', ''), /idioma desconhecido/);
  assert.throws(() => htmlLang('es'), /idioma desconhecido/);
  assert.throws(() => t({ pt: 'Olá', en: 'Hi' }, 'es'), /idioma desconhecido/);
  assert.equal(t('Rock .dev', 'es'), 'Rock .dev');
});

test('preencher só aceita chave própria e definida', () => {
  assert.throws(() => preencher('{toString}', {}), /variável ausente/);
  assert.throws(() => preencher('{n}', { n: undefined }), /variável ausente/);
  assert.throws(() => preencher('{n}', { n: null }), /variável ausente/);
});
