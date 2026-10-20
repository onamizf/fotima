"""Reproduce authenticated-but-blocked progress loading with fault-injected HTTP APIs."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8025/')
UID='33333333-3333-4333-8333-333333333333'
fault={'status':404,'code':'PGRST205'};row=None;writes=[];errors=[]
def api(route):
 global row
 req=route.request;path=req.url.split('.supabase.co',1)[1];body=req.post_data_json if req.post_data else {};status=200;data={}
 if path.startswith('/auth/v1/token'):data={'access_token':UID,'refresh_token':UID,'expires_in':3600,'user':{'id':UID,'email':'fault@example.test'}}
 elif path=='/auth/v1/user':data={'id':UID,'email':'fault@example.test'}
 elif path.startswith('/rest/v1/lab_progress'):
  if fault:status=fault['status'];data={'code':fault['code'],'message':'PRIVATE SERVER DETAILS must not render'}
  else:data=[row] if row else []
 elif path=='/rest/v1/rpc/save_lab_progress':
  writes.append(body)
  if fault:status=fault['status'];data={'code':fault['code']}
  elif body['p_expected']!=(row['revision'] if row else 0):status=409;data={'code':'40001'}
  else:data=body['p_expected']+1;row={'revision':data,'payload':body['p_payload']}
 elif path.startswith('/auth/v1/logout'):data={}
 else:raise AssertionError(path)
 route.fulfill(status=status,content_type='application/json',body=json.dumps(data))
def configure(ctx):
 ctx.route('https://*.supabase.co/**',api)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 ctx=browser.new_context();configure(ctx);q=ctx.new_page();q.on('pageerror',lambda e:errors.append(str(e)))
 q.goto(BASE);q.locator('[data-cloud=login]').click();q.locator('[name=email]').fill('fault@example.test');q.locator('[name=password]').fill('good-password');q.locator('#accountForm .primary').click()
 q.wait_for_selector('.cloud-diagnostic');assert q.evaluate('FotimaCloud.signedIn()');assert q.evaluate('FotimaCloud.gate()')
 assert q.locator('.cloud-diagnostic code').inner_text()=='progress-read · HTTP 404 · PGRST205'
 assert 'PRIVATE SERVER DETAILS' not in q.locator('body').inner_text()
 assert q.locator('[data-cloud=save]').is_disabled();assert len(writes)==0
 # A verified user may choose a local copy; anonymous visitors cannot.
 q.locator('[data-cloud=continue-local]').click();q.wait_for_selector('.level-map');assert q.locator('.cloud-local-note').is_visible()
 q.evaluate("location.hash='theory/properties'");q.wait_for_selector('.lesson')
 assert q.evaluate("state.progress.properties")=='started'
 assert q.evaluate("JSON.parse(localStorage.getItem(STORAGE_KEY+'.cloud')).dirty")
 q.wait_for_timeout(1200);assert len(writes)==0,'unknown remote version must not be overwritten'
 # A reload keeps the local attempt and the same user cache, not the guest cache.
 q.reload();q.wait_for_selector('.cloud-diagnostic');assert q.evaluate("state.progress.properties")=='started'
 # A server-side version discovered later conflicts with the local unknown base; no automatic write.
 fault=None;row={'revision':8,'payload':{'version':2,'settings':{'language':'ru'},'progress':{'chemical':'started'}}}
 q.reload();q.wait_for_function('FotimaCloud.signedIn() && !FotimaCloud.gate()');q.evaluate("location.hash='account'");q.wait_for_function("document.querySelector('[data-cloud-status]')?.textContent.includes('На другом устройстве')")
 assert q.evaluate("state.progress.properties")=='started';assert len(writes)==0
 assert row['payload']['progress']=={'chemical':'started'}
 # Explicit cloud reload can be cancelled, or accepted after offering local download.
 q.on('dialog',lambda d:d.dismiss());q.locator('[data-cloud=load]').click();assert q.evaluate("state.progress.properties")=='started'
 accepted=ctx.new_page();accepted.on('dialog',lambda d:d.accept());accepted.goto(BASE);accepted.wait_for_selector('#accountForm')
 # Sessions are per tab; log in in the second tab. No dirty copy is silently discarded.
 accepted.locator('[data-cloud=login]').click();accepted.locator('[name=email]').fill('fault@example.test');accepted.locator('[name=password]').fill('good-password');accepted.locator('#accountForm .primary').click()
 accepted.wait_for_function('FotimaCloud.signedIn() && !FotimaCloud.gate()');accepted.evaluate("location.hash='account'");accepted.wait_for_function("document.querySelector('[data-cloud-status]')?.textContent.includes('На другом устройстве')")
 accepted.locator('[data-cloud=load]').click();accepted.wait_for_function("state.progress.chemical==='started' && state.progress.properties===undefined")
 # New account starts with no local progress. A permission failure must be explained.
 # Independent profile has no user's browser cache; same fake auth user suffices for a fresh cache.
 second=browser.new_context();configure(second);r=second.new_page();r.on('pageerror',lambda e:errors.append(str(e)))
 fault={'status':403,'code':'42501'};r.goto(BASE);r.locator('[data-cloud=login]').click();r.locator('[name=email]').fill('fault@example.test');r.locator('[name=password]').fill('good-password');r.locator('#accountForm .primary').click();r.wait_for_selector('.cloud-diagnostic')
 assert 'RLS' in r.locator('.cloud-diagnostic').inner_text();assert 'HTTP 403' in r.locator('.cloud-diagnostic code').inner_text()
 layouts=0
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  r.select_option('#language',lang)
  for w in [320,375,768,1366]:
   r.set_viewport_size({'width':w,'height':900});assert r.evaluate('document.documentElement.scrollWidth<=innerWidth+1');layouts+=1
 r.select_option('#language','ru')
 for w in [375,1366]:
  r.set_viewport_size({'width':w,'height':1000});r.screenshot(path=str(ROOT/f'artifacts/cloud-load-error-{w}.png'),full_page=True)
 # 401 requires a new login; the local-continue action is not offered as an auth bypass.
 fault={'status':401,'code':'PGRST301'};r.locator('[data-cloud=load]').click();r.wait_for_function("document.querySelector('.cloud-diagnostic code').textContent.includes('HTTP 401')")
 assert r.locator('[data-cloud=continue-local]').count()==0
 assert not errors,errors
 report={'status':'passed','backend':'Fault-injected mock Supabase; real database cause not yet verified','layouts':layouts,'checks':['authenticated progress-read failure reproduced','HTTP/code diagnostic without raw response or tokens','explicit per-user local continuation','no upload before loading base version','local work survives reload','unknown-base conflict preserves both versions','cloud replacement requires confirmation','403 permissions explanation','401 does not bypass login','four-language layouts'],'page_errors':errors}
 (ROOT/'artifacts/cloud-load-failure-validation.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2));browser.close()
