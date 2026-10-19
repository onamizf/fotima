from pathlib import Path
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parents[1];BASE='http://127.0.0.1:8000/'
errors=[];flows=0
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width,mode in [(375,'touch'),(768,'mouse'),(1366,'keyboard')]:
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   context=browser.new_context(viewport={'width':width,'height':950},has_touch=mode=='touch',is_mobile=mode=='touch')
   page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
   def use(selector,kind='button'):
    el=page.locator(selector).last;el.scroll_into_view_if_needed()
    if mode=='keyboard':el.focus();el.press('Space' if kind in ['checkbox','radio'] else 'Enter')
    elif mode=='touch':el.tap()
    else:el.click()
   def choose(item,target):use(f'[data-lab-select="{item}"]');use(f'[data-zone="{target}"]')
   def val(script):return page.evaluate(script)
   page.goto(BASE+'#result/equipment');assert not val('equipmentPassed()')
   page.locator('#language').select_option(lang);page.goto(BASE+'#theory/equipment')
   for step in [1,2,3]:use(f'[data-step="{step}"]')
   for question,answer in [('prepare','read'),('support','rack')]:use(f'input[name="{question}"][value="{answer}"]','radio');use(f'[data-check="{question}"]')
   page.locator('.lesson-summary a').click();page.locator('[data-lab-select]').first.wait_for()
   choose('tube','rack');assert val('benchMessage.key')=='labNeedProtection';assert val('state.equipment.actions.length')==0
   if mode=='keyboard':page.keyboard.press('Escape');assert val('state.equipment.selected') is None
   use('[data-bench="hint"]');assert val('state.equipment.actions.length')==0
   for item in ['rules','goggles','coat']:use(f'[data-protection="{item}"]','checkbox')
   use('[data-bench="ready"]');assert val('currentBench().ready')
   choose('tube','rack');assert val('benchMessage.key')=='labNeedRack'
   choose('funnel','tools');assert val('benchMessage.key')=='labWrongZone'
   choose('rod','tools');choose('beaker','bench');choose('rack','bench')
   page.reload();assert set(val('currentBench().placed'))=={'rod','beaker','rack'}
   change='en' if lang!='en' else 'ru';page.locator('#language').select_option(change);assert val('currentBench().ready');page.locator('#language').select_option(lang)
   choose('tube','rack');assert val('benchPrepared(currentBench())')
   use('[data-lab-select="rack"]');use('[data-bench="return"]');assert val('benchMessage.key')=='labRackOccupied'
   use('[data-bench="undo"]');assert 'tube' not in val('currentBench().placed')
   choose('tube','rack');assert val('benchPrepared(currentBench())')
   # A return invalidates explanations and can be corrected.
   use('[data-lab-select="beaker"]');use('[data-bench="return"]');assert not val('benchPrepared(currentBench())');choose('beaker','bench')
   use('input[name="support"][value="edge"]','radio');use('[data-question="support"] button')
   use('input[name="purpose"][value="stir"]','radio');use('[data-question="purpose"] button')
   assert page.locator('[data-question="support"] [data-lab-correct="false"]').count()==1
   use('[data-bench="clean"]');assert val('benchMessage.key')=='labExplainFirst';assert not val('equipmentPassed()')
   use('input[name="support"][value="rack"]','radio');use('[data-question="support"] button');assert val('benchExplained(currentBench())')
   # A changed but unverified answer is not accepted by cleanup.
   use('input[name="purpose"][value="measure"]','radio');assert not val('benchExplained(currentBench())')
   page.reload();assert page.locator('input[name="purpose"][value="measure"]').is_checked()
   use('[data-bench="clean"]');assert val('benchMessage.key')=='labExplainFirst'
   use('input[name="purpose"][value="stir"]','radio');use('[data-question="purpose"] button')
   page.reload();assert val('benchExplained(currentBench())')
   assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
   page.evaluate('document.fonts.ready');page.mouse.move(0,0);page.evaluate('window.scrollTo(0,0)')
   page.screenshot(path=str(ROOT/'artifacts'/f'stage5-{lang}-{width}.png'),full_page=True)
   use('[data-bench="clean"]');page.wait_for_url('**/#result/equipment');assert val('equipmentPassed()');assert val('benchComplete(currentBench())')
   page.reload();assert val('equipmentPassed()')
   if lang=='ru':page.screenshot(path=str(ROOT/'artifacts'/f'stage5-result-{width}.png'),full_page=True)
   page.goto(BASE+'#lab/equipment');page.locator('[data-bench="repeat"]').wait_for();use('[data-bench="repeat"]');page.locator('[data-bench="ready"]').wait_for();assert not val('currentBench().ready');assert val('equipmentPassed()')
   use('[data-protection="rules"]','checkbox');use('[data-bench="reset"]');assert page.locator('#benchReset').is_visible();use('[data-bench="resetCancel"]');assert val('currentBench().protection.rules')
   use('[data-bench="reset"]');use('[data-bench="resetConfirm"]');assert val('state.equipment.actions.length')==0;assert val('equipmentPassed()');assert val('lessonPassed("equipment")')
   flows+=1;context.close()
 # Drag-and-drop is optional but functional; the failed drop must not move anything.
 context=browser.new_context(viewport={'width':1366,'height':1100});page=context.new_page();page.goto(BASE+'#theory/equipment')
 for step in [1,2,3]:page.locator(f'[data-step="{step}"]').last.click()
 for q,a in [('prepare','read'),('support','rack')]:page.locator(f'input[name="{q}"][value="{a}"]').check();page.locator(f'[data-check="{q}"]').click()
 page.locator('.lesson-summary a').click();page.locator('[data-lab-select]').first.wait_for()
 for item in ['rules','goggles','coat']:page.locator(f'[data-protection="{item}"]').check()
 page.locator('[data-bench="ready"]').click()
 page.locator('[data-lab-select="tube"]').drag_to(page.locator('[data-zone="bench"]'));assert page.evaluate('currentBench().placed.length')==0
 page.locator('[data-lab-select="beaker"]').drag_to(page.locator('[data-zone="bench"]'));assert page.evaluate('currentBench().placed.includes("beaker")')
 # Confirm narrow screen/landscape and reduced-motion layout without changing logic.
 for width,height in [(320,800),(812,375),(1024,768)]:
  page.set_viewport_size({'width':width,'height':height})
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   page.locator('#language').select_option(lang);assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,lang)
 page.emulate_media(reduced_motion='reduce');assert page.locator('[data-zone="bench"]').is_visible()
 assert not errors,errors
 report={'status':'passed','full_flows':flows,'languages':4,'input_modes':['touch taps','mouse clicks','keyboard only','optional native drag-and-drop'],'checks':['protection required','rack required before tube','invalid drop and wrong zone do not alter scene','independent item order','return and occupied rack','undo','wrong/correct explanation','unsubmitted changed answer cannot pass','cleanup required','reload and language preserve attempt','repeat keeps previous completion','reset confirmation and cancel','theory retained','320px/375px/tablet/desktop/landscape','reduced motion'],'js_errors':errors,'limitations':'Chromium emulation; no physical-device or teacher validation'}
 (ROOT/'artifacts'/'stage5-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
