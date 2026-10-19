/* Lucian Icons v2.0.8 | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */
// Export helpers shared by the gallery, the build and the skill.
import { normalize, staticSVG, statesOf } from './runtime/icon.js';
export { staticSVG };

export const BASE = 'https://lucianlabs.dev/icons/';
let runtimePromise;
async function runtimeSource() {
  if (typeof window === 'undefined') return (await import('node:fs/promises')).readFile(new URL('./runtime/icon.js', import.meta.url), 'utf8');
  return runtimePromise ??= fetch(new URL('./runtime/icon.js', import.meta.url)).then(r => { if (!r.ok) throw new Error('Runtime unavailable'); return r.text(); }).catch(error => { runtimePromise = null; throw error; });
}
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const label = (def, lang) => def.name[lang === 'ko' ? 'ko' : 'en'];
const stateLabel = (def, state, lang) => def.stateLabels?.[lang === 'ko' ? 'ko' : 'en']?.[state] || state;

// Attributes worth writing out: only values that differ from the defaults.
function attrs(def, options = {}) {
  const o = normalize(def, options), out = [];
  if (o.state && o.state !== def.defaultState) out.push(['state', o.state]);
  if (o.size !== 24) out.push(['size', o.size]);
  if (o.tone === 'line') out.push(['tone', 'line']);
  if (o.accent && o.accent.toLowerCase() !== String(def.color).toLowerCase()) out.push(['accent', o.accent]);
  if (o.weight !== 1.75) out.push(['weight', o.weight]);
  if (def.progress && o.state === def.progress.state) out.push(['progress', o.progress]);
  return out;
}
const tag = (def, options, jsx = false) => `<lucian-${def.id}${attrs(def, options).map(([k, v]) => ` ${k}="${escape(v)}"`).join('')}${jsx ? ' />' : `></lucian-${def.id}>`}`;

// 1. Plain HTML from the public origin (modules are served with CORS).
export function usageHTML(def, options = {}, lang = 'en') {
  const ko = lang === 'ko', states = statesOf(def);
  const wire = states.length
    ? `\n<script type="module">\n  const icon = document.querySelector('lucian-${def.id}');\n  // ${ko ? '실제 앱 상태가 바뀔 때 호출하세요' : 'Call when your real app state changes'}: ${states.map(s => `'${s}'`).join(' | ')}\n  icon.setState('${states[1] || states[0]}');${def.progress ? `\n  icon.setProgress(40); // ${ko ? '측정된 진행률만' : 'measured progress only'}` : ''}\n</script>`
    : '';
  return `<!-- Lucian Icons ${def.id} v${def.version} | MIT (c) 2026 Lucian -->\n<script type="module" src="${BASE}modules/${def.id}.js"></script>\n\n<button type="button">\n  ${tag(def, options)}\n  ${escape(label(def, lang))}\n</button>${wire}`;
}

// 2. React: vendor the module once, then render the custom element.
export function usageReact(def, options = {}, lang = 'en') {
  const ko = lang === 'ko', states = statesOf(def);
  const name = def.name.en.replace(/[^a-z0-9]+/gi, ' ').trim().split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join('') + 'Button';
  const rest = attrs(def, options).filter(([k]) => k !== 'state').map(([k, v]) => ` ${k}="${escape(v)}"`).join('');
  const body = states.length
    ? `export function ${name}({ state = '${def.defaultState}', onClick }) {\n  return (\n    <button type="button" onClick={onClick}>\n      <lucian-${def.id} state={state}${rest} />\n      ${escape(label(def, lang))}\n    </button>\n  );\n}`
    : `export function ${name}({ onClick }) {\n  return (\n    <button type="button" onClick={onClick}>\n      <lucian-${def.id}${rest} />\n      ${escape(label(def, lang))}\n    </button>\n  );\n}`;
  return `// ${ko ? '모듈 복사' : 'Copy the module'}: node lucian-icons.mjs get ${def.id} --out src/vendor/lucian-icons\nimport './vendor/lucian-icons/${def.id}.js';\n\n// ${ko ? '아이콘은 가장 가까운 버튼의 hover와 포커스에 반응합니다.' : 'The icon reacts to hover and focus on its nearest button.'}\n${body}`;
}

