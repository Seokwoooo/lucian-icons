import {copy,stateNames,triggerNames} from './i18n.js';
const $=s=>document.querySelector(s);
let lang='ko';try{lang=localStorage.getItem('lucian-icons-lang')||((navigator.language||'ko').startsWith('ko')?'ko':'en')}catch{}
if(!copy[lang])lang='ko';
let catalog=[],selected=null,selectedDef=null,agent='claude',toastTimer,downloadTimer,downloadProgress=0;
const modules=new Map(),urls=new Set();
const t=k=>copy[lang][k]||k;
const stateText=(id,s)=>id==='power'?(lang==='ko'?(s==='on'?'켜짐':'꺼짐'):(s==='on'?'On':'Off')):stateNames[lang][s]||s;
const load=async id=>{if(!modules.has(id))modules.set(id,import(`./modules/${id}.js`));return (await modules.get(id)).definition};
const palette=dark=>dark?{ink:'#ede9df',paper:'#222628'}:{ink:'#252b2a',paper:'#fffdf8'};
function iconMarkup(id,size=48,state,extra=''){return `<lucian-${id} size="${size}"${state?` state="${state}"`:''} ${extra}></lucian-${id}>`}
function syncTheme(){
 const dark=document.documentElement.dataset.theme==='dark';const colors=palette(dark);
 document.querySelectorAll('main lucian-trash,main lucian-folder,main lucian-envelope,main lucian-lock,main lucian-bell,main lucian-heart,main lucian-bookmark,main lucian-download,main lucian-search,main lucian-power').forEach(e=>{e.setAttribute('ink',colors.ink);e.setAttribute('paper',colors.paper)});
 $('#theme').setAttribute('aria-label',t(dark?'themeLight':'themeDark'));$('#theme').setAttribute('aria-pressed',String(dark));
}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2600)}
function updateCardState(card,def){const icon=card.querySelector(`lucian-${def.id}`);const current=icon.state||def.defaultState;card.querySelector('.state-indicator').textContent=stateText(def.id,current);card.querySelector('.icon-play').setAttribute('aria-label',`${def.name[lang]}: ${stateText(def.id,current)}. ${t('try')}`)}
function updateInstall(){const codex=agent==='codex';$('#install-path').textContent=codex?'.agents/skills/lucian-icons/':'.claude/skills/lucian-icons/';$('#invoke-command').textContent=(codex?'$lucian-icons ':'/lucian-icons ')+t('installExample');$('#install-copy').textContent=t('installCopy');$('#install-panel').setAttribute('aria-labelledby',`tab-${agent}`);for(const name of ['claude','codex']){$(`#tab-${name}`).setAttribute('aria-selected',String(name===agent));$(`#tab-${name}`).tabIndex=name===agent?0:-1}}
function localize(){
 document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(e=>e.innerHTML=t(e.dataset.i18n));
 $('#language').innerHTML=lang==='ko'?'KO <span>/ EN</span>':'<span>KO /</span> EN';$('#language').setAttribute('aria-label',lang==='ko'?'Switch to English':'한국어로 전환');
 $('#search').placeholder=t('searchPlaceholder');$('#close-detail').setAttribute('aria-label',t('close'));$('#copy-text').setAttribute('aria-label',t('copyCode'));
 $('#demo-bell').setAttribute('aria-label',t('bellDemo'));$('#demo-heart').setAttribute('aria-label',t('heartDemo'));$('#demo-trash').setAttribute('aria-label',t('trashDemo'));$('#demo-outcome').setAttribute('aria-label',t('demoOutcome'));
 document.title=lang==='ko'?'Lucian Icons | 작은 움직임, 분명한 차이':'Lucian Icons | Small motions. Thoughtful details.';
 for(const d of catalog){const card=$(`[data-card="${d.id}"]`);if(card){card.querySelector('.icon-name').textContent=d.name[lang];card.querySelector('.icon-en').textContent=lang==='ko'?d.name.en:d.name.ko;card.querySelector('.detail-link').setAttribute('aria-label',`${d.name[lang]} ${t('settings')}`);updateCardState(card,d)}}
 document.querySelectorAll('.hero-object').forEach(e=>{const d=catalog.find(x=>x.id===e.dataset.icon);e.setAttribute('aria-label',d.name[lang]+' '+t('try'));e.querySelector('.object-action').textContent=d.name[lang]+' ↗'});
 updateInstall();syncTheme();if(selected)updateDetailLabels();if(downloadTimer)$('#demo-download span').textContent=t('cancel');
}
function search(){const q=$('#search').value.trim().toLocaleLowerCase().normalize('NFKC');let count=0;for(const d of catalog){const hit=[d.id,d.name.ko,d.name.en,...d.keywords].join(' ').toLocaleLowerCase().normalize('NFKC').includes(q);$(`[data-card="${d.id}"]`).hidden=!hit;if(hit)count++}$('#result-count').textContent=`${String(count).padStart(2,'0')} / 10`;$('#empty').hidden=!!count}
async function cycle(icon,d){await load(d.id);const next=d.states[(d.states.indexOf(icon.state)+1)%d.states.length];if(d.id==='download'&&next==='progress')icon.setProgress(45);icon.setState(next)}
async function render(){
 const r=await fetch('./catalog.json');if(!r.ok)throw new Error('Catalog fetch failed');catalog=(await r.json()).icons;
 await Promise.all(['trash','folder','lock'].map(load));
 $('#hero-icons').innerHTML=['trash','folder','lock'].map((id,i)=>`<button type="button" class="hero-object" data-icon="${id}"><span class="object-label">0${i+1} / ${id.toUpperCase()}</span>${iconMarkup(id,104,undefined,'ink="#ede9df" paper="#1d2024"')}<span class="object-rule"></span><span class="object-action"></span></button>`).join('');
 for(const b of document.querySelectorAll('.hero-object'))b.addEventListener('click',()=>cycle(b.querySelector(`lucian-${b.dataset.icon}`),catalog.find(d=>d.id===b.dataset.icon)));
 $('#icon-grid').innerHTML=catalog.map((d,i)=>`<article class="icon-card" data-card="${d.id}"><button class="icon-play" type="button">${iconMarkup(d.id,56)}</button><div class="icon-card-head"><div><span class="icon-id">${String(i+1).padStart(2,'0')}</span><span class="icon-name"></span></div><button class="detail-link" type="button">↗</button></div><div class="icon-caption"><span class="icon-en"></span><span class="state-indicator"></span></div></article>`).join('');
 const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){load(e.target.dataset.card).then(()=>updateCardState(e.target,catalog.find(d=>d.id===e.target.dataset.card))).catch(()=>toast(t('errorLoad')));observer.unobserve(e.target)}},{rootMargin:'200px'});
 for(const d of catalog){const card=$(`[data-card="${d.id}"]`);observer.observe(card);card.querySelector('.icon-play').addEventListener('click',async()=>{try{await cycle(card.querySelector(`lucian-${d.id}`),d);updateCardState(card,d)}catch{toast(t('failed'))}});card.querySelector('.detail-link').addEventListener('click',()=>openDetail(d.id))}
 // Load UI examples only near the viewport. No autonomous icon animation.
 const examples=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){Promise.all(['heart','bookmark','bell','download'].map(load)).catch(()=>toast(t('errorLoad')));examples.disconnect()}},{rootMargin:'400px'});examples.observe($('#in-context'));
 localize();search();followHash();
}
function options(){const background=$('input[name=background]:checked').value;return {state:$('#state').value,size:Number($('#size').value),accent:$('#color').value,progress:Number($('#progress').value),trigger:$('#trigger').value,background,...palette(background==='dark')}}
function updateDetailLabels(){
 const o=options();$('#detail-title').textContent=selected.name[lang];$('#detail-number').textContent=`${String(catalog.indexOf(selected)+1).padStart(2,'0')} / ${selected.id.toUpperCase()} / v${selected.version}`;$('#detail-description').textContent=selected.description[lang];
 $('#state').innerHTML=selected.states.map(s=>`<option value="${s}">${stateText(selected.id,s)}</option>`).join('');$('#state').value=selected.states.includes(o.state)?o.state:selected.defaultState;
 $('#trigger').innerHTML=selected.triggers.map(s=>`<option value="${s}">${triggerNames[lang][s]}</option>`).join('');$('#trigger').value=selected.triggers.includes(o.trigger)?o.trigger:selected.triggers[0];updatePreview();
}
let detailRequest=0;
async function openDetail(id){
 const d=catalog.find(x=>x.id===id);if(!d)return;const request=++detailRequest;
 try{const def=await load(id);if(request!==detailRequest)return;selected=d;selectedDef=def;
 $('#state').innerHTML=d.states.map(s=>`<option value="${s}">${s}</option>`).join('');$('#state').value=d.defaultState;$('#size').value='48';$('#color').value=d.accent;$('#progress').value='0';$('#trigger').innerHTML=d.triggers.map(s=>`<option value="${s}">${s}</option>`).join('');$('#trigger').value=d.triggers[0];
 const bg=document.documentElement.dataset.theme==='dark'?'dark':'light';$(`input[name=background][value=${bg}]`).checked=true;
 $('#preview-button').innerHTML=iconMarkup(id);$('#small-previews').innerHTML=[24,32,48].map(s=>`<div>${iconMarkup(id,s)}<span>${s}</span></div>`).join('');
 $('#progress-setting').hidden=id!=='download';updateDetailLabels();
 if(!$('#detail').open)$('#detail').showModal();history.replaceState(null,'',`#${id}`);
 }catch{toast(t('errorLoad'))}
}
function updatePreview(){if(!selected)return;const o=options();$('#preview-stage').dataset.background=o.background;$('#small-previews').dataset.background=o.background;$('#color-value').textContent=o.accent.toUpperCase();$('#preview-size').textContent=`${o.size} × ${o.size}`;$('#progress-value').textContent=o.progress+'%';$('#trigger-note').textContent=t(o.trigger==='controlled'?'controlledNote':o.trigger==='hover'?'hoverNote':'clickNote');
 for(const icon of document.querySelectorAll(`#preview-button lucian-${selected.id},#small-previews lucian-${selected.id}`)){for(const k of ['state','accent','ink','paper','progress'])icon.setAttribute(k,String(o[k]));if(icon.closest('#preview-button'))icon.setAttribute('size',String(o.size))}
 $('#preview-button').setAttribute('aria-label',`${selected.name[lang]}: ${stateText(selected.id,o.state)}. ${t('try')}`);
}
function previewCycle(){if(!selected)return;const states=selected.states;$('#state').value=states[(states.indexOf($('#state').value)+1)%states.length];updatePreview()}
function previewSet(active){if(selected&&$('#trigger').value==='hover'){$('#state').value=selected.states[active?1:0];updatePreview()}}
function followHash(){const id=location.hash.slice(1);if(catalog.some(d=>d.id===id))openDetail(id)}
async function copyText(text){
 try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);toast(t('copied'))}
 catch{$('#copy-text').value=text;$('#copy-fallback').showModal();$('#copy-text').focus();$('#copy-text').select()}
}
async function action(button,fn){button.disabled=true;try{await fn()}catch{toast(t('failed'))}finally{button.disabled=false}}
function download(text,type,filename){const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);urls.add(url);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>{URL.revokeObjectURL(url);urls.delete(url)},30000);toast(t('prepared'))}
function resetDemo(message=false){clearInterval(downloadTimer);downloadTimer=null;$('#demo-download span').textContent=t('downloadDemo');if(message){$('#demo-download lucian-download').setState('idle');$('#demo-status').textContent=t('cancelled')}}
$('#language').addEventListener('click',()=>{lang=lang==='ko'?'en':'ko';try{localStorage.setItem('lucian-icons-lang',lang)}catch{}localize()});
$('#theme').addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';try{localStorage.setItem('lucian-icons-theme',dark?'dark':'light')}catch{}syncTheme()});
$('#search').addEventListener('input',search);
$('#close-detail').addEventListener('click',()=>$('#detail').close());$('#detail').addEventListener('close',()=>{selected=null;selectedDef=null;detailRequest++;if(catalog.some(d=>`#${d.id}`===location.hash))history.replaceState(null,'','#gallery')});
$('#close-fallback').addEventListener('click',()=>$('#copy-fallback').close());
$('#preview-button').addEventListener('click',previewCycle);$('#preview-button').addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')previewSet(true)});$('#preview-button').addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')previewSet(false)});$('#preview-button').addEventListener('focus',()=>previewSet(true));$('#preview-button').addEventListener('blur',()=>previewSet(false));
for(const id of ['state','trigger','size','color','progress'])$('#'+id).addEventListener('input',updatePreview);document.querySelectorAll('input[name=background]').forEach(e=>e.addEventListener('change',updatePreview));$('#reset-color').addEventListener('click',()=>{$('#color').value=selected.accent;updatePreview()});
for(const [id,kind] of [['copy-code','code'],['copy-prompt','prompt'],['download-svg','svg'],['download-html','html']]){$('#'+id).addEventListener('click',e=>action(e.currentTarget,async()=>{const d=selectedDef,o=options(),locale=lang;const exp=await import('./export.js');if(kind==='svg')download(exp.staticSVG(d,o),'image/svg+xml',`lucian-${d.id}-${o.state}.svg`);else if(kind==='html')download(await exp.standaloneHTML(d,o,locale),'text/html',`lucian-${d.id}.html`);else await copyText(await (kind==='prompt'?exp.applicationPrompt(d,o,locale):exp.embeddableCode(d,o,locale)))}))}
for(const name of ['claude','codex']){$('#tab-'+name).addEventListener('click',()=>{agent=name;updateInstall()});$('#tab-'+name).addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();agent=e.key==='Home'?'claude':e.key==='End'?'codex':agent==='claude'?'codex':'claude';updateInstall();$('#tab-'+agent).focus()}})}
for(const [id,icon] of [['demo-bookmark','bookmark'],['demo-heart','heart'],['demo-trash','trash'],['demo-bell','bell']])$('#'+id).addEventListener('click',async()=>{try{const d=catalog.find(x=>x.id===icon),el=$(`#${id} lucian-${icon}`);await cycle(el,d);if(icon!=='bell')$('#'+id).setAttribute('aria-pressed',String(el.state!==d.defaultState))}catch{toast(t('failed'))}});
$('#demo-folder').addEventListener('click',()=>{const open=$('#demo-extra').hidden;$('#demo-extra').hidden=!open;$('#demo-folder').setAttribute('aria-expanded',String(open));$('#demo-folder lucian-folder').setState(open?'open':'closed')});
$('#demo-download').addEventListener('click',async()=>{try{await load('download');if(downloadTimer){resetDemo(true);return}const icon=$('#demo-download lucian-download'),outcome=$('#demo-outcome').value;downloadProgress=0;icon.setProgress(0);icon.setState('progress');$('#demo-download span').textContent=t('cancel');$('#demo-status').textContent='0%';downloadTimer=setInterval(()=>{downloadProgress+=10;icon.setProgress(downloadProgress);$('#demo-status').textContent=downloadProgress+'%';if(downloadProgress>=100){resetDemo();icon.setState(outcome);$('#demo-status').textContent=t(outcome==='success'?'demoSuccess':'demoError')}},130)}catch{toast(t('failed'))}});
const demoVisibility=new IntersectionObserver(entries=>{if(entries[0]&&!entries[0].isIntersecting&&downloadTimer)resetDemo(true)});demoVisibility.observe($('#in-context'));
window.addEventListener('pagehide',()=>{resetDemo();clearTimeout(toastTimer);for(const url of urls)URL.revokeObjectURL(url);urls.clear()});document.addEventListener('visibilitychange',()=>{if(document.hidden&&downloadTimer)resetDemo(true)});
window.addEventListener('hashchange',followHash);
localize();render().catch(()=>{$('#empty').hidden=false;$('#empty').textContent=t('errorLoad')});
