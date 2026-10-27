import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const RAIZ = process.env.CRIVO_RAIZ || '.';
function caminhoDaLista() {
  if (process.env.CRIVO_LISTA) return process.env.CRIVO_LISTA;
  const marcador = join(RAIZ, '.crivo-lista');
  if (!existsSync(marcador)) return '';
  return readFileSync(marcador, 'utf8').split(/\r?\n/)[0].replace(/^\uFEFF/, '').trim();
}
const LISTA = caminhoDaLista();
const EMAILS_PERMITIDOS = ['dev.guirocha@gmail.com', 'noreply@anthropic.com'];
const EXTENSOES = ['.json', '.astro', '.js', '.mjs', '.ts', '.css', '.md', '.html', '.xml', '.txt', '.yml', '.yaml'];
const PASTAS = ['src', 'public', 'dist', 'docs', 'tests', 'scripts', '.github'];

function lerTermos() {
  if (!LISTA || !existsSync(LISTA)) {
    if (process.env.CI) {
      console.warn('crivo: lista ausente no CI, só padrões genéricos');
      return [];
    }
    console.error(`crivo: lista não encontrada (${LISTA || 'defina CRIVO_LISTA ou crie .crivo-lista'})`);
    process.exit(1);
  }
  const termos = readFileSync(LISTA, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  if (termos.length === 0) {
    console.error('crivo: lista vazia, nada conferido');
    process.exit(1);
  }
  return termos;
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTENSOES.some((e) => nome.endsWith(e))) out.push(p);
  }
  return out;
}

const arquivos = [
  ...PASTAS.flatMap((d) => walk(join(RAIZ, d))),
  ...['README.md', 'package.json'].map((f) => join(RAIZ, f)).filter((f) => existsSync(f)),
];
if (arquivos.length === 0) {
  console.error('crivo: nenhum arquivo conferido');
  process.exit(1);
}

const termos = lerTermos();
const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const padroes = termos.map((termo) => ({
  termo,
  re: new RegExp(`(?<![\\p{L}\\p{N}])${escapar(termo)}(?![\\p{L}\\p{N}])`, 'iu'),
}));
const caminhoContato = join(RAIZ, 'src', 'config', 'contato.json');
const numero = existsSync(caminhoContato) ? JSON.parse(readFileSync(caminhoContato, 'utf8')).whatsapp : null;
const pastaDist = join(RAIZ, 'dist');

function genericos(arquivo, texto) {
  const achados = [];
  if (/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/.test(texto)) achados.push('CPF');
  for (const m of texto.matchAll(/[\w.+-]+@[\w-]+(?:\.[a-z]{2,})+\b/gi)) {
    if (/\.(png|jpe?g|webp|svg|gif)$/i.test(m[0])) continue;
    if (!EMAILS_PERMITIDOS.includes(m[0].toLowerCase())) achados.push(`e-mail ${m[0]}`);
  }
  if (arquivo.startsWith(pastaDist)) {
    for (const m of texto.matchAll(/wa\.me\/(\d+)/g)) if (m[1] !== numero) achados.push(`WhatsApp ${m[1]}`);
  }
  return achados;
}

const achados = [];
for (const f of arquivos) {
  const texto = readFileSync(f, 'utf8');
  for (const { termo, re } of padroes) if (re.test(texto)) achados.push(`${f}: "${termo}"`);
  for (const g of genericos(f, texto)) achados.push(`${f}: ${g}`);
}

let commits = 0;
if (termos.length && RAIZ === '.') {
  try {
    const log = execFileSync('git', ['log', '--format=%H%n%B', 'main..HEAD'], { encoding: 'utf8' });
    commits = (log.match(/^[0-9a-f]{40}$/gm) || []).length;
    for (const { termo, re } of padroes) if (re.test(log)) achados.push(`mensagens de commit: "${termo}"`);
  } catch {
    console.error('crivo: não consegui ler as mensagens de commit (main..HEAD)');
    process.exit(1);
  }
}

console.log(`crivo: ${termos.length} termos × ${arquivos.length} arquivos conferidos (+ ${commits} commits)`);
if (achados.length) {
  console.error(achados.join('\n'));
  process.exit(1);
}
console.log('crivo: nenhum achado');
