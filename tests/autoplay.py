from playwright.sync_api import sync_playwright,expect
import os
base=os.getenv('TEST_URL','http://127.0.0.1:4173/icons/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':1440,'height':1000});page.goto(base,wait_until='networkidle')
 expect(page.locator('#autoplay')).to_have_attribute('aria-pressed','true',timeout=1500)
 page.wait_for_selector('[data-demo-active=true]',timeout=6000)
 assert page.locator('[data-demo-active=true]').count()==1
 expect(page.locator('[data-demo-active=true] .demo-pointer')).to_be_visible()
 id=page.locator('[data-demo-active=true]').get_attribute('data-icon');target=page.locator('.hero-object[data-icon='+id+']');tag=target.locator('lucian-'+id);target.click();state=tag.get_attribute('state');page.wait_for_timeout(1200);expect(tag).to_have_attribute('state',state)
 page.locator('#autoplay').click();expect(page.locator('#autoplay')).to_have_attribute('aria-pressed','false');assert page.locator('[data-demo-active=true]').count()==0
 expect(page.locator('#gallery-autoplay')).to_have_attribute('aria-pressed','false')
 page.reload(wait_until='networkidle');expect(page.locator('#autoplay')).to_have_attribute('aria-pressed','false')
 page.locator('#gallery-autoplay').click();expect(page.locator('#autoplay')).to_have_attribute('aria-pressed','true');page.wait_for_selector('[data-demo-active=true]',timeout=6000)
 active=page.locator('[data-demo-active=true]').bounding_box();assert active['y']>=0 and active['y']<1000
 page.locator('[data-card=folder] .detail-link').click();page.wait_for_timeout(1000);assert page.locator('[data-demo-active=true]').count()==0
 page.keyboard.press('Escape');page.wait_for_selector('[data-demo-active=true]',timeout=6000)
 page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))");page.wait_for_timeout(700);assert page.locator('[data-demo-active=true]').count()==0
 page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'))");page.wait_for_selector('[data-demo-active=true]',timeout=6000)
 for id in ['mouse','cursor']:
  expect(page.locator('[data-card='+id+']')).to_have_count(1);page.locator('#search').fill('마우스' if id=='mouse' else 'cursor');expect(page.locator('.icon-card:visible')).to_have_count(1)
 page.emulate_media(reduced_motion='reduce');page.reload(wait_until='networkidle');expect(page.locator('#autoplay')).to_be_disabled();assert page.locator('[data-demo-active=true]').count()==0
 page.locator('#search').fill('cursor');page.locator('[data-card=cursor] .icon-play').click();expect(page.locator('[data-card=cursor] lucian-cursor')).to_have_attribute('state','pressed')
 b.close();print('Autoplay priority, pause, persisted preference, offscreen selection, inspector/background pause, reduced motion and mouse/cursor discovery: passed')
