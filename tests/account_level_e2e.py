"""Minimal account progress using evidence earned by the real sequential learner flow."""
import os,json,copy
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8035/')
earned=json.loads(Path('/tmp/progress-demo-state.json').read_text());uid='44444444-4444-4444-8444-444444444444';row={'payload':copy.deepcopy(earned),'revision':1}
def api(route):
 global row
 req=route.request;path=req.url.split('.supabase.co',1)[1]
 if path=='/auth/v1/user':data={'id':uid,'email':'learner@example.test'}
 elif path.startswith('/rest/v1/lab_progress'):data=[row]
 elif path=='/rest/v1/rpc/save_lab_progress':
  body=req.post_data_json;data=row['revision']+1;row={'payload':body['p_payload'],'revision':data}
 else:raise AssertionError(path)
 route.fulfill(content_type='application/json',body=json.dumps(data))
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 ctx=b.new_context(viewport={'width':1366,'height':900});ctx.route('https://*.supabase.co/**',api)
 ctx.add_init_script("sessionStorage.setItem('fotima.auth.session.v1',JSON.stringify({access_token:'test',refresh_token:'test',expires_at:Date.now()/1000+3600,user:{id:'"+uid+"'}}))")
 q=ctx.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.goto(BASE+'#account');q.wait_for_function('FotimaCloud.signedIn() && !FotimaCloud.gate()')
 assert q.locator('[data-account-level="3"]').count()==1;assert q.locator('.account-all-done').count()==1
 q.evaluate('''()=>{state.physicalLab=blankPhysicalLab();state.chemicalLab=blankChemicalLab();saveState();render(false)}''')
 assert q.locator('[data-account-level="2"]').count()==1;assert q.locator('.account-level progress').get_attribute('value')=='1'
 assert q.locator('.account-level a').get_attribute('href')=='#lab/physical'
 assert not q.locator('.account-sync-tools').get_attribute('open')
 before=q.evaluate('JSON.stringify(state)');q.locator('.account-sync-tools > summary').click();q.locator('.account-sync-tools > summary').click();assert before==q.evaluate('JSON.stringify(state)')
 q.locator('.account-level a').click();q.wait_for_selector('.physical-lab');q.goto(BASE+'#account');q.wait_for_selector('.cloud-profile')
 q.screenshot(path=str(ROOT/'artifacts/account-level-night-1366.png'),full_page=True)
 checks=0
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  q.select_option('#language',lang)
  for theme in ['dark','light']:
   if q.locator('html').get_attribute('data-theme')!=theme:q.locator('#themeToggle').click()
   for width in [320,375,768,1366]:
    q.set_viewport_size({'width':width,'height':900});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,theme,width)
    assert q.locator('[data-account-level="2"]').is_visible();assert 'undefined' not in q.locator('.cloud-profile').inner_text();checks+=1
 q.select_option('#language','ru');q.set_viewport_size({'width':375,'height':900});q.screenshot(path=str(ROOT/'artifacts/account-level-day-375.png'),full_page=True)
 q.evaluate('state=freshState();saveState();render(false)');assert q.locator('[data-account-level="1"]').count()==1;assert q.locator('.account-level progress').get_attribute('value')=='0';assert q.evaluate('state.achievements.earned.length')==0
 assert not errors,errors;b.close()
print(f'Passed: {checks} account layouts, levels 1/2/all complete, checked work count, real continue route, collapsed sync tools, no awards from viewing')
