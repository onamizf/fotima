"""Atlas, calibration, responsive cards and legacy workshop regression."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
OUT=Path('/workspace/work/water-assets/checks');OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader'])
 c=b.new_context(viewport={'width':1366,'height':768},device_scale_factor=.75,reduced_motion='reduce')
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 c.route('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',lambda r:r.fulfill(path='assets/vendor/setup-r128/three.min.js',content_type='application/javascript'));c.route('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',lambda r:r.fulfill(path='assets/vendor/setup-r128/gsap.min.js',content_type='application/javascript'))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' or m.type=='warning' and ('frame mismatch' in m.text or 'frame changed' in m.text) else None)
 register_local(q,BASE,'Water Atlas Learner')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 q.goto(BASE+'#lab/ch1/1.2/task-2');q.wait_for_selector('.wb-atlas')
 assert q.locator('.wb-card').count()==11;assert q.locator('.wb-part').count()==9
 assert q.locator('[data-wb=build]').first.is_disabled()
 q.locator('[data-wb=toggle]').click();q.wait_for_function('state.intro.lesson12.setup.explodedOnce')
 assert q.locator('.wb-atlas').evaluate('(e)=>e.classList.contains("is-labeled")')
 for width,height in [(360,800),(390,844),(768,1024),(1366,768),(1920,1080),(2560,1440)]:
  q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(200)
  q.screenshot(path=str(OUT/('study-'+str(width)+'.png')),full_page=True)
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  columns=q.locator('.wb-card-grid').evaluate('(e)=>getComputedStyle(e).gridTemplateColumns.split(" ").length')
  assert columns==(2 if width<650 else 3 if width<800 else 4 if width<1100 else 5 if width<1600 else 6),(width,columns)
  boxes=q.locator('.wb-part').evaluate_all('bs=>bs.map(b=>({id:b.dataset.wbPart,r:b.getBoundingClientRect().toJSON()}))');scene=q.locator('.wb-atlas-scene').bounding_box()
  if width<600:
   for box in boxes:assert box['r']['left']>=scene['x']-1 and box['r']['right']<=scene['x']+scene['width']+1,(width,box)
 q.set_viewport_size({'width':1366,'height':768})
 for id in ['stand','tripod','gas-burner','wire-gauze','beaker','boss-clamp','clamp-arm','test-tube','thermometer','alcohol','water']:
  q.locator('[data-wb-card="'+id+'"]').click();q.wait_for_selector('.wb-detail:not([hidden])');assert q.locator('.wb-detail li').count()>=2;q.keyboard.press('Escape');assert q.locator('.wb-detail').is_hidden()
 assert q.evaluate('state.intro.lesson12.setup.visited.length')==9
 assert q.evaluate('Setup12Data.proofValid(state.intro.lesson12.setup.proof)')
 q.reload();q.wait_for_selector('.wb-atlas');assert q.locator('[data-wb=build]').first.is_enabled()
 # The legacy workshop retains its exact event targets, action checks, undo and heat flow.
 q.locator('[data-wb=build]').first.click();q.wait_for_selector('[data-workshop-card=stand]:enabled',timeout=60000)
 for key in ['stand','burner','tripod','gauze','beaker','water-bottle','clamp','tube']:
  q.locator('[data-workshop-card="'+key+'"]').click();q.locator('[data-workshop-target]').click()
  if key=='stand':
   q.locator('[data-pw-tool=undo]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.actions.length===0');q.locator('[data-pw-tool=redo]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.actions.length===1')
  if key=='tube':q.locator('[data-workshop-depth]').fill('30');q.locator('[data-workshop-depth]').dispatch_event('input');q.locator('[data-workshop-secure]').click()
 for key in ['alcohol-bottle','thermometer']:q.locator('[data-workshop-card="'+key+'"]').click();q.locator('[data-workshop-target]').click()
 q.wait_for_selector('.wb-skin-frame[data-skin-role=placed]:not([hidden])',state='attached');q.screenshot(path=str(OUT/'assembly-parts.png'))
 frames=q.locator('.wb-skin-frame[data-skin-role=placed]:not([hidden])').evaluate_all('bs=>bs.map(b=>({id:b.dataset.skinId,before:JSON.parse(b.dataset.frameBefore),after:JSON.parse(b.dataset.frameAfter),r:{width:b.getBoundingClientRect().width,height:b.getBoundingClientRect().height}}))')
 assert len(frames)==8,len(frames)
 for frame in frames:
  for k in ['left','top','width','height']:assert abs(frame['before'][k]-frame['after'][k])<.01,frame
  for k in ['width','height']:assert abs(frame['r'][k]-frame['before'][k])<1,frame
 assert q.locator('.wb-complete-apparatus').is_visible();assert q.locator('.wb-complete-apparatus picture').evaluate('(e)=>e.style.clipPath')!='none'
 q.locator('[data-workshop-valve]').click();q.locator('[data-workshop-match]').click();q.locator('[data-workshop-target]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.done')
 q.wait_for_selector('.wb-complete-apparatus:not([hidden])');assert q.locator('.wb-complete-apparatus img').evaluate('(e)=>e.currentSrc.includes("/water-bath/full.webp")');assert q.locator('.workshop-render canvas').evaluate('(e)=>getComputedStyle(e).opacity')=='0';q.screenshot(path=str(OUT/'assembly.png'))
 print('PASS connected apparatus uses the supplied full image',flush=True)
 q.locator('[data-pw-start]').click();q.wait_for_function('document.querySelector("[data-workshop-temperature]").textContent.includes("60")',timeout=15000)
 xp=q.evaluate('CourseGame.xp()');q.locator('[data-pw-mode=study]').click();q.wait_for_selector('.wb-atlas');assert q.locator('.pw-editor').count()==0
 q.reload();q.wait_for_selector('.wb-atlas');assert q.evaluate('state.intro.lesson12.setup.workshop.run.done');assert q.evaluate('CourseGame.xp()')==xp
 q.locator('[data-wb=build]').first.click();q.wait_for_selector('[data-workshop-card=stand]:enabled',timeout=60000)
 assert q.evaluate('state.intro.lesson12.setup.workshop.run.actions.length')==0
 assert q.evaluate('state.intro.lesson12.setup.workshop.run.errors')==0
 assert q.evaluate('!!state.intro.lesson12.setup.workshop.completion')
 assert q.evaluate('CourseGame.xp()')==xp
 q.locator('[data-workshop-card=stand]').click();q.locator('[data-workshop-target]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.actions.length===1')
 q.reload();q.wait_for_selector('[data-workshop-card=stand]:enabled',timeout=60000)
 assert q.evaluate('state.intro.lesson12.setup.workshop.run.actions.length')==0
 assert q.locator('[data-pw-submit]').is_disabled()
 assert q.evaluate('CourseGame.xp()')==xp
 q.locator('[data-pw-mode=study]').click();q.wait_for_selector('.wb-atlas')
 # Calibration operates on separate JSON rectangles and cannot change assembly dimensions.
 q.goto(BASE+'?debug=1#lab/ch1/1.2/task-2');q.wait_for_selector('.wb-debug');assert q.locator('.wb-atlas-origin picture').evaluate('(e)=>getComputedStyle(e).opacity')=='0.35'
 q.locator('[data-wb-debug-part]').select_option('boss-clamp');q.locator('[data-wb-coordinate=x]').fill('17.5');q.locator('[data-wb-coordinate=x]').dispatch_event('input');q.locator('[data-wb=copy]').click();q.wait_for_selector('[data-wb-json]:not([hidden])');import json
 coords=json.loads(q.locator('[data-wb-json]').input_value());assert next(x for x in coords['parts'] if x['id']=='boss-clamp')['assembled']['x']==17.5
 part=q.locator('.wb-part[data-wb-part=boss-clamp]');part.scroll_into_view_if_needed();r=part.bounding_box();q.mouse.move(r['x']+r['width']/2,r['y']+r['height']/2);q.mouse.down();q.mouse.move(r['x']+r['width']/2+12,r['y']+r['height']/2+8,steps=4);q.mouse.up();q.locator('[data-wb=copy]').click();coords=json.loads(q.locator('[data-wb-json]').input_value());assert next(x for x in coords['parts'] if x['id']=='boss-clamp')['assembled']['x']!=17.5
 q.screenshot(path=str(OUT/'debug.png'))
 assert not errors,errors
 print('PASS atlas/cards/responsive grid/portrait bounds/details/Esc/study proof/saved XP/legacy assembly/undo/heat/debug copy and drag/no console errors',flush=True)
 b.close()
