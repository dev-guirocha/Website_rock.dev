import { resumoAssessoria } from './agregados.js';
import { moeda, compacto, numero, pct, mesCurto } from './formato.js';
import { t, preencher } from './i18n.js';

export const PERGUNTAS = ['top-trimestre', 'total-12m', 'mes-menor-receita', 'negativos-ultimo-mes', 'receita-por-cliente', 'trimestre-vs-anterior'];

export function calcular(id, dados) {
  switch (id) {
    case 'top-trimestre': {
      const topo = resumoAssessoria(dados, { n: 3 }).ranking[0];
      return { valor: topo.captacao, vars: { nome: topo.nome }, destaque: { assessor: topo.id } };
    }
    case 'total-12m':
      return { valor: resumoAssessoria(dados, { n: 12 }).captacao, vars: { n: dados.assessores.length }, destaque: {} };
    case 'mes-menor-receita': {
      const menor = resumoAssessoria(dados, { n: 12 }).porMes.reduce((m, x) => (x.receita < m.receita ? x : m));
      return { valor: menor.receita, vars: { mes: menor.mes }, destaque: { mes: menor.mes } };
    }
    case 'negativos-ultimo-mes': {
      const mes = dados.meses[dados.meses.length - 1];
      const n = dados.assessores.filter((a) => a.serie.find((p) => p.mes === mes).captacao < 0).length;
      return { valor: n, vars: { mes }, destaque: {} };
    }
    case 'receita-por-cliente': {
      const r = resumoAssessoria(dados, { n: 1 });
      return { valor: Math.round(r.receitaPorCliente * 100) / 100, vars: { mes: r.meses[0] }, destaque: { mes: r.meses[0] } };
    }
    case 'trimestre-vs-anterior': {
      const atual = resumoAssessoria(dados, { n: 3 }).captacao;
      const anterior = resumoAssessoria(dados, { n: 6 }).captacao - atual;
      const valor = anterior === 0 ? 0 : Math.round(((atual - anterior) / Math.abs(anterior)) * 1000) / 10;
      return { valor, vars: { atual, anterior }, destaque: {} };
    }
    default:
      throw new Error(`pergunta desconhecida: ${id}`);
  }
}

const FORMATO = {
  'top-trimestre': (v, lang) => compacto(v, lang),
  'total-12m': (v, lang) => compacto(v, lang),
  'mes-menor-receita': (v, lang) => moeda(v, lang),
  'negativos-ultimo-mes': (v, lang) => numero(v, lang),
  'receita-por-cliente': (v, lang) => moeda(v, lang, 2),
  'trimestre-vs-anterior': (v, lang) => pct(Math.abs(v), lang),
};

export function responder(id, dados, textos, lang) {
  const c = calcular(id, dados);
  const vars = { ...c.vars, valor: FORMATO[id](c.valor, lang) };
  if ('n' in vars) vars.n = numero(vars.n, lang);
  if (vars.mes) vars.mes = mesCurto(vars.mes, lang);
  if ('atual' in vars) {
    vars.atual = compacto(vars.atual, lang);
    vars.anterior = compacto(vars.anterior, lang);
    vars.direcao = t(c.valor >= 0 ? textos.direcao.subiu : textos.direcao.caiu, lang);
  }
  return { id, valor: c.valor, destaque: c.destaque, pergunta: t(textos.perguntas[id], lang), texto: preencher(t(textos.respostas[id], lang), vars) };
}
