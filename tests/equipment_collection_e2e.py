"""Exercise collection gameplay, persistence, rewards, audio and responsive layouts."""
from pathlib import Path
import sys
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/collection');OUT.mkdir(exist_ok=True)
IDS=['test-tube','beaker','evaporating-dish','conical-flask','funnel','graduated-cylinder']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for language in (sys.argv[1:] or ['ru','uz-Latn']):
  c=b.new_context(viewport={'width':1920,'height':1080},reduced_motion='reduce')
  c.add_init_script('window.audioStarts=0;const orig=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){window.audioStarts++;return orig.apply(this,args)}');c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
  q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
  register_local(q,BASE,'Collection '+language.replace('-',' '))
  q.evaluate('''language=>{state.settings.language=language;state.settings.sound=true;saveState();window.audioStarts=0;const original=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(...args){window.audioStarts++;return original.apply(this,args)};}''',language)
  # Public task guard is retained; unlock by valid safety review evidence as legacy tests do.
  q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
  # Chapter gate currently opens 1.2 directly for registered learners.
  q.goto(BASE+'#lab/ch1/1.2/task-1');q.wait_for_selector('.ec-game')
  assert q.locator('.ec-stage-title h1').inner_text()==('Изучи оборудование' if language=='ru' else 'Jihozlarni o‘rgan')
  q.screenshot(path=str(OUT/(language+'-desktop.png')),full_page=True)
  assert q.locator('.ec-card').count()==6
  for n,id in enumerate(IDS):
   q.locator('[data-ec-open="'+id+'"]').click();q.wait_for_selector('[data-ec-answer]')
   if n==0:
    # One error + a paid hint lowers the rating; typed aliases accept spacing and case.
    wrong=q.locator('[data-ec-answer]').filter(has_not=q.locator('[does-not-exist]'))
    q.locator('[data-ec-answer]').evaluate_all('(bs)=>bs.find(b=>b.dataset.ecAnswer!=="test-tube").click()')
    q.locator('[data-ec=hint]').click();q.locator('[data-ec=write]').click();q.locator('[name=equipment-name]').fill('  ТЕРМОСТОЙКАЯ   ПРОБИРКА  ');q.locator('.ec-name-form button').click()
   else:q.locator('[data-ec-answer="'+id+'"]').click()
   q.wait_for_selector('.ec-schemes')
   if n==1:
    # Resume the same challenge after leaving and reloading.
    q.reload();q.wait_for_selector('.ec-schemes')
    q.locator('[data-ec=draw]').click();cv=q.locator('.ec-drawing canvas');r=cv.bounding_box();q.mouse.move(r['x']+20,r['y']+25);q.mouse.down();q.mouse.move(r['x']+90,r['y']+100,steps=8);q.mouse.up();q.locator('[data-ec=save-drawing]').click()
   else:q.locator('[data-ec-answer="'+id+'"]').click()
   q.wait_for_function('document.querySelector(".ec-game").dataset.screen==="challenge" && state.intro.lesson12.collection.step===2')
   q.locator('[data-ec-answer="'+id+'"]').click();q.wait_for_selector('.ec-received')
   assert q.evaluate('(id)=>state.intro.lesson12.collection.cards[id].done',id)
   q.locator('[data-ec=continue]').click()
  q.wait_for_selector('[data-ec=start-round]')
  assert q.evaluate('Object.keys(state.game.rewards).filter(k=>k.startsWith("lesson12:collection:")).length')==6
  assert q.evaluate('state.intro.lesson12.collection.cards["test-tube"].stars')==2
  assert q.evaluate('state.intro.lesson12.collection.cards.beaker.drawing.startsWith("data:image/png")')
  xp=q.evaluate('CourseGame.xp()')
  q.locator('[data-ec=start-round]').click();q.wait_for_selector('[data-ec-clock]')
  for i in range(4):
   id=q.evaluate('state.intro.lesson12.collection.round.id');q.locator('[data-ec-answer="'+id+'"]').click()
  q.reload();q.wait_for_selector('[data-ec=start-round]');assert q.evaluate('state.intro.lesson12.collection.round.score')==4;q.locator('[data-ec=start-round]').click()
  q.wait_for_selector('.ec-final',timeout=35000)
  assert q.evaluate('state.intro.lesson12.collection.best')==4
  q.locator('[data-ec=album]').click();assert q.locator('.ec-album-card').count()==6
  q.emulate_media(media='print');assert q.locator('.ec-album').bounding_box()['y']<40;q.pdf(path=str(OUT/(language+'-album.pdf')),format='A4');q.screenshot(path=str(OUT/(language+'-print.png')),full_page=True);q.emulate_media(media='screen')
  q.locator('[data-ec=collection]').click();q.locator('[data-ec-open=beaker]').click();q.wait_for_selector('.ec-received');q.locator('[data-ec=continue]').click()
  assert q.evaluate('CourseGame.xp()')==xp
  q.reload();q.wait_for_selector('.ec-game');assert q.evaluate('state.intro.lesson12.collection.best')==4
  for width,height in [(1366,768),(390,844),(320,740)]:
   q.set_viewport_size({'width':width,'height':height});
   if q.locator('[data-ec=collection]').count():q.locator('[data-ec=collection]').click()
   q.screenshot(path=str(OUT/(language+'-'+str(width)+'.png')),full_page=True)
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
   if width<900:
    assert q.locator('.ec-stage').bounding_box()['y']<q.locator('.ec-panel').bounding_box()['y']
    assert q.locator('.ec-cards').evaluate('(e)=>getComputedStyle(e).gridTemplateColumns.split(" ").length')==2
  # Sound starts only on gesture, and mute is shared and survives a reload.
  q.locator('[data-ec=sound]').click();assert not q.evaluate('state.settings.sound');q.reload();q.wait_for_selector('.ec-game');assert q.locator('[data-ec=sound]').get_attribute('aria-pressed')=='false'
  q.locator('[data-ec=quick]').click();q.locator('[data-ec=start-round]').click();before=q.evaluate('window.audioStarts');id=q.evaluate('state.intro.lesson12.collection.round.id');q.locator('[data-ec-answer="'+id+'"]').click();assert q.evaluate('window.audioStarts')==before
  q.locator('[data-ec=sound]').click();id=q.evaluate('state.intro.lesson12.collection.round.id');q.locator('[data-ec-answer="'+id+'"]').click();assert q.evaluate('window.audioStarts')>before
  assert not errors,errors
  print('PASS',language,'six cards / errors / hints / typed aliases / drawings / resume / 30s round / one-time XP / print / desktop and phone / mute / no console errors',flush=True)
  c.close()
 b.close()