// 3. Self-contained snippet: runtime + definition + a demo button. Works from file://.
export async function embeddableCode(def, options = {}, lang = 'en') {
  const o = normalize(def, options), ko = lang === 'ko', dark = options.background === 'dark', states = statesOf(def);
  const runtime = (await runtimeSource()).replace(/^export /gm, '');
  const name = escape(label(def, lang));
  return `<!-- Lucian Icons ${def.id} v${def.version} | MIT (c) 2026 Lucian | ${BASE} -->
<section data-lucian-demo="${def.id}" lang="${ko ? 'ko' : 'en'}" style="--demo-bg:${dark ? '#13141c' : '#f4f2ee'};--demo-fg:${dark ? '#f4f0e8' : '#16151b'}">
<style>[data-lucian-demo]{box-sizing:border-box;display:grid;justify-items:center;gap:14px;font:15px/1.6 system-ui,sans-serif;background:var(--demo-bg);color:var(--demo-fg);padding:40px 24px;max-width:520px;margin:16px auto;border-radius:24px;text-align:center}[data-lucian-demo] button{font:inherit;color:inherit;display:grid;place-items:center;width:168px;height:168px;border:0;border-radius:28px;background:color-mix(in oklab,${def.color} 14%,var(--demo-bg));cursor:pointer}[data-lucian-demo] button:focus-visible{outline:3px solid ${def.color};outline-offset:4px}[data-lucian-demo] p{margin:0;opacity:.72;font-size:13px}</style>
<button type="button" aria-label="${name}">${tag(def, { ...options, size: Math.max(o.size, 72) })}</button>
<p data-state>${states.length ? escape(stateLabel(def, o.state, lang)) : ''}</p>
<p>${ko ? (states.length ? '올리면 효과, 누르면 다음 상태. 시연용 버튼입니다.' : '올리거나 누르면 움직입니다. 시연용 버튼입니다.') : (states.length ? 'Hover for the effect, click for the next state. Demo only.' : 'Hover or click to play. Demo only.')}</p>
<script>(()=>{
${runtime}
defineIcon(${json(def)});
// ${ko ? '시연용 연결입니다. 실제 앱에서는 앱 상태에서 setState를 호출하세요.' : 'Demo wiring only. In your app, call setState from real state.'}
const root=document.currentScript.closest('[data-lucian-demo]'),icon=root.querySelector('lucian-${def.id}'),out=root.querySelector('[data-state]');
const labels=${json(def.stateLabels?.[ko ? 'ko' : 'en'] || {})};
root.querySelector('button').addEventListener('click',()=>{const s=icon.next();if(s)out.textContent=labels[s]||s;});
})();</script></section>`;
}

export async function standaloneHTML(def, options = {}, lang = 'en') {
  return `<!doctype html><html lang="${lang === 'ko' ? 'ko' : 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lucian Icons: ${escape(def.name.en)}</title></head><body style="margin:0;padding:24px;background:${options.background === 'dark' ? '#07080d' : '#ebe8e2'}">${await embeddableCode(def, options, lang)}</body></html>`;
}

