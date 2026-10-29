/* Reusable primitive models; pass the Three.js namespace used by the caller. No renderer or camera here. */
function buildEquipment(name,{T=window.THREE}={}){
 const id=({tube:'test-tube',dish:'evaporating-dish',flask:'conical-flask',cylinder:'measuring-cylinder'})[name]||name,group=new T.Group(),geometries=new Set(),materials=new Set(),textures=new Set(),anchors=[];
 const material=(color,props={})=>{const m=new T.MeshStandardMaterial({color,roughness:.35,envMapIntensity:.25,...props});materials.add(m);return m;};
 const glass=()=>{const m=new T.MeshPhysicalMaterial({color:'#d5f3ff',transparent:true,opacity:.55,roughness:.05,metalness:0,side:T.DoubleSide,depthWrite:false,envMapIntensity:.25});if('transmission' in m)m.transmission=.9;if('ior' in m)m.ior=1.5;if('thickness' in m)m.thickness=.08;materials.add(m);return m;};
 const steel=material('#8E9AA8',{metalness:.45,roughness:.35}),clear=glass(),porcelain=material('#fffdf7',{roughness:.23,metalness:0}),water=material('#6ec6ff',{transparent:true,opacity:.4,roughness:.08,depthWrite:false});
 function mesh(geometry,mat,x=0,y=0,z=0){geometries.add(geometry);const o=new T.Mesh(geometry,mat);o.position.set(x,y,z);o.castShadow=!mat.transparent;o.receiveShadow=true;group.add(o);return o;}
 const box=(w,h,d,mat,x,y,z)=>mesh(new T.BoxGeometry(w,h,d),mat,x,y,z),cyl=(r,h,mat,x,y,z,segments=40,top=r)=>mesh(new T.CylinderGeometry(top,r,h,segments),mat,x,y,z),ring=(r,t,mat,x,y,z)=>{const o=mesh(new T.TorusGeometry(r,t,8,48),mat,x,y,z);o.rotation.x=Math.PI/2;return o;};
 const lathe=(points,mat,x=0,z=0)=>mesh(new T.LatheGeometry(points.map(p=>new T.Vector2(...p)),48),mat,x,0,z);
 function texture(draw,w=256,h=512){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);textures.add(t);return t;}
 function scale(radius,low,height,max,steps=20){const t=texture((c,w,h)=>{c.strokeStyle='#25465c';c.fillStyle='#25465c';c.lineWidth=3;c.font='bold 25px Arial';for(let i=0;i<=steps;i++){const y=18+i*(h-36)/steps;c.beginPath();c.moveTo(10,y);c.lineTo(i%5?60:105,y);c.stroke();if(i%5===0)c.fillText(String(Math.round(max*(steps-i)/steps)),116,y+8);}});const mat=new T.MeshBasicMaterial({map:t,transparent:true,depthWrite:false,side:T.DoubleSide});materials.add(mat);mesh(new T.PlaneGeometry(radius*.9,height),mat,0,low+height/2,radius+.012);}
 const point=(key,x,y,z)=>anchors.push({key,point:new T.Vector3(x,y,z)});
 if(id==='test-tube'){
  const grain=texture((c,w,h)=>{c.fillStyle='#c79360';c.fillRect(0,0,w,h);for(let i=0;i<35;i++){c.strokeStyle=i%2?'#dab183':'#b17a47';c.lineWidth=1+i%3;c.beginPath();for(let y=0;y<=h;y+=8){const x=i*w/35+Math.sin(y*.021+i)*3;y?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}},256,256),wood=material('#efcc9d',{map:grain,roughness:.78}),dark=material('#6c472c',{roughness:.9});
  box(3.4,.17,1.0,wood,0,.1,0);for(const x of [-1.53,1.53])box(.18,1.7,.85,wood,x,.94,0);box(3.4,.15,.18,wood,0,1.65,-.42);box(3.4,.15,.18,wood,0,1.65,.42);
  for(const x of [-1.05,-.35,.35,1.05]){box(.13,.15,.72,wood,x+.32,1.65,0);ring(.205,.055,wood,x,1.67,0);cyl(.18,.013,dark,x,.21,0);lathe([[0,.28],[.10,.3],[.165,.37],[.18,.48],[.18,2.82],[.205,2.85],[.205,2.91],[.15,2.91],[.15,.5],[.12,.42],[0,.39]],clear,x,0);}
  point('0',.35,2.9,0);point('1',.35,.33,.05);point('2',-1.2,1.65,.42);
 }else if(id==='beaker'){
  lathe([[0,.07],[.88,.07],[1,.16],[1.02,.28],[1.02,2.64],[1.07,2.7],[1.03,2.76],[.95,2.71],[.95,.3],[.86,.19],[0,.19]],clear);const spout=mesh(new T.ConeGeometry(.22,.4,3,1,true),clear,1.04,2.69,0);spout.rotation.z=-Math.PI/2;scale(1.02,.55,1.7,250,10);cyl(.91,.67,water,0,.55,0);point('0',1.25,2.72,0);point('1',0,1.55,1.04);point('2',.65,.1,.3);
 }else if(id==='evaporating-dish'){
  lathe([[0,.08],[.6,.08],[.88,.18],[1.2,.48],[1.58,1.1],[1.62,1.15],[1.54,1.19],[1.45,1.04],[1.1,.53],[.76,.3],[0,.24]],porcelain);const spout=mesh(new T.ConeGeometry(.23,.44,3,1,true),porcelain,1.55,1.12,0);spout.rotation.z=-Math.PI/2;point('0',1.77,1.12,0);point('1',-1.0,.58,.68);point('2',0,.5,0);
 }else if(id==='conical-flask'){
  lathe([[0,.08],[1.08,.08],[1.16,.18],[1.12,.34],[.4,2.55],[.34,2.7],[.34,3.3],[.39,3.34],[.39,3.4],[.29,3.4],[.29,2.72],[.35,2.57],[1.04,.35],[1.04,.22],[0,.2]],clear);cyl(.89,.35,water,0,.4,0,48,.82);point('0',0,3.2,.34);point('1',-.7,1.2,.5);point('2',.75,.12,.4);
 }else if(id==='funnel'){
  box(2.8,.16,1.7,steel,-.35,.1,0);cyl(.055,3.3,steel,-1.4,1.81,0);const arm=cyl(.04,1.42,steel,-.69,2.12,0);arm.rotation.z=Math.PI/2;ring(.7,.045,steel,0,2.12,0);lathe([[.085,.48],[.085,1.5],[.92,2.94],[.96,2.98],[.9,3.02],[.045,1.53],[.045,.48]],clear);point('0',.6,2.65,.3);point('1',0,.6,.09);point('2',-.65,2.12,.1);
 }else if(id==='measuring-cylinder'){
  cyl(.77,.16,clear,0,.1,0,6);lathe([[0,.17],[.37,.17],[.4,.25],[.4,3.94],[.45,3.98],[.43,4.04],[.34,4.02],[.34,.3],[0,.3]],clear);cyl(.335,1.68,water,0,1.15,0);ring(.3,.013,water,0,2.0,0);scale(.4,.55,3.05,100,25);point('0',0,2.75,.42);point('1',.3,2.0,.1);point('2',.5,.11,.3);
 }else{throw Error('Unknown equipment: '+id);}
 const bounds=new T.Box3().setFromObject(group),center=bounds.getCenter(new T.Vector3());group.position.sub(center);group.name=id;
 return {group,anchors,dispose(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
