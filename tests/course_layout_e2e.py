"""Links/history, all course routes and translations, reduced motion, responsive shell and legacy migration."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8040/');snapshot=json.loads(Path('/tmp/course-demo-state.json').read_text())
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page();errors=[];bad=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);register_local(q,BASE,'фотима');q.emulate_media(reduced_motion='reduce')
 q.evaluate('(s)=>{state=readState(s);saveState();render(false)}',snapshot)
 routes=['home','topics','topic/safety','topic/properties','topic/mixtures','topic/physical','topic/chemical','topic/atoms','games','games/mixtures','games/changes','games/safety','collection','awards','challenge','progress','settings','account','contacts','resources/periodic','resources/glossary','resources/tests','resources/more','resources/safety','materials/properties','table/properties','lab/properties','lab/physical','lab/chemical','result/properties','result/physical','result/chemical']
 hrefs=set();checks=0
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.select_option('#language',lang)
  for width,height in [(1440,1000),(1024,768),(768,1000),(375,812),(320,700),(844,390)]:
   q.set_viewport_size({'width':width,'height':height})
   for route in routes:
    q.goto(BASE+'#'+route);q.wait_for_selector('main h1, main h2');assert 'undefined' not in q.locator('main').inner_text(),(lang,width,route)
    assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,width,route,q.evaluate('document.documentElement.scrollWidth'))
    assert q.locator('main h1').count()==(0 if route=='account' else 1),(route,q.locator('main h1').count());checks+=1
    for href in q.locator('a').evaluate_all('(els)=>els.map(a=>a.getAttribute("href"))'):
     assert href and href!='#',(route,href);hrefs.add(href)
     if href.startswith('#') and href!='#main':assert q.evaluate('(h)=>SiteRoutes.resolve(h).page',href)!='notfound',(route,href)
 q.select_option('#language','ru');q.set_viewport_size({'width':1440,'height':1000})
 for route,name in [('home','course-home-1440'),('topics','course-map-1440'),('progress','course-progress-1440'),('collection','course-collection-1440'),('games/safety','course-safety-1440')]:
  q.goto(BASE+'#'+route);q.evaluate('document.fonts.ready');q.screenshot(path=str(ROOT/'artifacts'/f'{name}.png'),full_page=True)
 q.goto(BASE+'#topics');title=q.title();q.locator('[href="#topic/atoms"]').click();q.wait_for_url('**/#topic/atoms');assert q.title()!=title;q.go_back();q.wait_for_url('**/#topics');q.go_forward();q.wait_for_url('**/#topic/atoms');q.reload();assert 'скоро' in q.locator('main').inner_text().lower()
 q.goto(BASE+'#home');q.locator('#dashboardSearch').fill('плотность');assert q.locator('[role=option]').count();q.locator('#dashboardSearch').press('ArrowDown');q.locator('#dashboardSearch').press('Enter');q.wait_for_url('**/#resources/glossary')
 q.set_viewport_size({'width':375,'height':812});q.goto(BASE+'#home');q.screenshot(path=str(ROOT/'artifacts/course-home-375.png'),full_page=True);q.locator('#navigationToggle').click();q.locator('#profileMenu a[href="#games"]').click();q.wait_for_url('**/#games');assert not q.locator('#profileMenu').is_visible()
 q.goto(BASE+'#settings');q.locator('[data-game-setting=largeText]').check()
 for route in ['home','topics','topic/properties','games/mixtures','games/safety','collection','progress','settings']:
  q.goto(BASE+'#'+route);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),('large',route)
 q.goto(BASE+'#welcome');assert q.locator('#frogAssistant').count()==0;assert q.locator('#gameToast').count()==0
 # Old v2 records are carried forward; a new learner must pass the new safety introduction.
 old={k:v for k,v in snapshot.items() if k not in ['course','game']};old['lessons']={'properties':{'version':2,'step':0,'visited':[0],'answers':{}}}
 q.goto(BASE+'#account');q.evaluate('(s)=>{state=readState(s);saveState();render(false)}',old);assert q.evaluate('state.course.legacy');assert q.evaluate('CourseModel.unlocked("properties")');assert q.evaluate('observationCount()')==12
 # Stored best scores survive the rolling history of attempts and a full reload.
 q.evaluate("state.course.topics.safety={read:[0,1,2,3],bestAnswers:[0,0,0,0,0],attempts:Array.from({length:50},()=>({answers:[1,1,1,1,1],day:'2026-10-22'})),draft:[],tab:'quiz',card:0};saveState()");q.reload();assert q.evaluate('CourseModel.best("safety")')==5
 # Reset clears learning/XP/collection, keeps account and accessibility preferences.
 q.goto(BASE+'#settings');q.locator('[data-game-setting=largeText]').check();q.locator('[data-action=reset]').click();q.locator('[data-action=cancel]').click();assert q.evaluate('observationCount()')==12
 q.locator('[data-action=reset]').click();q.locator('[data-action=confirmReset]').click();assert q.evaluate('LocalAuth.signedIn()');assert q.evaluate('state.settings.largeText');assert q.evaluate('observationCount()')==0;assert q.evaluate('state.game.collection')==[];assert q.evaluate('CourseGame.xp()')==5;assert not q.evaluate('CourseModel.passed("safety")')
 assert not errors,errors;assert not bad,bad;b.close()
print(f'Passed: {checks} course layouts, {len(hrefs)} valid links, history/F5, search, mobile navigation, large text/reduced motion, migration, best scores and safe reset')
