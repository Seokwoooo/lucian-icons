from playwright.sync_api import sync_playwright, expect
import os
base=os.getenv('TEST_URL','http://127.0.0.1:4173/icons/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page()
 page.goto(base+'test.html')
 expect(page.locator('lucian-trash').first).to_have_attribute('state','closed')
 page.evaluate("document.querySelector('lucian-trash').setState('open')")
 expect(page.locator('lucian-trash').first).to_have_attribute('state','open')
 assert page.locator('lucian-trash').first.evaluate("e=>e.shadowRoot.querySelector('[data-part=lid]').style.transform")=='rotate(32deg)'
 page.evaluate("document.querySelector('lucian-trash').setState('closed')")
 expect(page.locator('lucian-trash').first).to_have_attribute('state','closed')
 b.close()
 print('baseline runtime checks passed')
