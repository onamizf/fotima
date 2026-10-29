"""Touch pinch, fixed camera, full-size parts and gray dimming on phones and without WebGL."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
import json
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 for fallback in [False,True]:
  b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']+(['--disable-webgl'] if fallback else ['--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']));c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2,reduced_motion='reduce');c.route('https://cdnjs.cloudflare.com/**',lambda r:r.abort());c.route('https://cdn.jsdelivr.net/**',lambda r:r.abort());q=c.new_page();errors=[];q.on('pageerror',lambda e:(errors.append(str(e)),print(e,flush=True)));register_local(q,BASE,'Touch camera learner');q.evaluate('''()=>{for(const id of ['danger-a','danger-b','danger-c','danger-d']){IntroModel.row(id).evidence.tutorialReview={version:1,stages:[0,1,2,3,4],explanations:[0,1,2]};IntroModel.check(id);}saveState()}''');q.goto(BASE+'?debug=1#topic/ch1/1.2');q.locator('#equipment-task-2').scroll_into_view_if_needed();q.wait_for_selector('.setup-render-host[data-renderer='+('fallback' if fallback else 'webgl')+']',timeout=30000)
  if not fallback:
   q.wait_for_function('!!document.querySelector("[data-setup-camera-debug]")?.dataset.snapshot');initial=json.loads(q.locator('[data-setup-camera-debug]').get_attribute('data-snapshot'))['camera'];q.locator('.setup-render-host canvas').scroll_into_view_if_needed();r=q.locator('.setup-render-host canvas').bounding_box();x=r['x']+r['width']/2;y=max(100,r['y']+r['height']*.5);cdp=c.new_cdp_session(q)
   def touch(kind,spread):cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[] if kind=='touchEnd' else [{'x':x-spread,'y':y,'id':1},{'x':x+spread,'y':y,'id':2}]})
   touch('touchStart',30)
   for spread in [40,50,60,70]:touch('touchMove',spread)
   touch('touchEnd',0);q.wait_for_timeout(400);s=json.loads(q.locator('[data-setup-camera-debug]').get_attribute('data-snapshot'));assert s['camera']==initial and s['model']['position'][2]>0 and s['model']['scale']==[1,1,1],s;q.locator('[data-setup-reset]').click();q.wait_for_timeout(400)
  else:
   assert q.locator('.setup-fallback-exploded').count()==1;assert q.locator('.setup-fallback-parts path').count()==0
  q.locator('[data-setup-scrub]').evaluate('e=>{e.value=50;e.dispatchEvent(new Event("input",{bubbles:true}))}');assert float(q.locator('.explode-dim').evaluate('e=>getComputedStyle(e).opacity'))==.5
  q.locator('[data-setup-scrub]').evaluate('e=>{e.value=100;e.dispatchEvent(new Event("input",{bubbles:true}))}');q.wait_for_function('state.intro.lesson12.setup.explodedOnce');assert q.locator('.setup-part-label:visible').count()==0
  if not fallback:
   s=json.loads(q.locator('[data-setup-camera-debug]').get_attribute('data-snapshot'));assert s['camera']==initial and s['model']['scale']==[1,1,1];assert all(v['scale']==[1,1,1] and v['frame']['top']>=0 and v['frame']['bottom']<=1 and v['frame']['left']>=0 and v['frame']['right']<=1 for k,v in s['parts'].items() if k!='flame'),s['parts']
  q.locator('.setup-part-list [data-setup-part=tube]').click();assert q.locator('.setup-part-label:visible').count()==1;q.locator('[data-setup-back]').click();q.locator('[data-setup-toggle]').click();q.wait_for_function('state.intro.lesson12.setup.progress<.001');assert q.locator('.explode-dim').evaluate('e=>getComputedStyle(e).opacity')=='0';q.locator('.setup-stage').screenshot(path='/tmp/revision14-mobile-'+str(fallback)+'.png');q.goto(BASE+'#home');q.wait_for_timeout(200);assert not errors,errors;print('PASS touch/reduced motion, pinch model-only, full-size parts, gray scrub/reversal, photo fallback, cleanup; fallback='+str(fallback),flush=True);b.close()
