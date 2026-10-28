const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({});for(const f of ['data/topics.js','data/topics/intro.js','data/topics/intro/situation-a.js','data/topics/intro/situation-b.js','src/intro-model.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
vm.runInContext('state={intro:IntroModel.blank()};globalThis.m=IntroModel;globalThis.b=SituationB;',c);
for(const lang of ['ru','uz-Latn','uz-Cyrl','en']){const t=c.b.copy[lang];for(const key of Object.keys(c.b.copy.ru))assert(t[key]!==undefined,lang+':'+key);assert.equal(t.actions.length,6);assert.equal(t.alts.length,4);assert.equal(c.b.frogLines[lang].length,5);}
assert.equal(c.b.hotspots.length,2);assert.equal(c.b.stages[2].at,6);
vm.runInContext("Object.assign(IntroModel.row('danger-a').answers,{danger:0,precaution:1});IntroModel.check('danger-a');IntroModel.openTask('danger-b');Object.assign(IntroModel.row().answers,{danger:1,precaution:2});Object.assign(IntroModel.row().evidence,{sceneB:true,sceneHotspots:['goggles'],sceneRisk:0,sceneActions:[0,1,2,3]});",c);
assert(!c.m.check(),'Both errors are required');vm.runInContext("IntroModel.row().evidence.sceneHotspots=['tube','goggles'];IntroModel.row().evidence.sceneActions=[0,1,2,4]",c);assert(!c.m.check(),'Wrong heating action must not complete');vm.runInContext('IntroModel.row().evidence.sceneActions=[0,1,2,3]',c);assert(c.m.check());
vm.runInContext('state.intro=IntroModel.sanitize(state.intro)',c);assert(c.m.done('danger-a'));assert(c.m.done('danger-b'));assert(c.m.unlockedTask('danger-c'));assert.equal(c.m.progress().value,2);
console.log('PASS: B localized data, two-hotspot evidence, four safe actions, independent A/B proof, restore and C unlock');
