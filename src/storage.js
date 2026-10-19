const STORAGE_KEY='fotima.chemistry7.shell.v1';
const freshState=()=>({version:1,settings:{language:'ru',sound:false,reduceMotion:false},progress:{},drafts:{},lessons:{}});
let storageAvailable=true;
function readState(){
 const clean=freshState();
 try{
  const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return clean;
  const value=JSON.parse(raw);if(value?.version!==1)return clean;
  const settings=value.settings||{};
  if(Object.hasOwn(dictionaries,settings.language))clean.settings.language=settings.language;
  for(const key of ['sound','reduceMotion'])if(typeof settings[key]==='boolean')clean.settings[key]=settings[key];
  for(const {id} of topics){
   if(value.lessons?.[id])clean.lessons[id]=sanitiseLesson(value.lessons[id],id);
   if(['started','completed'].includes(value.progress?.[id]))clean.progress[id]=value.progress[id];
   if(['beaker','water','rod'].includes(value.drafts?.[id]))clean.drafts[id]=value.drafts[id];
  }
  return clean;
 }catch{return clean;}
}
let state=readState();
function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));storageAvailable=true;}catch{storageAvailable=false;}}
// Проверяем возможность записи, не удаляя другие данные сайта.
saveState();
window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY){state=readState();render(false);}});
