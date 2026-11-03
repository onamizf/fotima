"""Visible wrist joins for all 11 garments × 8 gloves plus bare arms."""
import os,json,io,base64,subprocess,math
from pathlib import Path
from PIL import Image,ImageDraw
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
HANDS=['nitrile-gloves','rubber-gloves','heat-gloves','work-gloves','welding-gauntlets','dielectric-gloves','bee-gloves','space-gloves']
BG=(233,229,220);C=math.cos(math.radians(17));S=math.sin(math.radians(17))
def point(u,v,n=0):
 x=217+u*C-v*S;return (round(896-x if n else x),round(734+u*S+v*C))
def png(url):return Image.open(io.BytesIO(base64.b64decode(url.split(',')[1]))).convert('RGBA')
for id in HANDS:
 file='assets/game/wear/'+id+'.webp';assert (ROOT/file).read_bytes()==subprocess.check_output(['git','show','5a16349:'+file],cwd=ROOT)
BASE_IMAGE=Image.open(ROOT/'assets/game/frog-base.webp').convert('RGBA')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);q=b.new_page(viewport={'width':1366,'height':1400},reduced_motion='reduce')
 q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 register_local(q,BASE,'Glove joins');q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=play]').click();xp=q.evaluate('CourseGame.xp()')
 bodies=q.evaluate('SafetyWardrobeData.items.filter(i=>i.category==="body").map(i=>i.id)')+['base']
 sheet=Image.new('RGB',(2080,len(bodies)*200),'#f6f3ed');draw=ImageDraw.Draw(sheet);report=[]
 def equip(cat,id):
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click();q.wait_for_selector('.sw-full-layer[data-sw-layer='+id+']')
 def image_ready():
  q.evaluate('''async()=>{await Promise.all([...document.querySelectorAll('.sw img,.sw image')].map(e=>{const im=new Image();im.src=e.getAttribute('href')||e.src;return im.decode().catch(()=>{});}));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));}''')
 def snapshot():
  image_ready();q.evaluate('''()=>{const f=document.createElement('div');f.className='sw';f.id='glove-check';f.style.cssText='position:fixed;left:0;top:0;width:896px;height:1200px;z-index:999999;background:#e9e5dc;border-radius:0;overflow:hidden';f.append(document.querySelector('.sw-doll').cloneNode(true));document.querySelector('#main').append(f);}''')
  image_ready();blob=q.screenshot(clip={'x':100,'y':520,'width':696,'height':420});q.locator('#glove-check').evaluate('(e)=>e.remove()');return Image.open(io.BytesIO(blob)).convert('RGB')
 def actual_at(image,x,y):return image.getpixel((x-100,y-520))
 def match(actual,expected,label):assert max(abs(a-b) for a,b in zip(actual,expected))<=7,(label,actual,expected)
 def click(x,y,mirror=False):
  r=q.locator('.sw-doll').bounding_box();q.mouse.click(r['x']+r['width']*(896-x if mirror else x)/896,r['y']+r['height']*y/1200)
 for row,body in enumerate(bodies):
  q.locator('[data-sw=reset]').click()
  if body!='base':equip('body',body)
  before=snapshot()
  garment=None
  if body!='base':
   data=q.locator('[data-sw-layer='+body+'] image').evaluate('''async e=>{const im=new Image();im.src=e.getAttribute('href');await im.decode();const c=document.createElement('canvas');c.width=896;c.height=1200;const ctx=c.getContext('2d');ctx.drawImage(im,+(e.getAttribute('x')||0),+(e.getAttribute('y')||0),+e.getAttribute('width'),+e.getAttribute('height'));return c.toDataURL();}''');garment=png(data)
  for col,hand in enumerate(HANDS):
   equip('hands',hand);q.wait_for_selector('[data-sw-layer='+hand+'] .sw-gloves-connected');image_ready()
   assert q.locator('.sw-full-layer[data-sw-slot=hands]').count()==1
   assert q.locator('.sw-glove-back').is_visible()
   assert q.locator('.sw-hand-base').evaluate('e=>e.style.clipPath.includes("sw-glove-base")')
   svg=q.locator('[data-sw-layer='+hand+'] svg');wrists=json.loads(svg.get_attribute('data-sw-wrists'));raster=png(svg.locator('image').get_attribute('href'));actual=snapshot();checks=0;leaks=0
   for n,o in enumerate(wrists):
    x,y=round(o['x']),round(o['y']);match(actual_at(actual,x,y),actual_at(before,x,y),(body,hand,'real cloth/skin inside cuff',n))
    x,y=point(o['u'],o['v']+o['ry']+15,n);color=raster.getpixel((x,y));assert color[3]>240,(body,hand,'transparent front reference',n,color)
    match(actual_at(actual,x,y),color[:3],(body,hand,'single glove front',n))
    # Below the lip, the old sleeve must not remain visible through transparent glove edges.
    if garment and o['cloth']:
     for v in range(math.ceil(o['v']+o['ry']+14),25,14):
      for u in range(-50,51,10):
       x,y=point(u,v,n);cloth=garment.getpixel((x,y));old=actual_at(before,x,y)
       if cloth[3]<250 or max(abs(a-b) for a,b in zip(old,cloth[:3]))>4:continue
       glove=raster.getpixel((x,y));expected=tuple(round(glove[k]*glove[3]/255+BG[k]*(1-glove[3]/255)) for k in range(3))
       match(actual_at(actual,x,y),expected,(body,hand,'sleeve protrudes below cuff',n,x,y));checks+=1
    # Original bare fingertips cannot poke out beside the selected glove model.
    for v in range(80,181,10):
     for u in range(-70,91,10):
      x,y=point(u,v,n);base=BASE_IMAGE.getpixel((x,y));glove=raster.getpixel((x,y))
      if base[3]>250 and glove[3]<5 and max(abs(a-b) for a,b in zip(actual_at(before,x,y),base[:3]))<4:
       match(actual_at(actual,x,y),BG,(body,hand,'bare finger protrudes',n,x,y));leaks+=1
   # Distal glove texture stays byte-identical; only the opening is deformed.
   original=Image.open(ROOT/('assets/game/wear/'+hand+'.webp')).convert('RGBA')
   for n in [0,1]:
    candidates=[(x,y) for y in range(875,896,5) for x in range(175,221,5) if original.getpixel((896-x if n else x,y))[3]>250]
    assert candidates
    x,y=candidates[len(candidates)//2];x=896-x if n else x
    rendered=raster.getpixel((x,y));source=original.getpixel((x,y))
    assert max(abs(a-b) for a,b in zip(rendered,source))<=3,(body,hand,'finger texture changed',rendered,source)
   thumb=actual.resize((260,157));sheet.paste(thumb,(col*260,row*200+27));draw.text((col*260+3,row*200+5),body+' / '+hand,fill='#222')
   report.append({'body':body,'hands':hand,'wrists':wrists,'sleeve_pixel_checks':checks,'bare_finger_checks':leaks})
   if body in ['base','space-suit'] and hand=='heat-gloves':
    # Pick a genuinely visible rear lip, outside the ungloved arm/sleeve silhouette.
    a=wrists[0];rim=[]
    for v in range(math.ceil(a['v']-a['ry']-5),math.floor(a['v'])):
     for u in range(-80,81):
      x,y=point(u,v);pixel=raster.getpixel((x,y));angle=math.radians(a['angle']);dx=x-a['x'];dy=y-a['y']
      inside=((dx*math.cos(angle)+dy*math.sin(angle))/a['rx'])**2+((-dx*math.sin(angle)+dy*math.cos(angle))/a['ry'])**2
      if inside<1.2 or pixel[3]<250:continue
      if max(abs(c-d) for c,d in zip(actual_at(before,x,y),BG))>3:continue
      if max(abs(c-d) for c,d in zip(actual_at(actual,x,y),pixel[:3]))<4:rim.append((x,y))
    assert rim,(body,'no visible rear lip')
    x,y=rim[len(rim)//2];box=q.locator('.sw-doll').bounding_box()
    q.locator('.sw-doll').dispatch_event('click',{'clientX':box['x']+box['width']*(x+.5)/896,'clientY':box['y']+box['height']*(y+.5)/1200})
    assert q.locator('[data-sw-layer='+hand+']').count()==0,(body,'rear lip hit')
    equip('hands',hand)
   # The visible front removes only the glove and restores the previous sleeve/base.
   a=wrists[0];x,y=point(a['u'],a['v']+a['ry']+35);click(x,y)
   assert q.locator('[data-sw-layer='+hand+']').count()==0,(body,hand,'front hit')
   assert q.locator('[data-sw-sleeves]').count()==0
   assert not q.locator('.sw-glove-back').is_visible()
   assert q.locator('.sw-hand-base').evaluate('e=>e.style.clipPath===""')
   if body!='base':assert q.locator('[data-sw-layer='+body+']').count()==1
 # Switching body, shoes and language must repaint a connected glove without stale masks.
 q.locator('[data-sw=reset]').click();equip('body','space-suit');equip('hands','rubber-gloves')
 a=json.loads(q.locator('[data-sw-layer=rubber-gloves] svg').get_attribute('data-sw-wrists'))[0];click(a['x'],a['y'])
 assert q.locator('[data-sw-layer=space-suit]').count()==0 and q.locator('[data-sw-layer=rubber-gloves]').count()==1
 q.locator('[data-sw=reset]').click();equip('hands','space-gloves');equip('body','fire-suit');equip('feet','space-boots')
 first=q.locator('[data-sw-layer=space-gloves]').get_attribute('data-sw-paint');equip('body','space-suit')
 assert q.locator('[data-sw-layer=space-gloves]').get_attribute('data-sw-paint')!=first
 assert q.locator('[data-sw-layer=space-boots] .sw-footwear-connected').count()==1
 q.evaluate('StudentHeader.changeLanguage("uz-Latn")');q.wait_for_selector('.sw-gloves-connected')
 assert q.locator('.sw-hand-base').evaluate('e=>e.style.clipPath.includes("space-suit")')
 q.locator('[data-sw=left]').click();a=json.loads(q.locator('[data-sw-layer=space-gloves] svg').get_attribute('data-sw-wrists'))[0];x,y=point(a['u'],a['v']+a['ry']+35);click(x,y,True)
 assert q.locator('[data-sw-layer=space-gloves]').count()==0
 assert q.locator('[data-sw-layer=space-suit]').count()==1 and q.locator('[data-sw-layer=space-boots]').count()==1
 equip('hands','rubber-gloves');q.set_viewport_size({'width':390,'height':844});image_ready()
 assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1')
 q.screenshot(path=str(ROOT/'artifacts/wardrobe-gloves-phone.png'))
 # Delayed full gloves do not hide the real hands until their image is ready.
 q.set_viewport_size({'width':1366,'height':768});held=[];q.route('**/wear/rubber-gloves.webp*',lambda r:held.append(r));q.reload();q.locator('[data-sw=play]').click();q.locator('[data-sw-category=hands]').click();q.locator('[data-sw-item=rubber-gloves]').click();q.wait_for_timeout(100)
 assert held and q.locator('.sw-hand-base').evaluate('e=>e.style.clipPath===""')
 held[0].fulfill(path=str(ROOT/'assets/game/wear/rubber-gloves.webp'),content_type='image/webp');q.wait_for_selector('.sw-gloves-connected');assert q.locator('.sw-hand-base').evaluate('e=>e.style.clipPath!==""')
 q.unroute('**/wear/rubber-gloves.webp*');q.route('**/wear/nitrile-gloves.webp*',lambda r:r.abort());q.reload();q.locator('[data-sw=play]').click();q.locator('[data-sw-category=hands]').click();q.locator('[data-sw-item=nitrile-gloves]').click();q.wait_for_selector('.sw-fallback-layer')
 assert q.locator('.sw-fallback-layer').count()==2 and q.locator('.sw-hand-base').evaluate('e=>e.style.clipPath===""')
 assert q.evaluate('CourseGame.xp()')==xp;assert not errors,errors
 sheet.save(ROOT/'artifacts/wardrobe-gloves-preview.jpg',quality=91)
 space=bodies.index('space-suit');sheet.crop((0,space*200,2080,(space+1)*200)).save(ROOT/'artifacts/wardrobe-gloves-space.jpg',quality=93)
 (ROOT/'artifacts/wardrobe-gloves-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'pairs':report,'checks':['96 outfit/glove combinations','actual cloth or skin pixels inside both openings','glove material below both openings','no old sleeves or bare fingertips protruding below gloves','finger textures unchanged within decoder precision','one logical glove item with split rear/front display','front, rear lip and mirrored removal restore sleeves and base','cloth inside opening picks the garment independently','changing garment, boots and live language replaces connection','footwear stays independent','mask applied only after full glove image loads and absent for fallback','phone viewport','no free-mode XP'],'js_errors':errors},ensure_ascii=False,indent=2))
 b.close();print('PASS all 96 glove/outfit joins, real seam pixels, independent shoes and restored sleeves')
