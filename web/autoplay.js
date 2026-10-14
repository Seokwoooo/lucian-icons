/* Lucian Icons gallery demo only. Never imported by the icon runtime. */
export function createAutoplay({load, t}) {
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const controls=[...document.querySelectorAll('[data-autoplay]')];
  const players=[];const timers=new Set();const events=new AbortController();
  let desired=true,suspended=false,active=null,generation=0,wakeTimer,lastIndex=-1,holdUntil=0;
  try{desired=localStorage.getItem('lucian-icons-autoplay')!=='off'}catch{}
  const enabled=()=>desired&&!reduced.matches;
  const running=()=>enabled()&&!suspended&&!document.hidden;
  const eligible=p=>p.visible&&p.button.isConnected&&!p.button.closest('[hidden]')&&!p.manual&&!p.hovered&&!p.button.contains(document.activeElement);
  const listen=(node,type,fn,options={})=>node.addEventListener(type,fn,{...options,signal:events.signal});
  function labels(){
    for(const button of controls){button.setAttribute('aria-pressed',String(enabled()));button.disabled=reduced.matches;button.setAttribute('aria-label',t(reduced.matches?'autoReduced':enabled()?'autoOn':'autoOff'));button.title=button.getAttribute('aria-label')}
    const hint=document.querySelector('[data-i18n=heroHint]');if(hint)hint.textContent=t(enabled()?'autoHint':'manualHint');
  }
  function stop(){
    generation++;clearTimeout(wakeTimer);for(const timer of timers)clearTimeout(timer);timers.clear();
    if(active){active.button.removeAttribute('data-demo-active');active.pointer.classList.remove('is-visible','is-down','is-click');active.pointer.getAnimations({subtree:true}).forEach(a=>a.cancel());active=null}
  }
  function kick(delay=350){
    clearTimeout(wakeTimer);if(!running()||active)return;
    if(!players.some(eligible))return;
    wakeTimer=setTimeout(next,Math.max(delay,holdUntil-performance.now()));
  }
  function later(fn,ms,gen){
    const timer=setTimeout(()=>{timers.delete(timer);if(gen===generation&&running()&&active&&eligible(active))fn()},ms);timers.add(timer);
  }
  function press(p){p.pointer.classList.add('is-down');p.pointer.classList.remove('is-click');void p.pointer.offsetWidth;p.pointer.classList.add('is-click')}
  function release(p){p.pointer.classList.remove('is-down')}
  async function next(){
    if(!running()||active)return;
    let p;for(let i=1;i<=players.length;i++){const index=(lastIndex+i)%players.length;if(eligible(players[index])){p=players[index];lastIndex=index;break}}
    if(!p)return;active=p;const gen=++generation;
    try{await load(p.def.id)}catch{if(gen===generation){p.manual=true;stop();kick()}return}
    if(gen!==generation||!running()||!eligible(p)){if(active===p){stop();kick()}return}
    const icon=p.button.querySelector(`lucian-${p.def.id}`);
    const state=value=>{icon.setState(value);p.onChange?.()};
    state(p.def.defaultState);if(p.def.id==='download')icon.setProgress(0);
    const box=p.button.getBoundingClientRect(),shape=icon.getBoundingClientRect();
    p.pointer.style.left=(shape.left-box.left+shape.width*.67)+'px';
    p.pointer.style.top=(shape.top-box.top+shape.height*.65)+'px';
    p.button.dataset.demoActive='true';
    p.pointer.classList.add('is-visible');
    p.pointer.animate([{transform:'translate(28px,22px)',opacity:0},{transform:'translate(0,0)',opacity:1}],{duration:440,easing:'cubic-bezier(.2,.7,.2,1)'});
    later(()=>press(p),470,gen);
    later(()=>{
      state(p.def.states[1]);
      if(p.def.id==='download')icon.setProgress(8);
    },530,gen);
    later(()=>release(p),650,gen);
    later(()=>p.pointer.classList.remove('is-visible'),850,gen);
    if(p.def.id==='download'){
      later(()=>icon.setProgress(35),850,gen);later(()=>icon.setProgress(70),1150,gen);later(()=>icon.setProgress(100),1450,gen);
      later(()=>state(p.round++%2?'error':'success'),1800,gen);
      later(()=>state('idle'),2750,gen);
      later(()=>{stop();kick(400)},3150,gen);
    }else{
      later(()=>{p.pointer.classList.add('is-visible');press(p)},1750,gen);
      later(()=>state(p.def.defaultState),1810,gen);
      later(()=>release(p),1920,gen);
      later(()=>p.pointer.classList.remove('is-visible'),2050,gen);
      later(()=>{stop();kick(400)},2450,gen);
    }
  }
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){const p=players.find(x=>x.button===entry.target);if(p)p.visible=entry.isIntersecting&&entry.intersectionRatio>=.55}
    if(active&&!eligible(active))stop();kick();
  },{threshold:[0,.2,.55,1]});
  function register(button,def,onChange){
    const pointer=document.createElement('span');pointer.className='demo-pointer';pointer.setAttribute('aria-hidden','true');
    pointer.innerHTML='<span class="demo-click"></span><svg width="23" height="27" viewBox="0 0 23 27" fill="none"><path d="M2 2 20 15l-8 1 4 8-4 2-4-9-6 5z" fill="#fffdf8" stroke="#252b2a" stroke-width="1.7" stroke-linejoin="round"/></svg>';
    button.append(pointer);const p={button,def,onChange,pointer,visible:false,manual:false,hovered:false,round:0};players.push(p);observer.observe(button);
    listen(button,'pointerenter',e=>{if(e.pointerType==='mouse'){p.hovered=true;if(active===p)stop();kick()}});
    listen(button,'pointerleave',()=>{p.hovered=false;kick(650)});
    const takeOver=()=>{p.manual=true;if(active===p)stop();kick(900)};
    listen(button,'pointerdown',takeOver);listen(button,'keydown',takeOver);listen(button,'focusin',()=>{if(active===p)stop();kick()});listen(button,'focusout',()=>kick(650));
  }
  for(const button of controls)listen(button,'click',()=>{
    desired=!desired;try{localStorage.setItem('lucian-icons-autoplay',desired?'on':'off')}catch{}
    if(desired)for(const p of players)p.manual=false;
    stop();labels();kick();
  });
  listen(document,'pointerdown',e=>{if(e.target.closest('[data-autoplay]'))return;holdUntil=performance.now()+900;stop();kick()},{capture:true});
  listen(document,'keydown',()=>{holdUntil=performance.now()+900;stop();kick()},{capture:true});
  listen(document,'visibilitychange',()=>{stop();kick()});
  listen(window,'pagehide',stop);listen(window,'pageshow',()=>kick());
  listen(window,'scroll',()=>{holdUntil=performance.now()+300;stop();kick()},{passive:true});
  listen(reduced,'change',()=>{stop();labels();kick()});labels();
  return {
    register,localize:labels,
    suspend(value){suspended=value;stop();kick()},
    refresh(){if(active&&!eligible(active))stop();kick()},
    destroy(){stop();observer.disconnect();events.abort();for(const p of players)p.pointer.remove();players.length=0}
  };
}
