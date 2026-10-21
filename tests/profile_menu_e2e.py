"""Left sidebar and an independent top-right account shortcut, with mobile keyboard access."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8034/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 ctx=b.new_context(viewport={'width':1366,'height':900});ctx.route('**/src/cloud-config.js',lambda r:r.fulfill(content_type='application/javascript',body='window.FOTIMA_CLOUD_CONFIG={enabled:false};'))
 q=ctx.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE+'#home')
 before=q.evaluate('JSON.stringify(state)');q.wait_for_selector('#profileMenu[open]');box=q.locator('#profileMenu').bounding_box();assert box['x']<30 and box['width']<100
 q.locator('[data-profile-compact]').click();assert q.locator('#profileMenu').bounding_box()['width']>250
 q.wait_for_timeout(200);q.screenshot(path=str(ROOT/'artifacts/profile-menu-night-1366.png'),full_page=True)
 assert before==q.evaluate('JSON.stringify(state)')
 main=q.locator('#main').bounding_box();box=q.locator('#profileMenu').bounding_box();assert main['x']>=box['x']+box['width']
 assert q.locator('#profileToggle').bounding_box()['x']>1000
 q.locator('#profileToggle').click();q.wait_for_selector('#accountForm');assert q.locator('#profileMenu[open]').is_visible()
 q.locator('#profileMenu a[href="#progress"]').click();q.wait_for_function('document.body.dataset.page==="progress"')
 q.set_viewport_size({'width':375,'height':900});q.wait_for_selector('#profileMenu[open]',state='detached');q.locator('#navigationToggle').focus();q.keyboard.press('Enter');q.wait_for_selector('#profileMenu[open]')
 for _ in range(12):
  q.keyboard.press('Tab');assert q.evaluate('document.activeElement.closest("#profileMenu")!==null')
 q.keyboard.press('Escape');q.wait_for_selector('#profileMenu[open]',state='detached');assert q.locator('#navigationToggle').evaluate('(e)=>e===document.activeElement')
 q.locator('#navigationToggle').click();q.mouse.click(370,5);q.wait_for_selector('#profileMenu[open]',state='detached')
 layouts=0
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.select_option('#language',lang)
  for theme in ['dark','light']:
   if q.locator('html').get_attribute('data-theme')!=theme:q.locator('#themeToggle').click()
   for width in [320,375,768,1366]:
    q.set_viewport_size({'width':width,'height':900})
    if width<1100:q.locator('#navigationToggle').click()
    q.wait_for_selector('#profileMenu[open]');box=q.locator('#profileMenu').bounding_box()
    assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,theme,width)
    assert box['x']<30 and box['x']+box['width']<=width+1,(lang,theme,width,box)
    assert q.locator('#profileMenu a[href="#account"]').is_visible();assert 'undefined' not in q.locator('#profileMenu').inner_text()
    if width<1100:q.keyboard.press('Escape')
    layouts+=1
 q.set_viewport_size({'width':375,'height':900});q.select_option('#language','ru');q.goto(BASE+'#home');q.locator('#navigationToggle').click();q.wait_for_timeout(200);q.screenshot(path=str(ROOT/'artifacts/profile-menu-day-375.png'),full_page=True)
 assert not errors,errors;b.close()
print(f'Passed: {layouts} layouts, sidebar remains on the left, no content overlap, separate right profile link, mobile focus/Escape/backdrop, no progress mutation')
