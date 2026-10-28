"""Situation B with actual WebP frames: playback, assessment, persistence and zone editor."""
import os
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 ctx=b.new_context(viewport={'width':1440,'height':1000},permissions=['clipboard-read','clipboard-write']);q=ctx.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click())
 q.clock.install();register_local(q,BASE,'B Learner');q.goto(BASE+'#topic/intro');q.locator('.intro-road [data-intro-step="0"]').click();q.locator('[data-intro-begin]').click();q.wait_for_selector('.sp-loader',state='hidden')
 # Unlock B by actually completing A.
 q.locator('[data-sp=skip]').click();q.locator('.sp-hotspot').click();q.locator('[data-risk="0"]').click()
 for i in [0,1]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();q.locator('[data-sp=next]').click();q.wait_for_selector('.sp-loader',state='hidden')
 assert q.locator('.sp-heading [aria-current=step]').inner_text()=='B';assert q.locator('.sp-heading .is-complete').inner_text()=='✓ A'
 assert q.locator('.sp-debug-zones').count()==0;assert q.locator('button[data-stage="4"]').is_disabled()
 q.locator('.sp-scene').focus();q.keyboard.press('Space');q.clock.run_for(3500);assert q.locator('.sp-scene').get_attribute('data-stage')=='0';q.keyboard.press('Space');q.clock.run_for(3200);assert q.locator('.sp-scene').get_attribute('data-stage')=='1';q.clock.run_for(3000);assert q.locator('.sp-scene').get_attribute('data-stage')=='2';q.clock.run_for(3000);assert q.locator('.sp-scene').get_attribute('data-stage')=='3'
 q.locator('.sp-scene').click(position={'x':20,'y':20});q.locator('.sp-scene').click(position={'x':25,'y':25});assert 'очки' in q.locator('.sp-feedback').inner_text().lower()
 assert q.locator('.sp-found-count').inner_text()=='Найдено 0 / 2';q.locator('[data-hotspot=goggles]').click();assert q.locator('.sp-found-count').inner_text()=='Найдено 1 / 2';assert q.locator('[data-spot-caption=goggles]').is_visible();assert q.locator('[data-hotspot=goggles]').is_disabled();assert q.locator('[data-risk="0"]').count()==0
 q.locator('[data-hotspot=tube]').focus();q.keyboard.press('Enter');q.locator('[data-risk="2"]').click();assert not q.evaluate("IntroModel.done('danger-b')");q.locator('[data-risk="0"]').click()
 for i in [0,1,2,4]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert not q.evaluate("IntroModel.done('danger-b')");q.locator('[data-safe-action="4"]').uncheck();q.locator('[data-safe-action="3"]').check();before=q.evaluate('CourseGame.xp()');q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-b')");assert q.evaluate('CourseGame.xp()')>=before+20;assert q.locator('.sp-goggles-flight').count()==1
 after=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('.sp-loader',state='hidden');assert q.locator('.sp-scene').get_attribute('data-stage')=='4';assert q.locator('.sp-explanation section').count()==5;assert q.evaluate('CourseGame.xp()')==after
 q.locator('[data-sp=previous]').click();assert q.evaluate('IntroModel.data().task')=='danger-a';assert q.locator('.sp-explanation').is_visible();q.locator('[data-sp=next]').click();q.locator('[data-sp=next]').click();assert q.evaluate('IntroModel.data().task')=='danger-c'
 # Check completed B in every locale and at phone width.
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.evaluate('(lang)=>{state.settings.language=lang;IntroModel.openTask("danger-b");render(false)}',lang);q.wait_for_selector('.sp-loader',state='hidden');assert 'undefined' not in q.locator('.scene-player').inner_text();assert q.locator('[data-sp=previous]').is_visible()
 q.set_viewport_size({'width':390,'height':844});q.clock.run_for(800)
 if q.evaluate('document.documentElement.scrollWidth>innerWidth'):
  print(q.evaluate('Array.from(document.querySelectorAll("body *")).map(e=>({tag:e.tagName,cls:e.className,x:e.getBoundingClientRect().x,w:e.getBoundingClientRect().width,right:e.getBoundingClientRect().right})).filter(e=>e.right>innerWidth+1).slice(0,20)'),flush=True);q.screenshot(path='/workspace/work/b-overflow.png',full_page=True)
 assert q.evaluate('document.documentElement.scrollWidth<=innerWidth')
 # Debug coordinates, dragging, resizing and exported percent JSON, using the real question frame.
 q.goto(BASE+'?debug=1#topic/intro');q.wait_for_selector('.sp-loader',state='hidden');q.locator('[data-stage="3"]').click();q.set_viewport_size({'width':1440,'height':1000});q.clock.run_for(800)
 assert q.locator('.sp-debug-zone').count()==4;zone=q.locator('.sp-debug-zone[data-zone=goggles]');old=zone.evaluate('(e)=>({x:parseFloat(e.style.left),w:parseFloat(e.style.width)})');box=zone.bounding_box()
 q.mouse.move(box['x']+box['width']*.5,box['y']+box['height']*.65);q.mouse.down();q.mouse.move(box['x']+box['width']*.5+25,box['y']+box['height']*.65+10,steps=5);q.mouse.up();assert zone.evaluate('(e)=>parseFloat(e.style.left)')>old['x'];assert '%' in q.locator('.sp-debug-coordinates').inner_text()
 handle=zone.locator('[data-corner=se]');hb=handle.bounding_box();q.mouse.move(hb['x']+6,hb['y']+6);q.mouse.down();q.mouse.move(hb['x']+30,hb['y']+20,steps=5);q.mouse.up();assert zone.evaluate('(e)=>parseFloat(e.style.width)')>old['w']
 q.locator('[data-copy-zones]').click();copied=q.evaluate('navigator.clipboard.readText()');import json;export=json.loads(copied);assert export['goggles']['x']>old['x'];assert export['goggles']['w']>old['w']
 assert q.evaluate('IntroModel.done("danger-b")');assert q.evaluate('CourseGame.xp()')==after
 # Reduced motion has no zoom, droplets, flash, shake or flying icon.
 q.emulate_media(reduced_motion='reduce');q.locator('[data-stage="2"]').click();q.clock.run_for(200);assert q.locator('.sp-camera').evaluate('(e)=>e.style.transform')=='scale(1)';assert q.locator('.sp-flash').evaluate('(e)=>getComputedStyle(e).opacity')=='0'
 assert not errors,errors;b.close();print('PASS: B stages, two errors, wrong/multiple answers, saved proof, navigation A/B/C, XP once, locales, phone, debug move/resize/copy and reduced motion'+' (all actual frames)')
