import { test } from 'node:test';
import assert from 'node:assert/strict';
import { barras, linha, svgGrafico } from '../src/lib/grafico.js';

test('barras posiciona positivos acima e negativos abaixo do zero', () => {
  const { zero, barras: bs } = barras([10, -10], { largura: 200, altura: 200, folga: 0 });
  assert.equal(zero, 100);
  assert.deepEqual(bs[0], { x: 0, y: 0, w: 100, h: 100, negativo: false });
  assert.deepEqual(bs[1], { x: 100, y: 100, w: 100, h: 100, negativo: true });
});

test('barras só com positivos apoia no chão', () => {
  const { zero } = barras([5, 10], { altura: 200 });
  assert.equal(zero, 200);
});

test('linha gera path com respiro de 4px', () => {
  assert.equal(linha([0, 10], { largura: 100, altura: 50 }), 'M0.00,46.00 L100.00,4.00');
  assert.equal(linha([5]), '');
});

test('svgGrafico desenha uma barra por valor, com mês e título escapado', () => {
  const rotulos = ['2026-01', '2026-02', '2026-03'].map((mes) => ({ mes, texto: mes.slice(5), valor: 'v' }));
  const svg = svgGrafico({ tipo: 'barras', valores: [1, -2, 3], rotulos, titulo: 'A <b>' });
  assert.equal(svg.split('<rect').length - 1, 3);
  assert.match(svg, /data-mes="2026-02"/);
  assert.match(svg, /class="grafico-barra negativo"/);
  assert.match(svg, /aria-label="A &lt;b&gt;"/);
  assert.match(svgGrafico({ tipo: 'linha', valores: [1, 2, 3], rotulos, titulo: 't' }), /<path class="grafico-linha" d="M/);
  assert.throws(() => svgGrafico({ tipo: 'pizza', valores: [], rotulos: [], titulo: 't' }), /desconhecido/);
});

test('svgGrafico recusa rótulos desalinhados nos dois tipos', () => {
  const r2 = [{ mes: '2026-01', texto: 'a', valor: '1' }, { mes: '2026-02', texto: 'b', valor: '2' }];
  for (const tipo of ['barras', 'linha']) {
    assert.throws(() => svgGrafico({ tipo, valores: [1, 2, 3], rotulos: r2, titulo: 't' }), /rótulos e valores desalinhados/);
  }
});

test('valor zero vira barra de altura 0; diferente de zero tem mínimo de 1px', () => {
  const rot = [{ mes: '2026-01', texto: 'a', valor: '0' }, { mes: '2026-02', texto: 'b', valor: '5' }];
  const zero = svgGrafico({ tipo: 'barras', valores: [0, 5], rotulos: rot, titulo: 't' });
  assert.match(zero, /<rect class="grafico-barra" data-mes="2026-01"[^>]*height="0"><title>a: 0<\/title>/);
  const fino = svgGrafico({ tipo: 'barras', valores: [1000, 1], rotulos: rot, titulo: 't' });
  assert.match(fino, /data-mes="2026-02"[^>]*height="1"/);
});
