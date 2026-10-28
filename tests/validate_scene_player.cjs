const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({});for(const f of ['data/topics.js','data/topics/intro.js','data/topics/intro/situation-a.js','src/intro-model.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
vm.runInContext('state={intro:IntroModel.blank()};globalThis.m=IntroModel;globalThis.s=SituationA;',c);
for(const lang of ['ru','uz-Latn','uz-Cyrl','en']){assert.equal(c.s.copy[lang].alts.length,4);assert.equal(c.s.frogLines[lang].length,5);assert.equal(c.s.copy[lang].actions.length,4);}
vm.runInContext("Object.assign(IntroModel.row().answers,{danger:0,precaution:1});Object.assign(IntroModel.row().evidence,{sceneA:true,sceneHotspot:true,sceneRisk:0,sceneActions:[0]});",c);
assert(!c.m.check(),'Partial multi-select must not complete');
vm.runInContext('IntroModel.row().evidence.sceneActions=[0,1];',c);assert(c.m.check());
vm.runInContext('state.intro=IntroModel.sanitize(state.intro)',c);assert(c.m.done('danger-a'),'Scene proof survives storage depth limits');assert(c.m.unlockedTask('danger-b'));
console.log('PASS: four locales, answer evidence gate, save/restore and B unlock');
