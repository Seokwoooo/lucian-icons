from playwright.sync_api import sync_playwright,expect
import os,json
base=os.getenv('TEST_URL','http://127.0.0.1:4173/icons/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':1440,'height':1050});modules=set();page.on('request',lambda r:modules.add(r.url) if '/modules/' in r.url else None);page.goto(base,wait_until='networkidle')
 expect(page.locator('#category')).to_be_visible()
 initial_modules=len(modules);assert initial_modules<=24, f'Eager module count: {initial_modules}'
 catalog=page.evaluate("async()=> (await(await fetch('./catalog.json')).json()).icons")
 for category in sorted(set(d['category'] for d in catalog)):
  page.locator('#category').select_option(category);count=sum(d['category']==category for d in catalog);expect(page.locator('.icon-card:visible')).to_have_count(count)
 page.locator('#category').select_option('all');page.locator('#search').fill('커서');expect(page.locator('.icon-card:visible')).to_have_count(1)
 page.locator('#language').click();expect(page.locator('#category')).to_have_value('all');expect(page.locator('.icon-card:visible')).to_have_count(1)
 page.locator('#search').fill('');expect(page.locator('.icon-card:visible')).to_have_count(len(catalog))
 print(json.dumps({'catalog_count':len(catalog),'category_search_bilingual':'passed','initial_module_count':initial_modules,'after_browsing_module_count':len(modules)}));b.close()
