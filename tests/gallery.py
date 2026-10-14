from playwright.sync_api import sync_playwright, expect
from pathlib import Path
import json, os
base=os.getenv('TEST_URL','http://127.0.0.1:4173/icons/')
out=Path('.artifacts');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1050},locale='ko-KR')
 errors=[];failures=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('requestfailed',lambda r:failures.append(r.url))
 page.goto(base,wait_until='networkidle');expect(page.locator('.icon-card')).to_have_count(10)
 page.screenshot(path=str(out/'desktop.png'))
 page.screenshot(path=str(out/'desktop-full.png'),full_page=True)
 page.locator('#search').fill('삭제');expect(page.locator('.icon-card:visible')).to_have_count(1)
 page.locator('#search').fill('heart');expect(page.locator('.icon-card:visible')).to_have_count(1)
 page.locator('#search').fill('없습니다');expect(page.locator('#empty')).to_be_visible()
 page.locator('#search').fill('')
 page.locator('[data-card=trash] .detail-link').click();expect(page.locator('#detail')).to_be_visible()
 page.locator('#state').select_option('open');page.locator('#size').select_option('32')
 page.locator('#color').fill('#cc5500');page.locator('#color').dispatch_event('input')
 expect(page.locator('#preview-button lucian-trash')).to_have_attribute('accent','#cc5500')
 page.screenshot(path=str(out/'detail.png'))
 page.keyboard.press('Escape');expect(page.locator('#detail')).not_to_be_visible()
 page.locator('#theme').click();expect(page.locator('html')).to_have_attribute('data-theme','dark')
 page.locator('#language').click();expect(page.locator('html')).to_have_attribute('lang','en')
 page.evaluate('scrollTo(0,0)');page.screenshot(path=str(out/'desktop-dark-en.png'))
 page.set_viewport_size({'width':390,'height':844});page.goto(base,wait_until='networkidle');page.screenshot(path=str(out/'mobile-dark-en.png'),full_page=True)
 page.locator('#theme').click();page.locator('#language').click();page.evaluate('scrollTo(0,0)');page.screenshot(path=str(out/'mobile.png'))
 page.screenshot(path=str(out/'mobile-full.png'),full_page=True)
 assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'horizontal overflow'
 print(json.dumps({'errors':errors,'failed_requests':failures},ensure_ascii=False))
 assert not errors
 b.close()
