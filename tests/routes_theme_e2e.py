"""Every hash route, links, unified blue UI, profile levels and history; preserve the hero geometry."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8037/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1366,'height':900});errors=[];bad=[];hrefs=set()
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 q.goto(BASE+'#welcome');q.evaluate('document.fonts.ready');q.emulate_media(reduced_motion='reduce');assert q.locator('.hero-title-block').bounding_box()['x']==48;assert q.locator('.hero-action').bounding_box()['x']+q.locator('.hero-action').bounding_box()['width']==1366-48
 q.locator('.hero-experiments').click();q.wait_for_selector('#accountForm');q.locator('[name=username]').fill('Route Learner');q.locator('[name=password]').fill('route-pass-1');q.locator('[name=repeat]').fill('route-pass-1');q.locator('.auth-submit').click();q.wait_for_url('**/#catalog')
 q.locator('.site-nav a[href="#contacts"]').click();q.wait_for_selector('.contact-page');assert q.title().startswith('Контакты');q.go_back();q.wait_for_selector('.level-map');q.go_forward();q.wait_for_selector('.contact-page');q.reload();q.wait_for_selector('.contact-page');assert q.locator('.site-nav [aria-current=page]').get_attribute('href')=='#contacts'
 snapshot=json.loads(Path('/tmp/progress-demo-state.json').read_text());q.evaluate('(s)=>{state=readState(s);saveState();render(false)}',snapshot)
 routes=['welcome','home','catalog','account','settings','progress','contacts','notfound','unknown-page','lab/unknown-topic','table/properties','materials/properties']+[f'{page}/{topic}' for page in ['theory','lab','result'] for topic in ['properties','physical','chemical']]
 for route in routes:
  q.goto(BASE+'#'+route);assert 'undefined' not in q.title();assert 'undefined' not in q.locator('main').inner_text()
  if route=='welcome':assert q.locator('.entry-hero').is_visible()
  else:assert 'radial-gradient' in q.evaluate('getComputedStyle(document.body).backgroundImage'),route
  assert q.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()")=='#1F6BFF'
  for href in q.locator('a').evaluate_all('(nodes)=>nodes.map(a=>a.getAttribute("href"))'):
   assert href and href!='#',(route,href);hrefs.add(href)
   if href.startswith('#'):
    anchor=href[1:]
    if q.locator('[id="'+anchor+'"]').count():continue
    assert q.evaluate('(h)=>SiteRoutes.resolve(h).page',href)!='notfound',(route,href)
 q.goto(BASE+'#account');assert q.locator('[data-account-level="3"]').count()==1;assert q.locator('.account-all-done').count()==1;assert q.locator('input[type=email]').count()==0
 # Check short and long names, expanded sidebar and responsive content in the real routes.
 checks=0
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.select_option('#language',lang)
  for width in [320,375,768,1366]:
   q.set_viewport_size({'width':width,'height':1000})
   for route in ['catalog','contacts','account','settings','progress','theory/properties','lab/physical','lab/chemical']:
    q.goto(BASE+'#'+route);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,width,route);checks+=1
 q.select_option('#language','ru');q.set_viewport_size({'width':1366,'height':900});q.goto(BASE+'#catalog');q.screenshot(path=str(ROOT/'artifacts/blue-experiments-1366.png'),full_page=True)
 q.locator('[data-profile-compact]').click();assert q.locator('#profileMenu').bounding_box()['x']<30;assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');q.screenshot(path=str(ROOT/'artifacts/blue-sidebar-1366.png'),full_page=True)
 q.goto(BASE+'#lab/physical');q.screenshot(path=str(ROOT/'artifacts/blue-laboratory-1366.png'),full_page=True)
 q.goto(BASE+'#account');q.screenshot(path=str(ROOT/'artifacts/blue-account-1366.png'),full_page=True)
 q.set_viewport_size({'width':375,'height':900});q.goto(BASE+'#contacts');q.screenshot(path=str(ROOT/'artifacts/blue-contacts-375.png'),full_page=True)
 q.goto(BASE+'#register');q.locator('.header-logout').click();q.wait_for_selector('#accountForm');q.goto(BASE+'#register');q.screenshot(path=str(ROOT/'artifacts/nickname-register-375.png'),full_page=True)
 q.locator('#navigationToggle').click();q.locator('#profileMenu a[href="#contacts"]').click();q.wait_for_selector('.contact-page');assert q.locator('#profileMenu[open]').count()==0
 q.goto(BASE+'#welcome');q.locator('.hero-burger').click();q.locator('.hero-nav a[href="#contacts"]').click();q.wait_for_selector('.contact-page')
 q.goto(BASE+'#no-such-route');assert '404' in q.title();assert q.locator('.notfound-page').count()==1
 assert not errors,errors;assert not bad,bad;b.close()
print(f'Passed: {len(routes)} routes, {checks} responsive layouts, {len(hrefs)} unique working hrefs, Back/Forward/F5, blue background, real local auth and mobile menu, hero geometry unchanged')
