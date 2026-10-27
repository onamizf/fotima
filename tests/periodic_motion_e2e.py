"""The animated FLIP path and touchscreen swipe are distinct from reduced-motion tests."""
import os
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8043/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='no-preference');q=ctx.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Motion Learner');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.goto(BASE+'#resources/periodic');q.wait_for_timeout(1100);q.locator('[data-element=Ge]').hover();q.wait_for_timeout(300);q.locator('[data-element=Ge]').click();q.wait_for_selector('.periodic-flying-card',state='attached');q.wait_for_selector('.periodic-flying-card',state='detached');assert q.locator('.periodic-reference-card').evaluate('(c)=>getComputedStyle(c).visibility')=='visible';q.wait_for_timeout(600);assert q.locator('.periodic-info-panel').evaluate('(c)=>getComputedStyle(c).opacity')=='1'
 q.locator('.periodic-detail-dialog').click(position={'x':3,'y':3});q.wait_for_selector('.periodic-detail-dialog',state='detached');assert q.url.endswith('#resources/periodic')
 q.locator('[data-periodic-random]').click();q.wait_for_selector('.periodic-detail-dialog[open]');q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached');assert q.locator('.periodic-flying-card').count()==0
 for layout in ['short','long']:
  q.locator('#periodicLayout').select_option(layout);q.wait_for_timeout(1100)
  for symbol in ['H','He','Ge','La','Lu','Ac','Og']:
   q.locator('[data-element='+symbol+']').hover();q.wait_for_timeout(280);q.locator('[data-element='+symbol+']').click();q.wait_for_url('**/'+symbol);q.wait_for_selector('.periodic-flying-card',state='detached');q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached')
 touch=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,reduced_motion='reduce',storage_state=ctx.storage_state());r=touch.new_page();r.on('pageerror',lambda e:errors.append(str(e)));r.goto(BASE+'#resources/periodic/Ge');r.wait_for_selector('.periodic-detail-dialog[open]');r.locator('.periodic-reference-stage').evaluate('(el)=>{el.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true,clientX:300,clientY:250,pointerType:"touch"}));el.dispatchEvent(new PointerEvent("pointerup",{bubbles:true,clientX:100,clientY:251,pointerType:"touch"}));}');r.wait_for_url('**/As');r.keyboard.press('Escape');r.wait_for_selector('.periodic-detail-dialog',state='detached');assert not errors,errors;b.close()
print('Passed: animated FLIP open/reverse close, roulette and touchscreen swipe')
