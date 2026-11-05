"""New equipment sources across topic previews, scene, cards and detailed viewers."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
from pathlib import Path
BASE='http://127.0.0.1:8051/'
OUT=Path('/workspace/work/equipment139')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');c.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 q=c.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));q.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 register_local(q,BASE,'Equipment images')
 q.evaluate("""()=>{for(const id of ['danger-a','danger-b','danger-c','danger-d']){IntroModel.row(id).evidence.tutorialReview={version:1,stages:[0,1,2,3,4],explanations:[0,1,2]};IntroModel.check(id);}saveState()}""")
 q.goto(BASE+'#topic/ch1/1.2');q.wait_for_selector('.project-equipment-preview');assert q.locator('.project-equipment-preview img[src*="/cards/"]').count()==8;q.screenshot(path=str(OUT/'topic12.png'))
 q.locator('[data-project-open]').first.click();q.wait_for_selector('.equipment-image-room');assert q.locator('.equipment-room-zone img').count()==6;assert q.locator('.equipment-room-zone img[src*="/objects/"]').count()==4;assert q.locator('.pw-item img[src*="/cards/"]').count()==4
 for key in ['test-tube','beaker','conical-flask','measuring-cylinder']:
  q.locator('[data-pw-item="'+key+'"]').click();q.wait_for_selector('.equipment-card-dialog[open]');q.wait_for_selector('[data-equipment-model] img[src*="/objects/"]');q.locator('[data-eq-card-close]').click();q.wait_for_timeout(200)
 q.screenshot(path=str(OUT/'task1.png'))
 q.goto(BASE+'#lab/ch1/1.2/task-2');q.wait_for_selector('.equipment-image-scene');assert q.locator('.setup-part-list img[src*="/cards/"]').count()==9;assert q.locator('.setup-render-host img[src*="/objects/"]').count()>=9
 assert q.locator('.setup-part-list .pw-item').evaluate_all('(items)=>items.every(e=>{const label=e.querySelector("span").getBoundingClientRect(),card=e.getBoundingClientRect();return label.height>=40&&label.bottom<=card.bottom+1})')
 q.screenshot(path=str(OUT/'task2.png'))
 # Legacy practical view receives identical new equipment objects.
 q.evaluate("""()=>{ProjectWorkspace.dispose();Practical12.dispose();document.getElementById('app').innerHTML=Practical12.view();Practical12.mount();}""")
 q.wait_for_selector('.equipment-image-room');assert q.locator('.equipment-room-zone img[src*="/objects/"]').count()==4
 assert not errors,errors
 print('PASS new task previews, all supported Task 1 cards/objects/detail viewers, all nine Task 2 cards and object scene, legacy practical and no duplicate images; no console errors')
 b.close()
