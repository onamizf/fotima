from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 c=b.new_context(viewport={'width':1440,'height':1000});c.route('https://fonts.googleapis.com/**',lambda r:r.abort());q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 register_local(q,BASE,'Safety twenty three');q.goto(BASE+'#topic/ch1/1.1');q.wait_for_selector('.safety-project-collage');assert q.locator('.safety-project-collage img').count()==4;assert q.locator('.safety-situations').count()==0;assert q.locator('[data-project-filter]').count()==3
 with q.expect_popup() as popup:q.locator('[data-project-open]').click()
 w=popup.value;w.on('pageerror',lambda e:(errors.append(str(e)),print('JS',str(e),flush=True)));w.wait_for_selector('[data-safety-workspace]');w.wait_for_function('SafetyWorkspace.debug.player?.playing');assert w.locator('.safety-scene-tiles>button').count()==4;w.screenshot(path='/tmp/safety23-desktop.png')
 initial=w.evaluate('SafetyWorkspace.debug.player.narration.index');w.wait_for_timeout(550);n=w.evaluate('SafetyWorkspace.debug.player.narration.index');assert 3<=n-initial<=13,(initial,n)
 w.locator('[data-sw=pause]').click();d=w.evaluate('SafetyWorkspace.debug.player');w.wait_for_timeout(800);assert w.evaluate('SafetyWorkspace.debug.player.narration.index')==d['narration']['index'];w.locator('[data-sw=pause]').click()
 w.locator('.cinema-line').click();w.wait_for_timeout(1000);assert w.evaluate('SafetyWorkspace.debug.player.stage')==0;assert not w.evaluate('SafetyWorkspace.debug.player.narration.typing');w.wait_for_timeout(5000);assert w.evaluate('SafetyWorkspace.debug.player.stage')==0
 w.locator('[data-sw=pause]').click();hold=w.evaluate('SafetyWorkspace.debug.player.narration.hold');w.wait_for_timeout(600);assert w.evaluate('SafetyWorkspace.debug.player.narration.hold')==hold;w.locator('[data-sw=pause]').click();w.wait_for_function('SafetyWorkspace.debug.player.stage===1',timeout=13000)
 w.keyboard.press('ArrowLeft');assert w.evaluate('SafetyWorkspace.debug.player.stage')==0
 # Explicit next is permitted before the reading timer; all five stages and three analyses form evidence.
 for i in range(7):w.locator('[data-sp=advance-line]').click()
 assert w.evaluate('SafetyWorkspace.debug.player.explanationIndex')==2
 assert w.evaluate('SafetyLesson.counts().analysis')==1
 q.bring_to_front();q.wait_for_function('document.querySelector(".project-card footer").textContent.includes("1/4")')
 w.bring_to_front();w.keyboard.press('Shift+ArrowRight');w.wait_for_function('SafetyWorkspace.debug.current===1 && SafetyWorkspace.debug.player?.stage===0',timeout=10000)
 for scene in range(1,4):
  for i in range(7):w.locator('[data-sp=advance-line]').click()
  assert w.evaluate('SafetyLesson.counts().analysis')==scene+1
  if scene<3:w.locator('.sp-primary').click();w.wait_for_function('(i)=>SafetyWorkspace.debug.current===i && SafetyWorkspace.debug.player?.stage===0',arg=scene+1,timeout=10000)
 assert w.locator('[data-sw=submit]').is_enabled();xp=w.evaluate('CourseGame.xp()');w.locator('[data-sw=submit]').click();assert w.locator('[data-sw-results]').is_visible();w.locator('[data-sw=close]').click();w.reload();w.wait_for_function('SafetyWorkspace.debug.player?.explanationIndex===2');assert w.evaluate('CourseGame.xp()')==xp;assert w.evaluate('TextbookCourse.done("1.1")')
 assert not errors,errors
 print('PASS project card/new tab, typing and 15s reading gate, pause, keyboard, all 4 proofs, cross-tab sync, submission, reload and XP dedup')
 b.close()
