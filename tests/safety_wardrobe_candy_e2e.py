"""Category names, candy controls and unaltered source pixels outside the new cards."""
import io,json,os,subprocess,statistics
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
LANGUAGES={'ru':'Русский','uz-Latn':'O‘zbekcha','uz-Cyrl':'Ўзбекча','en':'English'}
SIZES=[(1366,768),(390,844),(320,740)]
for file in ['assets/game/cover.jpg']+['assets/game/scenes/'+id+'.jpg' for id in ['chemist','firefighter','astronaut','surgeon']]:
 assert (ROOT/file).read_bytes()==subprocess.check_output(['git','show','33e8a04:'+file],cwd=ROOT)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 q=b.new_page(viewport={'width':1366,'height':768},reduced_motion='reduce');errors=[];console=[];bad=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:console.append(m.text) if m.type=='error' else None)
 q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 register_local(q,BASE,'Candy wardrobe');q.goto(BASE+'#safety-wardrobe');xp=q.evaluate('CourseGame.xp()')
 ribbons=[];photos=[];results=[]
 def language(lang):
  if q.evaluate('state.settings.language')!=lang:
   q.locator('#languageToggle').click();q.locator('#languagePanel [role=option]').filter(has_text=LANGUAGES[lang]).click()
  q.wait_for_function('!document.getElementById("gameToast")&&!document.getElementById("studentToast")')
 def decode():q.evaluate('async()=>{await Promise.all([...document.querySelectorAll(".sw img")].map(im=>im.decode().catch(()=>{})))}')
 def no_button_emoji():assert q.locator('.sw-game-button').evaluate_all('es=>es.every(e=>!/[\\p{Extended_Pictographic}]/u.test(e.innerText))')
 def candy(selector,color):
  info=q.locator(selector).first.evaluate('''e=>{const s=getComputedStyle(e),p=getComputedStyle(e,'::before'),r=e.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(e);const t=range.getBoundingClientRect();return {textFits:t.top>=r.top+1&&t.bottom<=r.bottom-1&&t.left>=r.left+1&&t.right<=r.right-1,height:s.height,radius:s.borderRadius,border:s.borderTopWidth,edge:s.borderTopColor,background:s.backgroundImage,shadow:s.boxShadow,color:s.color,weight:s.fontWeight,font:s.fontSize,textShadow:s.textShadow,gloss:p.backgroundImage,top:p.top,left:p.left,right:p.right};}''')
  expected={'green':('rgb(142, 224, 78)','rgb(76, 184, 43)','rgb(46, 125, 26)'), 'blue':('rgb(95, 200, 255)','rgb(43, 139, 230)','rgb(26, 91, 168)'), 'gray':('rgb(228, 232, 239)','rgb(185, 193, 205)','rgb(124, 134, 150)'), 'orange':('rgb(255, 194, 74)','rgb(255, 145, 36)','rgb(194, 94, 10)')}[color]
  assert info['height']==('46px' if q.viewport_size['width']<=767 else '52px'),info
  assert info['radius']=='14px' and info['border']=='2px',info
  assert all(c in info['background'] for c in expected[:2]) and info['edge']==expected[2],info
  assert '5px' in info['shadow'] and info['edge'] in info['shadow'],info
  assert '0.45' in info['gloss'] and info['top']==info['left']==info['right']=='4px',info
  assert info['textFits'],('button label exceeds its surface',selector,info)
  assert info['weight']=='800' and info['font']==('17px' if q.viewport_size['width']<=767 else '18px'),info
  if color=='gray':assert info['color']=='rgb(46, 58, 79)' and info['textShadow']=='none',info
  else:assert info['color']=='rgb(255, 255, 255)' and info['edge'] in info['textShadow'],info
  return info
 def clear_photo(selector,label):
  decode();style=q.locator(selector).evaluate('e=>{const s=getComputedStyle(e);return {filter:s.filter,opacity:s.opacity,fit:s.objectFit,animation:s.animationName}}')
  assert style['filter']=='none' and style['opacity']=='1' and style['animation']=='none',style
  for parent in ['.sw-cover','.sw-result']:
   if q.locator(parent).count():assert q.locator(parent).evaluate('e=>["::before","::after"].every(p=>["none","normal"].includes(getComputedStyle(e,p).content))')
  reference=q.locator(selector).evaluate('''im=>{
   const root=im.closest('.sw'),r=root.getBoundingClientRect(),s=getComputedStyle(im),w=r.width,h=r.height;
   const scale=(s.objectFit==='contain'?Math.min:Math.max)(w/im.naturalWidth,h/im.naturalHeight),iw=im.naturalWidth*scale,ih=im.naturalHeight*scale,pos=s.objectPosition.split(' ').map(v=>parseFloat(v)/100),x=(w-iw)*pos[0],y=(h-ih)*pos[1];
   const c=document.createElement('canvas');c.width=Math.round(w);c.height=Math.round(h);const ctx=c.getContext('2d');ctx.drawImage(im,x,y,iw,ih);
   const excluded=[...root.querySelectorAll('.sw-cover-copy,.sw-result-copy,.sw-top')].map(e=>{const q=e.getBoundingClientRect();return {x:q.left-r.left-32,y:q.top-r.top-32,w:q.width+64,h:q.height+64}});
   const points=[],left=Math.max(18,x),right=Math.min(w-18,x+iw),top=Math.max(18,y),bottom=Math.min(h-18,y+ih);
   for(let a=1;a<13;a++)for(let b=1;b<10;b++){
    const px=Math.round(left+(right-left)*a/13),py=Math.round(top+(bottom-top)*b/10);
    if(excluded.some(e=>px>=e.x&&px<=e.x+e.w&&py>=e.y&&py<=e.y+e.h))continue;
    const rgba=ctx.getImageData(px,py,1,1).data;if(rgba[3]===255)points.push({x:px,y:py,rgb:[...rgba].slice(0,3)});
   }
   return points;
  }''')
  image=Image.open(io.BytesIO(q.locator('.sw').screenshot())).convert('RGB');deltas=[]
  for point in reference:
   color=image.getpixel((point['x'],point['y']));deltas.append(max(abs(a-b) for a,b in zip(color,point['rgb'])))
  assert len(deltas)>=10,(label,'not enough uncovered image samples')
  assert statistics.median(deltas)<=3 and sorted(deltas)[int(len(deltas)*.9)]<=12,(label,'image pixels changed',deltas)
  photos.append({'scene':label,'width':q.viewport_size['width'],'fit':style['fit'],'samples':len(deltas),'median_max_rgb_error':statistics.median(deltas)})
 def card_geometry(selector):
  r=q.locator('.sw').bounding_box();card=q.locator(selector).bounding_box();s=q.locator(selector).evaluate('e=>{const s=getComputedStyle(e);return {background:s.backgroundColor,border:s.borderTopWidth,borderColor:s.borderTopColor,radius:s.borderRadius,padding:s.padding,shadow:s.boxShadow}}')
  assert s['background']=='rgba(255, 250, 240, 0.92)' and s['border']=='3px' and s['borderColor']=='rgb(255, 255, 255)' and s['radius']=='22px',s
  assert s['padding']=='16px 24px' and '10px 30px' in s['shadow'],s
  if q.viewport_size['width']<=767:
   assert abs(card['x']-r['x']-12)<1 and abs(card['width']-r['width']+24)<1,(selector,r,card)
  else:assert card['width']<=560.1,(selector,card)
  if selector=='.sw-result-copy':
   assert abs((r['y']+r['height'])-(card['y']+card['height'])-20)<1,(r,card)
   assert abs(card['x']+card['width']/2-(r['x']+r['width']/2))<1
   assert card['y']>=r['y']+r['height']*.45,('card covers upper character',r,card)
  else:assert abs(card['y']+card['height']/2-(r['y']+r['height']/2))<1
 # Actual press/hover/focus states, without activating Play by releasing outside it.
 q.wait_for_function('!document.getElementById("gameToast")');play=q.locator('[data-sw=play]');candy('[data-sw=play]','green');candy('.sw-cover [data-sw=professions]','blue')
 play.hover();assert play.evaluate('e=>getComputedStyle(e).filter')=='brightness(1.06)'
 q.mouse.down();assert play.evaluate('e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).f')==4
 assert '1px' in play.evaluate('e=>getComputedStyle(e).boxShadow');q.mouse.move(0,0);q.mouse.up()
 q.keyboard.press('Tab');play.focus();assert play.evaluate('e=>getComputedStyle(e).outlineColor')=='rgb(255, 255, 255)'
 q.locator('.sw-cover h1').click()
 for lang in LANGUAGES:
  language(lang)
  for w,h in SIZES:
   q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(80);card_geometry('.sw-cover-copy');clear_photo('.sw-cover-image','start-'+lang);candy('[data-sw=play]','green');candy('.sw-cover [data-sw=professions]','blue');no_button_emoji()
   if (lang,w) in [('ru',1366),('uz-Latn',390)]:q.screenshot(path=str(ROOT/f'artifacts/wardrobe-candy-start-{lang}-{w}.png'))
 q.locator('[data-sw=play]').click()
 for lang in LANGUAGES:
  language(lang)
  for w,h in SIZES:
   q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(80)
   for cat in q.evaluate('SafetyWardrobeData.categories'):
    tab=q.locator('[data-sw-category='+cat['id']+']');tab.click();name=cat['name'][lang]
    assert tab.get_attribute('aria-label')==tab.get_attribute('title')==name
    assert tab.locator('.sw-tab-tooltip').inner_text()==name
    ribbon=q.locator('.sw-sticker');assert ribbon.inner_text()==q.evaluate('(name)=>SafetyWardrobe.text("choose",{name})',name)
    fit=ribbon.evaluate('e=>({font:parseFloat(getComputedStyle(e).fontSize),nowrap:getComputedStyle(e).whiteSpace,scroll:e.scrollWidth,width:e.clientWidth})')
    assert fit['nowrap']=='nowrap' and 15<=fit['font']<=20 and fit['scroll']<=fit['width']+1,(lang,w,cat['id'],fit)
    tab.hover();tooltip=tab.locator('.sw-tab-tooltip').bounding_box();frame=q.locator('.sw').bounding_box()
    assert tooltip['x']>=frame['x']-1 and tooltip['x']+tooltip['width']<=frame['x']+frame['width']+1,(lang,w,name,tooltip,frame)
    ribbons.append({'language':lang,'width':w,'category':cat['id'],'name':name,'font':fit['font']})
   candy('.sw-selection [data-sw=professions]','blue');candy('[data-sw=done]','green');no_button_emoji()
  q.locator('.sw-badge').click();help=q.locator('.sw-dialog-body').inner_text()
  for cat in q.evaluate('SafetyWardrobeData.categories'):assert cat['name'][lang] in help
  q.keyboard.press('Escape')
 assert q.evaluate('CourseGame.xp()')==xp
 q.set_viewport_size({'width':1366,'height':768});language('ru');q.locator('[data-sw=professions]').click();no_button_emoji()
 q.screenshot(path=str(ROOT/'artifacts/wardrobe-candy-professions.png'));q.locator('[data-job=chemist]').click()
 q.locator('[data-sw=professions]').click();q.locator('[data-job=firefighter]').click()
 candy('[data-sw=confirm-job]','orange');candy('.sw-dialog .sw-actions [data-sw=professions]','gray')
 q.screenshot(path=str(ROOT/'artifacts/wardrobe-candy-confirm.png'))
 q.locator('.sw-dialog-close').click()
 cases=[('ru','chemist',1),('uz-Latn','firefighter',2),('en','astronaut',3),('uz-Cyrl','surgeon',3)]
 for index,(lang,id,stars) in enumerate(cases):
  if index:
   q.locator('[data-sw=professions]').click();q.locator('[data-job='+id+']').click()
  language(lang)
  if stars==1:
   q.locator('[data-sw-category=head]').click()
   for _ in range(3):q.locator('[data-sw-item=hard-hat]').click()
  elif stars==2:q.locator('[data-sw=hint]').click()
  if index==len(cases)-1:q.emulate_media(reduced_motion='no-preference')
  required=q.evaluate('(id)=>SafetyWardrobeData.professions.find(p=>p.id===id).required',id)
  for item in required:
   cat=q.evaluate('(id)=>SafetyWardrobeData.items.find(i=>i.id===id).category',item);q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+item+']').click()
  q.wait_for_selector('.sw-result-copy')
  if index==len(cases)-1:
   delays=q.locator('.sw-stars>span').evaluate_all('es=>es.map(e=>{const a=e.getAnimations()[0];return {delay:a.effect.getTiming().delay,duration:a.effect.getTiming().duration,frames:a.effect.getKeyframes().map(k=>k.transform)}})')
   assert [d['delay'] for d in delays]==[160,320,480] and all(d['duration']==500 for d in delays),delays
   assert all('scale(0)' in d['frames'] and 'scale(1.25)' in d['frames'] and 'scale(1)' in d['frames'] for d in delays)
   assert q.locator('.sw-result-copy').evaluate('e=>getComputedStyle(e).animationDuration')=='0.4s'
   q.wait_for_timeout(1100);q.emulate_media(reduced_motion='reduce')
  assert q.locator('.sw-stars .sw-star-earned').count()==stars and q.locator('.sw-stars .sw-star-missing').count()==3-stars
  assert q.locator('.sw-rating-star').count()==3
  for w,h in SIZES:
   q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(80);card_geometry('.sw-result-copy');clear_photo('.sw-scene',id+'-'+lang)
   assert q.locator('.sw-scene').evaluate('e=>getComputedStyle(e).objectFit')=='contain'
   assert q.locator('.sw-result h1').evaluate('e=>getComputedStyle(e).fontSize')==('17px' if w<=767 else '20px')
   assert q.locator('.sw-xp').evaluate('e=>getComputedStyle(e).fontSize')=='16px'
   assert q.locator('.sw-stars').evaluate('e=>getComputedStyle(e).fontSize')=='28px'
   assert q.locator('.sw-result-copy').evaluate('e=>getComputedStyle(e).gap')=='8px'
   candy('.sw-result [data-sw=professions]','blue');candy('.sw-result [data-sw=exit]','green');no_button_emoji()
   if w in [1366,390]:q.screenshot(path=str(ROOT/f'artifacts/wardrobe-candy-result-{id}-{w}.png'))
  results.append({'profession':id,'language':lang,'stars':stars})
  q.set_viewport_size({'width':1366,'height':768})
 assert q.evaluate('CourseGame.xp()')==xp+80
 assert not errors,errors;assert not console,console;assert not bad,bad
 (ROOT/'artifacts/wardrobe-candy-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'category_checks':ribbons,'source_pixel_checks':photos,'results':results,'checks':['all 24 category translations in ribbons, tooltips, accessible names and help','72 ribbon sizes without truncation and font never below 15px','exact action gradients, borders, edges, gloss, text, 52/46px heights','hover brightness, pressed 4px/1px edge and white keyboard ring','orange confirm and gray cancel','no emoji in interface buttons','three SVG stars with correct earned/missing states and sequential bounce','20/17px result title, 16px reward, 28px stars, 8px gaps','solid cards with white border, 12px phone margins, 20px final bottom gap','unfiltered, fully opaque original images with no full-scene overlays','rendered uncovered photo pixels match source JPEG on start and four profession scenes','complete profession frame kept visible','no free-mode XP and unchanged 20 XP per profession','no console or loading errors'],'js_errors':errors,'console_errors':console,'bad_responses':bad},ensure_ascii=False,indent=2))
 b.close();print('PASS candy controls, four category locales, clear source pixels, full scenes and star animations')
