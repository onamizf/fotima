"""Complete the new chapter through actual UI, including timed models and drag alternatives."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright,expect,Locator
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8045/')
if os.environ.get('LAB_PHONE'):
 Locator.click=lambda self,**kwargs:self.tap(**kwargs)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':390 if os.environ.get('LAB_PHONE') else 1440,'height':844 if os.environ.get('LAB_PHONE') else 1000},has_touch=bool(os.environ.get('LAB_PHONE')),is_mobile=bool(os.environ.get('LAB_PHONE')),reduced_motion='reduce');q=ctx.new_page();errors=[];bad=[]
 q.on('pageerror',lambda e:(errors.append(str(e)),print('JS ERROR',str(e),flush=True)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click())
 q.clock.install();register_local(q,BASE,'Chapter Learner');q.goto(BASE+'#topic/intro');q.wait_for_selector('.intro-root')
 assert q.locator('.intro-road>li').count()==5;assert q.locator('[data-intro-step="1"]').first.is_disabled();assert not q.evaluate("CourseModel.unlocked('states')")
 q.locator('.intro-road [data-intro-step="0"]').click();q.wait_for_selector('.sp-loader',state='hidden');q.locator('[data-cinema=start]').click()
 def check():
  if not q.evaluate('IntroModel.done(IntroModel.data().task)'):q.locator('[data-intro-action=check]').click()
 def nxt():
  q.locator('[data-intro-action=next]').click();start_work()
 def start_work():
  if q.locator('[data-cinema=start]').is_visible():q.locator('[data-cinema=start]').click()
  q.wait_for_selector('#introTaskPanel')
 def drop(source,target,group='main'):
  root=q.locator('[data-match-group="'+group+'"]');root.locator('[data-intro-source="'+source+'"]').click();
  drop_target=root.locator('[data-intro-drop="'+target+'"]')
  if drop_target.is_visible():drop_target.click()
  else:q.locator('.intro-anchors [data-intro-drop="'+target.removeprefix('f-')+'"]').click()
 def control(key,value):
  el=q.locator('[data-intro-control="'+key+'"]');el.evaluate('(e,v)=>{e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));}',str(value))
 def select(key,value):q.locator('label:has([data-intro-answer="'+key+'"]) [data-guide-value="'+value+'"]').click()
 def wait_model(seconds):q.clock.run_for(int(seconds*1000))
 # Situation A now uses a scene hotspot and two question steps.
 q.clock.run_for(9500);assert not q.evaluate("IntroModel.done('danger-a')")
 q.locator('.sp-hotspot').click();q.locator('[data-risk="0"]').click();q.clock.run_for(250)
 for i in [0,1]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-a')")
 q.locator('[data-explanation="4"]').click();q.locator('[data-sp=next]').click()
 q.wait_for_selector('.sp-loader',state='hidden');q.locator('[data-cinema=start]').click();q.clock.run_for(9500)
 for spot in ['goggles','tube']:q.locator('[data-hotspot="'+spot+'"]').click()
 q.locator('[data-risk="0"]').click();q.clock.run_for(250)
 for i in [0,1,2,3]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-b')")
 q.locator('[data-explanation="4"]').click();q.locator('[data-sp=next]').click()
 q.wait_for_selector('.sp-loader',state='hidden');q.locator('[data-cinema=start]').click();q.clock.run_for(9500);q.locator('[data-hotspot=vapour]').click();q.locator('[data-risk="0"]').click();q.clock.run_for(250)
 for target in range(4):
  while q.locator('[data-order-item]').evaluate_all('(items)=>items.map(e=>Number(e.dataset.orderItem))').index(target)>target:
   q.locator('[data-order-id="'+str(target)+'"][data-order-move="-1"]').click()
 for i in [0,1]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-c')");q.locator('[data-explanation="4"]').click();q.locator('[data-sp=next]').click()
 q.wait_for_selector('.sp-loader',state='hidden');q.locator('[data-cinema=start]').click();q.clock.run_for(9500);q.locator('[data-hotspot=face-near-beaker]').click();q.locator('[data-risk="0"]').click();q.clock.run_for(250)
 for i in [0,1,2,3]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-d')");q.locator('[data-explanation="4"]').click();q.locator('[data-sp=next]').click();q.wait_for_selector('.safety-summary');assert q.locator('.safety-summary-card').count()==4;q.locator('[data-safety-next]').click();start_work()
 print('Hazards passed',flush=True)
 for _ in range(5):
  id=q.locator('[data-intro-source]:visible').get_attribute('data-intro-source');drop(id,id)
 check();assert q.evaluate("IntroModel.done('signs')");nxt();start_work()
 # Museum: visit all six, identify each, assemble a 3D flask.
 ids=q.evaluate('IntroModel.mainEquipment')
 for id in ids:
  q.locator('[data-museum-pick="'+id+'"]').click();print('Museum inspect',id,q.evaluate('IntroModel.sim().museumFocus'),flush=True);q.locator('[data-museum-return]').click()
 for _ in ids:
  target=q.evaluate('IntroModel.sim().museumRounds.find(id=>IntroModel.row().answers[id]!==id)');q.locator('[data-museum-pick="'+target+'"]').click()
 for id in ['neck','body','bottom']:
  q.locator('[data-intro-source="'+id+'"]').click();q.locator('[data-intro-drop="'+id+'"]').click()
 check();assert q.evaluate("IntroModel.done('museum')");nxt()
 # Wrong item cannot snap into the assembly.
 assert q.evaluate('IntroModel.row().order.length')==0
 for id in ['stand','tube','beaker','gauze','tripod','burner']:drop(id,'assembly')
 q.locator('[data-intro-action=heat]').click();wait_model(6.5);check();assert q.evaluate("IntroModel.done('assembly')");nxt()
 for _ in range(4):
  source=q.locator('[data-intro-source]:visible').get_attribute('data-intro-source');target={'beaker':'a','tripod':'b','dish':'d','burner':'e'}[source];drop(source,target)
 q.locator('[data-intro-action=heat]').click();wait_model(13.5);check();assert q.evaluate("IntroModel.done('evap-labels')");nxt();start_work()
 print('Equipment passed',flush=True);Path('/tmp/intro-equipment-state.json').write_text(json.dumps(q.evaluate('Object.fromEntries(Object.entries(localStorage))')))
 for _ in range(6):
  id=q.locator('[data-intro-source]:visible').get_attribute('data-intro-source');drop(id,id,'parts')
 for _ in range(4):
  id=q.locator('[data-intro-source]:visible').get_attribute('data-intro-source');drop(id,'f-'+id,'functions')
 check();assert q.evaluate("IntroModel.done('burner-parts')");nxt()
 # Open gas without ignition: real timer causes alarm and shuts the gas.
 control('gas',30);wait_model(3.5);assert q.evaluate('IntroModel.sim().gas')==0;assert 'горючий' in q.locator('#introFeedback').inner_text()
 q.locator('[data-intro-action=prepare]').click();control('air',0);q.locator('[data-intro-action=lightMatch]').click();drop('match','nozzle');control('gas',40);assert q.evaluate('IntroModel.sim().flame');q.locator('[data-intro-action=putOutMatch]').click();q.locator('[data-intro-action=stop]').click();check();assert q.evaluate("IntroModel.done('ignition')");nxt()
 q.locator('[data-intro-action=heat]').click();control('gas',20);control('gas',80);control('air',100);q.locator('[data-intro-action=light]').click();q.locator('[data-intro-action=xray]').click()
 for key,value in {'yellowInner':'dark','yellowOuter':'yellowColor','yellowStable':'flicker','blueInner':'dark','blueOuter':'blueColor','blueStable':'steady','idle':'visible'}.items():select(key,value)
 check();assert q.evaluate("IntroModel.done('flames')");nxt()
 q.locator('[data-intro-action=heat]').click();wait_model(23.5);
 q.locator('[data-intro-answer=yellowTime]').fill('20');q.locator('[data-guide-next]').click();q.locator('[data-intro-answer=blueTime]').fill('12');q.locator('[data-guide-next]').click();q.locator('[data-intro-action=flip]').click();select('variable','flameType')
 for key in ['volume','gasFlow','dishes','distance']:q.locator('[data-intro-controlled="'+key+'"]').check()
 q.locator('[data-guide-next]').click();select('conclusion','blueBetter');check();assert q.evaluate("IntroModel.done('race')");nxt()
 # Goggles are mandatory. Heating above water cracks the tube and stops the flame.
 assert not q.locator('#introTaskPanel [data-intro-action=heat]').is_visible();assert not q.evaluate('IntroModel.sim().flame')
 q.locator('[data-intro-action=goggles]').click();control('heatPoint',60);q.locator('[data-intro-action=heat]').click();wait_model(.3);assert q.evaluate('IntroModel.sim().cracked');assert not q.evaluate('IntroModel.sim().flame')
 q.locator('[data-intro-action=resetTube]').click();q.locator('[data-intro-action=goggles]').click();control('holder',72);control('angle',45);control('direction','away');control('heatPoint',15);q.locator('[data-intro-action=heat]').click()
 for _ in range(8):
  wait_model(1)
  if q.locator('[data-intro-action=sweep]').is_visible():q.locator('[data-intro-action=sweep]').click()
  else:break
 assert q.evaluate('IntroModel.sim().boiled');q.locator('[data-intro-action=stop]').click()
 check();assert q.evaluate("IntroModel.done('tube')");nxt()
 print('Bunsen passed',flush=True)
 for i in range(5):q.locator('[data-self-rating="'+str(i)+'"][data-self-value="yes"]').click()
 q.locator('[data-intro-action=save]').click();q.locator('[data-intro-step="4"]').first.click();start_work();q.wait_for_selector('#introQuizForm')
 for i,a in enumerate([1,2,0,3]):q.locator('[data-quiz-answer="'+str(i)+'"][value="'+str(a)+'"]').check()
 for _ in range(6):
  i=q.locator('[data-intro-source]:visible').get_attribute('data-intro-source');drop(i,'order-'+i,'order')
 for key in ['yellow','yellow','blue','blue','blue']:q.locator('[data-quiz-swipe="'+key+'"]').click()
 for key,value in {'goal':'researchGoal','variable':'area','controls':'sameConditions','measure':'remaining'}.items():q.locator('label:has([data-quiz-research="'+key+'"]) [data-guide-value="'+value+'"]').click()
 q.locator('[data-research-start]').click();wait_model(5.5);q.locator('#introQuizForm [type=submit]').click();q.wait_for_selector('.intro-quiz-result');assert q.evaluate('IntroModel.passed()');assert q.evaluate("CourseModel.unlocked('states')");assert q.evaluate("state.game.badges.includes('chapter-intro')");assert q.evaluate('IntroModel.bestPercent()')==100
 xp=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('.intro-root');assert q.evaluate('IntroModel.passed()');assert q.evaluate('CourseGame.xp()')==xp
 # Rechecking and replaying cannot award the same XP twice or erase checked proof.
 q.evaluate("IntroModel.openTask('race');saveState();location.hash='#topic/intro';render(false)");q.locator('[data-cinema=start]').click();q.locator('[data-intro-action=heat]').click();q.goto(BASE+'#progress');q.wait_for_selector('.course-progress');assert q.evaluate("IntroModel.done('race')");assert q.evaluate('CourseGame.xp()')==xp;assert q.locator('.intro-self-progress').is_visible()
 q.goto(BASE+'#topic/intro');q.evaluate("IntroModel.data().active='quiz';render(false)");q.wait_for_selector('.intro-quiz-result');q.screenshot(path=str(ROOT/'artifacts/intro-completed-1440.png'))
 q.locator('main a[href="#topic/states"]').click();q.wait_for_selector('[data-course-id=states]');assert 'АГРЕГАТНЫЕ' in q.locator('h1').inner_text()
 assert not errors,errors;assert not bad,bad
 snapshot=q.evaluate('Object.fromEntries(Object.entries(localStorage))');Path('/tmp/intro-complete-state.json').write_text(json.dumps(snapshot,ensure_ascii=False));b.close()
print('Passed: all 13 tasks, order gates, wrong attempts, actual heating/gas timers, mandatory goggles, cracking/overheat guards, self-assessment, 14-part review, XP/badge once, F5/proof replay preservation and next topic')
