"""Reproduce an old cached release, then load the new Pages bundle without clearing learner data."""
import hashlib,importlib.util,json,subprocess,tempfile,threading
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('build_site',ROOT/'tools/build_site.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
with tempfile.TemporaryDirectory(prefix='fotima-cached-release-') as temp:
 root=Path(temp);old=root/'old';new=root/'new';module.build(old);module.build(new)
 legacy_index=subprocess.check_output(['git','show','a604f83:index.html'],cwd=ROOT).decode();legacy_parser=module.Entrypoint();legacy_parser.feed(legacy_index)
 for name in ['index.html',*legacy_parser.files]:
  (old/name).parent.mkdir(parents=True,exist_ok=True);(old/name).write_bytes(subprocess.check_output(['git','show','a604f83:'+name],cwd=ROOT))
 active={'root':old}
 class Handler(SimpleHTTPRequestHandler):
  def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(active['root']),**kwargs)
  def end_headers(self):
   path=urlsplit(self.path).path
   self.send_header('Cache-Control','public, max-age=31536000, immutable' if path.endswith(('.js','.css')) else 'no-store');super().end_headers()
  def log_message(self,*args):pass
 server=ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
 try:
  with sync_playwright() as p:
   b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':407,'height':812});errors=[];q.on('pageerror',lambda e:errors.append(str(e)))
   q.goto(base+'#register');q.locator('[name=username]').fill('Cached Learner');q.locator('[name=password]').fill('cache-pass-123');q.locator('[name=repeat]').fill('cache-pass-123');q.locator('.auth-submit').click();q.wait_for_url('**/#catalog');q.goto(base+'#theory/properties');
   for step in [0,1,2,3]:q.locator(f'[data-step="{step}"]').first.click()
   for key,value in [('hardness','na'),('density','units')]:q.locator(f'input[name="{key}"][value="{value}"]').check();q.locator(f'[data-check="{key}"]').click()
   q.goto(base+'#table/properties');q.locator('[data-cell="salt.state"]:visible').select_option('solid')
   account=q.evaluate('LocalAuth.currentUser().id');q.locator('#navigationToggle').click();oldbox=q.locator('#profileMenu').bounding_box();assert oldbox['y']>0 and oldbox['height']<812
   active['root']=new
   q.goto(base+'?v=1.0.0#home');q.wait_for_selector('.student-dashboard');
   if q.locator('#earnedDialog[open]').count():q.locator('#earnedDialog button').click()
   assert q.evaluate('state.course.legacy');assert q.evaluate('CourseModel.theoryRead("properties")');assert q.evaluate('CourseModel.unlocked("properties")');q.emulate_media(reduced_motion='reduce');assert q.evaluate('LocalAuth.currentUser().id')==account;assert q.evaluate('state.propertyTable.salt.state')=='solid'
   assert q.locator('.header-logout').count()==0;q.locator('#navigationToggle').click();box=q.locator('#profileMenu').bounding_box();assert box['x']==0 and box['y']==0 and box['height']==812,box;assert q.locator('#profileMenu [data-profile-logout]').count()==0
   q.screenshot(path=str(ROOT/'artifacts/sidebar-full-height-407.png'));q.keyboard.press('Escape');q.screenshot(path=str(ROOT/'artifacts/home-release-407.png'),full_page=True)
   q.locator('#profileToggle').click();assert q.locator('.header-profile-popover [data-profile-logout]').is_visible()
   assert q.locator('meta[name=application-version]').get_attribute('content')=='1.0.0'
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');assert not errors,errors;b.close()
 finally:server.shutdown();server.server_close()
print('Passed: reproduced old floating sidebar; new versioned release bypasses cached JS/CSS, opens home, removes standalone logout and fills viewport; account/progress retained')
