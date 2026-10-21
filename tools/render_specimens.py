"""Render original specimen thumbnails. Start a local HTTP server first; requires Playwright, Chromium and ImageMagick."""
import base64, subprocess, os
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=b.new_page();page.goto(os.environ.get('LAB_TEST_BASE','http://127.0.0.1:8028/'))
 page.wait_for_function('typeof SpecimenModels!=="undefined"')
 data=page.evaluate('''()=>{const th=THREE,r=new th.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});r.setSize(600,480);r.outputColorSpace=th.SRGBColorSpace;r.toneMapping=th.ACESFilmicToneMapping;const scene=new th.Scene();scene.background=new th.Color(0xc2dce7);scene.add(new th.HemisphereLight(0xffffff,0x738d9d,1.1));const key=new th.DirectionalLight(0xfff5e5,2.0);key.position.set(-3,5,4);scene.add(key);const fill=new th.DirectionalLight(0x9ddfff,1.0);fill.position.set(3,3,-2);scene.add(fill);const env=new th.Scene();env.background=new th.Color(0xbfcac1);for(const [x,y,z] of [[-2,3,2],[3,2,-1]]){const plane=new th.Mesh(new th.PlaneGeometry(3,4),new th.MeshBasicMaterial({color:0xffffff}));plane.position.set(x,y,z);plane.lookAt(0,0,0);env.add(plane);}const pmrem=new th.PMREMGenerator(r);scene.environment=pmrem.fromScene(env,.05).texture;const stage=new th.Mesh(new th.CylinderGeometry(.58,.62,.055,64),new th.MeshStandardMaterial({color:0x315d73,roughness:.7}));stage.position.y=-.04;scene.add(stage);const camera=new th.PerspectiveCamera(34,1.25,.05,20),result=[];for(const id of sampleIds){const group=SpecimenModels.build(scene,id),s=new th.Box3().setFromObject(group).getBoundingSphere(new th.Sphere()),d=Math.max(1.3,s.radius/Math.sin(camera.fov*Math.PI/360)*1.18);camera.position.set(s.center.x+Math.sin(.35)*d*Math.cos(.4),s.center.y+d*Math.sin(.4),s.center.z+Math.cos(.35)*d*Math.cos(.4));camera.lookAt(s.center);r.render(scene,camera);result.push([id,r.domElement.toDataURL('image/png').split(',')[1]]);scene.remove(group);}r.dispose();pmrem.dispose();return result;}''')
 for name,encoded in data:
  png=Path('/tmp')/(name+'.png');png.write_bytes(base64.b64decode(encoded));subprocess.run(['magick',str(png),'-quality','87',str(root/'assets/specimens'/f'{name}.webp')],check=True)
 b.close()
print('Rendered 12 specimen assets')
