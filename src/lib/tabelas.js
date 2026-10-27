import { esc } from './html.js';
import { compacto, pct, mesCurto } from './formato.js';
import { t } from './i18n.js';

export function htmlRanking(itens, lang) {
  return itens
    .map((a) => `<tr data-assessor="${esc(a.id)}"><th scope="row">${esc(a.nome)}</th><td class="num${a.captacao < 0 ? ' negativo' : ''}">${esc(compacto(a.captacao, lang))}</td></tr>`)
    .join('');
}

export function htmlCategorias(itens, lang) {
  return itens
    .map((c) => `<tr data-categoria="${esc(c.id)}"><th scope="row">${esc(t(c.nome, lang))}</th><td class="num">${esc(compacto(c.vendas, lang))}</td><td class="num">${esc(pct(c.margemPct, lang))}</td></tr>`)
    .join('');
}

export function rotulosMes(porMes, campo, lang) {
  return porMes.map((p) => ({ mes: p.mes, texto: mesCurto(p.mes, lang), valor: compacto(p[campo], lang) }));
}
