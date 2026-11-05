"""Atlas sequencing, lazy installation hints and reduced motion without WebGL."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},reduced_motion='no-preference')
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 register_local(q,BASE,'Atlas motion')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 q.goto(BASE+'#lab/ch1/1.2/task-2');q.wait_for_selector('.wb-atlas');assert q.locator('.wb-first-hint').is_visible()
 q.locator('[data-wb=toggle]').click();assert q.locator('.wb-show-parts').count()==1;q.wait_for_timeout(250);assert q.locator('.wb-atlas-lines').evaluate('(e)=>getComputedStyle(e).opacity')=='0';q.wait_for_timeout(1200)
 assert q.locator('.wb-atlas.is-labeled').count()==1
 assert q.locator('.wb-part').evaluate_all('es=>es.every(e=>!e.style.willChange)')
 q.locator('[data-wb-scrub]').fill('50');q.locator('[data-wb-scrub]').dispatch_event('input');q.wait_for_timeout(100);assert q.locator('[data-wb-percent]').inner_text()=='50%'
 q.locator('[data-wb=reset]').click();q.wait_for_timeout(1450);assert q.locator('.wb-atlas-origin picture').evaluate('(e)=>getComputedStyle(e).opacity')=='1'
 q.reload();q.wait_for_selector('.wb-atlas');assert q.locator('.wb-first-hint').is_hidden()
 q.goto(BASE+'#lab/ch1/1.2/task-3');q.wait_for_selector('.wb-atlas');assert q.locator('.wb-first-hint').is_visible()
 ratio=q.locator('.wb-atlas-origin').evaluate('(e)=>e.clientWidth/e.clientHeight');assert abs(ratio-332/652)<.01
 q.emulate_media(reduced_motion='reduce');q.locator('[data-wb=toggle]').click();q.wait_for_timeout(200);assert q.locator('.wb-atlas.is-labeled').count()==1
 assert q.locator('.wb-part').evaluate_all('es=>es.every(e=>!e.style.willChange)')
 assert not errors,errors
 print('PASS full/parts crossfade, stagger cleanup, slider interpolation, per-installation first hint, JSON aspect ratio and reduced motion')
 b.close()
