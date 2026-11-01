"""Actual paper-doll placement, paired layers, cover registration, calibration and fallback."""
import os,json,sys
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1366,'height':768},reduced_motion='reduce',permissions=['clipboard-read','clipboard-write']);q=ctx.new_page();q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));q.route('https://fonts.gstatic.com/**',lambda r:r.abort());errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Фотима');q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=play]').click();q.wait_for_timeout(100)
 def equip(cat,id):
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').scroll_into_view_if_needed();q.locator('[data-sw-item='+id+']').click()
 def layer(id):return q.locator('[data-sw-layer='+id+']')
 xp=q.evaluate('CourseGame.xp()');assert q.locator('.sw-rug').count()==0;assert q.locator('.sw-base img').get_attribute('src')=='assets/game/frog-base.png';assert q.locator('.sw-wearable').count()==0
 equip('body','lab-coat');assert layer('lab-coat').count()==1;equip('body','apron');assert layer('apron').count()==1;assert layer('apron').evaluate('(e)=>+getComputedStyle(e).zIndex')>layer('lab-coat').evaluate('(e)=>+getComputedStyle(e).zIndex');layer('apron').click();assert layer('apron').count()==0 and layer('lab-coat').count()==1
 equip('eyes','goggles');equip('face','respirator');equip('hands','nitrile-gloves');equip('feet','closed-shoes');assert layer('nitrile-gloves').count()==2 and layer('closed-shoes').count()==2
 for id in ['nitrile-gloves','closed-shoes']:
  boxes=layer(id).evaluate_all('(es)=>es.map(e=>({part:e.dataset.swPart,x:e.getBoundingClientRect().x}))');assert boxes[0]['part']=='left' and boxes[1]['part']=='right';assert boxes[0]['x']<boxes[1]['x'];assert layer(id).locator('img').evaluate_all('(es)=>new Set(es.map(e=>e.src)).size')==1
 equip('head','space-helmet');assert layer('goggles').count()==0 and layer('respirator').count()==0;layer('space-helmet').click();assert layer('goggles').count()==1 and layer('respirator').count()==1
 equip('face','face-shield');assert layer('face-shield').evaluate('(e)=>+getComputedStyle(e).zIndex')>layer('goggles').evaluate('(e)=>+getComputedStyle(e).zIndex');equip('face','welding-mask');assert layer('goggles').count()==0;layer('welding-mask').click();assert layer('goggles').count()==1
 equip('face','fire-breathing');assert layer('fire-breathing').count()==2;assert q.locator('[data-sw-layer=fire-breathing][data-sw-slot=back]').evaluate('(e)=>+getComputedStyle(e).zIndex')<q.locator('.sw-base').evaluate('(e)=>+getComputedStyle(e).zIndex');q.locator('[data-sw-remove=fire-breathing]').click()
 assert q.evaluate('CourseGame.xp()')==xp
 # Rug registration and shared cover scene in both sidebar modes and responsive sizes.
 geometry=[]
 for width,height in [(1920,1080),(1366,768),(1024,768),(768,900),(390,844),(320,640)]:
  q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(80)
  for expanded in ([False,True] if width>=1024 else [False]):
   if width>=1024 and (q.locator('#profileMenu').get_attribute('data-compact')=='false')!=expanded:q.locator('[data-profile-compact]').click();q.wait_for_timeout(50)
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
   if width>=1024:assert q.evaluate('document.documentElement.scrollHeight<=innerHeight+1')
   v=q.locator('.sw-scene-viewport').bounding_box();world=q.locator('.sw-world').bounding_box();frog=q.locator('.sw-doll').bounding_box();assert abs(world['width']/world['height']-1376/768)<.01;assert abs(frog['width']/frog['height']-589/1072)<.01;assert abs(frog['x']+frog['width']/2-(world['x']+world['width']*.36))<1;assert abs(frog['y']+frog['height']-(world['y']+world['height']*.91))<1
   assert frog['y']>=v['y']-1 and frog['y']+frog['height']<=v['y']+v['height']+1,(width,height,expanded,frog,v)
   cols=q.locator('.sw-grid').evaluate('(e)=>getComputedStyle(e).gridTemplateColumns.split(" ").length');assert cols==(4 if q.locator('.sw').get_attribute('data-layout')=='stacked' else 5)
   geometry.append({'width':width,'height':height,'expanded':expanded,'columns':cols})
 q.set_viewport_size({'width':1366,'height':768});q.wait_for_timeout(100);q.emulate_media(reduced_motion='no-preference');frame=q.locator('.sw').bounding_box();q.mouse.move(frame['x']+20,frame['y']+frame['height']/2);q.wait_for_timeout(60);before=q.locator('.sw-world').bounding_box();before_frog=q.locator('.sw-doll').bounding_box();q.mouse.move(frame['x']+frame['width']-20,frame['y']+frame['height']/2);q.wait_for_timeout(70);after=q.locator('.sw-world').bounding_box();after_frog=q.locator('.sw-doll').bounding_box();assert 1<after['x']-before['x']<=16.1;assert abs(after['x']-before['x']-(after_frog['x']-before_frog['x']))<.3;q.emulate_media(reduced_motion='reduce')
 q.locator('[data-sw=reset]').click();assert q.locator('.sw-wearable').count()==0
 # Calibrator is private to ?calibrate=1 and exports JSON without touching learner progress.
 assert q.locator('.sw-calibration').count()==0;q.goto(BASE+'?calibrate=1#safety-wardrobe');q.locator('[data-sw=play]').click();equip('body','lab-coat');assert q.locator('.sw-calibration').is_visible();node=layer('lab-coat');before=node.bounding_box();q.mouse.move(before['x']+before['width']/2,before['y']+before['height']/2);q.mouse.down();q.mouse.move(before['x']+before['width']/2+18,before['y']+before['height']/2+12,steps=4);q.mouse.up();after=node.bounding_box();assert 16<after['x']-before['x']<20 and 10<after['y']-before['y']<14
 q.mouse.move(after['x']+after['width']/2,after['y']+after['height']/2);q.mouse.wheel(0,-100);q.wait_for_timeout(80);assert node.bounding_box()['width']>after['width'];q.keyboard.press(']');assert '2deg' in node.get_attribute('style');q.locator('[data-sw=copy-calibration]').click();q.wait_for_timeout(80);export=q.evaluate('navigator.clipboard.readText()');config=json.loads(export);assert 'lab-coat:main' in config['adjustments'];assert len(config['items'])==41;assert q.evaluate('CourseGame.xp()')==xp
 q.locator('[data-sw=left]').click();assert q.locator('.sw-frog-turn').evaluate('(e)=>getComputedStyle(e).transform').startswith('matrix(-1');assert node.is_visible();q.keyboard.press('Escape');q.wait_for_function('location.hash==="#home"');assert q.locator('.sw-flying,.sw-confetti,.sw-calibration').count()==0
 # No images: usable cards, base and scene fallbacks, unchanged completion.
 q.route('**/assets/game/items/*',lambda r:r.abort());q.route('**/assets/game/frog-base.png',lambda r:r.abort());q.route('**/assets/game/scenes/*',lambda r:r.abort());q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=professions]').click();q.locator('[data-job=astronaut]').click();q.wait_for_selector('.sw-base.sw-image-missing');assert q.locator('.sw-frog-fallback').is_visible()
 for cat,id in [('head','space-helmet'),('body','space-suit'),('hands','space-gloves'),('feet','space-boots')]:equip(cat,id)
 q.wait_for_selector('.sw-result-copy');assert q.locator('.sw-scene-fallback').is_visible();assert q.evaluate('state.safetyWardrobe.completed.astronaut')==3
 assert not errors,errors
 (ROOT/'artifacts/wardrobe-layers-validation.json').write_text(json.dumps({'status':'passed','geometry':geometry,'checks':['physical item layers and coat/apron stacking','two independently anchored gloves and shoes','helmet hide/reveal and shield ordering','air tank behind base and mask in front','same-scene rug registration and cover scale','no document scrolling at desktop sizes','responsive 5/4 column selection','shared parallax and reduced motion','drag, wheel, rotate, clipboard JSON calibration','flipping and clean exit','unavailable art fallbacks without changing profession logic'],'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('PASS paper-doll layers, paired items, rug registration, responsive viewport, calibration export and art fallbacks')
