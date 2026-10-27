// Gera os dados 100% fictícios das demos. Faixas arbitrárias; nada vem de dado real.
import { writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const MESES = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(Date.UTC(2025, 10 + i, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
});

export function gerarAssessoria(seed = 20261026) {
  const r = mulberry32(seed);
  const faixa = (a, b) => a + (b - a) * r();
  const assessores = 'ABCDEFGH'.split('').map((letra) => {
    let clientes = Math.round(faixa(25, 80));
    const base = faixa(150, 900) * 1000;
    const serie = MESES.map((mes) => {
      clientes = Math.max(10, clientes + Math.round(faixa(-3, 5)));
      const captacao = Math.round((base * faixa(-0.4, 1.6)) / 1000) * 1000;
      const receita = Math.round(clientes * faixa(90, 260));
      return { mes, captacao, receita, clientes };
    });
    return { id: letra, nome: `Assessor ${letra}`, serie };
  });
  return { nome: 'Assessoria Horizonte', ficticio: true, semente: seed, meses: MESES, assessores };
}

export function gerarPme(seed = 20261027) {
  const r = mulberry32(seed);
  const faixa = (a, b) => a + (b - a) * r();
  const definicoes = [
    ['bebidas', 'Bebidas', 'Drinks', 20, 45],
    ['salgados', 'Salgados', 'Savory snacks', 15, 35],
    ['doces', 'Doces', 'Sweets', 10, 28],
    ['graos', 'Grãos e cafés', 'Coffee beans', 8, 22],
  ];
  const categorias = definicoes.map(([id, pt, en, min, max]) => ({
    id,
    nome: { pt, en },
    serie: MESES.map((mes, i) => {
      const sazonal = 1 + 0.15 * Math.sin((i / 12) * 2 * Math.PI);
      const vendas = Math.round((faixa(min, max) * 1000 * sazonal) / 100) * 100;
      const custo = Math.round((vendas * faixa(0.48, 0.68)) / 100) * 100;
      return { mes, vendas, custo };
    }),
  }));
  return { nome: 'Café & Cia', ficticio: true, semente: seed, meses: MESES, categorias };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  mkdirSync('src/data/demos', { recursive: true });
  writeFileSync('src/data/demos/assessoria.json', JSON.stringify(gerarAssessoria(), null, 2) + '\n');
  writeFileSync('src/data/demos/pme.json', JSON.stringify(gerarPme(), null, 2) + '\n');
  console.log('demos: assessoria.json e pme.json gerados');
}
