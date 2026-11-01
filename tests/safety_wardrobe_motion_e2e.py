import sys,os
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from browser_auth import register_local
from playwright.sync_api import sync_playwright
BASE=os.environ.get('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);q=b.new_page(viewport={'width':1400,'height':1000});q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 errors=[];console=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:console.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Normal motion')
 for route in ['#home','#topics','#resources/glossary','#materials/properties']:
  q.goto(BASE+route);q.wait_for_selector('main');assert q.locator('main').inner_text()
 q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=professions]').click();q.locator('[data-job=chemist]').click()
 # Arrows and animation; previous welcome text must not overwrite feedback.
 q.keyboard.press('ArrowRight');assert q.locator('[data-sw-category=eyes]').get_attribute('aria-selected')=='true'
 q.locator('[data-sw-item=sealed-goggles]').click();q.wait_for_timeout(250);assert 'другая защита' in q.locator('.sw-speech').inner_text()
 q.locator('[data-sw=hint]').click();assert q.locator('.sw-highlight[data-sw-item]').count()==1
 q.locator('[data-sw=professions]').click();q.locator('[data-job=surgeon]').click();assert 'Сменить профессию' in q.locator('.sw-dialog').inner_text();q.locator('[data-sw=confirm-job]').click()
 for id,cat in [('cap','head'),('medical-mask','face'),('surgical-gown','body'),('nitrile-gloves','hands'),('shoe-covers','feet')]:
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click()
 q.wait_for_selector('.sw-result-copy',timeout=10000);assert q.evaluate('state.safetyWardrobe.completed.surgeon')==3
 q.wait_for_timeout(1100)
 q.screenshot(path='/tmp/wardrobe-final.png')
 # With unavailable art, accessible text and emoji still allow completion.
 q.route('**/assets/game/items/*',lambda r:r.abort())
 q.route('**/assets/game/scenes/*',lambda r:r.abort())
 q.reload();q.locator('[data-sw=professions]').click();q.locator('[data-job=astronaut]').click()
 for id,cat in [('space-helmet','head'),('space-suit','body'),('space-gloves','hands'),('space-boots','feet')]:
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click()
 q.wait_for_selector('.sw-result-copy',timeout=10000);assert q.locator('.sw-scene-fallback').is_visible()
 # Return via Esc and check lifecycle cleanup.
 q.keyboard.press('Escape');q.wait_for_url('**/#home');q.wait_for_timeout(1000);assert not q.locator('.sw-flying,.sw-confetti').count()
 assert not errors,errors
 unexpected=[e for e in console if 'ERR_FAILED' not in e] # requests intentionally aborted in the fallback scenario
 assert not unexpected,unexpected
 print('PASS normal animation, friendly feedback, hints, confirmation, image fallbacks, lifecycle, existing routes; no unexpected console errors')
 b.close()
