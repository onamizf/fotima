"""Requested wardrobe UI and live translations through the site's language menu."""
import os,json,re
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
LANGUAGES={'ru':'Русский','uz-Latn':'O‘zbekcha','uz-Cyrl':'Ўзбекча','en':'English'}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 q=b.new_page(viewport={'width':1366,'height':768},reduced_motion='reduce');errors=[];bad=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 register_local(q,BASE,'Wardrobe languages');q.goto(BASE+'#safety-wardrobe')
 def decode():q.evaluate('async()=>{await Promise.all([...document.querySelectorAll(".sw img")].map(e=>e.decode().catch(()=>{})))}')
 def settle():q.wait_for_timeout(3300)
 def language(lang):
  q.locator('#languageToggle').click();q.locator('#languagePanel [role=option]').filter(has_text=LANGUAGES[lang]).click()
  assert q.evaluate('state.settings.language')==lang
 def equip(cat,id):
  q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click()
  q.wait_for_function('(id)=>!!document.querySelector(`.sw-full-layer[data-sw-layer="${id}"]`)||!!document.querySelector(".sw-result-copy")',arg=id)
 def localized():
  texts=q.locator('.sw').inner_text()
  if q.evaluate('state.settings.language') in ['uz-Latn','en']:assert not re.search('[А-Яа-яЁё]',texts),texts
 def result_fit():
  assert q.locator('.sw-top .sw-badge,.sw-top .sw-task').count()==0
  assert q.locator('.sw-top [data-sw=exit]').count()==1
  title=q.locator('.sw-result h1');expected=q.evaluate('SafetyWardrobe.text("ready")')
  assert title.inner_text()==expected,(title.inner_text(),expected)
  assert title.locator('span').count()==len(expected.split())
  assert title.evaluate('e=>[...e.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).every(n=>n.textContent===" ")')
  bounds=title.bounding_box()
  rows=title.locator('span').evaluate_all('es=>[...new Set(es.map(e=>Math.round(e.getBoundingClientRect().top)))]')
  assert len(rows)<=2,('result title exceeds two lines',rows,title.inner_text())
  frame=q.locator('.sw').bounding_box();copy=q.locator('.sw-result-copy').bounding_box()
  assert copy['y']>=frame['y']+frame['height']*.64,(frame,copy)
  assert bounds['y']>=copy['y']-1,('result content overflows upward',bounds,copy)
  assert q.locator('.sw-stars').evaluate('e=>getComputedStyle(e).fontSize')=='32px'
  assert q.locator('.sw-xp').evaluate('e=>getComputedStyle(e).fontSize')=='20px'
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1')
 decode();settle();assert q.locator('.sw-eyebrow').count()==0
 sticker=q.locator('.sw-start-sticker');assert sticker.evaluate('e=>getComputedStyle(e).width')=='72px'
 assert sticker.locator('img').get_attribute('src')=='assets/game/scenes/chemist.jpg'
 assert sticker.evaluate('e=>getComputedStyle(e).borderTopWidth')=='4px'
 q.screenshot(path=str(ROOT/'artifacts/wardrobe-ui-start-ru.png'))
 language('uz-Latn');assert q.locator('.sw-cover h1').inner_text()=='Xavfsizlik garderobi';localized();settle()
 q.screenshot(path=str(ROOT/'artifacts/wardrobe-ui-start-uz.png'))
 q.locator('[data-sw=play]').click();xp=q.evaluate('CourseGame.xp()')
 for cat,id in [('head','hard-hat'),('eyes','goggles'),('face','medical-mask'),('body','work-overall'),('hands','work-gloves'),('feet','steel-boots')]:equip(cat,id)
 q.locator('[data-sw=left]').click();q.locator('[data-sw-category=body]').click()
 selected=q.locator('.sw-full-layer').evaluate_all('es=>es.map(e=>e.dataset.swLayer).sort()')
 for lang in ['ru','uz-Cyrl','en','uz-Latn']:
  language(lang)
  assert q.locator('.sw-full-layer').evaluate_all('es=>es.map(e=>e.dataset.swLayer).sort()')==selected
  assert q.locator('[data-sw-category=body]').get_attribute('aria-selected')=='true'
  assert q.locator('.sw-frog-turn').evaluate('e=>getComputedStyle(e).transform.startsWith("matrix(-1")')
  assert 'shirt-sleeves-hidden' in q.locator('.sw-base').get_attribute('class')
  assert 'feet-hidden' in q.locator('.frog-base').get_attribute('class');localized()
 assert q.locator('.sw-tabs kbd').count()==0
 assert q.locator('[data-sw-category=face] svg').is_visible()
 q.locator('[data-sw-category=body]').focus()
 q.keyboard.press('e');assert q.locator('[data-sw-category=hands]').get_attribute('aria-selected')=='true'
 q.keyboard.press('q');assert q.locator('[data-sw-category=body]').get_attribute('aria-selected')=='true'
 assert q.locator('.sw-worn>span').count()==0
 assert q.locator('.sw-worn').evaluate('e=>getComputedStyle(e).backgroundColor')=='rgba(0, 0, 0, 0)'
 assert q.locator('.sw-small-controls button').first.bounding_box()['width']==36
 assert q.locator('.sw-small-controls button').first.evaluate('e=>getComputedStyle(e).color')=='rgb(176, 122, 74)'
 geometry=[]
 for w,h in [(1366,768),(1024,768),(768,900),(390,844),(320,740)]:
  q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(100)
  for cat in ['head','eyes','face','body','hands','feet']:
   q.locator('[data-sw-category='+cat+']').click();grid=q.locator('.sw-grid')
   assert grid.evaluate('e=>getComputedStyle(e).gridTemplateColumns.split(" ").length')==5
   assert grid.evaluate('e=>getComputedStyle(e).gap')=='16px'
   boxes=q.locator('.sw-card').evaluate_all('es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})')
   for i,a in enumerate(boxes):
    assert abs(a['w']-a['h'])<1,(cat,w,a)
    for other in boxes[i+1:]:assert a['x']+a['w']<=other['x']+.5 or other['x']+other['w']<=a['x']+.5 or a['y']+a['h']<=other['y']+.5 or other['y']+other['h']<=a['y']+.5
   q.locator('.sw-card').last.scroll_into_view_if_needed();last=q.locator('.sw-card').last.bounding_box();g=grid.bounding_box();actions=q.locator('.sw-selection>.sw-actions').bounding_box()
   assert last['y']+last['height']<=g['y']+g['height']+1,(w,cat,'last card clipped')
   assert g['y']+g['height']<=actions['y']-8,(w,cat,'cards cover actions')
  frog=q.locator('.sw-doll').bounding_box();row=q.locator('.sw-worn').bounding_box();stage=q.locator('.sw-scene-viewport').bounding_box()
  assert row['x']>=frog['x']+frog['width']*.86,(w,'badges cover feet',row,frog)
  assert row['y']+row['height']<=stage['y']+stage['height']+1
  assert frog['y']+frog['height']*.97<=stage['y']+stage['height'],(w,'feet clipped')
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1')
  geometry.append({'width':w,'height':h,'columns':5,'badge_gap':row['x']-(frog['x']+frog['width']*.86)})
  if w in [1366,390]:
   q.locator('[data-sw-category=body]').click();decode();settle();q.screenshot(path=str(ROOT/f'artifacts/wardrobe-ui-body-uz-{w}.png'))
 q.set_viewport_size({'width':1366,'height':768});q.locator('.sw-badge').click();assert q.locator('.sw-dialog h2').inner_text()=="Qanday o'ynash kerak";localized()
 # A rerender preserves open dialogs too, using the site's real language change callback.
 q.evaluate('StudentHeader.changeLanguage("ru")');assert q.locator('.sw-dialog h2').inner_text()=='Как играть'
 q.keyboard.press('Escape');assert q.locator('.sw-full-layer').count()==6
 language('uz-Latn');q.locator('[data-sw=professions]').click();localized()
 assert q.locator('.sw-profession').count()==13
 assert q.locator('[data-job=chemist] strong').inner_text()=='Kimyogar-laborant'
 q.locator('[data-job=chemist]').click();equip('body','lab-coat');q.locator('[data-sw=hint]').click()
 before=q.evaluate('SafetyWardrobe.capture()');language('ru');after=q.evaluate('SafetyWardrobe.capture()')
 assert all(before[k]==after[k] for k in ['selected','job','mistakes','hints','flipped','category'])
 language('uz-Latn');equip('eyes','goggles');equip('hands','nitrile-gloves');equip('feet','closed-shoes');q.wait_for_selector('.sw-result-copy');result_fit();localized()
 assert q.evaluate('CourseGame.xp()')==xp+20
 for lang in ['ru','uz-Cyrl','en','uz-Latn']:
  language(lang);result_fit();localized();assert q.evaluate('CourseGame.xp()')==xp+20
 for w,h in [(1366,768),(390,844),(320,740)]:
  q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(100);result_fit()
 q.set_viewport_size({'width':1366,'height':768})
 jobs=q.evaluate('SafetyWardrobeData.professions')
 for job in jobs[1:]:
  q.locator('[data-sw=professions]').click();q.locator('[data-job='+job['id']+']').click();localized()
  if job['id']=='electrician':
   q.locator('[data-sw-category=hands]').click();q.locator('[data-sw-item=rubber-gloves]').click()
   assert 'dielektrik' in q.locator('.sw-speech').inner_text();language('ru');assert 'диэлектрические' in q.locator('.sw-speech').inner_text();language('uz-Latn')
  for id in job['required']:
   cat=q.evaluate('(id)=>SafetyWardrobeData.items.find(i=>i.id===id).category',id);equip(cat,id)
  q.wait_for_selector('.sw-result-copy');decode();result_fit();localized()
  if job['id']=='firefighter':
   settle();q.screenshot(path=str(ROOT/'artifacts/wardrobe-ui-result-uz-desktop.png'));q.set_viewport_size({'width':390,'height':844});result_fit();q.screenshot(path=str(ROOT/'artifacts/wardrobe-ui-result-uz-phone.png'));q.set_viewport_size({'width':1366,'height':768})
 assert q.evaluate('CourseGame.xp()')==xp+360
 language('ru');result_fit();assert q.locator('.sw-result-copy h2').inner_text()=='Мастер безопасности 🏆'
 settle();q.screenshot(path=str(ROOT/'artifacts/wardrobe-ui-result-ru-master.png'))
 q.reload();q.locator('[data-sw=professions]').click();q.locator('[data-job=chemist]').click()
 for id in jobs[0]['required']:equip(q.evaluate('(id)=>SafetyWardrobeData.items.find(i=>i.id===id).category',id),id)
 q.wait_for_selector('.sw-result-copy');language('uz-Latn');assert 'allaqachon' in q.locator('.sw-xp').inner_text();assert q.evaluate('CourseGame.xp()')==xp+360
 # Changing language during the celebration keeps the earned result and cancels old timers.
 q.reload();q.emulate_media(reduced_motion='no-preference');q.locator('[data-sw=professions]').click();q.locator('[data-job=surgeon]').click()
 for id in jobs[4]['required']:equip(q.evaluate('(id)=>SafetyWardrobeData.items.find(i=>i.id===id).category',id),id)
 q.wait_for_function('SafetyWardrobe.capture().finished');q.evaluate('StudentHeader.changeLanguage("ru")');q.wait_for_selector('.sw-result-copy');q.wait_for_timeout(2400)
 assert q.locator('.sw-scene').get_attribute('src').endswith('/surgeon.jpg');assert q.evaluate('CourseGame.xp()')==xp+360
 assert not errors,errors;assert not bad,bad
 (ROOT/'artifacts/wardrobe-ui-i18n-validation.json').write_text(json.dumps({'status':'passed','version':q.locator('meta[name=application-version]').get_attribute('content'),'languages':list(LANGUAGES),'geometry':geometry,'checks':['all six category grids have five square columns and safe scroll bounds','small transparent worn badges beside feet and no footer strip','face mask icon and working Q/E without badges','hanger help button and cream rotation controls','frog portrait start sticker','13 professions and 360 XP in Uzbek','live language menu preserves outfit, turn, category, hints, mistakes and result','translated help, item tips, professions, speech, warnings, stars, rewards and master bonus','word spaces, two-line result title and compact bottom block','only close button over the final scene','language switch during celebration and no duplicate rewards','Russian fallback validated separately','five viewport sizes'],'js_errors':errors,'bad_responses':bad},ensure_ascii=False,indent=2))
 b.close();print('PASS wardrobe UI, four live languages, 13 Uzbek professions, viewport geometry and reward preservation')
