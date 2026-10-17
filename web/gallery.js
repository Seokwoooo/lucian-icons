/* Lucian Icons gallery | MIT (c) 2026 Lucian */
import { definitions as defs, categories } from './all.js';
import { copy } from './i18n.js';
import { statesOf } from './runtime/icon.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement, body = document.body;
const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage may be blocked */ } } };
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
const PALETTE = ['#F05465', '#F48D2F', '#F4AF2D', '#43B966', '#24B6A1', '#3093EC', '#5D73EA', '#8968F4', '#E662A8'];
const num = i => String(i + 1).padStart(3, '0');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let lang = html.lang === 'en' ? 'en' : 'ko';
let tone = html.dataset.tone === 'line' ? 'line' : 'color';
let autoOn = !reduce.matches && store.get('lucian-icons-auto') !== 'off';
let cat = 'all', query = '', dialogOpen = false, view = 'grid';
const t = key => {
  const v = copy[lang][key] ?? copy.ko[key] ?? key;
  return typeof v === 'string' ? v.replaceAll('{count}', defs.length).replaceAll('{cats}', Object.keys(categories).length) : v;
};
const stateText = (d, s) => d.stateLabels?.[lang]?.[s] || s;
const catText = c => categories[c]?.[lang] || c;

/* ---------- Tiles: the whole tile opens the icon full screen ---------- */
const grid = $('#icon-grid');
const byId = new Map(defs.map(d => [d.id, d]));
grid.innerHTML = defs.map((d, i) => `<article class="g-tile is-new" data-id="${d.id}" style="--h:${d.color};--d:${Math.min(i, 11) * 45}ms">
<button class="g-stage" type="button"><lucian-${d.id} class="g-icon" data-icon animate="none"${tone === 'line' ? ' tone="line"' : ''}${d.progress ? ` progress="${d.progress.value ?? 60}"` : ''}></lucian-${d.id}></button>
<span class="g-ghost" aria-hidden="true"></span>
<div class="g-cap"><b>${num(i)}</b><span class="g-name"></span>${statesOf(d).length ? '<span class="g-state"></span>' : ''}</div>
</article>`).join('');
const tiles = new Map($$('.g-tile', grid).map(el => [el.dataset.id, el]));
setTimeout(() => $$('.g-tile.is-new').forEach(el => el.classList.remove('is-new')), 1600);

/* ---------- Demo player: a ghost cursor hovers, then clicks through the states ---------- */
const STOP = Symbol('stop');
const effectMs = d => Math.max(500, ...Object.values(d.effect || {}).map(s => (s.delay || 0) + (s.d || 640)));
const transitionMs = d => Math.max(700, ...Object.values(d.transitions || {}).flatMap(g => Object.values(g).map(s => (s.delay || 0) + (s.d || 600))));
const players = [];
// kind: 'tile' runs in the grid, 'slide' in the reel, 'dialog' in the detail dialog.
function makePlayer(host, def, icon, label, kind) {
  const P = { host, def, icon, label, kind, ghost: $('.g-ghost', host), states: statesOf(def), vis: false, user: false, on: false, gen: 0, timers: [], userT: 0 };
  players.push(P);
  return P;
}
function dropPlayer(P) { if (!P) return; stop(P); clearTimeout(P.userT); const i = players.indexOf(P); if (i >= 0) players.splice(i, 1); }
const inView = P => P.kind === 'dialog' ? dialogOpen : !dialogOpen && (P.kind === 'slide') === (view === 'reel');
const shouldRun = P => autoOn && !reduce.matches && P.vis && !P.user && !document.hidden && inView(P) && P.host.isConnected && !P.host.hidden;
function sync(P) { const go = shouldRun(P); if (go && !P.on) start(P); else if (!go && P.on) stop(P); }
const syncAll = () => players.forEach(sync);
function start(P) { P.on = true; run(P, ++P.gen).catch(e => { if (e !== STOP) console.error(e); }); }
function stop(P) { P.on = false; P.gen++; P.timers.forEach(clearTimeout); P.timers = []; ghost(P, 'off'); P.host.classList.remove('is-live'); }
function sleep(P, gen, ms) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => { P.timers = P.timers.filter(x => x !== id); (P.gen === gen && P.on) ? resolve() : reject(STOP); }, ms);
    P.timers.push(id);
  });
}
function ghost(P, mode, fx, fy, ms) {
  const g = P.ghost; if (!g) return;
  if (mode === 'off') { g.classList.remove('is-on', 'is-down', 'is-tap'); return; }
  if (fx != null) {
    const w = P.host.clientWidth, h = P.host.clientHeight;
    g.style.transitionDuration = `${ms ?? 480}ms, 250ms`;
    g.style.setProperty('--gx', (w * fx).toFixed(1) + 'px');
    g.style.setProperty('--gy', (h * fy).toFixed(1) + 'px');
  }
  if (mode === 'on') g.classList.add('is-on');
  if (mode === 'hide') g.classList.remove('is-on');
  if (mode === 'tap') { g.classList.add('is-down', 'is-tap'); setTimeout(() => g.classList.remove('is-down'), 140); setTimeout(() => g.classList.remove('is-tap'), 560); }
}
function feedProgress(P, gen) {
  // Measured-progress icons get a believable climb while the demo sits in that state.
  const d = P.def;
  if (!d.progress || P.icon.state !== d.progress.state || d.progress.axis === 'x') return;
  [12, 38, 64, 86].forEach((v, i) => { const id = setTimeout(() => { if (P.gen === gen) P.icon.setProgress(v); }, i * 260); P.timers.push(id); });
}
async function run(P, gen) {
  P.host.classList.add('is-live');
  const center = P.aim ? P.aim() : P.kind === 'dialog' ? [0.56, 0.56] : [0.57, 0.52];
  const from = P.aim ? [center[0] + 0.2, center[1] + 0.32] : [0.9, 1.06];
  while (true) {
    ghost(P, null, ...from, 0);
    await sleep(P, gen, 30);
    P.ghost.dataset.cur = 'arrow';
    ghost(P, 'on', ...center, 520);
    await sleep(P, gen, 460);
    P.ghost.dataset.cur = 'hand';
    P.icon.play();
    await sleep(P, gen, effectMs(P.def) + 160);
    if (P.states.length) {
      for (let i = 0; i < P.states.length; i++) {
        ghost(P, 'tap');
        const s = P.icon.next();
        P.label?.(s);
        feedProgress(P, gen);
        await sleep(P, gen, transitionMs(P.def) + (P.def.loops?.[s] ? 1100 : 500));
      }
    } else {
      ghost(P, 'tap');
      P.icon.play();
      await sleep(P, gen, effectMs(P.def) + 420);
    }
    P.ghost.dataset.cur = 'arrow';
    ghost(P, 'hide', from[0], from[1] + 0.02, 520);
    await sleep(P, gen, 760);
  }
}
function takeOver(P, active, ms = 1400) {
  clearTimeout(P.userT);
  if (active) { P.user = true; sync(P); }
  else P.userT = setTimeout(() => { P.user = false; sync(P); }, ms);
}
// A click on an icon: stateful icons step to their next state, the others play their effect again.
function press(P, ms) {
  takeOver(P, true); takeOver(P, false, ms);
  const d = P.def, icon = P.icon;
  if (!P.states.length) { icon.play(); return null; }
  const s = icon.next();
  if (s) { P.label?.(s); if (d.progress?.state === s && d.progress.axis !== 'x') icon.setProgress(70); }
  return s;
}

