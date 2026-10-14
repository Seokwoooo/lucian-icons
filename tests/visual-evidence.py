"""Browser screenshots of actual small icons and the autoplay UI."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import os
base=os.getenv('TEST_URL','http://127.0.0.1:4173/icons/')
out=Path('.artifacts');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1050},locale='ko-KR')
 for name,width,height in [('desktop',1440,1050),('mobile',390,844)]:
  page.set_viewport_size({'width':width,'height':height});page.goto(base,wait_until='networkidle')
  page.wait_for_selector('.demo-pointer.is-visible.is-down',timeout=6000);page.screenshot(path=str(out/f'autoplay-{name}.png'))
 page.set_viewport_size({'width':1040,'height':900});page.goto(base,wait_until='networkidle');page.emulate_media(reduced_motion='reduce')
 page.evaluate('''async()=>{window.defs=(await(await fetch('./catalog.json')).json()).icons;for(const d of defs)await import('./modules/'+d.id+'.js');document.body.innerHTML='<main id="proof"></main>';document.head.insertAdjacentHTML('beforeend',`<style>body{margin:0;background:#f4f0e8}#proof{padding:24px;font:12px monospace;color:#252b2a}section{display:grid;grid-template-columns:140px 1fr 1fr;align-items:center;height:62px;border-bottom:1px solid #d8dad6}.sizes{display:flex;align-items:center;justify-content:space-around;gap:24px;height:62px}.dark{background:#121416}.light{background:#f4f0e8}</style>`)}''')
 count=page.evaluate('defs.length')
 for mode in ['resting','active']:
  for offset in range(0,count,12):
   page.evaluate('''({mode,offset})=>{document.querySelector('#proof').innerHTML='<p>'+mode.toUpperCase()+' / 24px, 32px, 48px / LIGHT + DARK</p>'+defs.slice(offset,offset+12).map(d=>`<section><span>${d.id}</span>${['light','dark'].map(theme=>`<div class="sizes ${theme}">${[24,32,48].map(size=>`<lucian-${d.id} size="${size}" state="${mode==='resting'?d.defaultState:d.states[1]}" progress="64" ink="${theme==='dark'?'#ede9df':'#252b2a'}" paper="${theme==='dark'?'#222628':'#fffdf8'}"></lucian-${d.id}>`).join('')}</div>`).join('')}</section>`).join('')}''',{'mode':mode,'offset':offset})
   page.screenshot(path=str(out/f'small-{mode}-{offset//12:02}.png'))
 b.close();print(f'Captured autoplay desktop/mobile and all {count} icons at 24/32/48px in both themes and states')
