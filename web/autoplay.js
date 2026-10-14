/* Lucian Icons gallery demos. Exported icon modules never import this file. */
export function createAutoplay({load,t}) {
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const controls=[...document.querySelectorAll('[data-autoplay]')];
  const players=new Map(),events=new AbortController();
  let desired=true,suspended=false,away=false,destroyed=false;
  try{desired=localStorage.getItem('lucian-icons-autoplay')!=='off'}catch{}
  const enabled=()=>desired&&!reduced.matches;
  const running=()=>enabled()&&!suspended&&!document.hidden&&!away&&!destroyed;
  const eligible=p=>p.visible&&p.button.isConnected&&!p.button.closest('[hidden]')&&!p.manual&&!p.hovered&&!p.button.contains(document.activeElement);
  const listen=(node,type,fn,options={})=>node.addEventListener(type,fn,{...options,signal:events.signal});
  function labels(){
    for(const b of controls){b.setAttribute('aria-pressed',String(enabled()));b.disabled=reduced.matches;b.setAttribute('aria-label',t(reduced.matches?'autoReduced':enabled()?'autoOn':'autoOff'));b.title=b.getAttribute('aria-label')}
    const hint=document.querySelector('[data-i18n=heroHint]');if(hint)hint.textContent=t(enabled()?'autoHint':'manualHint');
  }
  function stop(p){
    p.generation++;for(const timer of p.timers)clearTimeout(timer);p.timers.clear();p.active=false;
    p.button.removeAttribute('data-demo-active');p.pointer.classList.remove('is-visible','is-down','is-click');p.pointer.getAnimations({subtree:true}).forEach(a=>a.cancel());
  }
  function stopAll(){for(const p of players.values())stop(p)}
  function later(p,fn,ms,generation){
    const timer=setTimeout(()=>{p.timers.delete(timer);if(generation!==p.generation)return;if(!running()||!eligible(p)){stop(p);return}fn()},ms);p.timers.add(timer);
  }
  function press(p){p.pointer.classList.add('is-down');p.pointer.classList.remove('is-click');void p.pointer.offsetWidth;p.pointer.classList.add('is-click')}
  const release=p=>p.pointer.classList.remove('is-down');
  async function start(p){
    if(p.active||!running()||!eligible(p))return;
    p.active=true;const generation=++p.generation;
    try{await load(p.def.id)}catch{if(generation===p.generation){p.manual=true;stop(p)}return}
    if(generation!==p.generation)return;
    if(!running()||!eligible(p)){stop(p);return}
    const icon=p.button.querySelector(`lucian-${p.def.id}`);
    const state=value=>{icon.setState(value);p.onChange?.()};
    state(p.def.defaultState);if(p.def.id==='download')icon.setProgress(0);
    const box=p.button.getBoundingClientRect(),shape=icon.getBoundingClientRect();
    p.pointer.style.left=(shape.left-box.left+shape.width*.67)+'px';p.pointer.style.top=(shape.top-box.top+shape.height*.65)+'px';
    p.button.dataset.demoActive='true';p.pointer.classList.add('is-visible');
    p.pointer.animate([{transform:'translate(28px,22px)',opacity:0},{transform:'translate(0,0)',opacity:1}],{duration:440,easing:'cubic-bezier(.2,.7,.2,1)'});
    later(p,()=>press(p),470,generation);
    later(p,()=>{state(p.def.states[1]);if(p.def.id==='download')icon.setProgress(8)},530,generation);
    later(p,()=>release(p),650,generation);
    later(p,()=>p.pointer.classList.remove('is-visible'),850,generation);
    if(p.def.id==='download'){
      // Explicit gallery simulation, never an app adapter or production success timer.
      later(p,()=>icon.setProgress(35),850,generation);later(p,()=>icon.setProgress(70),1150,generation);later(p,()=>icon.setProgress(100),1450,generation);
      later(p,()=>state(p.round++%2?'error':'success'),1800,generation);later(p,()=>state('idle'),2750,generation);
      later(p,()=>{stop(p);start(p)},3650,generation);
    }else{
      later(p,()=>{p.pointer.classList.add('is-visible');press(p)},1750,generation);
      later(p,()=>state(p.def.defaultState),1810,generation);
      later(p,()=>release(p),1920,generation);later(p,()=>p.pointer.classList.remove('is-visible'),2050,generation);
      later(p,()=>{stop(p);start(p)},3000,generation);
    }
  }
  function sync(){for(const p of players.values()){if(!running()||!eligible(p)){if(p.active)stop(p)}else start(p)}}
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){const p=players.get(entry.target);if(p)p.visible=entry.isIntersecting&&entry.intersectionRatio>=.9}
    sync();
  },{threshold:[0,.5,.9,1]});
  function register(button,def,onChange){
    if(players.has(button))return;
    const pointer=document.createElement('span');pointer.className='demo-pointer';pointer.setAttribute('aria-hidden','true');
    pointer.innerHTML='<span class="demo-click"></span><svg width="23" height="27" viewBox="0 0 23 27" fill="none"><path d="M2 2 20 15l-8 1 4 8-4 2-4-9-6 5z" fill="#fffdf8" stroke="#252b2a" stroke-width="1.7" stroke-linejoin="round"/></svg>';
    button.append(pointer);
    const p={button,def,onChange,pointer,visible:false,manual:false,hovered:false,round:0,active:false,generation:0,timers:new Set()};players.set(button,p);observer.observe(button);
    listen(button,'pointerenter',e=>{if(e.pointerType==='mouse'){p.hovered=true;stop(p)}});
    listen(button,'pointerleave',()=>{p.hovered=false;start(p)});
    const takeOver=()=>{p.manual=true;stop(p)};
    listen(button,'pointerdown',takeOver);listen(button,'keydown',takeOver);
    listen(button,'focusin',()=>stop(p));listen(button,'focusout',()=>queueMicrotask(()=>start(p)));
  }
  for(const button of controls)listen(button,'click',()=>{
    desired=!desired;try{localStorage.setItem('lucian-icons-autoplay',desired?'on':'off')}catch{}
    if(desired)for(const p of players.values())p.manual=false;
    stopAll();labels();sync();
  });
  listen(document,'visibilitychange',()=>{stopAll();sync()});
  listen(window,'pagehide',()=>{away=true;stopAll()});listen(window,'pageshow',()=>{away=false;sync()});
  listen(reduced,'change',()=>{stopAll();labels();sync()});labels();
  return {
    register,localize:labels,refresh:sync,
    suspend(value){suspended=value;stopAll();sync()},
    destroy(){destroyed=true;stopAll();observer.disconnect();events.abort();for(const p of players.values())p.pointer.remove();players.clear()}
  };
}
