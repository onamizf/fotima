"""Profile summaries, navigation, locale layouts, durable badges and explicit sensor consent."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/profile14112');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},has_touch=True)
 for host in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+host+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];warnings=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else warnings.append(m.text) if m.type=='warning' else None)
 register_local(q,BASE,'Profile Learner')
 q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');xp=q.evaluate('CourseGame.xp()')
 assert q.locator('.pf-stat').count()==6 and q.locator('.pf-badge').count()==8 and q.locator('.pf-day').count()==35
 assert q.evaluate('ProfileModel.snapshot().stats.accuracy') is None
 assert q.evaluate('ProfileModel.snapshot().stats.tasks')==0
 # No navigation or profile view grants rewards.
 q.reload();q.wait_for_selector('.pf-stat');assert q.evaluate('CourseGame.xp()')==xp
 assert q.evaluate('Object.keys(ProfileModel.data().achievements).length')==0
 # Native edit validation; changing language preserves course state.
 q.locator('[data-profile-edit]').first.click();q.locator('.pf-edit [name=handle]').fill('bad handle!');q.locator('.pf-edit [type=submit]').click();assert q.locator('.pf-form-error').inner_text()
 q.locator('.pf-edit [name=handle]').fill('chemist_2026');q.locator('.pf-edit [name=displayName]').fill('Profile Chemist');q.locator('.pf-edit [name=language]').select_option('en');q.locator('.pf-edit [type=submit]').click();q.wait_for_selector('.pf-stat');assert q.evaluate('document.documentElement.lang')=='en';assert q.evaluate('CourseGame.xp()')==xp
 assert q.locator('.pf-handle').inner_text()=='@chemist_2026'
 # A saved real outfit earns its badge; unknown layers are never requested.
 q.goto(BASE+'#safety-wardrobe');q.wait_for_selector('[data-sw=play]');q.locator('[data-sw=play]').click();q.locator('[data-sw-item]').first.click();q.locator('[data-sw=save-look]').click();q.wait_for_selector('.pf-achievement-toast');assert q.evaluate('ProfileModel.data().outfit.length')>0
 assert q.evaluate('ProfileModel.data().achievements["lab-fashion"].seen') is False
 q.locator('.pf-achievement-toast>button').click();q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');assert q.locator('.pf-complete').count()==0
 badge=q.locator('[data-profile-badge=lab-fashion]');badge.scroll_into_view_if_needed();badge.focus();q.keyboard.press('Enter');assert badge.get_attribute('aria-expanded')=='true';assert q.evaluate('ProfileModel.data().achievements["lab-fashion"].seen') is True
 q.keyboard.press('Space');assert badge.get_attribute('aria-expanded')=='false';q.reload();q.wait_for_selector('.pf-stat');assert q.locator('[data-profile-badge=lab-fashion] .pf-new').count()==0
 # Test fixtures use the same valid completion proof accepted by task storage.
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:1,stages:[0,1,2,3,4],explanations:[0,1,2]};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}state.intro.lesson12.collection={version:2,complete:true};saveState();}''')
 q.wait_for_selector('.pf-achievement-toast');assert q.evaluate('!!ProfileModel.data().achievements["safety"] && !!ProfileModel.data().achievements["equipment-expert"]')
 q.evaluate('document.querySelectorAll(".pf-achievement-toast").forEach(e=>e.remove())')
 # Date/accuracy summaries and zero-error badge never fabricate task attempts.
 q.evaluate('''()=>{ProfileModel.record('#lab/ch1/1.2/task-2',0);saveState();}''');assert q.evaluate('ProfileModel.snapshot().stats.accuracy')==100
 q.evaluate('''()=>{ProfileModel.record('#lab/ch1/1.2/task-3',2);saveState();}''');assert q.evaluate('ProfileModel.snapshot().stats.accuracy')==50
 assert q.evaluate('ProfileModel.activity().reduce((n,d)=>n+d.xp,0)')==q.evaluate('Object.keys(state.game.rewards).reduce((n,k)=>n+CourseGame.rewardValue(k),0)')
 # All viewports and locales: no horizontal overflow, correct rail and live language.
 for width,height in [(360,800),(390,844),(768,1024),(1366,768),(1920,1080)]:
  q.set_viewport_size({'width':width,'height':height})
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   q.evaluate('(l)=>{state.settings.language=l;saveState();render(false)}',lang);q.wait_for_selector('.pf-stat');q.wait_for_timeout(100)
   assert q.evaluate('document.documentElement.lang')==lang
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(width,lang,'overflow')
   for el in q.locator('.pf-reveal').all():el.scroll_into_view_if_needed();q.wait_for_timeout(100)
   assert q.locator('.pf-stat img').evaluate_all('es=>es.every(e=>e.complete&&e.naturalWidth>0)')
   if width>=768:
    assert q.locator('#navigationToggle').is_hidden();assert q.locator('#profileMenu[open]').is_visible()
    if width==768:assert q.locator('#profileMenu').bounding_box()['width']==76
   else:
    assert q.locator('#navigationToggle').is_visible();q.locator('#navigationToggle').focus();q.keyboard.press('Enter');q.wait_for_selector('#profileMenu[open]')
    for i in range(12):q.keyboard.press('Tab');assert q.evaluate('!!document.activeElement.closest("#profileMenu")')
    q.keyboard.press('Escape');q.wait_for_selector('#profileMenu[open]',state='detached');assert q.locator('#navigationToggle').evaluate('e=>e===document.activeElement')
  q.screenshot(path=str(OUT/f'profile-{width}.png'),full_page=True)
 print('PASS 20 profile layouts / all four locales / keyboard menu / outfit / durable badges / statistics',flush=True)
 # Navigation on every native workspace: compact rail reserves its own space;
 # desktop expansion overlays and does not move the task.
 for width,height in [(360,800),(768,1024),(1366,768),(1920,1080)]:
  q.set_viewport_size({'width':width,'height':height})
  for route,selector in [('#home','.student-dashboard'),('#lab/ch1/1.1/task-1','.pw-editor'),('#lab/ch1/1.2/task-1','.es-study'),('#lab/ch1/1.2/task-2','.wb-page'),('#lab/ch1/1.2/task-3','.wb-page')]:
   q.goto(BASE+route);q.wait_for_selector(selector)
   if width>=768:
    assert q.locator('#navigationToggle').is_hidden(),(width,route)
    if route!='#home':
     assert q.locator(selector).bounding_box()['x']==76,(width,route,q.locator(selector).bounding_box())
     if width>=1024:
      old=q.locator(selector).bounding_box();q.locator('[data-profile-compact]').click();q.wait_for_function('document.querySelector("#profileMenu").getBoundingClientRect().width===264');assert q.locator('#profileMenu').bounding_box()['width']==264
      assert q.locator(selector).bounding_box()==old,(width,route,'scene moved')
      q.locator('[data-profile-compact]').click();q.wait_for_function('document.querySelector("#profileMenu").getBoundingClientRect().width===76')
   else:
    q.locator('#navigationToggle').tap();q.wait_for_selector('#profileMenu[open]');q.mouse.click(width-3,5);q.wait_for_selector('#profileMenu[open]',state='detached')
 print('PASS responsive navigation on home and all four task routes',flush=True)
 # Reduced motion: details switch without 3D; final values remain readable.
 q.emulate_media(reduced_motion='reduce');q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');badge=q.locator('[data-profile-badge=first-step]');badge.scroll_into_view_if_needed();badge.click();assert badge.locator('.pf-badge-inner').evaluate('e=>getComputedStyle(e).transform') in ['none','matrix(1, 0, 0, 1, 0, 0)']
 # Sensors never request permission until the explicit click. Denial keeps auto sway.
 q.emulate_media(reduced_motion='no-preference');q.set_viewport_size({'width':390,'height':844});q.add_init_script('window.sensorRequests=0;DeviceOrientationEvent.requestPermission=async()=>{window.sensorRequests++;return "denied"}')
 q.reload();q.wait_for_selector('.pf-stat');assert q.evaluate('sensorRequests')==0;q.locator('[data-profile-sensor]').tap();assert q.evaluate('sensorRequests')==1;assert q.locator('.pf-sensor-status').inner_text()
 q.evaluate('DeviceOrientationEvent.requestPermission=async()=>"granted"');q.locator('[data-profile-sensor]').tap();q.evaluate('window.dispatchEvent(new DeviceOrientationEvent("deviceorientation",{beta:45,gamma:10}))');assert q.locator('.pf-banner').evaluate('e=>e.style.getPropertyValue("--px")')=='0.4'
 q.goto(BASE+'#home');q.evaluate('window.dispatchEvent(new DeviceOrientationEvent("deviceorientation",{beta:45,gamma:10}))')
 # Actual pointer transforms and counters, then a second account must be clean.
 q.set_viewport_size({'width':1366,'height':768});q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');q.wait_for_timeout(850)
 banner=q.locator('.pf-banner').bounding_box();q.mouse.move(banner['x']+banner['width']*.8,banner['y']+banner['height']*.7);q.wait_for_timeout(80);assert float(q.locator('.pf-banner').evaluate('e=>e.style.getPropertyValue("--px")'))>0
 card=q.locator('[data-profile-tilt]').first;card.scroll_into_view_if_needed();r=card.bounding_box();q.mouse.move(r['x']+r['width']*.75,r['y']+r['height']*.3);assert card.evaluate('e=>parseFloat(e.style.getPropertyValue("--ry"))')>0
 assert q.locator('[data-profile-count]').nth(1).inner_text()==str(q.evaluate('CourseGame.xp()'))
 q.set_viewport_size({'width':390,'height':844});q.locator('#navigationToggle').tap();q.wait_for_selector('#profileMenu[open]');q.locator('#profileMenu').dispatch_event('pointerdown',{'pointerType':'touch','clientX':240,'clientY':200});q.locator('#profileMenu').dispatch_event('pointerup',{'pointerType':'touch','clientX':40,'clientY':210});q.wait_for_selector('#profileMenu[open]',state='detached')
 q.evaluate('LocalAuth.signOut()');register_local(q,BASE,'Second Profile');q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');assert q.evaluate('ProfileModel.data().outfit.length')==0;assert q.evaluate('Object.keys(ProfileModel.data().achievements).length')==0;assert q.locator('.pf-handle').inner_text()=='@Second_Profile'
 print('PASS pointer tilt and parallax / count-up / swipe dismissal / isolated second account',flush=True)
 assert not errors,errors
 assert not [w for w in warnings if '[i18n]'in w],warnings
 print('PASS reduced motion / explicit sensor consent / denial and orientation / no JS or i18n errors',flush=True)
 b.close()
