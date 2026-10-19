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
  assert.equal(manifest.version, '2.0.13');
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
  assert.ok(manifest.files['downloads/lucian-icons-skill-2.0.13.zip']);
  for (const version of ['2.0.12', '2.0.11', '2.0.10', '2.0.9', '2.0.8', '2.0.7', '2.0.6', '2.0.5', '2.0.4', '2.0.3', '2.0.2', '2.0.1', '2.0.0', '1.2.0', '1.1.0', '1.0.0']) {
    assert.ok(manifest.files[`downloads/lucian-icons-skill-${version}.zip`], version);
  }
});

test('pages have no unfilled placeholders', { skip: !built && 'run npm run build first' }, async () => {
  for (const page of ['index.html', 'guide.html']) {
    const html = await read(page);
    assert.doesNotMatch(html, /\{\{[A-Z_]+\}\}/, page);
    assert.match(html, /211/, page);
  }
  assert.equal((await read('guide.html')).match(/<tr><td><a href="\.\/#/g).length, 52, 'state table rows');
});

test('website source archives are not published', { skip: !built && 'run npm run build first' }, async () => {
  const manifest = JSON.parse(await read('manifest.json'));
  assert.deepEqual(Object.keys(manifest.files).filter(file => /lucian-icons-source-.*\.zip$/.test(file)), [], 'current and archived website source ZIPs must not be downloadable');
  for (const page of ['index.html', 'guide.html']) {
    assert.ok(!(await read(page)).includes('lucian-icons-source-'), `${page} must not link a withdrawn source archive`);
  }
  assert.ok(manifest.files[`downloads/lucian-icons-skill-${manifest.version}.zip`], 'the icon-only skill remains downloadable');
});

test('brand artwork is referenced from the official site instead of bundled', { skip: !built && 'run npm run build first' }, async () => {
  const manifest = JSON.parse(await read('manifest.json'));
  for (const asset of ['favicon.svg', 'og.png']) {
    assert.ok(!manifest.files[asset], `${asset} must not be published`);
    await assert.rejects(access(new URL(asset, dist)), { code: 'ENOENT' });
  }
  for (const page of ['index.html', 'guide.html']) {
    const html = await read(page);
    assert.ok(!/<svg class="g-logo"|\.\/favicon\.svg|\/og\.png/.test(html), `${page} must not bundle reserved logo assets`);
    assert.ok(html.includes('<img class="g-logo" src="https://lucianlabs.dev/favicon.svg"'), `${page} keeps the official header logo`);
    assert.match(html, /rel="icon" href="https:\/\/lucianlabs\.dev\/favicon\.svg"/);
  }
});
