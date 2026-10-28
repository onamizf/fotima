"""Actual D frames and complete Task 1: measured attempts, targeted replay and hazard-sign handoff."""
import os
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1440,'height':1000});q=ctx.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.clock.install()
 register_local(q,BASE,'D Learner');q.goto(BASE+'#topic/intro');q.locator('.intro-road [data-intro-step="0"]').click();q.locator('[data-intro-begin]').click();q.wait_for_selector('.sp-loader',state='hidden')
 for spots,answers in [(['hotspot'],[0,1]),(['goggles','tube'],[0,1,2,3]),(['vapour'],[0,1])]:
  q.locator('[data-sp=skip]').click()
  for spot in spots:q.locator('[data-hotspot="'+spot+'"]').click()
  q.locator('[data-risk="0"]').click()
  if q.locator('[data-order-item]').count():
   for target in range(4):
    while q.locator('[data-order-item]').evaluate_all('(items)=>items.map(e=>Number(e.dataset.orderItem))').index(target)>target:q.locator('[data-order-id="'+str(target)+'"][data-order-move="-1"]').click()
  for answer in answers:q.locator('[data-safe-action="'+str(answer)+'"]').check()
  q.locator('[data-sp=check]').click();q.locator('[data-sp=next]').click();q.wait_for_selector('.sp-loader',state='hidden')
 assert q.evaluate('IntroModel.data().task')=='danger-d';assert q.locator('.sp-heading nav span').all_text_contents()==['✓ A','✓ B','✓ C','D','Итоги'];assert q.locator('.sp-camera>img').evaluate_all('(items)=>items.every(i=>i.naturalWidth===1376)')
 q.clock.run_for(3200);assert q.locator('.sp-scene').get_attribute('data-stage')=='1';assert q.locator('.sp-heat').is_visible();freq=q.locator('feTurbulence').get_attribute('baseFrequency');q.clock.run_for(300);assert q.locator('feTurbulence').get_attribute('baseFrequency')!=freq;assert q.locator('feDisplacementMap').get_attribute('scale')=='3'
 q.clock.run_for(2800);assert q.locator('.sp-scene').get_attribute('data-stage')=='2';assert q.locator('.sp-camera').evaluate('(e)=>e.getAnimations().some(a=>a.effect.getKeyframes().some(k=>k.filter==="blur(3px)")&&a.effect.getTiming().duration===1000)')
 for selector in ['.sp-camera','.sp-flash','.sp-steam-burst']:q.locator(selector).evaluate('(e)=>e.getAnimations().forEach(a=>a.finish())')
 q.clock.run_for(3200);assert q.locator('.sp-scene').get_attribute('data-stage')=='3'
 # Four genuine misses lower the aggregate accuracy below 80%.
 for _ in range(4):q.locator('.sp-scene').click(position={'x':15,'y':20})
 q.locator('[data-hotspot=face-near-beaker]').focus();q.keyboard.press('Enter');q.locator('[data-risk="0"]').click();assert 'Лицо, шея и руки' in q.locator('.sp-risk-explanation').inner_text()
 for i in [0,1,2,3]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 before=q.evaluate('CourseGame.xp()');q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-d')");assert q.evaluate('CourseGame.xp()')>=before+20;assert q.locator('.sp-scene').get_attribute('data-stage')=='4';after=q.evaluate('CourseGame.xp()')
 q.reload();q.wait_for_selector('.sp-loader',state='hidden');assert q.locator('.sp-scene').get_attribute('data-stage')=='4';assert q.evaluate('CourseGame.xp()')==after;q.locator('[data-sp=next]').click();q.wait_for_selector('.safety-summary');q.clock.run_for(1000)
 assert q.locator('.safety-summary-card').count()==4;assert q.locator('[data-safety-found]').inner_text()=='Найдено ошибок: 5 из 5';assert q.locator('[data-safety-accuracy]').inner_text()=='Правильных ответов: 76%';assert q.locator('[data-safety-xp]').inner_text()=='80';assert q.locator('.safety-summary-badge').count()==0;assert q.locator('[data-safety-retry]').is_visible();assert q.locator('[data-intro-step="0"]').get_attribute('data-task-one-complete')=='true';assert q.locator('[data-intro-step="1"]').is_disabled()
 assert q.evaluate('IntroModel.data().active')=='safety-summary';q.reload();q.wait_for_selector('.safety-summary');assert '76%' in q.locator('[data-safety-accuracy]').inner_text();assert q.evaluate('CourseGame.xp()')==after
 q.locator('[data-safety-retry]').click();q.wait_for_selector('.sp-loader',state='hidden');assert q.evaluate('IntroModel.data().task')=='danger-d';assert q.evaluate('IntroModel.data().safetyRetry')==['danger-d'];assert q.locator('.sp-scene').get_attribute('data-stage')=='0'
 q.locator('[data-sp=skip]').click();q.locator('[data-hotspot=face-near-beaker]').click();q.locator('[data-risk="0"]').click()
 for i in [0,1,2,3]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();q.locator('[data-sp=next]').click();q.wait_for_selector('.safety-summary');assert q.locator('.safety-summary-badge').is_visible();assert '100%' in q.locator('[data-safety-accuracy]').inner_text();assert q.evaluate('CourseGame.xp()')==after;assert q.evaluate('IntroModel.data().safetyRetry')==[]
 # Summary cards replay exactly the selected situation and preserve checked progress.
 q.locator('[data-safety-replay=danger-b]').click();q.wait_for_selector('.sp-loader',state='hidden');assert q.evaluate('IntroModel.data().task')=='danger-b';assert q.locator('.sp-scene').get_attribute('data-stage')=='0';assert q.evaluate('IntroModel.done("danger-b")')
 q.locator('[data-sp=skip]').click()
 for spot in ['goggles','tube']:q.locator('[data-hotspot="'+spot+'"]').click()
 q.locator('[data-risk="0"]').click()
 for i in [0,1,2,3]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert 'Итоги' in q.locator('[data-sp=next]').inner_text();q.locator('[data-sp=next]').click();q.wait_for_selector('.safety-summary');assert q.evaluate('CourseGame.xp()')==after
 q.evaluate('IntroModel.openSafetySummary();saveState();render(false)');q.wait_for_selector('.safety-summary')
 for lang,letters in [('ru',['A','B','C','D']),('en',['A','B','C','D']),('uz-Latn',['A','B','D','E']),('uz-Cyrl',['A','B','D','E'])]:
  q.evaluate('(lang)=>{state.settings.language=lang;render(false)}',lang);assert q.locator('.safety-summary-letter').all_text_contents()==letters;assert 'undefined' not in q.locator('.safety-summary').inner_text();assert q.locator('.safety-summary-card img').evaluate_all('(items)=>items.every(i=>i.getAttribute("src").endsWith("4-safe.webp"))')
 q.set_viewport_size({'width':390,'height':844});q.clock.run_for(700);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth');assert q.locator('.safety-summary-cards').evaluate('(e)=>getComputedStyle(e).gridTemplateColumns.split(" ").length')==2
 q.emulate_media(reduced_motion='reduce');q.evaluate('render(false)');assert q.locator('[data-safety-xp]').inner_text()=='80';assert q.locator('.safety-summary-badge').evaluate('(e)=>e.getAnimations().length')==0
 q.locator('[data-safety-next]').click();assert q.evaluate('IntroModel.data().task')=='signs';assert q.locator('#introTaskPanel').is_visible();assert q.locator('[data-intro-step="1"]').is_disabled()
 # Restore D for reduced-motion/debug checks: zero heat animation and clear goggles.
 q.evaluate('IntroModel.openTask("danger-d");saveState()');q.goto(BASE+'?debug=1#topic/intro');q.wait_for_selector('.sp-loader',state='hidden');assert q.locator('.sp-debug-zone').count()==4;q.locator('[data-stage="1"]').click();q.clock.run_for(200);assert q.locator('.sp-heat').is_hidden();assert q.locator('.sp-camera').evaluate('(e)=>e.style.transform')=='scale(1)';q.locator('[data-stage="2"]').click();assert q.locator('.sp-camera').evaluate('(e)=>getComputedStyle(e).filter') in ['none','blur(0px)'];assert q.locator('.sp-steam-burst').evaluate('(e)=>getComputedStyle(e).opacity')=='0'
 assert not errors,errors;b.close();print('PASS: D images/effects, saved attempts, 5 hazards, 76%→100% targeted replay, 80 XP once, summary persistence/cards/locales/mobile, signs gate and reduced motion/debug')
