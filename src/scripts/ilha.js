export function iniciarIlha(painel, render) {
  const raiz = document.querySelector(`[data-painel="${painel}"]`);
  if (!raiz) return;
  const dados = JSON.parse(raiz.querySelector('[data-dados]').textContent);
  const lang = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';
  const form = raiz.querySelector('[data-filtros]');
  const kpi = (id, valor) => { raiz.querySelector(`[data-kpi="${id}"] [data-valor]`).textContent = valor; };
  const ctx = { raiz, dados, lang, form, kpi };
  render(ctx);
  form.hidden = false;
  form.addEventListener('change', () => render(ctx));
}
