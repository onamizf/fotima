"""Blue hero: layout, local assets, real navigation, smooth tracking, touch and reduced motion."""
from pathlib import Path
from datetime import datetime,timezone
from PIL import Image
from playwright.sync_api import sync_playwright
import os,re
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8036/')
assert Image.open(ROOT/'assets/frog.png').getchannel('A').getextrema()==(0,255)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 ctx=b.new_context(viewport={'width':1920,'height':1080});q=ctx.new_page();errors=[];bad=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
 q.goto(BASE);q.wait_for_selector('.entry-hero');q.evaluate('document.fonts.ready');q.wait_for_timeout(1500)
 assert q.locator('h1').inner_text()=='ХИМИЯ СТАЛА\nНАМНОГО\nИНТЕРЕСНЕЕ.'
 assert q.locator('#profileMenu').count()==0;assert q.locator('.hero-frog').get_attribute('alt')=='Лягушонок-лаборант с пробиркой'
 assert q.evaluate("document.fonts.check('900 100px \"Inter Tight\"')")
 assert q.locator('.entry-hero').bounding_box()['height']==1080
 assert q.locator('.hero-title-block').bounding_box()['x']==48
 assert q.evaluate("getComputedStyle(document.querySelector('h1')).fontSize")=='110px'
 assert re.fullmatch(r'\d{2}:\d{2}',q.locator('.hero-clock').inner_text())
 before=q.evaluate('JSON.stringify(state)');q.mouse.move(1900,100);q.wait_for_timeout(300);right=q.locator('[data-hero-actor]').get_attribute('style');q.mouse.move(20,950);q.wait_for_timeout(300);assert right!=q.locator('[data-hero-actor]').get_attribute('style');assert q.evaluate('JSON.stringify(state)')==before
 q.get_by_role('button',name='КОНТАКТЫ',exact=True).click();assert q.locator('.hero-contacts').is_visible();q.keyboard.press('Escape');q.wait_for_selector('.hero-contacts[open]',state='detached')
 q.locator('.welcome-enter').click();q.wait_for_selector('#accountForm');assert q.locator('[data-cloud=register]').get_attribute('aria-pressed')=='true'
 q.locator('[data-cloud=login]').click();q.goto(BASE+'#welcome');q.locator('.welcome-enter').click();q.wait_for_selector('#accountForm');assert q.locator('[data-cloud=register]').get_attribute('aria-pressed')=='true'
 q.goto(BASE+'#welcome');q.locator('.hero-experiments').click();q.wait_for_selector('#accountForm')
 # Четыре языка и широкие/узкие сцены; текст и кнопка не обрезаются.
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.goto(BASE+'#account');q.select_option('#language',lang);q.goto(BASE+'#welcome')
  for w,h in [(1920,1080),(1366,768),(1024,768),(768,1024),(375,812),(320,700)]:
   q.set_viewport_size({'width':w,'height':h});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,w,h)
   assert q.locator('.welcome-enter').is_visible();assert 'undefined' not in q.locator('main').inner_text()
 q.goto(BASE+'#account');q.select_option('#language','ru');q.goto(BASE+'#welcome');q.set_viewport_size({'width':375,'height':812})
 q.locator('.hero-burger').click();assert q.locator('.hero-experiments').is_visible();q.keyboard.press('Escape');assert q.locator('.hero-burger').get_attribute('aria-expanded')=='false'
 q.emulate_media(reduced_motion='reduce');q.mouse.move(300,400);q.wait_for_timeout(100);assert not q.locator('[data-hero-actor]').get_attribute('style')
 assert q.evaluate("getComputedStyle(document.querySelector('.hero-breathe')).animationName")=='none'
 # Часы в местном часовом поясе обновляются ровно на следующей минуте.
 clock_ctx=b.new_context(timezone_id='Asia/Tashkent',reduced_motion='reduce');clock=clock_ctx.new_page();clock.clock.install(time=datetime(2026,10,22,5,37,0,tzinfo=timezone.utc));clock.goto(BASE)
 assert clock.locator('.hero-clock').inner_text()=='10:37';clock.clock.fast_forward(60020);assert clock.locator('.hero-clock').inner_text()=='10:38';clock_ctx.close()
 # На сенсорном экране персонаж покачивается сам, при reduced motion останавливается.
 mobile=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True);r=mobile.new_page();r.goto(BASE);r.wait_for_timeout(200);a=r.locator('[data-hero-actor]').get_attribute('style');r.wait_for_timeout(350);assert a!=r.locator('[data-hero-actor]').get_attribute('style');r.emulate_media(reduced_motion='reduce');r.wait_for_function("getComputedStyle(document.querySelector('[data-hero-actor]')).transform==='none'");mobile.close()
 assert not errors,errors;assert not bad,bad;b.close()
print('Passed: 24 layouts, transparent local PNG and Inter Tight, live minute clock, lerp tracking, touch sway, reduced motion, burger/contacts, protected registration route, no learning-state mutation')
