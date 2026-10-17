// Checks dist/ produced by `npm run build`.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const dist = new URL('../dist/icons/', import.meta.url);
const read = p => readFile(new URL(p, dist), 'utf8');
const built = await access(new URL('manifest.json', dist)).then(() => true, () => false);

test('build output matches its manifest and catalog', { skip: !built && 'run npm run build first' }, async () => {
  const manifest = JSON.parse(await read('manifest.json'));
  const catalog = JSON.parse(await read('catalog.json'));
  assert.equal(manifest.version, '2.0.4');
  assert.equal(catalog.icons.length, 211);
  assert.equal(Object.keys(catalog.categories).length, 13);
  for (const [file, { sha256 }] of Object.entries(manifest.files)) {
    const hash = createHash('sha256').update(await readFile(new URL(file, dist))).digest('hex');
    assert.equal(hash, sha256, file);
  }
  for (const icon of catalog.icons) {
    const code = await read(icon.codePath);
    assert.equal(createHash('sha256').update(code).digest('hex'), icon.sha256, icon.id);
    assert.ok(manifest.files[`downloads/svg/${icon.id}.svg`] && manifest.files[`api/v1/icons/${icon.id}.json`], icon.id);
  }
  for (const zip of ['skill-2.0.4', 'source-2.0.4', 'skill-2.0.3', 'source-2.0.3', 'skill-2.0.2', 'source-2.0.2', 'skill-2.0.1', 'source-2.0.1', 'skill-2.0.0', 'source-2.0.0', 'skill-1.2.0', 'source-1.2.0', 'skill-1.0.0']) assert.ok(manifest.files[`downloads/lucian-icons-${zip}.zip`], zip);
});

test('pages have no unfilled placeholders', { skip: !built && 'run npm run build first' }, async () => {
  for (const page of ['index.html', 'guide.html']) {
    const html = await read(page);
    assert.doesNotMatch(html, /\{\{[A-Z_]+\}\}/, page);
    assert.match(html, /211/, page);
  }
  assert.equal((await read('guide.html')).match(/<tr><td><a href="\.\/#/g).length, 52, 'state table rows');
});
