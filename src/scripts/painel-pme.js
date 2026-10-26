import { resumoPme } from '../lib/agregados.js';
import { svgGrafico } from '../lib/grafico.js';
import { htmlCategorias, rotulosMes } from '../lib/tabelas.js';
import { compacto, pct } from '../lib/formato.js';
import { iniciarIlha } from './ilha.js';

iniciarIlha('pme', ({ raiz, dados, lang, form, kpi }) => {
  const grafico = raiz.querySelector('[data-grafico="vendas"]');
  const r = resumoPme(dados, { n: Number(form.periodo.value), categoria: form.categoria.value });
  kpi('vendas', compacto(r.vendas, lang));
  kpi('custo', compacto(r.custo, lang));
  kpi('margem', compacto(r.margem, lang));
  kpi('margem-pct', pct(r.margemPct, lang));
  grafico.innerHTML = svgGrafico({ tipo: 'linha', titulo: grafico.dataset.titulo, valores: r.porMes.map((m) => m.vendas), rotulos: rotulosMes(r.porMes, 'vendas', lang) });
  raiz.querySelector('[data-categorias]').innerHTML = htmlCategorias(r.porCategoria, lang);
});
