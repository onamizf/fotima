"""Both assemblies keep the exact full reference, transient success toast and durable rewards."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/success14113');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},has_touch=True)
 for domain in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+domain+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Assembly Success')
 q.evaluate('''()=>{for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 for task,model in [('task-2','water-bath'),('task-3','evaporation')]:
  def click(selector):
   getattr(q.locator(selector),'tap' if model=='evaporation' else 'click')()
   if selector in ['[data-ag-action]','[data-ag-target]']:q.wait_for_function('document.querySelector("[data-wb-generic-build]").dataset.agBusy==="false"')
  q.goto(BASE+'#lab/ch1/1.2/'+task);q.wait_for_selector('.wb-atlas');parts=q.evaluate('(id)=>WaterBathAtlas.load(id).then(d=>d.parts)',model)
  for part in parts:click('[data-wb-card="'+part['id']+'"]');click('[data-wb=close]')
  click('.wb-page-header [data-wb=build]');q.wait_for_selector('.ag-origin')
  sequence=['stand','tripod','gas-burner','wire-gauze','beaker','water','boss-clamp','clamp-arm','test-tube','secure-tube','alcohol','thermometer','valve','match'] if model=='water-bath' else ['tripod','gas-burner','wire-gauze','beaker','water','evaporating-dish','copper-sulfate','valve','match']
  for id in sequence:
   if id in ['secure-tube','valve','match']:click('[data-ag-action]')
   else:click('[data-ag-part="'+id+'"]');click('[data-ag-target]')
  q.wait_for_selector('.ag-success-toast:not([hidden])');xp=q.evaluate('CourseGame.xp()');q.wait_for_timeout(280)
  assert q.locator('.ag-full').evaluate('e=>getComputedStyle(e).opacity')=='1'
  assert q.locator('.ag-frame').evaluate_all('es=>es.every(e=>getComputedStyle(e).opacity==="0")')
  for lang in ['en','uz-Latn','uz-Cyrl','ru']:
   q.locator('#language').select_option(lang);q.wait_for_selector('[data-ag-built]:visible');assert q.locator('[data-ag-built]').inner_text()==q.evaluate('WaterBathAtlas.t("assembled")');assert q.locator('.ag-celebrating').count()==0
   assert q.evaluate('(id)=>ApparatusProgress.data(id).assembly.done',model)
  q.wait_for_timeout(3100);assert q.locator('.ag-success-toast').is_hidden()
  click('[data-wb=ag-undo]');assert q.locator('[data-ag-built]').is_hidden();assert q.locator('.ag-success-toast').is_hidden()
  click('[data-wb=ag-redo]');q.wait_for_selector('.ag-success-toast:not([hidden])');assert q.evaluate('CourseGame.xp()')==xp
  q.set_viewport_size({'width':360,'height':800});q.locator('.ag-stage').evaluate('e=>e.scrollIntoView({block:"start"})');q.wait_for_timeout(150)
  toast=q.locator('.ag-success-toast').bounding_box();scene=q.locator('.ag-stage').bounding_box();assert toast['y']>=scene['y'] and toast['x']>=scene['x'] and toast['x']+toast['width']<=scene['x']+scene['width']
  q.screenshot(path=str(OUT/(model+'-mobile.png')))
  q.emulate_media(reduced_motion='reduce');click('[data-wb=ag-undo]');click('[data-wb=ag-redo]');assert q.locator('.ag-celebrating').count()==0;assert q.locator('.ag-experiment-finished').count()==1
  click('[data-wb=ag-restart]');assert q.locator('[data-ag-built]').is_hidden();assert q.locator('.ag-success-toast').is_hidden();assert q.evaluate('CourseGame.xp()')==xp
  q.set_viewport_size({'width':1366,'height':768});q.emulate_media(reduced_motion='no-preference')
  print('PASS',model,'full reference / 3s toast / four locales / undo/redo / restart / mobile / reduced motion / XP unchanged',flush=True)
 assert not errors,errors
 b.close()
