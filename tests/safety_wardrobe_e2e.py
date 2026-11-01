import sys,json,os
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from browser_auth import register_local
from playwright.sync_api import sync_playwright
BASE=os.environ.get('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 c=b.new_context(viewport={'width':1400,'height':1000},reduced_motion='reduce')
 c.route('https://fonts.googleapis.com/**',lambda route:route.abort())
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 register_local(q,BASE,'Wardrobe tester')
 q.goto(BASE+'#games');q.wait_for_selector('.sw-cover');assert q.url.endswith('#safety-wardrobe')
 q.locator('[data-sw=play]').click();q.locator('[data-sw-item=cap]').click();assert q.locator('[data-sw-item=cap]').get_attribute('aria-pressed')=='true'
 q.keyboard.press('e');assert q.locator('[data-sw-category=eyes]').get_attribute('aria-selected')=='true'
 q.locator('[data-sw-item=goggles]').click();q.locator('[data-sw=done]').click();assert 'Классный образ' in q.locator('.sw-speech').inner_text()
 jobs=q.evaluate('SafetyWardrobeData.professions')
 xp=q.evaluate('CourseGame.xp()')
 for job in jobs:
  q.locator('[data-sw=professions]').click();q.locator('[data-job='+job['id']+']').click()
  if job['id']=='electrician':
   q.locator('[data-sw-category=hands]').click();q.locator('[data-sw-item=rubber-gloves]').click();assert 'диэлектрические' in q.locator('.sw-speech').inner_text()
  for id in job['required']:
   cat=q.evaluate('(id)=>SafetyWardrobeData.items.find(i=>i.id===id).category',id)
   q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click()
  q.wait_for_selector('.sw-result-copy')
 assert q.evaluate('CourseGame.xp()')==xp+360,(q.evaluate('CourseGame.xp()'),xp)
 assert q.evaluate('state.safetyWardrobe.master')
 assert q.evaluate('Object.keys(state.safetyWardrobe.completed).length')==13
 q.reload();q.wait_for_selector('.sw-cover');assert q.evaluate('CourseGame.xp()')==xp+360
 assert '13 / 13' in q.locator('.sw-completed').inner_text()
 q.locator('[data-sw=professions]').click();q.locator('[data-job=chemist]').click()
 for id in jobs[0]['required']:
  cat=q.evaluate('(id)=>SafetyWardrobeData.items.find(i=>i.id===id).category',id)
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click()
 q.wait_for_selector('.sw-result-copy');assert q.evaluate('CourseGame.xp()')==xp+360
 assert 'уже получена' in q.locator('[data-sw-xp]').inner_text()
 q.screenshot(path='/tmp/wardrobe-result.png')
 q.reload();q.locator('[data-sw=play]').click()
 q.screenshot(path='/tmp/wardrobe-desktop.png')
 for width in [320,390,768,1400]:
  q.set_viewport_size({'width':width,'height':900})
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  q.locator('[data-sw-category=body]').click()
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  q.locator('[data-sw=professions]').click();assert q.locator('.sw-dialog').is_visible();q.keyboard.press('Escape');assert not q.locator('.sw-dialog').count()
  if width==390:q.screenshot(path='/tmp/wardrobe-mobile.png')
 assert not errors,errors
 print('PASS: 13 professions, 360 XP, persistence, no repeat rewards, free mode, Q/E, Esc, four viewport widths; no JS errors')
 b.close()
