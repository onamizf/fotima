/* Единая таблица hash-маршрутов. Старые ссылки на лабораторные сохранены. */
const SiteRoutes=(()=>{
 const pages=['welcome','home','catalog','theory','lab','result','settings','table','materials','progress','account','contacts','notfound'];
 const topicPages=['theory','lab','result','table','materials'];
 const names={ru:['ГЛАВНАЯ','ОПЫТЫ','КОНТАКТЫ'],en:['HOME','EXPERIMENTS','CONTACT'],'uz-Latn':['BOSH SAHIFA','TAJRIBALAR','ALOQA'],'uz-Cyrl':['БОШ САҲИФА','ТАЖРИБАЛАР','АЛОҚА']};
 function resolve(hash=location.hash){let raw;try{raw=decodeURIComponent(hash.replace(/^#/,''));}catch{return {page:'notfound',topic:topics[0]};}const parts=raw.split('/'),name=parts[0]||'welcome';if(['login','register'].includes(name)&&parts.length===1)return {page:'account',authMode:name,topic:topics[0]};const topic=topics.find(t=>t.id===(parts[1]||'properties'));if(!pages.includes(name)||parts.length>2||parts.length===2&&!topicPages.includes(name)||topicPages.includes(name)&&!topic)return {page:'notfound',topic:topics[0]};return {page:name,topic:topic||topics[0],...(name==='account'?{authMode:'register'}:{})};}
 function menu(page,cls='site-nav'){const labels=names[state.settings.language]||names.ru;return `<nav class="${cls}" aria-label="${t?.brand||'Химия'}">${['welcome','catalog','contacts'].map((id,i)=>`<a href="#${id}" ${id===page||id==='catalog'&&['home',...topicPages].includes(page)?'aria-current="page"':''}>${labels[i]}</a>`).join('<span aria-hidden="true">/</span>')}</nav>`;}
 const publicPages=['welcome','contacts','notfound','account'];
 function contacts(){return `<section class="panel contact-page"><h1>Контакты</h1><h2>Химия — Лаборатория элементов</h2><dl><div><dt>Автор</dt><dd>onamizf</dd></div><div><dt>Email</dt><dd>Будет добавлен</dd></div><div><dt>Telegram</dt><dd>Будет добавлен</dd></div></dl><a class="button primary" href="#welcome">На главную</a></section>`;}
 function notfound(){return `<section class="panel notfound-page"><h1>404</h1><p>Страница не найдена</p><a class="button primary" href="#welcome">На главную</a></section>`;}
 function title(page,topic=topics[0]){const names={welcome:'Главная',catalog:'Опыты',home:'Опыты',contacts:'Контакты',notfound:'404 — Страница не найдена',account:LocalAuth.signedIn()?'Аккаунт':(LocalAuth.mode()==='register'?cu().register:cu().login)};const label=topicPages.includes(page)?(t[page]||t[page+'Title']||page)+' — '+mini().labels[topics.indexOf(topic)]:names[page]||t[page]||t[page+'Title']||page;return label+' — Лаборатория элементов';}
 return {resolve,menu,contacts,notfound,publicPages,title};
})();
