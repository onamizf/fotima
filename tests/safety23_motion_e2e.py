from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1280,'height':900});q.route('https://fonts.googleapis.com/**',lambda r:r.abort());register_local(q,BASE,'Safety motion');q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_function('SafetyWorkspace.debug.player?.playing');q.locator('[data-sp=advance-line]').click();assert q.locator('.sp-camera>img').first.evaluate('e=>getComputedStyle(e).transitionDuration')=='1.2s';q.locator('[data-sp=advance-line]').click();q.wait_for_timeout(100);frames=q.locator('.cinema-stage').evaluate('e=>e.getAnimations().flatMap(a=>a.effect.getKeyframes()).filter(f=>f.transform)');assert frames;assert any('3px' in f['transform'] for f in frames),frames
 q.locator('[data-sw=pause]').click();x=q.locator('.sp-camera').evaluate('e=>getComputedStyle(e).transform');q.wait_for_timeout(500);assert q.locator('.sp-camera').evaluate('e=>getComputedStyle(e).transform')==x
 q.locator('[data-sw=restart]').click();q.wait_for_timeout(150);assert q.evaluate('SafetyWorkspace.debug.player.stage')==0;assert q.evaluate('SafetyWorkspace.debug.player.narration.hold')==0
 for i in range(4):q.locator('[data-sp=advance-line]').click()
 assert q.locator('.sp-camera>img').last.evaluate('e=>getComputedStyle(e).transitionDuration')=='1.5s'
 q.emulate_media(reduced_motion='reduce');q.locator('[data-sw=restart]').click();q.wait_for_timeout(200);assert q.locator('.sp-camera>img').first.evaluate('e=>getComputedStyle(e).transitionDuration')=='0.6s';assert q.locator('.sp-camera').evaluate('e=>getComputedStyle(e).transform') in ['matrix(1, 0, 0, 1, 0, 0)','none'];q.locator('[data-sp=advance-line]').click();q.locator('[data-sp=advance-line]').click();assert q.locator('.sp-camera canvas').evaluate('e=>e.getContext("2d").getImageData(0,0,e.width,e.height).data.some(v=>v)')==False
 print('PASS 1.2s/1.5s fades, soft 3px shake, frozen zoom on pause, restart narration, reduced 0.6s fades and no particles')
 b.close()
