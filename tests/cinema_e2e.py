"""Start gate, localized cinema hazards, input isolation and recoverable loading errors."""
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
import re
BASE='http://127.0.0.1:8045/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 for width,height,motion in [(1440,1000,'no-preference'),(390,844,'reduce')]:
  q=b.new_page(viewport={'width':width,'height':height},reduced_motion=motion);errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.clock.install();register_local(q,BASE,'Cinema'+str(width));q.goto(BASE+'#topic/intro');q.locator('.intro-road [data-intro-step="0"]').click();q.wait_for_selector('.sp-loader',state='hidden');shell=q.locator('.cinema-shell');assert shell.bounding_box()['height']>height*.85;expect(shell).to_have_class(re.compile('is-awaiting-start'));assert q.locator('.intro-brief,.sp-panel,.sp-controls,.sp-subtitle,.intro-guide').count()==0
  q.locator('[data-cinema=start]').click();tap=q.locator('.sp-scene');tap.click(position={'x':20,'y':150});expect(shell).to_have_class(re.compile('is-paused'));q.clock.run_for(350);tap.click(position={'x':20,'y':150});expect(shell).not_to_have_class(re.compile('is-paused'))
  q.locator('[data-cinema=collapse]').click();expect(shell).to_have_class(re.compile('bubble-collapsed'));q.locator('[data-cinema=expand]').click();q.clock.run_for(6500);expect(q.locator('.cinema-danger-badge')).to_be_visible();assert q.locator('.cinema-danger-ring').bounding_box()['width']>10
  if motion=='reduce':expect(shell).to_have_class(re.compile('is-reduced'));assert not q.locator('.cinema-ripple').count()
  q.clock.run_for(3500);q.locator('.sp-hotspot').click();q.locator('[data-risk="0"]').click();q.clock.run_for(250);expect(q.locator('[data-safe-action="0"]')).to_be_visible();assert not shell.get_attribute('class').__contains__('is-paused');assert not errors,errors;q.close()
 q=b.new_page();warnings=[];q.on('console',lambda msg:warnings.append(msg.text) if msg.type=='warning' else None);register_local(q,BASE,'Retry Learner');q.route('**/assets/lab/1-1/a-*.webp',lambda route:route.abort());q.goto(BASE+'#topic/intro');q.locator('.intro-road [data-intro-step="0"]').click();expect(q.locator('[data-scene-retry]')).to_be_visible();assert any('Frames failed' in w for w in warnings);q.unroute('**/assets/lab/1-1/a-*.webp');q.locator('[data-scene-retry]').click();q.wait_for_selector('.sp-loader',state='hidden');q.locator('[data-cinema=start]').click();expect(q.locator('.cinema-start')).to_have_count(0);q.close();b.close()
print('PASS: desktop/phone start, pause, bubble controls, position-aware hazards, delegated answers, reduced motion, frame warnings and retry')
