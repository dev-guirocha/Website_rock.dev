import redirects from '../data/redirects.json';
import { esc } from '../lib/html.js';

export function getStaticPaths() {
  return Object.entries(redirects).map(([arquivo, destino]) => ({ params: { antiga: arquivo.replace(/\.html$/, '') }, props: { destino } }));
}

export function GET({ props, site }) {
  const { destino } = props;
  const url = new URL(destino, site);
  const absoluto = url.href;
  url.hash = '';
  const canonical = url.href;
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Rock .dev</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="${esc(canonical)}"><meta http-equiv="refresh" content="0; url=${esc(destino)}"></head><body><p>Esta página mudou de endereço: <a href="${esc(destino)}">${esc(absoluto)}</a></p></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
