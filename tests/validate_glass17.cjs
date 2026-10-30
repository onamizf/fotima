/* Both builders share optical parameters, front-only print, stable pass order and phone budget. */
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),T=require('../assets/vendor/setup-r128/three.min.js');
const draw=new Proxy({createLinearGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})});
const ctx=vm.createContext({window:{THREE:T},document:{createElement:()=>({getContext:()=>draw})}});
for(const f of ['src/equipment-glass.js','src/setup-equipment.js','src/equipment-models.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
for(const lowDetail of [false,true])for(const context of ['card','setup'])for(const id of context==='card'?['test-tube','beaker','conical-flask','measuring-cylinder','funnel']:['thermometer','tube','beaker']){
 Object.assign(ctx,{id,context,lowDetail});const b=vm.runInContext('buildEquipment(id,{context,lowDetail})',ctx);let fronts=0,backs=0,prints=0;
 b.group.traverse(o=>{if(!o.isMesh)return;const m=o.material;
 if(m.userData.labGlass){assert.equal(m.transmission,.55);assert.equal(m.color.getHexString(),'dcebfa');assert.equal(m.roughness,.05);assert(Math.abs(m.ior-1.5)<1e-12);assert.equal(m.thickness,.4);assert.equal(m.attenuationDistance,2);assert.equal(m.envMapIntensity,1.6);assert.equal(m.depthWrite,false);if(m.side===T.BackSide){backs++;assert.equal(m.opacity,.35);assert.equal(o.renderOrder,20);}else{fronts++;assert.equal(m.opacity,.9);assert.equal(o.renderOrder,30);}const shader={uniforms:{},vertexShader:T.ShaderLib.physical.vertexShader,fragmentShader:T.ShaderLib.physical.fragmentShader};m.onBeforeCompile(shader);assert(shader.fragmentShader.includes('float fresnel='));assert(shader.fragmentShader.includes(lowDetail?'edge*edge':'pow(edge,3.0)'));assert(shader.uniforms.labGlassBounds);}
 if(m.userData.labPrint){prints++;assert.equal(m.side,T.FrontSide);assert.equal(o.renderOrder,45);const shader={vertexShader:T.ShaderLib.basic.vertexShader,fragmentShader:T.ShaderLib.basic.fragmentShader};m.onBeforeCompile(shader);assert(shader.fragmentShader.includes('smoothstep(.05,.55'));}
 assert(!o.isLine&&!['EdgesGeometry','WireframeGeometry'].includes(o.geometry.type));
 });assert(fronts>0);assert.equal(backs,lowDetail?0:fronts);if(['beaker','measuring-cylinder','thermometer'].includes(id))assert(prints>0);if(context==='card'&&id!=='funnel'){let liquids=0;b.group.traverse(o=>{if(o.isMesh&&o.renderOrder===10)liquids++});assert(liquids>0);}b.dispose();
}
console.log('PASS shared glass, Fresnel, 2 desktop / 1 phone passes, front-only fading print, liquid-before-glass order, coloured liquid and no outline geometry');
