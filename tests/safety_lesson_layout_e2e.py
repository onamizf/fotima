"""Textbook grids, phone snap navigation, fullscreen framing and reduced motion."""
import os
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8051/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.clock.install();register_local(q,BASE,'Layout Learner');q.goto(BASE+'#topic/ch1/1.1');q.wait_for_selector('[data-safety-lesson]')
 for width in [1440,900,390,320]:
  q.set_viewport_size({'width':width,'height':900});q.clock.run_for(60);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth');style=q.locator('.safety-situations').evaluate('(e)=>({cols:getComputedStyle(e).gridTemplateColumns.split(" ").length,snap:getComputedStyle(e).scrollSnapType})');assert style['cols']==(4 if width==1440 else 2 if width==900 else 4)
  preview=q.locator('.safety-situation-preview').first;assert preview.evaluate('e=>getComputedStyle(e).borderRadius')=='0px';assert abs(preview.evaluate('e=>e.clientWidth/e.clientHeight')-1.6)<.025
  if width<768:
   assert style['snap']=='x mandatory';q.locator('[data-safety-slide=d]').click();q.clock.run_for(100);assert q.locator('[data-safety-slide=d]').get_attribute('aria-current')=='true';assert q.locator('.safety-matching').evaluate('e=>getComputedStyle(e).flexDirection')=='column'
  q.screenshot(path='/tmp/textbook11-initial-'+str(width)+'.png',full_page=True)
 q.set_viewport_size({'width':1440,'height':900});q.locator('[data-safety-situation=b]').first.click();q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(6500);assert q.locator('.cinema-danger-badge').is_visible();assert q.locator('.cinema-frog').is_visible();assert q.locator('.cinema-frog').evaluate('e=>getComputedStyle(e).position')=='absolute';assert q.locator('.cinema-shell').evaluate('e=>e.getAnimations({subtree:true}).filter(a=>a.playState==="running").length')==0;q.screenshot(path='/tmp/textbook11-danger.png');q.clock.run_for(8500);assert q.locator('.sp-safe-badge').is_visible();assert q.locator('[data-story-card="0"]').is_visible();q.screenshot(path='/tmp/textbook11-safe.png');q.keyboard.press('Escape')
 assert not errors,errors;print('PASS: 1440/900 grids, 390/320 snap dots, no overflow, rectangular 16:10 previews, frog/danger/safe frame, reduced motion');b.close()
