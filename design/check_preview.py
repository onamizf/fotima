"""Проверка только дизайн-прототипа; не тесты учебного приложения."""
import json, pathlib
from playwright.sync_api import sync_playwright
ROOT=pathlib.Path(__file__).resolve().parent
BASE='http://127.0.0.1:8765/'
PAGES=['home','catalog','theory','lab','result','parts']
LANGS=['ru','uz-Latn','uz-Cyrl','en']
issues=[]; count=0
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=browser.new_page()
 page.on('pageerror',lambda e:issues.append({'js':str(e)}))
 for width in [320,375,430,768,1024,1366,1920]:
  page.set_viewport_size({'width':width,'height':900})
  for lang in LANGS:
   for screen in PAGES:
    page.goto(f'{BASE}?page={screen}&lang={lang}')
    page.evaluate('document.fonts.ready')
    page.wait_for_function('document.querySelector("h1")')
    count+=1
    problems=page.evaluate('''() => [...document.querySelectorAll('h1,h2,h3,p,button,select,.panel,.card,.item,.brand')].filter(e=>e.getBoundingClientRect().width>0 && (e.scrollWidth>e.clientWidth+2 || e.getBoundingClientRect().right>innerWidth+1 || e.getBoundingClientRect().left < -1)).map(e=>({tag:e.tagName,text:e.textContent.slice(0,80),width:e.clientWidth,scroll:e.scrollWidth}))''')
    if problems:issues.append({'width':width,'lang':lang,'screen':screen,'problems':problems})
    if lang=='ru' and width in [375,768,1366]:
     device={375:'phone',768:'tablet',1366:'desktop'}[width]
     page.screenshot(path=str(ROOT/'screenshots'/f'{device}-{screen}.png'),full_page=True)
    if screen=='lab' and width in [375,1366]:
     page.screenshot(path=str(ROOT/'screenshots'/f'language-{lang}-{width}.png'),full_page=True)
 # Визуальная последовательность выбора, наливания и наблюдения.
 page.set_viewport_size({'width':768,'height':1000})
 page.goto(BASE+'?page=parts&lang=ru');page.evaluate('document.fonts.ready')
 demo=page.locator('#motion');demo.scroll_into_view_if_needed()
 demo.screenshot(path=str(ROOT/'screenshots'/'motion-1.png'))
 page.locator('#motionAction').click();page.wait_for_timeout(240)
 demo.screenshot(path=str(ROOT/'screenshots'/'motion-2.png'))
 page.locator('#motionAction').click();page.wait_for_timeout(800)
 assert page.locator('#motionStatus').inner_text()=='Вода добавлена. Уровень изменился.'
 demo.screenshot(path=str(ROOT/'screenshots'/'motion-3.png'))
 page.locator('#motionAction').click();assert page.locator('#motionAction').is_disabled()
 page.locator('#motionReset').click();page.locator('#reduce').check()
 page.locator('#motionAction').click();page.locator('#motionAction').click()
 page.wait_for_timeout(60);assert page.locator('#motionStatus').inner_text()=='Вода добавлена. Уровень изменился.'
 # 200% текста и альбомная ориентация.
 for width,height,scale in [(375,900,2),(812,375,1),(1024,768,1)]:
  page.set_viewport_size({'width':width,'height':height})
  for lang in LANGS:
   for screen in PAGES:
    page.goto(f'{BASE}?page={screen}&lang={lang}')
    page.add_style_tag(content=f'body{{font-size:{17*scale}px}} h1{{font-size:{36*scale}px}} h2{{font-size:{28*scale}px}} h3{{font-size:{22*scale}px}} button,select{{font-size:{16*scale}px}}')
    if page.evaluate('document.documentElement.scrollWidth>innerWidth+1'):issues.append({'extra':screen,'width':width,'scale':scale,'lang':lang})
 # Снимок видимого фокуса.
 page.goto(BASE+'?page=parts&lang=ru');page.locator('.focus').first.focus()
 report={'rendered_layouts':count,'extra_layouts':72,'issues':issues,'animation':'select/pour/observe + reset + reduced motion passed','font_loaded':page.evaluate("document.fonts.check('16px Inter')"),'browser':'system Chromium, headless; no physical devices'}
 (ROOT/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 print(json.dumps(report,ensure_ascii=False,indent=2))
 browser.close()
