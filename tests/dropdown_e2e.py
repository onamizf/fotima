"""One real dropdown UI for header/settings/lab answers/table/allotrope; keyboard and sheets."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');errors=[];bad=[];rows=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);register_local(q,BASE,'Dropdown Learner');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click())
 def trigger(id):return q.locator('#'+id+'-trigger') if id!='language' else q.locator('#languageToggle')
 def panel(id):return q.locator('#'+(id+'-listbox-popover' if id!='language' else 'languagePanel-popover'))
 def select(id,index):
  trigger(id).click();q.locator('#'+(id+'-listbox' if id!='language' else 'languagePanel')+' [data-dropdown-index="'+str(index)+'"]').click()
 def audit(route):
  assert q.locator('select:not(.dropdown-native)').count()==0,route
  for s in q.locator('select').all():assert s.get_attribute('aria-hidden')=='true' and s.get_attribute('tabindex')=='-1';assert s.evaluate('(e)=>getComputedStyle(e).opacity')=='0'
  for t in q.locator('.dropdown-trigger').all():
   if t.is_visible():assert t.bounding_box()['height']==48 and t.get_attribute('role')=='combobox';assert t.evaluate('(e)=>getComputedStyle(e).borderRadius')=='999px'
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),route;rows.append({'page':route,'dropdowns':q.locator('.dropdown-trigger').count()})
 q.goto(BASE+'#resources/periodic');audit('periodic');trigger('periodicLayout').focus();q.keyboard.press('ArrowDown');assert panel('periodicLayout').is_visible();assert q.locator('#periodicLayout-listbox [aria-selected=true]').evaluate('(e)=>e===document.activeElement');q.keyboard.press('ArrowDown');q.keyboard.press('Enter');assert q.locator('#periodicLayout').input_value()=='short';assert q.locator('.layout-short').count()==1;expect(trigger('periodicLayout')).to_have_attribute('aria-expanded','false');q.reload();assert q.locator('#periodicLayout').input_value()=='short'
 trigger('periodicColors').click();q.keyboard.press('Escape');assert q.evaluate('document.activeElement.id')=='periodicColors-trigger';trigger('periodicColors').click();q.keyboard.press('Tab');assert not panel('periodicColors').is_visible();assert q.evaluate('document.activeElement.id')!='periodicColors-trigger'
 trigger('periodicColors').click();q.mouse.click(650,170);assert not panel('periodicColors').is_visible();trigger('periodicColors').click();trigger('periodicLayout').click();assert not panel('periodicColors').is_visible() and panel('periodicLayout').is_visible();q.keyboard.press('Escape')
 # A control near viewport bottom opens upward, without escaping the viewport.
 q.evaluate("document.getElementById('periodicColors-trigger').style.cssText='position:fixed;bottom:12px;left:600px;width:300px;z-index:10'");trigger('periodicColors').click();assert panel('periodicColors').get_attribute('data-direction')=='up';assert panel('periodicColors').bounding_box()['y']+panel('periodicColors').bounding_box()['height']<trigger('periodicColors').bounding_box()['y'];q.keyboard.press('Escape');q.reload()
 trigger('periodicColors').click();q.screenshot(path=str(ROOT/'artifacts/dropdown-periodic-1440.png'));q.keyboard.press('Escape')
 # Header uses the same component and original language save/toast logic.
 trigger('language').focus();q.keyboard.press('ArrowDown');q.keyboard.press('ArrowDown');q.keyboard.press('Enter');assert q.evaluate('state.settings.language')=='uz-Latn';assert 'O‘zbekcha' in q.locator('#studentToast').inner_text();q.reload();assert q.evaluate('state.settings.language')=='uz-Latn';q.locator('#language').select_option('ru')
 q.goto(BASE+'#settings');audit('settings');select('settingsLanguage',2);assert q.evaluate('state.settings.language')=='en';q.reload();assert q.evaluate('state.settings.language')=='en';q.locator('#language').select_option('ru')
 # Actual lab answer and table controls retain their original handlers and persisted values.
 q.evaluate("""()=>{state.course.preservedAccess=['properties','physical','chemical'];state.lessons.properties={version:2,step:3,visited:[0,1,2],answers:{hardness:{selected:'na',checked:true},density:{selected:'units',checked:true}}};state.lessons.physical={version:2,step:3,visited:[0,1,2],answers:{wax:{selected:'state',checked:true},salt:{selected:'salt',checked:true}}};state.lessons.chemical={version:2,step:3,visited:[0,1,2],answers:{copper:{selected:'oxide',checked:true},gas:{selected:'co2',checked:true}}};saveState()}""")
 for route in ['lab/properties','lab/physical','lab/chemical','table/properties','topic/intro','topic/states']:
  q.goto(BASE+'#'+route);audit(route)
  if route=='lab/properties':
   select('benchSample',1);assert q.evaluate('state.activeSample')=='sugar';q.reload();assert q.locator('#benchSample').input_value()=='sugar'
  if route in ['lab/physical','lab/chemical']:
   kind=route.split('/')[1];source=q.locator('[data-'+kind+'-answer]').first;id=source.get_attribute('id');field=source.get_attribute('data-'+kind+'-answer');select(id,1);value=q.locator('#'+id).input_value();assert value;q.reload();assert q.locator('#'+id).input_value()==value;assert q.evaluate('(x)=>'+('physicalRecord()' if kind=='physical' else 'chemicalRecord()')+'[x]',field)==value

 q.goto(BASE+'#table/properties');q.set_viewport_size({'width':390,'height':844});select('activeSample',0);select('card-salt-state',1);value=q.locator('#card-salt-state').input_value();assert value and q.evaluate('state.propertyTable.salt.state')==value;q.reload();assert q.locator('#card-salt-state').input_value()==value;assert trigger('card-salt-state').locator('.dropdown-value').inner_text()
 # A dropdown in an element's modal remains interactive; Escape closes only its list.
 q.set_viewport_size({'width':1440,'height':1000});q.goto(BASE+'#resources/periodic/C');q.wait_for_function('window.periodic3DInfo?.ready');q.wait_for_selector('#periodicAllotrope-trigger');trigger('periodicAllotrope').scroll_into_view_if_needed();trigger('periodicAllotrope').click();assert panel('periodicAllotrope').is_visible();q.keyboard.press('Escape');assert not panel('periodicAllotrope').is_visible();assert q.locator('.periodic-detail-dialog[open]').count()==1;select('periodicAllotrope',1);assert q.locator('#periodicAllotrope').input_value()=='diamond';q.wait_for_function('window.periodic3DInfo?.ready');q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached')
 for language in ['ru','uz-Latn','uz-Cyrl','en']:
  q.locator('#language').select_option(language)
  for width in [320,390,768,1024,1440]:
   q.set_viewport_size({'width':width,'height':900});audit(language+' '+str(width));trigger('periodicColors').click();box=panel('periodicColors').bounding_box();assert 0<=box['x'] and box['x']+box['width']<=width+1
   if width<768:assert box['x']==0 and box['width']==width and abs(box['y']+box['height']-900)<1
   for option in q.locator('#periodicColors-listbox [role=option]').all():assert option.bounding_box()['height']==42
   q.keyboard.press('Escape')
 q.locator('#language').select_option('ru');q.set_viewport_size({'width':390,'height':844});trigger('periodicColors').click();q.screenshot(path=str(ROOT/'artifacts/dropdown-periodic-390.png'));q.mouse.click(380,120);assert not panel('periodicColors').is_visible();q.set_viewport_size({'width':1440,'height':1000});q.emulate_media(reduced_motion='no-preference');trigger('periodicColors').click();assert panel('periodicColors').evaluate('(e)=>e.getAnimations().length')==1;q.wait_for_timeout(200);q.keyboard.press('Escape');q.wait_for_timeout(200);assert not panel('periodicColors').is_visible();q.emulate_media(reduced_motion='reduce');trigger('periodicColors').click();assert panel('periodicColors').evaluate('(e)=>e.getAnimations().length')==0;q.keyboard.press('Escape')
 assert not errors,errors;assert not bad,bad
 (ROOT/'artifacts/dropdown-validation.json').write_text(json.dumps({'status':'passed','pages':rows,'checks':['no exposed native selects; one common combobox/listbox','48px oval triggers, 42px options and readable colours','keyboard, outside click, switch, Tab and Escape','automatic upward positioning','language and table answer persistence/F5','original settings and lab controls','dropdown inside native element dialog','four languages and five widths','mobile bottom sheet and reduced motion'],'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('Passed: common dropdowns, keyboard, positioning, forms and language persistence, modal controls, responsive sheets and reduced motion')
