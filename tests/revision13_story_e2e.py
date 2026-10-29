"""Autonomous safety stories without the removed matching task in the existing chapter."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect,Locator
from browser_auth import register_local
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8051/')
PHONE=bool(os.environ.get('LAB_PHONE'))
if PHONE:Locator.click=lambda self,**kwargs:self.tap(**kwargs)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':390 if PHONE else 1440,'height':844 if PHONE else 1000},is_mobile=PHONE,has_touch=PHONE,reduced_motion='reduce');q=c.new_page();errors=[];bad=[]
 q.on('pageerror',lambda e:(errors.append(str(e)),print('JS ERROR:',e,flush=True)));q.on('response',lambda r:bad.append(r.url) if r.status>=400 else None);q.clock.install();register_local(q,BASE,'Story Learner');q.goto(BASE+'#topic/ch1');q.locator('.book-work-list a[href="#topic/ch1/1.1"]').click();q.wait_for_selector('[data-safety-lesson]');assert q.locator('[data-safety-card]').count()==4;assert q.locator('[data-safety-sign]').count()==0
 assert q.locator('.safety-analysis-block').count()==0;assert not q.locator('textarea').count();assert q.evaluate('document.documentElement.scrollWidth<=innerWidth')
 # An early close never marks a scene reviewed.
 q.locator('[data-safety-situation=a]').first.click();q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(1000);q.keyboard.press('Escape');assert q.evaluate('SafetyLesson.counts().analysis===0')
 # Play, pause, and finish each story. Next opens the next story in the same modal.
 q.locator('[data-safety-situation=a]').first.click();q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(1200);q.locator('.cinema-tap-layer').click();q.clock.run_for(1800);assert q.locator('.sp-scene').get_attribute('data-stage')=='0';q.locator('.cinema-tap-layer').click()
 for id in ['a','b','c','d']:
  q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(15000);q.wait_for_selector('[data-story-card="0"]');assert q.locator('[data-risk],.sp-hotspot,[data-safe-action],textarea').count()==0;assert q.locator('.sp-scene').get_attribute('data-stage')=='4';q.locator('[data-sp=next-card]').click();q.locator('[data-sp=next-card]').click();assert not q.evaluate('SafetyLessonData.validReview(state.intro.lesson11.reviews["'+id+'"])')
  if id!='d':q.locator('[data-sp=next]').click()
  else:q.locator('[data-sp=close]').click()
  assert q.evaluate('SafetyLessonData.validReview(state.intro.lesson11.reviews["'+id+'"])')
 assert q.evaluate('SafetyLesson.counts().analysis===4');assert q.locator('.safety-analysis-block.is-locked').count()==0;assert q.evaluate('CourseGame.safetyLessonXP()')==40
 assert q.locator('.safety-lesson-result').is_visible();assert q.evaluate("IntroModel.workDone('safety')&&TextbookCourse.done('1.1')&&IntroModel.unlockedTask('museum')");assert q.locator('#safety-task-2').count()==0;assert q.locator('.safety-next').get_attribute('href')=='#topic/ch1/1.2';assert not errors,errors;print('PASS four real stories, early-close rejection, completion after fourth story, immediate 1.2 unlock, 40 XP once, no matching task',flush=True);b.close()
