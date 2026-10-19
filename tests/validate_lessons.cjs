const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const languages=['ru','uz-Latn','uz-Cyrl','en'];const topics=['equipment','dissolving','filtration'];
const sandbox={lessonContent:{}};vm.createContext(sandbox);
for(const language of languages)vm.runInContext(fs.readFileSync(`src/lessons/${language}.js`,'utf8'),sandbox);
let sections=0,questions=0,feedback=0;
function shape(value){if(Array.isArray(value))return value.map(shape);if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(key=>[key,shape(value[key])]));return typeof value;}
for(const language of languages){
 const content=sandbox.lessonContent[language];assert.deepEqual(Object.keys(content),topics);
 for(const id of topics){const lesson=content[id];assert.equal(lesson.sections.length,3);assert.equal(lesson.glossary.length,4);assert.equal(lesson.questions.length,2);assert.deepEqual(shape(lesson),shape(sandbox.lessonContent.ru[id]));
  for(const section of lesson.sections){assert.ok(section.title.trim());assert.equal(section.paragraphs.length,2);for(const p of section.paragraphs)assert.ok(p.trim());sections++;}
  for(const entry of lesson.glossary){assert.ok(entry.term.trim());assert.ok(entry.definition.trim());}
  for(let index=0;index<2;index++){const q=lesson.questions[index],reference=sandbox.lessonContent.ru[id].questions[index];assert.equal(q.id,reference.id);assert.equal(q.correct,reference.correct);assert.equal(q.options.length,3);assert.equal(new Set(q.options.map(o=>o.id)).size,3);assert.ok(q.options.some(o=>o.id===q.correct));assert.equal(JSON.stringify(q.options.map(o=>o.id)),JSON.stringify(reference.options.map(o=>o.id)));assert.ok(q.prompt.trim());for(const o of q.options){assert.ok(o.label.trim());assert.ok(o.feedback.trim());feedback++;}questions++;}
  function inspect(value){if(typeof value==='string')assert.ok(!/[<>]/.test(value),'HTML is not allowed in lesson content');else if(value&&typeof value==='object')Object.values(value).forEach(inspect);}inspect(lesson);
 }
}
console.log(`PASS: ${languages.length} languages, 12 lessons, ${sections} sections, ${questions} questions, ${feedback} option explanations; matching identifiers and no missing fields.`);
