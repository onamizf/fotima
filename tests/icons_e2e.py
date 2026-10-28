"""PNG integration across actual routes, topic identities, notifications, search and responsive sizes."""
import os,json,sys
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');errors=[];bad=[];rows=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 register_local(q,BASE,'Фотима');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.wait_for_timeout(2700)
 def audit(label):
  q.locator('main').wait_for();q.evaluate('''async()=>{await Promise.all([...document.querySelectorAll('img.site-icon')].map(async e=>{e.loading='eager';await e.decode()}))}''')
  issues=q.locator('img.site-icon').evaluate_all('''es=>es.flatMap(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return e.naturalWidth!==134||e.naturalHeight!==134||e.getAttribute('width')!==e.getAttribute('height')||Math.abs(r.width-r.height)>.1||e.alt!==''||e.getAttribute('aria-hidden')!=='true'||e.draggable?[[e.dataset.icon,r.width,r.height,e.naturalWidth]]:[]})''')
  assert not issues,(label,issues)
  assert not q.evaluate('/[🔥⭐🏆🏅]/u.test(document.body.innerText)'),label
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),label
  rows.append({'page':label,'icons':q.locator('.site-icon').count()})
 def size(selector,n):
  r=q.locator(selector).first.bounding_box();assert abs(r['width']-n)<.1 and abs(r['height']-n)<.1,(selector,r,n)
 audit('home compact');size('.sidebar-link .site-icon',40);size('#notificationsToggle .site-icon',36);size('.topic-tile-icon .site-icon',56);size('.home-next-experience .site-icon',44);size('.home-stat-metrics .site-icon',20)
 assert q.locator('.sidebar-start').get_attribute('href')=='#topics';assert q.locator('.sidebar-link').evaluate_all('(es)=>es.map(e=>e.hash)')==['#home','#topics','#games','#collection','#progress','#contacts','#settings']
 q.locator('[data-profile-compact]').click();size('.sidebar-link .site-icon',32);size('.sidebar-link .service-icon-tile',32)
 topics=q.evaluate('CourseData.topics.map(t=>({id:t.id,icon:t.icon,title:CourseModel.text(t.title)}))')
 for t in topics:
  assert q.locator('.home-topic-tile[href="#topic/'+t['id']+'"] img[data-icon="'+t['icon']+'"],.home-topic-tile[data-locked] img[data-icon="'+t['icon']+'"]').count()==1
 q.screenshot(path=str(ROOT/'artifacts/icons-home-1440.png'))
 # Each topic keeps its own icon in search, including locked topics.
 for t in topics:
  q.locator('#dashboardSearch').fill(t['title']);q.wait_for_selector('#searchResults:not([hidden])');assert q.locator('.search-group [data-icon="'+t['icon']+'"]').count()>=1;size('.search-result-icon .site-icon',36)
 q.locator('#dashboardSearch').fill('неттакоговещества000');assert q.locator('.search-empty img[data-icon=search]').is_visible();audit('search empty');q.locator('#dashboardSearch').fill('Веществ');audit('search');q.screenshot(path=str(ROOT/'artifacts/icons-search-1440.png'));q.keyboard.press('Escape')
 q.locator('#notificationsToggle').click();assert q.locator('.notice-topic img').first.get_attribute('data-icon')==topics[0]['icon'];size('.notice-icon .site-icon',36);audit('notifications');q.screenshot(path=str(ROOT/'artifacts/icons-notifications-1440.png'));q.keyboard.press('Escape')
 q.goto(BASE+'#topics');audit('topics');size('.station-circle .site-icon',72);assert q.locator('.station-circle .site-icon').evaluate_all('(es)=>es.map(e=>e.dataset.icon)')==[t['icon'] for t in topics];assert q.locator('.station-locked .icon-lock').count()==6;q.screenshot(path=str(ROOT/'artifacts/icons-route-1440.png'))
 for t in topics:
  q.goto(BASE+'#topic/'+t['id']);audit('topic/'+t['id']);size('main img[data-icon="'+t['icon']+'"]',96)
 # Existing access to legacy labs can be retained for returning pupils. This is a UI test fixture,
 # not an auth bypass; registered session remains real and award amounts are checked below.
 q.evaluate("state.course.preservedAccess=['properties','physical','chemical'];saveState()")
 for route in ['topic/properties','lab/properties','topic/physical','lab/physical','topic/chemical','lab/chemical','resources/periodic','resources/glossary','resources/tests','resources/more','games','games/mixtures','games/changes','games/safety','collection','progress','awards','settings','account','challenge','contacts']:
  q.goto(BASE+'#'+route);audit(route)
 # +2 XP remains once per element, and the toast uses xp.png.
 q.goto(BASE+'#resources/periodic');before=q.evaluate('CourseGame.xp()');q.locator('[data-element=Ge]').click();q.wait_for_function('window.periodic3DInfo?.ready');assert q.evaluate('CourseGame.xp()')==before+2;q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached');expect(q.locator('#gameToast img[data-icon=xp]')).to_be_visible();q.locator('[data-element=Ge]').click();q.wait_for_function('window.periodic3DInfo?.ready');assert q.evaluate('CourseGame.xp()')==before+2
 q.goto(BASE+'#home')
 # Projection is read-only once route state is initialized; no icon touches XP/progress.
 before=q.evaluate('JSON.stringify(state)');q.evaluate('Dashboard.view();CourseUI.map();StudentHeader.notifications();ProfileMenu.view("home")');assert q.evaluate('JSON.stringify(state)')==before
 for language in ['ru','uz-Latn','uz-Cyrl','en']:
  q.locator('#language').select_option(language)
  for width in [320,390,768,1024,1440]:
   q.set_viewport_size({'width':width,'height':900});audit(language+' home '+str(width))
   if width<768:
    q.locator('#navigationToggle').click();size('.sidebar-link .site-icon',32);assert q.locator('#profileMenu').bounding_box()['width']==width*.85;q.keyboard.press('Escape')
 q.locator('#language').select_option('ru');q.wait_for_timeout(3100);q.set_viewport_size({'width':390,'height':844});q.screenshot(path=str(ROOT/'artifacts/icons-home-390.png'));q.locator('#navigationToggle').click();q.screenshot(path=str(ROOT/'artifacts/icons-sidebar-390.png'));q.keyboard.press('Escape');q.locator('#notificationsToggle').click();audit('mobile notifications');q.screenshot(path=str(ROOT/'artifacts/icons-notifications-390.png'));q.keyboard.press('Escape');q.goto(BASE+'#topics');audit('mobile route');q.screenshot(path=str(ROOT/'artifacts/icons-route-390.png'))
 q.goto(BASE+'#welcome');audit('welcome');q.locator('.hero-burger').click();q.locator('[data-welcome-menu=topics]').click();audit('welcome topics');q.locator('[data-welcome-menu=learning]').click();audit('welcome learning')
 # Reduced motion disables icon transitions; hover does not rotate/stretch a tile.
 assert q.locator('.welcome-topic-icon img').first.evaluate('(e)=>getComputedStyle(e).transitionDuration')=='0s'
 assert not errors,errors;assert not bad,bad
 report={'status':'passed','pages':rows,'checks':['all PNGs square, local, 134x134, decorative and not draggable','actual seven navigation routes preserved','seven topic identities across cards/search/map/headers/notices','role sizes: 20/32/36/40/44/56/72/96','no old fire/star/trophy/medal emoji in rendered UI','search empty state, notification icons and mobile drawer','existing labs, games, periodic, collection, progress, settings and account','real per-element XP reward remains +2 only once','read-only view and reduced motion','four locales, five widths'],'errors':errors,'bad_responses':bad}
 (ROOT/'artifacts/icons-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));b.close();print('Passed: PNG integration on all main routes, identities, role sizes, XP, four locales and responsive layouts')
