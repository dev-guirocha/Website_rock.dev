import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

test('build gera a home e preserva o CNAME', () => {
  assert.ok(existsSync('dist/index.html'), 'dist/index.html não existe');
  assert.equal(readFileSync('dist/CNAME', 'utf8').trim(), 'squadrockdev.com.br');
});

test('imagens otimizadas existem em public/images', () => {
  const esperadas = [
    'logo.png', 'logo-64.png', 'favicon-32.png', 'apple-touch-icon.png', 'guilherme.webp',
    'projetos/flowdesk.webp', 'projetos/marmitasdaka.webp',
    'projetos/flashcard.webp',
  ];
  const faltando = esperadas.filter((f) => !existsSync(join('public', 'images', f)));
  assert.deepEqual(faltando, []);
  console.log(`# imagens conferidas: ${esperadas.length}`);
});

test('o site antigo saiu do repo', () => {
  const antigos = ['backend', 'deploy', 'style.css', 'script.js', 'contato.html', 'images', 'CNAME'];
  assert.deepEqual(antigos.filter((f) => existsSync(f)), []);
});
