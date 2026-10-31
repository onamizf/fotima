from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,reduced_motion='reduce');c.route('https://fonts.googleapis.com/**',lambda r:r.abort());q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Mobile wheel')
 for language in ['ru','uz-Latn','uz-Cyrl','en']:
  q.evaluate('(language)=>{state.settings.language=language;PersonalData.data().preferences.textSize=2;saveState();render(false)}',language);q.wait_for_selector('[data-equipment-wheel]');wheel=q.locator('[data-equipment-wheel]');wheel.scroll_into_view_if_needed();assert q.evaluate('document.documentElement.scrollWidth<=innerWidth');assert q.locator('.home-tools a').count()==3;assert q.locator('a[href^="#games"]').count()==0
  q.locator('[data-wheel-step="1"]').tap();assert q.locator('.equipment-wheel [aria-selected=true]').get_attribute('id')=='wheel-option-lamp';q.locator('[data-equipment-category=glass]').tap();assert q.locator('.equipment-wheel [role=option]').count()==1;q.locator('[data-equipment-category=all]').tap();assert q.locator('.equipment-wheel [role=option]').count()==7
  orbit=q.locator('.equipment-wheel-orbit');orbit.scroll_into_view_if_needed();box=orbit.bounding_box();sx=box['x']+box['width']*.7;sy=box['y']+150;session=c.new_cdp_session(q);session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':sx,'y':sy}]});session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':sx-90,'y':sy}]});session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});q.wait_for_timeout(100);assert q.locator('.equipment-wheel [aria-selected=true]').get_attribute('id')=='wheel-option-lamp';session.detach()
  if language=='ru':q.screenshot(path='/tmp/revision24-mobile.png')
  q.locator('.equipment-wheel-more').tap();q.wait_for_selector('.equipment-page');assert q.locator('[data-study-id=lamp]').count()==1;q.goto(BASE+'#home')
 assert not errors,errors
 print('PASS phone four languages, largest text, no overflow, touch controls/categories/swipe and existing equipment destination');b.close()
