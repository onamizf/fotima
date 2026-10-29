"""Render transparent fallback frames from the real historical-geometry WebGL model."""
from playwright.sync_api import sync_playwright
from browser_auth import register_local
from pathlib import Path
from PIL import Image
import io,json,base64
ROOT=Path('/workspace/fotima/assets/lab/1-2')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']);c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');c.route('https://cdnjs.cloudflare.com/**',lambda r:r.abort());c.route('https://cdn.jsdelivr.net/**',lambda r:r.abort());q=c.new_page();register_local(q,'http://127.0.0.1:8051/?debug=1','Asset renderer');result=q.evaluate('''async()=>{const host=document.createElement('div');host.style.cssText='position:fixed;inset:0;width:1376px;height:768px;z-index:9999';document.body.append(host);const controller=new AbortController();let anchors={};const viewer=await SetupModel.mount(host,{signal:controller.signal,reduced:()=>true,onProgress(){},onAnchors(v){anchors=v}});await new Promise(r=>setTimeout(r,250));const canvas=host.querySelector('canvas'),assembled=canvas.toDataURL('image/png').split(',')[1];const out=document.createElement('canvas');out.width=1376;out.height=768;const c=out.getContext('2d'),bg=new Image();bg.src='assets/lab/1-2/setup-bg.jpg';await bg.decode();c.drawImage(bg,0,0,1376,768);c.drawImage(canvas,0,0);const preview=out.toDataURL('image/jpeg',.93).split(',')[1];viewer.setProgress(1,false);await new Promise(r=>setTimeout(r,250));const exploded=canvas.toDataURL('image/png').split(',')[1];viewer.dispose();controller.abort();host.remove();return {assembled,exploded,preview,anchors}}''')
 for name in ['assembled','exploded']:Image.open(io.BytesIO(base64.b64decode(result[name]))).save(ROOT/('setup-'+name+'.webp'),'WEBP',quality=93,method=6)
 (ROOT/'setup-fallback-anchors.json').write_text(json.dumps(result['anchors'],indent=2)+'\n');(ROOT/'setup-preview.jpg').write_bytes(base64.b64decode(result['preview']));b.close();print('Rendered 2 transparent WebP frames + JPEG preview from the actual model')
