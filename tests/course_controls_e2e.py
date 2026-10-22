"""All-sections panel, filtered search and active-heating guards in the preserved laboratories."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8040/');ROOT=Path(__file__).resolve().parents[1];saved=json.loads(Path('/tmp/course-demo-state.json').read_text())
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1440,'height':1000});errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Controls Learner');q.emulate_media(reduced_motion='reduce');q.evaluate('(s)=>{state=readState(s);saveState();render(false)}',saved)
 q.locator('.shortcut[href="#resources/more"]').click();assert q.locator('#sectionsDialog').is_visible();assert q.locator('#sectionsDialog a[href="#account"]').count()==1;assert q.locator('#sectionsDialog a[href="#welcome"]').count()==1
 for href in q.locator('#sectionsDialog a').evaluate_all('(els)=>els.map(a=>a.getAttribute("href"))'):assert q.evaluate('(h)=>SiteRoutes.resolve(h).page',href)!='notfound',href
 q.locator('#sectionsDialog a[href="#games"]').click();q.wait_for_url('**/#games');assert q.locator('#sectionsDialog').count()==0
 q.goto(BASE+'#home');q.locator('[data-home-filter=new]').click();q.locator('#dashboardSearch').fill('соль');q.locator('[role=option]').filter(has_text='Поваренная соль').first.click();q.wait_for_url('**/#lab/properties');assert q.evaluate('state.activeSample')=='salt'
 # A normal experience tile cannot bypass switching off an active source.
 q.evaluate("state.physicalLab=blankPhysicalLab();saveState()");q.goto(BASE+'#lab/physical')
 for key in ['setup','loadWax','heat']:q.locator(f'[data-physical-step={key}]').click()
 q.goto(BASE+'#topic/physical');q.locator('[data-course-tab=experiments]').first.click();q.locator('[data-open-experiment=physical-salt]').click();q.wait_for_url('**/#lab/physical');assert q.evaluate('state.physicalLab.active')=='wax';assert q.evaluate('physicalHeating(physicalRecord())')
 q.locator('[data-physical-step=stop]').click();assert not q.evaluate('physicalHeating(physicalRecord())')
 q.evaluate("state.chemicalLab=blankChemicalLab();saveState()");q.goto(BASE+'#lab/chemical')
 for key in ['setup','ignite']:q.locator(f'[data-chemical-step={key}]').click()
 q.goto(BASE+'#topic/chemical');q.locator('[data-course-tab=experiments]').first.click();q.locator('[data-open-experiment=chemical-copper]').click();q.wait_for_url('**/#lab/chemical');assert q.evaluate('state.chemicalLab.active')=='paper';assert q.evaluate('chemicalSourceOn(chemicalRecord())')
 q.locator('[data-chemical-step=stop]').click();assert not q.evaluate('chemicalSourceOn(chemicalRecord())')
 q.goto(BASE+'#topics');q.screenshot(path=str(ROOT/'artifacts/course-map-1440.png'),full_page=True)
 assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1');assert not errors,errors;b.close()
print('Passed: all-sections panel/links, search ignores home filter, correct specimen selection, physical/chemical active-source guards')
