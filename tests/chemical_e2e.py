"""Exercise all eight chemistry variants through the accessible schematic path.
Real WebGL is verified separately in lab3d_e2e.py, not replaced by a mock renderer.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,tempfile
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/')
seed="""()=>{state.lessons.chemical={version:2,step:3,visited:[0,1,2],answers:{copper:{selected:'oxide',checked:true},gas:{selected:'co2',checked:true}}};saveState();}"""
errors=[];flows=0;layouts=0;downloads=0
with sync_playwright() as p,tempfile.TemporaryDirectory() as tmp:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-webgl'])
 for width in [375,768,1366]:
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   c=b.new_context(viewport={'width':width,'height':1000},has_touch=width==375,accept_downloads=True);q=c.new_page();q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE+'#lab/chemical')
   assert q.locator('#chemicalVariant').count()==0;q.evaluate(seed);q.reload();q.locator('#language').select_option(lang)
   assert q.locator('[data-lab3d][data-renderer=fallback]').count()==1
   for variant in ['paper','alcohol','gas','match','copper','chalk','marble','limestone']:
    group=q.evaluate('(id)=>chemicalGroup(id)',variant);q.locator(f'[data-chemical-group={group}]').click();q.locator('#chemicalVariant').select_option(variant)
    q.locator('[data-chemical-step=cleanup]').click();assert q.evaluate('chemicalRecord().actions')==[]
    q.locator('[data-chemical=check]').click();assert not q.evaluate('(id)=>chemicalPassed(id)',variant)
    steps=q.evaluate('(id)=>chemicalGroups[chemicalGroup(id)].steps',variant)
    for step in steps:
     q.locator(f'[data-chemical-step={step}]').click()
     if step in ['ignite','heat','repeatHeat']:
      assert q.evaluate('chemicalSourceOn(chemicalRecord())');q.locator('[data-chemical-group=carbonate]').click();assert q.evaluate('state.chemicalLab.active')==variant
      stop='repeatStop' if step=='repeatHeat' else 'stop';q.locator(f'[data-chemical-step={stop}]').click();assert not q.evaluate('chemicalSourceOn(chemicalRecord())');q.reload();q.locator(f'[data-chemical-step={step}]').click()
     if step=='splint':
      q.locator('[data-chemical-group=burning]').click();assert q.evaluate('state.chemicalLab.active')==variant
     assert not q.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,lang,variant,step);layouts+=1
    assert not q.evaluate('chemicalSourceOn(chemicalRecord())')
    config=q.evaluate('(id)=>chemicalGroups[chemicalGroup(id)]',variant)
    for field in ['observation','explanation']:q.locator(f'[data-chemical-answer={field}]').select_option(config[field+'s'][1])
    q.locator('[data-chemical=check]').click();assert q.locator('[aria-invalid=true]').count()==2
    for field in ['observation','explanation']:q.locator(f'[data-chemical-answer={field}]').select_option(config[field+'s'][0])
    q.locator('[data-chemical=check]').click();assert q.evaluate('(id)=>chemicalPassed(id)',variant);q.reload();assert q.evaluate('(id)=>chemicalPassed(id)',variant);flows+=1
   assert q.evaluate('chemicalLabPassed()');assert q.evaluate('chemicalCount()')==8
   # Undo never relights an extinguished splint or a stopped repeat heating cycle.
   q.locator('[data-chemical-group=copper]').click()
   for _ in range(3):q.locator('[data-chemical=undo]').click()
   assert not q.evaluate('chemicalSourceOn(chemicalRecord())');assert not q.evaluate('chemicalLabPassed()')
   for step in ['repeatHeat','repeatBlacken','repeatStop','repeatCool','cleanup']:q.locator(f'[data-chemical-step={step}]').click()
   q.locator('[data-chemical=check]').click();q.locator('[data-chemical-group=carbonate]').click();q.locator('#chemicalVariant').select_option('limestone')
   for _ in range(2):q.locator('[data-chemical=undo]').click()
   assert not q.evaluate('chemicalSourceOn(chemicalRecord())')
   for step in ['splint','extinguished','cleanup']:q.locator(f'[data-chemical-step={step}]').click()
   q.locator('[data-chemical=check]').click();assert q.evaluate('chemicalLabPassed()')
   q.goto(BASE+'#result/chemical');assert q.locator('[data-chemical-completed=true]').count()==1
   attack='CuO <script>window.bad=1</script> & <img src=x onerror=bad>\nкимёвий ҳодиса'
   q.locator('#chemicalConclusion').fill(attack);q.reload();assert q.locator('#chemicalConclusion').input_value()==attack
   other='ru' if lang!='ru' else 'en';q.locator('#language').select_option(other);assert q.locator('#chemicalConclusion').input_value()==attack;q.locator('#language').select_option(lang)
   with q.expect_download() as d:q.locator('[data-chemical=download]').click()
   file=Path(tmp)/f'{lang}-{width}.html';d.value.save_as(file);html=file.read_text();assert '<script' not in html and '&lt;script&gt;' in html;assert d.value.suggested_filename==f'chemistry7-chemical-{lang}.html';downloads+=1
   offline=c.new_page();offline.set_content(html);assert offline.locator('script,img,link').count()==0;assert attack in offline.inner_text('body');offline.close()
   if lang=='ru':
    q.locator('#chemicalConclusion').fill('При нагревании меди на воздухе образуется чёрный CuO. Это отличается от плавления парафина: в модели меди появляется новое вещество. Вывод о CO₂ основан на известных реагентах и наблюдениях вместе.')
    q.screenshot(path=str(ROOT/'artifacts'/f'chemical-result-{width}.png'),full_page=True)
   # Theory reset invalidates the overall result, not recorded observations.
   q.evaluate('state.lessons.chemical.answers.gas.checked=false;saveState();render(false)');assert q.locator('[data-chemical-completed=false]').count()==1
   q.evaluate('state.lessons.chemical.answers.gas.checked=true;saveState();render(false)')
   q.evaluate("state.propertyReport.conclusion='keep lab1';state.physicalLab.conclusion='keep lab2';saveState()")
   q.locator('[data-chemical-return=copper]').click();q.locator('[data-chemical=reset]').click();q.locator('[data-chemical=cancelReset]').click();assert q.evaluate('chemicalLabPassed()')
   q.locator('[data-chemical=reset]').click();q.locator('[data-chemical=confirmReset]').click();assert q.evaluate('chemicalCount()')==7;assert q.evaluate('state.propertyReport.conclusion')=='keep lab1';assert q.evaluate('state.physicalLab.conclusion')=='keep lab2'
   q.goto(BASE+'#result/chemical')
   with q.expect_download() as d:q.locator('[data-chemical=download]').click()
   f=Path(tmp)/f'incomplete-{lang}-{width}.html';d.value.save_as(f);assert q.evaluate('ct().incomplete') in f.read_text();downloads+=1;c.close()
 q=b.new_page(viewport={'width':320,'height':850});q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE);q.evaluate(seed);q.goto(BASE+'#lab/chemical');q.evaluate("state.chemicalLab={version:1,active:'bad',conclusion:7,records:{paper:{actions:['ignite','cleanup'],checked:true},copper:{actions:['setup'],observation:'bad',checked:true}}};saveState()")
 q.goto(BASE+'#lab/chemical');q.reload();assert q.evaluate('state.chemicalLab.active')=='paper';assert q.evaluate('chemicalCount()')==0;assert q.evaluate('chemicalRecord().actions')==[]
 for width,height,scale in [(320,850,1),(812,375,1),(375,900,2)]:
  q.set_viewport_size({'width':width,'height':height})
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   q.locator('#language').select_option(lang)
   for group in ['burning','copper','carbonate']:
    q.locator(f'[data-chemical-group={group}]').click();config=q.evaluate('(id)=>chemicalGroups[id]',group)
    for field in ['observation','explanation']:q.locator(f'[data-chemical-answer={field}]').select_option(config[field+'s'][0])
    q.add_style_tag(content=f'body,button,select{{font-size:{16*scale}px}} h1{{font-size:{28*scale}px}} h2{{font-size:{23*scale}px}}');assert not q.evaluate('document.documentElement.scrollWidth>innerWidth+1');layouts+=1
 q.locator('[data-chemical-group=burning]').click();q.locator('[data-chemical-step=setup]').focus();q.keyboard.press('Enter');q.locator('[data-chemical-step=ignite]').focus();q.keyboard.press('Space');assert q.evaluate('chemicalRecord().actions')==['setup','ignite']
 q.evaluate('delete state.chemicalLab;saveState()');q.reload();assert q.evaluate('chemicalCount()')==0
 q.goto(BASE+'#settings');q.locator('[data-action=reset]').click();q.locator('[data-action=confirmReset]').click();assert q.evaluate('state.chemicalLab')=={'version':1,'active':'paper','records':{},'conclusion':''}
 denied=b.new_context();denied.add_init_script("Storage.prototype.setItem=function(){throw Error('blocked')}");r=denied.new_page();r.goto(BASE);r.evaluate(seed);r.goto(BASE+'#lab/chemical');r.locator('[data-chemical-step=setup]').click();assert r.locator('.storage-note.warning').count()==1
 assert not errors,errors
 report={'status':'passed','variant_flows':flows,'layout_checks':layouts,'downloads':downloads,'languages':4,'rendering':'schematic/WebGL unavailable path; actual WebGL tested separately','checks':['eight variants including four fuels and three carbonates','theory gate','wrong order rejected','early stop and retry for both copper cycles','no switch with active source','undo does not relight heat or splint','wrong observations and explanations corrected','cleanup required','persistence and translations','safe HTML reports and incomplete result','reset preserves previous laboratories','global reset clears new data','keyboard and long text','old/corrupt data and unavailable storage'],'js_errors':errors,'limits':'Qualitative model and preliminary translations; gas/alcohol composition pending expert review.'}
 (ROOT/'artifacts'/'chemical-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));b.close()
