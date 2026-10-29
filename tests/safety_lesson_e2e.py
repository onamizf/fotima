"""Autonomous safety stories and five GHS connections in the existing chapter."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect,Locator
from browser_auth import register_local
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8051/')
PHONE=bool(os.environ.get('LAB_PHONE'))
if PHONE:Locator.click=lambda self,**kwargs:self.tap(**kwargs)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':390 if PHONE else 1440,'height':844 if PHONE else 1000},is_mobile=PHONE,has_touch=PHONE,reduced_motion='reduce');q=c.new_page();errors=[];bad=[]
 q.on('pageerror',lambda e:(errors.append(str(e)),print('JS ERROR:',e,flush=True)));q.on('response',lambda r:bad.append(r.url) if r.status>=400 else None);q.clock.install();register_local(q,BASE,'Story Learner');q.goto(BASE+'#topic/ch1');q.locator('.book-work-list a[href="#topic/ch1/1.1"]').click();q.wait_for_selector('[data-safety-lesson]');assert q.locator('[data-safety-card]').count()==4;assert q.locator('[data-safety-sign]').count()==5
 assert q.locator('.safety-analysis-block.is-locked').count()==8;assert not q.locator('textarea').count();assert q.evaluate('document.documentElement.scrollWidth<=innerWidth')
 # Task 2 is available before any scenes, and errors leave no credit.
 q.locator('[data-jump-task="2"]').click();q.locator('[data-safety-sign=toxic]').click();q.locator('[data-safety-description=flammable]').click();assert q.evaluate('SafetyLesson.counts().matches===0');q.clock.run_for(650);assert q.locator('.is-wrong').count()==0
 q.locator('[data-safety-description=toxic]').click();assert q.evaluate('SafetyLesson.counts().matches===1');q.reload();q.wait_for_selector('[data-safety-lesson]');assert q.evaluate('SafetyLesson.counts().matches===1');assert q.evaluate('CourseGame.safetyLessonXP()')==4
 # An early close never marks a scene reviewed.
 q.locator('[data-safety-situation=a]').first.click();q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(1000);q.keyboard.press('Escape');assert q.evaluate('SafetyLesson.counts().analysis===0')
 # Play, pause, and finish each story. Next opens the next story in the same modal.
 q.locator('[data-safety-situation=a]').first.click();q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(1200);q.locator('.cinema-tap-layer').click();q.clock.run_for(1800);assert q.locator('.sp-scene').get_attribute('data-stage')=='0';q.locator('.cinema-tap-layer').click()
 for id in ['a','b','c','d']:
  q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(15000);q.wait_for_selector('[data-story-card="0"]');assert q.locator('[data-risk],.sp-hotspot,[data-safe-action],textarea').count()==0;assert q.locator('.sp-scene').get_attribute('data-stage')=='4';q.locator('[data-sp=next-card]').click();q.locator('[data-sp=next-card]').click();assert not q.evaluate('SafetyLessonData.validReview(state.intro.lesson11.reviews["'+id+'"])')
  if id!='d':q.locator('[data-sp=next]').click()
  else:q.locator('[data-sp=close]').click()
  assert q.evaluate('SafetyLessonData.validReview(state.intro.lesson11.reviews["'+id+'"])')
 assert q.evaluate('SafetyLesson.counts().analysis===4');assert q.locator('.safety-analysis-block.is-locked').count()==0;assert q.evaluate('CourseGame.safetyLessonXP()')==44
 # Desktop draws a connector line; phone uses taps and docks the answer below its sign.
 ids=['irritant','explosive','corrosive','flammable']
 if not PHONE:
  q.locator('[data-connector=irritant]').drag_to(q.locator('[data-safety-description=irritant]'));ids.remove('irritant');assert q.locator('[data-unmatch=irritant]').count()==1
 for id in ids:q.locator('[data-safety-sign='+id+']').click();q.locator('[data-safety-description='+id+']').click()
 assert q.evaluate('SafetyLesson.counts().matches===5');assert q.locator('.safety-lesson-result').is_visible();assert q.evaluate("IntroModel.workDone('safety')&&TextbookCourse.done('1.1')");assert q.evaluate('CourseGame.safetyLessonXP()')==60;assert q.evaluate('state.game.badges.includes("safety-signs")')
 if PHONE:
  assert q.locator('.safety-mobile-pair .safety-ghs-description').count()==5;q.locator('[data-safety-sign=irritant]').click()
 else:q.locator('[data-unmatch=irritant]').press('Enter')
 assert q.evaluate('SafetyLesson.counts().matches===4');q.locator('[data-safety-sign=irritant]').click();q.locator('[data-safety-description=irritant]').click();assert q.evaluate('CourseGame.safetyLessonXP()')==60
 q.reload();q.wait_for_selector('.safety-lesson-result:visible');assert q.evaluate('CourseGame.safetyLessonXP()')==60;q.screenshot(path='/tmp/textbook11-'+('phone' if PHONE else 'desktop')+'.png',full_page=True)
 # Replays keep XP; Esc after reading all cards commits once.
 q.locator('[data-safety-situation=c]').first.click();q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(15000);q.locator('[data-sp=next-card]').click();q.locator('[data-sp=next-card]').click();q.keyboard.press('Escape');assert q.evaluate('CourseGame.safetyLessonXP()')==60
 for lang in ['en','uz-Latn','uz-Cyrl','ru']:
  q.evaluate('(lang)=>{state.settings.language=lang;saveState();render(false)}',lang);assert q.locator('.safety-lesson-heading h1').inner_text()==q.evaluate('SafetyLessonData.copy[state.settings.language].heading');assert q.locator('.safety-situation-letter').all_text_contents()==(['A','B','D','E'] if lang.startswith('uz') else ['A','B','C','D'])
 q.locator('.safety-next').click();q.wait_for_selector('[data-cinema=start]:visible');assert q.evaluate('route().stepId')=='1.2';assert not errors,errors;assert not bad,bad
 print('PASS:', 'phone taps/swipe layout' if PHONE else 'desktop connector drag', '4 stories, no questions, pause/Esc/next, 5 pairs/retry/unlink, 60 XP once, reload, 4 locales, next 1.2, no JS/HTTP errors',flush=True);b.close()
