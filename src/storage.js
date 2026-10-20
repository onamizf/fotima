const STORAGE_KEY='fotima.chemistry7.curriculum.v2';
const LEGACY_STORAGE_KEY='fotima.chemistry7.shell.v1';
const freshState=()=>({version:2,settings:{language:'ru',sound:false,reduceMotion:false,viewMode:'3d'},progress:{},lessons:{},propertyTable:{},activeSample:'salt',tableSource:'',investigation:blankInvestigation(),propertyReport:blankReport(),physicalLab:blankPhysicalLab(),chemicalLab:blankChemicalLab(),achievements:blankAchievements(),lastLocation:null});
let storageAvailable=true;
function readState(){
 const clean=freshState();
 try{
  const raw=localStorage.getItem(STORAGE_KEY),value=raw?JSON.parse(raw):null;
  const legacy=!raw?JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY)||'null'):null;
  const settings=(value?.version===2?value.settings:legacy?.settings)||{};
  if(Object.hasOwn(dictionaries,settings.language))clean.settings.language=settings.language;
  if(['3d','2d'].includes(settings.viewMode))clean.settings.viewMode=settings.viewMode;
  for(const key of ['sound','reduceMotion'])if(typeof settings[key]==='boolean')clean.settings[key]=settings[key];
  if(value?.version!==2)return clean;
  for(const {id} of topics){if(value.lessons?.[id])clean.lessons[id]=sanitiseLesson(value.lessons[id],id);if(value.progress?.[id]==='started')clean.progress[id]='started';}
  clean.propertyTable=sanitiseTable(value.propertyTable);
  clean.investigation=sanitiseInvestigation(value.investigation);
  clean.propertyReport=sanitiseReport(value.propertyReport);
  clean.physicalLab=sanitisePhysicalLab(value.physicalLab);
  clean.chemicalLab=sanitiseChemicalLab(value.chemicalLab);
  clean.achievements=sanitiseAchievements(value.achievements);
  clean.lastLocation=sanitiseLocation(value.lastLocation);
  if(sampleIds.includes(value.activeSample))clean.activeSample=value.activeSample;
  if(typeof value.tableSource==='string')clean.tableSource=value.tableSource.slice(0,600);
  return clean;
 }catch{return clean;}
}
let state=readState();
function saveState(){syncAchievements();try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));storageAvailable=true;}catch{storageAvailable=false;}}
saveState();
window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY){state=readState();render(false);}});
