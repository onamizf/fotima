"""Phone fallback, real touch drawing, palette placement, edits, localization and persistence."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,device_scale_factor=2,reduced_motion='reduce');c.route('https://cdnjs.cloudflare.com/**',lambda r:r.abort());c.route('https://cdn.jsdelivr.net/**',lambda r:r.abort());q=c.new_page();errors=[];q.on('pageerror',lambda e:(errors.append(str(e)),print(e,flush=True)));register_local(q,BASE,'Touch Setup');q.evaluate("state.textbook.preservedSteps.push('1.2');saveState()");q.goto(BASE+'#topic/ch1/1.2');q.locator('#equipment-task-2').scroll_into_view_if_needed();q.wait_for_selector('[data-renderer=fallback]');assert q.locator('.setup-preview').is_visible();assert q.locator('.setup-view').evaluate('e=>Math.abs(e.clientWidth/e.clientHeight-4/3)<.02');assert q.evaluate('document.documentElement.scrollWidth<=innerWidth');q.locator('[data-setup-toggle]').tap();assert q.evaluate('state.intro.lesson12.setup.explodedOnce')
 for id in ['thermometer','tube','alcohol','beaker','water','gauze']:
  q.locator('.setup-part-list [data-setup-part='+id+']').tap();assert q.locator('.setup-part-label:visible').count()==1
  for _ in range(3):q.locator('[data-setup-next]').tap()
 assert q.evaluate('state.intro.lesson12.setup.visited.length')==6;board=q.locator('.setup-diagram-board');board.evaluate('e=>e.scrollIntoView({block:"center"})');r=board.bounding_box();cdp=c.new_cdp_session(q)
 def touch(kind,x,y):cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[] if kind=='touchEnd' else [{'x':x,'y':y}]})
 x,y=r['x']+50,r['y']+80;touch('touchStart',x,y)
 for i in range(38):touch('touchMove',x+i*2,y+i*3)
 touch('touchEnd',x+76,y+114);assert q.evaluate('Setup12Data.points(state.intro.lesson12.setup.diagram)>=30');q.locator('[data-setup-compare]').tap();assert not q.evaluate('SetupTask2.done()')
 # Keyboard-friendly/touch placement is equivalent to dragging a chip into the board.
 for i,id in enumerate(['stand','tube','thermometer','beaker','gauze']):
  q.locator('[data-setup-palette=label][data-setup-type='+id+']').tap();board.evaluate('e=>e.scrollIntoView({block:"center"})');board.tap(position={'x':30+i*48,'y':210+i*22})
 q.locator('[data-setup-palette=stamp][data-setup-type=beaker]').tap();board.evaluate('e=>e.scrollIntoView({block:"center"})');board.tap(position={'x':200,'y':130});q.locator('[data-setup-scale]').evaluate('e=>{e.value="1.4";e.dispatchEvent(new Event("input",{bubbles:true}))}');assert q.evaluate('state.intro.lesson12.setup.diagram.stamps[0].scale')==1.4;q.locator('[data-setup-remove]').tap();assert q.evaluate('state.intro.lesson12.setup.diagram.stamps.length')==0;q.locator('[data-setup-tool=undo]').tap();assert q.evaluate('state.intro.lesson12.setup.diagram.stamps.length')==1
 q.locator('[data-setup-compare]').tap();q.wait_for_function('SetupTask2.done()');assert q.locator('.setup-reference').is_visible();assert q.evaluate('CourseGame.xp()')==20;q.reload();q.wait_for_selector('[data-setup-task]');assert q.evaluate('SetupTask2.done()');assert q.evaluate('state.intro.lesson12.setup.diagram.labels.length')==5;assert q.evaluate('state.intro.lesson12.setup.diagram.png.startsWith("data:image/png")');assert q.evaluate('CourseGame.xp()')==20
 for lang in ['en','uz-Latn','uz-Cyrl','ru']:
  q.evaluate('(l)=>{state.settings.language=l;saveState();render(false)}',lang);q.wait_for_selector('[data-setup-task]');assert q.locator('[data-setup-completion]').inner_text()==q.evaluate('Setup12Data.copy[state.settings.language].completed');assert q.evaluate('document.documentElement.scrollWidth<=innerWidth')
 q.locator('#equipment-task-2').scroll_into_view_if_needed();q.screenshot(path='/tmp/setup12-phone.png',full_page=True);assert not errors,errors;print('PASS: no-WebGL phone, 4:3, selected-only labels, six studies, finger drawing, 5 labels, scale/delete/undo, line-based completion, PNG/reload, four languages, +15 XP once');b.close()
