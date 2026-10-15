// Browser QA for the built gallery, guide and runtime. Not part of `npm test`.
// Needs playwright-core and Chrome/Chromium:
//   npm run build && npm run serve   (another terminal)
//   PLAYWRIGHT_CORE=/path/to/node_modules/playwright-core CHROME=/path/to/chrome node tests/browser.mjs
// TEST_URL defaults to http://localhost:4173/icons/. SHOTS=dir saves screenshots.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const pw = await import(process.env.PLAYWRIGHT_CORE ? pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE, 'index.mjs')).href : 'playwright-core')
  .catch(() => { console.error('playwright-core not found. Set PLAYWRIGHT_CORE to its folder.'); process.exit(2); });
const base = process.env.TEST_URL || 'http://localhost:4173/icons/';
const executablePath = process.env.CHROME || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
const browser = await pw.chromium.launch({ executablePath });
const results = [];
async function check(name, fn, ctxOptions = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1360, height: 900 }, ...ctxOptions });
  const page = await ctx.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('requestfailed', r => errors.push('request failed ' + r.url()));
  try {
    await fn(page, ctx);
    assert.deepEqual(errors, [], 'page errors');
    results.push(['ok', name]);
  } catch (e) { results.push(['FAIL', name, e.message.split('\n')[0]]); }
  await ctx.close();
}
const shot = async (page, name) => { if (process.env.SHOTS) await page.screenshot({ path: path.join(process.env.SHOTS, name + '.png') }); };
const visible = page => page.locator('.g-tile:not([hidden])').count();
const open = async (page, hash = '') => { await page.goto(base + hash); await page.waitForFunction(() => document.querySelectorAll('.g-tile').length > 0 && customElements.get('lucian-heart')); };

await check('gallery renders 212 tiles, 4 per row, with live demos', async page => {
  await open(page);
  assert.equal(await page.locator('.g-tile').count(), 212);
  const tops = await page.locator('.g-tile').evaluateAll(els => els.slice(0, 8).map(e => e.offsetTop));
  assert.equal(new Set(tops.slice(0, 4)).size, 1, 'first four share a row');
  assert.notEqual(tops[3], tops[4], 'fifth wraps');
  await page.evaluate(() => scrollTo(0, document.querySelector('#grid').offsetTop - 80));
  await page.waitForTimeout(1500);
  assert.ok(await page.locator('.g-tile.is-live').count() >= 4, 'visible tiles demo themselves');
  await shot(page, 'qa-gallery');
});

await check('category, search, slash shortcut and empty state', async page => {
  await open(page);
  await page.click('.g-cat[data-cat="security"]');
  assert.equal(await visible(page), Number(await page.locator('.g-cat[data-cat="security"] i').textContent()));
  await page.click('.g-cat[data-cat="all"]');
  await page.keyboard.press('/');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'q');
  await page.keyboard.type('삭제');
  await page.waitForTimeout(200);
  assert.equal(await page.inputValue('#q'), '삭제', 'typing right after opening keeps order');
  assert.ok(await page.locator('.g-tile[data-id="trash"]:not([hidden])').count() === 1);
  await page.fill('#q', 'zzzzqqq'); await page.waitForTimeout(200);
  assert.equal(await visible(page), 0);
  assert.ok(await page.locator('#empty').isVisible());
  await page.click('#empty-reset');
  assert.equal(await visible(page), 212);
});

await check('language, tone and theme persist', async page => {
  await open(page);
  await page.click('.g-lang-b[data-lang="en"]');
  assert.equal(await page.getAttribute('html', 'lang'), 'en');
  assert.match(await page.title(), /animated icons/);
  await page.click('#tone');
  assert.equal(await page.getAttribute('.g-tile[data-id="heart"] lucian-heart', 'tone'), 'line');
  await page.click('#theme');
  const theme = await page.getAttribute('html', 'data-theme');
  await page.reload(); await page.waitForTimeout(400);
  assert.equal(await page.getAttribute('html', 'lang'), 'en');
  assert.equal(await page.getAttribute('html', 'data-theme'), theme);
  assert.equal(await page.getAttribute('.g-tile[data-id="heart"] lucian-heart', 'tone'), 'line');
  await page.evaluate(() => localStorage.clear());
});

