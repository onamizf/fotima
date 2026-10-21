applyCurriculumLabels();
for(const [language,label] of Object.entries({ru:'Оборудование',en:'Equipment','uz-Latn':'Jihozlar','uz-Cyrl':'Жиҳозлар'}))dictionaries[language].equipmentTitle=label;
for(const lang of Object.keys(investigationText)){dictionaries[lang].demo=chemicalText[lang].banner;dictionaries[lang].confirmReset=progressText[lang].resetAll;}
let t=dictionaries[state.settings.language];
function route(){const [rawPage,id='properties']=location.hash.slice(1).split('/'),page=rawPage||'welcome';return {page:['welcome','home','catalog','theory','lab','result','settings','table','materials','progress','account'].includes(page)?page:'welcome',topic:topics.find(topic=>topic.id===id)||topics[0]};}
function href(page,topic){return '#'+page+(topic?'/'+topic.id:'');}
function link(text,page,topic,cls=''){return `<a class="${cls==='button'?'text-link':cls}" href="${href(page,topic)}">${text}</a>`;}
function action(text,id,cls=''){return `<button type="button" class="${cls}" data-action="${id}">${text}</button>`;}
function go(page,topic){location.hash=href(page,topic);}
function header(page,topic){return `<a class="skip" href="#main">${pu().skipContent}</a><header class="topbar"><div class="topinner"><div class="brand"><a class="brand-link" href="#welcome" aria-label="${mini().subject} 7"><span class="brand-mark" aria-hidden="true">${frogImage('',true)}</span><span class="brand-title">${mini().subject} <span class="brand-grade">7</span></span></a></div>${['account','welcome'].includes(page)?'':`<nav class="appnav" aria-label="${t.brand}">${[['catalog',mini().levels],['progress',mini().progress],['settings',t.settings]].map(([id,label])=>`<a href="${href(id)}" ${(id===page||id==='catalog'&&['home','theory','lab','result','table','materials'].includes(page))?'aria-current="page"':''}>${id==='settings'?`<span aria-hidden="true">⚙</span><span class="visually-hidden">${label}</span>`:label}</a>`).join('')}</nav>`}<label><span class="visually-hidden">${t.language}</span><select id="language" aria-label="${t.language}">${[['ru','RU'],['uz-Latn','OʻZ'],['uz-Cyrl','ЎЗ'],['en','EN']].map(([value,label])=>`<option value="${value}" ${state.settings.language===value?'selected':''}>${label}</option>`).join('')}</select></label>${LabTheme.button(state.settings.language)}${ProfileMenu.view(page)}</div></header>`;}

function home(){return gameHome();}
function account(){return FotimaCloud.view();}
function catalog(){return levelMap(true);}
function theory(topic){return lessonView(topic);}
function lab(topic){if(!lessonPassed(topic.id))return `<article class="article panel"><h1>${t[topic.title]}</h1><p class="warning">${t.theoryPending}</p>${link(t.review,'theory',topic,'button primary')}</article>`;return topic.id==='properties'?investigationView():topic.id==='physical'?physicalLabView():chemicalView();}
function result(topic){if(topic.id==='chemical')return chemicalReport()+topicAchievements(topic.id);if(topic.id==='physical')return physicalReportView()+topicAchievements(topic.id);if(topic.id==='properties')return propertiesReport()+topicAchievements(topic.id);return `<article class="result panel"><h1>${t.noNewResult}</h1><p>${t.practicePendingNew}</p><p>${t.tableDraft}</p><div class="row">${link(t.openTasks,'lab',topic,'button')}${link(t.backTopics,'catalog',null,'button primary')}</div></article>`;}
function settings(){return `<section class="article panel"><h1>${t.settings}</h1><label class="property-field" for="settingsViewMode">${pu().viewSetting}<select id="settingsViewMode"><option value="3d" ${state.settings.viewMode==='3d'?'selected':''}>${ct().view3d}</option><option value="2d" ${state.settings.viewMode==='2d'?'selected':''}>${ct().view2d}</option></select></label><label class="settings-row"><input type="checkbox" id="reduceMotion" ${state.settings.reduceMotion?'checked':''}>${t.reduce}</label>${FotimaCloud.signedIn()?FotimaCloud.profile():`<p>${link(cu().signIn,'account')}</p>`}${appInformation()}${action(t.reset,'reset')}<p>${link(t.backTopics,'catalog')}</p><dialog id="resetDialog"><p>${t.confirmReset}</p><div class="row">${action(t.cancel,'cancel')}${action(t.reset,'confirmReset','primary')}</div></dialog></section>`;}
function render(moveFocus=true){t=dictionaries[state.settings.language];const current=route(),page=current.page==='welcome'?'welcome':FotimaCloud.gate()?'account':current.page,topic=current.topic;document.documentElement.lang=state.settings.language;document.body.classList.toggle('reduce-motion',state.settings.reduceMotion);document.title=`${page==='welcome'?mini().subject:page==='account'?cu().account:page==='progress'?pu().title:page==='table'?t.tableTitle:page==='materials'?t.equipmentTitle:t[page]} — ${t.brand}`;
 const levelBlocked=['theory','lab','result'].includes(page)&&!levelUnlocked(topic.id);
 document.body.classList.toggle('game-lab',page==='lab'&&!levelBlocked);
 document.body.dataset.page=page;
 if(!levelBlocked&&['theory','lab'].includes(page)&&!state.progress[topic.id]){state.progress[topic.id]='started';saveState();}
 if(!levelBlocked)rememberLearningLocation(page,topic);
 const content=levelBlocked?levelLocked(topic):(['theory','lab','result'].includes(page)?levelHUD(topic,page):'')+({welcome:Welcome.view,account,home,catalog,theory,lab,result,settings,progress:progressPage,table:propertiesTable,materials:equipmentSheet}[page](topic))+(['lab','result'].includes(page)?levelFinish(topic):'');
 document.getElementById('app').innerHTML=header(page,topic)+`<main id="main" tabindex="-1" class="wrap">${['account','welcome'].includes(page)?'':FotimaCloud.notice()}${content}<p role="status" class="storage-note ${storageAvailable?'visually-hidden':'warning'}">${storageAvailable?'':t.storageError}</p></main>`;
 document.querySelector('.skip').onclick=event=>{event.preventDefault();document.getElementById('main').focus();};
 LabTheme.bind(state.settings.language);
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
 if(!levelBlocked&&page==='theory')bindLesson(topic);
 if(!levelBlocked&&page==='table')bindTable();
 if(!levelBlocked&&page==='lab'){bindInvestigation();bindPhysicalLab();bindChemical();}
 if(!levelBlocked&&page==='result'&&topic.id==='chemical')bindChemicalReport();
 if(!levelBlocked&&page==='result'&&topic.id==='physical')bindPhysicalReport();
 if(!levelBlocked&&page==='result'&&topic.id==='properties')bindPropertyReport();
 bindProgressUI();
 bindLevelUI();
 FotimaCloud.bind();
 Lab3D.mount();
 SpecimenViewer.mount();
 Welcome.mount();
 ProfileMenu.mount();
 if(moveFocus){document.getElementById('main').focus();window.scrollTo(0,0);}
}
window.addEventListener('hashchange',()=>{investigationFeedback=null;reportFeedback='';physicalFeedback=null;chemicalFeedback=null;render();});render(false);FotimaCloud.start();
