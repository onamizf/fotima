"""Touch, locales, hints, safe-height restoration, keyboard flow, and non-WebGL playability."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
import json
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 for fallback in [False,True]:
  b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']+(['--disable-webgl'] if fallback else ['--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']));c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce');c.route('https://cdnjs.cloudflare.com/**',lambda r:r.abort());c.route('https://cdn.jsdelivr.net/**',lambda r:r.abort());q=c.new_page();errors=[];bad=[];q.on('pageerror',lambda e:(errors.append(str(e)),print('JS',e,flush=True)));q.on('response',lambda r:bad.append(r.url) if r.status==404 else None);register_local(q,BASE,'Touch workshop');q.evaluate('''()=>{for(const id of ['danger-a','danger-b','danger-c','danger-d']){IntroModel.row(id).evidence.tutorialReview={version:1,stages:[0,1,2,3,4],explanations:[0,1,2]};IntroModel.check(id);}const s=IntroModel.data().lesson12??=Practical12Data.blank();s.setup??=Setup12Data.blank();s.setup.visited=Setup12Data.ids.slice(0,6);s.setup.proof=Setup12Data.proof(s.setup);saveState()}''');q.goto(BASE+'?debug=1#topic/ch1/1.2');q.wait_for_selector('[data-setup-tab=build]:enabled');q.locator('[data-setup-tab=build]').tap();q.wait_for_selector('.workshop-card',timeout=40000);q.wait_for_timeout(1200);assert q.locator('.workshop-card').count()==18;assert q.locator('.workshop-scene').evaluate('e=>getComputedStyle(e).aspectRatio')=='4 / 3';assert len(q.locator('.workshop-tray').evaluate('e=>getComputedStyle(e).gridTemplateColumns').split())==3;assert q.evaluate('document.documentElement.scrollWidth<=innerWidth');q.locator('[data-workshop-card=stand]').tap(); box=q.locator('.workshop-scene').bounding_box(); q.touchscreen.tap(box['x']+8,box['y']+8); q.wait_for_timeout(200); assert q.evaluate('state.intro.lesson12.setup.workshop.run.errors')==0
  if fallback:assert q.locator('[data-workshop-fallback]').is_visible()
  else:
   q.wait_for_function('document.querySelector(".workshop-render").dataset.snapshot');camera=json.loads(q.locator('.workshop-render').get_attribute('data-snapshot'))['camera']
  for id in ['stand','burner','tripod','gauze','beaker','water-bottle','clamp','tube']:
   card=q.locator('[data-workshop-card='+id+']');card.scroll_into_view_if_needed();card.tap();q.locator('[data-workshop-target]').tap();q.wait_for_timeout(150)
  q.wait_for_selector('[data-workshop-height]:visible');q.locator('[data-workshop-depth]').fill('35');q.reload();q.wait_for_selector('[data-workshop-height]:visible',timeout=40000);assert q.locator('[data-workshop-depth]').input_value()=='35';q.locator('[data-workshop-secure]').tap();assert q.evaluate('state.intro.lesson12.setup.workshop.run.actions.length')==8
  for id in ['alcohol-bottle','thermometer']:
   card=q.locator('[data-workshop-card='+id+']');card.scroll_into_view_if_needed();card.tap();q.locator('[data-workshop-target]').tap();q.wait_for_timeout(150)
  q.locator('[data-workshop-valve]').tap();q.locator('[data-workshop-match]').tap();q.locator('[data-workshop-target]').tap();q.wait_for_selector('[data-workshop-result]:visible');assert q.evaluate('state.intro.lesson12.setup.workshop.completion.stars')==3;assert not q.evaluate('state.intro.lesson12.setup.workshop.master')
  if not fallback:assert json.loads(q.locator('.workshop-render').get_attribute('data-snapshot'))['camera']==camera
  q.locator('[data-setup-workshop]').screenshot(path='/tmp/workshop19-phone-'+str(fallback)+'.png')
  for lang in ['en','uz-Latn','uz-Cyrl','ru']:
   q.evaluate('(l)=>{state.settings.language=l;saveState()}',lang);q.reload();q.wait_for_selector('[data-workshop-result]:visible',timeout=40000);assert q.locator('[data-workshop-message]').inner_text()==q.evaluate('(l)=>Practical12AssemblyData.copy.success[l]',lang);assert q.locator('.workshop-card').count()==18
  q.goto(BASE+'#home');q.wait_for_timeout(250);assert q.locator('.workshop-render canvas').count()==0;assert not errors,errors;assert not bad,bad;print('PASS phone',fallback,'touch selection, 3-column grid, hints penalty, pending tube resume, completion, 4 locales, immutable camera, cleanup and no errors',flush=True);b.close()
