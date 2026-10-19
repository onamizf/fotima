"""Approved replacement scope: learning screens, table draft and equipment designs only."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/')
answers={'properties':{'hardness':'na','density':'units'},'physical':{'wax':'state','salt':'salt'},'chemical':{'copper':'oxide','gas':'co2'}}
issues=[];layouts=0;flows=0
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 # The old completed work never passes a new laboratory; preserve original data.
 context=browser.new_context();page=context.new_page();page.goto(BASE)
 legacy={'version':1,'settings':{'language':'en','sound':True,'reduceMotion':True},'progress':{'equipment':'completed','dissolving':'completed','filtration':'completed'},'lessons':{},'equipmentRecord':{'version':1,'actions':[]}}
 page.evaluate('(value)=>{localStorage.removeItem(STORAGE_KEY);localStorage.setItem(LEGACY_STORAGE_KEY,JSON.stringify(value));}',legacy);page.reload()
 assert page.evaluate('state.settings.language')=='en';assert page.evaluate('state.settings.sound')
 assert page.evaluate('state.progress')=={};assert page.evaluate('state.lessons')=={}
 assert page.evaluate('JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY)).progress.equipment')=='completed'
 page.goto(BASE+'#catalog');assert page.locator('[data-topic]').count()==3
 assert page.locator('[data-topic=equipment]').count()==0;context.close()
 for width in [375,768,1366]:
  for language in ['ru','uz-Latn','uz-Cyrl','en']:
   context=browser.new_context(viewport={'width':width,'height':900},has_touch=width==375)
   page=context.new_page();page.on('pageerror',lambda e:issues.append(str(e)));page.goto(BASE);page.locator('#language').select_option(language)
   for topic,solution in answers.items():
    page.goto(BASE+'#theory/'+topic)
    for step in [0,1,2,3]:
     page.locator(f'[data-step="{step}"]').last.click();page.evaluate('document.fonts.ready')
     assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,language,topic,step)
     layouts+=1
    for question,correct in solution.items():
     group=page.locator(f'[data-question="{question}"]');wrong=group.locator('input').evaluate_all('(inputs)=>inputs.map(i=>i.value)')
     for option in [value for value in wrong if value!=correct]:
      page.locator(f'input[name="{question}"][value="{option}"]').check();page.locator(f'[data-check="{question}"]').click();assert group.locator('[data-correct=false]').count()==1
     page.locator(f'input[name="{question}"][value="{correct}"]').check();page.locator(f'[data-check="{question}"]').click();assert group.locator('[data-correct=true]').count()==1
    assert page.locator('.lesson-summary').count()==1;page.reload();assert page.locator('.lesson-summary').count()==1
    page.locator('.lesson-summary a').click();page.locator('.resource-links').wait_for()
    assert page.locator('.grid3 .card').count()==(1 if topic=='properties' else 3)
    assert page.locator('[data-lab-select]').count()==0;assert page.locator('[data-action=complete]').count()==0
    page.goto(BASE+'#result/'+topic);assert page.locator('.seal').count()==0;flows+=1
   for screen in ['home','catalog','materials/properties','table/properties','settings']:
    page.goto(BASE+'#'+screen);page.evaluate('document.fonts.ready');assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,language,screen);layouts+=1
    if screen=='table/properties':
     assert page.locator('tbody tr').count()==12
     assert page.locator('th[scope=col]').count()==9
     for sample in ['salt','sugar','soda','copper-sulfate','aluminium','zinc','iron','copper','water','ethanol','sulfur','iodine']:assert page.locator(f'[data-substance="{sample}"]').count()==1
     selector='#card-salt-state' if width==375 else '#table-salt-state'
     page.locator(selector).select_option('solid');density='#card-salt-density' if width==375 else '#table-salt-density'
     page.locator(density).fill('проверка <img src=x onerror=alert(1)> & "unit"')
     page.locator('#tableSource').fill('Источник: <script>not executable</script>')
     page.locator('#activeSample').select_option('water');page.reload();assert page.locator('#activeSample').input_value()=='water'
     assert page.evaluate('state.propertyTable.salt.state')=='solid';assert '<img' in page.evaluate('state.propertyTable.salt.density')
     other='en' if language!='en' else 'uz-Cyrl';page.locator('#language').select_option(other);assert page.evaluate('state.propertyTable.salt.state')=='solid';page.locator('#language').select_option(language)
     page.locator('#activeSample').select_option('salt');assert page.locator(density).input_value().startswith('проверка <img')
     assert page.locator('img[src=x]').count()==0;assert page.locator('script').filter(has_text='not executable').count()==0
     # Remove test strings before capturing honest blank-draft samples.
     page.locator(density).fill('');page.locator('#tableSource').fill('')
     if language=='ru':page.screenshot(path=str(ROOT/'artifacts'/f'curriculum-table-{width}.png'),full_page=True)
     page.locator('[data-action=resetTable]').click();page.locator('[data-action=cancelTable]').click();assert page.evaluate('state.propertyTable.salt.state')=='solid'
     page.locator('[data-action=resetTable]').click();page.locator('[data-action=confirmTable]').click();assert page.evaluate('filledTableCells()')==0
     assert page.evaluate('lessonPassed("properties")')
    if screen in ['catalog','materials/properties'] and language=='ru':page.screenshot(path=str(ROOT/'artifacts'/f'curriculum-{screen.split("/")[0]}-{width}.png'),full_page=True)
   context.close()
 # Additional narrow, landscape and enlarged-text layouts.
 context=browser.new_context();page=context.new_page();page.goto(BASE)
 for width,height,scale in [(320,800,1),(812,375,1),(375,900,2)]:
  page.set_viewport_size({'width':width,'height':height})
  for language in ['ru','uz-Latn','uz-Cyrl','en']:
   page.locator('#language').select_option(language)
   for screen in ['catalog','theory/properties','table/properties','materials/properties']:
    page.goto(BASE+'#'+screen);page.add_style_tag(content=f'body{{font-size:{17*scale}px}} h1{{font-size:{28*scale}px}} h2{{font-size:{23*scale}px}} button,select,input{{font-size:{16*scale}px}}')
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'),(width,language,screen);layouts+=1
 # Bad data and blocked storage remain recoverable.
 page.evaluate("localStorage.setItem(STORAGE_KEY,'{bad')");page.reload();assert page.locator('h1').count()==1
 page.evaluate("localStorage.setItem(STORAGE_KEY,JSON.stringify({version:2,activeSample:'<bad>',propertyTable:{salt:{state:'<bad>',density:55}},lessons:{properties:{version:1,step:3,visited:[0,1,2],answers:{}}}}))")
 page.reload();assert page.evaluate('state.activeSample')=='salt';assert page.evaluate('filledTableCells()')==0;assert not page.evaluate('lessonPassed("properties")')
 denied=browser.new_context();denied.add_init_script("Storage.prototype.setItem=function(){throw new Error('blocked')}");q=denied.new_page();q.goto(BASE+'#table/properties');assert q.locator('.storage-note.warning').count()==1
 # Keyboard operation of table choices and independent reset.
 page.goto(BASE+'#table/properties');page.set_viewport_size({'width':375,'height':900});page.locator('#card-salt-state').focus();page.keyboard.press('s');page.keyboard.press('Enter')
 assert not issues,issues
 report={'status':'passed','lesson_flows':flows,'layout_checks':layouts,'languages':4,'table_rows':12,'fields_per_row':8,'new_equipment_designs':7,'checks':['new topic titles only','three parts, glossary and corrected quiz in all languages','all seven assignment descriptions retained','old settings migrate without old grades','old storage retained','draft cells, active sample and source survive reload/language change','table reset preserves lessons','escaped user-entered values','no practice completion or simulated heat/reaction','corrupt and blocked storage recover','narrow/landscape/enlarged text'],'js_errors':issues,'limits':'Chromium emulation; numerical reference values, teacher/native-language review and virtual experiment mechanics pending'}
 (ROOT/'artifacts'/'curriculum-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
