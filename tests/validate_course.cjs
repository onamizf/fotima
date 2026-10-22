// Проверка данных курса независимо от отображения и состояния браузера.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({});vm.runInContext(fs.readFileSync('data/topics.js','utf8')+';globalThis.data=CourseData;',context);const data=context.data;
assert.deepEqual(Array.from(data.topics,t=>t.id),['safety','properties','mixtures','physical','chemical','atoms']);assert.equal(data.topics.filter(t=>t.ready).length,4);
const experiments=data.topics.flatMap(t=>Array.from(t.steps.experiments));assert.equal(experiments.length,25);assert.equal(new Set(experiments.map(e=>e.id)).size,25);
for(const topic of data.topics){assert.match(topic.color,/^#[a-f0-9]{6}$/i);assert.equal(topic.steps.quiz.length,topic.ready?5:0);for(const q of topic.steps.quiz){assert.equal(q.options.length,3);assert(q.correct>=0&&q.correct<3);}}
assert(data.facts.length>=30);assert.equal(data.collection.length,14);assert.equal(new Set(data.collection.map(s=>s.id)).size,14);assert.equal(data.badges.length,8);assert.deepEqual(Array.from(data.ranks,r=>r.xp),[0,100,300,600,1000]);
const localized=value=>{if(value&&typeof value==='object'){if(Object.hasOwn(value,'ru'))for(const lang of ['ru','uz-Latn','en'])assert(typeof value[lang]==='string'&&value[lang].length>0,lang);for(const v of Object.values(value))localized(v);}};localized(data);
for(const file of ['src/course.js','src/course-game.js'])for(const match of fs.readFileSync(file,'utf8').matchAll(/\bu\('([^']+)'\)/g))assert(Object.hasOwn(data.ui,match[1]),`Missing UI translation: ${file} ${match[1]}`);
for(const s of data.collection.filter(s=>!s.title))assert(fs.existsSync(`assets/specimens/${s.id}.webp`),s.id);
console.log('Passed: 6 topics, 25 unique experiences, 20 quiz questions, 32+ facts, complete RU/UZ/EN, ranks/badges and local collection assets');
