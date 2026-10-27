import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pagina, contar, LANGS } from './_dist.mjs';

test('home tem hero com mini painel, 3 frentes, 3 demos, 4 passos e 5 perguntas', () => {
  for (const lang of LANGS) {
    const html = pagina(lang);
    assert.match(html, /data-selo/, `${lang}: selo no mini painel`);
    assert.equal(contar(html, 'data-kpi="'), 3, `${lang}: KPIs do hero`);
    assert.equal(contar(html, 'data-frente="'), 3, `${lang}: frentes`);
    assert.equal(contar(html, '<details'), 5, `${lang}: FAQ`);
    assert.equal(contar(html, '<li class="passo"'), 4, `${lang}: passos`);
    assert.match(html, /data-whatsapp="diagnostico-bi"/);
  }
  // o Astro acrescenta data-astro-cid-* aos elementos de componente com <style>, daí o [^>]*
  assert.match(pagina('pt'), /<h1[^>]*>Dados e IA para quem decide<\/h1>/);
  assert.match(pagina('en'), /<h1[^>]*>Data and AI for decision-makers<\/h1>/);
});
