import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { linkWhatsApp, linkEmail } from '../src/lib/whatsapp.js';

const contato = JSON.parse(readFileSync('src/config/contato.json', 'utf8'));

test('linkWhatsApp codifica a mensagem', () => {
  assert.equal(linkWhatsApp('5511900000001', 'Olá, tudo bem?'), 'https://wa.me/5511900000001?text=Ol%C3%A1%2C%20tudo%20bem%3F');
});

test('linkWhatsApp recusa número fictício ou malformado', () => {
  assert.throws(() => linkWhatsApp('5500000000000', 'x'), /inválido/);
  assert.throws(() => linkWhatsApp('123', 'x'), /inválido/);
});

test('linkEmail monta mailto com assunto', () => {
  assert.equal(linkEmail(contato.email, 'Contato pelo site'), `mailto:${contato.email}?subject=Contato%20pelo%20site`);
});

test('contato.json tem número real, e-mail do site e links https', () => {
  assert.doesNotThrow(() => linkWhatsApp(contato.whatsapp, 'teste'));
  assert.equal(contato.whatsapp, '5579998357214');
  assert.equal(contato.email, 'dev.guirocha@gmail.com');
  for (const k of ['linkedin', 'github', 'resume']) assert.match(contato[k], /^https:\/\//, k);
});
