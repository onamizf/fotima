"""Exercise the constrained qualitative model through its actual controls."""
from pathlib import Path
import json,os
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/')
errors=[];flows=0;layouts=0
# Seed only the already-tested theory prerequisite; all practical actions use UI.
seed="""()=>{state.lessons.properties={version:2,step:3,visited:[0,1,2],answers:{hardness:{selected:'na',checked:true},density:{selected:'units',checked:true}}};saveState();}"""
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width in [375,768,1366]:
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   context=browser.new_context(viewport={'width':width,'height':1000},has_touch=width==375)
   page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.goto(BASE+'#lab/properties')
   assert page.locator('#benchSample').count()==0 # theory prerequisite enforced
   page.evaluate(seed);page.reload();page.locator('#language').select_option(lang)
   page.locator('[data-investigation=stir]').click();assert page.evaluate('observationRecord().actions')==[]
   assert page.locator('#investigationFeedback').inner_text()
   page.locator('[data-investigation=check]').click();assert not page.evaluate('observationPassed("salt")')
   samples=page.evaluate('sampleIds')
   for sample in samples:
    page.locator('#benchSample').select_option(sample)
    for command in ['inspect','reference','water','add','stir']:
     page.locator(f'[data-investigation={command}]').click()
     assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,lang,sample,command)
     layouts+=1
    expected=page.evaluate('(id)=>sampleCards[sampleIds.indexOf(id)]',sample)
    for field,value in zip(['state','color','solubility'],[expected[0],expected[1],expected[3]]):page.locator(f'[data-observe={field}]').select_option(value)
    page.locator('[data-observe=explanation]').select_option('vanished');page.locator('[data-investigation=check]').click()
    assert page.locator('[aria-invalid=true]').count()==1;assert not page.evaluate('(id)=>observationPassed(id)',sample)
    page.locator('[data-observe=explanation]').select_option(page.evaluate('(id)=>expectedExplanation(id)',sample))
    page.locator('[data-investigation=check]').click();assert page.evaluate('(id)=>observationPassed(id)',sample)
    assert page.locator('[data-investigation=copy]').count()==1
    flows+=1
   assert page.evaluate('observationCount()')==12
   page.reload();assert page.evaluate('observationCount()')==12
   page.locator('#benchSample').select_option('salt')
   # Explicit copy has confirmation and preserves unrelated/manual fields.
   page.evaluate("state.propertyTable.salt={density:'manual source',state:'liquid'};saveState()")
   page.locator('[data-investigation=copy]').click();page.locator('[data-investigation=cancelCopy]').click()
   assert page.evaluate('state.propertyTable.salt.state')=='liquid'
   page.locator('[data-investigation=copy]').click();page.locator('[data-investigation=confirmCopy]').click()
   assert page.evaluate('state.propertyTable.salt.state')=='solid'
   assert page.evaluate('state.propertyTable.salt.density')=='manual source'
   page.locator('[data-investigation=undo]').click();assert page.evaluate('observationCount()')==11
   page.reload();assert page.evaluate('observationCount()')==11
   page.locator('[data-investigation=stir]').click();page.locator('[data-investigation=check]').click();assert page.evaluate('observationCount()')==12
   page.locator('[data-investigation=reset]').click();page.locator('[data-investigation=cancelReset]').click();assert page.evaluate('observationCount()')==12
   page.locator('[data-investigation=reset]').click();page.locator('[data-investigation=confirmReset]').click();assert page.evaluate('observationCount()')==11
   assert page.evaluate('state.propertyTable.salt.state')=='solid';assert page.evaluate('lessonPassed("properties")')
   page.locator('#benchSample').select_option('copper-sulfate')
   if lang=='ru':page.screenshot(path=str(ROOT/'artifacts'/f'investigation-{width}.png'),full_page=True)
   page.goto(BASE+'#result/properties');assert page.locator('.observation-summary li').count()==12;assert page.locator('.seal').count()==0
   page.goto(BASE+'#lab/physical');assert page.locator('#benchSample').count()==0
   context.close()
 # Keyboard, reduced motion, large text, corrupt records and blocked persistence.
 page=browser.new_page(viewport={'width':320,'height':850});page.on('pageerror',lambda e:errors.append(str(e)));page.goto(BASE);page.evaluate(seed)
 page.evaluate("state.settings.reduceMotion=true;saveState()");page.goto(BASE+'#lab/properties')
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  page.locator('#language').select_option(lang)
  page.add_style_tag(content='body,button,select{font-size:32px} h1{font-size:48px}')
  assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),lang
  layouts+=1
 page.locator('[data-investigation=inspect]').focus();page.keyboard.press('Enter');assert page.evaluate('observationRecord().actions')==['inspect']
 page.locator('[data-investigation=water]').focus();page.keyboard.press('Space');assert page.evaluate('observationRecord().actions')==['inspect','water']
 assert page.evaluate("getComputedStyle(document.querySelector('.bench-rod')).animationName")=='none'
 page.evaluate("state.investigation={version:1,records:{salt:{actions:['stir','add'],answers:{state:'<bad>',explanation:'vanished'},checked:true},sugar:{actions:['inspect','water','add','stir','reference'],answers:{},checked:true}}};saveState()")
 page.reload();assert page.evaluate('observationRecord().actions')==[];assert page.evaluate('observationCount()')==0
 page.evaluate("state.investigation=null;saveState()");page.reload();assert page.locator('#benchSample').count()==1
 denied=browser.new_context();denied.add_init_script("Storage.prototype.setItem=function(){throw Error('blocked')}")
 q=denied.new_page();q.goto(BASE);q.evaluate(seed);q.evaluate("location.hash='#lab/properties'");q.locator('[data-investigation=inspect]').click();assert q.locator('.storage-note.warning').count()==1;assert q.evaluate('observationRecord().actions')==['inspect']
 assert not errors,errors
 report={'status':'passed','sample_flows':flows,'layout_checks':layouts,'languages':4,'samples':12,'checks':['theory gate','wrong action order rejected','five actions for each sample','incorrect explanation rejected and corrected','12 different sample states','reload preserves checked observations','undo invalidates checked status','confirmed reset preserves table and theory','explicit copy confirmation preserves other cells','keyboard Enter/Space','reduced motion','320px and enlarged text','corrupt records sanitised','storage denial warning'],'js_errors':errors,'limits':'Qualitative draft, no quantitative measurements, no full laboratory credit; Chromium emulation only.'}
 (ROOT/'artifacts'/'investigation-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