// 4. A prompt for coding agents: what to do, plus the exact module source.
export async function applicationPrompt(def, options = {}, lang = 'en') {
  const o = normalize(def, options), ko = lang === 'ko', states = statesOf(def);
  const runtime = await runtimeSource();
  const module = `import { defineIcon } from './runtime.js';\nexport const definition = ${JSON.stringify(def)};\ndefineIcon(definition);\nexport default definition;`;
  const stateLine = states.length ? (ko ? `상태: ${states.join(', ')} (기본 ${def.defaultState}).` : `States: ${states.join(', ')} (default ${def.defaultState}).`) : (ko ? '상태 없음. hover/포커스 효과만 있습니다.' : 'No states; hover and focus effect only.');
  const head = ko
    ? `Lucian Icons의 ${def.name.ko}(${def.id}) v${def.version} 아이콘을 이 프로젝트에 적용해 주세요.
${stateLine} 선택한 값: 크기 ${o.size}px, 톤 ${o.tone === 'line' ? '라인(단색)' : '컬러'}, 포인트 색 ${o.accent || def.color}, 선 굵기 ${o.weight}.

1. 프레임워크, 아이콘이 들어갈 컴포넌트, 기존 테마와 버튼 구조를 먼저 확인하세요.
2. 아래 두 파일을 프로젝트의 vendor 폴더(예: src/vendor/lucian-icons/)에 만드세요: runtime.js, ${def.id}.js. MIT 고지를 유지하세요.
3. 기존 버튼 안에 <lucian-${def.id}>를 넣으세요. 버튼 안에 버튼을 넣지 말고, 기존 라벨·이벤트·키보드·포커스·ARIA를 그대로 두세요. 아이콘은 가장 가까운 버튼의 hover와 키보드 포커스에 스스로 반응합니다.
4. ${states.length ? `실제 앱 상태가 바뀔 때만 icon.setState(상태)를 호출하세요. 클릭이 곧 성공은 아닙니다.${def.progress ? ' 진행률은 실제로 측정된 값만 setProgress(0~100)로 넘기세요.' : ''}` : '상태 연결은 필요 없습니다. 효과를 끄려면 animate="none"을 쓰세요.'}
5. 색은 기본으로 아이콘 고유 색을 씁니다. 브랜드 색을 쓰려면 CSS에서 --li-accent를, 단색이 필요하면 tone="line"을 지정하세요. 아이콘 선색은 글자색(currentColor)을 따릅니다.
6. SSR 환경에서는 클라이언트에서만 모듈을 불러오세요. 움직임 줄이기 설정, 빠른 반복 입력, 같은 아이콘 여러 개, 다크 테마를 확인하고 변경 파일과 검증 결과를 보고하세요.`
    : `Apply the Lucian Icons ${def.name.en} (${def.id}) v${def.version} icon to this project.
${stateLine} Selected: ${o.size}px, ${o.tone === 'line' ? 'line (monochrome)' : 'color'} tone, accent ${o.accent || def.color}, stroke weight ${o.weight}.

1. Inspect the framework, the target component, the existing theme and button structure.
2. Create the two files below in a vendor folder (e.g. src/vendor/lucian-icons/): runtime.js and ${def.id}.js. Keep the MIT notices.
3. Place <lucian-${def.id}> inside the existing control. Never nest buttons; keep existing labels, handlers, keyboard, focus and ARIA. The icon reacts to hover and keyboard focus on its nearest button by itself.
4. ${states.length ? `Call icon.setState(state) only when real application state changes. A click is not success.${def.progress ? ' Pass only measured progress to setProgress(0-100).' : ''}` : 'No state wiring is needed. Use animate="none" to disable the effect.'}
5. Color defaults to the icon's own hue. Set --li-accent in CSS for a brand color, or tone="line" for monochrome. Strokes follow currentColor.
6. In SSR frameworks import the module on the client only. Check reduced motion, rapid repeated input, duplicate instances and dark theme; report changed files and test results.`;
  return `${head}\n\n--- runtime.js ---\n${runtime}\n--- ${def.id}.js ---\n/* Lucian Icons ${def.id} v${def.version} | MIT (c) 2026 Lucian */\n${module}\n\n--- ${ko ? '사용 예' : 'Usage'} ---\n${usageHTML(def, options, lang).split('\n').slice(3).join('\n')}`;
}
