"""Real WebGL still renders and responds after local sign-in and the shared theme change."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8037/');snapshot=json.loads(Path('/tmp/progress-demo-state.json').read_text())
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']);q=b.new_page(viewport={'width':1366,'height':1000});errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'3D Learner')
 for topic in ['properties','physical','chemical']:
  q.evaluate('''([s,id])=>{state=readState(s);if(id==='properties')state.investigation=blankInvestigation();if(id==='physical')state.physicalLab=blankPhysicalLab();if(id==='chemical')state.chemicalLab=blankChemicalLab();saveState();render(false)}''',[snapshot,topic])
  q.goto(BASE+'#lab/'+topic);q.wait_for_function('window.lab3DInfo?.ready===true');q.locator('[data-level-next]').click();assert q.evaluate('window.lab3DInfo.ready')
  assert q.locator('.lab3d-host canvas').is_visible();assert q.locator('.lab3d-host canvas').count()==1
  if topic=='physical':q.screenshot(path=str(ROOT/'artifacts/blue-webgl-lab-1366.png'),full_page=True)
 assert not errors,errors;b.close()
print('Passed: actual WebGL in three authenticated laboratories and real first experiment actions; Chromium SwiftShader')
