/* Original macroscopic specimen meshes. Morphology is illustrative, not an atomic lattice model. */
const SpecimenModels=(()=>{
 const materials=new Map(),geometries=new Map();const T=()=>window.THREE;
 function mat(key,color,opts={}){if(!materials.has(key))materials.set(key,new (T().MeshPhysicalMaterial)({color,roughness:.45,...opts}));return materials.get(key);}
 function geo(key,create){if(!geometries.has(key))geometries.set(key,create());return geometries.get(key);}
 function mesh(parent,g,m,x=0,y=0,z=0,sx=1,sy=1,sz=1){const obj=new (T().Mesh)(g,m);obj.position.set(x,y,z);obj.scale.set(sx,sy,sz);obj.castShadow=!m.transparent;obj.receiveShadow=true;parent.add(obj);return obj;}
 function box(p,m,x,y,z,a,b,c){return mesh(p,geo('box',()=>new (T().BoxGeometry)(1,1,1)),m,x,y,z,a,b,c);}
 function cyl(p,m,x,y,z,r,h,top=r){return mesh(p,geo('cyl-'+top/r,()=>new (T().CylinderGeometry)(top/r,1,1,40)),m,x,y,z,r,h,r);}
 function lathe(p,key,points,m){return mesh(p,geo(key,()=>new (T().LatheGeometry)(points.map(([x,y])=>new (T().Vector2)(x,y)),64)),m);}
 function build(parent,id){const th=T(),group=new th.Group();parent.add(group);group.userData.specimen=id;
  const glass=mat('glass',0xf1faf7,{transmission:.96,thickness:.08,roughness:.035,ior:1.47,side:th.DoubleSide});
  if(id==='water'||id==='ethanol'){
   if(id==='water'){
    lathe(group,'beaker',[[0,0],[.34,0],[.37,.04],[.37,.88],[.40,.92],[.40,.95],[.34,.95],[.34,.09],[0,.07]],glass);
    cyl(group,mat('water',0xe8f6f7,{transparent:true,opacity:.64,transmission:.5,roughness:.04,ior:1.33,thickness:.3}),0,.31,0,.332,.46);
    const surface=mesh(group,geo('surface',()=>new th.CircleGeometry(1,64)),mat('surface',0xe7f7f8,{transparent:true,opacity:.28,roughness:.02}),0,.545,0,.333,.333,1);surface.rotation.x=-Math.PI/2;
    for(let i=0;i<5;i++)box(group,mat('marks',0x758a87,{roughness:.4}),.22,.22+i*.11,.296,.10,.01,.008);
   }else{
    lathe(group,'bottle',[[0,0],[.28,0],[.32,.05],[.32,.63],[.27,.77],[.12,.90],[.12,1.04],[.085,1.04],[.085,.88],[.25,.73],[.28,.61],[.28,.07],[0,.06]],glass);
    cyl(group,mat('ethanol',0xf0f4f0,{transparent:true,opacity:.55,transmission:.5,roughness:.04,thickness:.3}),0,.27,0,.277,.4);
    cyl(group,mat('cap',0x3a4a45,{roughness:.4}),0,1.065,0,.145,.12);
   }return group;
  }
  const colors={salt:0xe2e4dc,sugar:0xfaf3df,soda:0xf1efe5,'copper-sulfate':0x228eca,aluminium:0xc6d1d4,zinc:0x9ba5a5,iron:0x777e7b,copper:0xb97144,sulfur:0xe7cc43,iodine:0x35323e};
  if(['aluminium','zinc','iron','copper'].includes(id)){
   const metal=mat(id,colors[id],{metalness:.9,roughness:id==='iron'?.48:.24,clearcoat:.18});
   if(id==='copper'){
    const plate=box(group,metal,0,.10,0,.82,.045,.54);plate.rotation.y=.22;
    const curve=new th.CatmullRomCurve3([new th.Vector3(-.3,.14,.3),new th.Vector3(-.15,.25,.37),new th.Vector3(.2,.42,.27),new th.Vector3(.35,.29,.1)]);
    mesh(group,geo('copper-wire',()=>new th.TubeGeometry(curve,28,.025,10,false)),metal);
   }else if(id==='iron'){
    for(let i=0;i<3;i++){const nail=new th.Group();group.add(nail);nail.rotation.z=1.35;nail.rotation.y=i*.5;nail.position.set((i-1)*.16,.12+i*.035,(i-1)*.08);cyl(nail,metal,0,.2,0,.023,.65);cyl(nail,metal,0,.54,0,.07,.027);cyl(nail,metal,0,-.14,0,.023,.08,0);}
   }else if(id==='aluminium'){
    const positions=[],indices=[],n=16;for(let j=0;j<=n;j++)for(let i=0;i<=n;i++){const x=(i/n-.5)*.85,z=(j/n-.5)*.6,y=.12+.026*Math.sin(i*1.7)*Math.cos(j*.8)+.02*Math.sin(i+j);positions.push(x,y,z);}
    for(let j=0;j<n;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i,b=a+1,c=a+n+1,d=c+1;indices.push(a,c,b,b,c,d);}
    const foil=geo('foil',()=>{const g=new th.BufferGeometry();g.setAttribute('position',new th.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;});const m=mat('foil',0xd0d9dc,{metalness:.96,roughness:.25,side:th.DoubleSide});mesh(group,foil,m);
   }else{
    const a=box(group,metal,-.12,.13,0,.53,.19,.38);a.rotation.y=.35;const b=box(group,metal,.23,.19,.1,.30,.27,.32);b.rotation.y=-.4;
   }return group;
  }
  const powder=id==='soda',cube=id==='salt',sugar=id==='sugar',blue=id==='copper-sulfate';
  const crystal=mat(id,colors[id],{roughness:powder?.9:id==='iodine'?.25:id==='sulfur'?.7:.32,metalness:id==='iodine'?.25:0,transmission:cube||sugar?.14:blue?.12:0,thickness:.08,clearcoat:blue?.45:.06});
  const shape=cube?geo('salt-cube',()=>new th.BoxGeometry(1,1,1)):sugar?geo('sugar-prism',()=>new th.CylinderGeometry(.65,.8,1,5)):blue?geo('blue-crystal',()=>new th.OctahedronGeometry(1,0)):id==='iodine'?geo('iodine-plate',()=>new th.BoxGeometry(1,.2,.65)):id==='sulfur'?geo('sulfur-chunk',()=>new th.DodecahedronGeometry(1,0)):geo('powder',()=>new th.IcosahedronGeometry(1,0));
  const count=powder?145:cube||sugar?52:blue?14:11;
  for(let i=0;i<count;i++){const a=i*2.399963,r=.33*Math.sqrt((i+.5)/count),x=Math.cos(a)*r,z=Math.sin(a)*r,size=powder?.022+(i%5)*.003:cube?.065+(i%4)*.008:sugar?.065+(i%3)*.014:blue?.115+(i%4)*.025:.12+(i%3)*.025;
   const y=size*.6+(.35-r)*.30;const obj=mesh(group,shape,crystal,x,y,z,size,blue?size*1.6:size,sugar?size*.7:size);obj.rotation.set(i*.57,i*.83,i*.41);
  }return group;
 }
 return {build};
})();
