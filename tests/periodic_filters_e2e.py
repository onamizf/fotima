"""All colour-mode groups, union/intersection, actual dim-tile clicks and scientific detail/history."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');errors=[];bad=[];checks=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);register_local(q,BASE,'Фотима');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.wait_for_timeout(2800);q.goto(BASE+'#resources/periodic')
 def mode(value):
  q.locator('#periodicColors-trigger').click();q.locator('#periodicColors-listbox [data-dropdown-index="'+str(['blocks','categories','metals','states'].index(value))+'"]').click()
 def active_symbols():return sorted(q.locator('.el--match').evaluate_all('(es)=>es.map(e=>e.dataset.element)'))
 initial=q.evaluate('JSON.stringify(ElementsData.elements)');xp=q.evaluate('CourseGame.xp()');schema=q.evaluate('Object.fromEntries(Object.entries(COLOR_MODES).map(([k,m])=>[k,{field:m.field,keys:Object.keys(m.colors)}]))')
 for name,data in schema.items():
  mode(name);assert q.locator('.el--dim,.el--match').count()==0;assert q.locator('[data-periodic-filter]').count()==len(data['keys'])+1
  for key in data['keys']:
   chip=q.locator('[data-periodic-filter="'+key+'"]');chip.click();expected=q.evaluate('([field,key])=>PeriodicModel.elements.filter(e=>e[field]===key).map(e=>e.symbol)',[data['field'],key]);assert active_symbols()==sorted(expected),(name,key)
   assert q.locator('.el--dim').count()==118-len(expected);expect(chip).to_have_attribute('aria-pressed','true');assert str(len(expected))+' / 118' in q.locator('#periodicSearchStatus').inner_text()
   dim=q.locator('.el--dim').first
   if dim.count():
    style=dim.evaluate('(e)=>({opacity:getComputedStyle(e).opacity,bg:getComputedStyle(e).backgroundColor,color:getComputedStyle(e).color,shadow:getComputedStyle(e).boxShadow})');assert style=={'opacity':'1','bg':'rgba(255, 255, 255, 0.1)','color':'rgba(255, 255, 255, 0.35)','shadow':'none'},style
   if expected:
    assert q.locator('.el--match').first.evaluate('(e)=>getComputedStyle(e).color')=='rgb(11, 30, 74)';assert chip.evaluate('(e)=>getComputedStyle(e).color')=='rgb(11, 30, 74)'
   chip.click();assert q.locator('.el--dim,.el--match').count()==0;checks.append({'mode':name,'group':key,'count':len(expected)})
  a,c=data['keys'][:2];q.locator('[data-periodic-filter="'+a+'"]').click();q.locator('[data-periodic-filter="'+c+'"]').click();expected=q.evaluate('([field,keys])=>PeriodicModel.elements.filter(e=>keys.includes(e[field])).map(e=>e.symbol)',[data['field'],[a,c]]);assert active_symbols()==sorted(expected);assert q.locator('[data-periodic-filter][aria-pressed=true]').count()==2;q.locator('[data-periodic-filter=""]').click();assert q.locator('.el--dim').count()==0
 assert q.evaluate('CourseGame.xp()')==xp;assert q.evaluate('JSON.stringify(ElementsData.elements)')==initial
 mode('metals');q.locator('[data-periodic-filter=metal]').click();q.locator('[data-periodic-filter=metalloid]').click();q.locator('#periodicSearch').fill('Ge');assert active_symbols()==['Ge'];q.locator('[data-periodic-filter=metalloid]').click();assert active_symbols()==[];q.locator('#periodicSearch').fill('');q.screenshot(path=str(ROOT/'artifacts/periodic-filter-metals-1440.png'))
 # Even faded Ge remains a real clickable button, with the original detail and once-only XP.
 q.locator('[data-element=Ge]').click();q.wait_for_function('window.periodic3DInfo?.ready');assert q.locator('.reference-symbol').inner_text()=='Ge';assert q.locator('.reference-mass b').inner_text()=='72,630';assert q.evaluate('CourseGame.xp()')==xp+2;q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached');assert q.locator('[data-element=Ge]').get_attribute('class').find('el--dim')>=0
 q.locator('[data-periodic-filter=""]').click();q.locator('#periodicLayout-trigger').click();q.locator('#periodicLayout-listbox [data-dropdown-index="1"]').click();assert q.locator('[data-element]').count()==118;mode('blocks');q.locator('[data-periodic-filter=d]').click();assert q.locator('.el--match').count()==q.evaluate('PeriodicModel.elements.filter(e=>e.block==="d").length')
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.locator('#language').select_option(lang)
  for width in [320,390,768,1024,1440]:
   q.set_viewport_size({'width':width,'height':900});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,width)
   for c in q.locator('[data-periodic-filter]').all():assert c.evaluate('(e)=>getComputedStyle(e).color')=='rgb(11, 30, 74)'
 q.locator('#language').select_option('ru');q.set_viewport_size({'width':390,'height':844});q.screenshot(path=str(ROOT/'artifacts/periodic-filter-390.png'))
 # Normal motion: stagger follows atomic number, while dim tiles still reveal on hover.
 q.set_viewport_size({'width':1440,'height':1000});q.emulate_media(reduced_motion='no-preference');q.locator('[data-periodic-filter=""]').click();q.locator('[data-periodic-filter=s]').click();delay=q.locator('[data-element=He]').evaluate('(e)=>getComputedStyle(e).transitionDelay');assert '.006s' in delay or '0.006s' in delay,delay;q.locator('[data-element=Ge]').hover();expect(q.locator('[data-element=Ge]')).to_have_css('color','rgba(255, 255, 255, 0.8)')
 q.locator('[data-element=Ge]').click();q.wait_for_function('window.periodic3DInfo?.ready');assert q.locator('.periodic-flying-card').count()==1;q.wait_for_selector('.periodic-flying-card',state='detached');assert q.evaluate('CourseGame.xp()')==xp+2;q.locator('[data-periodic-close]').click();q.wait_for_selector('.periodic-detail-dialog',state='detached')
 assert not errors,errors;assert not bad,bad
 (ROOT/'artifacts/periodic-filters-validation.json').write_text(json.dumps({'status':'passed','groups':checks,'checks':['23 groups in four modes','multi-selection union and text-search intersection','solid matching tiles and colour-only dimming','all reset/toggle and actual dim-tile clicks','original Ge detail/mass/FLIP and once-only reward','unchanged element dataset','four languages and five widths','atomic-number stagger, hover and reduced motion'],'js_errors':errors},ensure_ascii=False,indent=2));b.close();print('Passed: all colour-mode filters, multiple groups, search, dim-tile clicks, history/detail data and responsive translations')
