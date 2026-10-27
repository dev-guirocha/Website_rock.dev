// Gera public/images a partir dos originais em fontes/imagens. Rodar de novo só se um original mudar.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const ORIGEM = 'fontes/imagens';
const DESTINO = 'public/images';
mkdirSync(`${DESTINO}/projetos`, { recursive: true });

const PROJETOS = ['flowdesk', 'marmitasdaka', 'flashcard'];
const transparente = { r: 0, g: 0, b: 0, alpha: 0 };
await sharp(`${DESTINO}/logo.png`).resize(64, 64, { fit: 'contain', background: transparente }).png().toFile(`${DESTINO}/logo-64.png`);
await sharp(`${ORIGEM}/icon.png`).resize(32, 32, { fit: 'contain', background: transparente }).png().toFile(`${DESTINO}/favicon-32.png`);
await sharp(`${ORIGEM}/icon.png`).resize(180, 180, { fit: 'contain', background: transparente }).png().toFile(`${DESTINO}/apple-touch-icon.png`);
await sharp(`${ORIGEM}/guilherme.jpeg`).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${DESTINO}/guilherme.webp`);
for (const nome of PROJETOS) {
  await sharp(`${ORIGEM}/${nome}.png`).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${DESTINO}/projetos/${nome}.webp`);
}
console.log(`imagens: ${4 + PROJETOS.length} arquivos gerados`);
