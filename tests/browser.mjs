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
const visible = page => page.locator('#icon-grid .g-key:not([hidden])').count();
const key = id => `#icon-grid .g-key[data-id="${id}"]`;
const open = async (page, hash = '') => { await page.goto(base + hash); await page.waitForFunction(() => document.querySelectorAll('#icon-grid .g-key').length > 0 && customElements.get('lucian-heart')); };
const narrow = { viewport: { width: 900, height: 900 } };

await check('gallery renders 211 keys in 13 categories, five per row; visible keys demo themselves with a cursor', async page => {
  await open(page);
  assert.equal(await page.locator('#icon-grid .g-key').count(), 211);
  assert.equal(await page.locator('#icon-grid .g-bank').count(), 13);
  const tops = await page.locator('#icon-grid .g-key').evaluateAll(els => els.slice(0, 6).map(e => e.offsetTop));
  assert.equal(new Set(tops.slice(0, 5)).size, 1, 'first five share a row');
  assert.notEqual(tops[4], tops[5], 'sixth wraps');
  assert.equal(await page.locator('#main.has-insp').count(), 0, 'the inspector waits for a click');
  await page.evaluate(() => scrollTo(0, document.querySelector('#main').getBoundingClientRect().top + scrollY - 80));
  await page.waitForTimeout(1500);
  assert.ok(await page.locator('#icon-grid .g-key.is-live').count() >= 5, 'visible keys demo themselves');
  assert.ok(await page.locator('#icon-grid .g-ghost.is-on').count() >= 3, 'the demo cursor is drawn');
  await shot(page, 'qa-gallery');
});

await check('the hero card demonstrates featured icons with the cursor and answers a click', async page => {
  await open(page);
  await page.waitForSelector('#pad .g-ghost.is-on', { state: 'attached' });
  assert.equal(await page.locator('#pad .g-pick').count(), 6);
  await page.click('#pad .g-pick[data-id="bulb"]');
  assert.match(await page.textContent('#screen-name'), /전구|bulb/i);
  assert.equal(await page.getAttribute('#pad .g-pick[data-id="bulb"]', 'aria-pressed'), 'true');
  const before = await page.locator('#hero-hit lucian-bulb').evaluate(e => e.state);
  await page.click('#hero-hit');
  assert.notEqual(await page.locator('#hero-hit lucian-bulb').evaluate(e => e.state), before);
  await shot(page, 'qa-hero');
});

await check('hovering a key changes nothing: its demo keeps running', async page => {
  await open(page);
  await page.evaluate(() => scrollTo(0, document.querySelector('#main').getBoundingClientRect().top + scrollY - 80));
  await page.waitForSelector(key('folder') + '.is-live');
  await page.hover(key('folder'));
  await page.waitForTimeout(1800);
  assert.equal(await page.locator(key('folder') + '.is-live').count(), 1, 'demo still running under the pointer');
  assert.equal(await page.getAttribute(`${key('folder')} lucian-folder`, 'animate'), 'none');
});

await check('category, search, slash shortcut and empty state', async page => {
  await open(page);
  await page.click('.g-cat[data-cat="security"]');
  assert.equal(await visible(page), Number(await page.locator('.g-cat[data-cat="security"] i').textContent()));
  assert.equal(await page.locator('#icon-grid .g-bank:not([hidden])').count(), 1, 'only the security bank heading');
  await page.click('.g-cat[data-cat="all"]');
  await page.keyboard.press('/');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'q');
  await page.keyboard.type('삭제');
  await page.waitForTimeout(200);
  assert.equal(await page.inputValue('#q'), '삭제', 'typing right after opening keeps order');
  assert.ok(await page.locator(key('trash') + ':not([hidden])').count() === 1);
  await page.fill('#q', 'zzzzqqq'); await page.waitForTimeout(200);
  assert.equal(await visible(page), 0);
  assert.ok(await page.locator('#empty').isVisible());
  await page.click('#empty-reset');
  assert.equal(await visible(page), 211);
});

