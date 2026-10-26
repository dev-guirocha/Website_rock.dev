const soma = (xs, f) => xs.reduce((s, x) => s + f(x), 0);
const porId = (x, y) => (x < y ? -1 : x > y ? 1 : 0);

export function ultimosMeses(meses, n) {
  if (!Number.isInteger(n) || n < 1) throw new Error('período inválido: ' + n);
  return meses.slice(-n);
}

function periodo(meses, n) {
  const p = ultimosMeses(meses, n);
  if (p.length === 0) throw new Error('sem meses no período');
  return p;
}

function pontoDoMes(serie, mes, id) {
  const p = serie.find((q) => q.mes === mes);
  if (!p) throw new Error(`mês ausente na série de ${id}: ${mes}`);
  return p;
}

export function resumoAssessoria(dados, { n = 12, assessor = 'todos' } = {}) {
  const meses = periodo(dados.meses, n);
  const lista = assessor === 'todos' ? dados.assessores : dados.assessores.filter((a) => a.id === assessor);
  if (lista.length === 0) throw new Error(`assessor desconhecido: ${assessor}`);
  const porMes = meses.map((mes) => {
    const pontos = lista.map((a) => pontoDoMes(a.serie, mes, a.id));
    return { mes, captacao: soma(pontos, (p) => p.captacao), receita: soma(pontos, (p) => p.receita), clientes: soma(pontos, (p) => p.clientes) };
  });
  const ranking = lista
    .map((a) => ({ id: a.id, nome: a.nome, captacao: soma(meses, (mes) => pontoDoMes(a.serie, mes, a.id).captacao) }))
    .sort((x, y) => y.captacao - x.captacao || porId(x.id, y.id));
  const ultimo = porMes[porMes.length - 1];
  return {
    meses,
    porMes,
    ranking,
    captacao: soma(porMes, (p) => p.captacao),
    receita: soma(porMes, (p) => p.receita),
    clientes: ultimo.clientes,
    receitaPorCliente: ultimo.clientes ? ultimo.receita / ultimo.clientes : 0,
  };
}

export function resumoPme(dados, { n = 12, categoria = 'todas' } = {}) {
  const meses = periodo(dados.meses, n);
  const lista = categoria === 'todas' ? dados.categorias : dados.categorias.filter((c) => c.id === categoria);
  if (lista.length === 0) throw new Error(`categoria desconhecida: ${categoria}`);
  const margemPct = (vendas, custo) => (vendas ? ((vendas - custo) / vendas) * 100 : 0);
  const porMes = meses.map((mes) => {
    const pontos = lista.map((c) => pontoDoMes(c.serie, mes, c.id));
    const vendas = soma(pontos, (p) => p.vendas);
    const custo = soma(pontos, (p) => p.custo);
    return { mes, vendas, custo, margem: vendas - custo };
  });
  const porCategoria = lista
    .map((c) => {
      const vendas = soma(meses, (mes) => pontoDoMes(c.serie, mes, c.id).vendas);
      const custo = soma(meses, (mes) => pontoDoMes(c.serie, mes, c.id).custo);
      return { id: c.id, nome: c.nome, vendas, custo, margem: vendas - custo, margemPct: margemPct(vendas, custo) };
    })
    .sort((x, y) => y.vendas - x.vendas || porId(x.id, y.id));
  const vendas = soma(porMes, (p) => p.vendas);
  const custo = soma(porMes, (p) => p.custo);
  return { meses, porMes, porCategoria, vendas, custo, margem: vendas - custo, margemPct: margemPct(vendas, custo) };
}
