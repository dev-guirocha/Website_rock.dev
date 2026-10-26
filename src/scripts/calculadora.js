import { calcular } from '../lib/calculadora.js';
import { moeda, numero } from '../lib/formato.js';
import { preencher } from '../lib/i18n.js';

const form = document.querySelector('[data-calculadora]');
if (form) {
  const lang = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';
  const saida = (id, valor) => { form.querySelector(`[data-resultado="${id}"]`).textContent = valor; };
  const render = () => {
    try {
      const r = calcular({ horasMes: form.horasMes.value, custoHora: form.custoHora.value, pessoas: form.pessoas.value, investimento: form.investimento.value });
      saida('mensal', moeda(r.custoMensal, lang));
      saida('anual', moeda(r.custoAnual, lang));
      saida('retorno', r.semInvestimento ? form.dataset.semRetorno : r.mesesRetorno == null ? '—' : preencher(form.dataset.meses, { n: numero(r.mesesRetorno, lang, 1) }));
    } catch {
      ['mensal', 'anual', 'retorno'].forEach((id) => saida(id, '—'));
    }
  };
  form.addEventListener('input', render);
  form.addEventListener('submit', (ev) => ev.preventDefault());
  render();
}
