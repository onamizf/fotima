"""Periodic table: real local login, data-driven interactions, rewards, history and narrow screens."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8043/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');q=ctx.new_page();errors=[];bad=[];requests=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);q.on('request',lambda r:requests.append(r.url))
 q.goto(BASE+'#resources/periodic');assert q.locator('#accountForm').count()==1
 register_local(q,BASE,'Periodic Learner');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.goto(BASE+'#resources/periodic');assert q.locator('[data-element]').count()==118
 assert not any('/scenes/periodic.js' in url for url in requests),'Models must load lazily'
 base_xp=q.evaluate('CourseGame.xp()');assert q.locator('[data-element=Ge] .element-symbol').inner_text()=='Ge';assert q.locator('[data-element=Ca] .element-symbol').inner_text()=='Ca'
 for search in ['германий','Ge','32','Germanium','Germaniy']:
  q.locator('#periodicSearch').fill(search);assert q.locator('[data-element]:not(.is-filtered)').count()==1;assert 'Ge'==q.locator('[data-element]:not(.is-filtered)').get_attribute('data-element')
 q.locator('#periodicSearch').fill('not-an-element');assert q.locator('[data-element]:not(.is-filtered)').count()==0;q.locator('#periodicSearch').fill('')
 q.locator('[data-series-link=lanthanide]').hover();assert q.locator('.series-highlight').count()==15;q.locator('[data-series-link=lanthanide]').click();assert q.evaluate('document.activeElement.dataset.element')=='La'
 for layout in ['short','long']:
  q.locator('#periodicLayout').select_option(layout);assert q.locator('[data-element]').count()==118
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 for scheme in ['categories','metals','states','blocks']:
  q.locator('#periodicColors').select_option(scheme);q.locator('[data-periodic-filter]').nth(1).click();assert 0<q.locator('.is-filtered').count()<118;q.locator('[data-periodic-filter=""]').click();assert q.locator('.is-filtered').count()==0
 q.locator('[data-element=H]').focus();q.keyboard.press('ArrowDown');assert q.evaluate('document.activeElement.dataset.element')=='Li';q.keyboard.press('ArrowRight');assert q.evaluate('document.activeElement.dataset.element')=='Be';q.keyboard.press('Enter');q.wait_for_selector('.periodic-detail-dialog[open]');assert q.url.endswith('/Be');q.keyboard.press('Escape');q.wait_for_selector('.periodic-detail-dialog',state='detached')
 def open_element(symbol):
  q.evaluate('(s)=>location.hash="#resources/periodic/"+s',symbol);q.wait_for_function('(s)=>window.periodic3DInfo?.ready && window.periodic3DInfo.symbol===s',arg=symbol)
 open_element('Ge');assert q.evaluate('CourseGame.xp()')==base_xp+4;assert 'Германий' in q.title();assert q.locator('.reference-symbol').inner_text()=='Ge';assert q.locator('.reference-mass b').inner_text()=='72,630';assert q.evaluate('window.periodic3DInfo.renderer')=='svg';assert q.locator('[data-model-camera="in"]').is_disabled()
 q.locator('[data-element-collect]').click();q.locator('[data-element-quiz]').click()
 answers=q.evaluate('PeriodicModel.questions(PeriodicModel.get("Ge")).map(q=>q.correct)')
 for i,value in enumerate(answers):q.locator(f'[name="element-question-{i}"][value="{value}"]').check()
 q.locator('#periodicElementQuiz button').click();assert q.evaluate('state.periodic.quizzes.Ge.best')==3
 q.locator('[data-element-step="1"]').click();q.wait_for_url('**/As');q.go_back();q.wait_for_url('**/Ge');q.go_forward();q.wait_for_url('**/As');q.go_back();q.reload();q.wait_for_selector('.periodic-detail-dialog[open]');assert q.url.endswith('/Ge');assert q.evaluate('state.periodic.collection.includes("Ge")');xp=q.evaluate('CourseGame.xp()');q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached');open_element('Ge');assert q.evaluate('CourseGame.xp()')==xp
 q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached');q.goto(BASE+'#collection');assert q.locator('.periodic-collection a[href="#resources/periodic/Ge"]').count()==1
 q.goto(BASE+'#resources/periodic');q.locator('[data-periodic-random]').click();q.wait_for_selector('.periodic-detail-dialog[open]');q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached')
 # Deterministic random source for a real ten-second mini-game, without seeding progress.
 q.evaluate('Math.random=()=>0');q.locator('[data-periodic-find]').click();assert 'Водород' in q.locator('.periodic-game-banner p').inner_text();q.locator('[data-element=He]').click();assert q.locator('.periodic-detail-dialog').count()==0;q.locator('[data-element=H]').click();q.wait_for_url('**/H');q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached')
 q.clock.install();q.locator('[data-periodic-find]').click();q.clock.run_for(10050);assert q.locator('.periodic-game-banner strong').inner_text()=='0';q.clock.resume()
 # Earn all three badges by actually opening the elements; duplicate opens cannot farm XP.
 symbols=q.evaluate('PeriodicModel.elements.slice(0,50).map(e=>e.symbol).concat(["Xe","Rn","Og"])')
 for symbol in symbols:open_element(symbol)
 q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached');assert q.evaluate('["periodic-gases","periodic-metals","periodic-explorer"].every(id=>state.game.badges.includes(id))')
 assert q.evaluate('CourseGame.xp()')==base_xp+2*q.evaluate('state.periodic.visited.length');q.reload();assert q.locator('.is-studied').count()==q.evaluate('state.periodic.visited.length')
 # All languages and responsive widths; only the table's own container scrolls horizontally.
 for language in ['ru','uz-Latn','uz-Cyrl','en']:
  q.locator('#language').select_option(language)
  for width in [320,390,768,1024,1440]:
   q.set_viewport_size({'width':width,'height':900});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(language,width)
  q.set_viewport_size({'width':390,'height':844});open_element('Ge');q.locator('.periodic-info-actions').scroll_into_view_if_needed();box=q.locator('[data-periodic-close]').bounding_box();assert box and 0<=box['y']<=844,box;assert q.evaluate('document.querySelector(".periodic-detail-dialog").scrollWidth<=innerWidth+1');q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached')
 q.locator('#language').select_option('ru');q.set_viewport_size({'width':1440,'height':1000});q.screenshot(path=str(ROOT/'artifacts/periodic-long-1440.png'),full_page=True);q.locator('#periodicLayout').select_option('short');q.screenshot(path=str(ROOT/'artifacts/periodic-short-1440.png'),full_page=True);open_element('Ge');q.screenshot(path=str(ROOT/'artifacts/periodic-Ge-1440.png'));q.set_viewport_size({'width':390,'height':844});q.screenshot(path=str(ROOT/'artifacts/periodic-Ge-390.png'))
 q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached');q.goto(BASE+'#resources/periodic/Unknown');assert q.locator('.notfound-page').count()==1
 q.goto(BASE+'#account');q.locator('#profileToggle').click();q.locator('.header-profile-popover [data-profile-logout]').click();q.wait_for_url('**/#login');register_local(q,BASE,'Other Learner');q.goto(BASE+'#resources/periodic');assert q.evaluate('state.periodic.visited.length')==0;assert q.evaluate('state.periodic.collection.length')==0
 assert not errors,errors;assert not bad,bad;assert not [url for url in requests if not url.startswith(('http://127.0.0.1','data:','blob:'))],requests
 (ROOT/'artifacts/periodic-validation.json').write_text(json.dumps({'status':'passed','elements':118,'study_profiles':36,'checks':['search in three languages and atomic number','long/short layout, four color schemes, legend and series links','keyboard, element hash, F5 and history','SVG fallback and lazy local scenes','quiz, collection and once-only XP','all three badges through actual element visits','ten-second find game and random roulette','four languages at five widths, sticky modal close','unknown route and separate learner progress'],'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('Passed: periodic table browser workflow, rewards, games, persistence and responsive/localized layouts')
