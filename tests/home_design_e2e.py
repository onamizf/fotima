"""Presentation checks and read-only model snapshots for the minimalist home."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
ROOT=Path(__file__).resolve().parents[1];BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1440,'height':1100},reduced_motion='reduce');errors=[];bad=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('response',lambda r:bad.append((r.url,r.status)) if r.status>=400 else None);register_local(q,BASE,'Фотима');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());q.wait_for_timeout(2700)
 before=q.evaluate('JSON.stringify(state)');q.evaluate('CourseGame.dashboardSnapshot();Dashboard.view();CourseGame.dashboardSnapshot()');assert q.evaluate('JSON.stringify(state)')==before,'Presentation getters must not change learner state'
 assert q.locator('.home-bento-card').count()==7;assert q.locator('.dashboard-banner,.streak-pill,.dashboard-awards,.shortcut-next').count()==0;assert q.locator('#frogAssistant').is_hidden();assert q.locator('.home-tools a').count()==4;assert q.locator('.home-tools a[href="#resources/more"]').count()==0
 for card in q.locator('.home-bento-card').all():assert card.locator('.home-primary').count()<=1
 assert q.locator('.home-hero h1').evaluate('(e)=>getComputedStyle(e).textTransform')=='none';assert q.locator('.home-hero h1').evaluate('(e)=>getComputedStyle(e).fontSize')=='44px';assert q.locator('.home-overline').first.evaluate('(e)=>getComputedStyle(e).textTransform')=='uppercase'
 assert q.locator('.home-next-experience [data-open-experiment]').get_attribute('data-open-experiment')==q.evaluate('CourseModel.current().steps.experiments.find(e=>!CourseModel.experimentPassed(e)).id');assert q.locator('.home-daily [data-open-experiment]').get_attribute('data-open-experiment')==q.evaluate('CourseGame.dashboardSnapshot().daily.id')
 initial_xp=q.evaluate('CourseGame.xp()');q.locator('[data-home-filter=passed]').click();assert q.locator('.home-topic-tile').count()==0;assert q.evaluate('CourseGame.xp()')==initial_xp;q.locator('[data-home-filter=new]').click();assert q.locator('.home-topic-tile').count()==1;q.locator('[data-home-filter=all]').click();assert q.locator('.home-topic-tile').count()==7
 rows=[];line_issues=[]
 for language in ['ru','uz-Latn','uz-Cyrl','en']:
  q.locator('#language').select_option(language)
  for width in [320,375,390,768,1024,1200,1440]:
   q.set_viewport_size({'width':width,'height':900});assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(language,width)
   grid=q.locator('.home-bento').evaluate('(e)=>({columns:getComputedStyle(e).gridTemplateColumns,rows:getComputedStyle(e).gridTemplateRows})');columns=len(grid['columns'].split());assert columns==(1 if width<768 else 2 if width<1200 else 4),(language,width,grid)
   assert q.locator('.dashboard-frog').is_visible()==(width>=768)
   assert all(el.evaluate('(e)=>getComputedStyle(e).textTransform')=='none' for el in q.locator('.minimal-home h2,.minimal-home h3').all())
   for card in q.locator('.home-bento-card').all():
    rect=card.bounding_box()
    for child in card.locator('h3,.home-button,.home-step-list,.home-progress-ring').all():
     box=child.bounding_box();assert box['x']>=rect['x']-1 and box['x']+box['width']<=rect['x']+rect['width']+1,(language,width,child.text_content());assert box['y']+box['height']<=rect['y']+rect['height']+1,(language,width,child.text_content())
   for h in q.locator('.home-bento h3').all():
    lines=h.evaluate('(e)=>e.getBoundingClientRect().height/parseFloat(getComputedStyle(e).lineHeight)')
    if lines>2.1:line_issues.append((language,width,h.text_content(),round(lines)))
   rows.append({'language':language,'width':width,'columns':columns})
  # Expanded sidebar uses the available width instead of squeezing four narrow columns.
  q.set_viewport_size({'width':1200,'height':900});q.locator('[data-profile-compact]').click();q.wait_for_timeout(350);assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');q.locator('[data-profile-compact]').click();q.wait_for_timeout(350)
 q.set_viewport_size({'width':1440,'height':1100});q.locator('#language').select_option('ru');q.screenshot(path=str(ROOT/'artifacts/home-minimal-1440.png'),full_page=True)
 q.set_viewport_size({'width':1024,'height':1000});q.screenshot(path=str(ROOT/'artifacts/home-minimal-1024.png'),full_page=True)
 q.set_viewport_size({'width':390,'height':844});q.screenshot(path=str(ROOT/'artifacts/home-minimal-390.png'),full_page=True)
 # The existing search remains above the new glass cards, at both breakpoints.
 for width in [390,1440]:
  q.set_viewport_size({'width':width,'height':900});q.locator('#dashboardSearch').fill('во');assert q.locator('#searchResults').is_visible();assert q.locator('#searchResults').evaluate('(e)=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+30,Math.min(innerHeight-20,r.bottom-20)))}');q.keyboard.press('Escape')
 q.set_viewport_size({'width':1440,'height':1100});q.locator('#dashboardSearch').fill('во');q.screenshot(path=str(ROOT/'artifacts/home-minimal-search-1440.png'));q.keyboard.press('Escape');q.emulate_media(reduced_motion='no-preference');q.reload();assert q.locator('.home-laboratory').evaluate('(e)=>getComputedStyle(e).animationName')=='home-section-in';q.emulate_media(reduced_motion='reduce');assert q.locator('.home-laboratory').evaluate('(e)=>getComputedStyle(e).animationName')=='none';assert q.locator('.minimal-home>*').evaluate_all('(es)=>es.every(e=>getComputedStyle(e).animationName==="none")')
 q.goto(BASE+'#topics');assert q.locator('#frogAssistant').is_visible();q.goto(BASE+'#home');assert q.locator('#frogAssistant').is_hidden();assert not errors,errors;assert not bad,bad
 report={'status':'passed' if not line_issues else 'headings need adjustment','checks':['read-only view/snapshot and unchanged XP','dynamic current/daily experiment IDs','working filters and existing routes','seven bento cards with one primary maximum','four/two/one columns plus expanded sidebar','four locales and seven widths, no overflow or clipped actions','search overlay at mobile and desktop','helper visible on other pages, reduced motion'],'layouts':rows,'heading_issues':line_issues,'js_errors':errors};(ROOT/'artifacts/home-design-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False));b.close();assert not line_issues,line_issues
