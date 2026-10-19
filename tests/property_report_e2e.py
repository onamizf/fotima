"""Test report prerequisite, persistence, real downloads and safe offline documents."""
import json,os,tempfile,threading
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/')
errors=[];layouts=0;downloads=0
seed="""()=>{state.lessons.properties={version:2,step:3,visited:[0,1,2],answers:{hardness:{selected:'na',checked:true},density:{selected:'units',checked:true}}};saveState();}"""
with tempfile.TemporaryDirectory(prefix='fotima-reports-') as tmp:
 class Quiet(SimpleHTTPRequestHandler):
  def log_message(self,*args):pass
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=tmp));threading.Thread(target=server.serve_forever,daemon=True).start()
 try:
  with sync_playwright() as p:
   b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
   for width in [375,768,1366]:
    for lang in ['ru','uz-Latn','uz-Cyrl','en']:
     c=b.new_context(viewport={'width':width,'height':1000},accept_downloads=True,has_touch=width==375);page=c.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.goto(BASE+'#result/properties')
     assert page.locator('h1').count()==1;page.locator('#language').select_option(lang)
     page.locator('[name=propertyComparison][value=different]').check();page.locator('[data-report=check]').click();assert not page.evaluate('comparisonPassed()');assert page.locator('#comparisonFeedback').inner_text()==page.evaluate('rt().needSamples')
     # No invented observations appear in an incomplete export.
     with page.expect_download() as d:page.locator('[data-report=download]').click()
     path=Path(tmp)/f'blank-{lang}-{width}.html';d.value.save_as(path);text=path.read_text();assert page.evaluate('rt().noObservation') in text;assert '0 / 12' in text
     page.evaluate(seed)
     for sample in ['salt','sulfur']:
      page.goto(BASE+'#lab/properties');page.locator('#benchSample').select_option(sample)
      for step in ['inspect','water','add','stir','reference']:page.locator(f'[data-investigation={step}]').click()
      card=page.evaluate('(id)=>sampleCards[sampleIds.indexOf(id)]',sample)
      for field,value in zip(['state','color','solubility'],[card[0],card[1],card[3]]):page.locator(f'[data-observe={field}]').select_option(value)
      page.locator('[data-observe=explanation]').select_option(page.evaluate('(id)=>expectedExplanation(id)',sample));page.locator('[data-investigation=check]').click()
     page.goto(BASE+'#result/properties');page.locator('[name=propertyComparison][value=reaction]').check();page.locator('[data-report=check]').click();assert not page.evaluate('comparisonPassed()')
     assert page.locator('#comparisonFeedback').inner_text()==page.evaluate('rt().compareWrong')
     page.locator('[name=propertyComparison][value=different]').check();page.locator('[data-report=check]').click();assert page.evaluate('comparisonPassed()')
     malicious='Вывод <img src=x onerror="window.hacked=1"> & </textarea><script>window.hacked=1</script>\nIkki modda — икки модда.'
     page.locator('#reportConclusion').fill(malicious)
     page.evaluate("state.tableSource='<script>bad source</script> & source';state.propertyTable.salt={state:'liquid',density:'<img src=x onerror=bad> g/cm³',hardness:' '};saveState()")
     page.reload();assert page.locator('#reportConclusion').input_value()==malicious;assert page.evaluate('comparisonPassed()');assert page.evaluate('reportFilledCells()')==2
     other='en' if lang!='en' else 'ru';page.locator('#language').select_option(other);assert page.locator('#reportConclusion').input_value()==malicious;page.locator('#language').select_option(lang)
     page.locator('.report-reference').first.locator('summary').click();assert page.locator('img[src=x]').count()==0;assert page.evaluate('typeof window.hacked')=='undefined'
     assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1');layouts+=1
     with page.expect_download() as d:page.locator('[data-report=download]').click()
     exported=Path(tmp)/f'report-{lang}-{width}.html';d.value.save_as(exported);html=exported.read_text();assert '&lt;script&gt;' in html;assert '<script' not in html;assert '2 / 12' in html
     assert d.value.suggested_filename==f'chemistry7-properties-{lang}.html';downloads+=2
     # A real standalone HTML file works without app scripts, fonts or a localStorage dependency.
     doc=c.new_page();req=[];doc.on('request',lambda r:req.append(r.url));doc.on('pageerror',lambda e:errors.append(str(e)))
     doc.goto(f'http://127.0.0.1:{server.server_port}/{exported.name}')
     assert doc.locator('h1').inner_text()==page.evaluate('rt().title');assert doc.locator('script,img,link').count()==0
     assert malicious in doc.inner_text('body');assert doc.evaluate('typeof window.hacked')=='undefined';assert len(req)==1,req
     assert not doc.evaluate('document.documentElement.scrollWidth>innerWidth+1');layouts+=1
     doc.emulate_media(media='print');assert doc.locator('h1').is_visible();doc.close()
     # Good screenshots use ordinary demonstration text, not the injection fixture.
     if lang=='ru':
      page.locator('#reportConclusion').fill('Соль и сера — твёрдые вещества. Соль белая и растворяется в воде, сера жёлтая и остаётся различимой. Цвет и поведение в воде помогают различить образцы.')
      page.evaluate("state.propertyTable={};state.tableSource='';saveState()");page.reload();page.evaluate('document.fonts.ready')
      page.screenshot(path=str(ROOT/'artifacts'/f'property-report-{width}.png'),full_page=True)
     # Undoing required evidence invalidates the comparison as well.
     page.locator('[data-report-sample=sulfur]').click();assert page.locator('#benchSample').input_value()=='sulfur';page.locator('[data-investigation=undo]').click();page.goto(BASE+'#result/properties');assert not page.evaluate('comparisonPassed()')
     # Whitespace is not treated as a conclusion. Corrupt and older state recover.
     page.locator('#reportConclusion').fill('   ');assert page.locator('#conclusionStatus').inner_text()==page.evaluate('rt().conclusionMissing')
     page.evaluate("state.propertyReport={version:1,comparison:'<bad>',checked:true,conclusion:5};saveState()");page.reload();assert page.evaluate('state.propertyReport')=={'version':1,'comparison':'','checked':False,'conclusion':''}
     page.evaluate('delete state.propertyReport;saveState()');page.reload();assert page.locator('#reportConclusion').input_value()==''
     c.close()
   # Keyboard and enlarged text on the narrowest supported screen.
   page=b.new_page(viewport={'width':320,'height':900});page.goto(BASE+'#result/properties')
   for lang in ['ru','uz-Latn','uz-Cyrl','en']:
    page.locator('#language').select_option(lang);page.add_style_tag(content='body,button,textarea,input{font-size:32px} h1{font-size:48px} h2{font-size:40px}')
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1');layouts+=1
   page.locator('[name=propertyComparison][value=different]').focus();page.keyboard.press('Space');assert page.evaluate('state.propertyReport.comparison')=='different'
   page.locator('#reportConclusion').fill('Сохранить вывод при очистке таблицы')
   page.goto(BASE+'#table/properties');page.locator('[data-action=resetTable]').click();page.locator('[data-action=confirmTable]').click();assert page.evaluate('state.propertyReport.conclusion')=='Сохранить вывод при очистке таблицы'
   page.goto(BASE+'#settings');page.locator('[data-action=reset]').click();page.locator('[data-action=confirmReset]').click();assert page.evaluate('state.propertyReport')=={'version':1,'comparison':'','checked':False,'conclusion':''}
   denied=b.new_context();denied.add_init_script("Storage.prototype.setItem=function(){throw Error('blocked')}");q=denied.new_page();q.goto(BASE+'#result/properties');q.locator('#reportConclusion').fill('Не потерять в памяти');assert q.locator('.storage-note.warning').count()==1;assert q.evaluate('state.propertyReport.conclusion')=='Не потерять в памяти'
   assert not errors,errors
   result={'status':'passed','languages':4,'layouts':layouts,'downloads':downloads,'checks':['empty reports stay incomplete','salt and sulfur observations required','wrong comparison corrected','language/reload preserves text and answer','undo invalidates comparison','whitespace excluded from counts','confirmed observations separate from manual table','real HTML downloads and filenames','standalone document loads with no app scripts or remote resources','user text escaped on screen and in export','print stylesheet','320px and enlarged text','keyboard','old/corrupt report state','storage denial warning','table-only reset preserves report','global reset clears report'],'js_errors':errors,'limits':'Reference values and free-text meaning are not graded; full laboratory credit remains unavailable; Chromium emulation only.'}
   (ROOT/'artifacts'/'property-report-validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False,indent=2));b.close()
 finally:server.shutdown();server.server_close()
