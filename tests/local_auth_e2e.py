"""Local nickname auth, actual Web Crypto, session and separate progress; no mocked auth backend."""
import os,json,hashlib
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8037/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);ctx=b.new_context(viewport={'width':1366,'height':900});q=ctx.new_page();errors=[];network=[]
 q.on('pageerror',lambda e:errors.append(str(e)));q.on('request',lambda r:network.append(r.url));q.goto(BASE+'#register');q.locator('.auth-switch').click();q.wait_for_url('**/#login');assert q.locator('[name=repeat]').count()==0;q.go_back();q.wait_for_selector('[name=repeat]')
 q.evaluate("localStorage.setItem('fotima.chemistry7.curriculum.v2.user.old-uid',JSON.stringify({version:2,marker:'keep legacy'}))")
 old=q.evaluate("localStorage.getItem('fotima.chemistry7.curriculum.v2.user.old-uid')")
 assert q.locator('input[type=email]').count()==0;assert q.locator('.auth-submit').is_disabled()
 name=q.locator('[name=username]');pw=q.locator('[name=password]');repeat=q.locator('[name=repeat]')
 name.fill('ab');assert q.locator('#error-username').inner_text()=='Введите имя или псевдоним (минимум 3 символа)'
 name.fill('a'*21);assert q.locator('#error-username').inner_text();name.fill('Bad<name');assert q.locator('.auth-submit').is_disabled()
 name.fill('  Fotima  ');pw.fill('1234567');assert q.locator('#error-password').inner_text()=='Пароль должен содержать не менее 8 символов';assert q.locator('#passwordCount').inner_text()=='7 / 8 символов'
 pw.fill('safe-pass-1');repeat.fill('different');assert q.locator('#error-repeat').inner_text()=='Пароли не совпадают';assert q.locator('.auth-submit').is_disabled()
 repeat.fill('safe-pass-1');q.locator('[data-password-toggle=password]').click();assert pw.get_attribute('type')=='text';q.locator('[data-password-toggle=password]').click();assert pw.get_attribute('type')=='password'
 q.screenshot(path=str(ROOT/'artifacts/nickname-register-1366.png'),full_page=True);q.locator('.auth-submit').click();q.wait_for_url('**/#catalog')
 assert q.locator('.user-greeting').inner_text()=='Привет, Fotima!';assert q.evaluate('LocalAuth.currentUser().name')=='Fotima'
 users=q.evaluate("JSON.parse(localStorage.getItem('fotima.local.accounts.v1')).users");first=users[0];assert first['hash']==hashlib.sha256((first['salt']+':safe-pass-1').encode()).hexdigest();assert 'password' not in first
 assert 'safe-pass-1' not in q.evaluate('JSON.stringify(localStorage)')
 first_key=q.evaluate('STORAGE_KEY');q.goto(BASE+'#table/properties');q.locator('[data-cell="salt.state"]:visible').select_option('solid');q.reload();assert q.locator('[data-cell="salt.state"]:visible').input_value()=='solid'
 q.goto(BASE+'#account');assert q.locator('input[type=email]').count()==0;q.locator('.header-logout').click();q.wait_for_url('**/#login')
 q.goto(BASE+'#register');name=q.locator('[name=username]');name.fill('fotima');assert q.locator('#error-username').inner_text()=='Такое имя уже занято — придумайте другое';assert q.locator('.auth-submit').is_disabled()
 register_local(q,BASE,'Учёный_2','safe-pass-1');assert q.evaluate('STORAGE_KEY')!=first_key;assert q.evaluate('state.propertyTable')=={}
 users=q.evaluate("JSON.parse(localStorage.getItem('fotima.local.accounts.v1')).users");assert users[0]['salt']!=users[1]['salt'];assert users[0]['hash']!=users[1]['hash']
 q.locator('.header-logout').click();q.wait_for_selector('#accountForm');q.locator('[name=username]').fill('fOTIMA');q.locator('[name=password]').fill('wrong-pass');q.locator('.auth-submit').click();q.wait_for_function("document.getElementById('accountMessage').textContent==='Неверное имя или пароль'")
 q.locator('[name=password]').fill('safe-pass-1');q.locator('.auth-submit').click();q.wait_for_url('**/#catalog');assert q.evaluate('STORAGE_KEY')==first_key;assert q.evaluate('state.propertyTable.salt.state')=='solid'
 q.reload();assert q.evaluate('LocalAuth.signedIn()');assert q.locator('.user-greeting').inner_text()=='Привет, Fotima!'
 assert q.evaluate("localStorage.getItem('fotima.chemistry7.curriculum.v2.user.old-uid')")==old
 # A second tab sees logout and never keeps another user's private progress active.
 tab=ctx.new_page();tab.goto(BASE+'#account');assert tab.evaluate('LocalAuth.signedIn()');q.locator('.header-logout').click();tab.wait_for_function('!LocalAuth.signedIn()')
 # Concurrent case variants use one registry lock; one account is created.
 race=b.new_context();a=race.new_page();c=race.new_page();a.goto(BASE+'#register');c.goto(BASE+'#register')
 for page,value in [(a,'SameName'),(c,'samename')]:
  page.evaluate("()=>{const digest=crypto.subtle.digest.bind(crypto.subtle);crypto.subtle.digest=(...args)=>new Promise((resolve,reject)=>setTimeout(()=>digest(...args).then(resolve,reject),200));}")
  page.locator('[name=username]').fill(value);page.locator('[name=password]').fill('race-pass-1');page.locator('[name=repeat]').fill('race-pass-1')
 a.evaluate("document.querySelector('#accountForm').requestSubmit()")
 c.evaluate("document.querySelector('#accountForm').requestSubmit()")
 a.wait_for_timeout(400)
 rows=a.evaluate("JSON.parse(localStorage.getItem('fotima.local.accounts.v1')).users");assert len(rows)==1
 race.close()
 # Denied storage does not create a plaintext fallback or a signed-in session.
 blocked=b.new_context();r=blocked.new_page();r.goto(BASE+'#register');r.evaluate("()=>{Storage.prototype.setItem=()=>{throw Error('denied')};}")
 r.locator('[name=username]').fill('No Storage');r.locator('[name=password]').fill('safe-pass-1');r.locator('[name=repeat]').fill('safe-pass-1');r.locator('.auth-submit').click();r.wait_for_function("document.getElementById('accountMessage').textContent.length>0");assert not r.evaluate('LocalAuth.signedIn()');blocked.close()
 assert not errors,errors;assert not any('supabase' in url or 'firebase' in url for url in network),network
 b.close()
print('Passed: live validation, Unicode/case-insensitive names, salt+SHA-256, no plaintext, sessions/F5, account isolation, legacy preservation, cross-tab logout/concurrent names, denied storage')
