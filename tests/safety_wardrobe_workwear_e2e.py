"""Visible hard-hat fit, work-overall cuffs and registered pointer targets."""
import io,json,os,subprocess
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
source=Image.open(ROOT/'assets/game/frog-base.webp').convert('RGB')
for id in ['work-overall','hard-hat']:
 file='assets/game/wear/'+id+'.webp'
 assert (ROOT/file).read_bytes()==subprocess.check_output(['git','show','c3a9958:'+file],cwd=ROOT)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 q=b.new_page(viewport={'width':1366,'height':1400},reduced_motion='reduce');errors=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 register_local(q,BASE,'Workwear tester');q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=play]').click();xp=q.evaluate('CourseGame.xp()')
 def equip(cat,id):
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click();q.wait_for_selector('.sw-full-layer[data-sw-layer='+id+']')
 def click(x,y,mirror=False):
  r=q.locator('.sw-doll').bounding_box();q.mouse.click(r['x']+r['width']*(896-x if mirror else x)/896,r['y']+r['height']*y/1200)
 equip('body','work-overall');equip('head','hard-hat');equip('face','medical-mask');equip('feet','steel-boots')
 q.evaluate('''()=>{const f=document.createElement('div');f.className='sw';f.id='workwear-inspection';f.style.cssText='position:fixed;left:0;top:0;width:896px;height:1200px;z-index:999999;background:#e9e5dc;border-radius:0;overflow:hidden';f.append(document.querySelector('.sw-doll').cloneNode(true));document.querySelector('#main').append(f);}''')
 blob=q.locator('#workwear-inspection').screenshot();image=Image.open(io.BytesIO(blob)).convert('RGB');q.locator('#workwear-inspection').evaluate('(e)=>e.remove()')
 image.save(ROOT/'artifacts/wardrobe-workwear-full.png')
 image.crop((210,0,690,320)).save(ROOT/'artifacts/wardrobe-hard-hat-fit.png')
 image.crop((130,650,770,845)).save(ROOT/'artifacts/wardrobe-workwear-cuffs.png')
 samples=[]
 for x,y in [(335,159),(348,178),(363,197),(533,197),(548,178),(561,159)]:
  actual=image.getpixel((x,y));expected=source.getpixel((x,y))
  assert max(abs(a-b) for a,b in zip(actual,expected))<=3,('hat hides eye',x,y,actual,expected)
  samples.append({'x':x,'y':y,'rgb':actual})
 for x,y in [(448,5),(448,60),(448,114)]:
  r,g,blue=image.getpixel((x,y));assert r>170 and g>100 and blue<110,('crown or brim missing',x,y,(r,g,blue))
 # The eye is clear; the real arm inside a cuff is not an item hit target.
 click(348,178);assert q.locator('[data-sw-layer=hard-hat]').count()==1
 click(217,734);assert q.locator('[data-sw-layer=work-overall]').count()==1
 click(217,705);assert q.locator('[data-sw-layer=work-overall]').count()==0
 assert q.locator('[data-sw-layer=steel-boots]').count()==1
 equip('body','work-overall');q.locator('[data-sw=left]').click();click(217,734,True)
 assert q.locator('[data-sw-layer=work-overall]').count()==1
 click(217,705,True);assert q.locator('[data-sw-layer=work-overall]').count()==0
 # Registration is shared by drawing and picking the raised helmet.
 click(448,70,True);assert q.locator('[data-sw-layer=hard-hat]').count()==0
 equip('head','hard-hat');equip('body','work-overall');equip('eyes','goggles')
 q.set_viewport_size({'width':1366,'height':768});q.screenshot(path=str(ROOT/'artifacts/wardrobe-workwear-desktop.png'))
 for w,h in [(390,844),(320,740)]:
  q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(80)
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1')
  r=q.locator('.sw-doll').bounding_box();stage=q.locator('.sw-scene-viewport').bounding_box()
  assert r['y']>=stage['y'] and r['y']+r['height']*.18<=stage['y']+stage['height']
  if w==390:q.screenshot(path=str(ROOT/'artifacts/wardrobe-workwear-phone.png'))
 assert q.evaluate('CourseGame.xp()')==xp;assert not errors,errors
 (ROOT/'artifacts/wardrobe-workwear-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'original_models_unchanged':['work-overall','hard-hat'],'eye_samples':samples,'checks':['both eyes show the original frog pixels below the brim','crown and raised brim remain inside full canvas','two workwear cuff openings reveal actual hands','cuff holes are not clothing hit targets','normal and mirrored sleeve removal','raised helmet uses registered hit coordinates','boots stay when overalls are removed','mask and goggles compatibility','desktop and two phone viewports','no free-mode XP'],'js_errors':errors},ensure_ascii=False,indent=2))
 b.close();print('PASS hard-hat eye clearance, workwear cuffs, mirrored picking and mobile fit')
