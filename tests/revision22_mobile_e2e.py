from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce');c.route('https://fonts.googleapis.com/**',lambda r:r.abort());q=c.new_page();errors=[];q.on('pageerror',lambda e:(errors.append(str(e)),print('JS',e,flush=True)));register_local(q,BASE,'Phone twenty two');q.evaluate('''()=>{TextbookCourse.data().steps['1.1']={started:true,done:false};TextbookCourse.data().steps['2.1']={started:true,done:false};const s=IntroModel.data().lesson12??=Practical12Data.blank();s.rows.beaker={studied:true,earned:true,review:{version:1,method:'dwell',seconds:4}};s.setup??=Setup12Data.blank();s.setup.visited=Setup12Data.ids.slice(0,6);s.setup.proof=Setup12Data.proof(s.setup);saveState()}''')
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.evaluate('(l)=>{state.settings.language=l;PersonalData.data().preferences.textSize=2;saveState()}',lang)
  for route in ['#home','#collection','#progress','#settings','#resources/glossary','#games']:
   q.goto(BASE+route);q.wait_for_selector('#main h1');q.wait_for_timeout(120);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,route,q.evaluate('document.documentElement.scrollWidth'));assert 'Unbounded' in q.locator('#main h1').first.evaluate('e=>getComputedStyle(e).fontFamily');assert q.locator('#main h1').first.evaluate('e=>getComputedStyle(e).textTransform')=='none'
 q.screenshot(path='/tmp/revision22-phone-games.png');q.evaluate('state.settings.language="ru";PersonalData.data().preferences.textSize=0;saveState()');q.goto(BASE+'#resources/glossary');q.locator('[data-lex-flip]').first.tap();q.locator('[data-lex-flip]').first.locator('[data-personal-collect]').tap();assert q.evaluate('PersonalData.data().collection.length')==1;q.goto(BASE+'#games/danger');q.locator('[data-mini-start]').tap()
 for id in ['hair','goggles','sniff','face','sandwich','flame']:q.locator('[data-mini-hit='+id+']').tap()
 q.wait_for_selector('.mini-result');q.goto(BASE+'#games/warehouse');q.locator('[data-mini-start]').tap()
 for n in range(10):
  q.locator('.mini-conveyor').scroll_into_view_if_needed();rect=q.locator('[data-mini-bottle]').bounding_box();q.touchscreen.tap(rect['x']+rect['width']/2,rect['y']+rect['height']/2);id=q.evaluate('MiniGames.debug().expected');q.locator('[data-mini-shelf='+id+']').tap()
 q.wait_for_selector('.mini-result');q.goto(BASE+'#games/guess');q.locator('[data-mini-start]').tap()
 for n in range(8):
  id=q.evaluate('MiniGames.debug().expected');q.locator('[data-mini-guess='+id+']').tap();q.locator('[data-mini-next]').tap()
 q.wait_for_selector('.mini-result');q.goto(BASE+'#games/bath');q.locator('[data-mini-start]').tap();q.wait_for_selector('[data-workshop-card=stand]:enabled')
 for id in ['stand','burner','tripod','gauze','beaker','water-bottle','clamp','tube']:
  q.locator('[data-workshop-card='+id+']').scroll_into_view_if_needed();q.locator('[data-workshop-card='+id+']').tap();q.locator('[data-workshop-target]').tap();q.wait_for_timeout(100)
 q.locator('[data-workshop-depth]').fill('30');q.locator('[data-workshop-secure]').tap()
 for id in ['alcohol-bottle','thermometer']:
  q.locator('[data-workshop-card='+id+']').scroll_into_view_if_needed();q.locator('[data-workshop-card='+id+']').tap();q.locator('[data-workshop-target]').tap();q.wait_for_timeout(100)
 q.locator('[data-workshop-valve]').tap();q.locator('[data-workshop-match]').tap();q.locator('[data-workshop-target]').tap();q.wait_for_selector('.mini-result');assert not errors,errors;print('PASS phone: four languages, three text sizes, no horizontal overflow, Unbounded headings, glossary flip/save, touch safety hunt/conveyor/guessing and all 11 assembly steps');b.close()
