/* Check the live task dictionaries, JSON references, and Cyrillic runtime literals. */
const fs=require('node:fs'),vm=require('node:vm');
const languages=['ru','en','uz-Latn','uz-Cyrl'],errors=[];let checked=0;
const context=vm.createContext({SafetySituations:{decorate(){}}});
const dictionaries={
 'data/water-bath-i18n.js':'WaterBathCopy',
 'data/equipment-study.js':'EquipmentStudyData',
 'data/safety-workspace.js':'SafetyWorkspaceCopy',
 'data/task-debug-i18n.js':'TaskDebugCopy',
 'data/project-workspaces.js':'ProjectWorkspaceCopy',
 'data/topics/intro/lesson-1-1.js':'SafetyLessonData',
 ...Object.fromEntries(['a','b','c','d'].map(id=>['data/topics/intro/situation-'+id+'.js','Situation'+id.toUpperCase()]))
};
function walk(value,path){if(!value||typeof value!=='object')return;if(!Array.isArray(value)&&languages.some(l=>Object.hasOwn(value,l))){checked++;for(const l of ['en','uz-Latn'])if(/[А-Яа-яЁё]/.test(JSON.stringify(value[l]??'')))errors.push(path+': untranslated Cyrillic in '+l);for(const l of languages)if(value[l]===undefined||value[l]==='')errors.push(path+': missing '+l);if(languages.every(l=>Object.hasOwn(value,l))){const shape=x=>x&&typeof x==='object'?Array.isArray(x)?'['+x.map(shape).join(',')+']':'{'+Object.keys(x).sort().map(k=>k+':'+shape(x[k])).join(',')+'}':'text';const ruShape=shape(value.ru);for(const l of languages)if(shape(value[l])!==ruShape)errors.push(path+': incompatible keys in '+l);}return;}for(const [k,v]of Object.entries(value))walk(v,path+'.'+k);}
const values={};for(const [file,name]of Object.entries(dictionaries)){values[name]=vm.runInContext(fs.readFileSync(file,'utf8')+'\n;'+name,context);walk(values[name],name);}
const copy=values.WaterBathCopy;
for(const model of ['water-bath','evaporation']){const d=JSON.parse(fs.readFileSync('data/'+model+'.json'));const keys=[d.title,d.notes,...d.parts.concat(d.substances).flatMap(p=>[p.name,p.purpose,p.safety,...p.characteristics]),...(d.labelTask?d.labelTask.given.map(g=>g.text).concat(d.labelTask.distractors):[])];for(const key of keys)if(!copy[key])errors.push(model+': unknown '+key);}
const runtime=['safety-workspace','equipment-study','water-bath-page','water-bath-atlas','apparatus-assembly','apparatus-experiment','apparatus-labels','scene-player','workspace-shell','project-workspace','task-i18n','assembly-workshop','scene-shell','safety-stamp','practical-1-2','equipment-card','setup-task-2','water-bath-workshop-skin','project-hub'];
for(const name of runtime){const file='src/'+name+'.js',source=fs.readFileSync(file,'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');source.split('\n').forEach((line,i)=>{if(/[А-Яа-яЁё]/.test(line))errors.push(file+':'+(i+1)+': Cyrillic outside an i18n file');});}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log('PASS '+checked+' localized groups; all four languages, JSON keys and '+runtime.length+' task modules; no missing keys or Cyrillic literals');
