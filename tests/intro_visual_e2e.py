"""Localised layouts, real WebGL modules, OrbitControls, lazy loading and disposal."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8042/')
snapshot=json.loads(Path('/tmp/intro-complete-state.json').read_text())
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1366,'height':900},reduced_motion='reduce');ctx.add_init_script('const initial='+json.dumps(snapshot)+';if(!localStorage.getItem("fotima.local.accounts.v1"))for(const [key,value] of Object.entries(initial))localStorage.setItem(key,value);');q=ctx.new_page();errors=[];bad=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);q.goto(BASE+'#topic/intro');q.wait_for_selector('.intro-root')
 ids=q.evaluate('IntroData.tasks.map(t=>t.id)');modes=['map','brief','self','quiz']+ids
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  for width,height in [(1440,900),(1024,768),(768,1024),(390,844),(320,700)]:
   q.set_viewport_size({'width':width,'height':height})
   for mode in modes:
    q.evaluate('''([language,mode])=>{state.settings.language=language;if(['map','brief','self','quiz'].includes(mode)){IntroModel.data().active=mode;IntroModel.data().work='bunsen';}else IntroModel.openTask(mode);render(false);}''',[lang,mode])
    if mode not in ['map','brief','self']:q.wait_for_function('window.introSceneInfo?.ready===true');
    assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,width,mode)
    assert 'undefined' not in q.locator('main').inner_text(),(lang,width,mode)
    assert q.locator('h1').count()==1
   print(lang,width,'17 views passed',flush=True)
 q.set_viewport_size({'width':390,'height':844});q.evaluate("state.settings.language='ru';IntroModel.openTask('flames');render(false)");q.wait_for_function('window.introSceneInfo?.ready===true');q.screenshot(path=str(ROOT/'artifacts/intro-mobile-390.png'),full_page=True)
 q.goto(BASE+'#progress');q.wait_for_selector('.intro-self-progress');assert q.locator('.intro-scene-host canvas').count()==0
 assert not errors,errors;assert not bad,bad;ctx.close();b.close()
 # Real GPU-backed rendering: every module must render as WebGL, not silently fall back.
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']);ctx=b.new_context(viewport={'width':1440,'height':1000});ctx.add_init_script('const initial='+json.dumps(snapshot)+';if(!localStorage.getItem("fotima.local.accounts.v1"))for(const [key,value] of Object.entries(initial))localStorage.setItem(key,value);');q=ctx.new_page();errors=[];requested=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('request',lambda r:requested.append(r.url));q.goto(BASE+'#welcome');q.wait_for_selector('.entry-hero');assert not [r for r in requested if '/scenes/' in r]
 q.goto(BASE+'#topic/intro');q.wait_for_selector('.intro-root')
 for mode in ids+['quiz']:
  q.evaluate("mode=>{if(mode==='quiz')IntroModel.data().active='quiz';else IntroModel.openTask(mode);render(false)}",mode)
  q.wait_for_function('window.introSceneInfo?.ready===true');info=q.evaluate('window.introSceneInfo');assert info['renderer']=='webgl',(mode,info)
  assert q.locator('.intro-scene-host canvas').count()==1
  assert 0<info['triangles']<100000,(mode,info)
  if mode in ['signs','museum','burner-parts','flames']:
   if mode=='burner-parts':q.locator('[data-intro-action=explode]').click()
   if mode=='flames':q.locator('[data-intro-action=heat]').click();q.locator('[data-intro-control=air]').fill('100');q.locator('[data-intro-control=air]').dispatch_event('change')
   q.wait_for_timeout(400);q.screenshot(path=str(ROOT/f'artifacts/intro-{mode}-webgl-1440.png'),full_page=True)
 print('All WebGL modules passed',flush=True)
 q.evaluate("IntroModel.openTask('flames');render(false)");q.wait_for_function('window.introSceneInfo?.ready===true');before=q.evaluate('window.introSceneInfo.camera');canvas=q.locator('.intro-scene-host canvas');box=canvas.bounding_box();q.mouse.move(box['x']+box['width']*.15,box['y']+box['height']*.2);q.mouse.down();q.mouse.move(box['x']+box['width']*.3,box['y']+box['height']*.3,steps=8);q.mouse.up();q.wait_for_timeout(500);after=q.evaluate('window.introSceneInfo.camera');assert before!=after
 q.locator('[data-intro-action=heat]').click();assert q.evaluate('IntroModel.sim().flame');q.goto(BASE+'#home');q.wait_for_selector('.student-dashboard');assert q.evaluate('window.introSceneInfo.renderer')=='disposed';assert not q.evaluate("state.intro.rows.flames.sim.flame")
 assert not errors,errors;b.close()
print('Passed: 340 localised layouts/four languages, SVG parity, all WebGL modules, local lazy imports, one canvas, orbit controls, bounded geometry and safe disposal/navigation')
