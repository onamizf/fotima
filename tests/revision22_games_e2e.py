from playwright.sync_api import sync_playwright
from browser_auth import register_local
import json
BASE='http://127.0.0.1:8051/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':1280,'height':1000},reduced_motion='reduce');q=c.new_page();errors=[];q.on('pageerror',lambda e:(errors.append(str(e)),print('JS',e,flush=True)));register_local(q,BASE,'Games twenty two');q.goto(BASE+'#games');q.wait_for_selector('.mini-catalog');assert q.locator('.mini-cover').count()==6;assert q.locator('.mini-cover a').count()==0;q.evaluate('''()=>{TextbookCourse.data().steps['1.1']={started:true,done:false};const s=IntroModel.data().lesson12??=Practical12Data.blank();s.rows.beaker={studied:true,earned:true,review:{version:1,method:'dwell',seconds:4}};s.setup??=Setup12Data.blank();s.setup.visited=Setup12Data.ids.slice(0,6);s.setup.proof=Setup12Data.proof(s.setup);TextbookCourse.data().steps['6.1']={started:true,done:false};TextbookCourse.data().steps['2.1']={started:true,done:false};saveState()}''')
 q.goto(BASE+'#games/danger');q.wait_for_selector('[data-mini-start]');q.locator('[data-mini-start]').click();q.wait_for_selector('[data-mini-hit]');q.locator('[data-mini-pause]').click();before=q.evaluate('MiniGames.debug().elapsed');q.wait_for_timeout(500);assert q.evaluate('MiniGames.debug().elapsed')==before;q.locator('[data-mini-pause]').click()
 for id in ['hair','goggles','sniff','face','sandwich','flame']:q.locator('[data-mini-hit='+id+']').click()
 q.wait_for_selector('.mini-result');assert q.evaluate('PersonalData.data().gameRecords.danger[0].score')==60;xp=q.evaluate('CourseGame.xp()');q.goto(BASE+'#games/warehouse');q.wait_for_selector('[data-mini-start]');q.locator('[data-mini-start]').click()
 for n in range(10):
  id=q.evaluate('MiniGames.debug().expected');q.locator('[data-mini-shelf='+id+']').click()
 q.wait_for_selector('.mini-result');assert q.evaluate('PersonalData.data().gameRecords.warehouse.length')==1;q.goto(BASE+'#games/guess');q.wait_for_selector('[data-mini-start]');q.locator('[data-mini-start]').click()
 for n in range(8):
  id=q.evaluate('MiniGames.debug().expected');q.locator('[data-mini-guess='+id+']').click();q.locator('[data-mini-next]').click()
 q.wait_for_selector('.mini-result');assert q.evaluate('PersonalData.data().gameRecords.guess[0].errors')==0
 q.goto(BASE+'#games/changes');q.wait_for_selector('[data-mini-start]');q.locator('[data-mini-start]').click()
 for n in range(6):
  q.wait_for_selector('[data-mini-change]:enabled');id=q.evaluate('MiniGames.debug().expected');q.locator('[data-mini-change='+id+']').click();q.locator('[data-mini-next]').click()
 q.wait_for_selector('.mini-result');assert q.evaluate('PersonalData.data().gameRecords.changes[0].score')==120
 q.goto(BASE+'#games/mixtures');q.wait_for_selector('[data-mini-start]');q.locator('[data-mini-start]').click()
 for n in range(8):
  id=q.evaluate('MiniGames.debug().expected');q.locator('[data-mini-basket='+id+']').click();q.wait_for_function('(n)=>MiniGames.debug().phase==="done"||MiniGames.debug().index>n',arg=n,timeout=10000)
 q.wait_for_selector('.mini-result');assert q.evaluate('PersonalData.data().gameRecords.mixtures[0].errors')==0
 q.goto(BASE+'#games/bath');q.wait_for_selector('[data-mini-start]');saved=q.evaluate('JSON.stringify(state.intro.lesson12)');q.locator('[data-mini-start]').click();q.wait_for_selector('[data-workshop-card=stand]:enabled');assert q.locator('[data-workshop-hint]:visible').count()==0
 for id in ['stand','burner','tripod','gauze','beaker','water-bottle','clamp','tube']:
  q.locator('[data-workshop-card='+id+']').click();q.locator('[data-workshop-target]').click();q.wait_for_timeout(100)
 q.locator('[data-workshop-depth]').fill('30');q.locator('[data-workshop-secure]').click()
 for id in ['alcohol-bottle','thermometer']:
  q.locator('[data-workshop-card='+id+']').click();q.locator('[data-workshop-target]').click();q.wait_for_timeout(100)
 q.locator('[data-workshop-valve]').click();q.locator('[data-workshop-match]').click();q.locator('[data-workshop-target]').click();q.wait_for_selector('.mini-result');assert q.evaluate('JSON.stringify(state.intro.lesson12)')==saved;assert q.evaluate('PersonalData.data().gameRecords.bath[0].errors')==0;total=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('[data-mini-start]');assert q.evaluate('CourseGame.xp()')==total;assert not errors,errors;print('PASS all six mini-games: locking, scene search, pause, conveyor sorting, silhouette guess, animated changes, falling objects, unhinted assembly without lesson writes, records and stable XP');b.close()
