"""Stage 4: all three lessons, four languages, errors/corrections and persistence."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1];BASE='http://127.0.0.1:8000/'
solutions={'equipment':{'prepare':'read','support':'rack'},'dissolving':{'composition':'both','disappear':'remains'},'filtration':{'method':'filter','salt-filter':'no'}}
errors=[];flows=0;checked_options=0;layouts=0
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width in [375,768,1366]:
  for language in ['ru','uz-Latn','uz-Cyrl','en']:
   context=browser.new_context(viewport={'width':width,'height':900});page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
   page.goto(BASE);page.locator('#language').select_option(language)
   for topic,answers in solutions.items():
    page.goto(BASE+'#lab/'+topic);assert page.locator('[data-select],[data-lab-select]').count()==0 # No prerequisite bypass.
    page.locator('main a.primary').click()
    assert page.locator('[data-step="3"]').is_disabled()
    for step in [0,1,2]:
     page.locator(f'[data-step="{step}"]').first.click();page.evaluate('document.fonts.ready')
     assert page.locator('.lesson-diagram').count()==1
     assert page.locator('.glossary dt').count()==4
     assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,language,topic,step)
     layouts+=1
     if width in [375,1366] and step==1:
      page.screenshot(path=str(ROOT/'artifacts'/f'stage5-theory-{language}-{topic}-{width}.png'),full_page=True)
    page.locator('[data-step="3"]').last.click()
    assert page.locator('.quiz-question').count()==2
    assert page.locator('.quiz-question button:disabled').count()==2
    for q,correct in answers.items():
     group=page.locator(f'[data-question="{q}"]')
     options=group.locator('input').evaluate_all('(inputs)=>inputs.map(i=>i.value)')
     # Every incorrect option has an explanation and is retryable.
     for option in [o for o in options if o!=correct]:
      page.locator(f'input[name="{q}"][value="{option}"]').check();page.locator(f'[data-check="{q}"]').click()
      assert page.locator(f'[data-question="{q}"] [data-correct="false"]').count()==1
      assert page.locator('.lesson-summary').count()==0
      assert len(page.locator(f'[data-question="{q}"] .quiz-feedback p').inner_text())>15
      page.reload();assert page.locator(f'input[name="{q}"][value="{option}"]').is_checked()
      assert page.locator(f'[data-question="{q}"] [data-correct="false"]').count()==1
      checked_options+=1
     page.locator(f'input[name="{q}"][value="{correct}"]').check()
     assert page.locator(f'[data-question="{q}"] .quiz-feedback').count()==0
     page.locator(f'[data-check="{q}"]').click()
     assert page.locator(f'[data-question="{q}"] [data-correct="true"]').count()==1
     checked_options+=1
    assert page.locator('.lesson-summary').count()==1
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
    page.reload();assert page.locator('.lesson-summary').count()==1
    assert page.evaluate(f'state.progress["{topic}"]')=='started' # theory does not complete the experiment
    changed='en' if language!='en' else 'uz-Cyrl'
    page.locator('#language').select_option(changed);assert page.locator('.lesson-summary').count()==1
    page.locator('#language').select_option(language)
    if width in [375,1366] and topic=='dissolving':page.screenshot(path=str(ROOT/'artifacts'/f'stage5-theory-quiz-{language}-{width}.png'),full_page=True)
    page.locator('.lesson-summary a').click();page.locator('[data-select],[data-lab-select]').first.wait_for();assert page.locator('[data-select],[data-lab-select]').count()==(5 if topic=='equipment' else 3)
    # Repeating only the questions retains reading, other topics and demo state.
    page.goto(BASE+'#theory/'+topic);page.locator('[data-action="resetQuiz"]').click()
    assert page.locator('.quiz-feedback').count()==0;assert page.evaluate(f'state.lessons["{topic}"].visited.length')==3
    page.goto(BASE+'#lab/'+topic);assert page.locator('[data-select],[data-lab-select]').count()==0
    flows+=1
   context.close()
 # Recover invalid stored lesson state rather than accepting a forged passed flag.
 context=browser.new_context();page=context.new_page();page.goto(BASE)
 page.evaluate("localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,lessons:{equipment:{version:99,step:3,visited:[0,1,2],passed:true,answers:{}}}}))")
 page.reload();page.goto(BASE+'#lab/equipment');assert page.locator('[data-select],[data-lab-select]').count()==0
 # Narrow width and enlarged text on actual lessons, glossary and quiz.
 for width,scale in [(320,1),(375,2),(812,1)]:
  page.set_viewport_size({'width':width,'height':600})
  for language in ['ru','uz-Latn','uz-Cyrl','en']:
   page.locator('#language').select_option(language)
   for topic in solutions:
    page.goto(BASE+'#theory/'+topic)
    for step in [0,1,2,3]:
     page.locator(f'[data-step="{step}"]').last.click()
     page.add_style_tag(content=f'body{{font-size:{17*scale}px}} .lesson h1{{font-size:{28*scale}px}} .lesson h2{{font-size:{23*scale}px}} button{{font-size:{16*scale}px}}')
     assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,scale,language,topic,step)
     layouts+=1
 # Keyboard can select and submit, with Enter, an enabled radio answer.
 page.goto(BASE+'#theory/equipment');page.locator('input[value="read"]').focus();page.keyboard.press('Space');page.locator('[data-check="prepare"]').focus();page.keyboard.press('Enter');assert page.locator('[data-question="prepare"] [data-correct="true"]').count()==1
 assert not errors,errors
 report={'status':'passed','lesson_flows':flows,'option_checks':checked_options,'layout_checks':layouts,'languages':4,'lessons':3,'checks':['all incorrect answers explain and can be corrected','correct answers explained','reload preserves chapter, selected answer and feedback','language switch preserves lesson outcome','direct lab access requires theory','theory does not complete experience or grant achievements','retry clears questions without erasing reading','mismatched content version cannot pass','320px, tablet, desktop, landscape and enlarged text','keyboard select and submit'],'js_errors':errors,'limits':'Chromium emulation only; textbook/teacher/native-language review pending'}
 (ROOT/'artifacts'/'stage5-theory-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
