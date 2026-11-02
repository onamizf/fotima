"""Full-canvas registration, asset cache, hit testing and fallback-only calibration."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':1366,'height':768},reduced_motion='reduce',permissions=['clipboard-read','clipboard-write']);q=c.new_page();q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));q.route('https://fonts.gstatic.com/**',lambda r:r.abort());errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Фотима');q.goto(BASE+'#games');q.wait_for_selector('.sw-cover');assert q.url.endswith('#safety-wardrobe');q.locator('[data-sw=play]').click()
 def equip(cat,id):
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').scroll_into_view_if_needed();q.locator('[data-sw-item='+id+']').click()
 def layer(id):return q.locator('[data-sw-layer='+id+']')
 xp=q.evaluate('CourseGame.xp()');assert q.locator('.sw-rug').count()==0
 equip('body','lab-coat');q.wait_for_selector('.sw-full-layer[data-sw-layer=lab-coat]');equip('body','apron');q.wait_for_selector('.sw-full-layer[data-sw-layer=apron]');assert layer('lab-coat').count()==0;equip('body','lab-coat');q.wait_for_selector('.sw-full-layer[data-sw-layer=lab-coat]');assert layer('apron').count()==0
 equip('eyes','goggles');equip('face','respirator');equip('hands','nitrile-gloves');equip('feet','closed-shoes');q.wait_for_function('document.querySelectorAll(".sw-full-layer").length===5')
 doll=q.locator('.sw-doll').bounding_box()
 for node in q.locator('.sw-full-layer').all():
  r=node.bounding_box();assert all(abs(r[k]-doll[k])<.1 for k in ['x','y','width','height']);assert node.locator('img').evaluate('(i)=>i.naturalWidth===896&&i.naturalHeight===1200')
 assert layer('nitrile-gloves').count()==1 and layer('closed-shoes').count()==1
 equip('head','space-helmet');q.wait_for_selector('[data-sw-layer=space-helmet]');assert layer('goggles').count()==0 and layer('respirator').count()==0
 q.locator('[data-sw-remove=space-helmet]').click();q.wait_for_selector('[data-sw-layer=goggles]');assert layer('respirator').count()==1
 equip('face','face-shield');q.wait_for_selector('[data-sw-layer=face-shield]');assert layer('face-shield').evaluate('(e)=>+getComputedStyle(e).zIndex')>layer('goggles').evaluate('(e)=>+getComputedStyle(e).zIndex')
 # Clicking an opaque coat pixel removes the coat, not a transparent upper layer.
 q.locator('[data-sw-remove=face-shield]').click();q.mouse.click(doll['x']+doll['width']*.5,doll['y']+doll['height']*.55);assert layer('lab-coat').count()==0;assert layer('goggles').count()==1
 equip('feet','rubber-boots');q.wait_for_selector('.sw-fallback-layer[data-sw-layer=rubber-boots]');assert layer('rubber-boots').count()==2
 for part,x in [('left',37),('right',63)]:
  node=q.locator('[data-sw-layer=rubber-boots][data-sw-part='+part+']');assert 'left:'+str(x)+'%' in node.get_attribute('style')
 assert q.evaluate('CourseGame.xp()')==xp
 # Cover scene and foot registration at desktop and mobile sizes.
 geometry=[]
 for width,height in [(1920,1080),(1366,768),(1024,768),(768,900),(390,844),(320,640)]:
  q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(80)
  for expanded in ([False,True] if width>=1024 else [False]):
   if width>=1024 and (q.locator('#profileMenu').get_attribute('data-compact')=='false')!=expanded:q.locator('[data-profile-compact]').click();q.wait_for_timeout(50)
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');assert q.evaluate('document.documentElement.scrollHeight<=innerHeight+1')
   v=q.locator('.sw-scene-viewport').bounding_box();world=q.locator('.sw-world').bounding_box();frog=q.locator('.sw-doll').bounding_box();assert abs(world['width']/world['height']-1376/768)<.01;assert abs(frog['width']/frog['height']-896/1200)<.01
   assert abs(frog['x']+frog['width']/2-(world['x']+world['width']*.36))<1
   assert abs(frog['y']+frog['height']*.95-(world['y']+world['height']*.88))<1
   assert abs(frog['height']/v['height']-.62)<.01
   assert frog['y']>=v['y']-1 and frog['y']+frog['height']<=v['y']+v['height']+1
   speech=q.locator('.sw-speech').bounding_box();assert speech['x']+speech['width']<frog['x']+frog['width']*.29+1
   cols=q.locator('.sw-grid').evaluate('(e)=>getComputedStyle(e).gridTemplateColumns.split(" ").length');assert cols==(4 if q.locator('.sw').get_attribute('data-layout')=='stacked' else 5);geometry.append({'width':width,'height':height,'expanded':expanded,'columns':cols})
 # Calibrator only targets missing image fallbacks, never full-canvas layers.
 q.set_viewport_size({'width':1366,'height':768});q.goto(BASE+'?calibrate=1#safety-wardrobe');q.locator('[data-sw=play]').click();equip('body','lab-coat');q.wait_for_selector('.sw-full-layer[data-sw-layer=lab-coat]');equip('feet','rubber-boots');q.wait_for_selector('.sw-fallback-layer');q.locator('.sw-calibration summary').click();assert q.locator('.sw-calibration').get_attribute('open') is not None
 node=q.locator('[data-sw-layer=rubber-boots][data-sw-part=left]');r=node.bounding_box();q.mouse.move(r['x']+r['width']/2,r['y']+r['height']/2);q.mouse.down();q.mouse.move(r['x']+r['width']/2+18,r['y']+r['height']/2-8,steps=3);q.mouse.up();q.keyboard.press(']');q.locator('[data-sw=copy-calibration]').click();q.wait_for_timeout(60);config=json.loads(q.evaluate('navigator.clipboard.readText()'));assert list(config)==['fallbackAdjustments'];assert 'rubber-boots:left' in config['fallbackAdjustments'];assert all(k.startswith('rubber-boots:') for k in config['fallbackAdjustments'])
 box=q.locator('.sw-calibration').bounding_box();selection=q.locator('.sw-selection').bounding_box();assert box['x']+box['width']<selection['x'];q.locator('.sw-calibration summary').click();assert q.locator('.sw-calibration').get_attribute('open') is None
 # When the absent file is added, normal onload automatically selects the full layer.
 q.route('**/wear/rubber-boots.webp*',lambda r:r.fulfill(path=str(ROOT/'assets/game/wear/steel-boots.webp'),content_type='image/webp'));q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=play]').click();equip('feet','rubber-boots');q.wait_for_selector('.sw-full-layer[data-sw-layer=rubber-boots]');assert q.locator('.sw-fallback-layer').count()==0
 # A fresh tab loads all 40 actual layers and renders each at the unmodified canvas size.
 fresh=c.new_page();fresh.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));fresh.goto(BASE+'#safety-wardrobe');fresh.locator('[data-sw=play]').click();fresh.on('pageerror',lambda e:errors.append(str(e)))
 loaded=fresh.evaluate('''async()=>{const items=SafetyWardrobeData.items.filter(i=>i.id!=="rubber-boots");return await Promise.all(items.map(i=>new Promise(resolve=>{const img=new Image();img.onload=()=>resolve({id:i.id,w:img.naturalWidth,h:img.naturalHeight});img.onerror=()=>resolve({id:i.id,error:true});img.src=i.layer;})));}''');assert len(loaded)==40;assert all(x.get('w')==896 and x.get('h')==1200 for x in loaded)
 assert not errors,errors
 (ROOT/'artifacts/wardrobe-layers-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'geometry':geometry,'layers':loaded,'checks':['40 decodable 896x1200 WebP layers','body category replacement','unchanged full-canvas registration','alpha hit testing without transparent layers stealing clicks','helmet hide/reveal and shield ordering','paired missing-boots fallback','file appearance picked up automatically','foot registration on rug','62 percent viewport height and full visibility','no document scroll','fallback-only collapsible calibration and JSON','no XP for free dress-up'],'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('PASS full-canvas layers, alpha clicks, fallback cache, viewport and restricted calibration')
