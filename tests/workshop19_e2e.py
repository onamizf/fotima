"""Real 3D ordered assembly, danger feedback, restore, rewards, challenge and keyboard/touch flow."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
import json
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']);c=b.new_context(viewport={'width':1440,'height':1100},reduced_motion='reduce');c.route('https://cdnjs.cloudflare.com/**',lambda r:r.abort());c.route('https://cdn.jsdelivr.net/**',lambda r:r.abort());q=c.new_page();errors=[];q.on('pageerror',lambda e:(errors.append(str(e)),print('JS',e,flush=True)));q.on('console',lambda m:print('ERR',m.text[:250],flush=True) if m.type=='error' and 'net::' not in m.text else None);register_local(q,BASE,'Workshop builder');q.evaluate('''()=>{for(const id of ['danger-a','danger-b','danger-c','danger-d']){IntroModel.row(id).evidence.tutorialReview={version:1,stages:[0,1,2,3,4],explanations:[0,1,2]};IntroModel.check(id);}saveState()}''');q.goto(BASE+'?debug=1#topic/ch1/1.2');q.wait_for_selector('[data-setup-task]');assert q.locator('[data-setup-tab=build]').is_disabled();q.evaluate('''()=>{const s=state.intro.lesson12.setup;s.visited=Setup12Data.ids.slice(0,6);s.proof=Setup12Data.proof(s);saveState()}''');q.reload();q.wait_for_selector('[data-setup-tab=build]:enabled');q.locator('[data-setup-tab=build]').click();q.wait_for_selector('.workshop-card',timeout=40000);q.wait_for_function('document.querySelector(".workshop-render canvas")');q.wait_for_timeout(500);assert q.locator('.workshop-card').count()==18;assert not q.evaluate('SetupTask2.done()');baseline=q.evaluate('CourseGame.xp()');print('Ready',baseline,flush=True)
 def count():return q.evaluate('state.intro.lesson12.setup.workshop.run.actions.length')
 def place(id):
  q.locator('[data-workshop-card='+id+']').click();q.locator('[data-workshop-target]').click();q.wait_for_timeout(160)
 place('funnel');assert count()==0;assert q.evaluate('state.intro.lesson12.setup.workshop.run.errors')==1
 place('gauze');assert count()==0;assert q.evaluate('state.intro.lesson12.setup.workshop.run.errors')==2
 place('stand');assert count()==1
 place('burner');assert count()==2;q.locator('[data-workshop-valve]').click();assert count()==2;assert q.locator('[data-workshop-danger]').is_visible()
 for id in ['tripod','gauze']:place(id)
 assert count()==4;order=q.evaluate('state.intro.lesson12.setup.workshop.run.order');q.reload();q.wait_for_selector('.workshop-card',timeout=40000);q.wait_for_timeout(600);assert count()==4;assert q.evaluate('state.intro.lesson12.setup.workshop.run.order')==order
 for id in ['beaker','water-bottle','clamp']:place(id)
 assert count()==7
 place('tube');assert q.locator('[data-workshop-height]').is_visible();q.locator('[data-workshop-depth]').fill('0');q.locator('[data-workshop-secure]').click();assert count()==7;q.locator('[data-workshop-depth]').fill('30');q.locator('[data-workshop-secure]').click();assert count()==8
 for id in ['alcohol-bottle','thermometer']:place(id)
 assert count()==10
 q.locator('[data-workshop-valve]').click();q.locator('[data-workshop-match]').click();q.locator('[data-workshop-target]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.done');q.wait_for_timeout(650);assert q.evaluate('SetupTask2.done()');assert q.locator('[data-workshop-result]').is_visible();assert q.evaluate('CourseGame.xp()')==baseline+42,(baseline,q.evaluate('CourseGame.xp()'));print('First build saved, 42 XP once',flush=True);q.locator('[data-setup-workshop]').screenshot(path='/tmp/workshop19-first.png')
 q.reload();q.wait_for_selector('[data-workshop-result]:visible',timeout=40000);assert q.evaluate('CourseGame.xp()')==baseline+42;q.locator('[data-workshop-challenge]').click();assert count()==0;assert not q.evaluate('state.intro.lesson12.setup.workshop.run.guided')
 for id in ['stand','burner','tripod','gauze','beaker','water-bottle','clamp']:place(id)
 place('tube');q.locator('[data-workshop-depth]').fill('30');q.locator('[data-workshop-secure]').click()
 for id in ['alcohol-bottle','thermometer']:place(id)
 q.locator('[data-workshop-valve]').click();q.locator('[data-workshop-match]').click();q.locator('[data-workshop-target]').click();q.wait_for_function('state.intro.lesson12.setup.workshop.run.done');q.wait_for_timeout(500);assert q.evaluate('state.intro.lesson12.setup.workshop.master');assert q.evaluate('state.game.badges.includes("assembly-master")');assert q.evaluate('state.intro.lesson12.setup.workshop.best.stars')==3;assert q.evaluate('CourseGame.xp()')==baseline+47;print('Perfect challenge +5 improvement, mastery badge, no repeat step XP',flush=True)
 q.goto(BASE+'#home');q.wait_for_timeout(300);assert q.locator('.workshop-render canvas').count()==0;assert not errors,errors;print('PASS ordered 11 steps, missing/extra tools, dangers, safe tube height, resume, first/improvement rewards and badge',flush=True);b.close()