const tilePlayers = new Map();
for (const d of defs) {
  const tile = tiles.get(d.id), icon = $('[data-icon]', tile), stateEl = $('.g-state', tile);
  const P = makePlayer(tile, d, icon, s => { if (stateEl) { stateEl.textContent = stateText(d, s); stateEl.classList.toggle('is-changed', s !== d.defaultState); } updateTileLabel(d); }, 'tile');
  tilePlayers.set(d.id, P);
  const stage = $('.g-stage', tile);
  // Hovering changes nothing: the demo keeps running. Keyboard focus takes over the tile.
  tile.addEventListener('focusin', e => { if (!e.target.matches(':focus-visible')) return; takeOver(P, true); if (e.target === stage) icon.play(); });
  tile.addEventListener('focusout', () => takeOver(P, false));
  stage.addEventListener('click', () => openReel(d.id, tile));
}
const io = new IntersectionObserver(entries => {
  for (const e of entries) { const P = tilePlayers.get(e.target.dataset.id); if (P) { P.vis = e.intersectionRatio >= 0.5; sync(P); } }
}, { threshold: [0, 0.5] });
tiles.forEach(el => io.observe(el));
document.addEventListener('visibilitychange', syncAll);

/* ---------- Categories, search, empty state ---------- */
const catsNav = $('#cats'), pill = $('.g-cats-pill', catsNav);
catsNav.insertAdjacentHTML('beforeend', [['all', defs.length], ...Object.entries(categories).map(([k, v]) => [k, v.count])].map(([k, n]) => `<button class="g-cat" type="button" data-cat="${k}" aria-pressed="${k === 'all'}"><span></span><i>${n}</i></button>`).join(''));
function movePill(animate = true) {
  const b = $(`.g-cat[data-cat="${cat}"]`, catsNav);
  if (!b) return;
  catsNav.classList.toggle('no-anim', !animate);
  pill.style.setProperty('--x', b.offsetLeft + 'px');
  pill.style.setProperty('--w', b.offsetWidth + 'px');
}
catsNav.addEventListener('click', e => {
  const b = e.target.closest('.g-cat'); if (!b) return;
  cat = b.dataset.cat;
  $$('.g-cat', catsNav).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  movePill(); filter();
  b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce.matches ? 'auto' : 'smooth' });
  const top = $('#bar').getBoundingClientRect().top + scrollY;
  if (scrollY > top) scrollTo({ top, behavior: reduce.matches ? 'auto' : 'smooth' });
});
const haystack = new Map(defs.map(d => [d.id, [d.id, d.name.ko, d.name.en, ...d.keywords, categories[d.category]?.ko, categories[d.category]?.en].join(' ').toLowerCase().normalize('NFKC')]));
function filter() {
  const terms = query.toLowerCase().normalize('NFKC').split(/\s+/).filter(Boolean);
  let shown = 0;
  for (const d of defs) {
    const hit = (cat === 'all' || d.category === cat) && terms.every(term => haystack.get(d.id).includes(term));
    tiles.get(d.id).hidden = !hit;
    if (hit) shown++;
  }
  $('#empty').hidden = shown > 0;
  $('#search').classList.toggle('has-q', !!query);
  reelDirty = true;
  syncAll();
}
const search = $('#search'), q = $('#q');
function openSearch(open) {
  search.classList.toggle('is-open', open);
  $('#search-btn').setAttribute('aria-expanded', String(open));
  q.tabIndex = open ? 0 : -1;
  if (open) q.focus();
}
$('#search-btn').addEventListener('click', () => openSearch(!search.classList.contains('is-open') || !q.value));
q.addEventListener('input', () => { query = q.value.trim(); filter(); });
q.addEventListener('keydown', e => { if (e.key === 'Escape') { q.value = ''; query = ''; filter(); openSearch(false); $('#search-btn').focus(); } });
q.addEventListener('blur', () => { if (!q.value) openSearch(false); });
$('#empty-reset').addEventListener('click', () => {
  q.value = ''; query = ''; cat = 'all';
  $$('.g-cat', catsNav).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.cat === 'all')));
  movePill(); filter(); openSearch(false);
});
document.addEventListener('keydown', e => {
  if (e.key === '/' && !dialogOpen && view === 'grid' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) { e.preventDefault(); openSearch(true); }
});

