"""Six 8-second story animations, a 30-second movie, pause/language and cavity editing."""
from pathlib import Path
from time import monotonic
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/study14111-motion');OUT.mkdir(parents=True,exist_ok=True)
IDS=['graduated-cylinder','beaker','funnel','conical-flask','evaporating-dish','test-tube']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},has_touch=True,reduced_motion='no-preference')
 for host in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+host+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Study motion')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('.es-study')
 for n,id in enumerate(IDS):
  q.locator('[data-es-item="'+str(n)+'"]').click();q.locator('[data-es=demo]').click();q.wait_for_timeout(4200)
  assert q.locator('.es-visual').evaluate('(e)=>getComputedStyle(e).transform')=='none'
  assert q.locator('.es-art [data-cavity]').count()==1
  assert q.locator('.es-glass-front').get_attribute('opacity')=='.35'
  q.screenshot(path=str(OUT/(id+'-running.png')))
  q.wait_for_function('!EquipmentStudy.capture().motion.running',timeout=6000)
  assert 'rotate(0 ' in q.locator('.es-vessel').get_attribute('transform')
  if id=='graduated-cylinder':
   assert abs(float(q.locator('[data-liquid]').get_attribute('y'))-50.5)<.02
   assert q.locator('[data-magnifier]').evaluate('(e)=>getComputedStyle(e).opacity')=='1'
  if id=='funnel':assert q.locator('[data-residue]').evaluate('(e)=>getComputedStyle(e).opacity')=='1'
  if id=='evaporating-dish':assert q.locator('[data-crystals]').evaluate('(e)=>getComputedStyle(e).opacity')=='1'
  print('PASS animation',id,flush=True)
 q.wait_for_selector('.es-completion:not([hidden])');xp=q.evaluate('CourseGame.xp()')
 q.locator('[data-es=whole]').click();q.wait_for_selector('.es-movie-bar')
 q.evaluate('''()=>{window.movieIds=['graduated-cylinder'];window.movieObserver=new MutationObserver(()=>{const id=document.querySelector('.es-scene')?.dataset.equipment;if(id&&window.movieIds.at(-1)!==id)window.movieIds.push(id)});window.movieObserver.observe(document.querySelector('#app'),{childList:true,subtree:true});}''')
 q.wait_for_timeout(500);q.locator('[data-es=pause]').click();paused=q.evaluate('EquipmentStudy.capture().motion.elapsed');q.wait_for_timeout(400);assert abs(q.evaluate('EquipmentStudy.capture().motion.elapsed')-paused)<1
 q.locator('#language').select_option('en');q.wait_for_selector('.es-movie-bar');assert not q.evaluate('EquipmentStudy.capture().motion.running');assert abs(q.evaluate('EquipmentStudy.capture().motion.elapsed')-paused)<1
 q.locator('[data-es=pause]').click();started=monotonic();q.wait_for_selector('.es-completion:not([hidden])',timeout=35000)
 assert 27<monotonic()-started<34
 assert q.evaluate('window.movieIds')==IDS
 assert q.evaluate('CourseGame.xp()')==xp
 q.set_viewport_size({'width':360,'height':800});q.locator('[data-es=whole]').click();q.wait_for_timeout(700)
 caption=q.locator('[data-es-caption]').bounding_box();assert caption['y']+caption['height']<=800,caption
 q.screenshot(path=str(OUT/'movie-mobile.png'));q.locator('[data-es=stop]').click()
 q.locator('[data-es-review="5"]').click();q.wait_for_selector('[data-equipment=test-tube]');assert q.locator('.es-completion').is_hidden()
 # A real touch gesture navigates between neighbouring steps.
 q.set_viewport_size({'width':360,'height':800});q.locator('.es-visual').scroll_into_view_if_needed();q.locator('.es-visual').evaluate("e=>{const t=x=>new Touch({identifier:1,target:e,clientX:x,clientY:400});e.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[t(80)]}));e.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[t(250)]}));}")
 q.wait_for_selector('[data-equipment=evaporating-dish]')
 q.emulate_media(reduced_motion='reduce');q.locator('[data-es=demo]').click();q.wait_for_timeout(2200)
 assert q.locator('[data-stream]').evaluate('(e)=>getComputedStyle(e).opacity')=='0'
 assert q.locator('.es-vessel').get_attribute('transform')=='translate(0 0) rotate(0 50 60)'
 q.goto(BASE+'?debug=1#lab/ch1/1.2/task-1');q.wait_for_selector('.es-cavity-debug')
 assert q.evaluate('EquipmentStudy.capture().seen.length')==0
 q.locator('.es-debug textarea').fill('[[46,22],[54,22],[54,76],[53,79],[47,79],[46,76]]')
 assert '46 22' in q.locator('[data-cavity]').get_attribute('d')
 q.locator('[data-point="0"]').focus();q.keyboard.press('ArrowRight');assert '46.25 22' in q.locator('[data-cavity]').get_attribute('d')
 assert q.locator('[data-equipment=graduated-cylinder]').count()==1
 q.screenshot(path=str(OUT/'debug-cavity-mobile.png'))
 assert not errors,errors
 print('PASS complete movie order/duration, pause/language, touch, reduced motion, editable cavity, no console errors',flush=True)
 b.close()
