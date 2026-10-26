const raiz = document.querySelector('[data-assistente]');
if (raiz) {
  const log = raiz.querySelector('[data-log]');
  const pares = new Map([...log.querySelectorAll('[data-pergunta]')].map((li) => [li.dataset.pergunta, li]));
  pares.forEach((li) => { li.hidden = true; });
  const botoes = raiz.querySelector('[data-perguntas]');
  botoes.hidden = false;
  botoes.addEventListener('click', (ev) => {
    const botao = ev.target.closest('[data-perguntar]');
    if (!botao) return;
    const li = pares.get(botao.dataset.perguntar);
    if (!li) return;
    li.hidden = false;
    log.append(li);
    raiz.querySelectorAll('.destacado').forEach((el) => el.classList.remove('destacado'));
    const { destaqueAssessor, destaqueMes } = li.dataset;
    if (destaqueAssessor) raiz.querySelector(`[data-assessor="${destaqueAssessor}"]`)?.classList.add('destacado');
    if (destaqueMes) raiz.querySelector(`rect[data-mes="${destaqueMes}"]`)?.classList.add('destacado');
    li.scrollIntoView({ block: 'nearest' });
  });
}
