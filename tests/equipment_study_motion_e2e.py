"""Six demonstrations, reduced motion, keyboard and touch navigation."""
from playwright.sync_api import sync_playwright
from pathlib import Path
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 print('WebKit available:',Path(p.webkit.executable_path).exists(),flush=True)
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},has_touch=True)
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 register_local(q,BASE,'Study Motion')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('.es-study')
 for n in range(6):
  q.locator('[data-es-item="'+str(n)+'"]').click();q.locator('[data-es=demo]').click();q.wait_for_selector('.is-demonstrating')
  assert q.locator('.es-effects').evaluate('(e)=>getComputedStyle(e).opacity')=='1'
  q.wait_for_timeout(4400)
  assert q.locator('.is-demonstrating').count()==0
 q.reload();q.wait_for_selector('.es-study');q.locator('.es-info').focus();q.keyboard.press('ArrowRight');assert q.locator('.es-scene').get_attribute('data-equipment')=='beaker'
 q.set_viewport_size({'width':360,'height':800});q.locator('.workspace-header-menu summary').tap();assert q.locator('.workspace-header-menu .header-language').is_visible();q.locator('.workspace-header-menu summary').tap()
 q.locator('.es-scene').evaluate("e=>{const touch=x=>new Touch({identifier:1,target:e,clientX:x,clientY:300});e.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[touch(250)]}));e.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[touch(100)]}));}");assert q.locator('.es-scene').get_attribute('data-equipment')=='conical-flask'
 q.emulate_media(reduced_motion='reduce');assert q.locator('.es-object').evaluate('(e)=>getComputedStyle(e).animationName')=='none'
 assert not errors,errors
 print('PASS all six demonstrations, keyboard, touch swipe/menu, reduced motion; no page errors')
 b.close()
