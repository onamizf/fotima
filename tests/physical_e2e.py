"""Three finite-state physical activities, including wrong paths and real exports."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,tempfile
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/')
errors=[];flows=0;layouts=0;downloads=0
seed="""()=>{state.lessons.physical={version:2,step:3,visited:[0,1,2],answers:{wax:{selected:'state',checked:true},salt:{selected:'salt',checked:true}}};saveState();}"""
with sync_playwright() as p, tempfile.TemporaryDirectory(prefix='fotima-physical-') as tmp:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-webgl'])
 for width in [375,768,1366]:
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   c=b.new_context(viewport={'width':width,'height':1000},has_touch=width==375,accept_downloads=True);page=c.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.goto(BASE+'#lab/physical')
   assert page.locator('[data-physical-task]').count()==0
   page.evaluate(seed);page.reload();page.locator('#language').select_option(lang)
   page.locator('[data-physical-step=heat]').click();assert page.evaluate('physicalRecord().actions')==[]
   page.locator('[data-physical=check]').click();assert page.locator('#physicalFeedback').inner_text()==page.evaluate('pt().needSteps');assert not page.evaluate('physicalLabPassed()')
   for task in ['wax','salt','reference']:
    page.locator(f'[data-physical-task={task}]').click();steps=page.evaluate('(id)=>physicalTasks[id].steps',task)
    for step in steps:
     page.locator(f'[data-physical-step={step}]').click()
     if step=='heat':
      assert page.evaluate('physicalHeating(physicalRecord())')
      page.locator('[data-physical-task=reference]').click();assert page.evaluate('state.physicalLab.active')==task
      # Emergency stop before observation returns to a state with source off.
      page.locator('[data-physical-step=stop]').click();assert not page.evaluate('physicalHeating(physicalRecord())')
      page.reload();assert not page.evaluate('physicalHeating(physicalRecord())')
      page.locator('[data-physical-step=heat]').click()
     assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,lang,task,step);layouts+=1
     if step=='melt':assert page.locator('[data-wax-liquid]').count()==1;assert page.locator('[data-wax-solid]').count()==0
     if step=='solidify':assert page.locator('[data-wax-solid]').count()==1;assert page.locator('[data-wax-liquid]').count()==0
     if step=='stir':assert page.locator('[data-physical-salt]').count()==0
     if step=='evaporate':assert page.locator('[data-physical-crystals]').count()==1
     if task=='salt' and step=='cool' and lang=='ru':page.screenshot(path=str(ROOT/'artifacts'/f'physical-salt-{width}.png'),full_page=True)
    assert not page.evaluate('physicalHeating(physicalRecord())')
    options=page.evaluate('(id)=>physicalTasks[id]',task)
    page.locator('[data-physical-answer=observation]').select_option(options['observations'][1]);page.locator('[data-physical-answer=explanation]').select_option(options['explanations'][1])
    if task=='reference':
     for sample in ['ethanol','acid','ether']:page.locator(f'[data-physical-match={sample}]').select_option('vinegar')
    page.locator('[data-physical=check]').click();assert not page.evaluate('(id)=>physicalTaskPassed(id)',task);assert page.locator('[aria-invalid=true]').count()>=2
    page.locator('[data-physical-answer=observation]').select_option(options['observations'][0]);page.locator('[data-physical-answer=explanation]').select_option(options['explanations'][0])
    if task=='reference':
     for sample,answer in [('ethanol','alcoholic'),('acid','vinegar'),('ether','unspecified')]:page.locator(f'[data-physical-match={sample}]').select_option(answer)
    page.locator('[data-physical=check]').click();assert page.evaluate('(id)=>physicalTaskPassed(id)',task);flows+=1
    page.reload();assert page.evaluate('(id)=>physicalTaskPassed(id)',task)
   assert page.evaluate('physicalLabPassed()');assert page.evaluate('physicalPassedCount()')==3
   page.evaluate("state.lessons.physical.answers.salt.checked=false;saveState()");page.goto(BASE+'#result/physical');assert page.locator('[data-physical-completed=false]').count()==1;assert page.evaluate('physicalReportStatus()')==page.evaluate('t.theoryPending');page.evaluate("state.lessons.physical.answers.salt.checked=true;saveState()");page.goto(BASE+'#lab/physical')
   # Undo never turns a stopped source back on, and removes task completion.
   page.locator('[data-physical-task=salt]').click();page.locator('[data-physical=undo]').click();assert not page.evaluate('physicalLabPassed()');assert not page.evaluate('physicalHeating(physicalRecord())')
   page.locator('[data-physical=undo]').click();page.locator('[data-physical=undo]').click();assert not page.evaluate('physicalHeating(physicalRecord())');assert not page.evaluate("physicalRecord().actions.includes('heat')")
   for step in ['heat','evaporate','stop','cool','cleanup']:page.locator(f'[data-physical-step={step}]').click()
   page.locator('[data-physical=check]').click();assert page.evaluate('physicalLabPassed()')
   page.goto(BASE+'#result/physical');assert page.locator('[data-physical-completed=true]').count()==1
   malicious='Вывод <script>window.hacked=1</script> & <img src=x onerror=bad>\nFizik hodisa — физик ҳодиса'
   page.locator('#physicalConclusion').fill(malicious);page.reload();assert page.locator('#physicalConclusion').input_value()==malicious
   other='en' if lang!='en' else 'ru';page.locator('#language').select_option(other);assert page.locator('#physicalConclusion').input_value()==malicious;page.locator('#language').select_option(lang)
   with page.expect_download() as d:page.locator('[data-physical=download]').click()
   file=Path(tmp)/f'{width}-{lang}.html';d.value.save_as(file);html=file.read_text();assert '<script' not in html and '&lt;script&gt;' in html;assert d.value.suggested_filename==f'chemistry7-physical-{lang}.html';downloads+=1
   offline=c.new_page();offline.set_content(html);assert offline.locator('script,img,link').count()==0;assert malicious in offline.inner_text('body');assert offline.locator('h1').inner_text()==page.evaluate('pt().reportTitle');offline.close()
   if lang=='ru':
    page.locator('#physicalConclusion').fill('Парафин изменил состояние и снова затвердел. Соль осталась в растворе и появилась в виде кристаллов при удалении части воды. В модели это физические явления.');page.screenshot(path=str(ROOT/'artifacts'/f'physical-result-{width}.png'),full_page=True)
   # Reset only one task with confirmation; first-lab data and other tasks stay intact.
   page.evaluate("state.propertyReport.conclusion='keep first lab';saveState()")
   page.locator('[data-physical-return=wax]').click();page.locator('[data-physical=reset]').click();page.locator('[data-physical=cancelReset]').click();assert page.evaluate('physicalLabPassed()')
   page.locator('[data-physical=reset]').click();page.locator('[data-physical=confirmReset]').click();assert not page.evaluate('physicalLabPassed()');assert page.evaluate('physicalPassedCount()')==2;assert page.evaluate('state.propertyReport.conclusion')=='keep first lab'
   assert page.evaluate('lessonPassed("physical")');page.goto(BASE+'#result/physical');assert page.locator('[data-physical-completed=false]').count()==1
   with page.expect_download() as d:page.locator('[data-physical=download]').click()
   empty=Path(tmp)/f'incomplete-{width}-{lang}.html';d.value.save_as(empty);assert page.evaluate('pt().incomplete') in empty.read_text();downloads+=1
   c.close()
 # Unknown/corrupt data, narrow and landscape, keyboard and motion settings.
 page=b.new_page(viewport={'width':320,'height':850});page.goto(BASE);page.evaluate(seed)
 page.evaluate("state.physicalLab={version:1,active:'<bad>',conclusion:5,tasks:{wax:{actions:['heat','cleanup'],checked:true},salt:{actions:['water'],observation:'<script>',checked:true}}};saveState()")
 page.goto(BASE+'#lab/physical');page.reload();assert page.evaluate('state.physicalLab.active')=='wax';assert page.evaluate('physicalPassedCount()')==0;assert page.evaluate('physicalRecord().actions')==[]
 for width,height,scale in [(320,850,1),(812,375,1),(375,900,2)]:
  page.set_viewport_size({'width':width,'height':height})
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   page.locator('#language').select_option(lang)
   for task in ['wax','salt','reference']:
    page.locator(f'[data-physical-task={task}]').click();page.add_style_tag(content=f'body,button,select{{font-size:{16*scale}px}} h1{{font-size:{28*scale}px}} h2{{font-size:{23*scale}px}}')
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,lang,task);layouts+=1
 page.locator('[data-physical-task=wax]').click();page.locator('[data-physical-step=setup]').focus();page.keyboard.press('Enter');page.locator('[data-physical-step=loadWax]').focus();page.keyboard.press('Space');assert page.evaluate('physicalRecord().actions')==['setup','loadWax']
 page.evaluate('state.settings.reduceMotion=true;saveState();render(false)');page.locator('[data-physical-step=heat]').click();assert page.evaluate("getComputedStyle(document.querySelector('.physical-flame')).animationName")=='none'
 page.evaluate('delete state.physicalLab;saveState()');page.reload();assert page.evaluate('physicalPassedCount()')==0
 page.goto(BASE+'#settings');page.locator('[data-action=reset]').click();page.locator('[data-action=confirmReset]').click();assert page.evaluate('state.physicalLab')=={'version':1,'active':'wax','tasks':{},'conclusion':''}
 denied=b.new_context();denied.add_init_script("Storage.prototype.setItem=function(){throw Error('blocked')}");q=denied.new_page();q.goto(BASE);q.evaluate(seed);q.goto(BASE+'#lab/physical');q.locator('[data-physical-step=setup]').click();assert q.locator('.storage-note.warning').count()==1;assert q.evaluate('physicalRecord().actions')==['setup']
 assert not errors,errors
 report={'status':'passed','task_flows':flows,'layout_checks':layouts,'downloads':downloads,'languages':4,'checks':['theory gate and result prerequisite','global reset clears new state','invalid order rejected','three complete tasks','early stop and restart','task switching blocked while heating','wax liquid and solid scenes','salt dissolves and crystals reappear','unknown ether explicitly unspecified','incorrect matches and explanations corrected','cleanup required','undo stop never relights heat','all task states and conclusion survive reload/language','confirmed task reset preserves other tasks and first lab','incomplete report cannot claim pass','HTML downloads escape student text','320px, landscape, enlarged text','keyboard and reduced motion','corrupt/old data and blocked storage'],'js_errors':errors,'limits':'Draft qualitative model; no exact temperatures/concentrations; unspecified ether and teaching content await review; Chromium emulation only.'}
 (ROOT/'artifacts'/'physical-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));b.close()