await check('language, tone and theme persist', async page => {
  await open(page);
  await page.click('.g-lang-b[data-lang="en"]');
  assert.equal(await page.getAttribute('html', 'lang'), 'en');
  assert.match(await page.title(), /animated icons/);
  await page.click('#tone');
  assert.equal(await page.getAttribute(`${key('heart')} lucian-heart`, 'tone'), 'line');
  await page.click('#theme');
  const theme = await page.getAttribute('html', 'data-theme');
  await page.reload(); await page.waitForTimeout(400);
  assert.equal(await page.getAttribute('html', 'lang'), 'en');
  assert.equal(await page.getAttribute('html', 'data-theme'), theme);
  assert.equal(await page.getAttribute(`${key('heart')} lucian-heart`, 'tone'), 'line');
  await page.evaluate(() => localStorage.clear());
});

await check('dark theme: surfaces keep their hue (no olive or brown); light and line tone unchanged', async page => {
  // Reads a surface's (.s) fill through a canvas so any CSS color syntax compares as sRGB; alpha includes fill-opacity.
  const surfaces = () => page.evaluate(() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
    const rgba = id => { const s = document.querySelector(`.g-key[data-id="${id}"] lucian-${id}`).shadowRoot.querySelector('.s');
      const cs = getComputedStyle(s); cx.clearRect(0, 0, 1, 1); cx.fillStyle = cs.fill; cx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data; return [r, g, b, Math.round(a * parseFloat(cs.fillOpacity))]; };
    return { folder: rgba('folder'), star: rgba('stickynote'), trash: rgba('trash') };
  });
  await open(page);
  const light = await surfaces();
  assert.ok(Math.abs(light.folder[3] - 61) <= 3, `light tint stays at .24 (${light.folder})`);
  await page.evaluate(() => localStorage.setItem('lucian-icons-theme', 'dark'));
  await page.reload(); await page.waitForFunction(() => customElements.get('lucian-folder')); await page.waitForTimeout(300);
  const dark = await surfaces();
  for (const [id, [r, g, b, a]] of Object.entries(dark)) {
    assert.equal(a, 255, `${id} surface is solid in dark (${dark[id]})`);
    assert.ok(Math.max(r, g, b) >= 170 && Math.max(r, g, b) - Math.min(r, g, b) >= 90, `${id} keeps a bright, saturated hue (${dark[id]})`);
  }
  assert.ok(dark.folder[0] > dark.folder[2] + 120 && dark.star[1] > 150, `warm surfaces read as amber and yellow (${dark.folder} ${dark.star})`);
  await page.click('#tone');
  await page.waitForFunction(() => document.querySelector('.g-key[data-id="folder"] lucian-folder').getAttribute('tone') === 'line');
  assert.equal((await surfaces()).folder[3], 0, 'line tone has no surface in dark');
  await page.evaluate(() => localStorage.clear());
});

await check('wide: a click steps the key and opens the docked inspector; both stay in sync', async (page, ctx) => {
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(base).origin });
  await open(page);
  await page.click('#auto');
  await page.click(key('heart'));
  assert.equal(await page.locator(`${key('heart')} lucian-heart`).evaluate(e => e.state), 'on');
  await page.waitForSelector('#main.has-insp');
  assert.equal(await page.locator('#d-stage lucian-heart').evaluate(e => e.state), 'on', 'the inspector follows the key');
  assert.ok(await page.locator(key('heart') + '.is-sel').count() === 1);
  const tops = await page.locator('#icon-grid .g-key').evaluateAll(els => els.slice(0, 6).map(e => e.offsetTop));
  assert.equal(new Set(tops.slice(0, 5)).size, 1, 'still five per row beside the inspector');
  assert.equal(await page.locator('#dlg-icon[open]').count(), 0, 'no sheet on wide screens');
  await page.waitForTimeout(600);
  await page.click('#d-hit');
  assert.equal(await page.locator(`${key('heart')} lucian-heart`).evaluate(e => e.state), 'off', 'the key follows the inspector');
  await page.click('#d-states [data-s="on"]');
  assert.equal(await page.locator(`${key('heart')} lucian-heart`).evaluate(e => e.state), 'on');
  await page.click('#d-tabs [data-tab="react"]');
  assert.match(await page.inputValue('#d-code'), /lucian-heart/);
  await page.click('#d-copy');
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /lucian-heart/);
  for (const [btn, ext] of [['#d-svg', '.svg'], ['#d-html', '.html']]) {
    const [dl] = await Promise.all([page.waitForEvent('download'), page.click(btn)]);
    assert.ok(dl.suggestedFilename().endsWith(ext));
  }
  await shot(page, 'qa-inspector');
  await page.click('#insp [data-close]');
  await page.waitForFunction(() => !document.querySelector('#main').classList.contains('has-insp'));
  await page.click(key('bell'));
  await page.waitForSelector('#main.has-insp');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('#main').classList.contains('has-insp'));
});

