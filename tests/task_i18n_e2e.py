"""Language changes preserve live task state; JSON geometry is shared in all locales."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/i18n1415');OUT.mkdir(parents=True,exist_ok=True)
LANGS=['en','uz-Latn','uz-Cyrl','ru']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},has_touch=True,reduced_motion='reduce')
 for domain in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+domain+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];warnings=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else warnings.append(m.text) if m.type=='warning' and '[i18n]'in m.text else None)
 register_local(q,BASE,'Task languages')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 def language(lang):
  
  menu=q.locator('.workspace-header-menu');
  if q.viewport_size['width']<768 and menu.get_attribute('open') is None:menu.locator('summary').tap()
  getattr(q.locator('#languageToggle'),'tap' if q.viewport_size['width']<768 else 'click')();getattr(q.locator('#languagePanel [data-dropdown-index="'+str(['ru','uz-Latn','uz-Cyrl','en'].index(lang))+'"]'),'tap' if q.viewport_size['width']<768 else 'click')();q.wait_for_function('(l)=>document.documentElement.lang===l',arg=lang)
 q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('.es-study');q.locator('[data-es-item="3"]').click();q.locator('[data-es=demo]').click()
 for lang in LANGS:
  language(lang);q.wait_for_selector('[data-equipment=graduated-cylinder]');assert q.locator('.es-section').count()==6
  assert q.locator('.es-section p').all_inner_texts()==q.evaluate('EquipmentStudyData.items[3].sections?Object.values(EquipmentStudyData.items[3].sections).map(v=>v[state.settings.language]):[]')
  assert q.evaluate('state.intro.lesson12.collection.cards["graduated-cylinder"].done')
 for width,height in [(360,800),(768,1024),(1366,768),(1920,1080)]:
  q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(100)
  for lang in LANGS:
   language(lang);q.wait_for_selector('[data-equipment=graduated-cylinder]')
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),('study',width,lang)
 print('PASS study translations and current instrument',flush=True)
 for task,model in [('task-2','water-bath'),('task-3','evaporation')]:
  q.goto(BASE+'#lab/ch1/1.2/'+task);q.wait_for_selector('.wb-atlas')
  parts=q.evaluate('(id)=>WaterBathAtlas.load(id).then(d=>d.parts)',model)
  for part in parts:q.locator('[data-wb-card="'+part['id']+'"]').click();q.locator('[data-wb=close]').click()
  q.locator('.wb-page-header [data-wb=build]').click();q.wait_for_selector('.ag-origin')
  for part in parts[:2]:q.locator('[data-ag-part="'+part['id']+'"]').click();q.locator('[data-ag-target]').click()
  xp=q.evaluate('CourseGame.xp()')
  for lang in LANGS:
   language(lang);q.wait_for_selector('.ag-origin');q.wait_for_function('document.querySelectorAll(".ag-frame.is-placed").length===2')
   assert q.locator('[data-wb=ag-undo]').is_enabled()
   assert q.evaluate('CourseGame.xp()')==xp
   assert q.locator('[data-ag-message]').inner_text().startswith(q.evaluate('WaterBathAtlas.t("step")'))
  q.locator('[data-wb=ag-undo]').click();assert q.locator('.ag-frame.is-placed').count()==1
  q.locator('[data-wb=ag-redo]').click();assert q.locator('.ag-frame.is-placed').count()==2
  print('PASS',model,'partial assembly, timer and undo/redo preserved',flush=True)
  for width,height in [(360,800),(768,1024),(1366,768),(1920,1080)]:
   q.set_viewport_size({'width':width,'height':height})
   for lang in LANGS:
    language(lang);q.wait_for_selector('.ag-origin');q.wait_for_timeout(100)
    assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,lang)
    for part in parts:
     box=q.locator('[data-ag-frame="'+part['id']+'"]').bounding_box();origin=q.locator('.ag-origin').bounding_box();a=part['assembled']
     assert abs(box['x']-origin['x']-a['x']/100*origin['width'])<1
     assert abs(box['y']-origin['y']-a['y']/100*origin['height'])<1
     assert abs(box['width']-a['w']/100*origin['width'])<1
     assert abs(box['height']-a['h']/100*origin['height'])<1
     assert q.locator('[data-ag-frame="'+part['id']+'"] img').first.evaluate('(e)=>getComputedStyle(e).objectFit')==a.get('fit','contain')
    q.screenshot(path=str(OUT/(model+'-'+str(width)+'-'+lang+'.png')))
 q.set_viewport_size({'width':1366,'height':768});q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_function('SafetyWorkspace.debug.player?.stage===0')
 q.locator('[data-sw-scene="1"]').click();q.wait_for_function('SafetyWorkspace.debug.current===1&&SafetyWorkspace.debug.player?.stage===0')
 q.locator('[data-sp=advance-line]').click();q.locator('[data-sw=pause]').click();before=q.evaluate('SafetyWorkspace.capture()')
 for lang in LANGS:
  language(lang);q.wait_for_function('SafetyWorkspace.debug.current===1&&SafetyWorkspace.debug.player?.stage===1')
  assert q.evaluate('SafetyWorkspace.debug.player.playing')==before['player']['playing']
  assert q.locator('.safety-step-summary strong').inner_text()==q.evaluate('SafetyWorkspaceCopy.stage[state.settings.language].replace("{letter}",SafetySituations.letter("danger-b",state.settings.language)).replace("{n}","2").replace("{total}","8")')
 for width,height in [(360,800),(768,1024),(1366,768),(1920,1080)]:
  q.set_viewport_size({'width':width,'height':height});q.wait_for_timeout(100)
  for lang in LANGS:
   language(lang);q.wait_for_function('SafetyWorkspace.debug.current===1&&SafetyWorkspace.debug.player?.stage===1')
   assert q.locator('.safety-stage-badge').is_visible()
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),('safety',width,lang)
 q.set_viewport_size({'width':1366,'height':768});q.wait_for_timeout(100)
 print('PASS safety situation/stage preserved',flush=True)
 q.goto(BASE+'?debug=1#lab/ch1/1.2/task-2');q.wait_for_selector('.wb-atlas')
 for id in ['boss-clamp','clamp-arm']:
  assert '/parts/assembly/' in q.locator('.wb-part[data-wb-part="'+id+'"] .wb-assembly-photo').get_attribute('src')
 q.locator('.wb-page-header [data-wb=build]').click();q.wait_for_selector('.ag-debug')
 assert q.locator('.ag-full').evaluate('(e)=>getComputedStyle(e).opacity')=='.35' or q.locator('.ag-full').evaluate('(e)=>getComputedStyle(e).opacity')=='0.35'
 q.screenshot(path=str(OUT/'debug-reference-overlay.png'))
 assert not errors,errors
 assert not warnings,warnings
 # Missing translations fall back to Russian with a key-specific warning.
 assert q.evaluate('TaskI18n.text({ru:"fallback"},"test.missing","en")')=='fallback'
 q.wait_for_timeout(100);assert any('test.missing' in w for w in warnings)
 print('PASS 4 languages × 4 viewport sizes, JSON frames/fit, fallback warning; no console errors')
 b.close()
