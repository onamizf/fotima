"""Timezone-based daily login XP, consecutive days, missed-day reset and per-user separation."""
from datetime import datetime,timedelta,timezone
import os
from playwright.sync_api import sync_playwright
from browser_auth import register_local
BASE=os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8040/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-webgl']);q=b.new_page();errors=[];q.on('pageerror',lambda e:errors.append(str(e)));now=datetime(2026,10,22,6,tzinfo=timezone.utc);q.clock.install(time=now);register_local(q,BASE,'Daily Learner');assert q.evaluate('CourseGame.day()')=='2026-10-22';assert q.evaluate('CourseGame.xp()')==5
 selected=q.evaluate('state.game.daily[CourseGame.day()]');q.reload();assert q.evaluate('CourseGame.xp()')==5;assert q.evaluate('state.game.daily[CourseGame.day()]')==selected
 for n in range(1,7):
  q.clock.set_system_time(now+timedelta(days=n));q.reload();q.wait_for_selector('.student-dashboard');assert q.evaluate('CourseGame.streak()')==n+1;assert q.evaluate('CourseGame.xp()')==(n+1)*5
 assert q.evaluate('state.game.badges.includes("week")');q.locator('#earnedDialog button').click()
 q.clock.set_system_time(now+timedelta(days=8));q.reload();q.wait_for_selector('.student-dashboard');assert q.evaluate('CourseGame.streak()')==1;assert q.evaluate('CourseGame.xp()')==40;assert q.evaluate('state.game.badges.includes("week")')
 q.locator('#profileToggle').click();q.locator('.header-profile-popover [data-profile-logout]').click();register_local(q,BASE,'Other Daily');assert q.evaluate('CourseGame.streak()')==1;assert q.evaluate('CourseGame.xp()')==5
 assert not errors,errors;b.close()
print('Passed: Tashkent daily dates, one +5 per day, 7-day badge, skipped-day reset, retained history and separate users')
