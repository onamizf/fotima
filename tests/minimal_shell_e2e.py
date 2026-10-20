import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8027/');errors=[];checks=0;bad=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 ctx=b.new_context();ctx.route('**/src/cloud-config.js',lambda r:r.fulfill(content_type='application/javascript',body='window.FOTIMA_CLOUD_CONFIG={enabled:false};'))
 q=ctx.new_page();q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);q.goto(BASE)
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.select_option('#language',lang)
  for width in [320,375,768,1366]:
   q.set_viewport_size({'width':width,'height':1000})
   for route in ['home','catalog','progress','settings','account']:
    q.evaluate('(s)=>location.hash=s',route);q.wait_for_timeout(40)
    assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,width,route)
    assert 'undefined' not in q.locator('#main').inner_text();checks+=1
 q.select_option('#language','ru')
 for route in ['home','catalog']:
  q.evaluate('(s)=>location.hash=s',route);q.wait_for_timeout(80)
  for width in [375,768,1366]:
   q.set_viewport_size({'width':width,'height':1000});q.evaluate('document.fonts.ready');q.evaluate('scrollTo(0,0)');q.screenshot(path=str(ROOT/f'artifacts/frog-{route}-{width}.png'),full_page=True)
  assert q.locator('.demo-banner').count()==0;assert q.locator('.footer').count()==0
  if route=='account':assert q.locator('.account-story').count()==0;assert q.locator('.account-privacy').get_attribute('open') is None
 # Actual anonymous configuration: Auth is enabled, no mocked backend response needed for the entry form.
 entry_context=b.new_context();entry=entry_context.new_page();entry.on('pageerror',lambda e:errors.append(str(e)));entry.goto(BASE+'#account')
 assert entry.evaluate('FotimaCloud.configured()');assert entry.locator('.account-story').count()==0
 assert entry.locator('#accountForm .primary').is_enabled();assert entry.locator('.account-privacy').get_attribute('open') is None
 for width in [375,768,1366]:
  entry.set_viewport_size({'width':width,'height':1000});entry.evaluate('document.fonts.ready');entry.screenshot(path=str(ROOT/f'artifacts/frog-account-{width}.png'),full_page=True)
 assert not errors,errors;assert not bad,bad
 report={'status':'passed','languages':4,'layout_checks':checks,'checks':['compact login without marketing column','privacy information available by disclosure','three sequential level tiles retained','original frog and local art load','no repeated banner or footer','320/375/768/1366px'],'page_errors':errors,'failed_resources':bad}
 (ROOT/'artifacts/frog-minimal-validation.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2));b.close()
