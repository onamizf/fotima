from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce');c.route('https://fonts.googleapis.com/**',lambda r:r.abort());q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Safety mobile')
 for language in ['ru','uz-Latn','uz-Cyrl','en']:
  q.evaluate('(language)=>{state.settings.language=language;saveState()}',language);q.goto(BASE+'#topic/ch1/1.1');q.reload();q.wait_for_selector('.safety-project-collage');assert q.locator('.project-card').count()==1;assert q.evaluate('document.documentElement.scrollWidth<=innerWidth')
  q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_function('SafetyWorkspace.debug.player?.playing');assert q.evaluate('document.documentElement.scrollWidth<=innerWidth');q.locator('[data-sw=pause]').tap();assert not q.evaluate('SafetyWorkspace.debug.player.playing');q.locator('[data-sw=pause]').tap();assert q.evaluate('SafetyWorkspace.debug.player.playing');q.locator('[data-sw=drawer]').tap();q.locator('.safety-scene-tiles [data-sw-scene="1"]').tap();q.wait_for_function('SafetyWorkspace.debug.current===1 && SafetyWorkspace.debug.player?.stage===0',timeout=8000);assert q.locator('.safety-scene-nav').is_visible();q.locator('[data-sp=advance-line]').tap();assert q.evaluate('SafetyWorkspace.debug.player.stage')==1
  if language=='ru':q.screenshot(path='/tmp/safety23-mobile.png')
 assert not errors,errors
 print('PASS phone, four languages, touch pause/navigation/advance, no overflow, reduced motion')
 b.close()
