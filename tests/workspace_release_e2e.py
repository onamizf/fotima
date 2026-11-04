"""Regression: same-tab routes, unobscured safety scene, equipment and release URLs."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
from pathlib import Path
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/release137');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Release regression')
 q.goto(BASE+'?v=1.35.0#topic/ch1/1.1');q.wait_for_selector('[data-project-open]');assert '?v='+q.locator('meta[name=application-version]').get_attribute('content') in q.url
 q.locator('[data-project-open]').click();q.wait_for_selector('.safety-editor');assert len(c.pages)==1;assert '#lab/ch1/1.1/task-1' in q.url
 q.wait_for_function('SafetyWorkspace.debug.player.stage===0');q.wait_for_timeout(500)
 assert q.locator('.pw-canvas .cinema-bubble').count()==0
 assert q.locator('.pw-panel .cinema-bubble').count()==1
 assert q.locator('.sp-reading-controls:visible button').count()==2
 q.locator('[data-sw=pause]').click()
 for i in range(7):q.locator('[data-sp=advance-line]').click()
 q.wait_for_selector('[data-story-card="2"]');q.wait_for_timeout(100)
 article=q.locator('.sp-story-analysis');assert 'Меры предосторожности' in article.inner_text()
 assert q.locator('.sp-story-analysis p').count()>=2 or q.locator('.sp-story-analysis li').count()>0
 assert q.locator('.sp-result-actions:visible').count()==0
 box=q.locator('.cinema-bubble').bounding_box();scene=q.locator('.pw-canvas').bounding_box();assert box['x']>=scene['x']+scene['width']
 assert q.locator('.cinema-content').evaluate('(e)=>e.scrollHeight<=e.clientHeight+1')
 q.screenshot(path=str(OUT/'safety-desktop.png'))
 q.locator('[data-workspace-back]').click();q.wait_for_selector('.project-hub');assert '#topic/ch1/1.1' in q.url
 # A new document has no same-site predecessor: arrow falls back to the topic.
 direct=c.new_page();direct.goto(BASE+'#lab/ch1/1.1/task-1');direct.wait_for_selector('.safety-editor');direct.locator('[data-workspace-back]').click();direct.wait_for_selector('.project-hub');direct.close()
 q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_selector('.safety-editor')
 for index in range(1,4):
  q.locator('.safety-scene-nav [data-sw-scene="'+str(index)+'"]').click()
  q.wait_for_function('(i)=>SafetyWorkspace.debug.current===i&&SafetyWorkspace.debug.player?.stage===0',arg=index)
  for step in range(7):q.locator('[data-sp=advance-line]').click()
  q.wait_for_selector('[data-story-card="2"]')
 q.wait_for_selector('[data-sw=submit]:enabled')
 assert q.locator('.safety-scene-nav').inner_text().count('✓')==4
 q.goto(BASE+'#topic/ch1/1.2');q.wait_for_selector('[data-project-open]');q.locator('[data-project-open]').first.click();q.wait_for_selector('.equipment-image-room');assert len(c.pages)==1
 assert q.locator('.pw-item img[src*="/cards/"]').count()==4
 assert q.locator('.equipment-room-zone img[src*="/objects/"]').count()==4
 q.screenshot(path=str(OUT/'equipment-task1.png'))
 q.goto(BASE+'#lab/ch1/1.2/task-2');q.wait_for_selector('.equipment-image-scene');q.wait_for_timeout(400)
 for key in ['thermometer','tube','alcohol','beaker','water','gauze']:q.locator('[data-pw-item="'+key+'"]').click()
 q.locator('[data-pw-mode=assemble]').click();q.wait_for_selector('[data-workshop-card=stand]:enabled')
 for key in ['stand','burner','tripod','gauze','beaker','water-bottle','clamp','tube','alcohol-bottle','thermometer']:
  q.locator('[data-workshop-card="'+key+'"]').click();q.locator('[data-workshop-target]').click()
  if key=='stand':
   q.locator('[data-pw-tool=undo]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.actions.length===0');q.locator('[data-pw-tool=redo]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.actions.length===1')
  if key=='tube':q.locator('[data-workshop-depth]').fill('30');q.locator('[data-workshop-secure]').click()
 q.locator('[data-workshop-valve]').click();q.locator('[data-workshop-match]').click();q.locator('[data-workshop-target]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.done')
 assert q.locator('.workshop-render img[src*="/water.webp?"]').count()==1;assert q.locator('.workshop-render img[src*="/alcohol.webp?"]').count()==1
 dims=q.evaluate("""()=>{const h=document.querySelector('.workshop-render');return {k:+h.dataset.pixelsPerCm,table:+h.dataset.tableY,objects:[...h.querySelectorAll('[data-equipment-object]')].map(i=>({id:i.dataset.equipmentObject,y:parseFloat(i.style.top),height:parseFloat(i.style.height)}))}}""")
 o={i['id']:i for i in dims['objects']};k=dims['k']
 for key in ['stand','base','tripod','burner']:assert abs(o[key]['y']+o[key]['height']-dims['table'])<.1
 assert abs(o['beaker']['y']+o['beaker']['height']-(dims['table']-20*k))<.1
 for key,cm in [('stand',60),('tripod',20),('burner',12),('tube',15),('beaker',9),('thermometer',30)]:assert abs(o[key]['height']/cm-k)<.01
 q.locator('[data-pw-tool=zoomIn]').click();assert float(q.locator('.workshop-render').get_attribute('data-pixels-per-cm'))>k
 q.screenshot(path=str(OUT/'equipment-task2.png'))
 q.set_viewport_size({'width':390,'height':844});q.wait_for_timeout(200);assert float(q.locator('.workshop-render').get_attribute('data-pixels-per-cm'))!=k
 q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_selector('.safety-editor');q.wait_for_function('SafetyWorkspace.debug.player.stage===0')
 for step in range(7):q.locator('[data-sp=advance-line]').click()
 q.wait_for_selector('[data-story-card="2"]')
 boxes=[q.locator(s).bounding_box() for s in ['.pw-canvas','.safety-explanation','.safety-scene-tiles']];assert boxes[0]['y']+boxes[0]['height']<=boxes[1]['y']+1;assert boxes[1]['y']+boxes[1]['height']<=boxes[2]['y']+1
 q.screenshot(path=str(OUT/'safety-mobile.png'),full_page=True)
 assert not errors,errors
 print('PASS: same-tab routing, back/fallback, safety full text and layout, assembly, undo/redo, liquids, proportions, zoom/resize, stale URL update, no console errors')
 b.close()
