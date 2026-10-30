"""Mouse drag, keyboard placement, offscreen thumbnails, animated heat and immutable camera."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
import json
BASE='http://127.0.0.1:8051/'
def info(q):return json.loads(q.locator('.workshop-render').get_attribute('data-snapshot'))
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']);c=b.new_context(device_scale_factor=.5,viewport={'width':1440,'height':1400});c.route('https://cdnjs.cloudflare.com/**',lambda r:r.abort());c.route('https://cdn.jsdelivr.net/**',lambda r:r.abort());q=c.new_page();errors=[];shader=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:shader.append(m.text) if m.type=='error' and 'WebGLProgram' in m.text else None);register_local(q,BASE,'Motion workshop');q.evaluate('''()=>{for(const id of ['danger-a','danger-b','danger-c','danger-d']){IntroModel.row(id).evidence.tutorialReview={version:1,stages:[0,1,2,3,4],explanations:[0,1,2]};IntroModel.check(id);}const s=IntroModel.data().lesson12??=Practical12Data.blank();s.setup??=Setup12Data.blank();s.setup.visited=Setup12Data.ids.slice(0,6);s.setup.proof=Setup12Data.proof(s.setup);saveState()}''');q.goto(BASE+'?debug=1#topic/ch1/1.2');q.wait_for_selector('[data-setup-tab=build]:enabled');q.locator('[data-setup-tab=build]').click();q.wait_for_selector('[data-workshop-card=stand]:enabled',timeout=40000);
 q.wait_for_function('document.querySelectorAll(".workshop-preview img").length===18',timeout=40000)
 camera=info(q)['camera']
 def place(id,drag=False):
  card=q.locator('[data-workshop-card='+id+']') if id!='match' else q.locator('[data-workshop-match]')
  print('Place',id,drag,flush=True);card.scroll_into_view_if_needed()
  if drag:
   q.locator('.workshop-scene').scroll_into_view_if_needed();a=card.bounding_box();z=q.locator('[data-workshop-target]').bounding_box();q.mouse.move(a['x']+a['width']/2,a['y']+a['height']/2);q.mouse.down();q.mouse.move(z['x']+z['width']/2+12,z['y']+z['height']/2,steps=3);q.mouse.up()
  else:
   card.click();q.locator('[data-workshop-target]').click(position={'x':20,'y':15})
  q.wait_for_timeout(1200 if 'bottle' in id else 450)
 for mode in ['drag','click']:
  if mode=='click':q.locator('[data-workshop-restart]').click()
  q.locator('[data-workshop-card=stand]').click();q.locator('.workshop-scene').click(position={'x':8,'y':8});assert q.evaluate('state.intro.lesson12.setup.workshop.run.errors')==0
  q.keyboard.press('Escape');assert not q.evaluate('state.intro.lesson12.setup.workshop.run.selected')
  for n,id in enumerate(['stand','burner','tripod','gauze','beaker','water-bottle','clamp','tube']):
   place(id,mode=='drag');q.wait_for_function('(n)=>state.intro.lesson12.setup.workshop.run.actions.length===n',arg=n if id=='tube' else n+1)
  q.locator('[data-workshop-depth]').fill('30');q.locator('[data-workshop-secure]').click()
  place('alcohol-bottle',mode=='drag');place('thermometer',mode=='drag');q.locator('[data-workshop-valve]').click();place('match');q.wait_for_function('state.intro.lesson12.setup.workshop.run.done');assert q.evaluate('state.intro.lesson12.setup.workshop.run.errors')==0;assert info(q)['camera']==camera
  q.wait_for_selector('[data-workshop-result]:visible');seconds=q.evaluate('state.intro.lesson12.setup.workshop.run.seconds');q.wait_for_timeout(1200);assert q.evaluate('state.intro.lesson12.setup.workshop.run.seconds')==seconds
  print('PASS full 11 steps',mode,'zero errors, misses and Esc unpenalized, result timer paused',flush=True)
 q.locator('[data-setup-workshop]').screenshot(path='/tmp/workshop20-desktop.png');assert not errors,errors;b.close()
