"""Rendered ankle pixels for every trouser/footwear pair and bare legs."""
import os, json, io, base64, subprocess
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright
from browser_auth import register_local

ROOT=Path(__file__).resolve().parents[1]
BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
PANTS=['coverall','fire-suit','bee-suit','work-overall','space-suit']
FEET=['closed-shoes','rubber-boots','steel-boots','fire-boots','dielectric-boots','chef-shoes','space-boots','shoe-covers']
LOW=['closed-shoes','chef-shoes','shoe-covers']
for id in FEET+PANTS:
 file='assets/game/wear/'+id+'.webp'
 assert (ROOT/file).read_bytes()==subprocess.check_output(['git','show','861a176:'+file],cwd=ROOT)

with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 q=b.new_page(viewport={'width':1366,'height':1400},reduced_motion='reduce')
 q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 register_local(q,BASE,'Ankle tests');q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=play]').click()
 xp=q.evaluate('CourseGame.xp()');report=[]
 sheet=Image.new('RGB',(8*260,6*230),'#f6f3ed');draw=ImageDraw.Draw(sheet)
 def equip(cat,id):
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click()
  q.wait_for_selector('.sw-full-layer[data-sw-layer='+id+']')
 def click_point(x,y):
  box=q.locator('.sw-doll').bounding_box();q.mouse.click(box['x']+box['width']*x/896,box['y']+box['height']*y/1200)
 for row,body in enumerate(PANTS+['base']):
  q.locator('[data-sw=reset]').click()
  if body!='base':equip('body',body)
  for col,feet in enumerate(FEET):
   equip('feet',feet);q.wait_for_selector('[data-sw-layer='+feet+'] .sw-footwear-connected')
   mode='covered' if body!='base' and feet in LOW else 'tucked'
   svg=q.locator('[data-sw-layer='+feet+'] svg');assert svg.get_attribute('data-sw-foot-mode')==mode
   ankles=json.loads(svg.get_attribute('data-sw-ankles'))
   if body!='base':
    assert q.locator('[data-sw-layer='+body+'] [data-sw-boot-back]').count()==(mode=='tucked')
    bz=q.locator('[data-sw-layer='+body+']').evaluate('(e)=>+getComputedStyle(e).zIndex')
    fz=q.locator('[data-sw-layer='+feet+']').evaluate('(e)=>+getComputedStyle(e).zIndex')
    assert (fz>bz) if mode=='tucked' else (bz>fz)
   else:
    assert q.locator('.sw-bare-boot-back').is_visible()
    assert q.locator('.frog-base').evaluate('(e)=>e.style.clipPath.includes("sw-bare-boot-clip")')
   # Decode the registered source cloth, independently of the connected body SVG.
   expected=q.evaluate('''async id=>{
    const item=SafetyWardrobeData.items.find(i=>i.id===id),im=new Image();im.src=item?item.layer:SafetyWardrobeData.scene.base;await im.decode();
    const c=document.createElement('canvas');c.width=896;c.height=1200;const ctx=c.getContext('2d');
    const r=item?.registration;
    if(r){const [x1,y1,x2,y2]=r.source,[a1,b1,a2,b2]=r.body,sx=(a2-a1)/(x2-x1),sy=(b2-b1)/(y2-y1);ctx.drawImage(im,a1-x1*sx,b1-y1*sy,896*sx,1200*sy);}
    else ctx.drawImage(im,0,0,896,1200);return c.toDataURL();
   }''',body)
   source=Image.open(io.BytesIO(base64.b64decode(expected.split(',')[1]))).convert('RGBA')
   raster=svg.locator('image').get_attribute('href')
   shoe=Image.open(io.BytesIO(base64.b64decode(raster.split(',')[1]))).convert('RGBA')
   q.evaluate('''()=>{const f=document.createElement('div');f.className='sw';f.id='ankle-inspection';f.style.cssText='position:fixed;left:0;top:0;width:896px;height:1200px;z-index:999999;background:#e9e5dc;border-radius:0;overflow:hidden';f.append(document.querySelector('.sw-doll').cloneNode(true));document.querySelector('#main').append(f);}''')
   blob=q.screenshot(clip={'x':190,'y':780,'width':520,'height':400})
   actual=Image.open(io.BytesIO(blob)).convert('RGB');q.locator('#ankle-inspection').evaluate('(e)=>e.remove()')
   def pixel_matches(x,y,texture,label):
    pixel=texture.getpixel((x,y));assert pixel[3]>240,(body,feet,label,'transparent reference',pixel)
    color=actual.getpixel((x-190,y-780));assert max(abs(a-b) for a,b in zip(color,pixel[:3]))<=5,(body,feet,label,color,pixel)
   for a in ankles:
    x=round(a['x']);y=round(a['y'])
    pixel_matches(x,y if mode=='tucked' else a['hem']-18,source,'cloth/real leg inside opening')
    pixel_matches(x,round(y+a['ry']+15) if mode=='tucked' else a['hem']+15,shoe,'single shoe shaft below opening')
   thumb=actual.resize((260,200));sheet.paste(thumb,(col*260,row*230+30));draw.text((col*260+5,row*230+5),body+' / '+feet,fill='#222')
   report.append({'body':body,'feet':feet,'mode':mode,'ankles':ankles})
   if body in ['space-suit','base'] and feet=='dielectric-boots':
    # The visible rear lip belongs to the shoe; the cloth/skin in its hole does not.
    a=ankles[0];rim=[]
    for y in range(round(a['y']-a['ry']-4),round(a['y'])):
     for x in range(round(a['x']-a['rx']-10),round(a['x']+a['rx']+10)):
      if ((x-a['x'])/a['rx'])**2+((y-a['y'])/a['ry'])**2<=1:continue
      pixel=shoe.getpixel((x,y))
      if pixel[3]>250 and source.getpixel((x,y))[3]<10 and max(abs(v-w) for v,w in zip(actual.getpixel((x-190,y-780)),pixel[:3]))<4:rim.append((x,y))
    assert rim,(body,feet,'no visible rear lip')
    # Fractional client coordinates preserve the thin source-resolution rim on a small doll.
    x,y=rim[len(rim)//2];box=q.locator('.sw-doll').bounding_box()
    q.locator('.sw-doll').dispatch_event('click',{'clientX':box['x']+box['width']*(x+.5)/896,'clientY':box['y']+box['height']*(y+.5)/1200})
    assert q.locator('[data-sw-layer='+feet+']').count()==0,(body,'rear lip hit')
    equip('feet',feet)
   # Removing the front must remove only the footwear, including the rear rim.
   a=ankles[0];click_point(a['x'],a['y']+a['ry']+20 if mode=='tucked' else a['hem']+18)
   assert q.locator('[data-sw-layer='+feet+']').count()==0,(body,feet,'front hit')
   assert q.locator('[data-sw-boot-back]').count()==0
   if body!='base':assert q.locator('[data-sw-layer='+body+']').count()==1
 # Changing/removing garments must replace the old connection without a stale rim.
 equip('feet','space-boots');equip('body','space-suit');equip('body','lab-coat')
 assert q.locator('.sw-bare-boot-back [data-sw-boot-back=space-boots]').count()==1
 assert q.locator('[data-sw-layer=lab-coat]').evaluate('(e)=>+getComputedStyle(e).zIndex')>q.locator('[data-sw-layer=space-boots]').evaluate('(e)=>+getComputedStyle(e).zIndex')
 equip('body','space-suit');q.locator('[data-sw=left]').click()
 a=json.loads(q.locator('[data-sw-layer=space-boots] svg').get_attribute('data-sw-ankles'))[0]
 click_point(896-a['x'],a['y']+a['ry']+20)
 assert q.locator('[data-sw-layer=space-boots]').count()==0
 assert q.locator('[data-sw-layer=space-suit]').count()==1
 assert q.evaluate('CourseGame.xp()')==xp
 q.set_viewport_size({'width':390,'height':844});equip('feet','space-boots')
 assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1')
 q.screenshot(path=str(ROOT/'artifacts/wardrobe-footwear-phone.png'))
 assert not errors,errors
 sheet.save(ROOT/'artifacts/wardrobe-footwear-preview.jpg',quality=90)
 sheet.crop((0,4*230,2080,5*230)).save(ROOT/'artifacts/wardrobe-footwear-space.jpg',quality=92)
 (ROOT/'artifacts/wardrobe-footwear-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'pairs':report,'checks':['40 trouser/shoe pairs and 8 bare-leg pairs','actual cloth or frog pixels inside both openings','actual footwear pixels below both openings','rear/front order and removal including rear lip hits','switching body and shoes invalidates connection','mirrored pointer removal','coat drapes over shaft','source models unchanged','mobile viewport','no free-mode XP'],'js_errors':errors},ensure_ascii=False,indent=2))
 b.close();print('PASS rendered ankle pixels for 48 combinations, layer changes and pointer removal')
