from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce');c.route('https://fonts.googleapis.com/**',lambda r:r.abort());q=c.new_page();errors=[];q.on('pageerror',lambda e:(errors.append(str(e)),print('JS',e,flush=True)));register_local(q,BASE,'Phone twenty two');q.evaluate('''()=>{TextbookCourse.data().steps['1.1']={started:true,done:false};TextbookCourse.data().steps['2.1']={started:true,done:false};const s=IntroModel.data().lesson12??=Practical12Data.blank();s.rows.beaker={studied:true,earned:true,review:{version:1,method:'dwell',seconds:4}};s.setup??=Setup12Data.blank();s.setup.visited=Setup12Data.ids.slice(0,6);s.setup.proof=Setup12Data.proof(s.setup);saveState()}''')
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.evaluate('(l)=>{state.settings.language=l;PersonalData.data().preferences.textSize=2;saveState()}',lang)
  for route in ['#home','#collection','#progress','#settings','#resources/glossary']:
   q.goto(BASE+route);q.wait_for_selector('#main h1');q.wait_for_timeout(120);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,route,q.evaluate('document.documentElement.scrollWidth'));assert 'Unbounded' in q.locator('#main h1').first.evaluate('e=>getComputedStyle(e).fontFamily');assert q.locator('#main h1').first.evaluate('e=>getComputedStyle(e).textTransform')=='none'
 assert not errors,errors
 print('PASS four-language mobile personal pages without overflow')
 b.close()
