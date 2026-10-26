import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pagina, contar, LANGS } from './_dist.mjs';

const contato = JSON.parse(readFileSync('src/config/contato.json', 'utf8'));
const SITE = 'https://squadrockdev.com.br';

test('home existe nos 2 idiomas com lang, canonical e hreflang', () => {
  assert.match(pagina('pt'), /<html lang="pt-BR"/);
  assert.match(pagina('en'), /<html lang="en"/);
  assert.match(pagina('pt'), new RegExp(`<link rel="canonical" href="${SITE}/"`));
  assert.match(pagina('en'), new RegExp(`<link rel="canonical" href="${SITE}/en/"`));
  for (const lang of LANGS) {
    for (const h of ['pt-BR', 'en', 'x-default']) assert.match(pagina(lang), new RegExp(`hreflang="${h}"`), `${lang}: ${h}`);
  }
});

test('cabeçalho tem os 5 itens de menu e a troca de idioma', () => {
  const itens = ['solucoes', 'demos', 'cursos', 'calculadora', 'sobre'];
  for (const id of itens) {
    assert.match(pagina('pt'), new RegExp(`href="/${id}/"`), `pt: ${id}`);
    assert.match(pagina('en'), new RegExp(`href="/en/${id}/"`), `en: ${id}`);
  }
  for (const lang of LANGS) {
    assert.match(pagina(lang), /href="\/" hreflang="pt-BR"/);
    assert.match(pagina(lang), /href="\/en\/" hreflang="en"/);
  }
});

test('rodapé com id contato e WhatsApp com o número do contato.json', () => {
  for (const lang of LANGS) {
    const html = pagina(lang);
    assert.match(html, /id="contato"/);
    assert.ok(contar(html, `https://wa.me/${contato.whatsapp}?text=`) >= 2, `${lang}: CTA do topo e do rodapé`);
    assert.match(html, /mailto:dev\.guirocha@gmail\.com\?subject=/);
    assert.match(html, /"@type":"ProfessionalService"/);
  }
});

const ui = JSON.parse(readFileSync('src/textos/ui.json', 'utf8'));
const IDIOMA_ESPERADO = { pt: 'pt', en: 'en' };

test('a mensagem do WhatsApp sai no idioma da página', () => {
  for (const lang of LANGS) {
    const html = pagina(lang);
    const msg = encodeURIComponent(ui.mensagens.geral[IDIOMA_ESPERADO[lang]]);
    assert.ok(html.includes(`https://wa.me/${contato.whatsapp}?text=${msg}`), `${lang}: mensagem no idioma da página`);
  }
});

test('o link do idioma atual tem aria-current="true" e o outro não', () => {
  const seletor = (html) => html.match(/<div class="idiomas"[^>]*>([\s\S]*?)<\/div>/)[1];
  const link = (trecho, h) => trecho.match(new RegExp(`<a [^>]*hreflang="${h}"[^>]*>`))[0];
  for (const [lang, atual, outro] of [['pt', 'pt-BR', 'en'], ['en', 'en', 'pt-BR']]) {
    const trecho = seletor(pagina(lang));
    assert.match(link(trecho, atual), /aria-current="true"/, `${lang}: atual`);
    assert.doesNotMatch(link(trecho, outro), /aria-current/, `${lang}: outro`);
  }
});

test('rodapé tem o link para Projetos nos dois idiomas', () => {
  const rodape = (html) => html.match(/<footer[\s\S]*?<\/footer>/)?.[0];
  assert.match(rodape(pagina('pt')), /href="\/projetos\/"/);
  assert.match(rodape(pagina('en')), /href="\/en\/projetos\/"/);
});
