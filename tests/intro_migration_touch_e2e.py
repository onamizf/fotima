"""Cross-account state, legacy XP/access, touch dragging and saved self-assessment links."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8042/')
snapshot=json.loads(Path('/tmp/intro-complete-state.json').read_text())
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce');ctx.add_init_script('const initial='+json.dumps(snapshot)+';if(!localStorage.getItem("fotima.local.accounts.v1"))for(const [k,v] of Object.entries(initial))localStorage.setItem(k,v);');q=ctx.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE+'#topic/intro');q.wait_for_selector('.intro-root');q.evaluate("IntroModel.data().active='self';render(false)");q.locator('[data-self-rating="0"][data-self-value=no]').click();q.locator('[data-self-plan]').fill('Повторю опасные действия с помощником.');q.locator('[data-intro-action=save]').click();q.reload();q.wait_for_selector('.intro-root');assert q.evaluate('IntroModel.passed()');assert q.locator('[data-self-plan]').input_value()=='Повторю опасные действия с помощником.'
 # The self-assessment repeat link works even though the hash stays unchanged.
 q.locator('.intro-self [data-intro-jump=danger-a]').click();q.wait_for_selector('[data-scene-player]');assert q.evaluate('IntroModel.data().task')=='danger-a'
 q.goto(BASE+'#progress');q.wait_for_selector('.intro-self-progress');assert 'Повторю' in q.locator('.intro-self-progress').inner_text();q.locator('.intro-self-progress [data-intro-jump=danger-a]').click();q.wait_for_selector('[data-scene-player]')
 # Actual touch-pointer drag, not direct modification of completed evidence.
 q.evaluate("IntroModel.openTask('signs');delete IntroModel.row().matches.irritant;render(false)");q.wait_for_function('window.introSceneInfo?.ready');source=q.locator('[data-intro-source=irritant]');target=q.locator('[data-intro-drop=irritant]').first;source.scroll_into_view_if_needed();target.scroll_into_view_if_needed();a=source.bounding_box();z=target.bounding_box();cdp=ctx.new_cdp_session(q)
 def touch(kind,x,y):cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[] if kind=='touchEnd' else [{'x':x,'y':y}]})
 ax=a['x']+a['width']/2;ay=a['y']+a['height']/2;zx=z['x']+z['width']/2;zy=z['y']+z['height']/2;touch('touchStart',ax,ay)
 for n in range(1,6):touch('touchMove',ax+(zx-ax)*n/5,ay+(zy-ay)*n/5)
 touch('touchEnd',zx,zy);assert q.evaluate("IntroModel.row().matches.irritant==='irritant'");assert q.locator('.intro-confetti').count()==0
 # Per-user isolation: a newly registered learner cannot inherit the completed chapter.
 q.evaluate('LocalAuth.signOut()');register_local(q,BASE,'Another Learner');assert not q.evaluate('IntroModel.passed()');assert q.evaluate('IntroModel.progress().value')==0
 # A previous-release account keeps its original quiz rewards and access to worked labs.
 q.evaluate('''()=>{const s=freshState(),day=CourseGame.day();s.course={version:1,legacy:false,topics:{safety:{read:[0,1,2,3],bestAnswers:[0,0,0,0,0],attempts:[],draft:[],tab:'quiz',card:0}}};for(const id of ['properties','physical','chemical']){const t=CourseData.topics.find(t=>t.id===id);s.course.topics[id]={read:[0,1,2],bestAnswers:t.steps.quiz.map(q=>q.correct),attempts:[],draft:[],tab:'theory',card:0};s.game.rewards['quiz:'+id]=day;s.game.rewards['perfect:'+id]=day;}s.game.rewards['exp:safety-audit']=day;s.game.rewards['quiz:safety']=day;s.game.rewards['perfect:safety']=day;s.game.rewards['login:'+day]=day;s.game.logins=[day];s.game.badges=['safe','perfect'];state=readState(s);saveState();render(false);}''')
 assert q.evaluate('CourseGame.xp()')==185
 for id in ['properties','physical','chemical']:
  assert q.evaluate('(id)=>CourseModel.unlocked(id)',id);q.goto(BASE+'#lab/'+id);q.wait_for_selector('[data-level-next]');q.locator('[data-level-next]').click()
 assert q.evaluate('state.course.archivedSafety.read.length')==4;assert not q.evaluate('IntroModel.passed()');assert not q.evaluate("state.game.badges.includes('chapter-intro')");q.reload();assert q.evaluate('CourseGame.xp()')==185
 assert not errors,errors;b.close()
print('Passed: actual touch dragging, reduced motion, self-rating/plan F5 and repeat links, account isolation, legacy quiz rewards/badge/access retained, no automatic new chapter credit')