await check('reel deep link; rail copy and code; sheet states, code, downloads; Escape twice', async (page, ctx) => {
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(base).origin });
  await open(page, '#download');
  await page.waitForSelector('body[data-view="reel"] .g-slide.is-on lucian-download');
  await page.waitForTimeout(400);
  assert.equal(await page.locator('#icon-grid .g-key.is-live, #hero-hit.is-live').count(), 0, 'deck and hero pause behind the reel');
  assert.equal(await page.locator('.g-slide.is-on .is-live').count(), 1, 'the icon on screen demonstrates itself');
  await page.click('.g-slide.is-on [data-act="copy"]');
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /<lucian-download/);
  const [svg] = await Promise.all([page.waitForEvent('download'), page.click('.g-slide.is-on [data-act="svg"]')]);
  assert.match(svg.suggestedFilename(), /^lucian-download.*\.svg$/);
  await page.click('.g-slide.is-on [data-act="code"]');
  await page.waitForSelector('#dlg-icon[open] #d-stage lucian-download');
  assert.equal(await page.locator('.g-slide.is-on .is-live').count(), 0, 'the reel pauses behind the sheet');
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
  await shot(page, 'qa-sheet');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#dlg-icon[open]').count(), 0);
  assert.equal(await page.locator('#insp #insp-in').count(), 1, 'the inspector returns to its dock');
  assert.equal(await page.getAttribute('body', 'data-view'), 'reel', 'the first Escape only closes the sheet');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.body.dataset.view === 'grid');
  assert.equal(new URL(page.url()).hash, '');
});

await check('narrow: a key opens the reel; the big key steps state or replays its effect', async page => {
  await open(page);
  await page.click('#auto');
  await page.click(key('heart'));
  await page.waitForSelector('body[data-view="reel"] .g-slide.is-on lucian-heart');
  assert.equal(new URL(page.url()).hash, '#heart');
  await shot(page, 'qa-reel');
  await page.click('.g-slide.is-on .g-slide-hit');
  assert.equal(await page.locator('.g-slide.is-on lucian-heart').evaluate(e => e.state), 'on');
  assert.equal(await page.getAttribute('.g-slide.is-on [data-s="on"]', 'aria-pressed'), 'true');
  await page.click('.g-slide.is-on [data-s="off"]');
  assert.equal(await page.locator('.g-slide.is-on lucian-heart').evaluate(e => e.state), 'off');
  await page.keyboard.press('ArrowDown');
  await page.waitForFunction(() => location.hash === '#calendar' && document.querySelector('.g-slide.is-on lucian-calendar'));
  await page.waitForTimeout(800);
  await page.click('.g-slide.is-on .g-slide-hit');
  assert.ok(await page.locator('.g-slide.is-on lucian-calendar').evaluate(e => e.shadowRoot.getAnimations().length) > 0, 'a stateless icon plays its effect');
}, narrow);

