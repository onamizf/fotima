/* Device preference is separate from graded and cloud progress. Apply before CSS to avoid flashing. */
const LabTheme=(()=>{
 const key='fotima.appearance';let mode='dark';
 try{if(localStorage.getItem(key)==='light')mode='light';}catch{}
 document.documentElement.dataset.theme=mode;
 const labels={ru:['Дневной режим','Ночной режим'],en:['Day mode','Night mode'],'uz-Latn':['Kunduzgi rejim','Tungi rejim'],'uz-Cyrl':['Кундузги режим','Тунги режим']};
 const sun='<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';
 const moon='<path d="M20.5 14A8.7 8.7 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z"/>';
 function button(language){const label=(labels[language]||labels.ru)[mode==='dark'?0:1];return `<button type="button" id="themeToggle" class="theme-toggle" aria-label="${label}" title="${label}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${mode==='dark'?sun:moon}</svg></button>`;}
 function bind(language){const el=document.getElementById('themeToggle');if(el)el.onclick=()=>{mode=mode==='dark'?'light':'dark';document.documentElement.dataset.theme=mode;try{localStorage.setItem(key,mode);}catch{}el.outerHTML=button(language);bind(language);document.getElementById('themeToggle').focus({preventScroll:true});};}
 window.addEventListener('storage',event=>{if(event.key===key){mode=event.newValue==='light'?'light':'dark';document.documentElement.dataset.theme=mode;const el=document.getElementById('themeToggle');if(el){el.outerHTML=button(document.documentElement.lang);bind(document.documentElement.lang);}}});
 return {button,bind};
})();
