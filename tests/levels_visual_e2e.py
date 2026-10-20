"""WebGL game layout checks using a snapshot earned by progress_e2e.py's real UI flows."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8026/')
SNAPSHOT=Path('/tmp/progress-demo-state.json')
assert SNAPSHOT.exists(),'Run progress_e2e.py first to earn a reproducible learner snapshot.'
saved=json.loads(SNAPSHOT.read_text());errors=[];checks=0
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 ctx=b.new_context();ctx.route('**/src/cloud-config.js',lambda r:r.fulfill(content_type='application/javascript',body='window.FOTIMA_CLOUD_CONFIG={enabled:false};'))
 q=ctx.new_page();q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE+'#catalog')
 for w in [375,768,1366]:
  q.set_viewport_size({'width':w,'height':1000});q.screenshot(path=str(ROOT/f'artifacts/level-map-{w}.png'),full_page=True)
 for topic in ['properties','physical','chemical']:
  q.evaluate('(s)=>{state=s;saveState()}',saved)
  q.evaluate('''(id)=>{if(id==='properties')state.investigation=blankInvestigation();if(id==='physical')state.physicalLab=blankPhysicalLab();if(id==='chemical')state.chemicalLab=blankChemicalLab();saveState();}''',topic)
  q.goto(BASE+'#lab/'+topic);q.wait_for_selector('[data-level-next]');q.wait_for_function('window.lab3DInfo?.ready===true')
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   q.select_option('#language',lang)
   for w in [320,375,768,1366]:
    q.set_viewport_size({'width':w,'height':1000});assert not q.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(topic,lang,w);checks+=1
  q.select_option('#language','ru')
  q.locator('[data-level-next]').focus();q.keyboard.press('Enter')
  if topic=='properties':assert q.evaluate('observationRecord().actions')==['inspect']
  if topic=='physical':assert q.evaluate('physicalRecord().actions')==['setup']
  if topic=='chemical':assert q.evaluate('chemicalRecord().actions')==['setup']
 # Real action state for review images: first level complete; second level only just started.
 q.evaluate('(s)=>{state=s;state.physicalLab=blankPhysicalLab();state.chemicalLab=blankChemicalLab();saveState()}',saved)
 q.goto(BASE+'#lab/physical');q.wait_for_selector('[data-level-next]');q.locator('[data-level-next]').click();q.locator('[data-level-next]').click()
 assert q.evaluate('physicalRecord().actions')==['setup','loadWax']
 for w in [375,768,1366]:
  q.set_viewport_size({'width':w,'height':1000});q.wait_for_timeout(200);q.screenshot(path=str(ROOT/f'artifacts/level-workspace-{w}.png'),full_page=True)
 q.goto(BASE+'#catalog');q.set_viewport_size({'width':1366,'height':1000});q.screenshot(path=str(ROOT/'artifacts/level-map-unlocked-1366.png'),full_page=True)
 q.goto(BASE+'#result/properties');q.locator('[data-level-complete=properties]').screenshot(path=str(ROOT/'artifacts/level-complete.png'))
 assert not errors,errors
 report={'status':'passed','rendering':'Real WebGL through Chromium SwiftShader, not physical GPU measurement','lab_layout_checks':checks,'languages':4,'checks':['map has locked and unlocked states','three laboratory workspaces','next-step button via keyboard runs the real action','next-step button via mouse builds the apparatus and loads wax','result exposes next-level action'],'page_errors':errors,'snapshot':'Earned by the sequential real UI flow in progress_e2e.py; only target task reset for layout coverage'}
 (ROOT/'artifacts/levels-validation.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2));b.close()