/* ---------- Toolbar: autoplay, tone, theme ---------- */
const autoBtns = [$('#auto'), $('#hud [data-act="auto"]')];
function setAuto(on, save = true) {
  autoOn = on && !reduce.matches;
  for (const b of autoBtns) {
    b.setAttribute('aria-pressed', String(autoOn));
    b.setAttribute('aria-label', t(autoOn ? 'autoOn' : 'autoOff'));
    $('lucian-play', b).setAttribute('state', autoOn ? 'playing' : 'paused');
  }
  if (save) store.set('lucian-icons-auto', autoOn ? 'on' : 'off');
  syncAll();
}
$('#auto').addEventListener('click', () => setAuto(!autoOn));
reduce.addEventListener?.('change', () => setAuto(autoOn, false));

const toneBtn = $('#tone');
function setTone(next, save = true) {
  tone = next;
  html.toggleAttribute('data-tone', tone === 'line');
  if (tone === 'line') html.dataset.tone = 'line';
  $$('[data-icon]').forEach(i => tone === 'line' ? i.setAttribute('tone', 'line') : i.removeAttribute('tone'));
  toneBtn.setAttribute('aria-pressed', String(tone === 'line'));
  toneBtn.setAttribute('aria-label', t(tone === 'line' ? 'toneLine' : 'toneColor'));
  $('lucian-palette', toneBtn).toggleAttribute('tone', tone === 'line');
  if (tone === 'line') $('lucian-palette', toneBtn).setAttribute('tone', 'line');
  if (save) store.set('lucian-icons-tone', tone);
  if (detail.def) refreshDetail();
}
toneBtn.addEventListener('click', () => setTone(tone === 'line' ? 'color' : 'line'));

const themeBtns = [$('#theme'), $('#hud [data-act="theme"]')];
const isDark = () => html.dataset.theme ? html.dataset.theme === 'dark' : darkQuery.matches;
function paintTheme() {
  html.classList.toggle('is-dark', isDark());
  for (const b of themeBtns) {
    b.setAttribute('aria-label', t(isDark() ? 'themeLight' : 'themeDark'));
    b.setAttribute('aria-pressed', String(isDark()));
  }
}
function toggleTheme(btn) {
  html.dataset.theme = isDark() ? 'light' : 'dark';
  store.set('lucian-icons-theme', html.dataset.theme);
  paintTheme();
  $(isDark() ? 'lucian-moon' : 'lucian-sun', btn).play();
}
$('#theme').addEventListener('click', e => toggleTheme(e.currentTarget));
darkQuery.addEventListener?.('change', paintTheme);

