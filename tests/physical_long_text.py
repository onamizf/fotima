from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os
ROOT=Path(__file__).resolve().parents[1]
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8010/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-webgl']);q=b.new_page();q.goto(BASE)
 q.evaluate("state.lessons.physical={version:2,step:3,visited:[0,1,2],answers:{wax:{selected:'state',checked:true},salt:{selected:'salt',checked:true}}};saveState()")
 q.goto(BASE+'#lab/physical');count=0
 for width in [320,768,1366]:
  q.set_viewport_size({'width':width,'height':950})
  for lang in ['ru','uz-Latn','uz-Cyrl','en']:
   q.locator('#language').select_option(lang)
   for task in ['wax','salt','reference']:
    q.locator(f'[data-physical-task={task}]').click();cfg=q.evaluate('(id)=>physicalTasks[id]',task)
    for field in ['observation','explanation']:q.locator(f'[data-physical-answer={field}]').select_option(cfg[field+'s'][0])
    if task=='reference':
     for sample,answer in [('ethanol','alcoholic'),('acid','vinegar'),('ether','unspecified')]:q.locator(f'[data-physical-match={sample}]').select_option(answer)
    assert q.locator('.physical-choice-text').count()==(5 if task=='reference' else 2)
    assert not q.evaluate('document.documentElement.scrollWidth>innerWidth+1')
    assert q.locator('.physical-choice-text').first.inner_text()
    assert not q.evaluate('physicalLabPassed()')
    count+=1
 q.evaluate("state.physicalLab.conclusion='not saved to PDF';saveState()");q.goto(BASE+'#settings');q.locator('[data-action=reset]').click();q.locator('[data-action=confirmReset]').click();assert q.evaluate('state.physicalLab.tasks')=={}
 report={'status':'passed','filled_answer_layouts':count,'languages':4,'widths':[320,768,1366],'checks':['selected answers repeat in full wrapping text','all matching descriptions shown in full','incomplete work remains incomplete','global reset clears new state']}
 (ROOT/'artifacts'/'physical-long-text-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False));b.close()
