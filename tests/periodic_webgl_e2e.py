"""Real software WebGL: models, controls, reduced motion, context loss and disposal."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8043/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']);q=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Model Learner');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.goto(BASE+'#resources/periodic/Ge');q.wait_for_function('window.periodic3DInfo?.ready');info=q.evaluate('window.periodic3DInfo');assert info['renderer']=='webgl';assert (info['protons'],info['neutrons'],info['electrons'])==(32,42,32);assert info['shells']==[2,8,18,4]
 results=[]
 for symbol in ['H','N','O','S','P','C','Si','Na','Ca','Mg','Fe','Ge','Kr','Br','Al','Og']:
  q.evaluate('(s)=>location.hash="#resources/periodic/"+s',symbol);q.wait_for_function('(s)=>window.periodic3DInfo?.symbol===s && window.periodic3DInfo?.ready',arg=symbol)
  for tab in ['atom','simple','compound']:
   button=q.locator('[data-periodic-model="'+tab+'"]')
   if button.is_disabled():continue
   button.click();q.wait_for_function('(m)=>window.periodic3DInfo?.mode===m',arg=tab);info=q.evaluate('window.periodic3DInfo');assert info['renderer']=='webgl' and info['triangles']>0,info;results.append({'symbol':symbol,'mode':tab,'atoms':info['atoms'],'triangles':info['triangles']})
   if tab=='compound' and symbol in ['H','O','C','N','Ge','Kr','Ca']:assert info['atoms']=={'H':3,'O':3,'C':3,'N':4,'Ge':5,'Kr':3,'Ca':5}[symbol]
   if tab=='simple' and symbol in ['H','N','O','S','P','Na','Fe','Ca','Mg']:assert info['atoms']=={'H':2,'N':2,'O':2,'S':8,'P':4,'Na':9,'Fe':9,'Ca':14,'Mg':27}[symbol]
   if symbol=='C' and tab=='simple':
    q.locator('#periodicAllotrope').select_option('diamond');assert q.evaluate('window.periodic3DInfo.atoms')==64
   assert q.locator('.periodic-model-view canvas').count()==1
 q.locator('[data-model-camera="in"]').click();zoom=q.evaluate('window.periodic3DInfo.camera');q.locator('[data-model-camera="reset"]').click();assert zoom!=q.evaluate('window.periodic3DInfo.camera');renders=q.evaluate('window.periodic3DInfo.renders');q.wait_for_timeout(150);assert q.evaluate('window.periodic3DInfo.renders')==renders,'Reduced motion must not animate'
 q.emulate_media(reduced_motion='no-preference');q.wait_for_function('(n)=>window.periodic3DInfo.renders>n+2',arg=renders);q.emulate_media(reduced_motion='reduce')
 q.evaluate('location.hash="#resources/periodic/Ge"');q.wait_for_function('window.periodic3DInfo.symbol==="Ge"');q.locator('[data-periodic-model=compound]').click();q.locator('.periodic-model-section').scroll_into_view_if_needed();q.screenshot(path=str(ROOT/'artifacts/periodic-GeH4-webgl.png'));q.locator('.periodic-model-view canvas').evaluate('(c)=>c.getContext("webgl2").getExtension("WEBGL_lose_context").loseContext()');q.wait_for_function('window.periodic3DInfo.renderer==="svg"');assert q.locator('[data-model-camera="in"]').is_disabled();assert q.locator('.periodic-model-view canvas').count()==0
 q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached');assert q.evaluate('window.periodic3DInfo.ready')==False
 q.evaluate('location.hash="#resources/periodic/He"');q.wait_for_function('window.periodic3DInfo.ready');q.evaluate('location.hash="#home"');q.wait_for_selector('.student-dashboard');assert q.locator('.periodic-detail-dialog').count()==0;assert not q.evaluate('window.periodic3DInfo.ready');assert not errors,errors
 (ROOT/'artifacts/periodic-webgl-validation.json').write_text(json.dumps({'status':'passed','renderer':'Chromium SwiftShader WebGL','models':results,'checks':['protons/neutrons/electrons for Ge-74','model atom counts and both carbon forms','one canvas and lazy disposal','zoom/reset and reduced motion','context loss gives SVG fallback'],'js_errors':errors},indent=2));b.close();print(f'Passed: {len(results)} real WebGL views, controls, fallback and cleanup')
