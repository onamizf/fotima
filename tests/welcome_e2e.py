from pathlib import Path
from io import BytesIO
from PIL import Image
import os
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
base=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8030/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 q=b.new_page(viewport={'width':1366,'height':900});errs=[];q.on('pageerror',lambda e:errs.append(str(e)))
 q.goto(base);q.wait_for_selector('.welcome-screen');q.mouse.move(680,300);q.wait_for_timeout(200);q.screenshot(path=str(root/'artifacts/welcome-night-1366.png'),full_page=True)
 # Regression: solid cheeks and neck at cursor extremes in both themes.
 for appearance in ['dark','light']:
  if q.locator('html').get_attribute('data-theme')!=appearance:q.locator('#themeToggle').click()
  for x,y in [(0,0),(1365,0),(0,899),(1365,899)]:
   q.mouse.move(x,y);q.wait_for_timeout(100)
   pixels=Image.open(BytesIO(q.locator('.welcome-frog').screenshot())).convert('RGB')
   for sx,sy in [(228,190),(284,245),(307,257),(332,240)]:
    color=pixels.getpixel((round(sx*pixels.width/640),round(sy*pixels.height/768)))
    assert max(color)-min(color)>12 and 45<sum(color)/3<235,(appearance,x,y,sx,sy,color)
 if q.locator('html').get_attribute('data-theme')!='dark':q.locator('#themeToggle').click()
 before=q.evaluate('JSON.stringify(state)');q.mouse.move(1300,300);q.wait_for_timeout(200);right=q.locator('[data-frog-head]').get_attribute('style');eyeRight=q.locator('[data-frog-pupil]').first.get_attribute('transform');q.mouse.move(50,650);q.wait_for_timeout(200);assert right!=q.locator('[data-frog-head]').get_attribute('style');assert eyeRight!=q.locator('[data-frog-pupil]').first.get_attribute('transform');assert before==q.evaluate('JSON.stringify(state)')
 q.locator('.welcome-enter').click();q.wait_for_selector('input[name=email]');assert q.evaluate('document.body.dataset.page')=='account'
 q.goto(base+'#lab/properties');q.wait_for_selector('input[name=email]');assert q.locator('.welcome-screen').count()==0
 q.goto(base+'#welcome');q.locator('#themeToggle').click();q.screenshot(path=str(root/'artifacts/welcome-day-1366.png'),full_page=True)
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.select_option('#language',lang)
  for width in [320,375,768,1366]:
   q.set_viewport_size({'width':width,'height':900});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,width)
   assert q.locator('.welcome-enter').is_visible()
 q.select_option('#language','ru');q.set_viewport_size({'width':375,'height':812});q.mouse.move(5,5);q.screenshot(path=str(root/'artifacts/welcome-day-375.png'),full_page=True)
 q.emulate_media(reduced_motion='reduce');q.mouse.move(300,300);q.wait_for_timeout(200);assert q.locator('[data-frog-head]').get_attribute('style') in [None,''];assert not errs,errs
 b.close()
print('Passed: tracking head and pupils, immutable learning state, public welcome and protected routes, 16 layouts, reduced motion')
