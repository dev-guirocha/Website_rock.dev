import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pagina, LANGS } from './_dist.mjs';
import { compacto, moeda, numero, pct, mesCurto } from '../src/lib/formato.js';
import { t, preencher } from '../src/lib/i18n.js';
import { PERGUNTAS, calcular, responder } from '../src/lib/assistente.js';

const dados = JSON.parse(readFileSync('src/data/demos/assessoria.json', 'utf8'));
const textos = JSON.parse(readFileSync('src/textos/demos.json', 'utf8')).assistente;

function esperado(d) {
  const ult = d.meses.slice(-3), ant = d.meses.slice(-6, -3), last = d.meses[d.meses.length - 1];
  const cap = (a, ms) => a.serie.filter((p) => ms.includes(p.mes)).reduce((s, p) => s + p.captacao, 0);
  const ponto = (a, m) => a.serie.find((p) => p.mes === m);
  const tops = d.assessores.map((a) => [a.id, cap(a, ult)]).sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0]));
  const recMes = d.meses.map((m) => [m, d.assessores.reduce((s, a) => s + ponto(a, m).receita, 0)]);
  const menor = recMes.reduce((m, x) => (x[1] < m[1] ? x : m));
  const rec = recMes[recMes.length - 1][1];
  const cli = d.assessores.reduce((s, a) => s + ponto(a, last).clientes, 0);
  const atual = d.assessores.reduce((s, a) => s + cap(a, ult), 0);
  const anterior = d.assessores.reduce((s, a) => s + cap(a, ant), 0);
  return {
    'top-trimestre': tops[0][1],
    'total-12m': d.assessores.reduce((s, a) => s + cap(a, d.meses), 0),
    'mes-menor-receita': menor[1],
    'negativos-ultimo-mes': d.assessores.filter((a) => ponto(a, last).captacao < 0).length,
    'receita-por-cliente': Math.round((rec / cli) * 100) / 100,
    'trimestre-vs-anterior': anterior === 0 ? 0 : Math.round(((atual - anterior) / Math.abs(anterior)) * 1000) / 10,
  };
}

function textoEsperado(d, lang) {
  const v = esperado(d);
  const ult = d.meses.slice(-3), ant = d.meses.slice(-6, -3), last = d.meses[d.meses.length - 1];
  const cap = (a, ms) => a.serie.filter((p) => ms.includes(p.mes)).reduce((s, p) => s + p.captacao, 0);
  const atual = d.assessores.reduce((s, a) => s + cap(a, ult), 0);
  const anterior = d.assessores.reduce((s, a) => s + cap(a, ant), 0);
  const lider = [...d.assessores].sort((x, y) => cap(y, ult) - cap(x, ult) || x.id.localeCompare(y.id))[0];
  const recMes = d.meses.map((m) => [m, d.assessores.reduce((s, a) => s + a.serie.find((p) => p.mes === m).receita, 0)]);
  const menor = recMes.reduce((m, x) => (x[1] < m[1] ? x : m));
  const dir = v['trimestre-vs-anterior'] >= 0 ? textos.direcao.subiu : textos.direcao.caiu;
  const vars = {
    'top-trimestre': { nome: lider.nome, valor: compacto(v['top-trimestre'], lang) },
    'total-12m': { n: numero(d.assessores.length, lang), valor: compacto(v['total-12m'], lang) },
    'mes-menor-receita': { mes: mesCurto(menor[0], lang), valor: moeda(v['mes-menor-receita'], lang) },
    'negativos-ultimo-mes': { mes: mesCurto(last, lang), valor: numero(v['negativos-ultimo-mes'], lang) },
    'receita-por-cliente': { mes: mesCurto(last, lang), valor: moeda(v['receita-por-cliente'], lang, 2) },
    'trimestre-vs-anterior': { valor: pct(Math.abs(v['trimestre-vs-anterior']), lang), atual: compacto(atual, lang), anterior: compacto(anterior, lang), direcao: t(dir, lang) },
  };
  return Object.fromEntries(PERGUNTAS.map((id) => [id, preencher(t(textos.respostas[id], lang), vars[id])]));
}

const norm = (x) => x.replace(/\s+/g, ' ').trim();

function textosDaPagina(lang) {
  const html = pagina(lang, 'demos/assistente-ia/');
  return Object.fromEntries([...html.matchAll(/<li class="chat-par" data-pergunta="([^"]+)"[\s\S]*?<p class="chat-resposta"[^>]*>([\s\S]*?)<\/p>/g)].map((m) => [
    m[1],
    norm(m[2].replace(/<span class="sr"[^>]*>[\s\S]*?<\/span>/g, '').replace(/<[^>]+>/g, '')),
  ]));
}

function valoresDaPagina(lang) {
  const html = pagina(lang, 'demos/assistente-ia/');
  return Object.fromEntries([...html.matchAll(/data-pergunta="([^"]+)" data-valor="([^"]+)"/g)].map((m) => [m[1], Number(m[2])]));
}

function divergencias(daPagina, conta) {
  return PERGUNTAS.filter((id) => daPagina[id] !== conta[id]).map((id) => `${id}: página ${daPagina[id]} × conta ${conta[id]}`);
}

test('cada resposta publicada bate com a conta refeita a partir do JSON', () => {
  for (const lang of LANGS) {
    const daPagina = valoresDaPagina(lang);
    assert.equal(Object.keys(daPagina).length, 6, `${lang}: 6 perguntas`);
    assert.deepEqual(divergencias(daPagina, esperado(dados)), [], lang);
  }
  console.log(`# respostas conferidas: ${PERGUNTAS.length * LANGS.length}`);
});

test('a frase inteira de cada resposta publicada é igual à montada pela conta refeita', () => {
  let n = 0;
  for (const lang of LANGS) {
    const daPagina = textosDaPagina(lang);
    const esp = textoEsperado(dados, lang);
    for (const id of PERGUNTAS) {
      assert.equal(daPagina[id], norm(esp[id]), `${lang}/${id}`);
      n++;
    }
  }
  console.log(`# frases conferidas: ${n}`);
  assert.equal(n, PERGUNTAS.length * LANGS.length);
  assert.equal(n, 12);
});

test('a reconciliação acusa um número adulterado', () => {
  const adulterado = structuredClone(dados);
  const b = adulterado.assessores.find((a) => a.id === 'B');
  b.serie[b.serie.length - 1].captacao += 50_000_000;
  const div = divergencias(valoresDaPagina('pt'), esperado(adulterado));
  assert.ok(div.length >= 1);
  assert.ok(div.some((d) => d.startsWith('total-12m:')), div.join(' | '));
});

test('a reconciliação acusa clientes adulterados só em receita-por-cliente', () => {
  const adulterado = structuredClone(dados);
  adulterado.assessores[0].serie[adulterado.assessores[0].serie.length - 1].clientes += 1000;
  const ids = divergencias(valoresDaPagina('pt'), esperado(adulterado)).map((d) => d.split(':')[0]);
  assert.deepEqual(ids, ['receita-por-cliente']);
});

test('responder monta o texto com nome e valor, e pergunta desconhecida falha', () => {
  const r = responder('top-trimestre', dados, textos, 'pt');
  const topo = calcular('top-trimestre', dados);
  assert.equal(r.valor, topo.valor);
  assert.ok(r.texto.includes(topo.vars.nome));
  assert.equal(r.destaque.assessor, topo.destaque.assessor);
  assert.throws(() => calcular('qual-o-sentido-da-vida', dados), /desconhecida/);
});