/* ---------- Language ---------- */
const langBox = $('.g-lang'), langPill = $('.g-lang-pill', langBox);
function moveLangPill() {
  const b = $(`.g-lang-b[data-lang="${lang}"]`, langBox);
  langPill.style.setProperty('--x', b.offsetLeft + 'px');
  langPill.style.setProperty('--w', b.offsetWidth + 'px');
}
langBox.addEventListener('click', e => {
  const b = e.target.closest('.g-lang-b'); if (!b || b.dataset.lang === lang) return;
  lang = b.dataset.lang; store.set('lucian-icons-lang', lang); localize();
});
function updateTileLabel(d) {
  const tile = tiles.get(d.id), icon = $('[data-icon]', tile), states = statesOf(d);
  $('.g-stage', tile).setAttribute('aria-label', `${d.name[lang]}${states.length ? `, ${stateText(d, icon.state || d.defaultState)}` : ''}. ${t('tileOpen')}`);
}
function localize() {
  html.lang = lang;
  $$('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if (typeof v === 'string') el.innerHTML = v; });
  $$('[data-i18n-attr]').forEach(el => el.dataset.i18nAttr.split(';').forEach(pair => { const [attr, key] = pair.split(':'); el.setAttribute(attr, t(key)); }));
  $$('.g-lang-b').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  $$('.g-cat', catsNav).forEach(b => { $('span', b).textContent = b.dataset.cat === 'all' ? t('all') : catText(b.dataset.cat); });
  for (const d of defs) {
    const tile = tiles.get(d.id), icon = $('[data-icon]', tile);
    $('.g-name', tile).textContent = d.name[lang];
    const st = $('.g-state', tile); if (st) st.textContent = stateText(d, icon.state || d.defaultState);
    updateTileLabel(d);
  }
  $('#guide-steps').innerHTML = t('guideSteps').map(s => `<li>${s}</li>`).join('');
  document.title = lang === 'ko' ? 'Lucian Icons · 움직이는 아이콘 ' + defs.length + '개' : 'Lucian Icons · ' + defs.length + ' animated icons';
  setAuto(autoOn, false); paintTheme();
  toneBtn.setAttribute('aria-label', t(tone === 'line' ? 'toneLine' : 'toneColor'));
  requestAnimationFrame(() => { movePill(false); moveLangPill(); });
  html.classList.remove('i18n-wait');
  slides.forEach(s => { if (s._P) { slideMeta(s, s._P.def); placeStage(s); } });
  if (cur >= 0) progress();
  if (detail.def) refreshDetail();
}

/* ---------- Copy, download, toast ---------- */
let toastT;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('is-on'), 2200); }
async function copyText(text, button, select, done = t('copied')) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('no clipboard');
    await navigator.clipboard.writeText(text);
    toast(done);
    if (button) {
      button.classList.add('is-done');
      const ic = $('lucian-copy', button); ic?.setAttribute('state', 'copied');
      setTimeout(() => { button.classList.remove('is-done'); ic?.setAttribute('state', 'idle'); }, 1600);
    }
  } catch {
    if (select) { select.focus(); select.select?.(); toast(t('clipboardBlocked')); }
    else toast(t('failed'));
  }
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-copy]'); if (!b) return;
  const src = $(b.dataset.copy); copyText(src.value ?? src.textContent, b);
});
function download(text, type, filename) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
  toast(t('prepared'));
}

