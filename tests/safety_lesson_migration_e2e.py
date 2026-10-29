"""Preserve previous chapter evidence/XP, isolate accounts and recover failed frames."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8051/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);c=b.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce');q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.clock.install();register_local(q,BASE,'Recovery Learner');q.goto(BASE+'#topic/ch1/1.1');q.wait_for_selector('[data-safety-lesson]');q.route('**/a-3-reaction.webp*',lambda r:r.abort());q.locator('[data-safety-situation=a]').first.click();q.wait_for_selector('[data-scene-retry]');assert q.evaluate('SafetyLesson.counts().analysis===0');q.unroute('**/a-3-reaction.webp*');q.locator('[data-scene-retry]').click();q.wait_for_selector('.sp-loader',state='hidden');q.clock.run_for(15000);q.wait_for_selector('[data-story-card="0"]');q.keyboard.press('Escape');assert q.evaluate('SafetyLesson.counts().analysis===0');q.evaluate('LocalAuth.signOut()');register_local(q,BASE,'Isolated Learner');q.goto(BASE+'#topic/ch1/1.1');q.wait_for_selector('[data-safety-lesson]');assert q.evaluate('SafetyLesson.counts().matches===0&&SafetyLesson.counts().analysis===0');assert not errors,errors;c.close()
 snapshot=Path('/tmp/intro-complete-state.json')
 if snapshot.exists():
  old=json.loads(snapshot.read_text())
  # A previous-format account: original answer proofs, five signs and original XP keys.
  for key in list(old):
   if not key.startswith('fotima.chemistry7.curriculum.v2'):continue
   raw=json.loads(old[key])
   if not raw.get('intro',{}).get('rows'):continue
   raw['intro'].pop('lesson11',None)
   for id in ['danger-a','danger-b','danger-c','danger-d']:
    correct={'danger-a':(0,1),'danger-b':(1,2),'danger-c':(2,0),'danger-d':(0,1)}[id]
    proof={'answers':{'danger':correct[0],'precaution':correct[1]},'matches':{},'evidence':{},'visited':[],'order':[]}
    raw['intro']['rows'][id]={**proof,'proof':proof,'checked':True}
   matches={id:id for id in ['irritant','explosive','corrosive','toxic','flammable']};proof={'answers':{},'matches':matches,'evidence':{},'visited':[],'order':[]};raw['intro']['rows']['signs']={**proof,'proof':proof,'checked':True}
   rewards=raw['game']['rewards'];date=next(iter(rewards.values()))
   for k in list(rewards):
    if k.startswith('lesson11:'):del rewards[k]
   for id in ['danger-a','danger-b','danger-c','danger-d','signs']:rewards['exp:intro-'+id]=date
   old[key]=json.dumps(raw)
  c=b.new_context(reduced_motion='reduce');c.add_init_script('const old='+json.dumps(old)+';if(!localStorage.getItem("fotima.local.accounts.v1"))for(const[k,v]of Object.entries(old))localStorage.setItem(k,v);');q=c.new_page();q.goto(BASE+'#topic/ch1/1.1');q.wait_for_selector('[data-safety-lesson]');assert q.evaluate("IntroModel.workDone('safety')&&TextbookCourse.done('1.1')");assert q.evaluate('SafetyLesson.counts().analysis===4&&SafetyLesson.counts().matches===5');old_xp=q.evaluate('CourseGame.xp()');q.reload();q.wait_for_selector('[data-safety-lesson]');assert q.evaluate('CourseGame.xp()')==old_xp;assert q.evaluate("!Object.keys(state.game.rewards).some(k=>k.startsWith('lesson11:'))");c.close()
 print('PASS: frame-error retry, no credit on early exit, separate accounts, previous scene proofs/XP preserved without duplicate rewards');b.close()
