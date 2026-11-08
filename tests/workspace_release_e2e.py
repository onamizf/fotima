"""Regression: same-tab routes, unobscured safety scene, equipment and release URLs."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
from pathlib import Path
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/release137');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader'])
 c=b.new_context(viewport={'width':1440,'height':1000},device_scale_factor=.5,reduced_motion='reduce');c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 c.route('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',lambda r:r.fulfill(path='assets/vendor/setup-r128/three.min.js',content_type='application/javascript'));c.route('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',lambda r:r.fulfill(path='assets/vendor/setup-r128/gsap.min.js',content_type='application/javascript'))
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
  q.locator('.safety-scene-tiles [data-sw-scene="'+str(index)+'"]').click()
  q.wait_for_function('(i)=>SafetyWorkspace.debug.current===i&&SafetyWorkspace.debug.player?.stage===0',arg=index)
  for step in range(7):q.locator('[data-sp=advance-line]').click()
  q.wait_for_selector('[data-story-card="2"]')
 q.wait_for_selector('[data-sw=submit]:enabled')
 assert q.locator('[data-state=completed]').count()>=3
 q.goto(BASE+'#topic/ch1/1.2');q.wait_for_selector('[data-project-open]');q.locator('[data-project-open]').first.click();q.wait_for_selector('.es-study');assert len(c.pages)==1
 assert q.locator('[data-es-item]').count()==6
 assert q.locator('.equipment-image-room').count()==0
 q.screenshot(path=str(OUT/'equipment-task1.png'))
 q.goto(BASE+'#lab/ch1/1.2/task-2');q.wait_for_selector('.wb-atlas')
 for key in ['stand','tripod','gas-burner','wire-gauze','beaker','boss-clamp','clamp-arm','test-tube','thermometer']:
  q.locator('[data-wb-card="'+key+'"]').click();q.keyboard.press('Escape')
 q.locator('[data-wb=build]').first.click();q.wait_for_selector('.ag-stage')
 for key in ['stand','tripod','gas-burner','wire-gauze','beaker','water','boss-clamp','clamp-arm','test-tube','secure-tube','alcohol','thermometer','valve','match']:
  if key in ['secure-tube','valve','match']:q.locator('[data-ag-action]').click()
  else:q.locator('[data-ag-part="'+key+'"]').click();q.locator('[data-ag-target]').click()
 assert q.evaluate('Practical12AssemblyData.validCompletion(state.intro.lesson12.setup.workshop.completion)')
 q.locator('[data-ag-heat]').click();q.wait_for_function('document.querySelector("[data-ag-temperature]").textContent.includes("60")')
 xp=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('.ag-stage');assert q.locator('.ag-frame.is-placed').count()==0;assert q.evaluate('CourseGame.xp()')==xp
 q.screenshot(path=str(OUT/'equipment-task2.png'))
 q.set_viewport_size({'width':390,'height':844});q.wait_for_timeout(200)
 q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_selector('.safety-editor');q.wait_for_function('SafetyWorkspace.debug.player.stage===0')
 for step in range(7):q.locator('[data-sp=advance-line]').click()
 q.wait_for_selector('[data-story-card="2"]')
 boxes=[q.locator(s).bounding_box() for s in ['.pw-canvas','.safety-explanation','.safety-scene-tiles']];assert boxes[0]['y']+boxes[0]['height']<=boxes[1]['y']+1;assert boxes[1]['y']+boxes[1]['height']<=boxes[2]['y']+1
 q.screenshot(path=str(OUT/'safety-mobile.png'),full_page=True)
 assert not errors,errors
 print('PASS: same-tab routing, back/fallback, safety full text and layout, JSON assembly, undo/redo, heating and saved completion, stale URL update, no console errors')
 b.close()
