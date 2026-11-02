const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const fit=vm.runInNewContext(fs.readFileSync('src/wardrobe-joints.js','utf8')+';WardrobeJoints');
const data=vm.runInNewContext(fs.readFileSync('data/safety-wardrobe.js','utf8')+';SafetyWardrobeData');
let garments=0,triangles=0;
for(const item of data.items.filter(i=>i.joints)){
 garments++;const patches=fit.build(item.joints.cuffs);assert.equal(patches.length,2);
 for(let n=0;n<patches.length;n++){
  const patch=patches[n];assert.ok(patch.triangles.length<=64);
  for(const pin of item.joints.cuffs[n].pins){
   const p=patch.deform(pin.from);assert.ok(Math.hypot(p[0]-pin.to[0],p[1]-pin.to[1])<1e-7);
   const q=fit.inverse(patches,...p);assert.ok(Math.hypot(q[0]-pin.from[0],q[1]-pin.from[1])<1e-7);
  }
  for(const t of patch.triangles){triangles++;assert.ok(t.matrix[0]*t.matrix[3]-t.matrix[1]*t.matrix[2]>0,'inverted triangle');
   const p=[(t.source[0][0]+t.source[1][0]+t.source[2][0])/3,(t.source[0][1]+t.source[1][1]+t.source[2][1])/3],mapped=fit.apply(t.matrix,...p),inverse=fit.apply(t.inverse,...mapped);assert.ok(Math.hypot(p[0]-inverse[0],p[1]-inverse[1])<1e-7);
  }
  const [x,y,u,v]=patch.bounds;for(const p of [[x,y],[u,y],[u,v],[x,v]]){const q=patch.deform(p);assert.ok(Math.hypot(p[0]-q[0],p[1]-q[1])<1e-7);}
  assert.ok(fit.inOpening(patch.opening,patch.opening.x,patch.opening.y));
 }
 assert.deepEqual(JSON.parse(JSON.stringify(fit.inverse(patches,0,0))),[0,0]);
}
assert.equal(garments,6);const opening=data.items.find(i=>i.id==='space-suit').joints.neck.opening;
assert.ok(fit.inOpening(opening,448,410));assert.ok(fit.inOpening(opening,448,440));assert.ok(!fit.inOpening(opening,448,480));
console.log(`PASS ${garments} garments, ${triangles} positive triangles, pinned cuffs, fixed borders and inverse hit coordinates`);
