"""Clothing canvas, replacement legs, modal contrast and ordered profession layout."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
FEET=['closed-shoes','steel-boots','shoe-covers','fire-boots','dielectric-boots','chef-shoes','space-boots']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1366,'height':768},reduced_motion='reduce');q.route('**/wear/rubber-boots.webp*',lambda r:r.abort());q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Фотима');q.goto(BASE+'?v=1.28.0&calibrate=1#safety-wardrobe');q.locator('[data-sw=play]').click()
 def equip(cat,id):
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').scroll_into_view_if_needed();q.locator('[data-sw-item='+id+']').click()
 held=[];q.route('**/wear/closed-shoes.webp*',lambda r:held.append(r));equip('feet','closed-shoes');q.wait_for_timeout(100);assert held;assert 'feet-hidden' not in q.locator('.frog-base').get_attribute('class');held[0].fulfill(path=str(ROOT/'assets/game/wear/closed-shoes.webp'),content_type='image/webp');q.wait_for_selector('.frog-base.feet-hidden');q.unroute('**/wear/closed-shoes.webp*')
 for id in FEET[1:]:
  equip('feet',id);q.wait_for_selector('.sw-full-layer[data-sw-layer='+id+']');ankles=json.loads(q.locator('[data-sw-layer='+id+'] svg').get_attribute('data-sw-ankles'));edge=max(77.5,*[(a['y']+a['ry']+2)/12 for a in ankles]);actual=float(q.locator('.frog-base').evaluate("(e)=>e.style.getPropertyValue('--sw-base-feet-hidden')").removesuffix('%'));assert abs(actual-edge)<.001;assert q.locator('.frog-base').evaluate('(e)=>e.style.clipPath.startsWith("url(")')
 q.locator('[data-sw-item=space-boots]').click();assert 'feet-hidden' not in q.locator('.frog-base').get_attribute('class')
 equip('feet','rubber-boots');q.wait_for_selector('.sw-fallback-layer');assert 'feet-hidden' not in q.locator('.frog-base').get_attribute('class')
 equip('feet','chef-shoes');equip('head','chef-hat');equip('eyes','goggles');equip('body','chef-jacket');equip('hands','heat-gloves');q.wait_for_function('document.querySelectorAll(".sw-full-layer").length===5');q.locator('.sw-calibration summary').click();q.locator('[data-sw=show-frames]').click();assert 'sw-debug-frames' in q.locator('.sw').get_attribute('class');assert q.locator('[data-sw=show-frames]').get_attribute('aria-pressed')=='true'
 frames=q.locator('.sw-doll,.sw-base,.frog-base,.sw-full-layer,.sw-layer-image').evaluate_all('''es=>es.map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {name:e.className,x:r.x,y:r.y,w:r.width,h:r.height,transform:s.transform,translate:s.translate,scale:s.scale,rotate:s.rotate,padding:s.padding,margin:s.margin,outline:s.outlineWidth};})''');doll=frames[0]
 for f in frames:
  assert all(abs(f[k]-doll[k])<.1 for k in ['x','y','w','h']),f
  assert f['transform']=='none' and f['translate']=='none' and f['scale']=='none' and f['rotate']=='none',f
  assert f['padding']=='0px' and f['margin']=='0px',f
  assert float(f['outline'].removesuffix('px'))>=1,f
 q.screenshot(path=str(ROOT/'artifacts/wardrobe-canvas-frames.png'))
 q.locator('[data-sw=show-frames]').click();q.locator('.sw-calibration summary').click();q.wait_for_timeout(2600);q.screenshot(path=str(ROOT/'artifacts/wardrobe-fit-cook.png'))
 # Badges stay under the complete shoe pixels, centred on the frog.
 gaps=[]
 for w,h in [(1920,1080),(1366,768),(1024,768)]:
  q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(70)
  if q.locator('.sw').get_attribute('data-layout')=='stacked':continue
  frog=q.locator('.sw-doll').bounding_box();row=q.locator('.sw-worn').bounding_box();gap=row['y']-(frog['y']+frog['height']*1148/1200);assert gap>=8,(w,h,gap);assert abs(row['x']+row['width']/2-(frog['x']+frog['width']/2))<1;gaps.append({'width':w,'height':h,'gap':gap})
 q.set_viewport_size({'width':1366,'height':768});q.locator('[data-sw=help]').click();q.wait_for_selector('.sw-dialog');q.screenshot(path=str(ROOT/'artifacts/wardrobe-help-readable.png'))
 # WCAG contrast against the actual computed flat modal backgrounds.
 def contrast(selector):
  return q.locator(selector).first.evaluate('''e=>{const rgba=s=>s.match(/[\\d.]+/g).map(Number),rgb=s=>rgba(s).slice(0,3);let color=rgb(getComputedStyle(e).color),bg=[255,255,255];const chain=[];for(let n=e;n;n=n.parentElement)chain.unshift(n);for(const n of chain){const c=rgba(getComputedStyle(n).backgroundColor),a=c[3]??1;bg=bg.map((v,i)=>c[i]*a+v*(1-a));}const luminance=c=>c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);const a=luminance(color),b=luminance(bg);return {ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),color:getComputedStyle(e).color,bg};}''')
 contrasts={}
 for selector in ['.sw-dialog h2','.sw-dialog p','.sw-dialog-close']:
  contrasts[selector]=contrast(selector);assert contrasts[selector]['ratio']>=4.5,contrasts
 q.keyboard.press('Escape');q.locator('[data-sw=professions]').click();expect(q.locator('.sw-profession')).to_have_count(13);assert q.locator('.sw-dialog h3').count()==0
 expected=q.evaluate('SafetyWardrobeData.professions.map(p=>p.id)');assert q.locator('.sw-profession').evaluate_all('(es)=>es.map(e=>e.dataset.job)')==expected
 for selector in ['.sw-profession-heading h2','.sw-profession-heading p','.sw-profession strong','.sw-profession small','.sw-profession-number','.sw-profession-group']+[f'.sw-profession[data-group="{n}"] .sw-profession-group' for n in range(5)]:
  contrasts[selector]=contrast(selector);assert contrasts[selector]['ratio']>=4.5,(selector,contrasts[selector])
 geometry=[]
 for width,cols in [(1366,4),(768,3),(390,2),(320,2)]:
  q.set_viewport_size({'width':width,'height':844});q.wait_for_timeout(70);grid=q.locator('.sw-professions');assert grid.evaluate('(e)=>getComputedStyle(e).gridTemplateColumns.split(" ").length')==cols
  sizes=q.locator('.sw-profession').evaluate_all('(es)=>es.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))');assert max(s['w'] for s in sizes)-min(s['w'] for s in sizes)<1;assert max(s['h'] for s in sizes)-min(s['h'] for s in sizes)<1
  assert q.locator('.sw-dialog-body').evaluate('(e)=>e.scrollWidth<=e.clientWidth+1');assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');assert q.evaluate('document.documentElement.scrollHeight<=innerHeight+1');geometry.append({'width':width,'columns':cols,'card':sizes[0]})
  if width==1366:q.screenshot(path=str(ROOT/'artifacts/wardrobe-professions-grid.png'))
  if width==390:q.screenshot(path=str(ROOT/'artifacts/wardrobe-professions-phone.png'))
 q.locator('.sw-dialog-body').evaluate('(e)=>e.scrollTop=e.scrollHeight');assert q.locator('.sw-dialog-close').is_visible();q.locator('.sw-dialog-close').click();q.set_viewport_size({'width':390,'height':844});q.screenshot(path=str(ROOT/'artifacts/wardrobe-fit-phone.png'))
 # Completion UI uses the same XP path and preserves the selected/complete states.
 q.set_viewport_size({'width':1366,'height':768});q.locator('[data-sw=professions]').click();q.locator('[data-job=chemist]').click();xp=q.evaluate('CourseGame.xp()')
 for cat,id in [('body','lab-coat'),('eyes','goggles'),('hands','nitrile-gloves'),('feet','closed-shoes')]:equip(cat,id)
 q.wait_for_selector('.sw-result-copy');assert q.evaluate('CourseGame.xp()')==xp+20;q.locator('.sw-result-copy [data-sw=professions]').click();assert q.locator('[data-job=chemist].sw-profession-completed').count()==1;assert q.locator('[data-job=chemist]').get_attribute('aria-pressed')=='true';assert '1 / 13' in q.locator('.sw-profession-heading p').inner_text()
 assert not errors,errors;(ROOT/'artifacts/wardrobe-fit-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'frames':frames,'badge_gaps':gaps,'contrasts':contrasts,'profession_grid':geometry,'checks':['seven supplied leg/shoe layers load','mask only after full shoe load','mask removed on unequip and absent for fallback','all full canvases share coordinates and no transforms','frame toggle in calibration only','badges below shoe pixels','readable modal text and close control','13 cards in one ordered equal grid','4/3/2 columns and internal scrolling','completion mark and original 20 XP reward'],'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('PASS wardrobe fit, foot masking, coincident frames, modal contrast and profession grid')
