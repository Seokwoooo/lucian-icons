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
let cat = 'all', query = '', dialogOpen = false;
const t = key => {
  const v = copy[lang][key] ?? copy.ko[key] ?? key;
  return typeof v === 'string' ? v.replaceAll('{count}', defs.length).replaceAll('{cats}', Object.keys(categories).length) : v;
};
const stateText = (d, s) => d.stateLabels?.[lang]?.[s] || s;
const catText = c => categories[c]?.[lang] || c;

/* ---------- Tiles ---------- */
const grid = $('#grid');
grid.innerHTML = defs.map((d, i) => `<article class="g-tile is-new" data-id="${d.id}" style="--h:${d.color};--d:${Math.min(i, 11) * 45}ms">
<button class="g-stage" type="button"><lucian-${d.id} class="g-icon" data-icon${tone === 'line' ? ' tone="line"' : ''}${d.progress ? ` progress="${d.progress.value ?? 60}"` : ''}></lucian-${d.id}></button>
<span class="g-ghost" aria-hidden="true"></span>
<div class="g-cap"><b>${num(i)}</b><span class="g-name"></span>${statesOf(d).length ? '<span class="g-state"></span>' : ''}</div>
<button class="g-exp" type="button"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></button>
</article>`).join('');
const tiles = new Map($$('.g-tile', grid).map(el => [el.dataset.id, el]));
setTimeout(() => $$('.g-tile.is-new').forEach(el => el.classList.remove('is-new')), 1600);

/* ---------- Demo player: a ghost cursor hovers, then clicks through the states ---------- */
const STOP = Symbol('stop');
const effectMs = d => Math.max(500, ...Object.values(d.effect || {}).map(s => (s.delay || 0) + (s.d || 640)));
const transitionMs = d => Math.max(700, ...Object.values(d.transitions || {}).flatMap(g => Object.values(g).map(s => (s.delay || 0) + (s.d || 600))));
const players = [];
function makePlayer(host, def, icon, label) {
  const P = { host, def, icon, label, ghost: $('.g-ghost', host), states: statesOf(def), vis: false, user: false, on: false, gen: 0, timers: [], userT: 0, dialog: host.classList.contains('d-stage') };
  players.push(P);
  return P;
}
const shouldRun = P => autoOn && !reduce.matches && P.vis && !P.user && !document.hidden && (P.dialog ? dialogOpen : !dialogOpen) && P.host.isConnected && !P.host.hidden;
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
  const center = P.dialog ? [0.56, 0.56] : [0.57, 0.52];
  while (true) {
    ghost(P, null, 0.9, 1.06, 0);
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
    ghost(P, 'hide', 0.9, 1.08, 520);
    await sleep(P, gen, 760);
  }
}
function takeOver(P, active) {
  clearTimeout(P.userT);
  if (active) { P.user = true; sync(P); }
  else P.userT = setTimeout(() => { P.user = false; sync(P); }, 1400);
}

const tilePlayers = new Map();
for (const d of defs) {
  const tile = tiles.get(d.id), icon = $('[data-icon]', tile), stateEl = $('.g-state', tile);
  const P = makePlayer(tile, d, icon, s => { if (stateEl) { stateEl.textContent = stateText(d, s); stateEl.classList.toggle('is-changed', s !== d.defaultState); } updateTileLabel(d); });
  tilePlayers.set(d.id, P);
  const stage = $('.g-stage', tile);
  tile.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') takeOver(P, true); });
  tile.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch') takeOver(P, false); });
  tile.addEventListener('focusin', () => takeOver(P, true));
  tile.addEventListener('focusout', () => takeOver(P, false));
  stage.addEventListener('click', () => {
    takeOver(P, true); takeOver(P, false);
    const s = icon.next();
    if (s) P.label(s);
    if (s && d.progress?.state === s && d.progress.axis !== 'x') icon.setProgress(70);
  });
  $('.g-exp', tile).addEventListener('click', () => openDetail(d));
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
  if (e.key === '/' && !dialogOpen && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) { e.preventDefault(); openSearch(true); }
});

/* ---------- Toolbar: autoplay, tone, theme ---------- */
const autoBtn = $('#auto'), autoIcon = $('lucian-play', autoBtn);
function setAuto(on, save = true) {
  autoOn = on && !reduce.matches;
  autoBtn.setAttribute('aria-pressed', String(autoOn));
  autoBtn.setAttribute('aria-label', t(autoOn ? 'autoOn' : 'autoOff'));
  autoIcon.setAttribute('state', autoOn ? 'playing' : 'paused');
  if (save) store.set('lucian-icons-auto', autoOn ? 'on' : 'off');
  syncAll();
}
autoBtn.addEventListener('click', () => setAuto(!autoOn));
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

