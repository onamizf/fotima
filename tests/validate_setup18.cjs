/* Physical supports and liquid containment, including tests that deliberately break the assembly. */
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),T=require('../assets/vendor/setup-r128/three.min.js');
const draw=new Proxy({createLinearGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})});const ctx=vm.createContext({window:{THREE:T},document:{createElement:()=>({getContext:()=>draw})}});
for(const f of ['data/topics/ch1/setup-1-2.js','src/equipment-glass.js','src/setup-assembly.js','src/setup-equipment.js','src/equipment-models.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
const Assembly=vm.runInContext('SetupAssembly',ctx),ids=Array.from(vm.runInContext('Setup12Data.ids',ctx));
for(const lowDetail of [false,true]){
 const built={};for(const id of ids){Object.assign(ctx,{id,lowDetail});built[id]=vm.runInContext('buildEquipment(id,{context:"setup",lowDetail})',ctx);}
 const assembly=Assembly.layout(T,built),v=Assembly.validate(T,built,assembly);assert(v.ok,JSON.stringify(v));assert(Math.abs(v.tubeBottomClearance/assembly.H-.3)<1e-6);assert(v.beakerGauzeGap<assembly.H*.005);
 const d=Assembly.dimensions;assert.equal(d.gauzeSide,1.7*d.W);assert.equal(d.tubeHeight,1.35*d.H);assert.equal(d.thermometerHeight,2.1*d.H);assert(built.burner.refs.hose.geometry.type==='TubeGeometry');assert.equal(built.water.refs.body.material.opacity,.7);assert.equal(built.alcohol.refs.body.material.opacity,.8);
 for(const id of ['water','alcohol']){assert.equal(built[id].refs.body.renderOrder,1);assert.equal(built[id].refs.body.material.depthWrite,true);}
 for(const id of ['tube','beaker','thermometer'])built[id].group.traverse(o=>{if(o.isMesh&&o.material.userData.labGlass)assert.equal(o.renderOrder,o.material.side===T.BackSide?2:3);});
 const broken=Object.fromEntries(Object.entries(assembly.base).map(([id,p])=>[id,p.clone()]));broken.beaker.y+=.1;assert(!Assembly.validate(T,built,assembly,broken).checks.beakerOnGauze);broken.beaker.copy(assembly.base.beaker);broken.tube.y-=1;assert(!Assembly.validate(T,built,assembly,broken).checks.tubeAboveBottom);broken.tube.copy(assembly.base.tube);broken.thermometer.y+=3;assert(!Assembly.validate(T,built,assembly,broken).checks.thermometerInTube);
 for(const p of [0,.5,1,.4,0]){const positions=Object.fromEntries(ids.map(id=>[id,assembly.base[id].clone().lerp(assembly.exploded[id],p)]));if(p===0)assert(Assembly.validate(T,built,assembly,positions).ok);for(const id of ids)assert(built[id].group.scale.equals(new T.Vector3(1,1,1)));}
 ids.forEach(id=>built[id].dispose());
}
console.log('PASS desktop/phone support graph, beaker on gauze, cartridge on plate, feet on table, 30% tube clearance, thermometer/alcohol/water containment, hose, render passes, exact assembly round-trip and negative checks');
