"""Real welcome interactions: menu, keyboard/touch, data-driven content and auth destinations."""
import os,re
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1]
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8041/')
IDS=['about','learning','topics','safety','contacts']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 ctx=b.new_context(viewport={'width':1440,'height':900});q=ctx.new_page();errors=[];bad=[]
 q.on('pageerror',lambda e:errors.append(str(e)))
 q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 q.goto(BASE+'#welcome');q.evaluate('document.fonts.ready');q.wait_for_timeout(1400)
 assert q.locator('.hero-nav [data-welcome-menu]').all_text_contents()==['О ЛАБОРАТОРИИ','КАК УЧИТЬСЯ','ТЕМЫ КУРСА','БЕЗОПАСНОСТЬ','КОНТАКТЫ']
 assert q.locator('.entry-hero .welcome-enter').inner_text()=='НАЧАТЬ ОПЫТ'
 assert q.locator('.hero-existing').get_attribute('href')=='#login'
 before=q.evaluate('JSON.stringify(state)');before_storage=q.evaluate('JSON.stringify(localStorage)')
 q.locator('[data-welcome-menu=about]').hover();q.wait_for_timeout(100)
 # Уход к панели укладывается в задержку закрытия; числа действительно анимируются.
 assert q.locator('#welcomePanel-about').is_visible()
 assert q.locator('[data-welcome-count]').all_text_contents()!=['6','25','3']
 q.locator('#welcomePanel-about').hover();q.wait_for_timeout(700)
 expected=q.evaluate('[CourseData.topics.length,CourseData.topics.reduce((n,t)=>n+t.steps.experiments.length,0),Object.keys(CourseData.games).length].map(String)')
 assert q.locator('[data-welcome-count]').all_text_contents()==expected
 q.mouse.move(100,600);q.wait_for_timeout(80);assert q.locator('#welcomePanel-about').is_visible()
 q.wait_for_timeout(180);assert q.locator('#welcomePanel-about').is_hidden()
 # Переход между пунктами, подсветка, шторка и реплики помощника.
 previous=None
 for id in IDS:
  trigger=q.locator('[data-welcome-menu='+id+']');trigger.hover()
  expect(trigger).to_have_attribute('aria-expanded','true')
  assert q.locator('.hero-mega:visible').count()==1
  assert q.locator('.entry-hero').evaluate("e=>e.classList.contains('hero-menu-open')")
  expect(q.locator('.hero-speech')).to_have_text(q.evaluate('WelcomeInfo.ui().speech['+str(IDS.index(id))+']'))
  if previous:assert q.locator('#welcomePanel-'+previous).is_hidden()
  previous=id
 q.locator('[data-contact-placeholder]').click();expect(q.locator('.welcome-contact-status')).to_be_visible()
 assert q.locator('#welcomePanel-contacts a[href^="mailto:"]').count()==0
 # Описание справа выбирается и мышью, и клавиатурой.
 q.locator('[data-welcome-menu=topics]').hover();q.locator('[data-preview-topic=chemical]').hover()
 assert q.locator('#welcomeTopicDetail h3').inner_text()==q.evaluate('CourseModel.text(CourseData.topics.find(t=>t.id==="chemical").title)')
 assert q.locator('#welcomeTopicDetail strong').inner_text()=='8'
 q.locator('[data-preview-topic=mixtures]').focus();assert 'Скоро' in q.locator('#welcomeTopicDetail').inner_text()
 q.keyboard.press('Escape');expect(q.locator('[data-welcome-menu=topics]')).to_be_focused()
 q.keyboard.press('Enter');expect(q.locator('#welcomePanel-topics')).to_be_visible()
 q.keyboard.press('Escape');q.keyboard.press('Space');expect(q.locator('#welcomePanel-topics')).to_be_visible()
 q.keyboard.press('Escape');q.mouse.click(100,650);assert q.locator('.hero-mega:visible').count()==0
 # Поворот ориентируется на открытую панель, а не на курсор внутри неё.
 q.locator('[data-welcome-menu=learning]').hover();q.wait_for_timeout(650)
 q.mouse.move(690,130);q.wait_for_timeout(450);a=q.locator('[data-hero-actor]').get_attribute('style');background=q.locator('.hero-motifs').get_attribute('style')
 q.mouse.move(990,180);q.wait_for_timeout(450);c=q.locator('[data-hero-actor]').get_attribute('style')
 def numbers(style):return [float(n) for n in re.findall(r'(-?\d+(?:\.\d+)?)',style)]
 assert max(abs(x-y) for x,y in zip(numbers(a),numbers(c)))<.5,(a,c)
 q.keyboard.press('Escape');q.mouse.move(100,650);q.wait_for_timeout(450)
 assert q.locator('[data-hero-actor]').get_attribute('style')!=c;assert q.locator('.hero-motifs').get_attribute('style')!=background
 assert 'translate3d' in q.locator('.hero-motifs').get_attribute('style')
 assert q.evaluate('JSON.stringify(state)')==before
 assert q.evaluate('JSON.stringify(localStorage)')==before_storage
 # Все ссылки ведут в существующий маршрут, реальный якорь или безопасный контакт.
 links=q.locator('a').evaluate_all('(items)=>items.map(a=>a.getAttribute("href"))')
 assert all(h and h!='#' for h in links),links
 for href in links:
  if href in ['#main','#welcome-how']:assert q.locator(href).count()==1
  elif href.startswith('#'):assert q.evaluate('(h)=>SiteRoutes.resolve(h).page!=="notfound"',href),href
 q.locator('.hero-clock').hover();expect(q.locator('.hero-clock-hint')).to_be_visible()
 q.locator('.hero-learn-more').click();q.wait_for_function('scrollY>300');assert q.url.endswith('#welcome')
 assert q.locator('#welcome-how').evaluate('(e)=>document.activeElement===e')
 q.locator('.welcome-how .welcome-enter').click();q.wait_for_url('**/#register')
 q.go_back();q.wait_for_selector('.entry-hero');q.reload();assert q.url.endswith('#welcome')
 q.locator('.hero-account-link').click();q.wait_for_url('**/#login');assert q.locator('[name=repeat]').count()==0
 q.go_back();q.locator('.entry-hero .welcome-enter').click();q.wait_for_url('**/#register')
 register_local(q,BASE,'Welcome Learner');q.goto(BASE+'#welcome')
 assert q.locator('.entry-hero .welcome-enter').inner_text()=='ПРОДОЛЖИТЬ'
 assert q.locator('.hero-existing').count()==0
 assert q.locator('.hero-account-avatar').get_attribute('href')=='#home'
 assert q.locator('.hero-account-avatar').inner_text().endswith('Welcome Learner')
 q.locator('[data-welcome-menu=topics]').hover();q.locator('.welcome-route-link').click();q.wait_for_url('**/#topics')
 q.go_back();q.locator('.entry-hero .welcome-enter').click();q.wait_for_url('**/#home');expect(q.locator('.student-dashboard')).to_be_visible()
 q.goto(BASE+'#welcome');q.locator('.hero-account-avatar').click();q.wait_for_url('**/#home')
 # RU/UZ (обе письменности)/EN: 32 размера, все пять панелей остаются в экране.
 q.goto(BASE+'#welcome')
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.evaluate('(language)=>{state.settings.language=language;render(false)}',lang)
  for w,h in [(1920,1080),(1440,900),(1366,768),(1024,768),(1000,700),(768,1024),(375,812),(320,700)]:
   q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(100)
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,w)
   if w<1024:q.locator('.hero-burger').click()
   for id in IDS:
    trigger=q.locator('[data-welcome-menu='+id+']')
    if w<1024:trigger.click()
    else:trigger.hover()
    panel=q.locator('#welcomePanel-'+id);expect(panel).to_be_visible()
    box=panel.bounding_box();assert box['x']>=0 and box['x']+box['width']<=w,(lang,w,id,box)
    assert 'undefined' not in panel.inner_text()
    assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,w,id)
   q.keyboard.press('Escape')
   if w<1024:q.keyboard.press('Escape')
 # Reduced motion: окончательные числа сразу, нет tracking, параллакса и анимаций.
 q.set_viewport_size({'width':1440,'height':900});q.evaluate("state.settings.language='ru';render(false)");q.emulate_media(reduced_motion='reduce')
 q.locator('[data-welcome-menu=about]').hover();assert q.locator('[data-welcome-count]').all_text_contents()==expected
 q.mouse.move(900,150);assert not q.locator('[data-hero-actor]').get_attribute('style');assert not q.locator('.hero-motifs').get_attribute('style')
 assert q.locator('#welcomePanel-about').evaluate('e=>getComputedStyle(e).animationName')=='none'
 assert q.locator('.hero-learn-more span').evaluate('e=>getComputedStyle(e).animationName')=='none'
 q.keyboard.press('Escape');q.screenshot(path=str(ROOT/'artifacts/welcome-info-1440.png'))
 q.locator('[data-welcome-menu=topics]').hover();q.screenshot(path=str(ROOT/'artifacts/welcome-topics-1440.png'))
 # На большом сенсорном экране нет hover: первый тап раскрывает, второй закрывает.
 tablet=b.new_context(viewport={'width':1280,'height':900},has_touch=True,is_mobile=True);r=tablet.new_page();r.goto(BASE)
 trigger=r.locator('[data-welcome-menu=safety]');trigger.tap();expect(trigger).to_have_attribute('aria-expanded','true');trigger.tap();expect(trigger).to_have_attribute('aria-expanded','false');trigger.tap();r.locator('.hero-menu-shade').tap(position={'x':20,'y':650});expect(trigger).to_have_attribute('aria-expanded','false');tablet.close()
 # Малый сенсорный экран: аккордеон, повторный тап, вне меню, Esc и закрытие по ссылке.
 phone=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,reduced_motion='reduce');r=phone.new_page();r.goto(BASE)
 r.locator('.hero-burger').tap();r.locator('[data-welcome-menu=about]').tap();assert r.locator('#welcomePanel-about').is_visible()
 r.locator('[data-welcome-menu=about]').tap();assert r.locator('#welcomePanel-about').is_hidden()
 r.locator('[data-welcome-menu=learning]').tap();expect(r.locator('.hero-speech')).to_be_visible();expect(r.locator('.hero-speech img')).to_be_visible();r.screenshot(path=str(ROOT/'artifacts/welcome-accordion-390.png'))
 r.keyboard.press('Escape');assert r.locator('#welcomePanel-learning').is_hidden();r.keyboard.press('Escape');expect(r.locator('.hero-burger')).to_have_attribute('aria-expanded','false')
 r.locator('.hero-burger').tap();r.locator('[data-welcome-menu=about]').tap();r.locator('.hero-clock').tap();expect(r.locator('.hero-burger')).to_have_attribute('aria-expanded','false')
 r.locator('.hero-burger').tap();r.locator('.hero-account-link').tap();r.wait_for_url('**/#login');r.go_back();expect(r.locator('.hero-burger')).to_have_attribute('aria-expanded','false');phone.close()
 assert not errors,errors;assert not bad,bad;b.close()
print('Passed: hover/200ms delay, counters from course data, topics preview, frog gaze/speech, clock tooltip, keyboard, touch/accordions, guest and signed-in auth destinations, history/F5, anchor links, 32 layouts/four languages, reduced motion, no progress mutation or resource errors')
