/* Scientific/data invariants and layout integrity; no browser or production account. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({state:{settings:{language:'ru'}},CourseModel:{text:v=>v['uz-Latn']},LocalAuth:{signedIn:()=>false}});
for(const f of ['data/topics.js','data/topics/intro.js','data/elements.js','data/periodic-i18n.js','data/periodic-colors.js','src/periodic-model.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
vm.runInContext('globalThis.m=PeriodicModel;globalThis.d=ElementsData;globalThis.labels=PeriodicLabels;',c);const {m,d,labels}=c;
assert.equal(d.elements.length,118);assert.equal(new Set(d.elements.map(e=>e.symbol)).size,118);
assert(d.elements.filter(e=>e.study).length>=30);
for(const [i,e]of d.elements.entries()){
 assert.equal(e.Z,i+1);assert.match(e.symbol,/^[A-Z][a-z]?$/);assert.equal(e.shells.reduce((a,b)=>a+b,0),e.Z);assert(e.period>=1&&e.period<=7);assert(e.group===null||e.group>=1&&e.group<=18);assert(['s','p','d','f'].includes(e.block));assert(e.modelMassNumber>=e.Z);
 assert(e.atomicMass===null?Number.isInteger(e.isotopeMassNumber):e.atomicMass>0);assert(e.uses.length>=1);
 for(const lang of ['ru','uz','en']){assert(e.name[lang]);assert(e.description[lang]);assert(e.funFact[lang]);for(const use of e.uses){assert(use.icon&&use.title[lang]&&use.text[lang]);}if(e.study){assert(e.uses.length>=3&&e.uses.length<=5);assert(e.description[lang].length>40);}}
 if(e.Z>=99)for(const key of ['density','meltingPoint','boilingPoint'])assert.equal(e[key],null);
 if(e.photo){assert.match(e.photo,/^assets\/elements\/[A-Z][a-z]?\.webp$/);assert(fs.existsSync(e.photo));}
 for(const q of m.questions(e)){assert.equal(q.choices.length,3);assert.equal(new Set(q.choices).size,3);assert(q.correct>=0&&q.correct<3);}
}
assert.equal(m.get('Ge').atomicMass,72.630);assert.equal(m.get('Xe').atomicMass,131.293);assert.equal(m.mass(m.get('Ge')),'72,630');assert.equal(m.get('Ge').shells.join(','),'2,8,18,4');assert.equal(m.get('Ge').modelMassNumber,74);assert.equal(m.get('Ge').exampleCompound.model,'tetrahedron');
assert.equal(m.get('He').meltingPoint,null);assert.equal(m.get('C').meltingPoint,null);assert.equal(m.get('C').boilingPoint,null);assert.equal(m.get('Og').state,'unknown');assert.deepEqual(Array.from(d.elements.filter(e=>e.state==='liquid'),e=>e.symbol),['Br','Hg']);assert.equal(m.get('H').densityConditions,'stp');
for(const layout of ['long','short']){
 const occupied=new Map();for(const e of d.elements){const p=m.position(e,layout);for(let col=p.col;col<p.col+p.span;col++){const key=p.row+':'+col;assert(!occupied.has(key),`${layout} collision ${e.symbol}/${occupied.get(key)}`);occupied.set(key,e.symbol);}}
}
const clean=m.sanitize({version:1,visited:['Ge','Ge','??','H'],collection:['Ge','Cu'],quizzes:{Ge:{answers:[0,99,null],best:20,attempts:7}}});assert.equal(clean.visited.join(','),'Ge,H');assert.equal(clean.collection.join(','),'Ge');assert.equal(clean.quizzes.Ge.best,3);assert.equal(clean.quizzes.Ge.answers[1],null);
for(const language of ['ru','uz','en']){assert.equal(Object.keys(labels[language]).sort().join(','),Object.keys(labels.ru).sort().join(','));for(const kind of ['category','state','metallicity'])assert.equal(Object.keys(labels[language][kind]).sort().join(','),Object.keys(labels.ru[kind]).sort().join(','));}
assert(fs.existsSync('assets/elements-data/LICENSE.txt'));assert.equal(c.CourseData,undefined);console.log('Passed: 118 unique elements, localized profiles, electron/isotope accounting, null unknowns, no layout collisions, quizzes and progress validation');
