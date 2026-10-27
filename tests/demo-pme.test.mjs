import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pagina, contar, LANGS } from './_dist.mjs';
import { resumoPme } from '../src/lib/agregados.js';
import { pct } from '../src/lib/formato.js';

const ROTA = 'demos/vendas-pme/';
const dados = JSON.parse(readFileSync('src/data/demos/pme.json', 'utf8'));

test('a demo da PME existe nos 2 idiomas com selo, 4 KPIs, linha e 4 categorias', () => {
  for (const lang of LANGS) {
    const html = pagina(lang, ROTA);
    assert.match(html, lang === 'pt' ? /data-selo[^>]*>Dados fictícios</ : /data-selo[^>]*>Fictional data</);
    assert.equal(contar(html, 'data-kpi="'), 4, `${lang}: KPIs`);
    assert.equal(contar(html, '<path class="grafico-linha"'), 1, `${lang}: linha`);
    assert.equal(contar(html, '<tr data-categoria="'), 4, `${lang}: categorias`);
  }
  assert.match(pagina('en', ROTA), /<th scope="row">Coffee beans</);
  assert.match(pagina('pt', ROTA), /<th scope="row">Grãos e cafés</);
});

test('a margem % do período aparece no KPI', () => {
  const r = resumoPme(dados, { n: 12 });
  for (const lang of LANGS) assert.ok(pagina(lang, ROTA).includes(pct(r.margemPct, lang)), lang);
});
