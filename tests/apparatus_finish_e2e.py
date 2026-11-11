"""Submit and label flows remain connected to their existing completion/reward proofs."""
import sys
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);c=b.new_context(viewport={'width':360,'height':800},has_touch=True,reduced_motion='reduce')
 for host in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+host+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Finish Apparatus')
 q.evaluate('''()=>{for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 for task,model in [('task-2','water-bath'),('task-3','evaporation')]:
  q.goto(BASE+'#lab/ch1/1.2/'+task);q.wait_for_selector('.wb-atlas');d=q.evaluate('(id)=>WaterBathAtlas.load(id)',model)
  for part in d['parts']:q.locator('[data-wb-card="'+part['id']+'"]').tap();q.locator('[data-wb=close]').tap()
  q.locator('.wb-page-header [data-wb=build]').tap();q.wait_for_selector('.ag-origin')
  title=q.locator('.wb-page-header h1');assert title.bounding_box()['height']<=title.evaluate('e=>parseFloat(getComputedStyle(e).lineHeight)*2')+1
  sequence=['stand','tripod','gas-burner','wire-gauze','beaker','water','boss-clamp','clamp-arm','test-tube','secure-tube','alcohol','thermometer','valve','match'] if model=='water-bath' else ['tripod','gas-burner','wire-gauze','beaker','water','evaporating-dish','copper-sulfate','valve','match']
  for n,id in enumerate(sequence):
   if id in ['secure-tube','valve','match']:q.locator('[data-ag-action]').tap()
   else:q.locator('[data-ag-part="'+id+'"]').tap();q.locator('[data-ag-target]').tap()
   q.wait_for_function('([model,n])=>ApparatusProgress.data(model).assembly.actions.length===n',arg=[model,n+1])
  before=q.evaluate('CourseGame.xp()')
  if model=='water-bath':
   q.locator('[data-wb=ag-submit]').tap();q.wait_for_selector('.project-hub');assert q.evaluate('Practical12AssemblyData.validCompletion(state.intro.lesson12.setup.workshop.completion)');assert q.evaluate('CourseGame.xp()')==before
  else:
   q.locator('.ag-finish [data-wb=labels]').tap();q.wait_for_selector('.al-scene')
   for letter,id in d['labelTask']['answers'].items():q.locator('[data-al-field="'+letter+'"]').tap();q.locator('[data-al-chip="'+id+'"]').tap()
   q.locator('[data-wb=al-check]').tap();assert q.evaluate('ApparatusProgress.data("evaporation").labels.complete');q.reload();q.wait_for_selector('.al-scene');assert q.evaluate('ApparatusProgress.data("evaporation").labels.complete');assert q.evaluate('CourseGame.xp()')==before
  print('PASS',model,'finish button / original progress proof / rewards / mobile title',flush=True)
 assert not errors,errors;b.close()
