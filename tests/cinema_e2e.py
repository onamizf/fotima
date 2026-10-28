"""Shared cinema layout, gestures, localized hazards and reduced motion."""
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 for width,height,motion in [(1440,1000,'no-preference'),(390,844,'reduce')]:
  q=b.new_page(viewport={'width':width,'height':height},reduced_motion=motion);errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
  register_local(q,'http://127.0.0.1:8044/','Cinema'+str(width));q.goto('http://127.0.0.1:8044/#topic/intro');q.locator('.intro-road [data-intro-step="0"]').click();q.locator('[data-intro-begin]').click();q.wait_for_selector('.sp-loader',state='hidden');shell=q.locator('.cinema-shell');box=shell.bounding_box();assert box['height']>height*.85
  assert q.locator('.sp-panel,.sp-controls,.sp-subtitle,.intro-guide').count()==0
  stage=q.locator('.sp-scene');stage.click(position={'x':20,'y':150});expect(shell).to_have_class(__import__('re').compile('is-paused'))
  stage.click(position={'x':20,'y':150});expect(shell).not_to_have_class(__import__('re').compile('is-paused'))
  q.locator('[data-cinema=collapse]').click();expect(shell).to_have_class(__import__('re').compile('bubble-collapsed'));q.locator('[data-cinema=expand]').click()
  q.locator('[data-stage="2"]').click(force=True);expect(q.locator('.cinema-danger-badge')).to_be_visible();assert 'ОПАСНО' in q.locator('.cinema-danger-badge').inner_text();assert q.locator('.cinema-danger-ring').bounding_box()['width']>10
  if motion=='reduce':expect(shell).to_have_class(__import__('re').compile('is-reduced'))
  q.locator('[data-stage="3"]').click(force=True);q.locator('.sp-hotspot').click();expect(q.locator('[data-risk="0"]')).to_be_visible()
  camera=q.locator('.sp-camera').bounding_box();assert camera['width']>0
  q.locator('[data-cinema=back]').click();expect(q.locator('.intro-road')).to_be_visible();assert not errors,errors;q.close()
 b.close()
print('PASS: desktop/phone cinema bounds, pause/resume, bubble collapse, positioned danger, reduced motion, hotspot answers and chapter back')
