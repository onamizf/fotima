"""Continuous profile controls: editing, saved outfit, modal details, count-up, tilt and isolation."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);c=b.new_context(viewport={'width':1366,'height':768},has_touch=True)
 for host in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+host+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Profile Editor');q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');xp=q.evaluate('CourseGame.xp()');q.wait_for_timeout(900)
 assert q.locator('[data-profile-count]').nth(1).inner_text()==str(xp)
 q.locator('[data-profile-edit]').click();q.locator('.pf-edit [name=handle]').fill('bad handle!');q.locator('.pf-edit [type=submit]').click();assert q.locator('.pf-form-error').inner_text()
 q.locator('.pf-edit [name=handle]').fill('chemist_2026');q.locator('.pf-edit [name=displayName]').fill('Profile Chemist');q.locator('.pf-edit [name=language]').select_option('en');q.locator('.pf-edit [type=submit]').click();q.wait_for_selector('.pf-stat');assert q.locator('html').get_attribute('lang')=='en';assert '@chemist_2026' in q.locator('.pf-handle').inner_text();assert q.locator('.pf-avatar').inner_text()=='P';assert q.evaluate('CourseGame.xp()')==xp
 q.locator('[data-profile-info]').click();assert q.locator('[data-accuracy-note]').is_visible();q.locator('[data-profile-info]').click();assert q.locator('[data-accuracy-note]').is_hidden()
 banner=q.locator('.pf-banner').bounding_box();q.mouse.move(banner['x']+banner['width']*.8,banner['y']+banner['height']*.7);q.wait_for_timeout(80);assert 0<float(q.locator('.pf-banner').evaluate('e=>parseFloat(e.style.getPropertyValue("--banner-x"))'))<=6
 badge=q.locator('[data-profile-badge=first-step]');badge.scroll_into_view_if_needed();r=badge.bounding_box();q.mouse.move(r['x']+r['width']*.75,r['y']+r['height']*.3);assert 0<badge.evaluate('e=>parseFloat(e.style.getPropertyValue("--tilt-y"))')<=8
 q.goto(BASE+'#safety-wardrobe');q.wait_for_selector('[data-sw=play]');q.locator('[data-sw=play]').click();q.locator('[data-sw-item]').first.click();q.locator('[data-sw=save-look]').click();q.wait_for_selector('.pf-achievement-toast');assert q.evaluate('Object.keys(ProfileModel.data().achievements)')==['lab-fashion'];assert q.evaluate('ProfileModel.data().outfit.length')>0
 q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');q.locator('[data-profile-badge=lab-fashion]').click();q.wait_for_selector('.pf-dialog-detail[open]');assert q.evaluate('ProfileModel.data().achievements["lab-fashion"].seen');q.keyboard.press('Escape');q.reload();q.wait_for_selector('.pf-stat');assert q.locator('[data-profile-badge=lab-fashion] .pf-new').count()==0
 q.emulate_media(reduced_motion='reduce');q.locator('[data-profile-badge=first-step]').click();q.wait_for_selector('.pf-dialog-detail[open]');assert q.locator('.pf-detail-image').evaluate('e=>getComputedStyle(e).animationName')=='none';q.keyboard.press('Escape')
 q.set_viewport_size({'width':390,'height':844});q.emulate_media(reduced_motion='no-preference');q.locator('[data-profile-badge=first-step]').tap();q.wait_for_selector('.pf-dialog-detail[open]');sheet=q.locator('.pf-dialog-detail').bounding_box();assert abs(sheet['y']+sheet['height']-844)<2;q.locator('.pf-dialog-detail [data-profile-close]').tap()
 q.locator('.pf-badges').scroll_into_view_if_needed();r=q.locator('.pf-badges').bounding_box();cdp=c.new_cdp_session(q);x=r['x']+r['width']*.8;y=r['y']+40;cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
 for n in range(1,9):cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x-n*22,'y':y}]})
 cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});q.wait_for_timeout(350);assert q.locator('.pf-badges').evaluate('e=>e.scrollLeft')>0
 q.evaluate('LocalAuth.signOut()');register_local(q,BASE,'Second Profile');q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');assert q.evaluate('Object.keys(ProfileModel.data().achievements).length')==0;assert q.evaluate('ProfileModel.data().outfit.length')==0
 q.goto(BASE+'#topic/ch1/1.1');q.wait_for_selector('[data-project-achievement=safety]');q.locator('[data-project-achievement=safety]').focus();q.keyboard.press('Enter');q.wait_for_selector('.pf-dialog-detail[open]');box=q.locator('.pf-dialog-detail').bounding_box();assert box['x']>=0 and box['x']+box['width']<=q.viewport_size['width'];q.keyboard.press('Escape');assert q.locator('[data-project-achievement=safety]').evaluate('e=>e===document.activeElement');assert q.locator('[data-project-open]').get_attribute('href')=='#lab/ch1/1.1/task-1'
 assert not errors,errors
 print('PASS continuous profile / editing and language / count-up / tooltip / desktop parallax and tilt / saved outfit / reduced motion / separate account data',flush=True);b.close()
