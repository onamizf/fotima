"""Danger stamp lifecycle, audio, reduced motion, translations and scene-only layout."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
from pathlib import Path
OUT=Path('/workspace/work/stamp138');OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='no-preference')
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 c.add_init_script('''(()=>{window.effectAudio={contexts:0,starts:0,stops:0,vibrations:[]};const Native=window.AudioContext;if(Native){window.AudioContext=class extends Native{constructor(...args){super(...args);window.effectAudio.contexts++;}createOscillator(){const o=super.createOscillator(),start=o.start.bind(o),stop=o.stop.bind(o);o.start=(...a)=>{window.effectAudio.starts++;start(...a)};o.stop=(...a)=>{window.effectAudio.stops++;stop(...a)};return o;}};}Object.defineProperty(navigator,'vibrate',{configurable:true,value:p=>{window.effectAudio.vibrations.push(p);return true;}})})();''')
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Stamp test');q.evaluate('state.settings.sound=true;state.settings.reduceMotion=false;saveState()')
 q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_selector('.safety-stamp-layer:not([hidden])');q.wait_for_function('SafetyWorkspace.debug.player.stage===0')
 q.locator('[data-sw=restart]').click();q.wait_for_timeout(300)
 assert q.locator('.safety-stamp-svg text').text_content()=='ОПАСНО!'
 assert q.locator('.safety-stamp-splashes i').count()==20
 assert q.locator('.safety-stamp-layer').evaluate('(e)=>getComputedStyle(e).pointerEvents')=='none'
 assert q.locator('.safety-stamp-svg mask').count()==1
 q.screenshot(path=str(OUT/'stamp-desktop.png'))
 assert q.evaluate('effectAudio.starts')>=3
 assert q.evaluate('effectAudio.vibrations.some(x=>JSON.stringify(x)==="[120,60,120]")')
 q.wait_for_selector('.safety-stamp-layer[data-phase=compact]');q.wait_for_timeout(450)
 assert round(q.locator('.safety-stamp-position').bounding_box()['width'])==90
 q.locator('[data-sp=advance-line]').click();q.wait_for_timeout(250);assert q.locator('.safety-stamp-layer').is_visible()
 q.locator('[data-sp=back-line]').click();q.wait_for_selector('.safety-stamp-layer[data-phase=large]')
 for index in range(1,4):
  q.locator('.safety-scene-nav [data-sw-scene="'+str(index)+'"]').click()
  q.wait_for_function('(i)=>SafetyWorkspace.debug.current===i&&SafetyWorkspace.debug.player?.stage===0',arg=index)
  q.wait_for_selector('.safety-stamp-layer[data-phase=large]:not([hidden])')
  for step in range(4):q.locator('[data-sp=advance-line]').click()
  q.wait_for_timeout(250);assert q.locator('.safety-stamp-layer').is_hidden()
  for step in range(4):q.locator('[data-sp=back-line]').click()
  q.wait_for_selector('.safety-stamp-layer[data-phase=large]:not([hidden])')
 # Every visible What happened frame and the first explanation card retain/replay the stamp.
 for step in range(7):
  info=q.evaluate('({stage:SafetyWorkspace.debug.player.stage,card:SafetyWorkspace.debug.player.explanationIndex})')
  danger=info['card']==0 or info['card']<0 and info['stage']<4
  q.wait_for_timeout(250)
  assert q.locator('.safety-stamp-layer').is_visible()==danger,info
  if info['card']==0:assert q.locator('.sp-scene').get_attribute('data-presentation-frame')=='2'
  q.locator('[data-sp=advance-line]').click()
 q.wait_for_timeout(250);assert q.locator('.safety-stamp-layer').is_hidden()
 q.locator('[data-sp=back-line]').click();q.locator('[data-sp=back-line]').click();q.wait_for_selector('.safety-stamp-layer[data-phase=large]:not([hidden])')
 # An explicit selection of the current situation replays its first danger step.
 q.locator('.safety-scene-nav [data-sw-scene="3"]').click();q.wait_for_selector('.safety-stamp-layer[data-phase=large]')
 q.locator('[data-sw=sound]').click();q.locator('[data-sw=restart]').click();before=q.evaluate('effectAudio.starts');q.wait_for_timeout(700);assert q.evaluate('effectAudio.starts')==before
 assert not q.evaluate('state.settings.sound');q.reload();q.wait_for_selector('.safety-stamp-layer:not([hidden])');assert not q.evaluate('state.settings.sound')
 # Shared stamp AudioContext survives A–D remounts (other scene effects use their own engine).
 q.locator('[data-sw=sound]').click();q.locator('[data-sw=restart]').click();q.wait_for_timeout(300);contexts=q.evaluate('effectAudio.contexts');starts=q.evaluate('effectAudio.starts')
 q.locator('.safety-scene-nav [data-sw-scene="1"]').click();q.wait_for_function('SafetyWorkspace.debug.current===1&&SafetyWorkspace.debug.player?.stage===0');q.wait_for_timeout(300)
 assert q.evaluate('effectAudio.contexts')==contexts
 assert q.evaluate('effectAudio.starts')>=starts+3
 q.set_viewport_size({'width':390,'height':844});q.emulate_media(reduced_motion='reduce');q.locator('[data-sw=restart]').click();q.wait_for_selector('.safety-stamp-layer[data-reduced=true]')
 before=q.evaluate('effectAudio.vibrations.length');q.locator('[data-sw=restart]').click();q.wait_for_timeout(400);assert q.evaluate('effectAudio.vibrations.length')==before
 assert q.locator('.safety-stamp-vignette').evaluate('(e)=>getComputedStyle(e).opacity')=='0'
 rect=q.locator('.safety-stamp-position').bounding_box();scene=q.locator('.pw-canvas').bounding_box();assert rect['width']<=scene['width'];q.screenshot(path=str(OUT/'stamp-mobile.png'))
 q.wait_for_selector('.safety-stamp-layer[data-phase=compact]')
 for language,label in [('en','DANGER!'),('uz-Latn','XAVFLI!'),('uz-Cyrl','ХАВФЛИ!')]:
  q.evaluate('(l)=>{state.settings.language=l;saveState()}',language);q.reload();q.wait_for_selector('.safety-stamp-svg text',state='attached');assert q.locator('.safety-stamp-svg text').text_content()==label
 q.evaluate("""()=>{window.legacyHost=document.createElement('div');legacyHost.style.cssText='position:fixed;inset:0;z-index:9000';legacyHost.className='intro-root is-cinema';document.body.append(legacyHost);window.legacyPlayer=ScenePlayer.mount(legacyHost,SituationA,{language:'en',reduced:true,sound:false});}""")
 q.wait_for_selector('body>.intro-root .safety-stamp-layer:not([hidden])');assert q.locator('body>.intro-root .safety-stamp-svg text').text_content()=='DANGER!'
 q.evaluate('legacyPlayer.dispose();legacyHost.remove()')
 assert not errors,errors
 print('PASS danger A–D, back/forward/reselection/restart, safe-step hide, stamp/dots/mask, compact badge, audio and mute persistence, shared audio, vibration API, reduced motion/mobile and translations; no console errors')
 b.close()
