"""Quick-section links: real aliases, image assets, keyboard focus and motion."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);c=b.new_context(viewport={'width':1366,'height':900},reduced_motion='no-preference');c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Quick sections');q.evaluate("TextbookCourse.data().steps['1.1']={started:true,done:false};saveState()")
 links=[('periodic','/periodic-table','resources','periodic'),('dictionary','/dictionary','resources','glossary'),('equipment','/equipment','materials',None),('safety','/safety','safety-wardrobe',None)]
 for id,path,page,resource in links:
  q.goto(BASE+'?v=1.40.2#home');q.wait_for_selector('.home-tools');chip=q.locator('[data-home-section="'+id+'"]');assert chip.get_attribute('href')=='#'+path;image=chip.locator('img');assert image.get_attribute('alt')==chip.locator('span').text_content();assert image.get_attribute('width')=='88';q.wait_for_function('Array.from(document.querySelectorAll(".home-tools img")).every(i=>i.complete&&i.naturalWidth>0)');assert '🦺' not in q.locator('.home-tools').inner_text()
  q.evaluate('window.chipDocumentMarker=42');chip.click();q.wait_for_function('(p)=>SiteRoutes.resolve().page===p',arg=page);assert q.evaluate('window.chipDocumentMarker')==42;assert q.evaluate('SiteRoutes.resolve().resource')==resource;assert len(c.pages)==1
  assert q.evaluate('''(id)=>{const el=document.createElement('div');el.innerHTML=Dashboard.homeTools();return el.querySelector('[aria-current="page"]').dataset.homeSection===id}''',id)
 q.goto(BASE+'?v=1.40.2#home');q.wait_for_selector('.home-tools');q.mouse.move(0,0);q.locator('#dashboardSearch').focus();q.wait_for_timeout(250);assert q.locator('.home-tool-label:visible').count()==0;assert q.locator('[data-home-section]').first.bounding_box()['width']==112;first=q.locator('[data-home-section=periodic]');first.focus();q.keyboard.press('Tab');q.keyboard.press('Shift+Tab');assert first.evaluate('(a)=>getComputedStyle(a).outlineStyle')=='solid';first.hover();q.wait_for_timeout(300);assert first.locator('.home-tool-label').is_visible();assert first.locator('img').evaluate('(i)=>getComputedStyle(i).transform')!='none';q.evaluate('window.scrollTo(0,0)');q.screenshot(path='/workspace/work/home-chips/desktop.png')
 q.emulate_media(reduced_motion='reduce');q.wait_for_timeout(100);assert first.locator('img').evaluate('(i)=>getComputedStyle(i).transform')=='none'
 q.set_viewport_size({'width':390,'height':844});q.evaluate('window.scrollTo(0,0)');q.screenshot(path='/workspace/work/home-chips/mobile.png');assert q.locator('.home-tools').evaluate('(e)=>e.scrollWidth<=e.clientWidth+1')
 q.set_viewport_size({'width':320,'height':700});assert q.locator('.home-tools').evaluate('(e)=>e.scrollWidth<=e.clientWidth+1')
 assert not errors,errors
 print('PASS 4 existing destinations and aliases, no document reload/new tab, large icon-only cards/PNG/alt and hover labels, no vest emoji, active matching, keyboard focus, animated hover/reduced motion and mobile; no console errors')
 b.close()
