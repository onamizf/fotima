// Контракт отображения и данные тем: иконки не меняют состав опытов и маршруты.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({});
for(const file of ['data/topics.js','data/topics/intro.js','data/home-icons.js','src/icons.js'])vm.runInContext(fs.readFileSync(file,'utf8'),c);
vm.runInContext('this.icons=Icon;this.data=CourseData',c);
const expected={intro:'topic-01-intro',states:'topic-02-states',properties:'topic-03-substances',mixtures:'topic-04-mixtures',physical:'topic-05-physical',chemical:'topic-06-chemical',atoms:'topic-07-atoms'};
for(const t of c.data.topics){assert.equal(t.icon,expected[t.id]);assert(fs.existsSync('assets/icons/'+t.icon+'.png'));for(const exp of t.steps.experiments)assert.equal(c.icons.experimentName(exp,t),exp.icon||t.icon);}
const files=fs.readdirSync('assets/icons').filter(f=>f.endsWith('.png'));assert.equal(files.length,28);
for(const file of files){const bytes=fs.readFileSync('assets/icons/'+file);assert.equal(bytes.readUInt32BE(16),134);assert.equal(bytes.readUInt32BE(20),134);const html=c.icons(file.slice(0,-4),36);assert(html.includes('src="assets/icons/'+file+'"'));assert(html.includes('width="36" height="36"'));assert(html.includes('alt="" aria-hidden="true" loading="lazy" draggable="false"'));}
assert.equal(c.icons.experimentName({icon:'exp-precipitate'},c.data.topics[0]),'exp-precipitate');assert.equal(c.icons.experimentName({icon:'exp-filtration'},c.data.topics[0]),'exp-filtration');
for(const t of c.data.topics)assert.equal(c.icons.notice({type:'topic',link:'#topic/'+t.id}),t.icon);
for(const name of ['info','user-round','log-out','menu','x','chevron-left','check','eye'])assert.match(c.icons(name),/^<svg.*stroke="#1E2A4A" stroke-width="2"/);
assert(!c.icons('unknown-name').includes('assets/icons/unknown-name.png'));
assert.equal(c.icons.text('Так держать! 🔥'),'Так держать!');
assert.equal(c.data.topics.flatMap(t=>t.steps.experiments).length,40);
console.log('Passed: 28 real 134px PNGs, seven topic mappings, experiment fallback/overrides, notice mappings, single accessible Icon output and Lucide service icons');
