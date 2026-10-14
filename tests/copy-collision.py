from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);page=b.new_page();page.goto('http://127.0.0.1:4173/icons/')
 code=page.evaluate('''async()=>{const d=(await import('./modules/trash.js')).definition;const e=await import('./export.js');return (e.embeddableCode||e.standaloneHTML)(d,{state:'closed',size:32,trigger:'click'},'en')}''')
 errors=[];off=b.new_page();off.on('pageerror',lambda e:errors.append(str(e)));off.set_content(code+code)
 buttons=off.locator('button.preview');assert buttons.count()==2
 buttons.nth(1).click()
 assert off.locator('lucian-trash').nth(0).get_attribute('state')=='closed'
 assert off.locator('lucian-trash').nth(1).get_attribute('state')=='open',errors
 assert not errors,errors
 b.close();print('duplicated copied snippet independent: passed')
