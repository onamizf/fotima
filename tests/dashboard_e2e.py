"""Real login, dashboard navigation/search, per-user banner, full-height sidebar and responsive layouts."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8038/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1440,'height':1000});q=ctx.new_page();errors=[];bad=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 q.goto(BASE+'#home');q.wait_for_url('**/#login');assert q.locator('#accountForm [name=repeat]').count()==0
 register_local(q,BASE,'Фотима');q.wait_for_selector('.student-dashboard');q.emulate_media(reduced_motion='reduce');q.wait_for_timeout(350)
 assert q.locator('.dashboard-hero h1').inner_text()=='Что изучим сегодня, Фотима?'
 assert q.locator('.topbar').bounding_box()['height']==72
 assert q.locator('.brand').bounding_box()['x']==24
 assert q.locator('#language').bounding_box()['x']==1440-24-40
 assert q.locator('.header-logout').count()==0
 assert q.locator('#profileMenu [data-profile-logout]').count()==0
 assert q.locator('#headerProfile [data-profile-logout]').count()==1
 assert q.locator('#profileMenu').bounding_box()=={'x':0,'y':0,'width':80,'height':1000}
 assert q.locator('.topinner').evaluate('(el)=>Array.from(el.children).map(n=>n.className).join("|")').endswith('header-profile|header-language')
 assert 'Новый уровень открыт' not in q.locator('.dashboard-banner').inner_text()
 assert q.locator('.shortcut[aria-disabled=true]').count()==2
 assert q.locator('.dashboard-resume-card progress').get_attribute('value')=='0'
 q.screenshot(path=str(ROOT/'artifacts/dashboard-1440.png'),full_page=True)
 # Search keyboard navigation, exact match ranking, no-results, escape, actual route.
 search=q.locator('#dashboardSearch');search.fill('медь');assert q.locator('[role=option]').first.inner_text().startswith('Медь\n');search.press('ArrowDown');assert search.get_attribute('aria-activedescendant');search.press('Enter');q.wait_for_url('**/#theory/properties');assert q.evaluate('state.activeSample')=='copper'
 q.goto(BASE+'#home');q.locator('#dashboardSearch').fill('несуществующееслово');assert 'Ничего не найдено' in q.locator('#searchResults').inner_text();q.locator('#dashboardSearch').press('Escape');assert q.locator('#searchResults').is_hidden()
 q.locator('#dashboardSearch').fill('плотность');assert q.locator('[role=option]').count()>0;q.locator('[role=option]').filter(has_text='Термин').first.click();q.wait_for_url('**/#resources/glossary');assert 'Плотность' in q.locator('.resource-glossary').inner_text()
 # Dismissal persists through refresh and is isolated between users.
 q.goto(BASE+'#home');q.locator('[data-banner-close]').click();q.reload();assert q.locator('.dashboard-banner').count()==0
 q.locator('[data-profile-compact]').click();q.wait_for_timeout(350);assert q.locator('#profileMenu').bounding_box()['width']==280;assert q.locator('main').bounding_box()['x']>=280
 q.screenshot(path=str(ROOT/'artifacts/dashboard-expanded-1440.png'),full_page=True)
 q.locator('#profileToggle').click();q.locator('.header-profile-popover a[href="#settings"]').click();q.wait_for_url('**/#settings');q.locator('#profileToggle').click();q.keyboard.press('Escape');assert not q.locator('#headerProfile').evaluate('(el)=>el.open')
 q.locator('.brand-link').click();q.wait_for_url('**/#home');assert q.locator('.site-nav [aria-current=page]').get_attribute('href')=='#home'
 q.locator('[data-notifications]').click();assert q.locator('#notificationsDialog').is_visible();q.keyboard.press('Escape');q.locator('#notificationsDialog').wait_for(state='detached')
 q.locator('#profileToggle').click();q.locator('.header-profile-popover [data-profile-logout]').click();register_local(q,BASE,'Другой ученик');assert q.locator('.dashboard-banner').is_visible()
 # All shortcuts have existing destinations. Locked levels remain inaccessible.
 for href in ['#resources/periodic','#materials/properties','#resources/safety','#resources/tests','#resources/glossary','#progress','#resources/more']:
  q.goto(BASE+href);assert q.evaluate('SiteRoutes.resolve().page')!='notfound';assert 'undefined' not in q.locator('main').inner_text();q.reload();assert q.evaluate('SiteRoutes.resolve().page')!='notfound'
 q.goto(BASE+'#resources/periodic');assert q.locator('[data-element]').count()==118;assert len(set(q.locator('[data-element]').evaluate_all('(els)=>els.map(e=>e.dataset.element)')))==118;q.locator('[data-element=Cu]').click();assert q.locator('#elementDetail').inner_text().endswith('29')
 q.goto(BASE+'#home');q.locator('.shortcut[aria-disabled=true]').first.click(force=True);assert 'Пройдите предыдущий уровень' in q.locator('.dashboard-lock-note').inner_text();assert q.url.endswith('#home')
 # Previously earned evidence unlocks the matching announcement without granting anything new.
 snapshot=Path('/tmp/progress-demo-state.json')
 if snapshot.exists():
  q.evaluate('(s)=>{state=readState(s);saveState();render(false)}',json.loads(snapshot.read_text()));assert q.locator('.shortcut[aria-disabled=true]').count()==0;assert 'Химические явления' in q.locator('.dashboard-banner').inner_text();assert q.locator('.dashboard-resume-card').count()==3
 # Layout coverage includes all languages, compact / expanded panels and shortest screens.
 layouts=0
 for lang in ['ru','en','uz-Latn','uz-Cyrl']:
  q.select_option('#language',lang)
  for w,h in [(1440,1000),(1200,900),(1024,768),(768,1024),(767,900),(375,812),(320,568),(844,390)]:
   q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(350);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,w)
   if w>=768:
    assert q.locator('#profileMenu').is_visible();assert q.locator('#profileMenu').bounding_box()['height']==h;assert q.locator('main').bounding_box()['x']>=q.locator('#profileMenu').bounding_box()['width']
   else:
    assert not q.locator('#profileMenu').is_visible();q.locator('#navigationToggle').click();assert q.locator('#profileMenu').is_visible();q.locator('#profileMenu a[href="#contacts"]').click();q.wait_for_url('**/#contacts');assert not q.locator('#profileMenu').is_visible();q.go_back();q.wait_for_selector('.student-dashboard')
   layouts+=1
 q.select_option('#language','ru');q.set_viewport_size({'width':375,'height':812});q.wait_for_timeout(350);q.screenshot(path=str(ROOT/'artifacts/dashboard-375.png'),full_page=True)
 assert q.locator('.student-dashboard').evaluate('(el)=>getComputedStyle(el.firstElementChild).animationName')=='none'
 # Guest hero geometry / tracking are still owned by the original component.
 q.set_viewport_size({'width':1440,'height':1000});q.goto(BASE+'#welcome');assert q.locator('.hero-title-block').bounding_box()['x']==48;assert q.locator('#profileMenu').count()==0
 assert not errors,errors;assert not bad,bad;b.close()
print(f'Passed: dashboard/search, 118 elements, progress, menus, banner isolation, guest redirect, {layouts} layouts, reduced motion; no JS/resource errors')
