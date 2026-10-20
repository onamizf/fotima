"""Real WebGL specimen/tool study and static-render fallback; no chemistry grades from camera controls."""
import hashlib,json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8028/')
errors=[];bad=[];layouts=0
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 ctx=b.new_context(viewport={'width':1366,'height':1000});ctx.route('**/src/cloud-config.js',lambda r:r.fulfill(content_type='application/javascript',body='window.FOTIMA_CLOUD_CONFIG={enabled:false};'))
 q=ctx.new_page();q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);q.goto(BASE+'#theory/properties');q.wait_for_function('window.specimenViewerInfo?.ready===true')
 assert q.locator('[data-specimen-select]').count()==12;assert q.locator('.specimen-salt').count()==0
 assert not q.locator('.glossary').get_attribute('open');assert not q.locator('.lesson-explanation').get_attribute('open')
 observed=q.evaluate('JSON.stringify(state.investigation)');answers=q.evaluate('JSON.stringify(currentLesson("properties").answers)');hashes=set()
 for sample in q.evaluate('sampleIds'):
  q.locator(f'[data-specimen-select="{sample}"]').click();q.wait_for_function('(id)=>window.specimenViewerInfo?.sample===id && window.specimenViewerInfo.ready',arg=sample)
  assert q.locator('canvas').count()==1
  hashes.add(hashlib.sha256(q.locator('.specimen-canvas canvas').screenshot()).hexdigest())
  assert q.evaluate('JSON.stringify(state.investigation)')==observed
  assert q.evaluate('JSON.stringify(currentLesson("properties").answers)')==answers
 assert len(hashes)==12
 angle=q.evaluate('specimenViewerInfo.angle');q.locator('[data-specimen-camera=left]').click();assert q.evaluate('specimenViewerInfo.angle')!=angle
 q.locator('[data-specimen-select=copper]').click();q.reload();q.wait_for_function('window.specimenViewerInfo?.sample==="copper" && window.specimenViewerInfo.ready')
 assert q.locator('[data-specimen-select=copper]').get_attribute('aria-pressed')=='true'
 q.locator('.lesson-explanation summary').click();assert q.locator('.lesson-explanation p').count()>0
 q.locator('.study-equipment-link').click();q.wait_for_function('window.specimenViewerInfo?.kind==="equipment" && window.specimenViewerInfo.ready')
 assert q.locator('[data-equipment-select]').count()==7
 for tool in q.evaluate('equipmentSamples.map(row=>row[0])'):
  q.locator(f'[data-equipment-select="{tool}"]').click();q.wait_for_function('(id)=>window.specimenViewerInfo?.sample===id && window.specimenViewerInfo.ready',arg=tool)
  assert q.locator('.specimen-canvas canvas').count()==1
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.select_option('#language',lang)
  for width in [320,375,768,1366]:
   q.set_viewport_size({'width':width,'height':1000})
   for route in ['theory/properties','materials/properties']:
    q.goto(BASE+'#'+route);q.wait_for_function('window.specimenViewerInfo?.ready===true')
    assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,width,route)
    assert 'undefined' not in q.locator('#main').inner_text();layouts+=1
 q.select_option('#language','ru')
 for route,name in [('theory/properties','specimens'),('materials/properties','equipment')]:
  q.goto(BASE+'#'+route);q.wait_for_function('window.specimenViewerInfo?.ready===true')
  for width in [375,768,1366]:
   q.set_viewport_size({'width':width,'height':1000});q.wait_for_timeout(150);q.screenshot(path=str(ROOT/f'artifacts/study-{name}-{width}.png'),full_page=True)
 # Respect the persisted schematic/image preference without losing model selection.
 q.goto(BASE+'#theory/properties');q.evaluate("state.settings.viewMode='2d';saveState();render(false)")
 assert q.locator('[data-specimen-preview]').get_attribute('data-renderer')=='image'
 q.evaluate("state.settings.viewMode='3d';saveState();render(false)");q.wait_for_function('window.specimenViewerInfo?.ready===true')
 # A lost context must retain the current selected sample and working image controls.
 q.goto(BASE+'#theory/properties');q.wait_for_function('window.specimenViewerInfo?.ready===true');q.locator('[data-specimen-select=salt]').click()
 q.evaluate("document.querySelector('.specimen-canvas canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))")
 assert q.locator('[data-specimen-preview]').get_attribute('data-renderer')=='image';q.locator('[data-specimen-select=water]').click();assert q.locator('.specimen-fallback').is_visible()
 assert q.locator('.specimen-fallback').get_attribute('src').endswith('/water.webp')
 # Without WebGL, all 19 rendered study assets remain available.
 fb=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);fc=fb.new_context();fc.route('**/src/cloud-config.js',lambda r:r.fulfill(content_type='application/javascript',body='window.FOTIMA_CLOUD_CONFIG={enabled:false};'));r=fc.new_page();r.goto(BASE+'#theory/properties')
 assert r.locator('.specimen-fallback').is_visible();r.locator('[data-specimen-select=iodine]').click();assert r.locator('.specimen-fallback').get_attribute('src').endswith('/iodine.webp')
 r.goto(BASE+'#materials/properties');r.locator('[data-equipment-select=scale]').click();assert r.locator('.specimen-fallback').get_attribute('src').endswith('/scale.webp')
 for group,ids in [('specimens',q.evaluate('sampleIds')),('equipment',q.evaluate('equipmentSamples.map(row=>row[0])'))]:
  for item in ids:assert q.request.get(BASE+f'assets/{group}/{item}.webp').status==200
 assert not errors,errors;assert not bad,bad
 result={'status':'passed','renderer':'Real WebGL through Chromium SwiftShader','specimens':12,'equipment':7,'unique_specimen_canvas_images':len(hashes),'layout_checks':layouts,'languages':4,'checks':['real selectable specimen and equipment geometry','one reused study canvas','camera and library selection never mark observations or answers complete','sample selection survives reload','explanation and glossary remain available','context loss and no-WebGL use real render fallback','all 19 WebP assets load'],'page_errors':errors,'failed_resources':bad,'limits':'Illustrative macroscopic shapes, not atomic lattices or measured microscopy; not physical mobile GPU testing'}
 (ROOT/'artifacts/study3d-validation.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2));fb.close();b.close()
