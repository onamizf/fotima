"""Physical-process demos require all equipment, substances and heating conditions."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/experiments1420');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for touch in [False,True]:
  c=b.new_context(viewport={'width':360 if touch else 1366,'height':800 if touch else 768},has_touch=touch,is_mobile=touch,reduced_motion='no-preference')
  for domain in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+domain+'/**',lambda r:r.fulfill(status=200,body=''))
  q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
  register_local(q,BASE,'Experiment '+('touch' if touch else 'mouse'))
  q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
  def click(sel):getattr(q.locator(sel),'tap' if touch else 'click')()
  for task,model in [('task-2','water-bath'),('task-3','evaporation')]:
   q.goto(BASE+'#lab/ch1/1.2/'+task);q.wait_for_selector('.wb-atlas')
   parts=q.evaluate('(id)=>WaterBathAtlas.load(id).then(d=>d.parts)',model)
   for part in parts:click('[data-wb-card="'+part['id']+'"]');click('[data-wb=close]')
   click('.wb-page-header [data-wb=build]');q.wait_for_selector('.ag-origin')
   assert q.locator('.ag-experiment-active').count()==0
   # Wrong equipment is rejected and both equipment and destination are highlighted.
   click('[data-ag-part="'+parts[-1]['id']+'"]');click('[data-ag-target]')
   assert 'Проверь расположение и соединение оборудования' in q.locator('[data-ag-message]').inner_text()
   assert q.locator('.wb-card.ag-is-error').count()==1
   assert q.locator('.ag-target.ag-is-error').count()==1
   assert q.locator('.ag-experiment-active').count()==0
   click('[data-wb=ag-restart]');assert q.locator('.ag-is-error').count()==0
   sequence=['stand','tripod','gas-burner','wire-gauze','beaker','water','boss-clamp','clamp-arm','test-tube','secure-tube','alcohol','thermometer','valve','match'] if model=='water-bath' else ['tripod','gas-burner','wire-gauze','beaker','water','evaporating-dish','copper-sulfate','valve','match']
   def assemble():
    for id in sequence:
     assert q.locator('.ag-experiment-active').count()==0
     if id in ['secure-tube','valve','match']:
      if id=='secure-tube':
       slider=q.locator('[data-ag-depth]');slider.focus();q.keyboard.press('Home');click('[data-ag-action]')
       assert q.locator('.ag-experiment-active').count()==0
       assert q.locator('[data-ag-depth]').get_attribute('aria-invalid')=='true'
       slider.focus();q.keyboard.press('ArrowRight',delay=10)
       slider.evaluate('e=>{e.value=30;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));}')
      click('[data-ag-action]')
     if id not in ['secure-tube','valve','match']:click('[data-ag-part="'+id+'"]');click('[data-ag-target]')
   assemble();q.wait_for_selector('.ag-experiment-active')
   assert q.locator('.ag-step-hint.is-success').inner_text()=='Оборудование успешно собрано!'
   assert q.evaluate('(id)=>ApparatusProgress.data(id).assembly.experiment.phase',model)=='running'
   q.wait_for_function('(id)=>ApparatusProgress.data(id).assembly.experiment.elapsed>700',arg=model)
   # Reset while a demo is running clears state, visuals, errors and completion.
   click('[data-wb=ag-restart]');assert q.locator('.ag-experiment-active,.is-success,.ag-is-error').count()==0
   assert q.locator('.ag-frame.is-placed').count()==0
   assert q.locator('.ag-experiment-layer svg').count()==0
   assert q.evaluate('(id)=>ApparatusProgress.data(id).completion',model) is None
   assert q.evaluate('(id)=>ApparatusProgress.data(id).assembly.errors',model)==0
   xp=q.evaluate('CourseGame.xp()');assemble();q.wait_for_selector('.ag-experiment-active')
   if not touch:
    q.wait_for_function('(id)=>ApparatusProgress.data(id).assembly.experiment.elapsed>1600',arg=model)
    q.screenshot(path=str(OUT/(model+'-running.png')))
   q.wait_for_function('(id)=>ApparatusProgress.data(id).assembly.experiment.phase==="complete"',arg=model,timeout=20000)
   if model=='water-bath':assert q.locator('.ag-experiment-readout output').inner_text()=='60 °C'
   else:
    assert q.locator('.ag-experiment-crystals').evaluate('(e)=>getComputedStyle(e).opacity')=='1'
    assert q.locator('.ag-evaporating-liquid').evaluate('(e)=>getComputedStyle(e).opacity')=='0'
   q.locator('.ag-stage').scroll_into_view_if_needed();q.screenshot(path=str(OUT/(model+('-touch' if touch else '-desktop')+'-complete.png')))
   assert q.evaluate('CourseGame.xp()')==xp
   click('[data-wb=ag-undo]');assert q.locator('.ag-experiment-active').count()==0
   click('[data-wb=ag-redo]');assert q.locator('.ag-experiment-active').count()==1
   assert q.evaluate('CourseGame.xp()')==xp
   click('[data-wb=ag-restart]');assert q.locator('.ag-experiment-active').count()==0
   print('PASS',model,('touch' if touch else 'desktop'),'conditions/error highlight/physical animation/restart/undo/XP',flush=True)
  assert not errors,errors
  c.close()
 b.close()
