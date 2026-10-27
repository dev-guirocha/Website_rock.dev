export const LANGS = ['pt', 'en'];

export function checarLang(lang) {
  if (!LANGS.includes(lang)) throw new Error('idioma desconhecido: ' + lang);
}

export function t(valor, lang) {
  if (typeof valor === 'string') return valor;
  checarLang(lang);
  if (valor && typeof valor === 'object' && typeof valor[lang] === 'string' && valor[lang] !== '') return valor[lang];
  throw new Error(`Texto sem tradução para "${lang}": ${JSON.stringify(valor)}`);
}

export function href(lang, rota = '') {
  checarLang(lang);
  const r = rota.replace(/^\//, '');
  return lang === 'pt' ? `/${r}` : `/en/${r}`;
}

export function htmlLang(lang) {
  checarLang(lang);
  return lang === 'pt' ? 'pt-BR' : 'en';
}

export function preencher(modelo, vars) {
  return modelo.replace(/\{(\w+)\}/g, (_, chave) => {
    if (!Object.hasOwn(vars, chave) || vars[chave] == null) throw new Error(`variável ausente: ${chave}`);
    return String(vars[chave]);
  });
}