const themeBtn = $('#theme');
const isDark = () => html.dataset.theme ? html.dataset.theme === 'dark' : darkQuery.matches;
function paintTheme() {
  html.classList.toggle('is-dark', isDark());
  themeBtn.setAttribute('aria-label', t(isDark() ? 'themeLight' : 'themeDark'));
  themeBtn.setAttribute('aria-pressed', String(isDark()));
}
themeBtn.addEventListener('click', () => {
  html.dataset.theme = isDark() ? 'light' : 'dark';
  store.set('lucian-icons-theme', html.dataset.theme);
  paintTheme();
  $(isDark() ? 'lucian-moon' : 'lucian-sun', themeBtn).play();
});
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
  $('.g-stage', tile).setAttribute('aria-label', `${d.name[lang]}${states.length ? `, ${stateText(d, icon.state || d.defaultState)}. ${t('tileHint')}` : `. ${t('tilePlay')}`}`);
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
    $('.g-exp', tile).setAttribute('aria-label', `${d.name[lang]} ${t('details')}`);
    updateTileLabel(d);
  }
  $('#guide-steps').innerHTML = t('guideSteps').map(s => `<li>${s}</li>`).join('');
  document.title = lang === 'ko' ? 'Lucian Icons · 움직이는 아이콘 ' + defs.length + '개' : 'Lucian Icons · ' + defs.length + ' animated icons';
  setAuto(autoOn, false); paintTheme();
  toneBtn.setAttribute('aria-label', t(tone === 'line' ? 'toneLine' : 'toneColor'));
  requestAnimationFrame(() => { movePill(false); moveLangPill(); });
  html.classList.remove('i18n-wait');
  if (detail.def) refreshDetail();
}

/* ---------- Copy, download, toast ---------- */
let toastT;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('is-on'), 2200); }
async function copyText(text, button, select) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('no clipboard');
    await navigator.clipboard.writeText(text);
    toast(t('copied'));
    if (button) {
      button.classList.add('is-done');
      const ic = $('lucian-copy', button); ic?.setAttribute('state', 'copied');
      setTimeout(() => { button.classList.remove('is-done'); ic?.setAttribute('state', 'idle'); }, 1600);
    }
  } catch {
    if (select) { select.focus(); select.select?.(); }
    toast(t('clipboardBlocked'));
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
function openDetail(d) {
  detail.def = d;
  detail.opts = { tone, accent: null, weight: 1.75, size: 24, state: tilePlayers.get(d.id).icon.state || d.defaultState };
  dlg.style.setProperty('--h', d.color);
  dStage.style.setProperty('--h', d.color);
  dHit.innerHTML = `<lucian-${d.id} data-icon${d.progress ? ` progress="${d.progress.value ?? 60}"` : ''}></lucian-${d.id}>`;
  $('#d-sizes').innerHTML = [16, 20, 24, 32, 48].map(z => `<figure><lucian-${d.id} data-icon size="${z}"></lucian-${d.id}><figcaption>${z}</figcaption></figure>`).join('');
  $('#d-swatches').innerHTML = `<button class="d-sw is-own" type="button" data-c="" style="--c:${d.color}" aria-pressed="true"><i></i><span data-i18n="resetColor">${t('resetColor')}</span></button>` +
    PALETTE.filter(c => c.toLowerCase() !== d.color.toLowerCase()).map(c => `<button class="d-sw" type="button" data-c="${c}" style="--c:${c}" aria-label="${c}" aria-pressed="false"></button>`).join('') +
    `<label class="d-pick" aria-label="${t('customColor')}"><input id="d-color" type="color" value="${d.color}"></label>`;
  $('#d-weight').value = 1.75; $('#d-weight-v').textContent = '1.75'; $('#d-size').value = '24';
  const icon = $('[data-icon]', dHit);
  if (detail.opts.state) icon.setAttribute('state', detail.opts.state);
  detail.player?.host && (players.splice(players.indexOf(detail.player), 1), stop(detail.player));
  detail.player = makePlayer(dStage, d, icon, s => { detail.opts.state = s; renderStates(); renderCode(); });
  detail.player.vis = true;
  refreshDetail();
  if (!dlg.open) { dlg.showModal(); dialogOpen = true; body.classList.add('has-dlg'); }
  syncAll();
  requestAnimationFrame(() => $$('.g-seg', dlg).forEach(moveSeg));
  if (location.hash !== '#' + d.id) history.replaceState(null, '', '#' + d.id);
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
dHit.addEventListener('click', () => {
  const P = detail.player; takeOver(P, true); takeOver(P, false);
  const s = $('[data-icon]', dHit).next(); if (s) { detail.opts.state = s; renderStates(); renderCode(); }
});
dStage.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') takeOver(detail.player, true); });
dStage.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch') takeOver(detail.player, false); });
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
    if (d === dlg) {
      if (detail.player) { stop(detail.player); players.splice(players.indexOf(detail.player), 1); detail.player = null; }
      detail.def = null;
      if (/^#[a-z]+$/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
    }
    dialogOpen = dlg.open || guide.open;
    body.classList.toggle('has-dlg', dialogOpen);
    syncAll();
  });
}
function followHash() { const d = defs.find(x => '#' + x.id === location.hash); if (d) openDetail(d); }
addEventListener('hashchange', followHash);

/* ---------- Boot ---------- */
const bar = $('#bar');
new IntersectionObserver(([e]) => bar.classList.toggle('is-stuck', !e.isIntersecting), { rootMargin: '-1px 0px 0px 0px' }).observe($('.g-intro'));
addEventListener('resize', () => { movePill(false); moveLangPill(); if (dlg.open) $$('.g-seg', dlg).forEach(moveSeg); });
setTone(tone, false);
localize();
filter();
requestAnimationFrame(() => $('.g-head').classList.add('is-ready'));
followHash();
