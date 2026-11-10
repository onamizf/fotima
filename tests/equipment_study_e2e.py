"""Fresh study attempts, durable completion/XP, clickable results and four-locale layouts."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/study14111');OUT.mkdir(parents=True,exist_ok=True)
IDS=['graduated-cylinder','beaker','funnel','conical-flask','evaporating-dish','test-tube']
with sync_playwright() as p:
 try:
  w=p.webkit.launch();w.close();print('WebKit available',flush=True)
 except Exception as e:print('WebKit unavailable:',str(e).splitlines()[0],flush=True)
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},has_touch=True,reduced_motion='reduce')
 for host in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+host+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Study story')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}state.intro.lesson12.collection={version:1,cards:{beaker:{done:true,awarded:false}}};saveState();}''')
 q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('[data-equipment=graduated-cylinder]')
 assert q.evaluate('EquipmentStudy.capture().seen.length')==0
 assert q.locator('[data-es-item]').evaluate_all('es=>es.map(e=>e.querySelector("strong").textContent)')==q.evaluate('EquipmentStudyData.items.map(i=>i.name.ru)')
 for i in range(6):q.locator('[data-es-item="'+str(i)+'"]').click();q.locator('[data-es=demo]').click()
 q.wait_for_selector('.es-completion:not([hidden])',timeout=12000)
 assert q.locator('[data-es-review]').count()==6
 assert q.evaluate('Object.keys(state.game.rewards).filter(k=>k.startsWith("lesson12:collection:")).length')==6
 stored=q.evaluate('JSON.parse(localStorage.getItem(STORAGE_KEY)).intro.lesson12')
 assert stored['collection']=={'version':2,'complete':True}
 assert all(not stored['rows'].get(id,{}).get('studied',False) for id in IDS)
 xp=q.evaluate('CourseGame.xp()')
 q.set_viewport_size({'width':360,'height':800});q.locator('[data-es-review="5"]').tap();q.wait_for_selector('[data-equipment=test-tube]');q.locator('[data-es=next]').tap();q.wait_for_selector('.es-completion:not([hidden])');q.set_viewport_size({'width':1366,'height':768})
 q.locator('[data-es-review="2"]').focus();q.keyboard.press('Space');q.wait_for_selector('[data-equipment=funnel]');assert q.locator('.es-completion').is_hidden();assert not q.locator('.es-layout').evaluate('(e)=>e.inert')
 q.keyboard.press('ArrowRight');assert q.locator('[data-equipment=conical-flask]').count()==1
 q.locator('[data-es-neighbor="4"]').click();assert q.locator('[data-equipment=evaporating-dish]').count()==1
 q.locator('[data-es-item="5"]').click();q.locator('[data-es=next]').click();q.wait_for_selector('.es-completion:not([hidden])')
 q.locator('[data-es=restart]').click();assert q.evaluate('EquipmentStudy.capture().seen.length')==0;assert q.locator('[data-equipment=graduated-cylinder]').count()==1
 q.locator('[data-es=demo]').click();assert q.evaluate('CourseGame.xp()')==xp
 q.reload();q.wait_for_selector('[data-equipment=graduated-cylinder]');assert q.evaluate('EquipmentStudy.capture().seen.length')==0
 q.locator('[data-es-item="4"]').click();q.goto(BASE+'#home');q.wait_for_selector('.topbar');q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('[data-equipment=graduated-cylinder]');assert q.evaluate('EquipmentStudy.capture().seen.length')==0
 for width,height in [(360,800),(768,1024),(1366,768),(1920,1080),(1366,450)]:
  q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(100)
  for lang in ['ru','en','uz-Latn','uz-Cyrl']:
   if width<768:
    menu=q.locator('.workspace-header-menu');
    if menu.get_attribute('open') is None:menu.locator('summary').tap()
   q.locator('#languageToggle').click();q.locator('#languagePanel [data-dropdown-index="'+str(['ru','uz-Latn','uz-Cyrl','en'].index(lang))+'"]').click();q.wait_for_selector('.es-study')
   if width<768 and q.locator('.workspace-header-menu').get_attribute('open') is not None:q.locator('.workspace-header-menu summary').tap()
   q.locator('.es-study').evaluate('e=>e.scrollTop=0')
   assert q.locator('html').get_attribute('lang')==lang
   q.locator('[data-es-item="4"]').click()
   q.locator('.es-study').evaluate('e=>e.scrollTop=0');q.locator('.es-scene').evaluate('e=>e.scrollTop=0')
   scene=q.locator('.es-scene').bounding_box();title=q.locator('.es-scene>h2').bounding_box();assert title['y']>=scene['y']-1 and title['y']+title['height']<=scene['y']+scene['height']+1,(width,lang,title,scene)
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,lang)
   assert q.locator('.es-step').inner_text()==q.evaluate('EquipmentStudyData.copy.step[state.settings.language].replace("{n}","5")')
   assert q.locator('.es-section').count()==6
   assert q.locator('.es-section-role p').inner_text()==q.evaluate('EquipmentStudyData.items[4].sections.role[state.settings.language]')
   assert q.locator('.es-visual').evaluate('(e)=>getComputedStyle(e).transform')=='none'
  if height!=450:q.screenshot(path=str(OUT/(str(width)+'.png')))
 q.set_viewport_size({'width':1366,'height':768});q.locator('[data-es=fullscreen]').click();q.wait_for_function('!!document.fullscreenElement');q.locator('#app>.topbar').wait_for(state='hidden');q.evaluate('document.exitFullscreen()');q.wait_for_function('!document.fullscreenElement');q.locator('#app>.topbar').wait_for(state='visible')
 assert q.evaluate('CourseGame.xp()')==xp
 assert not errors,errors
 print('PASS fresh entry/reload/navigation, completion buttons, XP once, four languages and four screen sizes plus short viewport, shared header/fullscreen; no console errors',flush=True)
 b.close()
