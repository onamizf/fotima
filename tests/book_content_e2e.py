import json,sys
from pathlib import Path

from browser_auth import register_local
from playwright.sync_api import sync_playwright,expect
snap=json.loads(Path('/tmp/intro-complete-state.json').read_text());raw=None;candidates=[]
for v in snap.values():
 try:d=json.loads(v)
 except:continue
 if isinstance(d,dict) and d.get('version')==2 and 'intro'in d and 'game'in d:candidates.append(d)
raw=max(candidates,key=lambda x:sum(bool(r.get('checked')) for r in x['intro'].get('rows',{}).values()));raw.pop('textbook',None)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':900,'height':1000});errs=[];q.on('pageerror',lambda e:(errs.append(str(e)),print('JS',e,flush=True)));q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());register_local(q,'http://127.0.0.1:8046/','Engine Bridge');q.evaluate('''raw=>{raw.course.topics.states={read:[0,1,2],bestAnswers:[],observed:['solid','liquid','gasState'],attempts:[],draft:[],tab:'experiments',card:0};raw.course.preservedAccess=['properties','physical','chemical'];raw.course.topics.atoms={read:[0]};raw.course.topics.mixtures={read:[0]};state=readState(raw);saveState()}''',raw);q.goto('http://127.0.0.1:8046/#topic/ch2/2.2');q.wait_for_selector('[data-book-engine=physical]');q.locator('[data-physical-step=setup]').click();assert q.evaluate('physicalRecord("wax").actions.includes("setup")');q.goto('http://127.0.0.1:8046/#topic/ch4/4.3');q.wait_for_selector('[data-book-engine=properties]');q.goto('http://127.0.0.1:8046/#topic/ch5/5.3');q.wait_for_selector('[data-book-engine=chemical]');q.locator('[data-chemical-step=setup]').click();assert q.evaluate('chemicalRecord().actions.includes("setup")');q.goto('http://127.0.0.1:8046/#topic/ch6/6.1');q.wait_for_selector('[data-game=mixtures]');
 for _ in range(6):
  answer=q.evaluate('CourseData.games.mixtures[state.game.rounds.mixtures.index].answer');q.locator('[data-game-answer="'+answer+'"]').click()
 assert q.evaluate('TextbookCourse.done("6.1")');q.goto('http://127.0.0.1:8046/#topic/ch3/3.2');q.wait_for_selector('.periodic-page');
 for symbol in ['Fe','Na','Al','H','C','O']:
  q.locator('[data-element="'+symbol+'"]').click();print('Element',symbol,q.evaluate('location.hash'),q.evaluate('route()'),flush=True);q.wait_for_selector('.periodic-detail-dialog[open]');assert q.evaluate('route().chapterId')=='ch3';q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='hidden')
 assert q.evaluate('TextbookCourse.done("3.2")');q.goto('http://127.0.0.1:8046/#topics');q.wait_for_selector('.textbook-route');
 for w in [320,700,768,1024]:
  q.set_viewport_size({'width':w,'height':900});q.wait_for_timeout(100);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(w,q.evaluate('({width:document.documentElement.scrollWidth,bad:[...document.querySelectorAll("body *")].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&r.right>innerWidth+2&&getComputedStyle(e).display!=="none"}).map(e=>[e.tagName,e.className?.baseVal||e.className,e.getBoundingClientRect().right]).slice(0,20)})'))
  if w<768:assert q.locator('.book-node.label-left').count()==0
 assert not errs,errs;b.close()
print('PASS: physical/property/chemical engines, inline mixtures and periodic study, preserved access and 320/700/768/1024 px geometry')
