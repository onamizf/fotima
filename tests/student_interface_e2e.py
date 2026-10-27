"""Home/header workflow with actual local accounts; no production accounts or server changes."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1440,'height':1100},reduced_motion='reduce');q=ctx.new_page();errors=[];bad=[];requests=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);q.on('request',lambda r:requests.append(r.url));register_local(q,BASE,'Фотима');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.wait_for_timeout(300)
 def one_panel(id):
  assert q.locator('.header-panel:visible').count()==1;assert q.locator('#'+id).is_visible()
 buttons=['#notificationsToggle','#languageToggle','#profileToggle'];boxes=[q.locator(s).bounding_box() for s in buttons];assert all(v['width']==44 and v['height']==44 for v in boxes);assert boxes[0]['x']<boxes[1]['x']<boxes[2]['x'];assert boxes[1]['x']-boxes[0]['x']==56;assert boxes[2]['x']==1440-24-44
 assert q.locator('.header-rank-badge').is_hidden();assert q.evaluate('state.notifications.items.length')==2;assert q.locator('.notice-count').inner_text()=='2';xp=q.evaluate('CourseGame.xp()')
 assert 'осталось 15 шагов' in q.locator('.dashboard-banner').inner_text();assert q.locator('.learning-resume-grid>article').count()==2;assert q.locator('.learning-preview').bounding_box()['height']==200
 left=q.locator('.learning-current').bounding_box();right=q.locator('.learning-next').bounding_box();assert left['height']==right['height'];assert q.locator('.learning-step-list li').count()==3
 for selector in ['.learning-current-body>.button','.learning-next>button']:
  button=q.locator(selector);box=button.bounding_box();parent=button.locator('xpath=ancestor::article').bounding_box();assert box['y']+box['height']<=parent['y']+parent['height']+1
 for label in q.locator('.shortcut>span:last-child').all():
  assert label.text_content();assert label.bounding_box()['width']==110;assert label.bounding_box()['height']<=35
 q.locator('.shortcut-next').click();q.wait_for_function('document.querySelector(".shortcut-track").scrollLeft>0')
 q.locator('#dashboardSearch').fill('в');assert q.locator('#searchResults').is_hidden();q.locator('#dashboardSearch').fill('во');assert q.locator('.search-group').count()==4
 for group in q.locator('.search-group').all():assert group.locator('[role=option]').count()<=4
 assert q.locator('.search-result-name b').count()>0;assert q.locator('#searchBackdrop').count()==1;assert q.locator('#searchResults').evaluate('(e)=>getComputedStyle(e).zIndex')=='1000';assert q.locator('#searchResults').bounding_box()['height']<=420
 assert q.locator('#searchResults').evaluate('(e)=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+60,Math.min(r.bottom-10,innerHeight-10)))}'),'Search must cover shortcut icons'
 q.locator('#dashboardSearch').fill('ни');q.locator('[data-search-all]').first.click();assert any(g.locator('[role=option]').count()>4 for g in q.locator('.search-group').all());q.locator('#dashboardSearch').fill('во');locked=q.locator('#searchResults [aria-disabled=true]').first;url=q.url;locked.click(force=True);assert q.url==url and q.locator('#searchResults').is_visible();assert 'Откроется после темы' in q.locator('#searchStatus').inner_text()
 q.locator('#dashboardSearch').press('Escape');assert q.locator('#searchResults').is_hidden();q.locator('#dashboardSearch').fill('несуществующееслово');assert q.locator('.search-empty img').count()==1;q.locator('#searchBackdrop').click(position={'x':2,'y':2});assert q.locator('#searchResults').is_hidden()
 q.locator('#dashboardSearch').fill('германий');q.locator('#dashboardSearch').press('ArrowDown');q.locator('#dashboardSearch').press('Enter');q.wait_for_url('**/Ge');q.wait_for_selector('.periodic-detail-dialog[open]');q.locator('[data-periodic-close]').click();q.goto(BASE+'#home')
 q.locator('#notificationsToggle').click();one_panel('notificationsPanel');assert q.locator('.notice-item').count()==2;q.locator('#languageToggle').click();one_panel('languagePanel');q.locator('#profileToggle').click();one_panel('profilePanel');q.keyboard.press('Escape');assert q.locator('.header-panel:visible').count()==0
 q.locator('#languageToggle').focus();q.keyboard.press('ArrowDown');assert q.locator('#languagePanel [aria-selected=true]').evaluate('(e)=>e===document.activeElement');q.keyboard.press('ArrowDown');q.keyboard.press('Enter');assert q.evaluate('state.settings.language')=='uz-Latn';assert 'O‘zbekcha' in q.locator('#studentToast').inner_text();q.reload();assert q.evaluate('state.settings.language')=='uz-Latn'
 # The custom control retains a visually hidden adapter used by the rest of the existing application.
 q.locator('#language').select_option('ru');assert q.evaluate('state.settings.language')=='ru';q.locator('#notificationsToggle').click();q.locator('[data-notice-read-all]').click();assert q.locator('.notice-count').is_hidden();q.locator('[data-notice-filter=unread]').click();assert q.locator('.notice-empty').count()==1;q.locator('[data-notice-filter=all]').click();q.locator('[data-notice-remove]').first.click();assert q.evaluate('state.notifications.items.length')==1;q.reload();assert q.evaluate('state.notifications.items.length')==1
 q.locator('#notificationsToggle').click();q.locator('[data-notice-open]').click();q.wait_for_url('**/#progress');assert q.evaluate('CourseGame.xp()')==xp+2
 q.goto(BASE+'#settings');assert q.locator('[data-notice-preference]').count()==5;q.locator('[data-notice-preference=badge]').uncheck();q.locator('[data-notice-sound]').check();q.reload();assert not q.locator('[data-notice-preference=badge]').is_checked();assert q.locator('[data-notice-sound]').is_checked();assert q.evaluate('state.settings.sound')==False
 # New title and notifications follow real completion evidence from the intro workflow fixture.
 fixture=Path('/tmp/intro-complete-state.json')
 if fixture.exists():
  saved=json.loads(fixture.read_text());values=list(saved.values());source=next(json.loads(v) for k,v in saved.items() if '.local-user.' in k);q.evaluate('(intro)=>{state.intro=IntroModel.sanitize(intro);saveState();render(false)}',source['intro']);q.goto(BASE+'#home');assert 'Открыта новая тема:' in q.locator('.dashboard-banner').inner_text();assert q.evaluate('state.notifications.items.some(n=>n.id==="topic:states")');assert q.evaluate('state.notifications.items.some(n=>n.type==="rank")');assert not q.evaluate('state.notifications.items.some(n=>n.type==="badge")')
 # Four translations, desktop geometry and all three mobile sheets at narrow widths.
 for language in ['ru','uz-Latn','uz-Cyrl','en']:
  q.goto(BASE+'#home');q.locator('#language').select_option(language)
  for width in [320,375,390,768,1024,1440]:
   q.set_viewport_size({'width':width,'height':900});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(language,width)
   for toggle,panel in [('#notificationsToggle','#notificationsPanel'),('#languageToggle','#languagePanel'),('#profileToggle','#profilePanel')]:
    q.locator(toggle).click();box=q.locator(panel).bounding_box();assert box['x']>=-1 and box['x']+box['width']<=width+1,(language,width,panel,box)
    if width<768:assert box['x']==0 and box['width']==width and abs(box['y']+box['height']-900)<2
    q.keyboard.press('Escape')
   assert q.locator('.header-circle').evaluate_all('(es)=>es.every(e=>e.offsetWidth===44&&e.offsetHeight===44)')
 q.set_viewport_size({'width':1440,'height':1100});q.locator('#language').select_option('ru');q.screenshot(path=str(ROOT/'artifacts/student-home-1440.png'),full_page=True);q.locator('#dashboardSearch').fill('во');q.screenshot(path=str(ROOT/'artifacts/student-search-1440.png'));q.keyboard.press('Escape');q.locator('#notificationsToggle').click();q.screenshot(path=str(ROOT/'artifacts/student-notifications-1440.png'));q.keyboard.press('Escape');q.locator('#languageToggle').click();q.screenshot(path=str(ROOT/'artifacts/student-language-1440.png'));q.keyboard.press('Escape');q.set_viewport_size({'width':390,'height':844});q.locator('#notificationsToggle').click();q.screenshot(path=str(ROOT/'artifacts/student-notifications-390.png'));q.keyboard.press('Escape')
 # Nickname accounts have isolated notification state and preferences.
 q.locator('#profileToggle').click();q.locator('[data-profile-logout]').click();q.wait_for_url('**/#login');register_local(q,BASE,'Second Learner');assert q.evaluate('state.notifications.items.length')==2;assert q.evaluate('state.notifications.preferences.badge');assert not q.evaluate('state.notifications.sound')
 q.evaluate('()=>{const n=state.notifications.items[0];for(let i=0;i<12;i++)state.notifications.items.push({...n,id:"fixture:"+i});saveState();render(false)}');assert q.locator('.notice-count').inner_text()=='9+'
 assert not errors,errors;assert not bad,bad;assert not [r for r in requests if not r.startswith(('http://127.0.0.1','data:','blob:'))],requests
 (ROOT/'artifacts/student-interface-validation.json').write_text(json.dumps({'status':'passed','checks':['grouped search, show all, bold matches, locks, keyboard and overlay hit-testing','two intact equal-height resume cards and labeled scrolling shortcuts','44px header controls in bell/language/profile order','one panel at a time, language keyboard/instant save/toast','per-user persistent notices, read/delete and preferences','topic/rank changes from checked intro completion when fixture available','four languages at six widths, three bottom sheets','periodic integration, unchanged XP rewards and account isolation'],'intro_completion_fixture':fixture.exists(),'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('Passed: student home/header, search stacking, custom menus, notifications and responsive translations')
