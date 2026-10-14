"""Visible previews must play together without overriding direct input."""
from playwright.sync_api import sync_playwright,expect
import os
base=os.getenv('TEST_URL','http://127.0.0.1:4173/icons/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':1440,'height':1050});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.goto(base,wait_until='networkidle')
 expect(page.locator('#autoplay')).to_have_attribute('aria-pressed','true')
 page.wait_for_timeout(650)
 assert page.locator('.hero-object[data-demo-active=true]').count()==3,'all three visible hero icons must autoplay together'
 page.wait_for_function("[...document.querySelectorAll('.hero-object')].every(b=>b.querySelector('[state]')?.getAttribute('state')!=='closed'&&b.querySelector('[state]')?.getAttribute('state')!=='locked')")
 target=page.locator('.hero-object[data-icon=trash]');target.click();state=target.locator('lucian-trash').get_attribute('state');page.wait_for_timeout(1000)
 expect(target.locator('lucian-trash')).to_have_attribute('state',state);assert target.get_attribute('data-demo-active') is None
 assert page.locator('.hero-object[data-demo-active=true]').count()==2,'manual takeover must not stop neighboring previews'
 page.locator('#autoplay').click();expect(page.locator('#gallery-autoplay')).to_have_attribute('aria-pressed','false');assert page.locator('[data-demo-active=true]').count()==0
 page.reload(wait_until='networkidle');expect(page.locator('#autoplay')).to_have_attribute('aria-pressed','false')
 page.locator('#gallery-autoplay').click();page.locator('#icon-grid').scroll_into_view_if_needed();page.mouse.move(0,0);page.wait_for_timeout(700)
 status=page.evaluate("""()=>[...document.querySelectorAll('.icon-play')].map(b=>{const r=b.getBoundingClientRect();return{visible:r.top>=0&&r.bottom<=innerHeight,active:b.dataset.demoActive==='true'}})""")
 visible=[s for s in status if s['visible']];assert len(visible)>=6 and all(s['active'] for s in visible),status[:15]
 assert page.locator('.hero-object[data-demo-active=true]').count()==0,'offscreen hero must stop'
 page.locator('[data-card=folder] .detail-link').click();page.wait_for_timeout(500);assert page.locator('[data-demo-active=true]').count()==0
 page.keyboard.press('Escape');page.mouse.move(0,0);page.wait_for_selector('[data-demo-active=true]',timeout=4000)
 page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))");page.wait_for_timeout(500);assert page.locator('[data-demo-active=true]').count()==0
 page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'))");page.wait_for_selector('[data-demo-active=true]',timeout=4000)
 page.locator('#search').fill('cursor');page.wait_for_timeout(600);assert page.locator('.icon-card[hidden] [data-demo-active=true]').count()==0
 page.emulate_media(reduced_motion='reduce');expect(page.locator('#autoplay')).to_be_disabled();assert page.locator('[data-demo-active=true]').count()==0
 cursor=page.locator('[data-card=cursor] lucian-cursor');previous=cursor.get_attribute('state') or 'idle';page.locator('[data-card=cursor] .icon-play').click();expect(cursor).to_have_attribute('state','idle' if previous=='pressed' else 'pressed')
 assert not errors,errors;b.close();print('Concurrent visible autoplay, individual takeover, global pause, filtering, inspector, hidden page and reduced motion: passed')
