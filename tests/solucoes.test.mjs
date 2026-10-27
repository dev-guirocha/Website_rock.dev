import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pagina, LANGS } from './_dist.mjs';

test('soluções tem as seções bi e ia com CTA e link de demo', () => {
  for (const lang of LANGS) {
    const html = pagina(lang, 'solucoes/');
    assert.match(html, /id="bi"/);
    assert.match(html, /id="ia"/);
    assert.match(html, /data-whatsapp="diagnostico-bi"/);
    assert.match(html, /data-whatsapp="ia-aplicada"/);
    assert.match(html, /demos\/captacao-assessoria\//);
    assert.match(html, /demos\/assistente-ia\//);
  }
});
