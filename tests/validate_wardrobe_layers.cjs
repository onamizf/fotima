/* Контракт полного холста и сохранности правил/наград. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),cp=require('node:child_process');
const read=source=>vm.runInNewContext(source+';SafetyWardrobeData');
const data=read(fs.readFileSync('data/safety-wardrobe.js','utf8'));
const old=read(cp.execFileSync('git',['show','1f38573:data/safety-wardrobe.js'],{encoding:'utf8'}));
const json=v=>JSON.parse(JSON.stringify(v));
assert.equal(data.items.length,41);assert.equal(data.professions.length,13);
for(const i of data.items){
 const previous=old.items.find(p=>p.id===i.id);assert.ok(previous);
 for(const field of ['id','category'])assert.equal(i[field],previous[field]);
 for(const field of ['name','tip'])for(const [language,value] of Object.entries(previous[field]))assert.equal(i[field][language],value);
 assert.equal(i.slot,i.category);assert.equal(i.layer,`assets/game/wear/${i.id}.webp`);
 assert.ok(fs.existsSync(`assets/game/items/${i.id}.png`));
 assert.ok(fs.existsSync(i.layer));
 assert.ok(!('wear' in i)&&!('sprite' in i)&&!('art' in i));
}
for(const p of data.professions){
 const previous=old.professions.find(j=>j.id===p.id);
 assert.equal(p.id,previous.id);
 for(const field of ['name','description','greeting','group'])for(const [language,value] of Object.entries(previous[field]))assert.equal(p[field][language],value);
 const expected=previous.required.filter(id=>!(p.id==='acids'&&id==='lab-coat')&&!(p.id==='cook'&&id==='apron'));
 assert.deepEqual(json(p.required),json(expected));
 const categories=p.required.map(id=>data.items.find(i=>i.id===id).category);
 assert.equal(new Set(categories).size,categories.length,p.id+' has duplicate categories');
}
assert.equal(data.scene.base,'assets/game/frog-base.webp');
assert.equal(data.scene.character.width,896);assert.equal(data.scene.character.canvasHeight,1200);
assert.equal(data.scene.character.height,62);assert.equal(data.scene.character.footInCanvas,95);
assert.deepEqual(json(data.scene.order),['base','body','feet','hands','face','eyes','head']);
assert.ok(!data.scene.slots&&!data.scene.adjustments);
assert.equal(data.items.find(i=>i.id==='face-shield').z>data.items.find(i=>i.id==='goggles').z,true);
assert.equal(data.items.find(i=>i.id==='bee-hat').z>data.items.find(i=>i.id==='medical-mask').z,true);
for(const id of ['space-helmet','welding-mask'])assert.deepEqual(json(data.items.find(i=>i.id===id).hides),['eyes','face']);
assert.equal(cp.execFileSync('git',['diff','1f38573','--','src/course-game.js','src/storage.js','src/routes.js'],{encoding:'utf8'}),'');
console.log('PASS 41 full-canvas layers, 41 icons, one item per category, 13 profession contracts and unchanged XP/storage/routes');
