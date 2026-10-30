/* One dimensional specification and a support graph, shared by geometry, layout and diagnostics. */
const SetupAssembly=(()=>{
 const H=2,W=.86*H,dimensions=Object.freeze({H,W,tubeHeight:1.35*H,tubeRadius:.27*W/2,thermometerHeight:2.1*H,thermometerRadius:.08*W/2,gauzeSide:1.7*W,gauzeThickness:.03*H,ringTop:1.25*H,ringRadius:1.1*W/2,plateWidth:1.9*W,plateDepth:1.2*W,plateHeight:.06*H,rodHeight:3.6*H,rodX:-1.08*W,plateX:-.415*W,cartridgeRadius:.6*W/2,cartridgeHeight:.35*H,burnerPipeHeight:.4*H});
 function bounds(T,object,relativeTo=null){object.updateWorldMatrix(true,true);const result=new T.Box3(),inverse=relativeTo?(relativeTo.updateWorldMatrix(true,false),relativeTo.matrixWorld.clone().invert()):new T.Matrix4();object.traverse(o=>{if(!o.isMesh||o.userData.opticalLayer)return;o.geometry.computeBoundingBox();result.union(o.geometry.boundingBox.clone().applyMatrix4(new T.Matrix4().multiplyMatrices(inverse,o.matrixWorld)));});return result;}
 function layout(T,built){
  const B=id=>bounds(T,built[id].refs.body),part=(id,key)=>bounds(T,built[id].refs[key]),base={},tableY=0;
  const beaker=B('beaker'),tube=B('tube'),water=B('water'),alcohol=B('alcohol'),h=beaker.max.y-beaker.min.y;
  const plate=part('stand','plate'),ring=part('tripod','ring'),tripod=part('tripod','feet'),cartridge=part('burner','cartridge'),gauze=B('gauze');
  base.stand=new T.Vector3(0,tableY-plate.min.y,0);
  base.tripod=new T.Vector3(0,tableY-tripod.min.y,0);
  base.burner=new T.Vector3(0,plate.max.y+base.stand.y-cartridge.min.y,0);
  base.gauze=new T.Vector3(0,ring.max.y+base.tripod.y-gauze.min.y,0);
  base.beaker=new T.Vector3(0,gauze.max.y+base.gauze.y-beaker.min.y,0);
  const beakerFloor=base.beaker.y+built.beaker.metrics.innerBottom;
  base.water=new T.Vector3(0,beakerFloor-water.min.y,0);
  base.tube=new T.Vector3(0,beakerFloor+.3*h-tube.min.y,0);
  base.alcohol=new T.Vector3(0,base.tube.y+built.tube.metrics.innerBottom-alcohol.min.y,0);
  const spiritCenter=base.alcohol.y+(alcohol.min.y+alcohol.max.y)/2;
  base.thermometer=new T.Vector3(0,spiritCenter-built.thermometer.metrics.bulbCenter,0);
  const clampHeight=base.tube.y+tube.min.y+.75*(tube.max.y-tube.min.y);
  built.stand.refs.clamp.position.y=clampHeight-base.stand.y;
  built.stand.group.updateMatrixWorld(true);
  const exploded=Object.fromEntries(Object.entries(base).map(([id,p])=>[id,p.clone()]));
  exploded.stand.x-=.9*W;exploded.burner.x+=1.45*W;
  let top=base.tripod.y+ring.max.y;const gap=.10*H;
  for(const id of ['gauze','beaker','tube','thermometer']){const box=bounds(T,built[id].refs.body);exploded[id].y=top+gap-box.min.y;top=exploded[id].y+box.max.y;}
  for(const [child,parent] of [['water','beaker'],['alcohol','tube']])exploded[child].y=exploded[parent].y+base[child].y-base[parent].y;
  return {base,exploded,H:h,tableY,clampHeight};
 }
 function validate(T,built,assembly,positions=assembly.base){
  // All comparisons use the same model-local frame; camera fitting cannot change the result.
  const translated=(id,key='body')=>bounds(T,built[id].refs[key],built[id].group).translate(positions[id]);
  const b=translated('beaker'),g=translated('gauze'),tube=translated('tube'),water=translated('water'),alcohol=translated('alcohol'),plate=translated('stand','plate'),can=translated('burner','cartridge');
  const floor=positions.beaker.y+built.beaker.metrics.innerBottom,bulb=positions.thermometer.y+built.thermometer.metrics.bulbCenter,innerTube=positions.tube.y+built.tube.metrics.innerBottom,tolerance=assembly.H*.005;
  const checks={beakerOnGauze:Math.abs(b.min.y-g.max.y)<tolerance,tubeAboveBottom:tube.min.y>=floor+.3*assembly.H-tolerance,thermometerInTube:bulb>innerTube&&bulb<alcohol.max.y&&Math.hypot(positions.thermometer.x-positions.tube.x,positions.thermometer.z-positions.tube.z)+dimensions.thermometerRadius<built.tube.metrics.innerRadius,alcoholInTube:alcohol.min.y>=innerTube-tolerance&&alcohol.max.y<tube.max.y&&Math.hypot(positions.alcohol.x-positions.tube.x,positions.alcohol.z-positions.tube.z)+built.alcohol.metrics.radius<built.tube.metrics.innerRadius,waterInBeaker:water.min.y>=floor-tolerance&&water.max.y<b.max.y&&Math.hypot(positions.water.x-positions.beaker.x,positions.water.z-positions.beaker.z)+built.water.metrics.radius<built.beaker.metrics.innerRadius,plateOnTable:Math.abs(plate.min.y-assembly.tableY)<tolerance,cartridgeOnPlate:Math.abs(can.min.y-plate.max.y)<tolerance,feetOnTable:built.tripod.refs.footMeshes.every(foot=>{foot.geometry.computeBoundingBox();return Math.abs(foot.geometry.boundingBox.min.y+foot.position.y+positions.tripod.y-assembly.tableY)<tolerance;}),clampAtUpperThird:Math.abs(built.stand.refs.clamp.position.y+positions.stand.y-(tube.min.y+(tube.max.y-tube.min.y)*.75))<tolerance};
  return {ok:Object.values(checks).every(Boolean),checks,beakerGauzeGap:b.min.y-g.max.y,tubeBottomClearance:tube.min.y-floor,beakerHeight:assembly.H,bulbCenter:bulb,alcoholRange:[alcohol.min.y,alcohol.max.y],waterRange:[water.min.y,water.max.y],positions:Object.fromEntries(Object.entries(positions).map(([id,v])=>[id,v.toArray()]))};
 }
 return {dimensions,layout,validate,bounds};
})();
