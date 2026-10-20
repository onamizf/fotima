"""Deterministic Supabase API doubles: browser behavior, not a live backend/RLS test."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8023/')
users={'first@example.test':'11111111-1111-4111-8111-111111111111','second@example.test':'22222222-2222-4222-8222-222222222222'}
rows={};errors=[];requests=[];password_updates=[];outage=False
def api(route):
 req=route.request;path=req.url.split('.supabase.co',1)[1];body=req.post_data_json if req.post_data else {};uid=req.headers.get('authorization','').replace('Bearer ','');status=200;data={}
 requests.append(req.method+' '+path)
 if outage and path.startswith('/rest/'):
  route.fulfill(status=503,content_type='application/json',body='{"code":"unavailable"}');return
 if path.startswith('/auth/v1/settings'):data={'external':{'email':True}}
 elif path.startswith('/auth/v1/signup'):data={'user':{'id':users['first@example.test']}}
 elif path.startswith('/auth/v1/recover'):data={}
 elif path.startswith('/auth/v1/token'):
  email=body.get('email')
  if 'refresh_token' in body: email=next((e for e,u in users.items() if u==body['refresh_token']),None)
  if email not in users or ('password' in body and body['password']!='good-password'):
   status=400;data={'code':'invalid_credentials'}
  else:
   uid=users[email];data={'access_token':uid,'refresh_token':uid,'expires_in':3600,'user':{'id':uid,'email':email}}
 elif path=='/auth/v1/user':
  if req.method=='PUT':password_updates.append(body.get('password'))
  email=next((e for e,u in users.items() if u==uid),None)
  if not email:status=401;data={'code':'bad_jwt'}
  else:data={'id':uid,'email':email}
 elif path.startswith('/auth/v1/logout'):data={}
 elif path.startswith('/rest/v1/lab_progress'):
  if uid not in users.values():status=401
  else:data=[rows[uid]] if uid in rows else []
 elif path=='/rest/v1/rpc/save_lab_progress':
  existing=rows.get(uid)
  if uid not in users.values():status=401
  elif body['p_expected']!=(existing['revision'] if existing else 0):status=409;data={'code':'40001'}
  else:
   data=body['p_expected']+1;rows[uid]={'revision':data,'payload':body['p_payload']}
 else:raise AssertionError(path)
 route.fulfill(status=status,content_type='application/json',body=json.dumps(data))
def configure(ctx):
 if os.environ.get('CLOUD_USE_SITE_CONFIG')!='1':ctx.route('**/src/cloud-config.js',lambda r:r.fulfill(content_type='application/javascript',body="window.FOTIMA_CLOUD_CONFIG={enabled:true,url:'https://rjllssgpppsdjkpjzdrx.supabase.co',publishableKey:'sb_publishable_test'};"))
 ctx.route('https://*.supabase.co/**',api)
def login(q,email):
 q.locator('[data-cloud="login"]').click();q.locator('[name=email]').fill(email);q.locator('[name=password]').fill('good-password');q.locator('#accountForm .primary').click()
 q.wait_for_function('FotimaCloud.signedIn() && !FotimaCloud.gate()');q.wait_for_timeout(150)
def account(q):
 q.evaluate("location.hash='account'");q.wait_for_selector('.cloud-profile')
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 ctx=browser.new_context();configure(ctx);ctx.add_init_script("if(!localStorage.getItem('fotima.chemistry7.curriculum.v2'))localStorage.setItem('fotima.chemistry7.curriculum.v2',JSON.stringify({version:2,settings:{language:'ru'},progress:{chemical:'started'}}))");q=ctx.new_page();q.on('pageerror',lambda e:errors.append(str(e)))
 q.goto(BASE);q.wait_for_selector('#accountForm');assert q.locator('[data-cloud=register]').get_attribute('aria-pressed')=='true'
 # Registration requires email confirmation, without falsely starting a session.
 q.locator('[name=email]').fill('first@example.test');q.locator('[name=password]').fill('good-password');q.locator('#accountForm .primary').click()
 q.wait_for_function("document.querySelector('#accountMessage').textContent.includes('Проверьте почту')");assert not q.evaluate('FotimaCloud.signedIn()')
 # Incorrect password has actionable feedback.
 q.locator('[name=email]').fill('first@example.test');q.locator('[name=password]').fill('wrong-password');q.locator('#accountForm .primary').click();q.wait_for_function("document.querySelector('#accountMessage').textContent.includes('Проверьте почту и пароль')")
 login(q,'first@example.test');q.wait_for_function("document.querySelector('.level-map')!==null")
 first=users['first@example.test'];second=users['second@example.test']
 assert q.evaluate('state.progress.chemical===undefined'), 'guest data must not silently enter the new account'
 q.evaluate("location.hash='theory/properties'");q.wait_for_selector('.lesson');account(q);q.locator('[data-cloud=save]').click()
 q.wait_for_function("document.querySelector('[data-cloud-status]').textContent.includes('сохранён')")
 assert rows[first]['payload']['progress'].get('properties')=='started'
 # Cloud load into another browser and optimistic collision.
 ctx2=browser.new_context();configure(ctx2);r=ctx2.new_page();r.on('pageerror',lambda e:errors.append(str(e)));r.goto(BASE);login(r,'first@example.test')
 assert r.evaluate("state.progress.properties")=='started'
 q.select_option('#language','en');account(q);q.locator('[data-cloud=save]').click();q.wait_for_timeout(250)
 r.select_option('#language','uz-Latn');account(r);r.locator('[data-cloud=save]').click();r.wait_for_function("document.querySelector('[data-cloud-status]').textContent.includes('Boshqa qurilmada')")
 assert rows[first]['payload']['settings']['language']=='en'
 r.on('dialog',lambda d:d.accept());r.locator('[data-cloud=load]').click();r.wait_for_function("state.settings.language==='en'")
 # Recovery request does not expose existence of an account.
 ctx3=browser.new_context();configure(ctx3);s=ctx3.new_page();s.goto(BASE);s.locator('[data-cloud=recover]').click();s.locator('[name=email]').fill('first@example.test');s.locator('#accountForm .primary').click();s.wait_for_function("document.querySelector('#accountMessage').textContent.includes('Если аккаунт')")
 login(s,'second@example.test');assert s.evaluate('Object.keys(state.progress).length')==0
 assert second in rows
 # Offline writes survive reload without replacing the local dirty attempt.
 outage=True;s.select_option('#language','en');account(s);s.locator('[data-cloud=save]').click();s.wait_for_function("document.querySelector('[data-cloud-status]').textContent.includes('Cloud unavailable')")
 assert s.evaluate("JSON.parse(localStorage.getItem(STORAGE_KEY+'.cloud')).dirty")
 s.reload();s.wait_for_function("document.querySelector('[data-cloud-status]').textContent.includes('could not be loaded')")
 assert s.evaluate("state.settings.language")=='en'
 outage=False
 s.on('dialog',lambda d:d.accept())
 # Load confirmation accepts an explicit replacement; cancel in a separate path would keep the cache.
 s.reload();s.wait_for_function('FotimaCloud.signedIn() && !FotimaCloud.gate()');s.wait_for_timeout(200)
 assert rows[second]['payload']['settings']['language']=='en'
 # Recovery callback removes URL tokens and submits a password update.
 ctx4=browser.new_context();configure(ctx4);recovery=ctx4.new_page()
 recovery.goto(BASE+'#access_token='+first+'&refresh_token='+first+'&expires_in=3600&type=recovery')
 recovery.wait_for_selector('[name=password]');recovery.wait_for_function("document.querySelector('#accountForm .primary').textContent.includes(cu().changePassword)")
 assert 'access_token' not in recovery.url
 recovery.locator('[name=password]').fill('replacement-password');recovery.locator('#accountForm .primary').click();recovery.wait_for_function('!FotimaCloud.gate()')
 assert password_updates[-1]=='replacement-password'

 # Session restoration and refresh preserve the active account.
 q.reload();q.wait_for_function('FotimaCloud.signedIn() && !FotimaCloud.gate()');assert q.evaluate('STORAGE_KEY').endswith(first)
 q.evaluate("let v=JSON.parse(sessionStorage.getItem('fotima.auth.session.v1'));v.expires_at=1;sessionStorage.setItem('fotima.auth.session.v1',JSON.stringify(v))")
 q.reload();q.wait_for_function('FotimaCloud.signedIn() && !FotimaCloud.gate()');assert any('refresh_token' in url for url in requests)
 account(q);q.locator('[data-cloud=logout]').click();q.wait_for_selector('#accountForm');assert q.evaluate('STORAGE_KEY')=='fotima.chemistry7.curriculum.v2'
 # Four-language registration layouts; fresh contexts do not share sessions.
 layouts=0
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.select_option('#language',lang)
  for w in [320,375,768,1366]:
   q.set_viewport_size({'width':w,'height':900});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');layouts+=1
 q.select_option('#language','ru')
 for w in [375,768,1366]:
  q.set_viewport_size({'width':w,'height':1000});q.screenshot(path=str(ROOT/f'artifacts/account-{w}.png'),full_page=True)
 assert not errors,errors
 report={'status':'passed','backend':'mocked Supabase HTTP endpoints; no live auth or RLS claim','layouts':layouts,'checks':['confirmation email flow','wrong password','sign-in','cloud save and second-browser load','revision conflict without overwrite','explicit cloud reload','recovery email request','separate account caches','session restore and refresh','logout','four-language layouts','guest progress not silently imported','offline dirty copy preserved and retried','recovery callback removes URL tokens and updates password'],'page_errors':errors}
 (ROOT/'artifacts/cloud-validation.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2));browser.close()
