"""Canonical textbook routes, responsive geometry, locking and non-destructive migration."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8046/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl'])
 for lang in ['ru','uz-Latn','uz-Cyrl','en']:
  for phone in [False,True]:
   c=b.new_context(viewport={'width':390 if phone else 1440,'height':844 if phone else 1000},has_touch=phone,is_mobile=phone,reduced_motion='reduce');q=c.new_page();errors=[];bad=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append(r.url) if r.status>=400 else None);register_local(q,BASE,'Route '+lang.replace('-','')+str(phone));q.evaluate('(lang)=>{state.settings.language=lang;saveState()}',lang);q.reload();assert q.locator('.home-topic-tile').count()==6;assert not q.locator('.home-topic-tile[href="#topic/physical"]').count();q.goto(BASE+'#topics');q.wait_for_selector('[data-book-node="ch1"]');assert q.locator('[data-book-node]').count()==38;assert q.evaluate('TextbookCourse.progress().max')==32;assert q.locator('.course-station article').count()==0
   assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');assert q.locator('.book-road-future').evaluate('(e)=>e.getTotalLength()>4000')
   def press(el):
    if el.get_attribute('aria-disabled')=='true':
     el.scroll_into_view_if_needed();r=el.bounding_box();q.touchscreen.tap(r['x']+r['width']/2,r['y']+r['height']/2) if phone else q.mouse.click(r['x']+r['width']/2,r['y']+r['height']/2)
    else:el.tap() if phone else el.click()
   press(q.locator('[data-book-open="1.2"]'));expect(q.locator('.book-route-guide')).to_be_visible();assert q.evaluate('location.hash')=='#topics';press(q.locator('[data-book-open="ch1"]'));expect(q.locator('.book-chapter-popup')).to_be_visible();assert q.locator('.book-chapter-popup li').count()==4;q.keyboard.press('Escape');expect(q.locator('.book-chapter-popup')).to_be_hidden();press(q.locator('[data-book-open="1.1"]'));q.wait_for_selector('.sp-scene');q.wait_for_selector('.sp-loader',state='hidden');assert q.evaluate('location.hash')=='#topic/ch1/1.1';assert q.locator('.cinema-start').is_visible();press(q.locator('[data-cinema=back]'));expect(q.locator('.book-chapter-tabs')).to_be_visible();assert q.locator('.book-chapter-tabs a').count()==4
   q.goto(BASE+'#home');q.locator('#dashboardSearch').fill('1.2');expect(q.locator('#searchResults')).to_be_visible();assert q.locator('[data-search-result] .search-result-name').filter(has_text='1.2').count()>=1;assert not errors,errors;assert not bad,bad
   print('PASS route',lang,'touch' if phone else 'mouse',flush=True);c.close()
 q=b.new_page();register_local(q,BASE,'Migration Check');snapshot=json.loads(Path('/tmp/intro-complete-state.json').read_text());raw=None;candidates=[]
 for value in snapshot.values():
  try:parsed=json.loads(value)
  except Exception:continue
  if isinstance(parsed,dict) and parsed.get('version')==2 and 'intro' in parsed and 'game' in parsed:candidates.append(parsed)
 raw=max(candidates,key=lambda x:sum(bool(r.get('checked')) for r in x['intro'].get('rows',{}).values())+len(x['intro'].get('quiz',{}).get('attempts',[])));assert raw;raw.pop('textbook',None)
 result=q.evaluate('''raw=>{const clean=readState(raw),again=readState(clean),proofs=x=>Object.fromEntries(Object.entries(x.intro.rows).map(([id,r])=>[id,{checked:r.checked,proof:r.proof,answers:r.answers,matches:r.matches,visited:r.visited,order:r.order}]));return {proofs:proofs(clean),original:proofs(raw),first:clean.textbook,second:again.textbook,rewards:Object.keys(clean.game.rewards).sort(),oldRewards:Object.keys(raw.game.rewards).sort()}}''',raw)
 assert result['proofs']==result['original'];assert result['rewards']==result['oldRewards'];assert result['first']==result['second'];assert all(result['first']['steps'][key]['done'] for key in ['1.1','1.2','1.3','ch1-summary'])
 q.evaluate('''raw=>{for(const id of ['states','properties','physical','chemical']){const topic=CourseData.topics.find(t=>t.id===id);raw.course.topics[id]={read:[0,1,2],bestAnswers:topic.steps.quiz.map(q=>q.correct),attempts:[],draft:[],tab:'theory',card:0};}raw.course.topics.atoms={read:[0,1],notes:'saved atoms'};raw.course.topics.mixtures={read:[0],notes:'saved mixtures'};state=readState(raw);saveState();render(false)}''',raw)
 assert q.evaluate('TextbookCourse.chapterDone("ch1") && TextbookCourse.chapterDone("ch2")');assert q.evaluate('TextbookCourse.done("4.2") && TextbookCourse.done("4.3") && TextbookCourse.done("5.3")');assert q.evaluate('state.textbook.legacyTopics.ch3.atoms.notes==="saved atoms" && state.textbook.legacyTopics.ch6.mixtures.notes==="saved mixtures"')
 q.goto(BASE+'#topic/ch3/3.1');expect(q.locator('.book-coming')).to_be_visible();assert not q.locator('.book-coming [data-intro-action]').count();q.goto(BASE+'#topics');q.wait_for_selector('.textbook-route');assert q.locator('.book-road-done').evaluate('(e)=>parseFloat(e.style.strokeDasharray)>0');q.goto(BASE+'#topic/ch1/1.2');q.wait_for_selector('.sp-loader',state='hidden') if q.locator('.sp-loader').count() else q.wait_for_selector('.intro-scene-host');assert q.evaluate('IntroModel.workDone("equipment")');q.goto(BASE+'#progress');assert q.locator('.course-progress-list>a').count()==6;q.reload();assert q.evaluate('TextbookCourse.done("1.2") && IntroModel.workDone("equipment")');b.close()
print('PASS migration: Chapter 1 evidence and XP preserved, all legacy records archived under canonical IDs, idempotent F5, textbook completion and placeholders')
