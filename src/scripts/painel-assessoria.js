import { resumoAssessoria } from '../lib/agregados.js';
import { svgGrafico } from '../lib/grafico.js';
import { htmlRanking, rotulosMes } from '../lib/tabelas.js';
import { compacto, moeda, numero } from '../lib/formato.js';
import { iniciarIlha } from './ilha.js';

iniciarIlha('assessoria', ({ raiz, dados, lang, form, kpi }) => {
  const grafico = raiz.querySelector('[data-grafico="captacao"]');
  const r = resumoAssessoria(dados, { n: Number(form.periodo.value), assessor: form.assessor.value });
  kpi('captacao', compacto(r.captacao, lang));
  kpi('receita', compacto(r.receita, lang));
  kpi('clientes', numero(r.clientes, lang));
  kpi('receita-cliente', moeda(r.receitaPorCliente, lang, 2));
  grafico.innerHTML = svgGrafico({ tipo: 'barras', titulo: grafico.dataset.titulo, valores: r.porMes.map((p) => p.captacao), rotulos: rotulosMes(r.porMes, 'captacao', lang) });
  raiz.querySelector('[data-ranking]').innerHTML = htmlRanking(r.ranking, lang);
});