await check('detail dialog: deep link, states, code, copy, downloads, Escape', async (page, ctx) => {
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(base).origin });
  await open(page, '#download');
  await page.waitForSelector('#dlg-icon[open]');
  assert.equal(await page.locator('.g-tile.is-live').count(), 0, 'tile demos pause behind the dialog');
  await page.click('#d-states [data-s="error"]');
  assert.equal(await page.locator('#d-stage lucian-download').evaluate(e => e.state), 'error');
  await page.click('#d-tabs [data-tab="react"]');
  assert.match(await page.inputValue('#d-code'), /lucian-download/);
  await page.click('#d-copy');
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /lucian-download/);
  for (const [btn, ext] of [['#d-svg', '.svg'], ['#d-html', '.html']]) {
    const [dl] = await Promise.all([page.waitForEvent('download'), page.click(btn)]);
    assert.ok(dl.suggestedFilename().endsWith(ext));
  }
  await shot(page, 'qa-detail');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#dlg-icon[open]').count(), 0);
  assert.equal(new URL(page.url()).hash, '');
});

await check('keyboard focus plays the effect; tile click advances state', async page => {
  await open(page);
  await page.click('#auto');
  const heart = page.locator('.g-tile[data-id="heart"] .g-stage');
  await heart.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  await heart.press('Enter');
  assert.equal(await page.locator('.g-tile[data-id="heart"] lucian-heart').evaluate(e => e.state), 'on');
});

await check('runtime: rapid interruption settles on the last state; duplicates stay independent', async page => {
  await open(page);
  const out = await page.evaluate(async () => {
    const a = document.createElement('lucian-trash'), b = document.createElement('lucian-trash');
    document.body.append(a, b);
    for (let i = 0; i < 25; i++) a.setState(i % 2 ? 'open' : 'closed');
    a.setState('open');
    await new Promise(r => setTimeout(r, 1500));
    const lid = el => { const cs = getComputedStyle(el.shadowRoot.querySelector('[data-part="lid"]')); return [cs.rotate, cs.translate, cs.transform].join(' '); };
    const res = { a: a.state, b: b.state, differ: lid(a) !== lid(b), running: a.shadowRoot.getAnimations().filter(x => x.playState === 'running').length };
    let threw = false; try { a.setState('nope'); } catch (e) { threw = e instanceof RangeError; }
    a.remove(); document.body.append(a); res.reinserted = a.state;
    return { ...res, threw };
  });
  assert.deepEqual(out, { a: 'open', b: 'closed', differ: true, running: 0, reinserted: 'open', threw: true });
});

await check('reduced motion: no animations, final pose applied', async page => {
  await open(page);
  const out = await page.evaluate(() => {
    const el = document.createElement('lucian-download'); document.body.append(el);
    el.setState('progress'); el.setProgress(50); el.play();
    return { state: el.state, anims: el.shadowRoot.getAnimations().length };
  });
  assert.deepEqual(out, { state: 'progress', anims: 0 });
  assert.equal(await page.locator('.g-tile.is-live').count(), 0, 'gallery demos off');
}, { reducedMotion: 'reduce' });

for (const width of [320, 390, 768, 1440]) {
  await check(`no horizontal overflow at ${width}px (gallery and guide)`, async page => {
    for (const p of ['', 'guide.html']) {
      await page.goto(base + p); await page.waitForTimeout(500);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0, p || 'index');
    }
    if (width === 390) await shot(page, 'qa-guide-390');
  }, { viewport: { width, height: 900 } });
}

await check('guide demos drive real element state', async page => {
  await page.goto(base + 'guide.html'); await page.waitForTimeout(400);
  await page.click('[data-dl="start"]'); await page.click('[data-dl="step"]');
  assert.equal(await page.locator('#demo-dl').evaluate(e => e.state), 'progress');
  assert.equal(await page.getAttribute('#demo-dl', 'progress'), '25');
  await page.click('[data-dl="success"]');
  assert.equal(await page.textContent('#demo-dl-state'), 'success');
  await page.click('#demo-like');
  assert.equal(await page.locator('#demo-like lucian-heart').evaluate(e => e.state), 'on');
  assert.equal(await page.locator('.d-table--states tbody tr').count(), 53);
});

await browser.close();
for (const r of results) console.log(r.join('  '));
const failed = results.filter(r => r[0] === 'FAIL').length;
console.log(`${results.length - failed}/${results.length} browser checks passed`);
process.exitCode = failed ? 1 : 0;
