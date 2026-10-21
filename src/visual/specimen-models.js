/* Original macroscopic specimen meshes. Morphology is illustrative, not an atomic lattice model. */
const SpecimenModels=(()=>{
 const materials=new Map(),geometries=new Map();const T=()=>window.THREE;
 function mat(key,color,opts={}){if(!materials.has(key))materials.set(key,new (T().MeshPhysicalMaterial)({color,roughness:.45,...opts}));return materials.get(key);}
 function geo(key,create){if(!geometries.has(key))geometries.set(key,create());return geometries.get(key);}
 function mesh(parent,g,m,x=0,y=0,z=0,sx=1,sy=1,sz=1){const obj=new (T().Mesh)(g,m);obj.position.set(x,y,z);obj.scale.set(sx,sy,sz);obj.castShadow=!m.transparent;obj.receiveShadow=true;parent.add(obj);return obj;}
 function box(p,m,x,y,z,a,b,c){return mesh(p,geo('box',()=>new (T().BoxGeometry)(1,1,1)),m,x,y,z,a,b,c);}
 function cyl(p,m,x,y,z,r,h,top=r){return mesh(p,geo('cyl-'+top/r,()=>new (T().CylinderGeometry)(top/r,1,1,40)),m,x,y,z,r,h,r);}
 function lathe(p,key,points,m){return mesh(p,geo(key,()=>new (T().LatheGeometry)(points.map(([x,y])=>new (T().Vector2)(x,y)),64)),m);}
 function label(p,text,x,y,z,w=.45,h=.25,bg='#fffdf3',ink='#163d48'){
  const key='label-'+text+bg+ink;if(!materials.has(key)){const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,512,256);ctx.fillStyle=ink;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 76px sans-serif';ctx.fillText(text,256,134,470);const texture=new (T().CanvasTexture)(c);texture.colorSpace=T().SRGBColorSpace;materials.set(key,new (T().MeshStandardMaterial)({map:texture,roughness:.55}));}return mesh(p,geo('label-plane',()=>new (T().PlaneGeometry)(1,1)),materials.get(key),x,y,z,w,h,1);
 }
 function cap(p,y,r,color){const m=mat('cap-'+color,color,{roughness:.42});cyl(p,m,0,y,0,r,.14);for(let i=0;i<40;i++){const a=i*Math.PI/20;cyl(p,m,Math.sin(a)*r,y,Math.cos(a)*r,.006,.12);}}
 function build(parent,id,{presentation=true}={}){const th=T(),group=new th.Group();parent.add(group);group.userData.specimen=id;
  const glass=mat('glass',0xb5e5f5,{transparent:true,opacity:.45,transmission:.35,clearcoat:1,thickness:.09,roughness:.025,ior:1.47,side:th.DoubleSide});
  const silver=mat('silver',0xdde9f5,{metalness:.94,roughness:.2});
  if(id==='water'){
   const profile=[[0,0],[.4,0],[.43,.035],[.43,.10],[.15,.78],[.13,.86],[.13,1.12],[.17,1.14],[.17,1.18],[.11,1.18],[.10,.84],[.39,.10],[.39,.05],[0,.05]];
   lathe(group,'erlenmeyer-flask',profile,glass);
   const water=mat('clear-water',0xe4fbff,{transmission:.35,transparent:true,opacity:.33,thickness:.55,roughness:.025,ior:1.333});
   lathe(group,'flask-water',[[0,.06],[.38,.06],[.38,.12],[.255,.43],[0,.43]],water);
   const ring=geo('water-ripple',()=>new th.TorusGeometry(.12,.004,6,48));for(let i=0;i<3;i++){const r=mesh(group,ring,glass,.03,.435,0,1+i*.48,1+i*.48,1);r.rotation.x=Math.PI/2;}
   if(presentation){const curve=new th.CatmullRomCurve3([new th.Vector3(.29,1.58,0),new th.Vector3(.08,1.35,0),new th.Vector3(.025,1.03,0),new th.Vector3(.03,.46,0)]);mesh(group,geo('water-stream',()=>new th.TubeGeometry(curve,24,.022,10,false)),water);}
   return group;
  }
  if(id==='ethanol'){
   const amber=mat('amber-bottle',0x70300b,{transmission:.25,thickness:.18,roughness:.09,clearcoat:1,side:th.DoubleSide});
   lathe(group,'reagent-bottle',[[0,0],[.29,0],[.33,.05],[.33,.66],[.3,.77],[.19,.88],[.18,1.02],[.14,1.02],[.14,.88],[.28,.70],[.28,.06],[0,.06]],amber);cap(group,1.04,.205,0xfffdf1);label(group,'SPIRT',0,.44,.334,.57,.36);return group;
  }
  const metalIds=['aluminium','zinc','iron','copper'];
  if(metalIds.includes(id)){
   const metal=id==='copper'?mat('copper',0xd26d34,{metalness:.88,roughness:.24}):id==='iron'?mat('iron',0xa5b4c3,{metalness:.92,roughness:.28}):silver;
   if(id==='aluminium'){
    for(let i=0;i<14;i++){const a=i*2.4,r=.30*Math.sqrt((i+.5)/14);mesh(group,geo('pellet-sphere',()=>new th.SphereGeometry(1,20,14)),metal,Math.cos(a)*r-.12,.065+(i%3)*.035,Math.sin(a)*r,.065,.065,.065);}
    if(presentation)for(let bundle=0;bundle<2;bundle++)for(let strand=0;strand<7;strand++){const a=strand*Math.PI/3,r=strand===6?0:.027;const wire=cyl(group,metal,.26+Math.sin(a)*r,.12+Math.cos(a)*r,-.08+bundle*.16,.025,.62);wire.rotation.z=Math.PI/2;wire.rotation.y=.15;}
   }else if(id==='copper'){
    for(let i=0;i<40;i++){const a=i*2.4,r=.32*Math.sqrt((i+.5)/40);const curl=mesh(group,geo('copper-shaving',()=>new th.TorusGeometry(.042,.009,5,14,4.7)),metal,Math.cos(a)*r,.07+(1-r/.4)*.12,Math.sin(a)*r,1+(i%3)*.3,1,1);curl.rotation.set(i*.7,i*.4,i*.8);}
   }else{
    for(let i=0;i<30;i++){const a=i*2.4,r=.33*Math.sqrt((i+.5)/30);const pellet=mesh(group,geo('flattened-granule',()=>new th.IcosahedronGeometry(1,1)),metal,Math.cos(a)*r,.045+(1-r/.4)*.09,Math.sin(a)*r,.045+(i%4)*.008,.018,.052);pellet.rotation.set(i*.13,i*.8,i*.17);}
    if(id==='iron')for(let i=0;i<2;i++){const nail=new th.Group();group.add(nail);nail.rotation.z=1.45;nail.rotation.y=i*.7;nail.position.set((i-1)*.13,.18+i*.04,.07);cyl(nail,metal,0,.1,0,.023,.58);cyl(nail,metal,0,.40,0,.065,.025);cyl(nail,metal,0,-.22,0,.023,.06,0);}
   }return group;
  }
  // Presentation containers are excluded from material added to a mixing beaker.
  if(presentation){
   if(id==='soda'){
    const pack=new th.Group();group.add(pack);pack.position.set(-.23,0,-.16);pack.rotation.y=-.15;box(pack,mat('soda-red',0xe33227,{roughness:.5}),0,.43,0,.46,.86,.25);box(pack,mat('soda-yellow',0xffd528,{roughness:.5}),0,.43,.129,.40,.75,.015);label(pack,'NaHCO₃',0,.45,.14,.35,.55);
   }else if(['salt','sugar','sulfur'].includes(id)){
    const jar=new th.Group();group.add(jar);jar.position.set(-.23,0,-.18);const isSulfur=id==='sulfur';
    lathe(jar,'sample-jar',[[0,0],[.22,0],[.24,.04],[.24,.66],[.20,.73],[.20,.79],[.17,.79],[.17,.72],[.21,.64],[.21,.05],[0,.05]],isSulfur?mat('white-jar',0xfffdf2,{roughness:.27}):glass);
    if(!isSulfur)cyl(jar,mat('white-powder',0xffffff,{roughness:.85}),0,.23,0,.205,.37);
    cap(jar,.80,.23,isSulfur?0xffb51c:0xd9e5eb);label(jar,isSulfur?'S':id==='salt'?'NaCl':'Sugar',0,.42,.242,.36,.22);
   }else if(id==='copper-sulfate'||id==='iodine'){
    lathe(group,'petri-dish',[[0,.005],[.43,.005],[.46,.025],[.46,.12],[.44,.13],[.435,.03],[0,.03]],glass);
   }
  }
  const colors={salt:0xffffff,sugar:0xfffdf3,soda:0xffffff,'copper-sulfate':0x0052c9,sulfur:0xffdd16,iodine:0x111019};
  const powder=['soda','salt','sugar'].includes(id),blue=id==='copper-sulfate',iodine=id==='iodine';
  const crystal=mat('grains-'+id,colors[id],{roughness:powder?.65:iodine?.18:.32,metalness:iodine?.35:0,clearcoat:iodine||blue?.7:.05});
  const shape=geo('grain-'+id,()=>id==='salt'?new th.BoxGeometry(1,1,1):iodine?new th.OctahedronGeometry(1,0):new th.IcosahedronGeometry(1,0));
  const count=powder?220:blue?100:iodine?100:75;
  for(let i=0;i<count;i++){const a=i*2.399963,r=.35*Math.sqrt((i+.5)/count),size=powder?.016+(i%5)*.004:.035+(i%5)*.009;const x=Math.cos(a)*r+(presentation&&['salt','sugar','soda','sulfur'].includes(id)?.16:0),z=Math.sin(a)*r+(presentation?.18:0),y=.045+size*.5+(.35-r)*.63;const obj=mesh(group,shape,crystal,x,y,z,size,iodine?size*.6:size,size);obj.rotation.set(i*.57,i*.83,i*.41);}
  return group;
 }
 return {build};
})();
