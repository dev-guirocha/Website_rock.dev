import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pagina, contar, LANGS } from './_dist.mjs';
import { resumoAssessoria } from '../src/lib/agregados.js';
import { compacto } from '../src/lib/formato.js';
import { esc } from '../src/lib/html.js';

const ROTA = 'demos/captacao-assessoria/';
const dados = JSON.parse(readFileSync('src/data/demos/assessoria.json', 'utf8'));

test('a demo existe nos 2 idiomas com selo, 4 KPIs, 12 barras e 8 assessores', () => {
  for (const lang of LANGS) {
    const html = pagina(lang, ROTA);
    assert.match(html, lang === 'pt' ? /data-selo[^>]*>Dados fictícios</ : /data-selo[^>]*>Fictional data</);
    assert.equal(contar(html, 'data-kpi="'), 4, `${lang}: KPIs`);
    assert.equal(contar(html, '<rect class="grafico-barra'), 12, `${lang}: barras`);
    assert.equal(contar(html, '<tr data-assessor="'), 8, `${lang}: ranking`);
    assert.match(html, /<form class="filtros" data-filtros hidden/);
  }
});

test('o KPI de captação mostra a soma dos 12 meses', () => {
  const r = resumoAssessoria(dados, { n: 12 });
  for (const lang of LANGS) assert.ok(pagina(lang, ROTA).includes(esc(compacto(r.captacao, lang))), lang);
});

test('o JSON embutido para a ilha é o mesmo do arquivo, nos 2 idiomas', () => {
  for (const lang of LANGS) {
    const m = pagina(lang, ROTA).match(/<script type="application\/json" data-dados>([\s\S]*?)<\/script>/);
    assert.ok(m, `${lang}: script data-dados não encontrado`);
    assert.deepEqual(JSON.parse(m[1]), dados, lang);
  }
});
