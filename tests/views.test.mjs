import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

test('nenhuma view, layout ou componente embute JSON sem passar por jsonEmbutido', () => {
  let conferidos = 0;
  for (const dir of ['src/views', 'src/layouts', 'src/components']) {
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.astro'))) {
      conferidos++;
      const src = readFileSync(`${dir}/${f}`, 'utf8');
      assert.ok(!src.includes('JSON.stringify('), `${dir}/${f} usa JSON.stringify( em vez de jsonEmbutido`);
    }
  }
  assert.ok(conferidos > 0, 'nenhum arquivo conferido');
});
