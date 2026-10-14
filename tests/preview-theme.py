from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);page=b.new_page();page.goto('http://127.0.0.1:4173/icons/#lock',wait_until='networkidle');page.locator('input[name=background][value=dark]').check()
 colors=page.locator('#small-previews').evaluate("e=>({bg:getComputedStyle(e).backgroundColor,ink:e.querySelector('lucian-lock').getAttribute('ink')})")
 assert colors=={'bg':'rgb(18, 20, 22)','ink':'#ede9df'},colors
 page.locator('input[name=background][value=light]').check()
 colors=page.locator('#small-previews').evaluate("e=>({bg:getComputedStyle(e).backgroundColor,ink:e.querySelector('lucian-lock').getAttribute('ink')})")
 assert colors=={'bg':'rgb(244, 240, 232)','ink':'#252b2a'},colors
 b.close();print('small preview background and palette: passed')
