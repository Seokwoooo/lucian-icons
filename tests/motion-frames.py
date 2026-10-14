"""Capture real Chromium animation frames, plus readable contact sheets."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import os,json
base=os.getenv('TEST_URL','http://127.0.0.1:4173/icons/')
out=Path(os.getenv('FRAME_OUT','.artifacts/motion-before'));out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':1280,'height':900},device_scale_factor=1)
 page.goto(base,wait_until='networkidle')
 plans=page.evaluate('''async()=>{const {icons}=await(await fetch('./catalog.json')).json();for(const d of icons)await import('./modules/'+d.id+'.js');return icons.flatMap(d=>d.id==='download'?[{id:d.id,from:'idle',to:'progress'},{id:d.id,from:'progress',to:'success'},{id:d.id,from:'success',to:'error'}]:[{id:d.id,from:d.defaultState,to:d.states[1]}])}''')
 page.evaluate('''()=>{document.body.innerHTML='<main id="audit"></main>';document.head.insertAdjacentHTML('beforeend',`<style>html,body{background:#f4f0e8!important;color:#252b2a!important;margin:0!important}#audit{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;padding:24px;font:12px monospace;background:#dad7d0}article{background:#f4f0e8;min-height:235px;display:flex;align-items:center;justify-content:center;gap:24px;flex-direction:column}label{color:#353b3a}.line{display:flex;gap:30px;align-items:center}</style>`)}''')
 page.evaluate('''plans=>{const main=document.querySelector('#audit');main.innerHTML=plans.map(d=>`<article><label>${d.id}: ${d.from} → ${d.to}</label><lucian-${d.id} size="112" state="${d.from}" progress="64"></lucian-${d.id}></article>`).join('');window.items=[...main.querySelectorAll('article')].map((e,i)=>({e:e.lastElementChild,d:plans[i]}));for(const{e}of items)for(const a of e.shadowRoot.querySelector('svg').getAnimations({subtree:true}))a.finish();for(const{e}of items)e.getBoundingClientRect()}''',plans)
 for direction in ['forward','reverse']:
  page.evaluate('''direction=>{for(const{e,d}of items){for(const a of e.shadowRoot.querySelector('svg').getAnimations({subtree:true}))a.finish();e.setState(direction==='forward'?d.to:d.from);getComputedStyle(e.shadowRoot.querySelector('[data-part]')).transform}window.animations=items.flatMap(({e})=>e.shadowRoot.querySelector('svg').getAnimations({subtree:true}));for(const a of animations){a.pause();a.currentTime=0}}''',direction)
  for frame in range(49):
   page.evaluate('ms=>{for(const a of animations)a.currentTime=ms}',frame*1000/60)
   page.screenshot(path=str(out/f'{direction}-{frame:02}.png'))
 # Contact sheets render independent copies at the same exact sample times.
 for direction in ['forward','reverse']:
  for offset in range(0,len(plans),3):
   group=plans[offset:offset+3]
   if direction=='reverse':group=[dict(d,**{'from':d['to'],'to':d['from']}) for d in group]
   page.set_viewport_size({'width':1400,'height':660})
   page.evaluate('''plans=>{const times=[0,50,100,150,220,320,450,800];const main=document.querySelector('#audit');main.style.gridTemplateColumns='repeat(8,1fr)';main.innerHTML=plans.flatMap(d=>times.map(ms=>`<article style="min-height:194px"><label>${d.id} / ${ms}ms</label><lucian-${d.id} size="96" state="${d.from}" progress="64" data-to="${d.to}" data-ms="${ms}"></lucian-${d.id}></article>`)).join('');for(const e of main.querySelectorAll('[data-to]')){for(const a of e.shadowRoot.querySelector('svg').getAnimations({subtree:true}))a.finish();getComputedStyle(e.shadowRoot.querySelector('[data-part]')).transform;e.setState(e.dataset.to);getComputedStyle(e.shadowRoot.querySelector('[data-part]')).transform;for(const a of e.shadowRoot.querySelector('svg').getAnimations({subtree:true})){a.pause();a.currentTime=Number(e.dataset.ms)}}}''',group)
   page.screenshot(path=str(out/f'sheet-{direction}-{offset//3}.png'))
 (out/'frames.json').write_text(json.dumps({'fps':60,'frames_per_direction':49,'directions':['forward','reverse'],'plans':plans},indent=2))
 b.close();print(json.dumps({'frames':98,'sheets':2*((len(plans)+2)//3),'output':str(out)}))
