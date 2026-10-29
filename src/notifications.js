/* Журнал событий хранится внутри персонального сохранения. Удалённые события не создаются повторно. */
window.StudentNotices=(()=>{
 const types=['topic','badge','rank','streak','system'];
 const blank=()=>({version:1,items:[],seen:[],initialized:false,preferences:Object.fromEntries(types.map(t=>[t,true])),sound:false});
 function sanitize(value){const out=blank();if(value?.version!==1)return out;out.initialized=value.initialized===true;out.sound=value.sound===true;for(const t of types)if(typeof value.preferences?.[t]==='boolean')out.preferences[t]=value.preferences[t];out.seen=Array.isArray(value.seen)?[...new Set(value.seen.filter(s=>typeof s==='string'&&s.length<120&&s!=='badge:safety-signs'))].slice(-1000):[];
  const localized=v=>v&&typeof v==='object'?Object.fromEntries(['ru','uz-Latn','en'].map(l=>[l,typeof v[l]==='string'?v[l].slice(0,500):''])):null;
  for(const item of Array.isArray(value.items)?value.items:[]){if(item?.id==='badge:safety-signs'||/знаки опасности|hazard signs|xavf belgilari|хавф белгилари/i.test(JSON.stringify(item)))continue;if(!types.includes(item?.type)||typeof item.id!=='string'||!Number.isFinite(item.createdAt)||item.createdAt<0||item.createdAt>8640000000000000||!/^#(?:topic\/(?:intro|states|properties|mixtures|physical|chemical|atoms|ch[1-6](?:\/(?:[1-6]\.[1-7]|summary))?)|awards|progress|home|settings)$/.test(item.link))continue;const title=localized(item.title),text=localized(item.text);if(title&&text&&!out.items.some(n=>n.id===item.id))out.items.push({id:item.id.slice(0,120),type:item.type,title,text,link:item.link,createdAt:item.createdAt,read:item.read===true});}const rename=id=>id.startsWith('topic:')&&TextbookData.legacyMap[id.slice(6)]?'topic:'+TextbookData.legacyMap[id.slice(6)]:id;out.seen=[...new Set(out.seen.map(rename))];for(const item of out.items){const legacy=item.link.match(/^#topic\/(intro|states|properties|mixtures|physical|chemical|atoms)$/)?.[1];if(legacy){const c=TextbookData.chapters.find(c=>c.id===TextbookData.legacyMap[legacy]),old=CourseData.topics.find(t=>t.id===legacy);item.link='#topic/'+c.id;item.id=rename(item.id);if(item.type==='topic')for(const lang of ['ru','uz-Latn','en'])if(old?.title?.[lang])item.text[lang]=item.text[lang].replace(old.title[lang],c.title[lang]);}}out.items=out.items.filter((n,i,a)=>a.findIndex(x=>x.id===n.id)===i);out.items.sort((a,b)=>b.createdAt-a.createdAt);out.items=out.items.slice(0,50);return out;
 }
 const data=()=>state.notifications??=blank();
 function localized(key,params){return Object.fromEntries(Object.entries(StudentCopy).map(([lang,copy])=>[lang,copy[key].replace(/\{(\w+)\}/g,(_,k)=>typeof params[k]==='object'?params[k][lang]||params[k].ru:params[k]??'')]));}
 function add(id,type,params,link){const d=data();if(d.seen.includes(id))return false;d.seen.push(id);d.seen=d.seen.slice(-1000);if(!d.preferences[type])return false;d.items.unshift({id,type,title:localized(type+'Title',params),text:localized(type+'Text',params),link,createdAt:Date.now(),read:false});d.items=d.items.slice(0,50);return true;}
 function sync(){if(!window.LocalAuth?.signedIn())return false;const d=data(),ready=TextbookCourse.chapters.filter(t=>TextbookCourse.chapterOpen(t.id)),badgeIds=state.game?.badges||[],rank=CourseGame.rank(),days=CourseGame.streak();let changed=false;const before=d.seen.length,initialized=d.initialized;
  if(!d.initialized){d.initialized=true;d.seen.push(...ready.filter(t=>t.id!==TextbookCourse.current().chapterId).map(t=>'topic:'+t.id),...badgeIds.map(id=>'badge:'+id),'rank:'+rank.xp);changed=add('system:welcome','system',{},'#progress')||changed;}
  for(const topic of ready)changed=add('topic:'+topic.id,'topic',{name:topic.title},'#topic/'+topic.id)||changed;
  for(const id of badgeIds){const badge=CourseData.badges.find(b=>b.id===id);if(badge)changed=add('badge:'+id,'badge',{name:badge.title},'#awards')||changed;}
  changed=add('rank:'+rank.xp,'rank',{name:rank.title},'#progress')||changed;
  if(days>=2)changed=add('streak:'+CourseGame.day(),'streak',{n:days},'#progress')||changed;
  if(changed)queueMicrotask(()=>window.dispatchEvent(new CustomEvent('student-notices',{detail:{owner:LocalAuth.currentUser()?.id}})));return changed||before!==d.seen.length||initialized!==d.initialized;
 }
 function persist(){saveState();window.dispatchEvent(new CustomEvent('student-notices-read'));}
 function read(id){const n=data().items.find(n=>n.id===id);if(n){n.read=true;persist();}}
 function readAll(){data().items.forEach(n=>n.read=true);persist();}
 function remove(id){data().items=data().items.filter(n=>n.id!==id);persist();}
 function settings(){return `<fieldset class="notice-settings" id="notificationSettings"><legend>${StudentText('noticeSettings')}</legend>${types.map(type=>`<label><span>${StudentText(type)}</span><input type="checkbox" data-notice-preference="${type}" ${data().preferences[type]?'checked':''}></label>`).join('')}<label><span>${StudentText('noticeSound')}</span><input type="checkbox" data-notice-sound ${data().sound?'checked':''}></label></fieldset>`;}
 return {types,blank,sanitize,data,sync,read,readAll,remove,settings,unread:()=>data().items.filter(n=>!n.read).length};
})();
