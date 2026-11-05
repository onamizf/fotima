"""Check flip, tilt, locales, reduced motion and reload during the last answer."""
import sys
sys.path.insert(0,'tests')
from browser_auth import register_local
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1366,'height':768},reduced_motion='no-preference')
 c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));c.route('https://fonts.gstatic.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
 register_local(q,'http://127.0.0.1:8051/','Motion learner')
 q.evaluate('''()=>{for(const s of SafetyLessonData.scenarios){state.intro.lesson11.reviews[s.id]={version:2,stages:[0,1,2],analysis:true,complete:true};}for(const task of ['danger-a','danger-b','danger-c','danger-d']){const r=IntroModel.row(task);r.checked=true;r.evidence.tutorialReview={version:2,stages:[0,1,2],analysis:true,complete:true};r.proof=structuredClone(r);}saveState();}''')
 q.goto('http://127.0.0.1:8051/#lab/ch1/1.2/task-1');q.wait_for_selector('.ec-card')
 card=q.locator('[data-ec-open=beaker]');card.hover();r=card.bounding_box();q.mouse.move(r['x']+r['width']*.8,r['y']+r['height']*.7);assert card.evaluate('(e)=>e.style.getPropertyValue("--rx")')!=''
 card.click();assert q.locator('.ec-card.is-flipping').count()==1;q.wait_for_selector('.ec-answers');assert q.locator('[data-ec-specimen]').count()==1
 q.screenshot(path='/workspace/work/collection/challenge-motion.png',full_page=True)
 q.locator('[data-ec-answer=beaker]').click();q.wait_for_selector('.ec-schemes');assert q.locator('.ec-diagram img:visible').count()==3
 q.evaluate("state.settings.language='en';saveState()");q.reload();q.wait_for_selector('.ec-schemes');assert q.locator('.ec-ribbon').inner_text()=='Find my diagram'
 q.evaluate("state.settings.language='uz-Cyrl';saveState()");q.reload();q.wait_for_selector('.ec-schemes');assert 'схема' in q.locator('.ec-ribbon').inner_text().lower()
 q.locator('[data-ec-answer=beaker]').click();q.wait_for_function('state.intro.lesson12.collection.step===2');q.locator('[data-ec-answer=beaker]').click();q.reload();q.wait_for_selector('.ec-received');assert q.evaluate('state.intro.lesson12.collection.cards.beaker.done')
 q.emulate_media(reduced_motion='reduce');q.reload();q.wait_for_selector('.ec-reduced');assert q.locator('.ec-atmosphere').evaluate('(e)=>getComputedStyle(e).display')=='none'
 assert not errors,errors
 print('PASS animated flip / pointer tilt / table specimen / PNG diagrams / English and Uzbek Cyrillic / reduced motion')
 b.close()
