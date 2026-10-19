applyCurriculumLabels();
for(const lang of Object.keys(investigationText))dictionaries[lang].demo=investigationText[lang].banner;
let t=dictionaries[state.settings.language];
function route(){const [page='home',id='properties']=location.hash.slice(1).split('/');return {page:['home','catalog','theory','lab','result','settings','table','materials'].includes(page)?page:'home',topic:topics.find(topic=>topic.id===id)||topics[0]};}
function href(page,topic){return '#'+page+(topic?'/'+topic.id:'');}
function link(text,page,topic,cls=''){return `<a class="${cls}" href="${href(page,topic)}">${text}</a>`;}
function action(text,id,cls=''){return `<button type="button" class="${cls}" data-action="${id}">${text}</button>`;}
function go(page,topic){location.hash=href(page,topic);}
function header(page,topic){return `<a class="skip" href="#main">${t.next}</a><div class="demo-banner">${t.demo}</div><header class="topbar"><div class="topinner"><div class="brand"><span class="mark" aria-hidden="true">⌬</span>${link(t.brand,'home')}</div><label><span class="visually-hidden">${t.language}</span><select id="language" aria-label="${t.language}">${[['ru','RU · Русский'],['uz-Latn','OʻZ · Oʻzbekcha'],['uz-Cyrl','ЎЗ · Ўзбекча'],['en','EN · English']].map(([value,label])=>`<option value="${value}" ${state.settings.language===value?'selected':''}>${label}</option>`).join('')}</select></label></div></header><div class="wrap" style="padding-bottom:0;padding-top:16px"><nav class="appnav" aria-label="${t.brand}">${[['home','home'],['catalog','catalog'],['theory','theory'],['lab','lab'],['result','result'],['settings','settings']].map(([id,label])=>`<a href="${href(id,['theory','lab','result'].includes(id)?topic:null)}" ${id===page?'aria-current="page"':''}>${t[label]}</a>`).join('')}</nav></div>`;}
function home(){return `<div class="hero"><section><span class="tag">${t.grade}</span><h1>${t.hero}</h1><p>${t.intro}</p>${link(t.open+' →','catalog',null,'button primary')}<div class="note">${t.model}</div></section><div>${scene()}<p class="note">${t.sample}</p></div></div><h2>${t.how}</h2><div class="grid3">${['learn','try','explain'].map((key,i)=>`<section class="panel"><p class="stepnum">0${i+1}</p><h3>${t[key]}</h3><p>${t[key+'Text']}</p></section>`).join('')}</div>`;}
function catalog(){const count=topics.filter(topic=>lessonPassed(topic.id)).length;return `<div class="eyebrow">${t.grade}</div><h1>${t.topics}</h1><p>${t.newProgress}: ${count} / 3</p><div class="bar"><i style="width:${count/3*100}%"></i></div><p class="note">${t.oldProgressNote}</p><div class="grid3">${topics.map(topic=>`<section class="card" data-topic="${topic.id}"><div class="art">${vessel(topic.art)}</div><span class="status">${state.progress[topic.id]?t.inprogress:t.notstarted}</span><h2 style="font-size:22px">${t[topic.title]}</h2><p>${t[topic.description]}</p><p>${t.lessonProgress}: ${lessonPassed(topic.id)?'✓':'0 / 1'}</p>${topic.id==='properties'?`<p>${it().count}: ${observationCount()} / 12</p>`:''}${link(state.progress[topic.id]?t.continue:t.start,'theory',topic,'button primary')}</section>`).join('')}</div><div class="row resource-links">${link(t.tableOpen,'table',topics[0],'button')}${link(t.equipmentTitle,'materials',topics[0],'button')}</div>`;}
function theory(topic){return lessonView(topic);}
function lab(topic){if(!lessonPassed(topic.id))return `<article class="article panel"><h1>${t[topic.title]}</h1><p class="warning">${t.theoryPending}</p>${link(t.review,'theory',topic,'button primary')}</article>`;return topic.id==='properties'?investigationView():taskOverview(topic);}
function result(topic){if(topic.id==='properties')return observationReport();return `<article class="result panel"><h1>${t.noNewResult}</h1><p>${t.practicePendingNew}</p><p>${t.tableDraft}</p><div class="row">${link(t.openTasks,'lab',topic,'button')}${link(t.backTopics,'catalog',null,'button primary')}</div></article>`;}
function settings(){return `<section class="article panel"><h1>${t.settings}</h1><p>${t.saved}</p>${['sound','reduceMotion'].map(key=>`<label class="settings-row"><input type="checkbox" id="${key}" ${state.settings[key]?'checked':''}>${t[key==='sound'?'sound':'reduce']}</label>`).join('')}<h2>${t.newProgress}</h2><ul>${topics.map(topic=>`<li>${t[topic.title]}: ${lessonPassed(topic.id)?t.theoryPassed:t.notstarted}</li>`).join('')}</ul><p>${t.oldProgressNote}</p>${action(t.reset,'reset')}<p>${link(t.backTopics,'catalog')}</p><dialog id="resetDialog"><p>${t.confirmReset}</p><div class="row">${action(t.cancel,'cancel')}${action(t.reset,'confirmReset','primary')}</div></dialog></section>`;}
function render(moveFocus=true){t=dictionaries[state.settings.language];const {page,topic}=route();document.documentElement.lang=state.settings.language;document.body.classList.toggle('reduce-motion',state.settings.reduceMotion);document.title=`${page==='table'?t.tableTitle:page==='materials'?t.equipmentTitle:t[page]} — ${t.brand}`;
 if(['theory','lab'].includes(page)&&!state.progress[topic.id]){state.progress[topic.id]='started';saveState();}
 const content={home,catalog,theory,lab,result,settings,table:propertiesTable,materials:equipmentSheet}[page](topic);
 document.getElementById('app').innerHTML=header(page,topic)+`<main id="main" tabindex="-1" class="wrap">${content}<p role="status" class="storage-note ${storageAvailable?'note':'warning'}">${storageAvailable?t.saved:t.storageError}</p><footer class="footer">${t.grade} · ${t.demo}</footer></main>`;
 document.querySelector('.skip').onclick=event=>{event.preventDefault();document.getElementById('main').focus();};
 document.getElementById('language').onchange=event=>{state.settings.language=event.target.value;saveState();render(false);document.getElementById('language').focus();};
 for(const key of ['sound','reduceMotion']){const el=document.getElementById(key);if(el)el.onchange=()=>{state.settings[key]=el.checked;saveState();render(false);document.getElementById(key).focus();};}
 document.querySelectorAll('[data-action]').forEach(el=>el.onclick=()=>{
  switch(el.dataset.action){
   case 'resetQuiz':currentLesson(topic.id).answers={};currentLesson(topic.id).step=3;saveState();render(false);break;
   case 'reset':document.getElementById('resetDialog').showModal();break;
   case 'cancel':document.getElementById('resetDialog').close();break;
   case 'confirmReset':state=freshState();saveState();render(false);break;
   case 'resetTable':document.getElementById('tableReset').showModal();break;
   case 'cancelTable':document.getElementById('tableReset').close();break;
   case 'confirmTable':state.propertyTable={};state.tableSource='';saveState();render(false);break;
  }
 });
 if(page==='theory')bindLesson(topic);
 if(page==='table')bindTable();
 if(page==='lab')bindInvestigation();
 if(moveFocus){document.getElementById('main').focus();window.scrollTo(0,0);}
}
window.addEventListener('hashchange',()=>{investigationFeedback=null;render();});render(false);
