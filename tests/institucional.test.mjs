import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { pagina, contar, LANGS } from './_dist.mjs';

const projetos = JSON.parse(readFileSync('src/textos/projetos.json', 'utf8'));

const tagDe = (html, src) => html.match(new RegExp(`<img[^>]*src="${src.replace(/[/.]/g, '\\$&')}"[^>]*>`))?.[0];
const atributo = (tag, nome) => tag.match(new RegExp(`\\s${nome}="([^"]*)"`))?.[1];
const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const comImagem = projetos.itens.filter((p) => p.imagem);

test('projetos lista os 4 cases, com imagem existente quando há, e link de código', () => {
  assert.equal(projetos.itens.length, 4);
  for (const p of projetos.itens) {
    if (p.imagem) assert.ok(existsSync(join('public', p.imagem)), p.imagem);
    assert.match(p.codigo, /^https:\/\/github\.com\/dev-guirocha\//);
  }
  for (const lang of LANGS) assert.equal(contar(pagina(lang, 'projetos/'), 'data-projeto="'), 4, lang);
});

test('sobre tem foto, link para o currículo e o cargo sem nome de empresa', () => {
  for (const lang of LANGS) {
    const html = pagina(lang, 'sobre/');
    assert.match(html, /src="\/images\/guilherme\.webp"/);
    assert.match(html, /href="https:\/\/dev-guirocha\.github\.io\/Resume-rock\.dev\/"/);
  }
  assert.match(pagina('pt', 'sobre/'), /trabalho com BI e dados/);
  assert.doesNotMatch(pagina('pt', 'sobre/'), /mercado financeiro/);
  assert.doesNotMatch(pagina('en', 'sobre/'), /financial market/);
});

test('privacidade existe e diz que não há formulário', () => {
  assert.match(pagina('pt', 'privacidade/'), /não tem formulário/);
  assert.match(pagina('en', 'privacidade/'), /has no forms/);
});

test('privacidade fala na primeira pessoa e diz quem responde pelo site', () => {
  assert.match(pagina('pt', 'privacidade/'), /Eu não coleto dados diretamente/);
  assert.match(pagina('en', 'privacidade/'), /I don(?:'|&#39;)t collect data directly/);
  assert.match(pagina('pt', 'privacidade/'), /Quem responde por este site é Guilherme Rocha/);
  assert.match(pagina('en', 'privacidade/'), /This site is run by Guilherme Rocha/);
});

test('dimensões de width/height batem com o WebP real (cards e foto do Sobre)', async () => {
  let checados = 0;
  const conferir = async (html, src, arquivo) => {
    const meta = await sharp(join('public', arquivo)).metadata();
    const tag = tagDe(html, src);
    assert.ok(tag, `img ${src} ausente`);
    assert.equal(atributo(tag, 'width'), String(meta.width), `largura de ${src}`);
    assert.equal(atributo(tag, 'height'), String(meta.height), `altura de ${src}`);
    checados += 1;
  };
  for (const lang of LANGS) {
    const html = pagina(lang, 'projetos/');
    for (const p of comImagem) await conferir(html, p.imagem, p.imagem);
    await conferir(pagina(lang, 'sobre/'), '/images/guilherme.webp', '/images/guilherme.webp');
  }
  assert.equal(checados, 2 * (comImagem.length + 1));
  assert.equal(checados, 8);
});

test('imagem do card é decorativa e os links dizem o nome do projeto', () => {
  for (const lang of LANGS) {
    const html = pagina(lang, 'projetos/');
    for (const p of projetos.itens) {
      if (p.imagem) assert.equal(atributo(tagDe(html, p.imagem), 'alt'), '', p.nome);
      assert.match(html, new RegExp(`class="sr"[^>]*>\\s*–\\s*${escapar(p.nome)}</span>`), p.nome);
    }
  }
});

test('sobre e projetos se linkam nos dois idiomas', () => {
  assert.match(pagina('pt', 'sobre/'), /href="\/projetos\/"/);
  assert.match(pagina('en', 'sobre/'), /href="\/en\/projetos\/"/);
});

test('card sem imagem não emite <img>', () => {
  const semImagem = projetos.itens.filter((p) => !p.imagem);
  assert.ok(semImagem.length >= 1);
  for (const lang of LANGS) {
    const html = pagina(lang, 'projetos/');
    for (const p of semImagem) {
      const card = html.match(new RegExp(`<article[^>]*data-projeto="${p.id}"[^>]*>[\\s\\S]*?</article>`))?.[0];
      assert.ok(card, `card ${p.id} ausente`);
      assert.doesNotMatch(card, /<img/, p.id);
    }
  }
});

test('nenhum HTML do dist menciona o projeto removido', () => {
  const varrer = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? varrer(join(dir, d.name)) : [join(dir, d.name)]));
  const htmls = varrer('dist').filter((f) => f.endsWith('.html'));
  assert.ok(htmls.length > 0);
  for (const f of htmls) assert.doesNotMatch(readFileSync(f, 'utf8'), /panda\s?loterias/i, f);
});
