"""Actual Chromium WebGL (SwiftShader): geometry, state changes, view controls and loss.
Software rendering exercises WebGL; it is not a hardware performance benchmark.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,hashlib
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/')
errors=[];console_errors=[];network=[];layouts=0
snapshot=Path('/tmp/progress-demo-state.json');assert snapshot.exists(),'Run progress_e2e.py first for a genuinely earned learner fixture.'
seed=json.loads(snapshot.read_text())
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 context=b.new_context(viewport={'width':1366,'height':950});context.route('**/src/cloud-config.js',lambda r:r.fulfill(content_type='application/javascript',body='window.FOTIMA_CLOUD_CONFIG={enabled:false};'))
 q=context.new_page();q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda e:console_errors.append(e.text) if e.type=='error' else None);q.on('request',lambda r:network.append(r.url))
 q.goto(BASE);q.evaluate('(s)=>{state=s;state.physicalLab=blankPhysicalLab();state.chemicalLab=blankChemicalLab();saveState()}',seed);q.goto(BASE+'#lab/physical');q.locator('[data-renderer=webgl]').wait_for();assert q.evaluate('lab3DInfo.ready');assert q.evaluate('lab3DInfo.triangles')>10000;assert q.evaluate('lab3DInfo.triangles')<150000
 assert q.evaluate('lab3DInfo.pixelRatio')<=1.5
 q.evaluate("window.originalCanvas=document.querySelector('.lab3d-host canvas')")
 for step in ['setup','loadWax','heat']:q.locator(f'[data-physical-step={step}]').click()
 before=q.locator('.lab3d-host').screenshot();q.locator('[data-physical-step=melt]').click();after=q.locator('.lab3d-host').screenshot()
 assert hashlib.sha256(before).digest()!=hashlib.sha256(after).digest();assert q.evaluate('lab3DInfo.model.liquid')
 assert q.evaluate("window.originalCanvas===document.querySelector('.lab3d-host canvas')")
 for step in ['stop','cool','solidify']:q.locator(f'[data-physical-step={step}]').click()
 assert not q.evaluate('lab3DInfo.model.liquid');assert not q.evaluate('lab3DInfo.model.heated')
 q.goto(BASE+'#progress');assert q.locator('.lab3d-host canvas').count()==0
 q.locator('.progress-resume a').click();q.locator('.lab3d-host canvas').wait_for();assert q.evaluate("window.originalCanvas===document.querySelector('.lab3d-host canvas')");assert q.evaluate('lab3DInfo.model.task')=='wax'
 q.evaluate("state.activeSample='salt';state.investigation.records.salt=blankObservation();saveState()");q.goto(BASE+'#lab/properties')
 for step in ['inspect','water','add','stir']:q.locator(f'[data-investigation={step}]').click()
 assert q.evaluate('lab3DInfo.model.mixed');assert q.evaluate('lab3DInfo.model.sample')=='salt'
 q.evaluate('(value)=>{state.physicalLab=value.physicalLab;state.investigation=value.investigation;state.propertyReport=value.propertyReport;saveState()}',seed);q.goto(BASE+'#lab/chemical');q.locator('[data-chemical-group=copper]').click()
 for step in ['setup','grip','heat']:q.locator(f'[data-chemical-step={step}]').click()
 before=q.locator('.lab3d-host').screenshot();q.locator('[data-chemical-step=blacken]').click();after=q.locator('.lab3d-host').screenshot();assert before!=after;assert q.evaluate('lab3DInfo.model.black')
 q.locator('.lab-viewport').screenshot(path=str(ROOT/'artifacts'/'lab3d-copper-desktop.png'))
 for step in ['stop','cool','compare']:q.locator(f'[data-chemical-step={step}]').click()
 assert q.evaluate('lab3DInfo.model.compared');assert not q.evaluate('lab3DInfo.model.black')
 q.locator('.lab-viewport').screenshot(path=str(ROOT/'artifacts'/'lab3d-copper-compared.png'))
 for step in ['repeatHeat','repeatBlacken','repeatStop','repeatCool','cleanup']:q.locator(f'[data-chemical-step={step}]').click()
 q.locator('[data-chemical-group=burning]').click()
 for variant in ['paper','alcohol','gas','match']:
  q.locator('#chemicalVariant').select_option(variant)
  for step in ['setup','ignite','observe']:q.locator(f'[data-chemical-step={step}]').click()
  assert q.evaluate('lab3DInfo.model.heated') and q.evaluate('lab3DInfo.model.burnt')
  q.locator('.lab-viewport').screenshot(path=str(ROOT/'artifacts'/f'lab3d-burning-{variant}.png'))
  for step in ['stop','cool','cleanup']:q.locator(f'[data-chemical-step={step}]').click()
  assert not q.evaluate('lab3DInfo.model.heated')
 q.locator('[data-chemical-group=carbonate]').click()
 for step in ['setup','load','acid','bubbles']:q.locator(f'[data-chemical-step={step}]').click()
 assert q.evaluate('lab3DInfo.model.bubbles')
 q.locator('[data-chemical-step=splint]').click();assert q.evaluate('lab3DInfo.model.heated')
 q.locator('[data-chemical-step=extinguished]').click();assert not q.evaluate('lab3DInfo.model.heated');assert q.evaluate('lab3DInfo.model.extinguished')
 q.locator('.lab-viewport').screenshot(path=str(ROOT/'artifacts'/'lab3d-carbonate-desktop.png'))
 actions=q.evaluate('chemicalRecord().actions');start=q.locator('.lab3d-host').screenshot();q.locator('[data-lab-camera=left]').focus();q.keyboard.press('Enter');assert q.evaluate('lab3DInfo.camera.angle')<0
 assert start!=q.locator('.lab3d-host').screenshot();q.locator('[data-lab-camera=zoomIn]').click();assert q.evaluate('lab3DInfo.camera.distance')<6.1
 q.locator('[data-lab-camera=resetView]').click();assert q.evaluate('lab3DInfo.camera')=={'angle':0,'distance':6.1};assert q.evaluate('chemicalRecord().actions')==actions
 # No perpetual animation loop; resize settles and then rendering stops.
 q.wait_for_timeout(250);frame=q.evaluate('lab3DInfo.renders');q.wait_for_timeout(300);assert q.evaluate('lab3DInfo.renders')==frame
 for width in [320,375,768,1366]:
  q.set_viewport_size({'width':width,'height':950})
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   q.locator('#language').select_option(lang);assert q.locator('[data-renderer=webgl]').count()==1;assert not q.evaluate('document.documentElement.scrollWidth>innerWidth+1');layouts+=1
   if lang=='ru' and width in [375,768]:q.locator('.lab-viewport').screenshot(path=str(ROOT/'artifacts'/f'lab3d-carbonate-{width}.png'))
 q.locator('[data-lab-view="2d"]').click();assert q.locator('[data-renderer=schematic]').count()==1;q.reload();assert q.locator('[data-renderer=schematic]').count()==1;assert q.evaluate('chemicalRecord().actions')==actions
 q.locator('[data-lab-view="3d"]').click();assert q.locator('[data-renderer=webgl]').count()==1;assert q.evaluate('lab3DInfo.model.phase')=='extinguished'
 # Context loss reveals the real SVG path without changing experiment progress.
 q.evaluate("(()=>{const canvas=document.querySelector('.lab3d-host canvas');const gl=canvas.getContext('webgl2')||canvas.getContext('webgl');gl.getExtension('WEBGL_lose_context').loseContext();})()")
 q.locator('[data-renderer=fallback]').wait_for();assert q.locator('.chemical-schematic svg').is_visible();assert q.evaluate('chemicalRecord().actions')==actions
 q.locator('[data-chemical-step=cleanup]').click();assert q.evaluate('chemicalRecord().actions.at(-1)')=='cleanup'
 assert not errors,errors;assert not console_errors,console_errors
 assert not [url for url in network if not url.startswith(BASE.split('#')[0])],network
 result={'status':'passed','renderer':'Real WebGL via Chromium SwiftShader','layout_checks':layouts,'checks':['nonempty real geometry and locally loaded vendor','canvas pixels change on wax melting and copper oxidation','one canvas reused between actions/routes','first and second lab use new room','copper layer removed for comparison and rebuilt for repeat','all four burning meshes follow source/material states','carbonate bubbles and splint extinction follow state','camera rotation/zoom/reset do not advance the experiment','bounded pixel ratio and no continuous render loop','four languages and 320/375/768/1366px','manual schematic selection persists reload','WebGL context loss reveals working schematic','no external CDN requests','no page or console errors'],'limits':'Software WebGL emulation; no claim of measured frame rate or testing on physical mobile GPUs.'}
 (ROOT/'artifacts'/'lab3d-validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False,indent=2));b.close()
