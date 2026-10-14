from playwright.sync_api import sync_playwright, expect
from pathlib import Path
import json, os, zipfile
base=os.getenv('TEST_URL','http://127.0.0.1:4173/icons/')
root=Path(__file__).resolve().parents[1];out=root/'.artifacts';out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 context=b.new_context(viewport={'width':1280,'height':900},locale='en-US',accept_downloads=True)
 page=context.new_page();errors=[];bad=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('response',lambda r:bad.append((r.status,r.url)) if r.status>=400 else None)
 page.goto(base,wait_until='networkidle')
 catalog=page.request.get(base+'catalog.json').json()['icons']
 # Every state at every small size, immediate reversal, duplicate instances and reinsertion.
 for d in catalog:
  page.evaluate('async(id)=>await import("./modules/"+id+".js")',d['id'])
  result=page.evaluate('''d=>{
    const a=document.createElement('lucian-'+d.id),b=document.createElement('lucian-'+d.id);
    document.body.append(a,b);const rows=[];
    for(const size of [24,32,48])for(const state of d.states){a.setAttribute('size',size);a.setState(state);rows.push(a.state===state&&a.getBoundingClientRect().width===size)}
    for(let i=0;i<60;i++)a.setState(d.states[i%d.states.length]);a.setState(d.defaultState);
    const other=b.state===d.defaultState;a.remove();document.body.append(a);a.setState(d.states[1]);
    const reinsert=a.state===d.states[1];const noIds=!a.shadowRoot.querySelector('[id]');a.setAttribute('accent','"><script>');a.setAttribute('size','NaN');
    const valid=a.style.width==='48px'&&!a.style.getPropertyValue('--li-accent').includes('<');a.remove();b.remove();return {rows,other,reinsert,noIds,valid};
  }''',d)
  assert all(result['rows']) and all(result[k] for k in ['other','reinsert','noIds','valid']), (d['id'],result)
 # Independent production API: progress 100 never becomes success; invalid state rejected.
 result=page.evaluate('''()=>{const i=document.createElement('lucian-download');document.body.append(i);i.setState('progress');i.setProgress(100);window.testDownload=i;let rejected=false;try{i.setState('fake')}catch{rejected=true}return rejected}''')
 assert result;page.wait_for_timeout(1200)
 assert page.evaluate('testDownload.state')=='progress';page.evaluate('testDownload.remove()')
 # Dialog keyboard operation and current settings in copied code/downloads.
 page.locator('[data-card=trash] .detail-link').focus();page.keyboard.press('Enter')
 expect(page.locator('#detail')).to_be_visible();page.locator('#state').select_option('open');page.locator('#size').select_option('32');page.locator('#color').fill('#cc5500');page.locator('#color').dispatch_event('input');page.locator('#trigger').select_option('hover')
 page.locator('input[name=background][value=dark]').check()
 # Force clipboard rejection: manual fallback must be offered, never success.
 page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied')}}})")
 page.locator('#copy-code').click();expect(page.locator('#copy-fallback')).to_be_visible()
 code=page.locator('#copy-text').input_value();assert 'size="32"' in code and '#cc5500' in code and 'state="open"' in code and 'pointerenter' in code
 assert page.locator('#toast').inner_text()!='Copied.'
 (out/'copied-trash.html').write_text(code);page.locator('#close-fallback').click()
 page.locator('#copy-prompt').click();expect(page.locator('#copy-fallback')).to_be_visible();prompt=page.locator('#copy-text').input_value();assert 'setState' in prompt and 'v1.0.0' in prompt and 'lucian-folder' not in prompt;page.locator('#close-fallback').click()
 with page.expect_download() as dl:page.locator('#download-svg').click()
 dl.value.save_as(out/'selected-trash.svg');svg=(out/'selected-trash.svg').read_text();assert '#cc5500' in svg and 'width="32"' in svg and 'rotate(32deg)' in svg and 'var(--' not in svg
 with page.expect_download() as dl:page.locator('#download-html').click()
 dl.value.save_as(out/'selected-trash.html');page.keyboard.press('Escape');expect(page.locator('#detail')).not_to_be_visible()
 for filename in ['copied-trash.html','selected-trash.html']:
  standalone=context.new_page();requests=[];standalone.on('request',lambda r:requests.append(r.url));standalone.on('pageerror',lambda e:errors.append(str(e)))
  standalone.goto('about:blank');standalone.set_content((out/filename).read_text());expect(standalone.locator('lucian-trash')).to_have_attribute('state','open')
  standalone.locator('select').select_option('closed');expect(standalone.locator('lucian-trash')).to_have_attribute('state','closed');standalone.keyboard.press('Tab')
  assert not [u for u in requests if u.startswith('http')];standalone.close()
 # All generated standalone files: no network imports, each state operates offline.
 for d in catalog:
  url=base+'downloads/html/'+d['id']+'.html';resp=page.request.get(url);assert resp.status==200
  file=out/(d['id']+'-standalone.html');file.write_text(resp.text());off=context.new_page();off.on('pageerror',lambda e:errors.append(str(e)));off.goto('about:blank');off.set_content(file.read_text())
  for state in d['states']:off.locator('select').select_option(state);expect(off.locator('lucian-'+d['id'])).to_have_attribute('state',state)
  off.close()
 # Reduced motion retains final visual state.
 page.emulate_media(reduced_motion='reduce');page.goto(base+'#heart',wait_until='networkidle');expect(page.locator('#detail')).to_be_visible();page.locator('#state').select_option('on')
 motion=page.locator('#preview-button lucian-heart').evaluate("e=>{const s=getComputedStyle(e.shadowRoot.querySelector('[data-part=heart]'));return {duration:s.animationDuration,fill:s.fill}}")
 assert motion['duration']=='0s' and motion['fill']!='rgb(255, 253, 248)',motion
 page.keyboard.press('Escape')
 # Touch and bilingual themes at 320, 390, 768 and desktop widths.
 for width in [320,390,768,1440]:
  page.set_viewport_size({'width':width,'height':900});page.goto(base,wait_until='networkidle')
  for theme in ['light','dark']:
   page.evaluate('(v)=>document.documentElement.dataset.theme=v',theme)
   for locale in ['en','ko']:
    if page.locator('html').get_attribute('lang')!=locale:page.locator('#language').click()
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,theme,locale)
 page.set_viewport_size({'width':390,'height':844});page.locator('[data-card=download] .detail-link').click();expect(page.locator('#detail')).to_be_visible();page.locator('#state').select_option('error');page.screenshot(path=str(out/'mobile-detail.png'));page.keyboard.press('Escape')
 # Actual sample Promise remains pending, then reject, then resolve.
 page.goto(base+'examples/download.html');page.locator('#export-report').click();page.wait_for_timeout(1100);expect(page.locator('lucian-download')).to_have_attribute('state','progress');expect(page.locator('#export-report')).to_be_disabled();page.locator('#reject').click();expect(page.locator('lucian-download')).to_have_attribute('state','error');page.locator('#export-report').click();page.locator('#resolve').click();expect(page.locator('lucian-download')).to_have_attribute('state','success');page.locator('#export-report').click();page.locator('#cancel').click();expect(page.locator('lucian-download')).to_have_attribute('state','idle')
 # Every manifest asset, catalog, downloads and direct subpage request.
 manifest=page.request.get(base+'manifest.json').json();total=0
 for filename,meta in manifest['files'].items():
  r=page.request.get(base+filename);assert r.status==200,(filename,r.status);assert len(r.body())==meta['bytes'],filename;total+=len(r.body())
 for kind in ['skill','source']:
  file=out/f'{kind}.zip';file.write_bytes(page.request.get(base+f'downloads/lucian-icons-{kind}-1.0.0.zip').body())
  with zipfile.ZipFile(file) as z:assert z.testzip() is None;assert any(n.endswith('SKILL.md') for n in z.namelist())
 page.goto(base+'guide.html');expect(page.locator('h1:visible')).to_have_count(1);page.reload();page.locator('#lang').click();expect(page.locator('h1:visible')).to_have_count(1)
 print(json.dumps({'icons':len(catalog),'states_sizes_reversal_duplicates':'passed','offline_html':12,'asset_urls':len(manifest['files']),'total_asset_bytes':total,'console_errors':errors,'http_errors':bad},ensure_ascii=False))
 assert not errors and not bad
 b.close()
