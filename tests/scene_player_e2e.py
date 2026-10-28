"""Exercise the actual safety frames, questions, persistence and unavailable-image recovery."""
import os
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 q=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 q.clock.install()
 register_local(q,BASE,'Scene Tester');q.goto(BASE+'#topic/intro');q.locator('.intro-road [data-intro-step="0"]').click();q.locator('[data-intro-begin]').click()
 q.wait_for_selector('.sp-loader',state='hidden');assert q.locator('.sp-scene').get_attribute('data-stage')=='0'
 q.locator('[data-sp=play]').click();q.clock.run_for(3500);assert q.locator('.sp-scene').get_attribute('data-stage')=='0';q.locator('[data-sp=play]').click();q.clock.run_for(10000);assert q.locator('.sp-scene').get_attribute('data-stage')=='3'
 assert q.locator('button[data-stage="4"]').is_disabled()
 q.locator('[data-sp=skip]').click();assert q.locator('.sp-scene').get_attribute('data-stage')=='3';assert not q.evaluate("IntroModel.done('danger-a')")
 assert q.locator('button[data-stage="3"]').get_attribute('aria-current')=='step'
 assert q.locator('.sp-hotspot').evaluate('(e)=>getComputedStyle(e).backgroundColor')=='rgba(0, 0, 0, 0)'
 for _ in range(2):q.locator('.sp-scene').click(position={'x':30,'y':40})
 assert q.locator('.sp-hint').evaluate('(e)=>e.classList.contains("is-assisted")')
 q.locator('.sp-hotspot').focus();q.keyboard.press('Enter');q.locator('[data-risk="1"]').click();assert q.locator('[data-risk="0"]').is_visible();q.locator('[data-risk="0"]').click()
 q.locator('[data-safe-action="0"]').check();q.locator('[data-sp=check]').click();assert not q.evaluate("IntroModel.done('danger-a')")
 before=q.evaluate('CourseGame.xp()');q.locator('[data-safe-action="1"]').check();q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-a')");assert q.evaluate('CourseGame.xp()')>=before+20
 assert q.locator('.sp-scene').get_attribute('data-stage')=='4';assert q.locator('.sp-explanation section').count()==5
 after=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('.sp-explanation');assert q.locator('.sp-scene').get_attribute('data-stage')=='4';assert q.evaluate('CourseGame.xp()')==after
 q.locator('[data-sp=restart]').last.click();q.locator('[data-sp=skip]').click();q.locator('.sp-hotspot').click();q.locator('[data-risk="0"]').click()
 for i in [0,1]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert q.evaluate('CourseGame.xp()')==after
 q.locator('[data-sp=next]').click();assert q.evaluate('IntroModel.data().task')=='danger-b'
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.evaluate('(lang)=>{state.settings.language=lang;IntroModel.openTask("danger-a");render(false)}',lang);q.wait_for_selector('.sp-explanation');assert q.locator('.sp-panel').inner_text();assert 'undefined' not in q.locator('.scene-player').inner_text()
 q.set_viewport_size({'width':375,'height':900});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth');assert q.locator('.sp-panel').bounding_box()['y']>q.locator('.sp-scene').bounding_box()['y']
 assert not errors,errors
 # Check real missing-frame error independently, by simulating a failed image request.
 q.route('**/assets/lab/1-1/*.webp',lambda r:r.abort());q.reload();q.wait_for_selector('[data-sp=retry]');assert q.locator('.sp-explanation').is_visible()
 b.close();print('PASS: questions, wrong answers, hints, keyboard hotspot, save/restore, idempotent XP, next B, four locales, mobile, missing-image recovery UI (actual WebP frames)')
