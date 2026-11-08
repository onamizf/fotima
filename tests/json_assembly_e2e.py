"""Both assemblies use JSON slots, direct cards and ephemeral attempts; native bath XP survives."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
from pathlib import Path
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/json-assembly');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for touch in [False,True]:
  c=b.new_context(viewport={'width':390 if touch else 1366,'height':844 if touch else 768},has_touch=touch,is_mobile=touch,reduced_motion='reduce')
  c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
  q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
  register_local(q,BASE,'JSON learner '+('touch' if touch else 'mouse'))
  q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
  click=lambda selector:getattr(q.locator(selector),'tap' if touch else 'click')()
  for task,model in [('task-2','water-bath'),('task-3','evaporation')]:
   q.goto(BASE+'#lab/ch1/1.2/'+task);q.wait_for_selector('.wb-atlas')
   parts=q.evaluate('(id)=>WaterBathAtlas.load(id).then(d=>d.parts)',model)
   for part in parts:click('[data-wb-card="'+part['id']+'"]');click('[data-wb=close]')
   click('.wb-page-header [data-wb=build]');q.wait_for_selector('.ag-origin')
   initial=q.evaluate('CourseGame.xp()');assert q.locator('.ag-frame.is-placed').count()==0
   assert q.locator('.ag-tray img').count()==(19 if model=='water-bath' else 7)
   q.wait_for_function('Array.from(document.querySelectorAll(".ag-tray img")).every(i=>i.complete&&i.naturalWidth>0)')
   for part in parts:
    actual=q.locator('[data-ag-part="'+part['id']+'"] img').evaluate('(e)=>e.currentSrc')
    assert part['card'] in actual,(part,actual)
   # Wrong-order selection returns to the panel and counts one error.
   click('[data-ag-part="'+parts[-1]['id']+'"]');click('[data-ag-target]');assert q.evaluate('(m)=>ApparatusProgress.data(m).assembly.errors',model)==1
   click('[data-wb=ag-restart]');assert q.evaluate('(m)=>ApparatusProgress.data(m).assembly.errors',model)==0
   if model=='water-bath':sequence=['stand','tripod','gas-burner','wire-gauze','beaker','water','boss-clamp','clamp-arm','test-tube','secure-tube','alcohol','thermometer','valve','match']
   else:sequence=[p['id'] for p in parts]
   for i,id in enumerate(sequence):
    if id in ['secure-tube','valve','match']:click('[data-ag-action]')
    else:
     if i==0 and not touch:
      card=q.locator('[data-ag-part="'+id+'"]');card.scroll_into_view_if_needed();cr=card.bounding_box();fr=q.locator('[data-ag-frame="'+id+'"]').bounding_box();q.mouse.move(cr['x']+cr['width']/2,cr['y']+cr['height']/2);q.mouse.down();q.mouse.move(fr['x']+fr['width']/2,fr['y']+fr['height']/2,steps=12);q.mouse.up()
     else:click('[data-ag-part="'+id+'"]');click('[data-ag-target]')
    if i==0:
     saved=q.evaluate('JSON.parse(localStorage.getItem(STORAGE_KEY))');assert 'assembly' not in saved['intro']['lesson12']['apparatus'][model]
     if model=='water-bath':assert 'run' not in saved['intro']['lesson12']['setup']['workshop']
     click('[data-wb=ag-undo]');assert q.locator('.ag-frame.is-placed').count()==0;click('[data-wb=ag-redo]');assert q.locator('.ag-frame.is-placed').count()==1
   assert q.evaluate('(m)=>ApparatusProgress.data(m).assembly.done',model)
   assert q.locator('[data-ag-step-hint].is-success').inner_text()==q.evaluate('WaterBathAtlas.t("complete")')
   assert q.locator('.ag-full').evaluate('(e)=>getComputedStyle(e).opacity')=='1'
   if model=='water-bath':
    assert q.evaluate('Practical12AssemblyData.validCompletion(state.intro.lesson12.setup.workshop.completion)')
    assert q.evaluate('CourseGame.xp()')-initial==42 # study 15 XP was already awarded
    assert q.locator('[data-ag-heat],[data-ag-temperature]').count()==0
   else:assert q.evaluate('CourseGame.xp()')==initial
   earned=q.evaluate('CourseGame.xp()')
   if not touch:
    for width,height in [(360,800),(768,1024),(1366,768),(1920,1080)]:
     q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(70)
     frames=q.locator('[data-ag-frame]').evaluate_all('es=>es.map(e=>{const r=e.getBoundingClientRect(),p=e.parentElement.getBoundingClientRect();return {w:r.width,h:r.height,ew:parseFloat(e.style.width)/100*p.width,eh:parseFloat(e.style.height)/100*p.height}})')
     assert all(abs(f['w']-f['ew'])<1 and abs(f['h']-f['eh'])<1 for f in frames)
     assert q.locator('.wb-page').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
     q.screenshot(path=str(OUT/(model+'-'+str(width)+'.png')))
   q.reload();q.wait_for_selector('[data-ag-part="'+parts[0]['id']+'"]')
   assert q.locator('.ag-frame.is-placed').count()==0
   assert q.evaluate('(m)=>ApparatusProgress.data(m).assembly.errors',model)==0
   assert q.evaluate('CourseGame.xp()')==earned
   q.goto(BASE+'?debug=1#lab/ch1/1.2/'+task);q.wait_for_selector('.wb-debug');click('.wb-page-header [data-wb=build]');q.wait_for_selector('.ag-debug');assert q.locator('.ag-debug-name').count()==len(parts)
  assert not errors,errors
  print('PASS',('touch' if touch else 'mouse'),'JSON slots/cards/actions/native XP/empty restart and reload/no saved partial state/debug/responsive/console',flush=True)
  c.close()
 b.close()
