"""Workbook 1.2: real answers, drawing, order, drag, heating, pause, persistence and layout."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
OUT=Path('/workspace/work/lab12-workbook');BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},reduced_motion='reduce');c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Workbook learner');q.evaluate("""()=>{for(const id of ['danger-a','danger-b','danger-c','danger-d']){IntroModel.row(id).evidence.tutorialReview={version:1,stages:[0,1,2,3,4],explanations:[0,1,2]};IntroModel.check(id);}saveState()}""")
 q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('[data-lab12]');assert q.locator('[data-row]').count()==6
 q.locator('[data-answer=test-tube]').fill('неправильно');q.locator('[data-l12=check-row][data-id=test-tube]').click();assert q.locator('[data-answer=test-tube]').get_attribute('aria-invalid')=='true'
 answers={'test-tube':'ПРОБИРКА','beaker':'стакан','evaporating-dish':'Chinni kosacha','conical-flask':'Erlenmeyer flask','funnel':'воронка','graduated-cylinder':'O‘lchov silindri'}
 for id,answer in answers.items():
  q.locator('[data-answer="'+id+'"]').fill(answer)
  if id=='test-tube':
   q.locator('[data-l12=scheme-mode][data-id="'+id+'"][data-mode=draw]').click();can=q.locator('[data-draw="'+id+'"]');can.scroll_into_view_if_needed();r=can.bounding_box();q.mouse.move(r['x']+30,r['y']+20);q.mouse.down();q.mouse.move(r['x']+60,r['y']+60);q.mouse.up()
  else:q.locator('[data-owner="'+id+'"][data-scheme="'+id+'"]').click()
  q.locator('[data-l12=check-row][data-id="'+id+'"]').click()
 assert q.locator('.l12-table-row.is-correct').count()==6;q.locator('[data-l12=submit]').click();q.locator('[data-l12=close]').click();q.reload();q.wait_for_selector('[data-lab12]');assert q.locator('.l12-table-row.is-correct').count()==6;assert q.locator('[data-draw=test-tube]').evaluate('(c)=>c.getContext("2d").getImageData(0,0,c.width,c.height).data.some((x,i)=>i%4===3&&x>0)')
 q.goto(BASE+'#lab/ch1/1.2/task-2');q.wait_for_selector('.l12-scene svg');q.locator('[data-l12=build]').click();q.locator('[data-tool=beaker]').click();q.locator('.l12-scene').click();assert '1' in q.locator('[data-l12-errors]').inner_text()
 steps=['clamp-stand','gas-burner','tripod','wire-gauze','beaker','water','clamp','heat-test-tube','alcohol','thermometer','flame']
 for i,id in enumerate(steps):
  tool=q.locator('[data-tool="'+id+'"]');tool.scroll_into_view_if_needed()
  if i==0:tool.drag_to(q.locator('.l12-scene'))
  else:tool.click();q.locator('.l12-scene').click()
 q.locator('[data-l12=pause]').click();temperature=q.locator('[data-l12-temp]').inner_text();q.wait_for_timeout(600);assert q.locator('[data-l12-temp]').inner_text()==temperature;q.locator('[data-l12=pause]').click();q.wait_for_selector('[data-l12=submit]:enabled',timeout=15000);assert q.locator('[data-l12-temp]').inner_text()=='60 °C';q.locator('[data-l12=submit]').click();q.locator('[data-l12=close]').click();q.reload();q.wait_for_selector('[data-lab12]');assert q.locator('[data-l12=submit]').is_enabled()
 for w,h in [(1920,1080),(1366,768),(390,844)]:
  q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(150);q.screenshot(path=str(OUT/f'bath-{w}.png'),full_page=True);assert q.locator('[data-lab12]').evaluate('(e)=>e.scrollWidth<=e.clientWidth+1'),w
 q.goto(BASE+'#lab/ch1/1.2/task-3');q.wait_for_selector('.l12-scene svg');q.locator('[data-l12=build]').click();assert q.locator('[data-tool=tripod]').is_disabled()
 for letter,answer in {'a':'Kimyoviy stakan','b':'тренога','c':'фарфоровая чашка','d':'Bunsen burner'}.items():q.locator('[data-label='+letter+']').fill(answer)
 q.locator('[data-l12=check-labels]').click();assert q.locator('[data-label-result]').inner_text()=='Верно';q.locator('[data-l12=build]').click()
 for id in ['tripod','gas-burner','wire-gauze','water','copper-dish','flame']:q.locator('[data-tool="'+id+'"]').click();q.locator('.l12-scene').click()
 q.wait_for_selector('[data-l12=submit]:enabled',timeout=15000);q.locator('[data-l12=submit]').click();q.locator('[data-l12=close]').click()
 for w,h in [(1920,1080),(1366,768),(390,844)]:q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(100);q.screenshot(path=str(OUT/f'evap-{w}.png'),full_page=True);assert q.locator('[data-lab12]').evaluate('(e)=>e.scrollWidth<=e.clientWidth+1')
 q.goto(BASE+'#lab/ch1/1.2/task-1')
 for w,h in [(1920,1080),(1366,768),(390,844)]:q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(100);q.screenshot(path=str(OUT/f'study-{w}.png'),full_page=True);assert q.locator('[data-lab12]').evaluate('(e)=>e.scrollWidth<=e.clientWidth+1')
 q.evaluate('state.settings.language="uz-Latn";saveState()');q.reload();q.wait_for_selector('[data-lab12]');assert q.locator('h1').inner_text()=='Jihozlarni o‘rgan';assert q.locator('.l12-table-row.is-correct').count()==6
 q.goto(BASE+'#topic/ch1/1.2');q.wait_for_selector('.project-card');assert q.locator('[data-project-open]').count()==3;assert q.locator('[data-lab12]').count()==0
 q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_selector('.safety-editor');assert q.locator('[data-lab12]').count()==0
 # The publication manifest automatically switches to uploaded ink cards and objects.
 q.route('**/version.json*',lambda r:r.fulfill(json={'equipmentInk':{'cards':['beaker'],'objects':['water'],'sizes':False},'sceneBackground':False}))
 image=Path('assets/lab/equipment/cards/beaker.webp').read_bytes();q.route('**/equipment-ink/cards/beaker.webp*',lambda r:r.fulfill(body=image,content_type='image/webp'));q.route('**/equipment-ink/objects/water.webp*',lambda r:r.fulfill(body=image,content_type='image/webp'))
 q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('img[src*="equipment-ink/cards/beaker.webp"]')
 q.goto(BASE+'#lab/ch1/1.2/task-2');q.wait_for_selector('image[href*="equipment-ink/objects/water.webp"]')
 assert not errors,errors
 print('PASS three workbook tasks: multilingual names, diagrams/drawing and persistence, real drag/order errors, bath heating/pause and submission, evaporation labels/build, 3 viewport sizes, Uzbek, isolated 1.1; no console errors')
 b.close()
