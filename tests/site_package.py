"""Check the real Pages payload under /fotima/, not just the repository root."""
import importlib.util,json,tempfile,threading,hashlib
from browser_auth import register_local
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('build_site',ROOT/'tools/build_site.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
with tempfile.TemporaryDirectory(prefix='fotima-pages-') as temp:
    parent=Path(temp);output=parent/'fotima';files=module.build(output)
    assert 'index.html' in files and '.nojekyll' in files and 'version.json' in files
    manifest=json.loads((output/'version.json').read_text());entry=(output/'index.html').read_text()
    for filename,digest in manifest['assets'].items():
        assert digest==hashlib.sha256((output/filename).read_bytes()).hexdigest()[:16]
        assert filename+'?v='+digest in entry
    assert manifest['version']=='1.1.0'
    assert not any(name.endswith('.md') or name.startswith(('tests/','artifacts/','design/','.git/','src/lab/')) for name in files)
    try:module.build(output)
    except ValueError:pass
    else:raise AssertionError('Non-empty package must be rejected')
    class QuietHandler(SimpleHTTPRequestHandler):
        def log_message(self,*args):pass
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(QuietHandler,directory=str(parent)))
    thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
    base=f'http://127.0.0.1:{server.server_port}/fotima/'
    errors=[];responses=[]
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-webgl'])
            page=browser.new_page(viewport={'width':375,'height':900})
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.on('response',lambda response:responses.append((response.url,response.status)))
            page.goto(base+'#catalog');page.evaluate('document.fonts.ready')
            account_gate=page.evaluate('FotimaCloud.configured()')
            if account_gate:
                assert page.locator('#accountForm').count()==1
                assert page.locator('[data-course-topic]').count()==0
                register_local(page,base,'Package Learner')
                assert page.locator('.student-dashboard').count()==1
                page.goto(base+'#catalog')
            assert page.locator('[data-course-topic]').count()==7
            assert page.evaluate("document.fonts.check('16px Inter')")
            for language in ['ru','uz-Latn','uz-Cyrl','en']:
                page.locator('#language').select_option(language)
                for route in ['catalog','theory/properties','table/properties','materials/properties','lab/physical','result/physical','lab/chemical','result/chemical','progress','settings']:
                    page.goto(base+'#'+route);assert page.locator('h1').count()==1
                    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
            page.goto(base+'#table/properties');page.locator('#card-salt-state').select_option('solid');page.reload()
            assert page.locator('#card-salt-state').input_value()=='solid'
            page.goto(base+'404.html');assert '404' in page.title();assert page.locator('#home').get_attribute('href')==base+'#welcome';assert 'radial-gradient' in page.evaluate('getComputedStyle(document.body).backgroundImage')
            page.locator('#home').click();page.wait_for_selector('.entry-hero')
            page.goto(base+'#topic/intro');page.wait_for_selector('.intro-root');page.locator('.intro-road [data-intro-step="0"]').click();page.locator('[data-intro-begin]').click();page.wait_for_function('window.introSceneInfo?.ready===true');assert page.locator('.intro-scene-host').get_attribute('data-renderer')=='svg'
            assert all(name in files for name in ['scenes/core.js','scenes/safety.js','scenes/equipment.js','scenes/bunsen.js','scenes/evaporation.js','scenes/fallback.js'])
            page.goto(base+'#resources/periodic/Ge');page.wait_for_function('window.periodic3DInfo?.ready');assert page.locator('.reference-symbol').inner_text()=='Ge';assert page.evaluate('window.periodic3DInfo.renderer')=='svg';page.reload();page.wait_for_selector('.periodic-detail-dialog[open]');assert page.locator('[data-element]').count()==118
            assert all(name in files for name in ['data/elements.js','data/periodic-i18n.js','src/periodic-model.js','src/periodic.js','src/periodic.css','scenes/periodic.js','assets/elements-data/LICENSE.txt'])
            assert not errors,errors
            assert not [(url,status) for url,status in responses if status>=400],responses
            browser.close()
        report={'status':'passed','package_files':files,'base_path':'/fotima/','checks':['only browser files published','all scripts/styles/font return success','local account gate blocks anonymous catalog','four languages and authenticated routes under project subpath','reload retains table entry','intro lazy modules and SVG fallback load under /fotima/','118-element periodic deep link/F5 and lazy SVG module under /fotima/','non-empty output rejected'],'js_errors':errors,'live_site':'Static package tested locally; deployment completion not independently verified'}
        (ROOT/'artifacts'/'pages-package-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
    finally:server.shutdown();server.server_close()