/* ---------- Detail dialog ---------- */
const dlg = $('#dlg-icon'), dStage = $('#d-stage'), dHit = $('#d-hit');
const detail = { def: null, opts: {}, tab: 'html', player: null };
let exportsMod;
const loadExports = () => exportsMod ??= import('./export.js');
function moveSeg(seg) {
  const b = $('[aria-selected="true"],[aria-checked="true"]', seg), p = $('.g-seg-pill', seg);
  if (b && p) { p.style.setProperty('--x', (b.offsetLeft - 4) + 'px'); p.style.setProperty('--w', b.offsetWidth + 'px'); }
}
function openDetail(d, state) {
  detail.def = d;
  detail.opts = { tone, accent: null, weight: 1.75, size: 24, state: state || tilePlayers.get(d.id).icon.state || d.defaultState };
  dlg.style.setProperty('--h', d.color);
  dStage.style.setProperty('--h', d.color);
  dHit.innerHTML = `<lucian-${d.id} data-icon animate="none"${d.progress ? ` progress="${d.progress.value ?? 60}"` : ''}></lucian-${d.id}>`;
  $('#d-sizes').innerHTML = [16, 20, 24, 32, 48].map(z => `<figure><lucian-${d.id} data-icon animate="none" size="${z}"></lucian-${d.id}><figcaption>${z}</figcaption></figure>`).join('');
  $('#d-swatches').innerHTML = `<button class="d-sw is-own" type="button" data-c="" style="--c:${d.color}" aria-pressed="true"><i></i><span data-i18n="resetColor">${t('resetColor')}</span></button>` +
    PALETTE.filter(c => c.toLowerCase() !== d.color.toLowerCase()).map(c => `<button class="d-sw" type="button" data-c="${c}" style="--c:${c}" aria-label="${c}" aria-pressed="false"></button>`).join('') +
    `<label class="d-pick" aria-label="${t('customColor')}"><input id="d-color" type="color" value="${d.color}"></label>`;
  $('#d-weight').value = 1.75; $('#d-weight-v').textContent = '1.75'; $('#d-size').value = '24';
  const icon = $('[data-icon]', dHit);
  if (detail.opts.state) icon.setAttribute('state', detail.opts.state);
  dropPlayer(detail.player);
  detail.player = makePlayer(dStage, d, icon, s => { detail.opts.state = s; renderStates(); renderCode(); }, 'dialog');
  detail.player.vis = true;
  refreshDetail();
  if (!dlg.open) { dlg.showModal(); dialogOpen = true; body.classList.add('has-dlg'); }
  syncAll();
  requestAnimationFrame(() => $$('.g-seg', dlg).forEach(moveSeg));
}
function renderStates() {
  const d = detail.def, states = statesOf(d);
  $('#d-states').innerHTML = states.map(s => `<button class="d-chip" type="button" data-s="${s}" aria-pressed="${s === detail.opts.state}">${esc(stateText(d, s))}</button>`).join('') +
    `<button class="d-chip is-play" type="button" data-play><lucian-sparkle tone="line" size="15" animate="none"></lucian-sparkle>${t('play')}</button>` +
    (states.length ? '' : `<span class="d-note">${t('noStates')}</span>`);
  $('#d-states').setAttribute('aria-label', t('states'));
}
function applyOptions() {
  const o = detail.opts;
  $$('[data-icon]', dlg).forEach(i => {
    o.tone === 'line' ? i.setAttribute('tone', 'line') : i.removeAttribute('tone');
    o.accent ? i.setAttribute('accent', o.accent) : i.removeAttribute('accent');
    i.setAttribute('weight', String(o.weight));
  });
  $$('#d-tone .g-seg-b').forEach(b => b.setAttribute('aria-checked', String(b.dataset.v === o.tone)));
  $$('#d-swatches .d-sw').forEach(b => b.setAttribute('aria-pressed', String((b.dataset.c || null) === o.accent)));
  moveSeg($('#d-tone'));
}
async function renderCode() {
  const d = detail.def; if (!d) return;
  const o = { ...detail.opts, background: isDark() ? 'dark' : 'light' }, tab = detail.tab, mod = await loadExports();
  const text = tab === 'html' ? mod.usageHTML(d, o, lang) : tab === 'react' ? mod.usageReact(d, o, lang) : tab === 'svg' ? mod.staticSVG(d, o) : await mod.applicationPrompt(d, o, lang);
  if (detail.def === d && detail.tab === tab) $('#d-code').value = text;
  $('#d-hint').textContent = t({ html: 'hintHTML', react: 'hintReact', svg: 'hintSVG', prompt: 'hintPrompt' }[tab]);
  $('#d-copy-t').textContent = t(tab === 'prompt' ? 'copyPrompt' : 'copy');
}
function refreshDetail() {
  const d = detail.def, i = defs.indexOf(d);
  $('#d-num').textContent = num(i);
  $('#d-cat').textContent = catText(d.category);
  $('#d-title').textContent = d.name[lang];
  $('#d-desc').textContent = d.description[lang];
  $('#d-skill').textContent = `/lucian-icons ${d.id}`;
  dHit.setAttribute('aria-label', `${d.name[lang]}. ${statesOf(d).length ? t('tileHint') : t('tilePlay')}`);
  renderStates(); applyOptions(); renderCode();
}
dHit.addEventListener('click', () => press(detail.player));
$('#d-states').addEventListener('click', e => {
  const b = e.target.closest('.d-chip'); if (!b) return;
  const icon = $('[data-icon]', dHit);
  takeOver(detail.player, true); takeOver(detail.player, false);
  if (b.dataset.play != null) { icon.play(); $('lucian-sparkle', b)?.play(); return; }
  icon.setState(b.dataset.s); detail.opts.state = b.dataset.s; renderStates(); renderCode();
});
$('#d-tone').addEventListener('click', e => { const b = e.target.closest('.g-seg-b'); if (!b) return; detail.opts.tone = b.dataset.v; applyOptions(); renderCode(); });
$('#d-swatches').addEventListener('click', e => { const b = e.target.closest('.d-sw'); if (!b) return; detail.opts.accent = b.dataset.c || null; applyOptions(); renderCode(); });
$('#d-swatches').addEventListener('input', e => { if (e.target.id !== 'd-color') return; detail.opts.accent = e.target.value; applyOptions(); renderCode(); });
$('#d-weight').addEventListener('input', e => { detail.opts.weight = Number(e.target.value); $('#d-weight-v').textContent = e.target.value; applyOptions(); renderCode(); });
$('#d-size').addEventListener('change', e => { detail.opts.size = Number(e.target.value); renderCode(); });
$('#d-tabs').addEventListener('click', e => {
  const b = e.target.closest('.g-seg-b'); if (!b) return;
  detail.tab = b.dataset.tab;
  $$('#d-tabs .g-seg-b').forEach(x => x.setAttribute('aria-selected', String(x === b)));
  moveSeg($('#d-tabs')); renderCode();
});
$('#d-copy').addEventListener('click', e => copyText($('#d-code').value, e.currentTarget, $('#d-code')));
$('#d-svg').addEventListener('click', async () => { const m = await loadExports(), d = detail.def; download(m.staticSVG(d, detail.opts), 'image/svg+xml', `lucian-${d.id}${detail.opts.state ? '-' + detail.opts.state : ''}.svg`); });
$('#d-html').addEventListener('click', async () => { const m = await loadExports(), d = detail.def; download(await m.standaloneHTML(d, { ...detail.opts, background: isDark() ? 'dark' : 'light' }, lang), 'text/html', `lucian-${d.id}.html`); });

