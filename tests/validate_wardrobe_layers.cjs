/* Отделяем обновление картинки от неизменных правил и наград версии 1.25.0. */
const fs=require('node:fs'),vm=require('node:vm'),cp=require('node:child_process'),assert=require('node:assert/strict');
const parse=text=>{const c=vm.createContext({});vm.runInContext(text+';this.d=SafetyWardrobeData',c);return JSON.parse(JSON.stringify(c.d));};
const before=parse(cp.execFileSync('git',['show','04333b2:data/safety-wardrobe.js'],{encoding:'utf8'})),after=parse(fs.readFileSync('data/safety-wardrobe.js','utf8'));
assert.deepEqual(after.professions,before.professions);assert.deepEqual(after.categories,before.categories);assert.equal(after.items.length,41);
for(const [key,value]of Object.entries(before.copy))assert.deepEqual(after.copy[key],value,key);
for(const original of before.items){const now=after.items.find(i=>i.id===original.id);for(const key of ['id','slot','category','name','tip'])assert.deepEqual(now[key],original[key]);assert(now.sprite&&now.wear);assert(fs.existsSync(now.sprite.src));for(const key of ['x','y','w','h','atlasW','atlasH'])assert(Number.isFinite(now.sprite[key]));assert(now.sprite.x+now.sprite.w<=now.sprite.atlasW+1);assert(now.sprite.y+now.sprite.h<=now.sprite.atlasH+1);}
assert.deepEqual(after.scene.order,['back','base','feet','body','hands','face','eyes','head']);assert.equal(after.scene.character.height,74);assert.equal(after.scene.character.bottom,91);assert.equal(after.scene.character.x,36);
for(const id of ['space-helmet','welding-mask'])assert.deepEqual(after.items.find(i=>i.id===id).wear.hides,['eyes','face']);
for(const key of ['base','background'])assert(fs.existsSync(after.scene[key]));
assert.equal(cp.execFileSync('git',['diff','04333b2','--','src/course-game.js','src/routes.js','src/storage.js'],{encoding:'utf8'}),'');
console.log('Passed: original 13 professions, 41 item identities, all old hints/copy/slots and reward logic preserved; complete normalized layer/atlas metadata');