await check('reel follows the filter; keys move; Escape and Back land on the last key seen', async page => {
  await open(page);
  await page.click('.g-cat[data-cat="security"]');
  const shown = page.locator('#icon-grid .g-key:not([hidden])'), n = await shown.count();
  const ids = await shown.evaluateAll(els => els.map(e => e.dataset.id));
  await shown.first().focus();
  await page.keyboard.press('Enter');
  await page.waitForSelector('body[data-view="reel"]');
  assert.equal(await page.textContent('#prog-t'), String(n).padStart(3, '0'), 'reel holds only the filtered icons');
  await page.keyboard.press('ArrowDown');
  await page.waitForFunction(id => location.hash === '#' + id, ids[1]);
  await page.keyboard.press('End');
  await page.waitForFunction(id => location.hash === '#' + id, ids[n - 1]);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.body.dataset.view === 'grid');
  assert.equal(new URL(page.url()).hash, '');
  assert.equal(await page.evaluate(() => document.activeElement.closest('.g-key')?.dataset.id), ids[n - 1], 'focus returns to the last icon seen');
  const box = await page.locator(key(ids[n - 1])).boundingBox();
  assert.ok(box.y >= 0 && box.y + box.height <= 900, 'its key is scrolled into view');
  await page.click(key(ids[0]));
  await page.waitForSelector('body[data-view="reel"]');
  await page.goBack();
  await page.waitForFunction(() => document.body.dataset.view === 'grid' && location.hash === '');
  await page.click('#to-reel');
  await page.waitForFunction(id => document.body.dataset.view === 'reel' && location.hash === '#' + id, ids[0]);
  await page.click('#hud [data-act="back"]');
  await page.waitForFunction(() => document.body.dataset.view === 'grid' && location.hash === '');
}, narrow);

await check('arrow keys move between keys across banks', async page => {
  await open(page);
  await page.click('#auto');
  await page.locator(key('signature')).focus();
  await page.waitForTimeout(100);
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.evaluate(() => document.activeElement.dataset.id), 'envelope', 'right steps into the next bank');
  const x = await page.evaluate(() => document.activeElement.offsetLeft);
  await page.keyboard.press('ArrowUp');
  const up = await page.evaluate(() => ({ id: document.activeElement.dataset.id, x: document.activeElement.offsetLeft }));
  assert.equal(up.x, x, 'up keeps the column');
  assert.notEqual(up.id, 'envelope');
  await page.keyboard.press('Home');
  assert.equal(await page.evaluate(() => document.activeElement.dataset.id), 'trash');
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
  await page.waitForTimeout(800);
  assert.equal(await page.locator('.is-live').count(), 0, 'no demos run');
  await page.click(key('heart'));
  await page.waitForSelector('.g-slide.is-on lucian-heart');
  assert.equal(await page.evaluate(() => document.querySelector('.g-slide.is-on .g-rspec').getAnimations().length), 0, 'the reel opens without a zoom');
}, { reducedMotion: 'reduce', ...narrow });

for (const width of [320, 390, 768, 1440]) {
  await check(`no horizontal overflow at ${width}px (gallery and guide)`, async page => {
    for (const p of ['', 'guide.html']) {
      await page.goto(base + p); await page.waitForTimeout(500);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0, p || 'index');
    }
    if (width === 390) await shot(page, 'qa-guide-390');
    await page.goto(base + '#heart'); await page.waitForFunction(() => customElements.get('lucian-heart'));
    await page.waitForSelector('.g-slide.is-on .g-slide-t');
    await page.waitForTimeout(900);
    const o = await page.evaluate(() => {
      const s = document.querySelector('.g-slide.is-on'), i = s.querySelector('.g-rspec').getBoundingClientRect(), m = s.querySelector('.g-slide-meta').getBoundingClientRect();
      const r = s.querySelector('.g-rail').getBoundingClientRect(), h = document.querySelector('.g-hud').getBoundingClientRect();
      const hudIn = [...document.querySelectorAll('.g-hud button, .g-prog')].every(e => { const b = e.getBoundingClientRect(); return b.left >= 0 && b.right <= innerWidth; });
      return { over: document.documentElement.scrollWidth - innerWidth, apart: i.bottom <= m.top + 1 || i.left >= m.right - 1, rail: i.right <= r.left + 1 || i.bottom <= r.top + 1, hud: i.top >= h.bottom - 1, inside: i.left >= 0 && i.right <= innerWidth, hudIn };
    });
    assert.deepEqual(o, { over: 0, apart: true, rail: true, hud: true, inside: true, hudIn: true }, 'reel layout');
    if (width === 390) await shot(page, 'qa-reel-390');
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
  assert.equal(await page.locator('.d-table--states tbody tr').count(), 52);
});

await browser.close();
for (const r of results) console.log(r.join('  '));
const failed = results.filter(r => r[0] === 'FAIL').length;
console.log(`${results.length - failed}/${results.length} browser checks passed`);
process.exitCode = failed ? 1 : 0;
