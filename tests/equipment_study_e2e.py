"""Study completion, once-only rewards, shared header and responsive task layouts."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/study');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},reduced_motion='reduce')
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:(errors.append(str(e)),print('ERROR',e,flush=True)))
 register_local(q,BASE,'Study Learner')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('.es-study')
 print('study opened',flush=True)
 assert q.locator('[data-es-item]').count()==6
 for n in range(6):
  q.locator('[data-es-item="'+str(n)+'"]').click();q.locator('[data-es=demo]').click()
 q.wait_for_selector('.es-completion:not([hidden])')
 assert q.evaluate('Object.keys(state.game.rewards).filter(k=>k.startsWith("lesson12:collection:")).length')==6
 xp=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('.es-study')
 q.locator('[data-es=demo]').click()
 assert q.evaluate('CourseGame.xp()')==xp
 q.reload();q.wait_for_selector('.es-study')
 for width,height in [(360,800),(768,1024),(1366,768),(1920,1080)]:
  q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(250)
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  header=q.locator('#app>.topbar').bounding_box();task=q.locator('.es-study').bounding_box()
  assert abs(header['y']+header['height']-task['y'])<2,(width,header,task)
  if width==360:assert header['height']<=56,header
  q.screenshot(path=str(OUT/(str(width)+'.png')))
 q.set_viewport_size({'width':1366,'height':768})
 q.locator('[data-es=fullscreen]').click();q.wait_for_function('!!document.fullscreenElement');q.locator('#app>.topbar').wait_for(state='hidden')
 q.evaluate('document.exitFullscreen()');q.wait_for_function('!document.fullscreenElement');q.locator('#app>.topbar').wait_for(state='visible')
 q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_selector('.safety-editor')
 assert q.locator('.safety-scene-nav').count()==0
 q.wait_for_selector('.safety-stage-badge');assert q.locator('.safety-stage-segments i').count()>3
 q.screenshot(path=str(OUT/'safety.png'))
 assert not errors,errors
 print('PASS six instruments, persistence, once-only XP, four viewport sizes, shared header/fullscreen, safety stages; no page errors')
 b.close()
