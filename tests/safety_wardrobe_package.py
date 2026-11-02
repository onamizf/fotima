"""Build the real 1.32.0 Pages bundle and exercise wardrobe under /fotima/."""
import importlib.util,json,tempfile,threading,hashlib
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];spec=importlib.util.spec_from_file_location('wardrobe_build',ROOT/'tools/build_site.py');build=importlib.util.module_from_spec(spec);spec.loader.exec_module(build)
with tempfile.TemporaryDirectory(prefix='fotima-wardrobe-pages-') as tmp:
 parent=Path(tmp);out=parent/'fotima';files=build.build(out);meta=json.loads((out/'version.json').read_text());assert meta['version']=='1.32.0'
 for file,digest in meta['assets'].items():assert hashlib.sha256((out/file).read_bytes()).hexdigest()[:16]==digest
 for file in ['src/wardrobe-footwear.js','data/safety-wardrobe.js','src/safety-wardrobe.js','src/safety-wardrobe.css','assets/game/frog-base.webp','assets/game/wardrobe-bg.jpg']:assert file in files
 assert len([f for f in files if f.startswith('assets/game/items/') and f.endswith('.png')])==41
 class Quiet(SimpleHTTPRequestHandler):
  def log_message(self,*args):pass
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(parent)));threading.Thread(target=server.serve_forever,daemon=True).start();base='http://127.0.0.1:'+str(server.server_port)+'/fotima/'
 try:
  with sync_playwright() as p:
   b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1366,'height':768},reduced_motion='reduce');q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));errors=[];bad=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);register_local(q,base,'Pages Wardrobe');q.goto(base+'#safety-wardrobe');q.locator('[data-sw=play]').click();q.locator('[data-sw-category=eyes]').click();q.locator('[data-sw-item=goggles]').click();q.evaluate('async()=>{await Promise.all([...document.querySelectorAll(".sw img")].map(e=>e.decode()))}');assert q.locator('[data-sw-layer=goggles]').count()==1;assert q.evaluate('document.documentElement.scrollHeight<=innerHeight+1');assert q.locator('.sw-world').evaluate('(e)=>e.style.width!==""');assert not errors,errors;assert not bad,bad;b.close()
 finally:server.shutdown()
(ROOT/'artifacts/wardrobe-package-validation.json').write_text(json.dumps({'status':'passed','version':'1.32.0','checks':['real build under /fotima/','41 isolated PNGs and relative source URLs','base and JPEG background included','actual wear interaction and image decoding','desktop viewport fits without document scroll','content-derived script/style cache keys'],'js_errors':errors,'bad_responses':bad},ensure_ascii=False,indent=2));print('PASS production Pages package, /fotima/ paths, cache keys and playable layered wardrobe')
