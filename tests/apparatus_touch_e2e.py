"""Real Chromium touch events on the slider, study cards, assembly and label chips."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,reduced_motion='reduce')
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Touch learner')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 q.goto(BASE+'#lab/ch1/1.2/task-3');q.wait_for_selector('.wb-atlas')
 slider=q.locator('[data-wb-scrub]');slider.scroll_into_view_if_needed();r=slider.bounding_box();cdp=c.new_cdp_session(q)
 x0=r['x']+10;y=r['y']+r['height']/2;x1=r['x']+r['width']*.6
 cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x0,'y':y}]})
 for i in range(1,6):cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x0+(x1-x0)*i/5,'y':y}]})
 cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});q.wait_for_timeout(150)
 assert 0<float(slider.input_value())<100,slider.input_value()
 for id in ['tripod','gas-burner','wire-gauze','beaker','evaporating-dish']:
  q.locator('[data-wb-card="'+id+'"]').tap();q.locator('[data-wb=close]').tap()
 q.locator('[data-wb=build]').first.tap();q.wait_for_selector('[data-ag-part=tripod]')
 for id in ['tripod','gas-burner','wire-gauze','beaker','evaporating-dish']:
  q.locator('[data-ag-part="'+id+'"]').tap();q.locator('[data-ag-target]').tap()
 q.locator('[data-wb=labels]').first.tap()
 for letter,id in [('a','beaker'),('b','tripod'),('c','evaporating-dish'),('d','gas-burner')]:
  q.locator('[data-al-field="'+letter+'"]').tap();q.locator('[data-al-chip="'+id+'"]').tap()
 q.locator('[data-wb=al-check]').tap();assert q.evaluate('ApparatusProgress.data("evaporation").labels.complete')
 assert q.locator('.wb-page').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
 assert not errors,errors
 print('PASS actual touch slider / 5 study cards / tap assembly / tap label fields and chips / saved completion / no console errors')
 b.close()
