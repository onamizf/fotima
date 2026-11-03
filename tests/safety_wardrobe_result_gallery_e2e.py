"""Responsive scene framing, independent gallery scroll, new art and fallback retry."""
import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_auth import register_local

ROOT = Path(__file__).resolve().parents[1]
BASE = os.getenv('FOTIMA_TEST_URL', 'http://127.0.0.1:8051/')
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    q = b.new_page(viewport={'width':1366,'height':768}, reduced_motion='reduce')
    q.route('https://fonts.googleapis.com/**', lambda r:r.fulfill(status=200, body=''))
    errors, console, bad, geometry = [], [], [], []
    q.on('pageerror', lambda e:errors.append(str(e)))
    q.on('console', lambda m:console.append(m.text) if m.type=='error' else None)
    q.on('response', lambda r:bad.append((r.url,r.status)) if r.status>=400 else None)
    register_local(q, BASE, 'Result gallery')
    q.goto(BASE+'#safety-wardrobe')

    def decode(selector):
        q.locator(selector).evaluate_all('es=>es.forEach(e=>e.loading="eager")')
        q.wait_for_function('(s)=>[...document.querySelectorAll(s)].every(e=>e.complete&&(e.naturalWidth||e.hidden))', arg=selector)
        q.locator(selector).evaluate_all('async es=>{await Promise.all(es.filter(e=>!e.hidden).map(e=>e.decode()))}')

    def gallery():
        q.locator('[data-sw=professions]').click()
        decode('.sw-profession-image')

    for lang in ['ru','uz-Latn']:
        q.evaluate('(lang)=>StudentHeader.changeLanguage(lang)', lang)
        gallery()
        for w,h,columns in [(1920,1080,4),(1366,768,4),(768,900,3),(390,844,2),(320,740,2)]:
            q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(60)
            heading=q.locator('.sw-profession-heading');body=q.locator('.sw-dialog-body')
            assert heading.evaluate('e=>e.parentElement.matches("dialog")')
            assert body.bounding_box()['y']>=heading.bounding_box()['y']+heading.bounding_box()['height']-1
            before=heading.bounding_box()
            body.evaluate('e=>e.scrollTop=e.scrollHeight');q.wait_for_timeout(30)
            assert heading.bounding_box()==before
            last=q.locator('.sw-profession').last.bounding_box();view=body.bounding_box()
            assert last['y']+last['height']<=view['y']+view['height']+1
            assert q.locator('.sw-professions').evaluate('e=>getComputedStyle(e).gridTemplateColumns.split(" ").length')==columns
            assert q.locator('.sw-professions').evaluate('e=>getComputedStyle(e).gap')=='16px'
            heights=q.locator('.sw-profession').evaluate_all('es=>es.map(e=>e.getBoundingClientRect().height)')
            assert max(heights)-min(heights)<1
            assert q.locator('.sw-profession').first.evaluate('e=>getComputedStyle(e).backgroundColor')=='rgb(255, 255, 255)'
            assert q.locator('[data-sw-scene-fallback]').count()==0
            body.evaluate('e=>e.scrollTop=0')
            if w in [1366,390]:q.screenshot(path=str(ROOT/f'artifacts/wardrobe-gallery-{lang}-{w}.png'))
        q.keyboard.press('Escape')

    q.evaluate('StudentHeader.changeLanguage("ru")')
    jobs=q.evaluate('SafetyWardrobeData.professions')
    xp=q.evaluate('CourseGame.xp()')
    for id in ['chemist','firefighter','astronaut']:
        gallery();q.locator('[data-job='+id+']').click()
        job=next(j for j in jobs if j['id']==id)
        for item in job['required']:
            cat=q.evaluate('(id)=>SafetyWardrobeData.items.find(i=>i.id===id).category', item)
            q.locator('[data-sw-category='+cat+']').click();q.locator('[data-sw-item='+item+']').click()
        q.wait_for_selector('.sw-result-copy');decode('.sw-result img')
        for w,h in [(1920,1080),(1366,768),(390,844),(320,740)]:
            q.set_viewport_size({'width':w,'height':h});q.wait_for_timeout(60)
            scene=q.locator('.sw-result-scene');photo=q.locator('.sw-scene')
            fit=scene.get_attribute('data-fit');crop=float(scene.get_attribute('data-crop'))
            assert fit==('cover' if crop<.25 else 'contain')
            assert photo.evaluate('e=>getComputedStyle(e).objectFit')==fit
            assert photo.evaluate('e=>getComputedStyle(e).objectPosition')=='50% 30%'
            assert q.locator('.sw-scene-backdrop').is_visible()==(fit=='contain')
            assert q.locator('.sw-scene-backdrop').evaluate('e=>getComputedStyle(e).filter')=='blur(24px)'
            frame=q.locator('.sw').bounding_box();card=q.locator('.sw-result-copy').bounding_box()
            assert abs(frame['y']+frame['height']-card['y']-card['height']-20)<1
            assert card['width']<=520 and abs(card['x']+card['width']/2-frame['x']-frame['width']/2)<1
            assert q.locator('.sw-result-copy').evaluate('e=>getComputedStyle(e).borderTopWidth')=='4px'
            assert q.locator('.sw-result-copy').evaluate('e=>getComputedStyle(e).backgroundColor')=='rgb(255, 246, 230)'
            assert q.locator('.sw-result h1').evaluate('e=>getComputedStyle(e).fontSize')=='20px'
            assert q.locator('.sw-xp').evaluate('e=>getComputedStyle(e).fontSize')=='16px'
            buttons=q.locator('.sw-result-copy .sw-actions button').evaluate_all('es=>es.map(e=>e.getBoundingClientRect().width)')
            assert abs(buttons[0]-buttons[1])<1,buttons
            sizes=q.locator('.sw-stars>span').evaluate_all('es=>es.map(e=>e.getBoundingClientRect().width)')
            assert sizes==([36,44,36] if w<768 else [40,52,40]),sizes
            assert q.locator('.sw-result-banner').inner_text()=='Ты супер!'
            assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1')
            geometry.append({'job':id,'width':w,'fit':fit,'crop':crop,'card':card})
            if w!=320:q.screenshot(path=str(ROOT/f'artifacts/wardrobe-result-{id}-{w}.png'))
    assert q.evaluate('CourseGame.xp()')==xp+60
    q.evaluate('StudentHeader.changeLanguage("uz-Latn")')
    assert q.locator('.sw-result-banner').inner_text()=="Sen zo'rsan!"
    gallery();assert q.locator('.sw-profession-completed .sw-profession-check').count()==3
    q.keyboard.press('Escape')
    assert not errors and not bad and not console,(errors,bad,console)

    # Actual animation timing, with the already-earned result and no XP mutation.
    q.emulate_media(reduced_motion='no-preference')
    q.evaluate('StudentHeader.changeLanguage("ru")')
    assert q.locator('.sw-scene-arrival').evaluate('e=>getComputedStyle(e).animationDuration')=='0.9s'
    assert q.locator('.sw-scene-camera').evaluate('e=>getComputedStyle(e).animationDuration')=='12s'
    assert q.locator('.sw-result-copy').evaluate('e=>getComputedStyle(e).animationDelay')=='0.9s'
    assert q.locator('.sw-stars>span').first.evaluate('e=>getComputedStyle(e).animationDelay')=='1.46s'
    q.wait_for_timeout(2400)
    assert q.locator('.sw-xp').inner_text()=='+20 XP'
    assert q.evaluate('CourseGame.xp()')==xp+60
    assert not errors,errors

    # A missing card falls back to its scene; reopening retries a newly available card.
    q.route('**/assets/game/cards/card-miner.png?*', lambda r:r.abort())
    q.emulate_media(reduced_motion='reduce');q.reload();q.wait_for_selector('.sw-cover')
    gallery();fallback=q.locator('[data-job=miner] img')
    assert fallback.get_attribute('data-sw-scene-fallback')=='true'
    assert fallback.get_attribute('src')=='assets/game/scenes/miner.jpg'
    assert fallback.evaluate('e=>getComputedStyle(e).objectPosition')=='50% 30%'
    q.keyboard.press('Escape');q.unroute('**/assets/game/cards/card-miner.png?*')
    gallery();assert q.locator('[data-job=miner] img').get_attribute('data-sw-scene-fallback') is None
    assert 'retry=' in q.locator('[data-job=miner] img').get_attribute('src')
    q.keyboard.press('Escape')
    q.route('**/assets/game/cards/card-cook.png?*', lambda r:r.abort())
    q.route('**/assets/game/scenes/cook.jpg', lambda r:r.abort())
    q.reload();q.wait_for_selector('.sw-cover')
    gallery()
    assert not q.locator('[data-job=cook] img').is_visible()
    assert q.locator('[data-job=cook] .sw-profession-art-fallback').is_visible()
    assert q.locator('[data-job=cook] strong').inner_text()
    q.keyboard.press('Escape')
    q.unroute('**/assets/game/cards/card-cook.png?*');q.unroute('**/assets/game/scenes/cook.jpg')

    (ROOT/'artifacts/wardrobe-result-gallery-validation.json').write_text(json.dumps({'status':'passed','geometry':geometry,'checks':['13 supplied pictures decoded','Russian and Uzbek galleries, five viewport sizes, independent scroll','three finals at 1920×1080, 1366×768, 390×844 and 320×740','automatic cover/contain, blurred full-window backdrop, no white fog','equal buttons and phone star sizes','missing card scene fallback and next-opening retry','normal animation timing and unchanged XP'],'js_errors':errors},ensure_ascii=False,indent=2))
    b.close()
    print('PASS responsive finals, RU/UZ profession gallery, imported art, fallback retry and animation timing')
