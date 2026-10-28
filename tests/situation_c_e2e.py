"""Actual C images, ordered interaction, locale letters and legacy-save migration."""
import os,json
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1440,'height':1000},has_touch=True);q=ctx.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.clock.install()
 register_local(q,BASE,'C Learner');q.goto(BASE+'#topic/intro');q.locator('.intro-road [data-intro-step="0"]').click();q.locator('[data-intro-begin]').click();q.wait_for_selector('.sp-loader',state='hidden')
 for spots,answers in [(['hotspot'],[0,1]),(['goggles','tube'],[0,1,2,3])]:
  q.locator('[data-sp=skip]').click()
  for spot in spots:q.locator('[data-hotspot="'+spot+'"]').click()
  q.locator('[data-risk="0"]').click()
  for answer in answers:q.locator('[data-safe-action="'+str(answer)+'"]').check()
  q.locator('[data-sp=check]').click();q.locator('[data-sp=next]').click();q.wait_for_selector('.sp-loader',state='hidden')
 assert q.evaluate('IntroModel.data().task')=='danger-c';assert q.locator('.sp-heading nav span').all_text_contents()==['✓ A','✓ B','C','D'];assert q.locator('.sp-camera>img').evaluate_all('(items)=>items.every(i=>i.naturalWidth===1376)')
 q.clock.run_for(3200);assert q.locator('.sp-scene').get_attribute('data-stage')=='1';q.clock.run_for(3100);assert q.locator('.sp-scene').get_attribute('data-stage')=='2';assert q.locator('.sp-scene').evaluate('(e)=>e.getAnimations().some(a=>a.effect.getKeyframes().some(k=>k.filter)&&a.effect.getTiming().duration===1000)');q.locator('.sp-scene').evaluate('(e)=>e.getAnimations().filter(a=>a.effect.getKeyframes().some(k=>k.filter)).forEach(a=>a.finish())');q.clock.run_for(1200);assert q.locator('.sp-scene').evaluate('(e)=>getComputedStyle(e).filter') in ['none','blur(0px)'];q.clock.run_for(3000);assert q.locator('.sp-scene').get_attribute('data-stage')=='3'
 q.locator('[data-hotspot=vapour]').click();q.locator('[data-risk="1"]').click();assert not q.evaluate("IntroModel.done('danger-c')");q.locator('[data-risk="0"]').click();assert q.locator('[data-order-item]').count()==4
 for i in [0,1]:q.locator('[data-safe-action="'+str(i)+'"]').check()
 q.locator('[data-sp=check]').click();assert not q.evaluate("IntroModel.done('danger-c')")
 # Native HTML drag ordering.
 for desired in range(4):
  current=q.locator('[data-order-item]').evaluate_all('(items)=>items.map(e=>Number(e.dataset.orderItem))')
  if current.index(desired)!=desired:q.locator('[data-order-item="'+str(desired)+'"]').drag_to(q.locator('[data-order-item]').nth(desired))
 assert q.locator('[data-order-item]').evaluate_all('(items)=>items.map(e=>Number(e.dataset.orderItem))')==[0,1,2,3]
 # Keyboard alternatives preserve the current camera stage.
 q.locator('[data-order-item="0"]').focus();q.keyboard.press('ArrowDown');q.keyboard.press('ArrowUp');assert q.locator('.sp-scene').get_attribute('data-stage')=='3'
 q.locator('[data-safe-action="1"]').uncheck();q.locator('[data-safe-action="2"]').check();q.locator('[data-sp=check]').click();assert not q.evaluate("IntroModel.done('danger-c')");q.locator('[data-safe-action="2"]').uncheck();q.locator('[data-safe-action="1"]').check()
 # Touch dragging also reorders, then accessible arrows restore the order.
 q.set_viewport_size({'width':390,'height':844});q.clock.run_for(600);grip=q.locator('[data-order-item="1"] [data-order-grip]');grip.scroll_into_view_if_needed();q.clock.run_for(300);a=grip.bounding_box();target=q.locator('[data-order-item="0"]').bounding_box();cdp=ctx.new_cdp_session(q)
 cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':a['x']+a['width']/2,'y':a['y']+a['height']/2}]});cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':target['x']+target['width']/2,'y':target['y']+target['height']/2}]});cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
 assert q.locator('[data-order-item]').first.get_attribute('data-order-item')=='1';q.locator('[data-order-id="1"][data-order-move="1"]').click();before=q.evaluate('CourseGame.xp()');q.locator('[data-sp=check]').click();assert q.evaluate("IntroModel.done('danger-c')");assert q.evaluate('CourseGame.xp()')>=before+20;after=q.evaluate('CourseGame.xp()')
 q.reload();q.wait_for_selector('.sp-loader',state='hidden');assert q.locator('.sp-scene').get_attribute('data-stage')=='4';assert q.locator('.sp-explanation section').count()==5;assert q.evaluate('CourseGame.xp()')==after;assert q.evaluate('document.documentElement.scrollWidth<=innerWidth')
 # Visible letters, headings, previous and next come from each translation.
 for lang,letters,next_letter in [('ru',['A','B','C','D'],'D'),('en',['A','B','C','D'],'D'),('uz-Latn',['A','B','D','E'],'E'),('uz-Cyrl',['A','B','D','E'],'E')]:
  q.evaluate('(lang)=>{state.settings.language=lang;render(false)}',lang);q.wait_for_selector('.sp-loader',state='hidden');assert [x.replace('✓ ','') for x in q.locator('.sp-heading nav span').all_text_contents()]==letters;assert letters[2] in q.locator('.sp-heading p').inner_text();assert next_letter in q.locator('[data-sp=next]').inner_text();assert 'undefined' not in q.locator('.scene-player').inner_text()
 q.locator('[data-sp=next]').click();assert q.evaluate('IntroModel.data().task')=='danger-d';assert 'E' in q.locator('.sp-heading [aria-current=step]').inner_text()
 # Exercise the real save loader: overlapping old D/E rows and reward IDs migrate atomically.
 result=q.evaluate('''()=>{const old=JSON.parse(JSON.stringify(state)),today=CourseGame.day();old.intro={version:1,active:'task',work:'safety',task:'danger-d',rows:{}};const pairs={'danger-a':[0,1],'danger-b':[1,2],'danger-d':[2,0],'danger-e':[0,1]};for(const [id,[danger,precaution]] of Object.entries(pairs))old.intro.rows[id]={answers:{danger,precaution},matches:{},evidence:{},visited:[],order:[],checked:true,sim:{},proof:{answers:{danger,precaution},evidence:{},matches:{},visited:[],order:[]}};old.game.rewards=Object.fromEntries(Object.keys(pairs).map(id=>['exp:intro-'+id,today]));old.game.daily={[today]:'intro-danger-e'};const input=JSON.stringify(old);state=readState(old);const migrated=JSON.stringify(state),again=readState(JSON.parse(migrated));const stable=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);const same=stable(again.intro)===stable(state.intro)&&stable(again.game)===stable(state.game);saveState();render(false);return {version:state.intro.version,task:state.intro.task,rewards:Object.keys(state.game.rewards).filter(k=>k.startsWith('exp:intro-danger-')).sort(),daily:state.game.daily[today],same,unchanged:input===JSON.stringify(old),c:IntroModel.done('danger-c'),d:IntroModel.done('danger-d')};}''')
 assert result=={'version':2,'task':'danger-c','rewards':['exp:intro-danger-a','exp:intro-danger-b','exp:intro-danger-c','exp:intro-danger-d'],'daily':'intro-danger-d','same':True,'unchanged':True,'c':True,'d':True},result
 q.wait_for_selector('.sp-loader',state='hidden');assert q.locator('.sp-explanation').is_visible();old_xp=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('.sp-loader',state='hidden');assert q.evaluate('CourseGame.xp()')==old_xp
 q.goto(BASE+'?debug=1#topic/intro');q.wait_for_selector('.sp-loader',state='hidden');assert q.locator('.sp-debug-zone').count()==3;q.emulate_media(reduced_motion='reduce');q.locator('[data-stage="2"]').click();q.clock.run_for(600);assert q.locator('.sp-camera').evaluate('(e)=>e.style.transform')=='scale(1)';assert q.locator('.sp-scene').evaluate('(e)=>getComputedStyle(e).filter') in ['none','blur(0px)']
 assert not errors,errors;b.close();print('PASS: C actual images, effects, native drag/touch/keyboard order, forbidden actions, F5, four locale alphabets, D/E migration through real loader, XP unchanged and debug/reduced motion')
