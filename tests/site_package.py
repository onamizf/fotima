"""Check the real Pages payload under /fotima/, not just the repository root."""
import importlib.util,json,tempfile,threading
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('build_site',ROOT/'tools/build_site.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
with tempfile.TemporaryDirectory(prefix='fotima-pages-') as temp:
    parent=Path(temp);output=parent/'fotima';files=module.build(output)
    assert 'index.html' in files and '.nojekyll' in files
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
            assert page.locator('[data-topic]').count()==3
            assert page.evaluate("document.fonts.check('16px Inter')")
            for language in ['ru','uz-Latn','uz-Cyrl','en']:
                page.locator('#language').select_option(language)
                for route in ['catalog','theory/properties','table/properties','materials/properties','lab/physical','result/physical','lab/chemical','result/chemical','progress','settings']:
                    page.goto(base+'#'+route);assert page.locator('h1').count()==1
                    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
            page.goto(base+'#table/properties');page.locator('#card-salt-state').select_option('solid');page.reload()
            assert page.locator('#card-salt-state').input_value()=='solid'
            assert not errors,errors
            assert not [(url,status) for url,status in responses if status>=400],responses
            browser.close()
        report={'status':'passed','package_files':files,'base_path':'/fotima/','checks':['only browser files published','all scripts/styles/font return success','four languages and key routes under project subpath','reload retains table entry','non-empty output rejected'],'js_errors':errors,'live_site':'not verified: GitHub Pages activation requires repository settings access'}
        (ROOT/'artifacts'/'pages-package-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
    finally:server.shutdown();server.server_close()
