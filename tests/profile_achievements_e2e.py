"""Real safety submission awards exactly two badges; profile layouts, dialog accessibility and migration."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE='http://127.0.0.1:8051/';OUT=Path('/workspace/work/profile14114');OUT.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);c=b.new_context(viewport={'width':1366,'height':768},has_touch=True,reduced_motion='reduce')
 for host in ['fonts.googleapis.com','fonts.gstatic.com']:c.route('https://'+host+'/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];requests=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' or m.type=='warning' and '[i18n]'in m.text else None);q.on('request',lambda r:requests.append(r.url))
 register_local(q,BASE,'Profile Safety');q.goto(BASE+'#account');q.wait_for_selector('.pf-stat');OUT.joinpath('task-catalog.json').write_text(json.dumps(q.evaluate('ProfileModel.works().map(w=>({id:w.id,title:CourseModel.text(w.title),tasks:w.tasks.map(t=>({id:t.id,title:CourseModel.text(t.title),url:t.url,experiment:t.experiment||null,achievement:t.achievement?.id||null}))}))'),ensure_ascii=False,indent=2));assert q.locator('.pf-avatar').inner_text()=='P';assert q.locator('.pf-badge').count()==8;assert q.locator('.pf-ring,.pf-frog,[data-profile-sensor]').count()==0
 assert not any('frog-base' in r or '/layers/'in r for r in requests);assert q.locator('#frogAssistant').is_visible();assert q.evaluate('Object.keys(ProfileModel.data().achievements).length')==0
 q.goto(BASE+'#lab/ch1/1.1/task-1');q.wait_for_function('SafetyWorkspace.debug.player?.stage===0')
 for i in range(4):
  q.locator('[data-sw-scene="'+str(i)+'"]').click();q.wait_for_function('(i)=>SafetyWorkspace.debug.current===i&&SafetyWorkspace.debug.player?.stage===0',arg=i);q.wait_for_selector('.sp-loader',state='hidden')
  # Traverse every visible step and every explanation through the real learner controls.
  for _ in range(7):q.locator('[data-sp=advance-line]').click()
  q.wait_for_function('(i)=>SafetyLesson.viewed(SafetyLessonData.scenarios[i].id)',arg=i)
  assert q.evaluate('Object.keys(ProfileModel.data().achievements).length')==0
 q.locator('[data-sw=submit]').click();q.wait_for_selector('[data-sw-results][open]');assert q.evaluate('Object.keys(ProfileModel.data().achievements).sort()')==['first-step','safety'];assert q.locator('.profile-result-awards img').count()==2
 assert q.evaluate('ProfileModel.data().achievements.safety.seen') is False;xp=q.evaluate('CourseGame.xp()');q.screenshot(path=str(OUT/'safety-result.png'))
 q.locator('[data-sw-results] [href="#account"]').click();q.wait_for_selector('.pf-stat');assert q.evaluate('CourseGame.xp()')==xp
 q.locator('[data-profile-badge=safety]').focus();q.keyboard.press('Enter');q.wait_for_selector('.pf-dialog[open]');assert '1.1' in q.locator('.pf-detail-source').inner_text();assert q.evaluate('ProfileModel.data().achievements.safety.seen') is True
 q.keyboard.press('Escape');assert q.locator('[data-profile-badge=safety]').evaluate('e=>e===document.activeElement')
 q.locator('[data-profile-all]').click();q.wait_for_selector('.pf-dialog-all[open]');assert q.locator('.pf-achievement-group').count()==4
 q.locator('.pf-dialog-all [data-profile-badge=assembly-master]').focus();q.keyboard.press('Space');q.wait_for_selector('.pf-dialog-detail[open]');assert '1.2' in q.locator('.pf-dialog-detail .pf-detail-source').inner_text();q.keyboard.press('Escape');q.keyboard.press('Escape')
 for width,height in [(360,800),(390,844),(768,1024),(1366,768),(1920,1080)]:
  q.set_viewport_size({'width':width,'height':height})
  for lang in ['ru','en','uz-Latn','uz-Cyrl']:
   q.locator('#language').select_option(lang);q.wait_for_selector('.pf-stat');assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(width,lang)
   assert q.locator('.pf-stat').count()==6;assert q.locator('.pf-day').count()==35
   assert q.locator('.student-profile').bounding_box()['width']<=920.1
   assert q.locator('.pf-day').first.evaluate('e=>getComputedStyle(e).backgroundColor')!='rgba(0, 0, 0, 0)'
   if width>=1024:assert q.locator('.pf-badges').evaluate('e=>e.scrollWidth<=e.clientWidth+1')
   q.locator('[data-profile-badge=equipment-expert]').click();q.wait_for_selector('.pf-dialog-detail[open]');q.keyboard.press('Escape')
  for el in q.locator('.pf-reveal').all():el.scroll_into_view_if_needed()
  q.screenshot(path=str(OUT/f'profile-{width}.png'),full_page=True)
 print('PASS real safety journey: only first-step + safety; 20 layouts; dialogs, focus, navigation and all languages',flush=True)
 # Migration never trusts old result rows, zero errors or passive visits as achievement proof.
 q.evaluate('''()=>{const day=CourseGame.day();state.profile={version:1,joined:day,handle:'older_user',outfit:[],results:{'#lab/ch1/1.2/task-2':{at:day,errors:0}},achievements:{'assembly-master':{at:day,seen:false},'streak-7':{at:day,seen:false},'safety':{at:day,seen:false}}};state.intro.lesson12.collection={version:2,complete:true};localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}''')
 q.reload();q.wait_for_selector('.pf-stat');assert q.evaluate('!!ProfileModel.data().achievements["assembly-master"]') is False;assert q.evaluate('!!ProfileModel.data().achievements["streak-7"]') is False
 assert q.evaluate('ProfileModel.data().achievements["equipment-expert"].seen') is True;assert q.locator('.pf-achievement-toast').count()==0
 audit=q.evaluate('ProfileModel.lastMigration()');assert 'assembly-master' in audit['removed'] and 'equipment-expert' in audit['added'];assert q.evaluate('CourseGame.xp()')==xp
 # Seven dated learning rewards count; login-only dates do not. Historical corrections stay quiet.
 q.evaluate('''()=>{state.game.logins=[];for(let n=0;n<7;n++){const day=new Date(Date.parse(CourseGame.day()+'T00:00:00Z')-n*86400000).toISOString().slice(0,10);state.game.logins.push(day);state.game.rewards['login:'+day]=day;}ProfileModel.sync({silent:true});}''');assert q.evaluate('ProfileModel.longest()')<7
 q.evaluate('''()=>{for(let n=0;n<7;n++){const day=new Date(Date.parse(CourseGame.day()+'T00:00:00Z')-n*86400000).toISOString().slice(0,10);state.game.rewards['daily:'+day]=day;}saveState();}''');assert q.evaluate('!!ProfileModel.data().achievements["streak-7"]')
 assert not errors,errors
 print('PASS migration removes false badges, silently backfills real completions; only learning XP builds a streak',flush=True);b.close()
