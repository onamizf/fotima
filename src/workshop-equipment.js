/* Tray models use the exact exploration apparatus; extra tools share its glass factory. */
function buildWorkshopEquipment(id,{T,lowDetail=false}){
 const setup=['stand-base','clamp','burner','tripod','gauze','beaker','tube','thermometer'];
 if(setup.includes(id)){const b=buildSetupEquipment(['stand-base','clamp'].includes(id)?'stand':id,{T,lowDetail});if(id==='stand-base')b.refs.clamp.parent?.remove(b.refs.clamp);if(id==='clamp'){b.refs.clamp.parent?.remove(b.refs.clamp);b.group.clear();b.group.add(b.refs.clamp);}return b;}
 if(['conical-flask','funnel','measuring-cylinder','evaporating-dish'].includes(id))return buildEquipment(id,{T,lowDetail});
 const group=new T.Group(),geometries=new Set(),materials=new Set(),textures=new Set(),n=lowDetail?24:48;
 const mat=(color,props={})=>{const m=new T.MeshStandardMaterial({color,roughness:.35,metalness:.75,...props});materials.add(m);return m;};
 const steel=mat('#8E9AA8'),porcelain=mat('#fffdf2',{metalness:0,roughness:.3});
 const add=(g,m,x=0,y=0,z=0)=>{geometries.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);group.add(o);return o;};
 const cyl=(r,h,m,x=0,y=0,z=0)=>add(new T.CylinderGeometry(r,r,h,n),m,x,y,z);
 const lathe=(p,m)=>add(new T.LatheGeometry(p.map(v=>new T.Vector2(...v)),n),m);
 if(id.endsWith('-bottle')||id==='spirit-lamp'){
  const glass=createGlassMaterial({T,lowDetail});materials.add(glass);lathe([[0,0],[.36,0],[.41,.08],[.41,.76],[.25,.94],[.16,.98],[.16,1.2],[.19,1.22],[.19,1.27],[.12,1.27],[.12,1.02],[.35,.78],[.35,.12],[0,.12]],glass);
  const liquid=mat(id==='water-bottle'?'#4FB3F0':'#B48CFF',{transparent:true,opacity:.75,metalness:0,roughness:.08,depthWrite:false});cyl(.345,.48,liquid,0,.37);const cap=mat('#eeeeea',{metalness:.15,roughness:.5});const capMesh=cyl(.20,.10,cap,0,1.31);capMesh.name='bottle-cap';
  if(id==='spirit-lamp'){cyl(.13,.25,steel,0,1.1);cyl(.035,.26,mat('#d8c8a4',{metalness:0}),0,1.35);}
 }else if(id==='match-stick'){const wood=mat('#c4a576',{metalness:0,roughness:.8});add(new T.BoxGeometry(.035,.55,.035),wood,0,.275);add(new T.SphereGeometry(.04,12,8),mat('#c83343',{metalness:0}),0,.57);
 }else if(id==='tube-holder'){
  const wood=mat('#bd8e5e',{metalness:0,roughness:.8});for(const s of [-1,1]){const o=add(new T.BoxGeometry(.18,1.8,.14),wood,s*.14,.9);o.rotation.z=s*.065;}cyl(.09,.32,steel,0,1.2).rotation.z=Math.PI/2;
 }else if(id==='crucible-tongs'){
  for(const s of [-1,1]){const curve=new T.CatmullRomCurve3([new T.Vector3(s*.36,0,0),new T.Vector3(s*.12,.7,0),new T.Vector3(-s*.22,1.25,0),new T.Vector3(-s*.32,1.6,0)]);add(new T.TubeGeometry(curve,24,.035,8,false),steel);const ring=add(new T.TorusGeometry(.2,.035,8,n),steel,s*.36,-.18);ring.rotation.y=Math.PI/10;}cyl(.07,.10,steel,0,.78).rotation.x=Math.PI/2;
 }else if(id==='mortar'){
  lathe([[0,0],[.45,0],[.6,.15],[.85,.75],[.88,.82],[.77,.86],[.68,.69],[.48,.3],[0,.2]],porcelain);const pestle=cyl(.12,1.3,porcelain,.30,.76);pestle.rotation.z=-.6;add(new T.SphereGeometry(.16,n,16),porcelain,.66,1.29);
 }else throw Error('Unknown workshop equipment '+id);
 finishEquipmentGlass(group,{T,lowDetail,materials,geometries,textures});return {group,dispose(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
