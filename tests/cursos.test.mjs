import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pagina, contar, LANGS } from './_dist.mjs';

test('cursos tem 3 trilhas em breve, cada uma com CTA de interesse próprio', () => {
  for (const lang of LANGS) {
    const html = pagina(lang, 'cursos/');
    assert.equal(contar(html, 'data-trilha="'), 3, lang);
    for (const m of ['curso-assessores', 'curso-financeiro', 'curso-pequenos-negocios']) assert.match(html, new RegExp(`data-whatsapp="${m}"`), `${lang}: ${m}`);
  }
});
