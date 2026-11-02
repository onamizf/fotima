/* Every learner-facing wardrobe string has all site locales and stable parameters. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const data=vm.runInNewContext(fs.readFileSync('data/safety-wardrobe.js','utf8')+';SafetyWardrobeData');
const locales=['ru','uz-Latn','uz-Cyrl','en'];
const strings=[...Object.entries(data.copy).map(([key,value])=>[key,value]),...data.categories.map(c=>[c.id,c.name])];
for(const i of data.items)for(const key of ['name','tip'])strings.push([i.id+'.'+key,i[key]]);
for(const p of data.professions)for(const key of ['name','description','greeting','group'])strings.push([p.id+'.'+key,p[key]]);
for(const [key,value] of strings){
 const params=s=>[...s.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort().join('|');
 for(const locale of locales){
  assert.ok(value[locale]?.trim(),key+' missing '+locale);
  assert.equal(params(value[locale]),params(value.ru),key+' parameters differ in '+locale);
  if(locale==='uz-Latn'||locale==='en')assert.ok(!/[А-Яа-яЁё]/.test(value[locale]),key+' contains untranslated Russian');
 }
}
for(const locale of locales)assert.equal(data.copy.praise[locale].split('|').length,4);
const context={SafetyWardrobeData:data,state:{settings:{language:'unknown'}},escapeHTML:s=>s};
const ui=vm.runInNewContext(fs.readFileSync('src/safety-wardrobe.js','utf8')+';SafetyWardrobe',context);
assert.equal(ui.text('title'),data.copy.title.ru);
for(const locale of locales){context.state.settings.language=locale;assert.equal(ui.text('title'),data.copy.title[locale]);assert.equal(ui.text('reward',{n:20}),'+20 XP');}
console.log(`PASS ${strings.length} wardrobe strings in all four site languages, placeholders and Russian fallback`);
