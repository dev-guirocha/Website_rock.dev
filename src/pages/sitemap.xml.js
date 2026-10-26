import rotas from '../data/rotas.json';
import { LANGS, href } from '../lib/i18n.js';

export function GET({ site }) {
  const urls = rotas.flatMap((rota) => LANGS.map((lang) => new URL(href(lang, rota), site).href));
  const corpo = urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${corpo}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
