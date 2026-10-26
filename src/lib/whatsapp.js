export function linkWhatsApp(numero, texto) {
  if (!/^55\d{10,11}$/.test(numero) || /^550+$/.test(numero)) throw new Error(`número de WhatsApp inválido: ${numero}`);
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export function linkEmail(email, assunto) {
  return `mailto:${email}?subject=${encodeURIComponent(assunto)}`;
}
