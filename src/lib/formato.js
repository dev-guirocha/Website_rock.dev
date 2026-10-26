import { checarLang } from './i18n.js';

const LOCALE = { pt: 'pt-BR', en: 'en-US' };
const MESES = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export function moeda(n, lang, casas = 0) {
  checarLang(lang);
  return new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'BRL', minimumFractionDigits: casas, maximumFractionDigits: casas }).format(n);
}

export function compacto(n, lang) {
  checarLang(lang);
  return new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1 }).format(n);
}

export function numero(n, lang, casas = 0) {
  checarLang(lang);
  return new Intl.NumberFormat(LOCALE[lang], { minimumFractionDigits: casas, maximumFractionDigits: casas }).format(n);
}

export function pct(n, lang, casas = 1) {
  checarLang(lang);
  return `${numero(n, lang, casas)}%`;
}

export function mesCurto(mes, lang) {
  checarLang(lang);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(mes)) throw new Error('mês inválido: ' + mes);
  const [ano, m] = mes.split('-');
  const nome = MESES[lang][Number(m) - 1];
  return lang === 'pt' ? `${nome}/${ano.slice(2)}` : `${nome} ${ano.slice(2)}`;
}
