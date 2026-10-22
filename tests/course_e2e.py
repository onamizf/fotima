"""Course parts 1–4: real learner actions, five-question gates, original experiments and game persistence."""
import os,json,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8040/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1440,'height':1000});q=ctx.new_page();errors=[];bad=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 register_local(q,BASE,'фотима');assert q.evaluate('CourseGame.xp()')==5;assert q.locator('.user-greeting').inner_text()=='Привет, Фотима!';assert q.locator('.topinner .site-nav').count()==0
 q.goto(BASE+'#catalog');q.wait_for_url('**/#topics');assert q.locator('[data-course-topic]').count()==6;assert not q.evaluate('CourseModel.unlocked("properties")');assert q.evaluate('CourseModel.unlocked("safety")')
 for id in ['mixtures','atoms']:
  q.goto(BASE+'#topic/'+id);assert 'скоро' in q.locator('main').inner_text().lower()
 def read_cards(id):
  q.goto(BASE+'#topic/'+id)
  if not q.locator('[data-course-read]').count():q.locator('[data-course-tab=theory]').click()
  for i in range(4 if id=='safety' else 3):q.locator(f'[data-course-read="{i}"]').click()
  assert q.evaluate('(id)=>CourseModel.theoryRead(id)',id)
 def quiz(id,score=5):
  q.goto(BASE+'#topic/'+id);q.locator('[data-course-tab=quiz]').click()
  for i in range(5):q.locator(f'[name="question-{i}"][value="{0 if i<score else 1}"]').check()
  q.locator('#courseQuiz [type=submit]').click();assert q.evaluate('(id)=>CourseModel.best(id)',id)>=score
 read_cards('safety');quiz('safety',4);assert q.evaluate('CourseGame.xp()')==35;assert q.locator('#earnedDialog').is_visible();assert q.locator('.game-confetti').count()>0;q.locator('#earnedDialog button').click()
 # Retaking a 4/5 adds only the perfect-score bonus; replaying 5/5 never farms XP.
 quiz('safety',5);assert q.evaluate('CourseGame.xp()')==45;q.locator('#earnedDialog button').click();q.emulate_media(reduced_motion='reduce')
 q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda:q.locator('#earnedDialog button').click())
 quiz('safety',5);assert q.evaluate('CourseGame.xp()')==45;assert q.evaluate('CourseModel.unlocked("properties")')
 # Complete a real original specimen workflow and preserve exactly-once rewards.
 read_cards('properties');q.locator('[data-course-tab=experiments]').first.click();q.locator('[data-open-experiment=properties-salt]').click();q.wait_for_url('**/#lab/properties')
 for sample in q.evaluate('sampleIds'):
  q.locator('#benchSample').select_option(sample)
  for action in ['inspect','water','add','stir','reference']:q.locator(f'[data-investigation={action}]').click()
  row=q.evaluate('(id)=>sampleCards[sampleIds.indexOf(id)]',sample)
  for field,value in zip(['state','color','solubility'],[row[0],row[1],row[3]]):q.locator(f'[data-observe={field}]').select_option(value)
  q.locator('[data-observe=explanation]').select_option(q.evaluate('(id)=>expectedExplanation(id)',sample));q.locator('[data-investigation=check]').click()
 assert q.evaluate('observationCount()')==12;assert q.evaluate('CourseGame.xp()')==285
 before=q.evaluate('CourseGame.xp()');q.locator('[data-investigation=check]').click();q.reload();assert q.evaluate('CourseGame.xp()')==before
 q.goto(BASE+'#result/properties');q.locator('[name=propertyComparison][value=different]').check();q.locator('[data-report=check]').click();assert q.evaluate('comparisonPassed()');assert q.evaluate('CourseGame.xp()')==305
 quiz('properties',4);assert q.evaluate('CourseGame.xp()')==335;assert q.evaluate('CourseModel.unlocked("physical")');assert not q.evaluate('CourseModel.unlocked("mixtures")')
 # Original physical and chemical labs still work, with new theory cards replacing the old quiz gate.
 read_cards('physical');q.goto(BASE+'#lab/physical')
 for task in ['wax','salt','reference']:
  q.locator(f'[data-physical-task={task}]').click();cfg=q.evaluate('(id)=>physicalTasks[id]',task)
  for step in cfg['steps']:q.locator(f'[data-physical-step={step}]').click()
  for field in ['observation','explanation']:q.locator(f'[data-physical-answer={field}]').select_option(cfg[field+'s'][0])
  if task=='reference':
   for sample,value in [('ethanol','alcoholic'),('acid','vinegar'),('ether','unspecified')]:q.locator(f'[data-physical-match={sample}]').select_option(value)
  q.locator('[data-physical=check]').click()
 assert q.evaluate('physicalPassedCount()')==3;assert not q.evaluate('CourseModel.unlocked("chemical")');quiz('physical',5);assert q.evaluate('CourseModel.unlocked("chemical")')
 read_cards('chemical');q.goto(BASE+'#lab/chemical')
 for variant in ['paper','alcohol','gas','match','copper','chalk','marble','limestone']:
  q.locator('.chemical-variant-overview summary').click();q.locator(f'[data-jump-chemical={variant}]').click();cfg=q.evaluate('(id)=>chemicalGroups[chemicalGroup(id)]',variant)
  for step in cfg['steps']:q.locator(f'[data-chemical-step={step}]').click()
  for field in ['observation','explanation']:q.locator(f'[data-chemical-answer={field}]').select_option(cfg[field+'s'][0])
  q.locator('[data-chemical=check]').click()
 assert q.evaluate('chemicalCount()')==8;quiz('chemical',5)
 assert q.evaluate('CourseGame.xp()')==635 # 5 daily + 150 quizzes + 24 original experiments * 20.
 # Finish the safety picture. It is today's chosen experiment: +20 and +10 daily, once.
 q.goto(BASE+'#games/safety')
 for i in range(3):q.locator(f'[data-safety-hit="{i}"]').click()
 assert q.evaluate('CourseGame.xp()')==665;assert q.evaluate('state.game.games.safety')
 q.locator('[data-safety-replay]').click();q.locator('[data-safety-hit="0"]').click();assert q.evaluate('CourseGame.xp()')==665
 for i in [1,2]:q.locator(f'[data-safety-hit="{i}"]').click()
 assert q.evaluate('CourseGame.xp()')==665
 # Each mini-game supports buttons and its dedicated mouse/keyboard control.
 q.goto(BASE+'#games/mixtures');q.locator('[data-game-answer=mixture]').click();assert q.evaluate('state.game.rounds.mixtures.index')==0
 q.locator('.game-sort-card').focus();q.keyboard.press('ArrowLeft');assert q.evaluate('state.game.rounds.mixtures.index')==1
 for answer in ['mixture','pure','mixture','pure','mixture']:q.locator(f'[data-game-answer={answer}]').click()
 assert q.evaluate('state.game.games.mixtures')
 q.goto(BASE+'#games/changes');q.locator('.game-sort-card').drag_to(q.locator('[data-game-answer=physical]'));assert q.evaluate('state.game.rounds.changes.index')==1
 for answer in ['chemical','chemical','physical','physical','chemical']:q.locator(f'[data-game-answer={answer}]').click()
 assert q.evaluate('state.game.games.changes');q.goto(BASE+'#collection');assert q.locator('.collection-card:not(.collection-locked)').count()==14
 q.goto(BASE+'#challenge');q.locator('[data-challenge-start]').click();deadline=q.evaluate('state.game.challenge.deadline');q.reload();assert q.evaluate('state.game.challenge.deadline')==deadline
 q.clock.install();q.clock.fast_forward(61000);q.wait_for_function('state.game.challenge.finished');assert 'Время вышло' in q.locator('main').inner_text()
 q.locator('[data-challenge-start]').click()
 for i in range(3):q.locator('[data-challenge-answer="0"]').click()
 assert q.evaluate('state.game.challenge.finished');assert len(q.evaluate('state.game.challenge.answers'))==3
 assert q.evaluate('CourseGame.xp()')==665;q.evaluate('saveState();saveState()');q.reload();assert q.evaluate('CourseGame.xp()')==665
 q.goto(BASE+'#progress');assert q.locator('.progress-summary').inner_text().find('67%')>=0;assert q.locator('.activity-cell').count()==91
 saved=q.evaluate('state');Path('/tmp/course-demo-state.json').write_text(json.dumps(saved,ensure_ascii=False));Path('/tmp/progress-demo-state.json').write_text(json.dumps(saved,ensure_ascii=False))
 # Settings and F5, reduced motion, and genuinely separate user progress.
 q.goto(BASE+'#settings');q.locator('[data-game-setting=helper]').uncheck();assert q.locator('#frogAssistant').count()==0;q.locator('[data-game-setting=largeText]').check();q.reload();assert q.locator('[data-game-setting=largeText]').is_checked();assert q.locator('body').get_attribute('class').find('large-text')>=0
 q.locator('[data-game-setting=largeText]').uncheck();q.locator('[data-game-setting=sound]').check();q.reload();assert q.locator('[data-game-setting=sound]').is_checked()
 q.locator('#profileToggle').click();q.locator('.header-profile-popover [data-profile-logout]').click();register_local(q,BASE,'Второй ученик');assert q.evaluate('CourseGame.xp()')==5;assert not q.evaluate('CourseModel.unlocked("properties")');assert q.evaluate('state.game.collection')==[]
 assert not errors,errors;assert not bad,bad;b.close()
print('Passed parts 1–4: topic gates/4-of-5, 25 preserved experiments, exact once-only XP and daily bonus, collection, three games, timer/F5, settings, per-user isolation; no JS/resource errors')
