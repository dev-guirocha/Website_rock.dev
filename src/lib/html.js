const ENTIDADES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ENTIDADES[c]);

const JSON_SEGURO = { '<': '\\u003c', '>': '\\u003e', '&': '\\u0026' };
export const jsonEmbutido = (valor) => JSON.stringify(valor).replace(/[<>&]/g, (c) => JSON_SEGURO[c]);
