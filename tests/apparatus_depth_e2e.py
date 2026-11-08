"""The depth slider moves the actual tube, secure commits it, and hints stay clear."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/depth1418');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for touch in [False,True]:
  c=b.new_context(viewport={'width':360 if touch else 1366,'height':800 if touch else 768},has_touch=touch,is_mobile=touch,reduced_motion='reduce')
  for domain in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+domain+'/**',lambda r:r.fulfill(status=200,body=''))
  q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
  register_local(q,BASE,'Depth '+('touch' if touch else 'mouse'))
  q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
  q.goto(BASE+'#lab/ch1/1.2/task-2');q.wait_for_selector('.wb-atlas')
  parts=q.evaluate('WaterBathAtlas.load().then(d=>d.parts)')
  click=lambda selector:getattr(q.locator(selector),'tap' if touch else 'click')()
  for part in parts:click('[data-wb-card="'+part['id']+'"]');click('[data-wb=close]')
  click('.wb-page-header [data-wb=build]');q.wait_for_selector('.ag-origin')
  for id in ['stand','tripod','gas-burner','wire-gauze','beaker','water','boss-clamp','clamp-arm','test-tube']:
   click('[data-ag-part="'+id+'"]');click('[data-ag-target]')
  q.wait_for_selector('[data-ag-depth]:visible');q.wait_for_timeout(100)
  def tube_y():return q.locator('[data-ag-frame=test-tube]').evaluate('(e)=>(e.getBoundingClientRect().top-e.parentElement.getBoundingClientRect().top)/e.parentElement.getBoundingClientRect().height*100')
  baseline=tube_y();attachments=q.locator('[data-ag-frame=clamp-arm],[data-ag-frame=boss-clamp],[data-ag-frame=thermometer]').evaluate_all('es=>es.map(e=>parseFloat(e.style.top))');slider=q.locator('[data-ag-depth]');slider.focus();q.keyboard.press('Home');assert tube_y()<baseline-5
  click('[data-ag-action]');assert not q.evaluate('ApparatusProgress.data("water-bath").assembly.actions.includes("secure-tube")')
  slider.scroll_into_view_if_needed();r=slider.bounding_box();x=8+(r['width']-16)*.4
  if touch:slider.tap(position={'x':x,'y':r['height']/2})
  else:q.mouse.click(r['x']+x,r['y']+r['height']/2)
  value=int(slider.input_value());assert 35<=value<=45,value
  moved=tube_y();assert moved>baseline+1
  after=q.locator('[data-ag-frame=clamp-arm],[data-ag-frame=boss-clamp],[data-ag-frame=thermometer]').evaluate_all('es=>es.map(e=>parseFloat(e.style.top))')
  assert all(abs((y-x)-(moved-baseline))<.1 for x,y in zip(attachments,after))
  assert q.locator('[data-ag-depth-value]').inner_text()==str(value)+'%'
  q.screenshot(path=str(OUT/(('touch' if touch else 'mouse')+'-depth.png')))
  click('[data-ag-action]');assert abs(tube_y()-moved)<.1
  assert q.evaluate('state.intro.lesson12.setup.workshop.run.tubePercent')==value
  click('[data-wb=ag-undo]');assert q.locator('[data-ag-depth]').is_visible();assert int(q.locator('[data-ag-depth]').input_value())==value
  click('[data-wb=ag-redo]');assert abs(tube_y()-moved)<.1
  if touch:click('.workspace-header-menu summary')
  click('#languageToggle');click('#languagePanel [data-dropdown-index="3"]');q.wait_for_selector('[data-ag-part=alcohol]');assert q.locator('html').get_attribute('lang')=='en'
  assert abs(tube_y()-moved)<.1
  for width,height in [(360,800),(768,1024),(1366,768),(1920,1080)]:
   q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(150)
   hint=q.locator('[data-ag-step-hint]').bounding_box();origin=q.locator('.ag-origin').bounding_box()
   if width<768:assert hint['y']+hint['height']<=origin['y']+2,(hint,origin)
   else:assert hint['x']+hint['width']<origin['x']+2,(hint,origin)
  q.set_viewport_size({'width':360 if touch else 1366,'height':800 if touch else 768})
  for id in ['alcohol','thermometer']:click('[data-ag-part="'+id+'"]');click('[data-ag-target]')
  for _ in range(2):click('[data-ag-action]')
  assert q.evaluate('ApparatusProgress.data("water-bath").assembly.done')
  assert abs(tube_y()-moved)<.1
  assert q.locator('[data-ag-frame=test-tube]').evaluate('(e)=>getComputedStyle(e).opacity')=='1'
  assert q.locator('.ag-full').evaluate('(e)=>getComputedStyle(e).opacity')=='0'
  assert q.locator('[data-ag-step-hint]').is_hidden()
  xp=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('.ag-origin');assert q.evaluate('CourseGame.xp()')==xp
  assert q.locator('.ag-frame.is-placed').count()==0
  assert not errors,errors
  print('PASS',('touch' if touch else 'mouse'),'live depth/secure/legacy state/undo/language/thermometer/completion/left hint in four viewports/no errors',flush=True)
  c.close()
 b.close()
