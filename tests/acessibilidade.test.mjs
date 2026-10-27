import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { todosHtml } from './_dist.mjs';

const doMain = (f) => (readFileSync(f, 'utf8').match(/<main[\s\S]*<\/main>/) || [''])[0];
const paginas = todosHtml().filter((f) => doMain(f));

test('há páginas com main para conferir', () => {
  assert.ok(paginas.length > 0, 'nenhuma página conferida');
});

test('a ordem dos títulos nunca pula de nível', () => {
  for (const f of paginas) {
    const niveis = [...doMain(f).matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
    assert.equal(niveis[0], 1, `${f}: o primeiro título do main não é h1`);
    for (let i = 1; i < niveis.length; i++) {
      assert.ok(niveis[i] <= niveis[i - 1] + 1, `${f}: h${niveis[i - 1]} seguido de h${niveis[i]}`);
    }
  }
});

test('links soltos no main têm a classe link-acao ou botao', () => {
  let conferidos = 0;
  for (const f of paginas) {
    const main = doMain(f);
    // remove os blocos de texto corrido; o bloco que é só um link continua sendo conferido
    const solto = main.replace(/<(p|li|td)[\s>]([\s\S]*?)<\/\1>/g, (bloco, _t, dentro) => (/^\s*<a[\s>][\s\S]*<\/a>\s*$/.test(dentro) && !dentro.slice(1).includes('<a') ? bloco : ''));
    for (const m of solto.matchAll(/<a\s[^>]*>/g)) {
      conferidos++;
      const cls = (m[0].match(/class="([^"]*)"/) || [, ''])[1].split(/\s+/);
      assert.ok(cls.includes('botao') || cls.includes('link-acao'), `${f}: ${m[0]}`);
    }
  }
  assert.ok(conferidos > 0, 'nenhum link solto conferido');
});
