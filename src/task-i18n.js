/* Shared fallback diagnostics and transient language-only navigation state. */
const TaskI18n=(()=>{
 const languages=['ru','en','uz-Latn','uz-Cyrl'],warned=new Set();let pending=null;
 function missing(key,language=state.settings.language){const id=language+':'+key;if(!warned.has(id)){warned.add(id);console.warn('[i18n] Missing '+id+'; using Russian');}}
 function text(value,key,lang=state.settings.language){if(typeof value==='string')return value;if(!value?.[lang])missing(key,lang);return value?.[lang]??value?.ru??key;}
 function key(copy,key){if(!copy[key]){missing(key);return key;}return text(copy[key],key);}
 function changePage(){pending={route:location.hash,safety:SafetyWorkspace.capture(),study:EquipmentStudy.capture(),apparatus:WaterBathPage.capture()};render(false);}
 function take(kind){if(pending?.route!==location.hash)return null;const value=pending[kind];pending[kind]=null;return value;}
 return {languages,text,key,changePage,take};
})();
