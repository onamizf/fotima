"""Both assemblies celebrate completion; undo/restart clear it without extra XP."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/success1419');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},has_touch=True,reduced_motion='no-preference')
 for domain in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+domain+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Assembly Success')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 for task,model in [('task-2','water-bath'),('task-3','evaporation')]:
  ctype='tap' if model=='evaporation' else 'click'
  def click(sel):getattr(q.locator(sel),ctype)()
  q.goto(BASE+'#lab/ch1/1.2/'+task);q.wait_for_selector('.wb-atlas')
  parts=q.evaluate('(id)=>WaterBathAtlas.load(id).then(d=>d.parts)',model)
  for part in parts:click('[data-wb-card="'+part['id']+'"]');click('[data-wb=close]')
  click('.wb-page-header [data-wb=build]');q.wait_for_selector('.ag-origin')
  q.evaluate('window.successBursts=0;document.addEventListener("animationstart",e=>{if(e.animationName==="ag-success-burst")window.successBursts++})')
  sequence=['stand','tripod','gas-burner','wire-gauze','beaker','water','boss-clamp','clamp-arm','test-tube','secure-tube','alcohol','thermometer','valve','match'] if model=='water-bath' else [part['id'] for part in parts]
  for id in sequence:
   if id in ['secure-tube','valve','match']:click('[data-ag-action]')
   else:click('[data-ag-part="'+id+'"]');click('[data-ag-target]')
  q.wait_for_selector('.ag-step-hint.is-success');q.wait_for_function('window.successBursts>0')
  q.wait_for_function('(()=>{const r=document.querySelector(".ag-step-hint").getBoundingClientRect(),h=document.querySelector(".wb-page-header").getBoundingClientRect();return r.top>=h.bottom&&r.bottom<=innerHeight})()')
  assert q.locator('.ag-step-hint.is-success').inner_text()=='Установка успешно собрана!'
  q.wait_for_timeout(1400);assert q.locator('.ag-celebrating').count()==0
  xp=q.evaluate('CourseGame.xp()')
  for lang in ['en','uz-Latn','uz-Cyrl','ru']:
   q.locator('#language').select_option(lang);q.wait_for_selector('.ag-step-hint.is-success')
   assert q.locator('.ag-step-hint.is-success').inner_text()==q.evaluate('WaterBathAtlas.t("complete")')
   assert q.locator('.ag-celebrating').count()==0
  click('[data-wb=ag-undo]');assert q.locator('.ag-step-hint.is-success').count()==0
  click('[data-wb=ag-redo]');q.wait_for_selector('.ag-step-hint.is-success');assert q.evaluate('CourseGame.xp()')==xp
  q.set_viewport_size({'width':360,'height':800});q.locator('.ag-step-hint').scroll_into_view_if_needed();q.wait_for_timeout(150)
  hint=q.locator('.ag-step-hint').bounding_box();origin=q.locator('.ag-origin').bounding_box();assert hint['y']+hint['height']<=origin['y']+2
  q.screenshot(path=str(OUT/(model+'-mobile.png')))
  q.emulate_media(reduced_motion='reduce');click('[data-wb=ag-undo]');click('[data-wb=ag-redo]')
  assert q.locator('.ag-celebrating').count()==0
  assert q.locator('.ag-success-particles').evaluate('(e)=>getComputedStyle(e).display')=='none'
  assert q.locator('.ag-step-hint.is-success').is_visible()
  click('[data-wb=ag-restart]');assert q.locator('.ag-step-hint.is-success').count()==0
  assert q.evaluate('CourseGame.xp()')==xp
  q.set_viewport_size({'width':1366,'height':768});q.emulate_media(reduced_motion='no-preference')
  print('PASS',model,'success/animation/four locales/undo/redo/restart/mobile/reduced motion/XP unchanged',flush=True)
 assert not errors,errors
 b.close()
