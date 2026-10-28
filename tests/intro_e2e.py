"""Complete the new chapter through actual UI, including timed models and drag alternatives."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8042/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');q=ctx.new_page();errors=[];bad=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click())
 q.clock.install();register_local(q,BASE,'Chapter Learner');q.goto(BASE+'#topic/intro');q.wait_for_selector('.intro-root')
 assert q.locator('.intro-road>li').count()==5;assert q.locator('[data-intro-step="1"]').first.is_disabled();assert not q.evaluate("CourseModel.unlocked('states')")
 q.locator('.intro-road [data-intro-step="0"]').click();q.locator('[data-intro-begin]').click();q.wait_for_selector('.sp-loader',state='hidden')
 def check():q.locator('[data-intro-action=check]').click()
 def nxt():q.locator('[data-intro-action=next]').click()
 def start_work():q.locator('[data-intro-begin]').click();q.wait_for_selector('#introTaskPanel')
 def drop(source,target,group='main'):
  root=q.locator('[data-match-group="'+group+'"]');root.locator('[data-intro-source="'+source+'"]').click();root.locator('[data-intro-drop="'+target+'"]').click()
 def control(key,value):
  el=q.locator('[data-intro-control="'+key+'"]');el.evaluate('(e,v)=>{e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));}',str(value))
 def select(key,value):q.locator('[data-intro-answer="'+key+'"]').select_option(value)
 def wait_model(seconds):q.clock.run_for(int(seconds*1000))
 # Situation A now uses a scene hotspot and two question steps.
 q.locator('[data-sp=skip]').click();assert not q.evaluate("IntroModel.done('danger-a')")
 q.locator('.sp-hotspot').click();q.locator('[data-risk="0"]').click()
 for i in [0,1]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-a')")
 q.locator('[data-sp=next]').click()
 data=q.evaluate('IntroData.dangers')
 for d in data[1:]:
  q.locator('[name=intro-danger][value="'+str(d['correctDanger'])+'"]').check();q.locator('[name=intro-precaution][value="'+str(d['correctAction'])+'"]').check();check();assert q.evaluate('(id)=>IntroModel.done(id)',d['id']);nxt()
 print('Hazards passed',flush=True)
 for id in ['irritant','explosive','corrosive','toxic','flammable']:drop(id,id)
 check();assert q.evaluate("IntroModel.done('signs')");nxt();start_work()
 # Museum: visit all six, identify each, assemble a 3D flask.
 ids=q.evaluate('IntroModel.mainEquipment')
 for id in ids:q.locator('[data-museum-object="'+id+'"]').click()
 q.locator('[data-museum-mode=identify]').click()
 for id in ids:q.locator('[data-museum-object="'+id+'"]').click();select(id,id)
 q.locator('[data-museum-mode=construct]').click()
 for id in ['neck','body','bottom']:drop(id,id)
 check();assert q.evaluate("IntroModel.done('museum')");nxt()
 # Wrong item cannot snap into the assembly.
 drop('burner','assembly');assert q.evaluate('IntroModel.row().order.length')==0
 for id in ['stand','tube','beaker','gauze','tripod','burner']:drop(id,'assembly')
 q.locator('[data-intro-action=heat]').click();wait_model(6.5);check();assert q.evaluate("IntroModel.done('assembly')");nxt()
 for target,source in {'a':'beaker','b':'tripod','d':'dish','e':'burner'}.items():drop(source,target)
 q.locator('[data-intro-action=heat]').click();wait_model(13.5);check();assert q.evaluate("IntroModel.done('evap-labels')");nxt();start_work()
 print('Equipment passed',flush=True)
 for id in ['nozzle','airHole','collar','inlet','base','tap']:drop(id,id,'parts')
 for id in ['airHole','collar','nozzle','tap']:drop(id,'f-'+id,'functions')
 check();assert q.evaluate("IntroModel.done('burner-parts')");nxt()
 # Open gas without ignition: real timer causes alarm and shuts the gas.
 control('gas',30);wait_model(3.5);assert q.evaluate('IntroModel.sim().gas')==0;assert 'горючий' in q.locator('#introFeedback').inner_text()
 q.locator('[data-intro-action=prepare]').click();control('air',0);q.locator('[data-intro-action=lightMatch]').click();drop('match','nozzle');control('gas',40);assert q.evaluate('IntroModel.sim().flame');q.locator('[data-intro-action=putOutMatch]').click();q.locator('[data-intro-action=stop]').click();check();assert q.evaluate("IntroModel.done('ignition')");nxt()
 q.locator('[data-intro-action=heat]').click();control('gas',20);control('gas',80);control('air',100);q.locator('[data-intro-action=light]').click();q.locator('[data-intro-action=xray]').click()
 for key,value in {'yellowInner':'dark','yellowOuter':'yellowColor','blueInner':'dark','blueOuter':'blueColor','yellowStable':'flicker','blueStable':'steady','idle':'visible'}.items():select(key,value)
 check();assert q.evaluate("IntroModel.done('flames')");nxt()
 q.locator('[data-intro-action=heat]').click();wait_model(23.5);q.locator('[data-intro-action=flip]').click()
 q.locator('[data-intro-answer=yellowTime]').fill('20');q.locator('[data-intro-answer=blueTime]').fill('12');select('variable','flameType')
 for key in ['volume','gasFlow','dishes','distance']:q.locator('[data-intro-controlled="'+key+'"]').check()
 select('conclusion','blueBetter');check();assert q.evaluate("IntroModel.done('race')");nxt()
 # Goggles are mandatory. Heating above water cracks the tube and stops the flame.
 q.locator('[data-intro-action=heat]').click();assert not q.evaluate('IntroModel.sim().flame')
 q.locator('[data-intro-action=goggles]').click();control('heatPoint',60);q.locator('[data-intro-action=heat]').click();wait_model(.3);assert q.evaluate('IntroModel.sim().cracked');assert not q.evaluate('IntroModel.sim().flame')
 q.locator('[data-intro-action=resetTube]').click();q.locator('[data-intro-action=goggles]').click();control('holder',72);control('angle',45);control('direction','away');control('heatPoint',15);q.locator('[data-intro-action=heat]').click()
 for _ in range(8):wait_model(1);q.locator('[data-intro-action=sweep]').click()
 assert q.evaluate('IntroModel.sim().boiled');q.locator('[data-intro-action=stop]').click();check();assert q.evaluate("IntroModel.done('tube')");nxt()
 print('Bunsen passed',flush=True)
 for i in range(5):q.locator('[data-self-rating="'+str(i)+'"][data-self-value="yes"]').click()
 q.locator('[data-intro-action=save]').click();q.locator('[data-intro-step="4"]').first.click();q.wait_for_selector('#introQuizForm')
 for i,a in enumerate([1,2,0,3]):q.locator('[data-quiz-answer="'+str(i)+'"][value="'+str(a)+'"]').check()
 for i in range(6):drop(str(i),'order-'+str(i),'order')
 for key in ['yellow','yellow','blue','blue','blue']:q.locator('[data-quiz-swipe="'+key+'"]').click()
 for key,value in {'goal':'researchGoal','variable':'area','controls':'sameConditions','measure':'remaining'}.items():q.locator('[data-quiz-research="'+key+'"]').select_option(value)
 q.locator('[data-research-start]').click();wait_model(5.5);q.locator('#introQuizForm [type=submit]').click();q.wait_for_selector('.intro-quiz-result');assert q.evaluate('IntroModel.passed()');assert q.evaluate("CourseModel.unlocked('states')");assert q.evaluate("state.game.badges.includes('chapter-intro')");assert q.evaluate('IntroModel.bestPercent()')==100
 xp=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('.intro-root');assert q.evaluate('IntroModel.passed()');assert q.evaluate('CourseGame.xp()')==xp
 # Rechecking and replaying cannot award the same XP twice or erase checked proof.
 q.evaluate("IntroModel.openTask('race');saveState();location.hash='#topic/intro';render(false)");q.locator('[data-intro-action=heat]').click();q.goto(BASE+'#progress');q.wait_for_selector('.course-progress');assert q.evaluate("IntroModel.done('race')");assert q.evaluate('CourseGame.xp()')==xp;assert q.locator('.intro-self-progress').is_visible()
 q.goto(BASE+'#topic/intro');q.evaluate("IntroModel.data().active='quiz';render(false)");q.wait_for_selector('.intro-quiz-result');q.screenshot(path=str(ROOT/'artifacts/intro-completed-1440.png'))
 q.locator('main a[href="#topic/states"]').click();q.wait_for_selector('[data-course-id=states]');assert 'АГРЕГАТНЫЕ' in q.locator('h1').inner_text()
 assert not errors,errors;assert not bad,bad
 snapshot=q.evaluate('Object.fromEntries(Object.entries(localStorage))');Path('/tmp/intro-complete-state.json').write_text(json.dumps(snapshot,ensure_ascii=False));b.close()
print('Passed: all 13 tasks, order gates, wrong attempts, actual heating/gas timers, mandatory goggles, cracking/overheat guards, self-assessment, 14-part review, XP/badge once, F5/proof replay preservation and next topic')

