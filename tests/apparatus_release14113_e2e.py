"""Exact assembled frames, single activation, physical drops, stable inventory and flow layout."""
from pathlib import Path
import os
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/assembly14113');OUT.mkdir(parents=True,exist_ok=True)
SEQUENCES={'water-bath':['stand','tripod','gas-burner','wire-gauze','beaker','water','boss-clamp','clamp-arm','test-tube','secure-tube','alcohol','thermometer','valve','match'],'evaporation':['tripod','gas-burner','wire-gauze','beaker','water','evaporating-dish','copper-sulfate','valve','match']}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},has_touch=True)
 for host in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+host+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' or m.type=='warning' and '[i18n]'in m.text else None)
 register_local(q,BASE,'Precise Assembly')
 q.evaluate('''()=>{for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 def state(model):return q.evaluate('(id)=>ApparatusProgress.data(id).assembly',model)
 def activate(selector,mode):
  el=q.locator(selector)
  if mode=='key':el.focus();q.keyboard.press('Space' if selector=='[data-ag-target]' else 'Enter')
  elif mode=='touch':el.tap()
  else:el.click()
 def layout():
  q.locator('.ag-stage').evaluate('e=>e.scrollIntoView({block:"start"})');q.wait_for_timeout(60)
  header=q.locator('.wb-page-header').bounding_box();tools=q.locator('.ag-toolbar').bounding_box();stage=q.locator('.ag-stage').bounding_box()
  assert tools['y']>=header['y']+header['height']-1,('tools overlap',header,tools)
  assert stage['y']>=tools['y']+tools['height']-1,('stage overlap',tools,stage)
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  hint=q.locator('.ag-step-hint')
  if hint.is_visible():
   h=hint.bounding_box();assert h['x']>=stage['x'] and h['y']>=stage['y'] and h['x']+h['width']<=stage['x']+stage['width']+1 and h['y']+h['height']<=stage['y']+stage['height']+1,(stage,h)
 for width,height in [(360,800),(768,1024),(1366,768),(1920,1080)]:
  if os.environ.get('APPARATUS_TEST_WIDTH') and width!=int(os.environ['APPARATUS_TEST_WIDTH']):continue
  q.set_viewport_size({'width':width,'height':height})
  for model,task in [('water-bath','task-2'),('evaporation','task-3')]:
   q.goto(BASE+'#lab/ch1/1.2/'+task);q.wait_for_selector('.wb-atlas',state='attached');activate('.wb-page-header [data-wb=study]','click');q.wait_for_selector('.wb-atlas');parts=q.evaluate('(id)=>WaterBathAtlas.load(id).then(d=>d.parts)',model)
   for part in parts:activate('[data-wb-card="'+part['id']+'"]','touch' if width==360 else 'click');activate('[data-wb=close]','click')
   activate('.wb-page-header [data-wb=build]','click');q.wait_for_selector('.ag-origin');assert state(model)['actions']==[]
   mode='touch' if width==360 else 'key' if width==768 else 'click'
   order=q.locator('[data-ag-equipment] [data-ag-part]').evaluate_all('es=>es.map(e=>e.dataset.agPart)');assert len(order)==len(parts)+4
   assert q.locator('[data-ag-substances] [data-ag-part]').count()==(2 if model=='water-bath' else 2)
   # A distractor counts exactly once and does not disclose the correct answer.
   wrong=next(x for x in order if x.startswith('extra-'));activate('[data-ag-part="'+wrong+'"]',mode);assert state(model)['errors']==1
   assert q.locator('[data-ag-message]').inner_text()==q.evaluate('WaterBathAtlas.t("checkAssembly")+". "+WaterBathAtlas.t("otherEquipment")')
   activate('[data-wb=ag-hint]',mode);assert q.locator('.ag-highlight').count()>=2
   layout()
   for n,id in enumerate(SEQUENCES[model]):
    if id=='secure-tube':
     # The depth control validates readiness without shifting any JSON part frames.
     q.locator('[data-ag-depth]').focus();q.keyboard.press('Home')
     for _ in range(40):q.keyboard.press('ArrowRight')
    if id in ['secure-tube','valve','match']:
     button='[data-ag-target]' if id=='valve' else '[data-ag-action]'
     if id=='valve':
      target=q.locator(button).bounding_box();assert target['width']>=44 and target['height']>=44
     activate(button,mode)
     # Repeated events during animation cannot skip the following action.
     if id in ['valve','match']:q.locator(button).dispatch_event('click')
    else:
     activate('[data-ag-part="'+id+'"]',mode)
     if id=='water' and width==1366:
      # One real drag starts after movement, drops into the vessel, and suppresses its trailing click.
      card=q.locator('[data-ag-part=water]');card.scroll_into_view_if_needed();start=card.bounding_box();target=q.locator('[data-ag-target]').bounding_box()
      q.mouse.move(start['x']+start['width']/2,start['y']+start['height']/2);q.mouse.down();q.mouse.move(target['x']+target['width']/2,target['y']+target['height']/2,steps=12);q.mouse.up()
     else:activate('[data-ag-target]',mode)
    q.wait_for_function('([model,n])=>ApparatusProgress.data(model).assembly.actions.length===n',arg=[model,n+1])
    assert q.locator('[data-ag-equipment] [data-ag-part]').evaluate_all('es=>es.map(e=>e.dataset.agPart)')==order
    if n==0:
     activate('[data-ag-part="'+id+'"]',mode);assert q.locator('[data-ag-message]').inner_text()==q.evaluate('WaterBathAtlas.t("alreadyPlaced")');assert state(model)['errors']==1
    if id=='valve':assert state(model)['actions'][-1]=='valve' and not state(model)['done']
    if id not in ['match']:
     # Every image is stretched to its data frame, without secondary offsets.
     for part in parts:
      node=q.locator('[data-ag-frame="'+part['id']+'"]');assert node.get_attribute('data-fit')=='fill'
      a=part['assembled'];measured=node.evaluate('e=>{const r=e.getBoundingClientRect(),o=e.parentElement.getBoundingClientRect();return {x:(r.x-o.x)/o.width*100,y:(r.y-o.y)/o.height*100,w:r.width/o.width*100,h:r.height/o.height*100}}')
      assert all(abs(measured[k]-a[k])<.1 for k in ['x','y','w','h']),(part['id'],measured,a)
   q.wait_for_selector('.ag-success-toast:not([hidden])');q.wait_for_timeout(280)
   assert state(model)['done'];assert state(model)['errors']==1;assert q.locator('.ag-full').evaluate('e=>getComputedStyle(e).opacity')=='1'
   assert q.locator('.ag-frame').evaluate_all('es=>es.every(e=>getComputedStyle(e).opacity==="0")')
   assert q.locator('.ag-inventory button').evaluate_all('es=>es.every(e=>e.disabled)')
   assert q.locator('.ag-full source').get_attribute('srcset').split('?')[0].endswith('equipment/'+model+'/full.webp')
   q.locator('.ag-stage').scroll_into_view_if_needed();q.wait_for_timeout(80);layout();q.screenshot(path=str(OUT/f'{model}-{width}.png'))
   q.wait_for_timeout(3050);assert q.locator('.ag-success-toast').is_hidden();assert q.locator('[data-ag-built]').is_visible()
   if model=='evaporation':
    assert q.locator('.ag-experiment-crystals .ag-crystal').count()==14
    if width==1366:
     q.wait_for_selector('.ag-experiment-finished');assert q.locator('.ag-experiment-crystals').evaluate('e=>getComputedStyle(e).opacity')=='1';q.screenshot(path=str(OUT/'crystal-prisms.png'))
   xp=q.evaluate('CourseGame.xp()');activate('[data-wb=ag-restart]',mode);assert state(model)['actions']==[];assert q.locator('.ag-experiment-layer').is_hidden();assert q.evaluate('CourseGame.xp()')==xp
   print('PASS',model,width,mode,'geometry / first activation / no overlaps / full reference / reset / XP',flush=True)
 # All four locales refresh in place without resetting an attempt or inventory order.
 q.set_viewport_size({'width':1366,'height':768});activate('[data-ag-part=tripod]','click');activate('[data-ag-target]','click')
 for language in ['en','uz-Latn','uz-Cyrl','ru']:
  before=state('evaporation')['actions'];order=q.locator('[data-ag-equipment] [data-ag-part]').evaluate_all('es=>es.map(e=>e.dataset.agPart)');q.locator('#language').select_option(language);q.wait_for_selector('.ag-origin');assert state('evaporation')['actions']==before;assert q.locator('[data-ag-equipment] [data-ag-part]').evaluate_all('es=>es.map(e=>e.dataset.agPart)')==order
 # Navigation/reload starts at zero while completed scores/rewards remain.
 q.reload();q.wait_for_selector('.ag-origin');assert state('evaporation')['actions']==[]
 assert not errors,errors
 print('PASS four locales, transient attempts and no console errors',flush=True);b.close()
