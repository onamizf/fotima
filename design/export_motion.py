from playwright.sync_api import sync_playwright
from PIL import Image
import io,pathlib
root=pathlib.Path(__file__).resolve().parent
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page(viewport={'width':768,'height':1000})
 page.goto('http://127.0.0.1:8765/?page=parts&lang=ru');page.evaluate('document.fonts.ready');demo=page.locator('#motion');demo.scroll_into_view_if_needed()
 frames=[];durations=[]
 def snap(duration):
  frames.append(Image.open(io.BytesIO(demo.screenshot())).convert('RGB'));durations.append(duration)
 snap(1000);page.locator('#motionAction').click();page.wait_for_timeout(240);snap(900)
 page.locator('#motionAction').click(no_wait_after=True)
 for _ in range(7):snap(100)
 page.wait_for_timeout(750);snap(1800);page.locator('#motionAction').click();snap(1600)
 frames[0].save(root/'animation.gif',save_all=True,append_images=frames[1:],duration=durations,loop=0,optimize=True)
 b.close()
print('animation.gif exported')
