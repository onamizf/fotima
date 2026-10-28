"""Hit testing and guided museum in four locales, with real mouse/touch input."""
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
import re
BASE='http://127.0.0.1:8045/'
FIXTURE="""()=>{for(const id of SafetySituations.ids){const r=IntroModel.row(id),d=IntroData.dangers.find(x=>x.id===id);r.answers={danger:d.correctDanger,precaution:d.correctAction};IntroModel.check(id)}const r=IntroModel.row('signs');IntroData.signs.forEach(s=>r.matches[s.id]=s.id);IntroModel.check('signs');IntroModel.openTask('museum');render(false)}"""
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  for phone in [False,True]:
   c=b.new_context(viewport={'width':390 if phone else 1440,'height':844 if phone else 1000},has_touch=phone,is_mobile=phone,reduced_motion='reduce' if phone else 'no-preference');q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Hit'+lang.replace('-','')+str(phone));q.evaluate('(lang)=>{state.settings.language=lang;saveState()}',lang);q.goto(BASE+'#topic/intro');q.locator('.intro-road [data-intro-step="0"]').click();q.wait_for_selector('.sp-loader',state='hidden');assert q.locator('.intro-brief').count()==0
   def press(el):el.tap() if phone else el.click()
   press(q.locator('[data-cinema=start]'));expect(q.locator('.cinema-start')).to_have_count(0);press(q.locator('.cinema-tap-layer'));expect(q.locator('.cinema-shell')).to_have_class(re.compile('is-paused'));q.wait_for_timeout(350);press(q.locator('.cinema-tap-layer'));expect(q.locator('.cinema-shell')).not_to_have_class(re.compile('is-paused'))
   q.evaluate(FIXTURE);q.wait_for_function('window.introSceneInfo?.ready && introSceneInfo.task==="museum"');press(q.locator('[data-cinema=start]'));assert q.locator('.cinema-shell').locator('[data-museum-mode],select:visible,.intro-brief').count()==0
   locked=q.locator('.cinema-stories button').first.bounding_box();q.touchscreen.tap(locked['x']+locked['width']/2,locked['y']+locked['height']/2) if phone else q.mouse.click(locked['x']+locked['width']/2,locked['y']+locked['height']/2);assert q.locator('.cinema-line').inner_text()==q.evaluate('IntroPresentation.text(state.settings.language).locked')
   for id in q.evaluate('IntroModel.mainEquipment'):
    target=q.locator('[data-museum-pick="'+id+'"]');before=target.bounding_box()
    if not phone:target.hover()
    after=target.bounding_box();assert abs(before['x']-after['x'])<1 and abs(before['y']-after['y'])<1
    assert target.evaluate('(e)=>{const r=e.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)===e}')
    press(target);assert q.evaluate('IntroModel.sim().museumFocus');press(q.locator('[data-museum-return]'))
   for _ in range(6):
    id=q.evaluate('IntroModel.sim().museumRounds.find(id=>IntroModel.row().answers[id]!==id)');press(q.locator('[data-museum-pick="'+id+'"]'))
   source=q.locator('[data-intro-source="neck"]');target=q.locator('[data-intro-drop="neck"]')
   if phone:
    a=source.bounding_box();z=target.bounding_box();cdp=c.new_cdp_session(q);x=a['x']+a['width']/2;y=a['y']+a['height']/2;tx=z['x']+z['width']/2;ty=z['y']+z['height']/2
    cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
    for step in range(1,7):cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+(tx-x)*step/6,'y':y+(ty-y)*step/6}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});cdp.detach()
   else:source.drag_to(target)
   assert q.evaluate('IntroModel.row().matches.neck==="neck"')
   press(q.locator('[data-intro-source="body"]'));press(q.locator('[data-intro-drop="bottom"]'));assert not q.evaluate('IntroModel.row().matches.body')
   for id in ['body','bottom']:press(q.locator('[data-intro-source="'+id+'"]'));press(q.locator('[data-intro-drop="'+id+'"]'))
   assert q.evaluate('IntroModel.done("museum")'),q.evaluate('IntroModel.row()');assert not q.locator('#earnedDialog[open]').count();assert not errors,errors
   print('PASS',lang,'touch' if phone else 'mouse',flush=True);c.close()
 b.close()
