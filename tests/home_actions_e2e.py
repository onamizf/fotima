"""Existing home actions still open real tasks; the new view does not award XP."""
import os,json
from pathlib import Path
from datetime import datetime,timezone
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.getenv('LAB_TEST_BASE','http://127.0.0.1:8044/');ROOT=Path(__file__).resolve().parents[1]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce');errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Home Learner');q.add_locator_handler(q.locator('#earnedDialog[open]'),lambda d:d.locator('button').click());xp=q.evaluate('CourseGame.xp()')
 q.locator('.home-continue .home-primary').click();q.wait_for_url('**/#topic/intro');q.goto(BASE+'#home');next_id=q.locator('.home-next-experience [data-open-experiment]').get_attribute('data-open-experiment');q.locator('.home-next-experience [data-open-experiment]').click();q.wait_for_selector('.intro-workbench');assert q.evaluate('IntroModel.data().task')==q.evaluate('(id)=>CourseModel.experiments().find(e=>e.id===id).key',next_id);q.goto(BASE+'#home');q.locator('.home-daily [data-open-experiment]').click();q.wait_for_selector('.intro-root');q.goto(BASE+'#home');assert q.evaluate('CourseGame.xp()')==xp
 for href in ['#resources/periodic','#resources/glossary','#resources/tests','#games']:
  q.locator('.home-tools a[href="'+href+'"]').click();q.wait_for_url('**/'+href);q.goto(BASE+'#home')
 q.goto(BASE+'#resources/more');assert q.locator('.shortcut').count()>4;q.locator('.shortcut[href="#resources/more"]').click();q.wait_for_selector('#sectionsDialog[open]');q.locator('#sectionsDialog button').click();q.goto(BASE+'#home')
 q.locator('.home-statistics a').click();q.wait_for_url('**/#awards');q.goto(BASE+'#home');q.locator('.home-fact a').click();q.wait_for_url('**/#resources/periodic');q.goto(BASE+'#home');q.locator('.home-challenge a').click();q.wait_for_url('**/#challenge');q.locator('[data-challenge-start]').click()
 for i in range(3):
  answer=q.evaluate('(i)=>{const ref=state.game.challenge.questions[i];return CourseModel.all.find(t=>t.id===ref.topic).steps.quiz[ref.index].correct}',i);q.locator('[data-challenge-answer="'+str(answer)+'"]').click()
 q.goto(BASE+'#home');assert q.locator('.home-challenge .home-card-meta').inner_text()=='Результат: 3/3';assert q.evaluate('CourseGame.xp()')==xp
 # Only the greeting changes as the clock crosses a Tashkent time-of-day boundary.
 q.clock.install(time=datetime(2026,10,27,1,0,tzinfo=timezone.utc));q.reload();assert q.locator('[data-home-greeting]').text_content()=='Доброе утро';before=q.evaluate('JSON.stringify(state)');q.clock.set_system_time(datetime(2026,10,27,8,0,tzinfo=timezone.utc));q.clock.run_for(60010);assert q.locator('[data-home-greeting]').text_content()=='Добрый день';assert q.evaluate('JSON.stringify(state)')==before
 assert not errors,errors;b.close();print('Passed: real continuation/task/tool/achievement/challenge links, saved challenge result and time-aware greeting without XP changes')
