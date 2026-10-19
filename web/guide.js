/* Lucian Icons API guide | MIT (c) 2026 Lucian */
import './all.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
const store = { set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage may be blocked */ } } };
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
const words = {
  ko: { copied: '복사했어요', blocked: '클립보드를 쓸 수 없어 코드를 선택해 두었어요.', copy: '코드 복사', light: '라이트 테마로 전환', dark: '다크 테마로 전환', title: 'Lucian Icons API · 설치와 사용법' },
  en: { copied: 'Copied', blocked: 'Clipboard is unavailable, so the code is selected.', copy: 'Copy code', light: 'Switch to light theme', dark: 'Switch to dark theme', title: 'Lucian Icons API · Install and use' }
};
let lang = html.lang === 'en' ? 'en' : 'ko';
const w = k => words[lang][k];

/* Theme */
const themeBtn = $('#theme');
const isDark = () => html.dataset.theme ? html.dataset.theme === 'dark' : darkQuery.matches;
function paintTheme() {
  html.classList.toggle('is-dark', isDark());
  themeBtn.setAttribute('aria-label', w(isDark() ? 'light' : 'dark'));
  themeBtn.setAttribute('aria-pressed', String(isDark()));
}
themeBtn.addEventListener('click', () => {
  html.dataset.theme = isDark() ? 'light' : 'dark';
  store.set('lucian-icons-theme', html.dataset.theme);
  paintTheme();
});
darkQuery.addEventListener?.('change', paintTheme);

/* Language */
const langBox = $('.g-lang');
function localize() {
  html.lang = lang;
  document.title = w('title');
  $$('.g-lang-b').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  $$('[data-copy]').forEach(b => b.setAttribute('aria-label', w('copy')));
  paintTheme();
}
langBox.addEventListener('click', e => {
  const b = e.target.closest('.g-lang-b'); if (!b || b.dataset.lang === lang) return;
  lang = b.dataset.lang; store.set('lucian-icons-lang', lang); localize();
});
localize();

/* Copy */
let toastT;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('is-on'), 2200); }
document.addEventListener('click', async e => {
  const b = e.target.closest('[data-copy]'); if (!b) return;
  const code = $('pre code', b.parentElement);
  try {
    if (!navigator.clipboard?.writeText) throw new Error('no clipboard');
    await navigator.clipboard.writeText(code.textContent);
    b.classList.add('is-done'); setTimeout(() => b.classList.remove('is-done'), 1400);
    $('lucian-copy', b)?.setState('copied'); setTimeout(() => $('lucian-copy', b)?.setState('idle'), 1400);
    toast(w('copied'));
  } catch {
    const range = document.createRange(); range.selectNodeContents(code);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
    toast(w('blocked'));
  }
});

/* Live examples. These buttons stand in for a real request so you can see each state. */
const like = $('#demo-like');
like.addEventListener('click', () => {
  const on = like.getAttribute('aria-pressed') !== 'true';
  like.setAttribute('aria-pressed', String(on));
  $('lucian-heart', like).setState(on ? 'on' : 'off');
});
const dl = $('#demo-dl'), dlState = $('#demo-dl-state');
let pct = 0;
$$('[data-dl]').forEach(b => b.addEventListener('click', () => {
  const act = b.dataset.dl;
  if (act === 'start') { pct = 0; dl.setState('progress'); dl.setProgress(0); }
  else if (act === 'step') { if (dl.state !== 'progress') { pct = 0; dl.setState('progress'); } pct = Math.min(100, pct + 25); dl.setProgress(pct); }
  else dl.setState(act);
  dlState.textContent = dl.state + (dl.state === 'progress' ? ` · ${pct}%` : '');
}));
const bat = $('#demo-bat'), batIn = $('#demo-bat-v'), batOut = $('#demo-bat-o');
batIn.addEventListener('input', () => { bat.setProgress(batIn.value); batOut.textContent = batIn.value; });

/* Table of contents follows the section in view */
const links = new Map($$('.d-toc a').map(a => [a.getAttribute('href').slice(1), a]));
const seen = new Set();
const io = new IntersectionObserver(entries => {
  for (const en of entries) en.isIntersecting ? seen.add(en.target.id) : seen.delete(en.target.id);
  const first = [...links.keys()].find(id => seen.has(id));
  if (first) links.forEach((a, id) => a.classList.toggle('is-on', id === first));
}, { rootMargin: '-10% 0px -70% 0px' });
$$('.d-doc section').forEach(s => io.observe(s));
