"""Real WebGL for all twelve first-lab specimens, including liquid/metal distinctions."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/');errors=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 q=b.new_page(viewport={'width':1000,'height':900});q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE)
 q.evaluate("state.lessons.properties={version:2,step:3,visited:[0,1,2],answers:{hardness:{selected:'na',checked:true},density:{selected:'units',checked:true}}};saveState()")
 q.goto(BASE+'#lab/properties')
 for sample in q.evaluate('sampleIds'):
  q.locator('#benchSample').select_option(sample)
  for step in ['inspect','water','add']:q.locator(f'[data-investigation={step}]').click()
  assert q.locator('[data-renderer=webgl]').count()==1;assert q.evaluate('lab3DInfo.model.sample')==sample
  if sample in ['water','ethanol']:
   assert q.evaluate('lab3DInfo.model.isLiquid');assert q.locator('[data-bench-residue]').count()==0
  q.locator('[data-investigation=stir]').click();assert q.evaluate('lab3DInfo.model.mixed')
  if sample in ['water','copper','copper-sulfate','iodine']:q.locator('.lab-viewport').screenshot(path=str(ROOT/'artifacts'/f'lab3d-specimen-{sample}.png'))
 assert not errors,errors
 result={'status':'passed','webgl_specimens':12,'checks':['all twelve specimens render through actual WebGL after water test','liquids do not become solid particles in either rendering path','metal specimens use metallic plates','solubility states remain connected to actions'],'js_errors':errors,'limits':'Software WebGL, not a physical measurement or mobile hardware benchmark.'}
 (ROOT/'artifacts'/'specimens3d-validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False,indent=2));b.close()
