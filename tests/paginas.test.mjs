import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pagina, contar, todosHtml, LANGS } from './_dist.mjs';

const rotas = JSON.parse(readFileSync('src/data/rotas.json', 'utf8'));
const contato = JSON.parse(readFileSync('src/config/contato.json', 'utf8'));

test('as 11 rotas existem nos 2 idiomas com lang, canonical, título e um h1', () => {
  let n = 0;
  for (const rota of rotas) {
    for (const lang of LANGS) {
      const html = pagina(lang, rota);
      const prefixo = lang === 'pt' ? '' : '/en';
      assert.match(html, new RegExp(`<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}"`), `${lang}/${rota}`);
      assert.ok(html.includes(`<link rel="canonical" href="https://squadrockdev.com.br${prefixo}/${rota}"`), `${lang}/${rota}: canonical`);
      assert.match(html, /<title>[^<]+<\/title>/);
      assert.equal(contar(html, '<h1'), 1, `${lang}/${rota}: um h1`);
      n++;
    }
  }
  console.log(`# páginas conferidas: ${n}`);
});

test('toda demo e a home mostram o selo de dados fictícios', () => {
  const comSelo = ['', 'demos/captacao-assessoria/', 'demos/vendas-pme/', 'demos/assistente-ia/'];
  for (const rota of comSelo) {
    assert.match(pagina('pt', rota), /data-selo[^>]*>Dados fictícios</, rota);
    assert.match(pagina('en', rota), /data-selo[^>]*>Fictional data</, rota);
  }
});

test('todo link de WhatsApp usa o número do contato.json e nenhum placeholder sobra', () => {
  const numeros = [];
  for (const f of todosHtml()) {
    const html = readFileSync(f, 'utf8');
    assert.ok(!html.includes('5500000000000'), `${f}: placeholder antigo`);
    for (const m of html.matchAll(/wa\.me\/(\d+)/g)) numeros.push(m[1]);
  }
  assert.ok(numeros.length >= rotas.length * 2, `poucos links de WhatsApp: ${numeros.length}`);
  assert.deepEqual([...new Set(numeros)], [contato.whatsapp]);
  console.log(`# links de WhatsApp conferidos: ${numeros.length}`);
});
