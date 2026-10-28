import sys

from browser_auth import register_local
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']);q=b.new_page(viewport={'width':390,'height':844});errs=[];q.on('pageerror',lambda e:errs.append(str(e)));register_local(q,'http://127.0.0.1:8045/','GL Check');q.goto('http://127.0.0.1:8045/#topic/intro');q.evaluate("""()=>{for(const id of SafetySituations.ids){const r=IntroModel.row(id),d=IntroData.dangers.find(x=>x.id===id);r.answers={danger:d.correctDanger,precaution:d.correctAction};IntroModel.check(id)}const r=IntroModel.row('signs');IntroData.signs.forEach(s=>r.matches[s.id]=s.id);IntroModel.check('signs');IntroModel.openTask('museum');render(false)}""");q.wait_for_function('window.introSceneInfo?.ready');q.locator('[data-cinema=start]').click();assert q.evaluate('introSceneInfo.renderer')=='webgl';assert q.locator('[data-museum-pick]').count()==6
 for box in q.locator('[data-museum-pick]').evaluate_all('(els)=>els.map(e=>e.getBoundingClientRect().toJSON())'):assert box['left']>=0 and box['right']<=390
 q.locator('[data-museum-pick=tube]').click();assert q.evaluate('IntroModel.sim().museumFocus');q.wait_for_timeout(600);assert not errs,errs;print('PASS: WebGL museum, all six targets inside the phone viewport, object selection and animation');b.close()
