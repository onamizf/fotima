const {T,createStage}=await import('./core.js'+new URL(import.meta.url).search);
export function mount(host,options){return createStage(host,options,({k,group,task})=>{
 const id=task.id;
 const pupil=k.student(id==='danger-a'||id==='danger-c'?'#f4bd9c':'#cfaa80');pupil.position.set(0,.1,-.5);pupil.scale.setScalar(1.15);group.add(pupil);
 const beaker=k.equipment('beaker');beaker.position.set(0,0,.45);group.add(beaker);const tube=k.equipment('tube');tube.position.set(.48,.55,.15);tube.rotation.z=-.5;group.add(tube);const burner=k.burner();burner.group.position.set(-.8,0,.3);burner.group.scale.setScalar(.65);group.add(burner.group);
 const glassOnTable=new T.Group();for(const x of [-.09,.09])k.mesh(glassOnTable,new T.TorusGeometry(.08,.014,8,20),k.mat('#49bdd4'),x,0,0);glassOnTable.position.set(.9,.07,.6);glassOnTable.rotation.x=Math.PI/2;group.add(glassOnTable);
 const extra=[];for(let i=0;i<3;i++){const f=k.equipment('flask');f.position.set(-1.8+i*.48,0,-.3);f.scale.setScalar(.6);group.add(f);extra.push(f);}
 const steam=k.particles(group);steam.position.set(0,.7,.45);
 return {update(model,time,camera,reduced){const fixed=!!model.corrected,goal=fixed?0:(id==='danger-c'?.65:id==='danger-d'?.55:0);pupil.rotation.x+=reduced?goal-pupil.rotation.x:(goal-pupil.rotation.x)*.12;pupil.position.z+=reduced?((fixed?-.8:-.5)-pupil.position.z):((fixed?-.8:-.5)-pupil.position.z)*.12;pupil.userData.goggles.visible=id!=='danger-b'||fixed;glassOnTable.visible=id==='danger-b'&&!fixed;steam.visible=id==='danger-d'&&!reduced;steam.rotation.y=time*.15;k.animateParticles(steam,time);tube.position.y=id==='danger-c'&&!fixed?1.05:.4;extra.forEach((f,i)=>f.rotation.z=id==='danger-a'&&!fixed?-.3-i*.15:0);burner.update({flame:id==='danger-b'||id==='danger-d',air:100,gas:30},time,camera,reduced);}};
 });}
