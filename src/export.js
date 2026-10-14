/* Lucian Icons v1.2.0 | MIT (c) 2026 Lucian */
import {normalize,staticSVG} from './runtime/icon.js';
export {staticSVG};
let runtimePromise;
async function runtimeSource() {
 if(typeof window==='undefined') return (await import('node:fs/promises')).readFile(new URL('./runtime/icon.js',import.meta.url),'utf8');
 return runtimePromise ??= fetch(new URL('./runtime/icon.js',import.meta.url)).then(r=>{if(!r.ok)throw new Error('Runtime unavailable');return r.text()}).catch(error=>{runtimePromise=null;throw error});
}
const escape = value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function embeddableCode(def,options={},lang='en') {
 const o=normalize(def,options);const ko=lang==='ko';const trigger=def.triggers.includes(options.trigger)?options.trigger:def.triggers[0];
 const runtime=(await runtimeSource()).replace(/^export /gm,'');
 const dark=options.background==='dark';const label=escape(def.name[ko?'ko':'en']);
 const labels=def.stateLabels?.[ko?'ko':'en']||{};const stateLabel=s=>labels[s]||s;
 const triggerLabel=ko?{click:'클릭 / 터치',hover:'호버 / 포커스',controlled:'앱 상태 연결'}[trigger]:trigger;
 return `<!-- Lucian Icons ${def.id} v${def.version} | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ -->
<section data-lucian-demo="${def.id}" lang="${ko?'ko':'en'}" style="--demo-background:${dark?'#121415':'#f4f0e8'};--demo-foreground:${dark?'#f4f0e8':'#171a19'}">
<style>[data-lucian-demo]{box-sizing:border-box;display:block;font:15px/1.6 system-ui,sans-serif;background:var(--demo-background);color:var(--demo-foreground);padding:28px;max-width:660px;margin:16px auto;border-radius:16px}[data-lucian-demo] button,[data-lucian-demo] select,[data-lucian-demo] input{font:inherit;color:inherit}[data-lucian-demo] button,[data-lucian-demo] select{border:1px solid #8888;border-radius:12px;background:var(--demo-background);padding:12px;cursor:pointer}[data-lucian-demo] :is(button,select,input):focus-visible{outline:3px solid #9477d9;outline-offset:5px}[data-lucian-demo] .preview{display:flex;align-items:center;justify-content:center;min-width:160px;min-height:160px;margin:24px 0}[data-lucian-demo] label{display:block;margin:18px 0}[data-lucian-demo] p{max-width:55ch}[data-lucian-demo] code{word-break:break-word}[data-lucian-demo] .li-demo-title{font-size:24px;font-weight:600}</style>
<p class="li-demo-title">${label}</p><p>${ko?'독립 실행 시연입니다. 아래 조작은 실제 작업을 실행하지 않습니다.':'Standalone visual demo. These controls do not perform a business operation.'}</p>
<button class="preview" type="button" aria-label="${label}: ${escape(stateLabel(o.state))}"><lucian-${def.id} state="${o.state}" size="${o.size}" accent="${o.accent}" ink="${o.ink}" paper="${o.paper}" progress="${o.progress}"></lucian-${def.id}></button>
<label>${ko?'상태':'State'} <select>${Object.keys(def.states).map(s=>`<option value="${escape(s)}"${s===o.state?' selected':''}>${escape(stateLabel(s))}</option>`).join('')}</select></label>
${def.id==='download'?`<label>${ko?'진행률':'Progress'} <input type="range" min="0" max="100" value="${o.progress}"> <output>${o.progress}%</output></label>`:''}
<p>${ko?'트리거':'Trigger'}: ${triggerLabel}. ${ko?'터치와 키보드로 상태를 선택할 수 있습니다.':'Touch and keyboard can always select a state.'}</p>
<p>${ko?'앱에서는 실제 이벤트에서':'In your app, call'} <code>icon.setState(state)</code>${def.id==='download'?' / <code>icon.setProgress(percent)</code>':''}${ko?'를 호출하세요. 자동 성공 처리는 포함되지 않습니다.':'. No automatic success logic is included.'}</p>
<script>(()=>{\n${runtime}\ndefineIcon(${JSON.stringify(def).replace(/</g,'\\u003c')});
// Demo adapter only. Keep real app handlers when integrating.
const root=document.currentScript.closest('[data-lucian-demo]');
const icon=root.querySelector('lucian-${def.id}'),control=root.querySelector('select'),button=root.querySelector('button');
const states=${JSON.stringify(Object.keys(def.states))},stateLabels=${JSON.stringify(labels).replace(/</g,'\\u003c')};
function set(state){icon.setState(state);control.value=state;button.setAttribute('aria-label',${JSON.stringify(def.name[ko?'ko':'en'])}+' '+(stateLabels[state]||state));}
control.addEventListener('change',()=>set(control.value));
button.addEventListener('click',()=>set(states[(states.indexOf(icon.state)+1)%states.length]));
${trigger==='hover'?`button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')set(states[1])});button.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')set(states[0])});button.addEventListener('focus',()=>set(states[1]));button.addEventListener('blur',()=>set(states[0]));`:''}
${def.id==='download'?`root.querySelector('input').addEventListener('input',e=>{icon.setProgress(e.target.value);root.querySelector('output').textContent=e.target.value+'%'})`:''}
})();</script></section>`;
}
export async function standaloneHTML(def,options={},lang='en') {
 return `<!doctype html><html lang="${lang==='ko'?'ko':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lucian Icons: ${escape(def.name.en)}</title></head><body>${await embeddableCode(def,options,lang)}</body></html>`;
}
export async function applicationPrompt(def,options,lang='en') {
 const o=normalize(def,options);const code=await embeddableCode(def,options,lang);
 return lang==='ko'?`Lucian Icons ${def.name.ko} (${def.id}), 버전 ${def.version}를 이 프로젝트에 적용해 주세요.\n지원 상태: ${Object.keys(def.states).join(', ')}. 선택 상태: ${o.state}, 크기: ${o.size}px, 색상: ${o.accent}, 트리거: ${options.trigger}.\n먼저 대상 파일, 프레임워크, 기존 테마, 버튼과 이벤트 구조를 확인하세요. 아래 코드에서 아이콘 정의와 런타임만 가져오세요. 시연 버튼과 시연 상태 전환은 가져오지 마세요. 기존 기능, 텍스트, 라벨, 키보드, 포커스 및 접근성 속성을 보존하세요. 버튼 안에 버튼을 넣지 마세요. 실제 앱 상태에서 setState(state)${def.id==='download'?' 및 setProgress(percent)':''}를 호출하세요. 클릭은 작업 성공이 아닙니다. 삭제나 다운로드의 자동 성공을 만들지 마세요. 테마 토큰을 연결하고 축소 모션, 반복 입력, 중복 삽입을 검증하세요. MIT 고지를 유지하세요. 변경 파일, 아이콘 버전, 검증 결과와 미검증 항목을 보고하세요.\n\n선택 아이콘의 독립 시연 코드:\n${code}`:`Apply Lucian Icons ${def.name.en} (${def.id}) v${def.version} to this project.\nStates: ${Object.keys(def.states).join(', ')}. Selected: ${o.state}; ${o.size}px; ${o.accent}; trigger: ${options.trigger}.\nInspect target files, framework, themes and existing event handlers. Extract only the icon definition and runtime below. Omit the demonstration controls and demo state cycling. Preserve existing behavior, visible text, accessible names, keyboard handling, focus and ARIA. Never nest buttons. Drive setState(state)${def.id==='download'?' and setProgress(percent)':''} from real application state. A click does not mean success; do not invent automatic deletion or download success. Map theme tokens, retain MIT notices, test reduced motion, rapid reversal and duplicate instances. Report changed files, icon versions, tests and unverified items.\n\nIndependent demo for the selected icon:\n${code}`;
}
