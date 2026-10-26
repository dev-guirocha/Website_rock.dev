import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pagina, LANGS } from './_dist.mjs';

test('a galeria lista as 3 demos com link para cada uma', () => {
  for (const lang of LANGS) {
    const html = pagina(lang, 'demos/');
    const prefixo = lang === 'pt' ? '' : '/en';
    for (const id of ['captacao-assessoria', 'vendas-pme', 'assistente-ia']) {
      assert.match(html, new RegExp(`href="${prefixo}/demos/${id}/"`), `${lang}: ${id}`);
    }
  }
});
