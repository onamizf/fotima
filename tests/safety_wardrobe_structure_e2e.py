"""Original clothing models, anatomical registration, occlusion and safe footer."""
import os,json,subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
MODELS=['chef-hat','chef-jacket','welder-jacket','fire-suit','work-overall','space-suit','sealed-goggles']
for id in MODELS:
 file='assets/game/wear/'+id+'.webp';assert (ROOT/file).read_bytes()==subprocess.check_output(['git','show','a497c1e:'+file],cwd=ROOT)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);q=b.new_page(viewport={'width':1366,'height':768},reduced_motion='reduce');q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Structure tester');q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=play]').click();xp=q.evaluate('CourseGame.xp()')
 def equip(cat,id):q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click();q.wait_for_selector('.sw-full-layer[data-sw-layer='+id+']')
 trials=[('chef-jacket','chef-shoes'),('welder-jacket','steel-boots'),('fire-suit','fire-boots'),('work-overall','steel-boots'),('space-suit','space-boots')];report=[]
 for body,feet in trials:
  q.locator('[data-sw=reset]').click();equip('body',body);equip('feet',feet);assert 'shirt-sleeves-hidden' in q.locator('.sw-base').get_attribute('class');assert 'feet-hidden' in q.locator('.frog-base').get_attribute('class')
  box=q.locator('.sw-doll').bounding_box();layer=q.locator('[data-sw-layer='+body+']');r=layer.bounding_box();assert all(abs(box[k]-r[k])<.1 for k in ['x','y','width','height']);assert layer.locator('svg').evaluate('(s)=>s.viewBox.baseVal.width===896&&s.viewBox.baseVal.height===1200')
  trousers=q.evaluate('(id)=>!!SafetyWardrobeData.items.find(i=>i.id===id).coverage?.trousersOverBoots',body)
  if trousers:
   mode=q.locator('[data-sw-layer='+feet+'] svg').get_attribute('data-sw-foot-mode');body_z=layer.evaluate('(e)=>+getComputedStyle(e).zIndex');feet_z=q.locator('[data-sw-layer='+feet+']').evaluate('(e)=>+getComputedStyle(e).zIndex');assert (feet_z>body_z) if mode=='tucked' else (body_z>feet_z)
  row=q.locator('.sw-worn').bounding_box();stage=q.locator('.sw-scene-viewport').bounding_box();assert row['y']>=stage['y']+stage['height']+8;report.append({'body':body,'feet':feet,'trousers_over_boots':trousers,'footer_gap':row['y']-stage['y']-stage['height']})
 # Registration is also respected by alpha hit testing.
 q.locator('[data-sw=reset]').click();equip('body','welder-jacket');r=q.locator('.sw-doll').bounding_box();q.mouse.click(r['x']+r['width']*.5,r['y']+r['height']*.5);assert q.locator('[data-sw-layer=welder-jacket]').count()==0
 equip('eyes','sealed-goggles');i=q.locator('[data-sw-layer=sealed-goggles] image');assert float(i.get_attribute('height'))<1200;assert q.evaluate('CourseGame.xp()')==xp
 equip('feet','rubber-boots');assert q.locator('.sw-full-layer[data-sw-layer=rubber-boots]').count()==1;assert q.locator('.sw-fallback-layer').count()==0;assert 'feet-hidden' in q.locator('.frog-base').get_attribute('class')
 q.set_viewport_size({'width':390,'height':844});q.wait_for_timeout(80);assert not q.locator('.sw-worn').is_visible();assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');assert q.evaluate('document.documentElement.scrollHeight<=innerHeight+1')
 # A missing image still gets the paired fallback; it cannot collide with the footer.
 q.set_viewport_size({'width':1366,'height':768});q.route('**/wear/rubber-boots.webp*',lambda r:r.abort());q.reload();q.locator('[data-sw=play]').click();q.locator('[data-sw-category=feet]').click();q.locator('[data-sw-item=rubber-boots]').click();q.wait_for_selector('.sw-fallback-layer');assert q.locator('.sw-fallback-layer').count()==2;assert 'feet-hidden' not in q.locator('.frog-base').get_attribute('class');stage=q.locator('.sw-scene-viewport').bounding_box();row=q.locator('.sw-worn').bounding_box();assert row['y']>=stage['y']+stage['height']+8
 assert not errors,errors;(ROOT/'artifacts/wardrobe-structure-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'original_models_unchanged':MODELS,'outfits':report,'checks':['source models byte-identical to 1.28.0','anatomical registration in shared canvas','base T-shirt sleeves hidden under garments','rear boot lip below trousers and front shaft above','registered alpha hit testing','real full-canvas rubber boots','separate footer including missing-image fallback','mobile viewport and no free-mode XP'],'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('PASS preserved models, anatomical registration, garment occlusion and footer separation')
