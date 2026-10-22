applyCurriculumLabels();
for(const [language,label] of Object.entries({ru:'Оборудование',en:'Equipment','uz-Latn':'Jihozlar','uz-Cyrl':'Жиҳозлар'}))dictionaries[language].equipmentTitle=label;
for(const lang of Object.keys(investigationText)){dictionaries[lang].demo=chemicalText[lang].banner;dictionaries[lang].confirmReset=progressText[lang].resetAll;}
let t=dictionaries[state.settings.language];
function route(){return SiteRoutes.resolve();}
function href(page,topic){return '#'+page+(topic?'/'+topic.id:'');}
function link(text,page,topic,cls=''){return `<a class="${cls==='button'?'text-link':cls}" href="${href(page,topic)}">${text}</a>`;}
function action(text,id,cls=''){return `<button type="button" class="${cls}" data-action="${id}">${text}</button>`;}
function go(page,topic){location.hash=href(page,topic);}
function header(page,topic){if(page==='welcome')return Hero.header();return `<a class="skip" href="#main">${pu().skipContent}</a><header class="topbar"><div class="topinner"><div class="brand"><a class="brand-link" href="${LocalAuth.signedIn()?'#home':'#welcome'}" aria-label="${mini().subject} 7"><span class="brand-mark" aria-hidden="true">${frogImage('',true)}</span><span class="brand-title">${mini().subject} <span class="brand-grade">7</span></span></a></div>${ProfileMenu.trigger()}${SiteRoutes.menu(page)}${LocalAuth.greeting()}${ProfileMenu.view(page)}${ProfileMenu.language()}</div></header>`;}

function home(){return Dashboard.view();}
function account(){return FotimaCloud.view();}
function catalog(){return levelMap(true);}
function theory(topic){return lessonView(topic);}
function lab(topic){if(!lessonPassed(topic.id))return `<article class="article panel"><h1>${t[topic.title]}</h1><p class="warning">${t.theoryPending}</p>${link(t.review,'theory',topic,'button primary')}</article>`;return topic.id==='properties'?investigationView():topic.id==='physical'?physicalLabView():chemicalView();}
function result(topic){if(topic.id==='chemical')return chemicalReport()+topicAchievements(topic.id);if(topic.id==='physical')return physicalReportView()+topicAchievements(topic.id);if(topic.id==='properties')return propertiesReport()+topicAchievements(topic.id);return `<article class="result panel"><h1>${t.noNewResult}</h1><p>${t.practicePendingNew}</p><p>${t.tableDraft}</p><div class="row">${link(t.openTasks,'lab',topic,'button')}${link(t.backTopics,'catalog',null,'button primary')}</div></article>`;}
function settings(){return `<section class="article panel"><h1>${t.settings}</h1><label class="property-field" for="settingsViewMode">${pu().viewSetting}<select id="settingsViewMode"><option value="3d" ${state.settings.viewMode==='3d'?'selected':''}>${ct().view3d}</option><option value="2d" ${state.settings.viewMode==='2d'?'selected':''}>${ct().view2d}</option></select></label><label class="settings-row"><input type="checkbox" id="reduceMotion" ${state.settings.reduceMotion?'checked':''}>${t.reduce}</label>${FotimaCloud.signedIn()?FotimaCloud.profile():`<p>${link(cu().signIn,'account')}</p>`}${appInformation()}${action(t.reset,'reset')}<p>${link(t.backTopics,'catalog')}</p><dialog id="resetDialog"><p>${t.confirmReset}</p><div class="row">${action(t.cancel,'cancel')}${action(t.reset,'confirmReset','primary')}</div></dialog></section>`;}
function render(moveFocus=true){t=dictionaries[state.settings.language];const current=route();if(current.page==='home'&&!LocalAuth.signedIn()){history.replaceState(null,'','#login');current.page='account';current.authMode='login';}if(current.authMode)LocalAuth.setMode(current.authMode);const page=!SiteRoutes.publicPages.includes(current.page)&&LocalAuth.gate()?'account':current.page,topic=current.topic;document.documentElement.lang=state.settings.language;document.body.classList.toggle('reduce-motion',state.settings.reduceMotion);document.title=SiteRoutes.title(page,topic);
 const levelBlocked=['theory','lab','result'].includes(page)&&!levelUnlocked(topic.id);
 document.body.classList.toggle('game-lab',page==='lab'&&!levelBlocked);
 document.body.dataset.page=page;
 if(!levelBlocked&&['theory','lab'].includes(page)&&!state.progress[topic.id]){state.progress[topic.id]='started';saveState();}
 if(!levelBlocked)rememberLearningLocation(page,topic);
 const content=levelBlocked?levelLocked(topic):(['theory','lab','result'].includes(page)?levelHUD(topic,page):'')+({welcome:Welcome.view,account,home,catalog,theory,lab,result,settings,contacts:SiteRoutes.contacts,notfound:SiteRoutes.notfound,resources:Dashboard.resources,progress:progressPage,table:propertiesTable,materials:equipmentSheet}[page](topic))+(['lab','result'].includes(page)?levelFinish(topic):'');
 document.getElementById('app').innerHTML=header(page,topic)+`<main id="main" tabindex="-1" class="wrap">${['account','welcome'].includes(page)?'':FotimaCloud.notice()}${content}<p role="status" class="storage-note ${storageAvailable?'visually-hidden':'warning'}">${storageAvailable?'':t.storageError}</p></main>`;
 // Диалог — сосед шапки: фиксированная панель не перекрывает логотип.
 const sidebar=document.getElementById('profileMenu');if(sidebar)document.getElementById('app').append(sidebar);
 document.querySelector('.skip').onclick=event=>{event.preventDefault();document.getElementById('main').focus({preventScroll:true});document.getElementById('main').scrollIntoView({behavior:state.settings.reduceMotion||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 const languageSelect=document.getElementById('language');if(languageSelect)languageSelect.onchange=event=>{state.settings.language=event.target.value;saveState();render(false);document.getElementById('language').focus();};
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
 Dashboard.mount();
 if(moveFocus){document.getElementById('main').focus();window.scrollTo({top:0,behavior:'instant'});}
}
window.addEventListener('hashchange',()=>{investigationFeedback=null;reportFeedback='';physicalFeedback=null;chemicalFeedback=null;render();});render(false);FotimaCloud.start();
