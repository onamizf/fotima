"""Earn badges from real learner flows, then verify history, resume and variant changes."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/');errors=[];layouts=0
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-webgl'])
 q=b.new_page(viewport={'width':1366,'height':1000});q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE+'#progress')
 assert q.locator('[data-achievement-state=locked]').count()==5;assert q.evaluate('state.achievements.earned')==[]
 answers={'properties':{'hardness':'na','density':'units'},'physical':{'wax':'state','salt':'salt'},'chemical':{'copper':'oxide','gas':'co2'}}
 # Theory is read and answered through its own controls, not manufactured as complete.
 for topic,solution in answers.items():
  q.goto(BASE+'#theory/'+topic)
  for step in [0,1,2,3]:q.locator(f'[data-step="{step}"]').first.click()
  for key,value in solution.items():q.locator(f'input[name="{key}"][value="{value}"]').check();q.locator(f'[data-check="{key}"]').click()
  assert q.evaluate('(id)=>lessonPassed(id)',topic)
 assert q.evaluate('state.achievements.earned')==['reader']
 q.goto(BASE+'#lab/properties');q.locator('#benchSample').select_option('copper');q.locator('[data-investigation=inspect]').click();q.goto(BASE+'#home')
 assert q.locator('.progress-resume a').get_attribute('href')=='#lab/properties';q.locator('.progress-resume a').click();assert q.locator('#benchSample').input_value()=='copper'
 assert q.evaluate('observationRecord().actions')==['inspect']
 for sample in q.evaluate('sampleIds'):
  q.locator('#benchSample').select_option(sample)
  for action in ['inspect','water','add','stir','reference']:q.locator(f'[data-investigation={action}]').click()
  row=q.evaluate('(id)=>sampleCards[sampleIds.indexOf(id)]',sample)
  for field,value in zip(['state','color','solubility'],[row[0],row[1],row[3]]):q.locator(f'[data-observe={field}]').select_option(value)
  q.locator('[data-observe=explanation]').select_option(q.evaluate('(id)=>expectedExplanation(id)',sample));q.locator('[data-investigation=check]').click()
 assert q.evaluate('state.achievements.earned')==['reader','observer']
 q.goto(BASE+'#result/properties');q.locator('[name=propertyComparison][value=reaction]').check();q.locator('[data-report=check]').click();assert not q.evaluate('state.achievements.earned.includes("comparer")')
 q.locator('[name=propertyComparison][value=different]').check();q.locator('[data-report=check]').click();assert q.evaluate('state.achievements.earned.includes("comparer")')
 q.goto(BASE+'#lab/physical')
 for task in ['wax','salt','reference']:
  q.locator(f'[data-physical-task={task}]').click();cfg=q.evaluate('(id)=>physicalTasks[id]',task)
  for step in cfg['steps']:q.locator(f'[data-physical-step={step}]').click()
  for field in ['observation','explanation']:q.locator(f'[data-physical-answer={field}]').select_option(cfg[field+'s'][0])
  if task=='reference':
   for sample,value in [('ethanol','alcoholic'),('acid','vinegar'),('ether','unspecified')]:q.locator(f'[data-physical-match={sample}]').select_option(value)
  q.locator('[data-physical=check]').click()
 assert q.evaluate('state.achievements.earned.includes("physical")');assert not q.evaluate('state.achievements.earned.includes("chemical")')
 q.goto(BASE+'#lab/chemical')
 for variant in ['paper','alcohol','gas','match','copper','chalk','marble','limestone']:
  q.locator('.chemical-variant-overview summary').click();q.locator(f'[data-jump-chemical={variant}]').click();assert q.locator('#chemicalVariant').input_value()==variant
  cfg=q.evaluate('(id)=>chemicalGroups[chemicalGroup(id)]',variant)
  for step in cfg['steps']:
   q.locator(f'[data-chemical-step={step}]').click()
   if variant=='paper' and step=='ignite':
    q.locator('.chemical-variant-overview summary').click();q.locator('[data-jump-chemical=copper]').click();assert q.evaluate('state.chemicalLab.active')=='paper'
    assert q.evaluate('document.activeElement.dataset.chemicalStep')=='stop'
    q.locator('[data-chemical-step=stop]').click();q.locator('[data-chemical-step=ignite]').click()
  for field in ['observation','explanation']:q.locator(f'[data-chemical-answer={field}]').select_option(cfg[field+'s'][0])
  q.locator('[data-chemical=check]').click()
 assert q.evaluate('chemicalLabPassed()');assert q.evaluate('state.achievements.earned.length')==5
 # Re-saving and language changes do not duplicate awards.
 q.evaluate('saveState();saveState();saveState()');q.reload();assert q.evaluate('state.achievements.earned.length')==5
 q.goto(BASE+'#progress');assert q.locator('[data-achievement-state=earned]').count()==5
 assert q.locator('[data-progress-topic=properties] [data-topic-status=referencePending]').count()==1
 assert q.locator('[data-progress-topic=physical] [data-topic-status=modelPassed]').count()==1
 assert q.locator('[data-progress-topic=chemical] [data-topic-status=modelPassed]').count()==1
 # Arbitrary manual reference entries must not award full first-lab completion.
 q.evaluate("state.propertyTable=Object.fromEntries(sampleIds.map(id=>[id,Object.fromEntries(tableFields.map(f=>[f.id,f.options?f.options[0]:'unreviewed entry']))]));saveState();render(false)")
 assert q.evaluate('reportFilledCells()')==96;assert q.evaluate('topicProgress("properties").status')=='referencePending'
 q.evaluate('state.propertyTable={};saveState();render(false)')
 saved=q.evaluate('state');Path('/tmp/progress-demo-state.json').write_text(json.dumps(saved,ensure_ascii=False))
 for width in [375,768,1366]:
  q.set_viewport_size({'width':width,'height':1000});q.locator('#language').select_option('ru');q.goto(BASE+'#progress');q.evaluate('document.fonts.ready');q.screenshot(path=str(ROOT/'artifacts'/f'progress-{width}.png'),full_page=True)
 # Complete data remain complete; variant selection never resets another variant.
 q.goto(BASE+'#lab/chemical');q.locator('.chemical-variant-overview summary').click();q.locator('[data-jump-chemical=paper]').focus();q.keyboard.press('Enter');assert q.evaluate('chemicalCount()')==8
 # Selected task reset changes the current status, not a previously earned badge.
 q.goto(BASE+'#lab/physical');q.locator('[data-physical-task=wax]').click();q.locator('[data-physical=reset]').click();q.locator('[data-physical=confirmReset]').click();q.goto(BASE+'#progress')
 assert q.locator('[data-achievement-id=physical][data-achievement-state=history]').count()==1
 assert q.locator('[data-progress-topic=physical] [data-topic-status=inProgress]').count()==1;assert q.evaluate('state.achievements.earned.length')==5
 q.reload();assert q.locator('[data-achievement-id=physical][data-achievement-state=history]').count()==1
 for width,height,scale in [(320,850,1),(375,1000,1),(768,1000,1),(1366,1000,1),(812,375,1),(375,1000,2)]:
  q.set_viewport_size({'width':width,'height':height})
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   q.locator('#language').select_option(lang)
   for route in ['progress','catalog','settings','home']:
    q.goto(BASE+'#'+route);q.add_style_tag(content=f'body,button,select{{font-size:{16*scale}px}}h1{{font-size:{28*scale}px}}h2{{font-size:{23*scale}px}}')
    assert not q.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,lang,route)
    assert 'undefined' not in q.locator('#main').inner_text();layouts+=1
 # View and motion settings persist without overwriting the learning resume location.
 q.goto(BASE+'#lab/chemical');q.locator('.chemical-variant-overview summary').click();q.locator('[data-jump-chemical=marble]').click();q.goto(BASE+'#settings')
 q.locator('#settingsViewMode').select_option('2d');q.locator('#reduceMotion').check();q.reload();assert q.locator('#settingsViewMode').input_value()=='2d';assert q.locator('#reduceMotion').is_checked()
 q.goto(BASE+'#home');q.locator('.progress-resume a').click();assert q.locator('#chemicalVariant').input_value()=='marble';assert q.evaluate('chemicalCount()')==8
 # Old v2 records without the new fields earn from their existing verified evidence.
 old={key:value for key,value in saved.items() if key not in ['achievements','lastLocation']}
 old_context=b.new_context();r=old_context.new_page();r.goto(BASE+'#progress');r.evaluate('(value)=>localStorage.setItem(STORAGE_KEY,JSON.stringify(value))',old);r.reload()
 assert r.evaluate('state.achievements.earned.length')==5;assert r.evaluate('physicalLabPassed()');assert r.evaluate('chemicalLabPassed()');assert r.evaluate('observationCount()')==12
 r.evaluate("state.achievements={version:1,earned:['reader','reader','unknown',5]};state.lastLocation={page:'<bad>',topic:'other'};saveState()");r.reload();assert r.evaluate('state.lastLocation') is None;assert r.evaluate('new Set(state.achievements.earned).size')==5
 # A saved lab URL cannot bypass a theory prerequisite.
 r.evaluate("state.lessons={};state.lastLocation={page:'lab',topic:'chemical'};saveState()");r.goto(BASE+'#home');assert r.locator('.progress-resume a').get_attribute('href')=='#theory/chemical'
 # Confirmed global reset clears awards and the resume pointer.
 q.goto(BASE+'#settings');q.locator('[data-action=reset]').click();q.locator('[data-action=cancel]').click();assert q.evaluate('state.achievements.earned.length')==5
 q.locator('[data-action=reset]').click();q.locator('[data-action=confirmReset]').click();assert q.evaluate('state.achievements.earned')==[];assert q.evaluate('state.lastLocation') is None
 q.goto(BASE+'#progress');assert q.locator('[data-achievement-state=locked]').count()==5
 denied=b.new_context();denied.add_init_script("Storage.prototype.setItem=function(){throw Error('blocked')}");s=denied.new_page();s.goto(BASE+'#progress');s.evaluate('(value)=>{state=value;saveState();render(false)}',saved);assert s.locator('.storage-note.warning').count()==1;assert s.locator('[data-achievement-state=earned]').count()==5
 assert not errors,errors
 report={'status':'passed','languages':4,'layout_checks':layouts,'badges':5,'learner_flows':['three theory quizzes','twelve observations and comparison','three physical tasks','eight chemical variants'],'checks':['no award before its condition','one persistent award per criterion','all eight variant shortcuts preserve progress','active-source shortcut blocked with useful keyboard focus','resume keeps selected sample/variant and screen','unsupported lab resume returns to theory','catalog statuses distinguish reference review','filling reference fields never completes first laboratory','achievement history survives task reset','view/motion/language persistence','old v2 saved evidence migrates without loss','unknown/duplicate awards and resume data sanitised','confirmed full reset clears awards','storage failure visible','320px, landscape and enlarged text'],'js_errors':errors,'limits':'Digital learning achievements, not official grades. Numerical references and expert review remain pending; Chromium emulation.'}
 (ROOT/'artifacts'/'progress-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));b.close()
