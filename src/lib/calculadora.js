export const LIMITES = { horasMes: 744, custoHora: 100000, pessoas: 10000, investimento: 1e9 };

const vazio = (v) => v === '' || v == null;

export function calcular({ horasMes, custoHora, pessoas, investimento }) {
  const entradas = { horasMes, custoHora, pessoas };
  const [h, c, p] = Object.keys(entradas).map((k) => (vazio(entradas[k]) ? NaN : Number(entradas[k])));
  const ok = (n, max) => Number.isFinite(n) && n >= 0 && n <= max;
  if (!ok(h, LIMITES.horasMes) || !ok(c, LIMITES.custoHora) || !ok(p, LIMITES.pessoas)) throw new Error('entrada inválida');
  const semInvestimento = vazio(investimento);
  const inv = semInvestimento ? NaN : Number(investimento);
  if (Number.isFinite(inv) && inv > LIMITES.investimento) throw new Error('entrada inválida');
  const custoMensal = h * c * p;
  const mesesRetorno = !Number.isFinite(inv) || inv < 0 || custoMensal === 0 ? null : Math.round((inv / custoMensal) * 10) / 10;
  return { custoMensal, custoAnual: custoMensal * 12, mesesRetorno, semInvestimento };
}
