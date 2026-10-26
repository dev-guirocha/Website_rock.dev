import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const LANGS = ['pt', 'en'];
export const arquivoRota = (lang, rota = '') => join('dist', lang === 'pt' ? '' : 'en', rota, 'index.html');

export function pagina(lang, rota = '') {
  const f = arquivoRota(lang, rota);
  if (!existsSync(f)) throw new Error(`${f} não existe`);
  return readFileSync(f, 'utf8');
}

export const contar = (html, marca) => html.split(marca).length - 1;

export function todosHtml(dir = 'dist', out = []) {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) todosHtml(p, out);
    else if (nome.endsWith('.html')) out.push(p);
  }
  return out;
}
