"""Study gate, ordered assembly and accessible labels for task 3; no new XP tariff."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
from pathlib import Path
OUT=Path('/workspace/work/water-assets/checks');OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},reduced_motion='reduce')
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' or m.type=='warning' and ('frame mismatch' in m.text or 'frame changed' in m.text) else None)
 register_local(q,BASE,'Evaporation learner')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 q.goto(BASE+'#lab/ch1/1.2/task-3');q.wait_for_selector('.wb-atlas');assert q.locator('.wb-card').count()==7
 xp=q.evaluate('CourseGame.xp()')
 assert q.locator('[data-wb=build]').first.is_disabled();assert q.locator('[data-wb=labels]').is_disabled()
 for i,id in enumerate(['tripod','gas-burner','wire-gauze','beaker','evaporating-dish']):
  q.locator('[data-wb-card="'+id+'"]').click();q.keyboard.press('Escape')
  assert q.locator('[data-wb=build]').first.is_enabled()==(i==4)
 assert q.locator('[data-wb-card=beaker] b').inner_text()=='4'
 q.reload();q.wait_for_selector('.wb-atlas');assert q.locator('[data-wb=build]').first.is_enabled()
 q.locator('[data-wb=build]').first.click();q.wait_for_selector('[data-ag-part=tripod]')
 # Wrong order does not advance; placement is still checked against the original % frame.
 q.locator('[data-ag-part=beaker]').click();q.locator('[data-ag-target]').click();assert q.evaluate('ApparatusProgress.data("evaporation").assembly.placed.length')==0
 for id in ['tripod','gas-burner','wire-gauze','beaker','evaporating-dish']:
  q.locator('[data-ag-part="'+id+'"]').click();q.locator('[data-ag-target]').click()
  if id=='tripod':
   q.locator('[data-wb=ag-undo]').click();assert q.evaluate('ApparatusProgress.data("evaporation").assembly.placed.length')==0;q.locator('[data-wb=ag-redo]').click()
 assert q.evaluate('ApparatusProgress.data("evaporation").assembly.done')
 assert q.locator('[data-wb=labels]').first.is_enabled()
 frame_check=q.locator('[data-ag-frame]').evaluate_all('es=>es.map(e=>{const r=e.getBoundingClientRect(),p=e.parentElement.getBoundingClientRect();return {id:e.dataset.agFrame,w:r.width,h:r.height,ew:parseFloat(e.style.width)/100*p.width,eh:parseFloat(e.style.height)/100*p.height}})')
 for f in frame_check:assert abs(f['w']-f['ew'])<1 and abs(f['h']-f['eh'])<1,f
 q.screenshot(path=str(OUT/'evaporation-assembly.png'))
 q.locator('[data-wb=labels]').first.click();q.wait_for_selector('.al-field');assert q.locator('[data-al-given]').count()==2
 q.locator('[data-al-field=a]').click();q.locator('[data-al-chip=tripod]').click();q.locator('[data-wb=al-check]').click();assert q.locator('.al-field.is-wrong').count()>=1
 for l,id in [('a','beaker'),('b','tripod'),('c','evaporating-dish'),('d','gas-burner')]:
  q.locator('[data-al-field="'+l+'"]').focus();q.keyboard.press('Enter');q.locator('[data-al-chip="'+id+'"]').focus();q.keyboard.press('Enter')
 q.locator('[data-wb=al-check]').click();assert q.locator('.al-field.is-correct').count()==4
 assert q.evaluate('ApparatusProgress.data("evaporation").labels.complete')
 assert q.evaluate('CourseGame.xp()')==xp
 q.screenshot(path=str(OUT/'evaporation-labels.png'))
 q.reload();q.wait_for_selector('.al-field');assert q.locator('[data-wb-label-page]').get_attribute('data-complete')=='true'
 q.locator('[data-wb=study]').click();assert q.locator('[data-wb-card=beaker] b').inner_text()=='a'
 for width,height in [(360,800),(390,844),(768,1024),(1920,1080)]:
  q.set_viewport_size({'width':width,'height':height});q.locator('[data-wb=labels]').first.click();q.wait_for_timeout(100);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth');q.screenshot(path=str(OUT/('evaporation-labels-'+str(width)+'.png')));q.locator('[data-wb=study]').click()
 q.goto(BASE+'?debug=1#lab/ch1/1.2/task-3');q.wait_for_selector('.wb-debug');q.locator('[data-wb=copy]').click();q.wait_for_selector('[data-wb-json]:not([hidden])');assert 'evaporation' in q.locator('[data-wb-json]').input_value()
 q.goto(BASE+'#topic/ch1/1.2');q.wait_for_selector('[data-project-open]');assert q.locator('[data-project-open]').count()==3;assert '✓' in q.locator('[data-project-open]').last.inner_text()
 assert not errors,errors
 print('PASS task3 JSON/shared assets/all-parts gate/ordered snaps/undo/unchanged frames/wrong labels/keyboard correct labels/progress/no XP/responsive/debug/hub completion/no console errors')
 b.close()
