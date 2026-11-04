"""Stamp fires at each scenario's actual accident, never at intro/safe/review steps."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
from pathlib import Path
OUT=Path('/workspace/work/stamp139');OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='no-preference')
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 c.add_init_script('''(()=>{window.effectAudio={starts:0,vibrations:[]};const Native=window.AudioContext;if(Native)window.AudioContext=class extends Native{createOscillator(){const o=super.createOscillator(),start=o.start.bind(o);o.start=(...a)=>{effectAudio.starts++;start(...a)};return o;}};Object.defineProperty(navigator,'vibrate',{configurable:true,value:p=>{effectAudio.vibrations.push(p);return true;}})})();''')
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Accident timing');q.evaluate('state.settings.sound=true;state.settings.reduceMotion=false;saveState()')
 q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_function('SafetyWorkspace.debug.player.stage===0')
 events=[(0,1,'splash'),(1,2,'tube-splash'),(2,1,'inhale'),(3,2,'steam-burst')]
 for index,impact,effect in events:
  q.locator('.safety-scene-nav [data-sw-scene="'+str(index)+'"]').click();q.wait_for_function('(i)=>SafetyWorkspace.debug.current===i&&SafetyWorkspace.debug.player?.stage===0',arg=index)
  assert q.locator('.safety-stamp-layer').is_hidden()
  for stage in range(1,5):
   before=q.evaluate('effectAudio.starts');q.locator('[data-sp=advance-line]').click();q.wait_for_timeout(280)
   assert q.locator('.safety-stamp-layer').is_visible()==(stage==impact),(index,stage)
   if stage==impact:
    assert q.evaluate('effectAudio.starts')>=before+3
    assert q.locator('.safety-stamp-svg text').text_content()=='ОПАСНО!'
    assert q.locator('.safety-stamp-splashes i').count()==20
    q.screenshot(path=str(OUT/f'event-{index}.png'))
  for card in range(3):
   q.locator('[data-sp=advance-line]').click();q.wait_for_timeout(240);assert q.locator('.safety-stamp-layer').is_hidden(),(index,card)
  # Back through review and scene: replay exactly when the accident is re-entered.
  while q.evaluate('SafetyWorkspace.debug.player.explanationIndex')>=0:q.locator('[data-sp=back-line]').click()
  for stage in range(3,-1,-1):
   q.locator('[data-sp=back-line]').click();q.wait_for_timeout(240)
   assert q.locator('.safety-stamp-layer').is_visible()==(stage==impact),(index,'back',stage)
 # Mute persists, with no synthesized stamp tones at the actual accident.
 q.locator('[data-sw=sound]').click();q.locator('[data-sp=advance-line]').click();before=q.evaluate('effectAudio.starts');q.locator('[data-sp=advance-line]').click();q.wait_for_timeout(500);assert q.evaluate('effectAudio.starts')==before
 q.wait_for_selector('.safety-stamp-layer[data-phase=compact]');q.wait_for_timeout(450);assert round(q.locator('.safety-stamp-position').bounding_box()['width'])==90
 q.reload();q.wait_for_function('SafetyWorkspace.debug.player.stage===0');assert not q.evaluate('state.settings.sound');assert q.locator('.safety-stamp-layer').is_hidden()
 q.set_viewport_size({'width':390,'height':844});q.emulate_media(reduced_motion='reduce');before=q.evaluate('effectAudio.vibrations.length');q.locator('[data-sp=advance-line]').click();q.wait_for_selector('.safety-stamp-layer:not([hidden])');assert q.locator('.safety-stamp-layer').get_attribute('data-reduced')=='true';q.wait_for_timeout(350);assert q.evaluate('effectAudio.vibrations.length')==before
 q.screenshot(path=str(OUT/'mobile-event.png'));q.wait_for_selector('.safety-stamp-layer[data-phase=compact]')
 for language,label in [('en','DANGER!'),('uz-Latn','XAVFLI!'),('uz-Cyrl','ХАВФЛИ!')]:
  q.evaluate('(l)=>{state.settings.language=l;saveState()}',language);q.reload();q.wait_for_function('SafetyWorkspace.debug.player.stage===0');assert q.locator('.safety-stamp-layer').is_hidden();q.locator('[data-sp=advance-line]').click();q.wait_for_selector('.safety-stamp-layer:not([hidden])');assert q.locator('.safety-stamp-svg text').text_content()==label
 # Shared legacy player follows the same scenario metadata without a workspace-specific switch.
 q.evaluate("""()=>{window.legacyHost=document.createElement('div');legacyHost.style.cssText='position:fixed;inset:0;z-index:9000';legacyHost.className='intro-root is-cinema';document.body.append(legacyHost);window.legacyPlayer=ScenePlayer.mount(legacyHost,SituationB,{language:'en',reduced:true,sound:false});}""")
 q.wait_for_selector('body>.intro-root .safety-stamp-layer',state='attached');q.wait_for_function('legacyHost.querySelector(".sp-scene").dataset.stage==="0"');assert q.locator('body>.intro-root .safety-stamp-layer').is_hidden();q.evaluate('legacyPlayer.step(1)');assert q.locator('body>.intro-root .safety-stamp-layer').is_hidden();q.evaluate('legacyPlayer.step(1)');q.wait_for_selector('body>.intro-root .safety-stamp-layer:not([hidden])');q.evaluate('legacyPlayer.dispose();legacyHost.remove()')
 assert not errors,errors
 print('PASS exact A/B/C/D accident timing, no intro/consequence/safe/review stamps, replay on back, audio/mute, compact badge, reduced motion/mobile, translations and legacy player; no console errors')
 b.close()