/* ---------- Guide dialog and dialog lifecycle ---------- */
const guide = $('#dlg-guide');
function openGuide(toSkill) {
  if (dlg.open) dlg.close();
  if (!guide.open) { guide.showModal(); dialogOpen = true; body.classList.add('has-dlg'); syncAll(); }
  if (toSkill) { const s = $('#guide-skill'); s.scrollIntoView({ block: 'start', behavior: reduce.matches ? 'auto' : 'smooth' }); s.focus({ preventScroll: true }); }
}
document.addEventListener('click', e => {
  if (e.target.closest('[data-open-guide]')) openGuide(false);
  else if (e.target.closest('[data-open-skill]')) openGuide(true);
  else if (e.target.closest('[data-close]')) e.target.closest('dialog').close();
});
for (const d of [dlg, guide]) {
  d.addEventListener('click', e => { if (e.target === d) d.close(); });
  d.addEventListener('close', () => {
    if (d === dlg) { dropPlayer(detail.player); detail.player = null; detail.def = null; }
    dialogOpen = dlg.open || guide.open;
    body.classList.toggle('has-dlg', dialogOpen);
    syncAll();
  });
}
/* ---------- Reels: one icon per screen, moved up and down ---------- */
const reel = $('#reel'), hud = $('#hud');
const pageParts = [$('.g-skip'), $('.g-head'), $('#bar'), grid, $('#empty'), $('.g-foot')];
const wideQ = matchMedia('(min-width:1100px)');
const HAND = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11.5V5.2a1.6 1.6 0 0 1 3.2 0v5.6m0-1.2a1.6 1.6 0 0 1 3.2 0v1.6m0-.6a1.6 1.6 0 0 1 3.2 0v3.3a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.7-2.3l-2.6-3.3a1.7 1.7 0 0 1 2.6-2.1L9 13.6"/></svg>';
let reelIds = [], slides = [], cur = -1, reelDirty = true, opener = null, closeT = 0;
const slideHeight = () => slides[0]?.offsetHeight || reel.clientHeight || 1;
function buildReel(all) {
  slides.forEach(emptySlide);
  const shown = defs.filter(d => !tiles.get(d.id).hidden).map(d => d.id);
  reelIds = shown.length && !all ? shown : defs.map(d => d.id);
  // Empty screens first; only the ones near the current screen get an icon.
  reel.innerHTML = reelIds.map((id, p) => `<section class="g-slide" data-p="${p}" tabindex="-1"></section>`).join('');
  slides = $$('.g-slide', reel);
  cur = -1;
  reelDirty = false;
}
function slideMeta(s, d) {
  const states = statesOf(d), now = s._P?.icon.state || d.defaultState;
  s.setAttribute('aria-label', `${num(defs.indexOf(d))} ${d.name[lang]}`);
  $('.g-rail', s).setAttribute('aria-label', d.name[lang]);
  $('.g-slide-hit', s).setAttribute('aria-label', `${d.name[lang]}${states.length ? `, ${stateText(d, now)}. ${t('tileHint')}` : `. ${t('tilePlay')}`}`);
  $('.g-slide-meta', s).innerHTML =
    `<p class="g-slide-kick"><b>${num(defs.indexOf(d))}</b> · ${esc(catText(d.category))}</p>` +
    `<h2 class="g-slide-t">${esc(d.name[lang])}</h2>` +
    `<p class="g-slide-s">${esc(d.description[lang])}</p>` +
    (states.length ? `<div class="g-slide-states" role="group" aria-label="${esc(t('states'))}">${states.map(x => `<button class="d-chip" type="button" data-s="${x}" aria-pressed="${x === now}">${esc(stateText(d, x))}</button>`).join('')}</div>` : '') +
    `<p class="g-slide-hint">${HAND}<span>${esc(t(states.length ? 'reelHintState' : 'reelHintPlay'))}</span></p>`;
  $('.g-rail', s).innerHTML = [['code', 'lucian-code'], ['copy', 'lucian-copy'], ['svg', 'lucian-download']].map(([act, tag]) =>
    `<button class="g-rb" type="button" data-act="${act}" aria-label="${esc(t(`rail${act[0].toUpperCase()}${act.slice(1)}Label`))}"><i><${tag} tone="line" size="21"></${tag}></i><span aria-hidden="true">${esc(t(`rail${act[0].toUpperCase()}${act.slice(1)}`))}</span></button>`).join('');
}
function fillSlide(p) {
  const s = slides[p]; if (!s || s._P) return;
  const d = byId.get(reelIds[p]), from = $('[data-icon]', tiles.get(d.id)).state;
  s.style.setProperty('--h', d.color);
  s.innerHTML = `<div class="g-slide-bg" aria-hidden="true"></div>
<div class="g-slide-stage"><button class="g-slide-hit" type="button"><span class="g-slide-icon"><lucian-${d.id} data-icon animate="none"${tone === 'line' ? ' tone="line"' : ''}${from && from !== d.defaultState ? ` state="${from}"` : ''}${d.progress ? ` progress="${d.progress.value ?? 60}"` : ''}></lucian-${d.id}></span></button><span class="g-ghost" aria-hidden="true"></span></div>
<div class="g-slide-meta"></div>
<nav class="g-rail"></nav>`;
  const stage = $('.g-slide-stage', s), icon = $('[data-icon]', s);
  const P = s._P = makePlayer(stage, d, icon, st => markState(s, d, st), 'slide');
  // The demo cursor rests just below and right of the icon's centre, like on the tiles.
  P.aim = () => { const w = stage.clientWidth || 1, h = stage.clientHeight || 1, z = $('.g-slide-icon', s).offsetWidth; return [0.5 + 0.22 * z / w, 0.5 + 0.21 * z / h]; };
  slideMeta(s, d);
  placeStage(s);
}
function emptySlide(s) { if (!s?._P) return; dropPlayer(s._P); s._P = null; s.innerHTML = ''; }
function markState(s, d, st) {
  $$('.g-slide-states [data-s]', s).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.s === st)));
  $('.g-slide-hit', s).setAttribute('aria-label', `${d.name[lang]}, ${stateText(d, st)}. ${t('tileHint')}`);
}
// Narrow screens: lift the stage above the text so the icon and the description never overlap.
function placeStage(s) {
  const st = $('.g-slide-stage', s), m = $('.g-slide-meta', s);
  if (!st || !m) return;
  st.style.bottom = wideQ.matches ? '' : Math.ceil(m.offsetHeight + (parseFloat(getComputedStyle(m).bottom) || 0) + 12) + 'px';
}
function progress() {
  const d = byId.get(reelIds[cur]);
  $('#prog-n').textContent = String(cur + 1).padStart(3, '0');
  $('#prog-t').textContent = String(slides.length).padStart(3, '0');
  $('#prog-bar').style.setProperty('--p', ((cur + 1) / slides.length).toFixed(4));
  $('#prog-live').textContent = `${cur + 1} / ${slides.length} · ${d.name[lang]}`;
}
function setCurrent(p) {
  if (p === cur || p < 0 || p >= slides.length) return;
  slides[cur]?.classList.remove('is-on');
  cur = p;
  slides[p].classList.add('is-on');
  for (let k = Math.max(0, p - 2); k <= Math.min(slides.length - 1, p + 2); k++) fillSlide(k);
  slides.forEach((s, k) => { if (Math.abs(k - p) > 4) emptySlide(s); });
  // Only the icon on screen demonstrates itself; its neighbours wait.
  slides.forEach((s, k) => { if (s._P) { s._P.vis = k === p; sync(s._P); } });
  progress();
  if (view === 'reel') history.replaceState({ reel: true }, '', '#' + reelIds[p]);
}
let scrollRaf = 0;
reel.addEventListener('scroll', () => {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => { scrollRaf = 0; setCurrent(Math.round(reel.scrollTop / slideHeight())); });
}, { passive: true });
function goTo(p, smooth) {
  p = Math.max(0, Math.min(slides.length - 1, p));
  reel.scrollTo({ top: p * slideHeight(), behavior: smooth && !reduce.matches ? 'smooth' : 'instant' });
  if (!smooth) setCurrent(p);
}
// The big icon grows out of the tile that was pressed, and shrinks back into it on the way out.
function flight(s, tile, out) {
  const ic = s && $('.g-slide-icon', s), small = tile && $('[data-icon]', tile);
  if (!ic || !small || reduce.matches) return;
  const st = $('.g-slide-stage', s).getBoundingClientRect(), r = small.getBoundingClientRect(), z = ic.offsetWidth;
  if (!z || !r.width) return;
  const moved = `translate(${r.left + r.width / 2 - (st.left + st.width / 2)}px,${r.top + r.height / 2 - (st.top + st.height / 2)}px) scale(${r.width / z})`;
  ic.animate(out ? [{ transform: 'none', opacity: 1, filter: 'none' }, { transform: moved, opacity: 1, filter: 'none' }] : [{ transform: moved, opacity: 1, filter: 'none' }, { transform: 'none', opacity: 1, filter: 'none' }],
    { duration: out ? 420 : 640, easing: out ? 'cubic-bezier(.4,0,.2,1)' : 'cubic-bezier(.2,.9,.25,1)', fill: out ? 'forwards' : 'none' });
}
function openReel(id, fromTile, noPush) {
  if (view === 'reel') { const p = reelIds.indexOf(id); if (p >= 0) goTo(p, true); return; }
  clearTimeout(closeT);
  slides.forEach(s => $('.g-slide-icon', s)?.getAnimations().forEach(a => a.cancel()));
  if (reelDirty || !slides.length) buildReel();
  let p = reelIds.indexOf(id);
  if (p < 0) { buildReel(true); reelDirty = true; p = reelIds.indexOf(id); }
  if (p < 0) return;
  opener = fromTile || null;
  loadExports();
  view = 'reel';
  body.dataset.view = 'reel';
  reel.inert = false; reel.setAttribute('aria-hidden', 'false');
  pageParts.forEach(el => { el.inert = true; });
  // Going back must not restore the old grid scroll: closing scrolls to the icon last seen instead.
  history.scrollRestoration = 'manual';
  if (!noPush) history.pushState({ reel: true }, '', '#' + id);
  goTo(p, false);
  flight(slides[p], fromTile, false);
  slides[p].focus({ preventScroll: true });
  syncAll();
}
function closeReel(fromPop) {
  if (view !== 'reel') return;
  const s = slides[cur], id = reelIds[cur], tile = tiles.get(id);
  // Come back to the tile of the icon that was on screen, not where the reel started.
  if (tile && !tile.hidden) {
    const r = tile.getBoundingClientRect();
    if (r.top < 72 || r.bottom > innerHeight - 8) scrollTo({ top: scrollY + r.top - Math.max(80, (innerHeight - r.height) / 2), behavior: 'instant' });
    flight(s, tile, true);
  }
  view = 'grid';
  body.dataset.view = 'grid';
  reel.inert = true; reel.setAttribute('aria-hidden', 'true');
  pageParts.forEach(el => { el.inert = false; });
  syncAll();
  // Clear the screens once the fade is over (unless the reel was opened again meanwhile).
  closeT = setTimeout(() => { if (view === 'grid') { slides.forEach(emptySlide); slides.forEach(x => x.classList.remove('is-on')); cur = -1; } }, 460);
  if (!fromPop) {
    if (history.state?.reel) history.back();
    else { history.replaceState(null, '', location.pathname + location.search); history.scrollRestoration = 'auto'; }
  }
  const back = tile && !tile.hidden ? tile : opener?.isConnected ? opener : null;
  $('.g-stage', back)?.focus({ preventScroll: true });
}
addEventListener('popstate', () => {
  const id = location.hash.slice(1);
  if (!byId.has(id)) { closeReel(true); history.scrollRestoration = 'auto'; return; }
  if (view !== 'reel') openReel(id, null, true);
  else { const p = reelIds.indexOf(id); if (p >= 0 && p !== cur) goTo(p, true); }
});
$('#to-reel').addEventListener('click', () => {
  const first = defs.find(d => !tiles.get(d.id).hidden) || defs[0];
  openReel(first.id, null);
});
reel.addEventListener('click', async e => {
  const s = e.target.closest('.g-slide'), P = s?._P; if (!P) return;
  const d = P.def, icon = P.icon;
  if (e.target.closest('.g-slide-hit')) { press(P, 2600); return; }
  const chip = e.target.closest('[data-s]');
  if (chip) {
    takeOver(P, true); takeOver(P, false, 2600);
    icon.setState(chip.dataset.s); markState(s, d, chip.dataset.s);
    if (d.progress?.state === chip.dataset.s && d.progress.axis !== 'x') icon.setProgress(70);
    return;
  }
  const b = e.target.closest('[data-act]'); if (!b) return;
  const opts = { tone, state: icon.state || d.defaultState };
  if (b.dataset.act === 'code') openDetail(d, opts.state);
  else if (b.dataset.act === 'copy') copyText((await loadExports()).usageHTML(d, opts, lang), b, null, t('copiedHTML'));
  else if (b.dataset.act === 'svg') { download((await loadExports()).staticSVG(d, opts), 'image/svg+xml', `lucian-${d.id}${opts.state ? '-' + opts.state : ''}.svg`); $('lucian-download', b)?.play(); }
});
hud.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  if (b.dataset.act === 'back') closeReel(false);
  else if (b.dataset.act === 'auto') setAuto(!autoOn);
  else if (b.dataset.act === 'theme') toggleTheme(b);
});
document.addEventListener('keydown', e => {
  if (view !== 'reel' || dialogOpen) return;
  const k = e.key;
  if (k === 'Escape') { e.preventDefault(); closeReel(false); return; }
  // Buttons keep Space and Enter; the arrows always move between icons.
  if ((k === ' ' || k === 'Enter') && e.target.closest('button')) return;
  if (k === 'ArrowDown' || k === 'PageDown' || k === 'j' || (k === ' ' && !e.shiftKey)) { e.preventDefault(); goTo(cur + 1, true); }
  else if (k === 'ArrowUp' || k === 'PageUp' || k === 'k' || (k === ' ' && e.shiftKey)) { e.preventDefault(); goTo(cur - 1, true); }
  else if (k === 'Home') { e.preventDefault(); goTo(0, true); }
  else if (k === 'End') { e.preventDefault(); goTo(slides.length - 1, true); }
});
let reelRT = 0;
function reelResize() {
  clearTimeout(reelRT);
  reelRT = setTimeout(() => {
    slides.forEach(s => s._P && placeStage(s));
    if (view === 'reel' && cur >= 0) reel.scrollTop = cur * slideHeight();
  }, 120);
}

/* ---------- Boot ---------- */
const bar = $('#bar');
new IntersectionObserver(([e]) => bar.classList.toggle('is-stuck', !e.isIntersecting), { rootMargin: '-1px 0px 0px 0px' }).observe($('.g-intro'));
addEventListener('resize', () => { movePill(false); moveLangPill(); if (dlg.open) $$('.g-seg', dlg).forEach(moveSeg); reelResize(); });
setTone(tone, false);
localize();
filter();
requestAnimationFrame(() => $('.g-head').classList.add('is-ready'));
// A shared link such as /icons/#download opens that icon in the reel; Back returns to the grid.
if (byId.has(location.hash.slice(1))) { const id = location.hash.slice(1); history.replaceState(null, '', location.pathname + location.search); openReel(id); }
