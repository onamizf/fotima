"""Real 500ms icon flights, shared-canvas wipe and reduced motion."""
import os
from playwright.sync_api import sync_playwright,expect
from browser_auth import register_local
BASE=os.getenv('FOTIMA_TEST_URL','http://127.0.0.1:8051/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);q=b.new_page(viewport={'width':1366,'height':768});q.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));errors=[];q.on('pageerror',lambda e:errors.append(str(e)));register_local(q,BASE,'Motion layers');q.goto(BASE+'#safety-wardrobe');q.locator('[data-sw=play]').click()
 def equip(cat,id):q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+id+']').click()
 equip('body','lab-coat');q.wait_for_selector('.sw-full-layer[data-sw-layer=lab-coat]');assert q.locator('.sw-flying').count()==1
 assert q.locator('[data-sw-layer=lab-coat] .sw-wipe-rect').evaluate('(r)=>r.getAnimations().length')==1
 q.wait_for_selector('.sw-flying',state='detached');equip('hands','nitrile-gloves');q.wait_for_selector('.sw-full-layer[data-sw-layer=nitrile-gloves]');assert q.locator('.sw-flying').count()==2
 q.wait_for_selector('.sw-flying',state='detached');equip('eyes','goggles');q.wait_for_selector('.sw-full-layer[data-sw-layer=goggles]');q.wait_for_selector('.sw-flying',state='detached');equip('eyes','sealed-goggles');assert q.locator('[data-sw-layer=goggles].sw-leaving').count()==1;q.wait_for_selector('[data-sw-layer=goggles]',state='detached');q.wait_for_selector('.sw-full-layer[data-sw-layer=sealed-goggles]');q.wait_for_selector('.sw-flying',state='detached')
 q.locator('[data-sw-remove=nitrile-gloves]').click();assert q.locator('.sw-flying').count()==2;q.wait_for_selector('[data-sw-layer=nitrile-gloves]',state='detached');q.wait_for_selector('.sw-flying',state='detached')
 q.emulate_media(reduced_motion='reduce');equip('hands','nitrile-gloves');q.wait_for_selector('.sw-full-layer[data-sw-layer=nitrile-gloves]');assert q.locator('.sw-flying').count()==0;assert q.locator('[data-sw-layer=nitrile-gloves] .sw-wipe-rect').evaluate('(r)=>r.getAnimations().length')==0
 q.keyboard.press('Escape');q.wait_for_function('location.hash==="#home"');assert q.locator('.sw-flying,.sw-reaction,.sw-confetti').count()==0;assert not errors,errors;b.close();print('PASS full-layer wipe, paired flights, replacement dissolve, removal and reduced motion')
