import { esc } from './html.js';

export function barras(valores, { largura = 600, altura = 200, folga = 0.2 } = {}) {
  if (valores.length === 0) return { zero: altura, barras: [] };
  const max = Math.max(0, ...valores);
  const min = Math.min(0, ...valores);
  const faixa = max - min || 1;
  const escala = (v) => altura - ((v - min) / faixa) * altura;
  const zero = escala(0);
  const passo = largura / valores.length;
  const w = passo * (1 - folga);
  const r2 = (n) => Math.round(n * 100) / 100;
  return {
    zero,
    barras: valores.map((v, i) => ({
      x: r2(i * passo + (passo - w) / 2),
      y: r2(Math.min(escala(v), zero)),
      w: r2(w),
      h: r2(Math.abs(escala(v) - zero)),
      negativo: v < 0,
    })),
  };
}

export function linha(valores, { largura = 600, altura = 200 } = {}) {
  if (valores.length < 2) return '';
  const max = Math.max(...valores);
  const min = Math.min(...valores);
  const faixa = max - min || 1;
  const passo = largura / (valores.length - 1);
  return valores
    .map((v, i) => `${i ? 'L' : 'M'}${(i * passo).toFixed(2)},${(4 + (altura - 8) * (1 - (v - min) / faixa)).toFixed(2)}`)
    .join(' ');
}

export function svgGrafico({ tipo = 'barras', valores, rotulos, titulo, largura = 600, altura = 200 }) {
  if (tipo !== 'barras' && tipo !== 'linha') throw new Error(`tipo de gráfico desconhecido: ${tipo}`);
  if (rotulos.length !== valores.length) throw new Error('rótulos e valores desalinhados');
  const base = altura + 28;
  const ultimo = valores.length - 1;
  const mostrar = (i) => valores.length <= 6 || i % 2 === ultimo % 2;
  const partes = [`<svg viewBox="0 0 ${largura} ${base}" role="img" aria-label="${esc(titulo)}" xmlns="http://www.w3.org/2000/svg"><title>${esc(titulo)}</title>`];
  if (tipo === 'barras') {
    const { zero, barras: bs } = barras(valores, { largura, altura });
    partes.push(`<line class="grafico-zero" x1="0" x2="${largura}" y1="${zero}" y2="${zero}"/>`);
    bs.forEach((b, i) => {
      const r = rotulos[i];
      partes.push(`<rect class="grafico-barra${b.negativo ? ' negativo' : ''}" data-mes="${esc(r.mes)}" x="${b.x}" y="${b.y}" width="${b.w}" height="${valores[i] === 0 ? 0 : Math.max(b.h, 1)}"><title>${esc(r.texto)}: ${esc(r.valor)}</title></rect>`);
      if (mostrar(i)) partes.push(`<text class="grafico-rotulo" x="${(b.x + b.w / 2).toFixed(2)}" y="${base - 6}" text-anchor="middle">${esc(r.texto)}</text>`);
    });
  } else {
    partes.push(`<path class="grafico-linha" d="${linha(valores, { largura, altura })}"/>`);
    const passo = ultimo > 0 ? largura / ultimo : 0;
    rotulos.forEach((r, i) => {
      const ancora = i === 0 ? 'start' : i === ultimo ? 'end' : 'middle';
      if (mostrar(i)) partes.push(`<text class="grafico-rotulo" x="${(i * passo).toFixed(2)}" y="${base - 6}" text-anchor="${ancora}">${esc(r.texto)}</text>`);
    });
  }
  partes.push('</svg>');
  return partes.join('');
}
