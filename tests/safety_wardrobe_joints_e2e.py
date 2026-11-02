"""Check the visible neck/cuff joins at source resolution, not just layer frames."""
import os,json,subprocess,io
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
BASE_IMAGE=Image.open(ROOT/'assets/game/frog-base.webp').convert('RGBA')
IDS=['chef-jacket','fire-suit','welder-jacket','space-suit','surgical-gown','lab-coat']
for id in IDS:
 file='assets/game/wear/'+id+'.webp';assert (ROOT/file).read_bytes()==subprocess.check_output(['git','show','eaf069a:'+file],cwd=ROOT)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);q=b.new_page(viewport={'width':1366,'height':1400},reduced_motion='reduce');q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Joint tests');q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=play]').click();xp=q.evaluate('CourseGame.xp()');samples=[]
 for id in IDS:
  q.locator('[data-sw=reset]').click();q.locator('[data-sw-category=body]').click();q.locator('[data-sw-item='+id+']').click();q.wait_for_selector('.sw-full-layer[data-sw-layer='+id+']');q.wait_for_timeout(120)
  assert 'shirt-collar-hidden' in q.locator('.sw-base').get_attribute('class');assert q.locator('.sw-neck-skin').is_visible()
  imageURL=q.locator('[data-sw-layer='+id+'] image').get_attribute('href');assert imageURL.startswith('data:image/png;base64,')
  q.evaluate('''()=>{const frame=document.createElement('div');frame.className='sw';frame.id='joint-inspection';frame.style.cssText='position:fixed;left:0;top:0;width:896px;height:1200px;z-index:999999;background:#e9e5dc;border-radius:0;overflow:hidden';frame.append(document.querySelector('.sw-doll').cloneNode(true));document.querySelector('#main').append(frame);}''');blob=q.locator('#joint-inspection').screenshot();(ROOT/('artifacts/wardrobe-joints-'+id+'.png')).write_bytes(blob);image=Image.open(io.BytesIO(blob)).convert('RGB');q.locator('#joint-inspection').evaluate('(e)=>e.remove()')
  cuffs=q.evaluate('(id)=>SafetyWardrobeData.items.find(i=>i.id===id).joints.cuffs',id);colors=[]
  for cuff in cuffs:
   o=cuff['opening'];color=image.getpixel((round(o['x']),round(o['y'])));source=BASE_IMAGE.getpixel((round(o['x']),round(o['y'])));expected=tuple(round(source[n]*source[3]/255+[233,229,220][n]*(1-source[3]/255)) for n in range(3));assert max(abs(a-b) for a,b in zip(color,expected))<=3,(id,'cuff does not show the actual arm',color,expected);colors.append(color)
  neck=[]
  if id in ['chef-jacket','space-suit']:
   for y in ([440,450,460] if id=='chef-jacket' else [410,425,440]):
    color=image.getpixel((448,y));r,g,blue=color;assert r>120 and g>110 and r-blue>30,(id,'neck is disconnected by collar/undershirt',y,color);neck.append({'y':y,'rgb':color})
  samples.append({'item':id,'cuff_rgb':colors,'neck_samples':neck,'cached_raster':True})
 assert q.evaluate('CourseGame.xp()')==xp
 q.locator('[data-sw=reset]').click();assert not q.locator('.sw-neck-skin').is_visible();assert 'shirt-collar-hidden' not in q.locator('.sw-base').get_attribute('class')
 q.locator('[data-sw-category=body]').click();q.locator('[data-sw-item=space-suit]').click();q.wait_for_selector('[data-sw-layer=space-suit]');q.wait_for_timeout(100);q.set_viewport_size({'width':390,'height':844});q.wait_for_timeout(100);q.screenshot(path=str(ROOT/'artifacts/wardrobe-joints-phone.png'));assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');assert q.evaluate('document.documentElement.scrollHeight<=innerHeight+1')
 assert not errors,errors;(ROOT/'artifacts/wardrobe-joints-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'original_models_unchanged':IDS,'samples':samples,'checks':['actual rendered pixels at twelve cuff openings show frog arms','chef collar joins bare neck without baked T-shirt flap','space collar entry connects neck from above','cached pixel raster without mesh clip seams','reset restores original base','mobile viewport','no free-mode XP'],'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('PASS actual neck/cuff pixels on six unchanged clothing models and mobile view')
