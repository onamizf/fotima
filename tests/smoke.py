"""Regression checks of the shell with stage 4 theory prerequisites."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]; BASE='http://127.0.0.1:8000/'
errors=[]; checks=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 context=b.new_context();page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(BASE);page.evaluate('document.fonts.ready')
 assert page.locator('h1').inner_text()=='Химия начинается с твоего вопроса'
 for topic in ['equipment','dissolving','filtration']:
  page.goto(BASE+'#catalog');page.locator(f'[data-topic={topic}] a').click();assert page.url.endswith('#theory/'+topic)
  for step in [1,2,3]:page.locator(f'[data-step="{step}"]').last.click()
  solutions={'equipment':{'prepare':'read','support':'rack'},'dissolving':{'composition':'both','disappear':'remains'},'filtration':{'method':'filter','salt-filter':'no'}}
  for q,answer in solutions[topic].items():
   page.locator(f'input[name="{q}"][value="{answer}"]').check();page.locator(f'[data-check="{q}"]').click()
  page.locator('main a.primary').click();assert page.url.endswith('#lab/'+topic)
  assert page.locator('main button.primary').is_disabled()
  page.locator('[data-select=beaker]').click();page.reload();assert page.locator('[data-select=beaker]').get_attribute('aria-pressed')=='true'
  page.locator('[data-action=complete]').click();assert page.url.endswith('#result/'+topic)
  page.reload();assert page.locator('.seal').inner_text()=='✓'
 checks.append('all three distinct routes, draft and completion persist after reload')
 page.goto(BASE+'#settings');page.locator('#sound').check();page.locator('#reduceMotion').check();page.locator('#language').select_option('uz-Cyrl');page.reload()
 assert page.locator('#sound').is_checked() and page.locator('#reduceMotion').is_checked()
 assert page.locator('html').get_attribute('lang')=='uz-Cyrl';assert page.locator('body').get_attribute('class')=='reduce-motion'
 checks.append('language, sound and reduced motion persist after reload')
 layouts=0
 for width in [320,375,768,1366]:
  page.set_viewport_size({'width':width,'height':900})
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   page.locator('#language').select_option(lang)
   for screen in ['home','catalog','theory/equipment','lab/dissolving','result/filtration','settings']:
    page.goto(BASE+'#'+screen);page.evaluate('document.fonts.ready');assert page.locator('h1').count()==1
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,lang,screen)
    assert page.locator('html').get_attribute('lang')==lang
    layouts+=1
    if lang=='ru' and width in [375,768,1366] and screen=='lab/dissolving':page.screenshot(path=str(ROOT/'artifacts'/f'stage4-shell-{width}.png'),full_page=True)
 checks.append(f'{layouts} layouts without horizontal page overflow')
 # Topic state retained when changing language.
 page.goto(BASE+'#lab/equipment');page.locator('[data-select=rod]').click();page.locator('#language').select_option('ru');assert page.locator('[data-select=rod]').get_attribute('aria-pressed')=='true'
 # Browser history does not confuse topic identity.
 page.goto(BASE+'#theory/filtration');page.locator('main a.primary').click();page.go_back();assert page.url.endswith('#theory/filtration')
 checks.append('language changes preserve selection; browser Back preserves route')
 page.goto(BASE+'#settings');page.locator('[data-action=reset]').click();assert page.locator('dialog').is_visible();page.locator('[data-action=cancel]').click();assert not page.locator('dialog').is_visible()
 page.locator('[data-action=reset]').click();page.locator('[data-action=confirmReset]').click();page.reload()
 assert page.evaluate('state.progress')=={};assert not page.locator('#sound').is_checked();assert page.locator('html').get_attribute('lang')=='ru'
 page.goto(BASE+'#result/equipment');assert page.locator('.seal').inner_text()=='○';assert page.evaluate('state.progress')=={}
 checks.append('confirmed reset clears settings/progress; direct result access cannot mark completed')
 page.evaluate("localStorage.setItem(STORAGE_KEY,'{broken')");page.reload();assert page.locator('h1').count()==1
 page.evaluate("localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,settings:{language:'unknown'},progress:{equipment:'hacked'},drafts:{equipment:'<script>'}}))");page.reload();assert page.evaluate('state.progress')=={};assert page.evaluate('state.drafts')=={}
 checks.append('corrupted and invalid stored data recover safely')
 denied=b.new_context();denied.add_init_script("Storage.prototype.setItem=function(){throw new Error('blocked')}");q=denied.new_page();q.goto(BASE);assert q.locator('.storage-note.warning').count()==1;q.goto(BASE+'#catalog');assert q.locator('h1').count()==1
 checks.append('blocked localStorage gives visible warning; navigation still works')
 assert not errors,errors
 report={'status':'passed','checks':checks,'js_errors':errors,'browser':'system Chromium, emulated sizes; no physical-device testing'}
 (ROOT/'artifacts'/'stage4-regression.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));b.close()
