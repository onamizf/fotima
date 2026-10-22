/* Локальные аккаунты: никаких запросов в Supabase, email и открытых паролей. */
const localAuthText={
 ru:{account:'Аккаунт',login:'Вход',register:'Регистрация',logout:'ВЫЙТИ',signIn:'Вход / Регистрация',name:'Имя или псевдоним',password:'Пароль',repeat:'Повторите пароль',create:'ЗАРЕГИСТРИРОВАТЬСЯ',enter:'ВОЙТИ',toLogin:'Уже есть аккаунт? Войти',toRegister:'Нет аккаунта? Зарегистрироваться',local:'Аккаунт и прогресс сохраняются в этом браузере.',saved:'Сохранено на этом устройстве',download:'Скачать прогресс',show:'Показать пароль',hide:'Скрыть пароль',hello:'Привет'},
 en:{account:'Account',login:'Sign in',register:'Register',logout:'LOG OUT',signIn:'Sign in / Register',name:'Name or nickname',password:'Password',repeat:'Repeat password',create:'REGISTER',enter:'SIGN IN',toLogin:'Already registered? Sign in',toRegister:'No account? Register',local:'Your account and progress are saved in this browser.',saved:'Saved on this device',download:'Download progress',show:'Show password',hide:'Hide password',hello:'Hello'},
 'uz-Latn':{account:'Hisob',login:'Kirish',register:'Ro‘yxatdan o‘tish',logout:'CHIQISH',signIn:'Kirish / Ro‘yxatdan o‘tish',name:'Ism yoki taxallus',password:'Parol',repeat:'Parolni takrorlang',create:'RO‘YXATDAN O‘TISH',enter:'KIRISH',toLogin:'Hisobingiz bormi? Kiring',toRegister:'Hisobingiz yo‘qmi? Ro‘yxatdan o‘ting',local:'Hisob va natijalar shu brauzerda saqlanadi.',saved:'Shu qurilmada saqlandi',download:'Natijalarni yuklab olish',show:'Parolni ko‘rsatish',hide:'Parolni yashirish',hello:'Salom'},
 'uz-Cyrl':{account:'Ҳисоб',login:'Кириш',register:'Рўйхатдан ўтиш',logout:'ЧИҚИШ',signIn:'Кириш / Рўйхатдан ўтиш',name:'Исм ёки тахаллус',password:'Парол',repeat:'Паролни такрорланг',create:'РЎЙХАТДАН ЎТИШ',enter:'КИРИШ',toLogin:'Ҳисобингиз борми? Киринг',toRegister:'Ҳисобингиз йўқми? Рўйхатдан ўтинг',local:'Ҳисоб ва натижалар шу браузерда сақланади.',saved:'Шу қурилмада сақланди',download:'Натижаларни юклаб олиш',show:'Паролни кўрсатиш',hide:'Паролни яшириш',hello:'Салом'}
};
function cu(){return localAuthText[state.settings.language]||localAuthText.ru;}
window.LocalAuth=(()=>{
 const USERS='fotima.local.accounts.v1',SESSION='fotima.local.session.v1',ROOT='fotima.chemistry7.curriculum.v2';
 let user=null,mode='register',busy=false,message='',validateVisible=null;
 const text={name:'Введите имя или псевдоним (минимум 3 символа)',long:'Имя или псевдоним — от 3 до 20 символов',characters:'Разрешены буквы кириллицы и латиницы, цифры, «_» и пробел',taken:'Такое имя уже занято — придумайте другое',password:'Пароль должен содержать не менее 8 символов',repeat:'Пароли не совпадают',invalid:'Неверное имя или пароль',storage:'Не удалось сохранить аккаунт. Проверьте доступ к памяти браузера.',damaged:'Не удалось прочитать сохранённые аккаунты. Данные не изменены.',crypto:'Не удалось защитить пароль. Откройте сайт по HTTPS и повторите попытку.'};
 const canonical=name=>name.trim().normalize('NFC').toLocaleLowerCase('ru');
 const length=value=>Array.from(value).length;
 const key=id=>ROOT+'.local-user.'+id;
 function validUser(u){return u&&/^[a-f0-9-]{32,36}$/.test(u.id)&&typeof u.name==='string'&&u.canonical===canonical(u.name)&&/^[a-f0-9]{64}$/.test(u.salt)&&/^[a-f0-9]{64}$/.test(u.hash);}
 function users(){const raw=localStorage.getItem(USERS);if(!raw)return [];let value;try{value=JSON.parse(raw);}catch{throw Error('damaged');}if(value.version!==1||!Array.isArray(value.users)||!value.users.every(validUser))throw Error('damaged');return value.users;}
 function hex(bytes){return Array.from(bytes,n=>n.toString(16).padStart(2,'0')).join('');}
 function random(){return hex(crypto.getRandomValues(new Uint8Array(32)));}
 async function digest(password,salt){if(!crypto.subtle)throw Error('crypto');return hex(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+':'+password))));}
 function errors(values,list){const out={},name=values.name.trim().normalize('NFC');if(length(name)<3)out.username=text.name;else if(length(name)>20)out.username=text.long;else if(!/^[\p{Script=Latin}\p{Script=Cyrillic}0-9_ ]+$/u.test(name))out.username=text.characters;else if(mode==='register'&&list.some(u=>u.canonical===canonical(name)))out.username=text.taken;if(length(values.password)<8)out.password=text.password;if(mode==='register'&&values.repeat!==values.password)out.repeat=text.repeat;return out;}
 function readForm(form){return {name:form.elements.username.value,password:form.elements.password.value,repeat:form.elements.repeat?.value||''};}
 function restore(){
  user=null;STORAGE_KEY=ROOT;
  try{const session=JSON.parse(localStorage.getItem(SESSION)||'null'),found=session&&users().find(u=>u.id===session.userId);if(found&&/^[a-f0-9]{64}$/.test(session.sessionId)){user={id:found.id,name:found.name};STORAGE_KEY=key(found.id);state=localStorage.getItem(STORAGE_KEY)?readState():freshState();}else state=readState();}catch(error){message=error.message==='damaged'?text.damaged:text.storage;state=readState();}
  if(user)syncAchievements();
 }
 function activate(record,newAccount=false){
  const previous={user,key:STORAGE_KEY,state},language=state.settings.language;
  try{
   localStorage.setItem(SESSION,JSON.stringify({userId:record.id,sessionId:random()}));
   user={id:record.id,name:record.name};STORAGE_KEY=key(record.id);
   state=localStorage.getItem(STORAGE_KEY)?readState():freshState();if(newAccount)state.settings.language=language;
   saveState();if(!storageAvailable)throw Error('storage');
  }catch(error){user=previous.user;STORAGE_KEY=previous.key;state=previous.state;try{localStorage.removeItem(SESSION);}catch{}throw error;}
 }
 function passwordField(name,label,repeat=false){const u=cu();return `<div class="auth-field"><label for="auth-${name}">${label}</label><div class="auth-password"><input id="auth-${name}" name="${name}" type="password" minlength="8" autocomplete="${mode==='register'?'new-password':'current-password'}" required aria-describedby="error-${name}${repeat?'':' passwordCount'}"><button type="button" data-password-toggle="${name}" aria-label="${u.show}" aria-pressed="false"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></button></div>${repeat?'':'<small id="passwordCount">0 / 8 символов</small>'}<p class="auth-error" id="error-${name}" aria-live="polite"></p></div>`;}
 function profile(){const u=cu();return `<section class="panel cloud-profile local-profile"><header class="account-heading"><div><h2>${u.account}</h2><p>${escapeHTML(user.name)}</p></div></header>${learnerLevelCard()}<footer class="account-sync"><p role="status">${storageAvailable?u.saved:text.storage}</p><button type="button" data-auth-download>${u.download}</button></footer></section>`;}
 function view(){if(user)return profile();const u=cu(),register=mode==='register';return `<section class="account-layout"><section class="account-card panel local-auth"><h1>${register?u.register:u.login}</h1><form id="accountForm" novalidate><div class="auth-field"><label for="auth-username">${u.name}</label><input id="auth-username" name="username" type="text" autocomplete="username" required minlength="3" aria-describedby="error-username" autocapitalize="none" spellcheck="false"><p class="auth-error" id="error-username" aria-live="polite"></p></div>${passwordField('password',u.password)}${register?passwordField('repeat',u.repeat,true):''}<button class="primary auth-submit" type="submit" disabled>${register?u.create:u.enter}</button><p id="accountMessage" class="auth-error" role="alert">${escapeHTML(message)}</p></form><a class="auth-switch" href="${register?'#login':'#register'}">${register?u.toLogin:u.toRegister}</a><p class="auth-local-note">${u.local}</p></section></section>`;}
 async function submit(event){
  event.preventDefault();if(busy)return;const form=event.currentTarget,values=readForm(form);if(!validateVisible?.(true))return;busy=true;message='';form.querySelector('[type=submit]').disabled=true;
  try{
   let record;
   if(mode==='register'){
    const salt=random(),hash=await digest(values.password,salt),name=values.name.trim().normalize('NFC');
    const create=()=>{const list=users();if(list.some(u=>u.canonical===canonical(name)))throw Error('taken');record={id:crypto.randomUUID?crypto.randomUUID():random().slice(0,32),name,canonical:canonical(name),salt,hash};
     localStorage.setItem(USERS,JSON.stringify({version:1,users:[...list,record]}));
     try{activate(record,true);}catch(error){localStorage.setItem(USERS,JSON.stringify({version:1,users:users().filter(u=>u.id!==record.id)}));localStorage.removeItem(key(record.id));localStorage.removeItem(SESSION);user=null;STORAGE_KEY=ROOT;state=readState();throw error;}
    };
    // Web Locks не даёт двум вкладкам зарегистрировать одно имя одновременно.
    if(navigator.locks)await navigator.locks.request('fotima-local-accounts',create);else create();
   }else{
    record=users().find(u=>u.canonical===canonical(values.name));const hash=await digest(values.password,record?.salt||'0'.repeat(64));if(!record||hash!==record.hash)throw Error('invalid');activate(record);
   }
   message='';location.hash='home';render(false);
  }catch(error){message=text[error.message]||text.storage;const target=form.querySelector(error.message==='taken'?'#error-username':'#accountMessage');if(target)target.textContent=message;}
  finally{busy=false;if(form.isConnected)validateVisible?.();}
 }
 function download(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='chemistry-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function signOut(){saveState();if(!storageAvailable&&!confirm('Прогресс не удалось сохранить. Выйти?'))return;try{localStorage.removeItem(SESSION);}catch{message=text.storage;render(false);return;}user=null;mode='login';STORAGE_KEY=ROOT;state=readState();location.hash='login';render(false);}
 function bind(){validateVisible=null;const form=document.getElementById('accountForm');if(form){const touched=new Set();
   validateVisible=(all=false)=>{let out;try{out=errors(readForm(form),users());}catch(error){message=error.message==='damaged'?text.damaged:text.storage;form.querySelector('#accountMessage').textContent=message;form.querySelector('[type=submit]').disabled=true;return false;}
    for(const name of ['username','password','repeat']){const input=form.elements[name],el=document.getElementById('error-'+name);if(!input||!el)continue;const show=all||touched.has(name);el.textContent=show?(out[name]||''):'';input.setAttribute('aria-invalid',String(show&&!!out[name]));}
    form.querySelector('#passwordCount').textContent=length(form.elements.password.value)+' / 8 символов';const valid=Object.keys(out).length===0;form.querySelector('[type=submit]').disabled=!valid||busy;return valid;
   };
   form.oninput=event=>{if(event.target.name)touched.add(event.target.name);form.querySelector('#accountMessage').textContent='';validateVisible();};form.addEventListener('focusout',event=>{if(event.target.name){touched.add(event.target.name);validateVisible();}});form.onsubmit=submit;
   form.querySelectorAll('[data-password-toggle]').forEach(button=>button.onclick=()=>{const input=form.elements[button.dataset.passwordToggle],show=input.type==='password';input.type=show?'text':'password';button.setAttribute('aria-pressed',String(show));button.setAttribute('aria-label',show?cu().hide:cu().show);});validateVisible();
  }
  document.querySelectorAll('[data-auth-logout],[data-profile-logout]').forEach(button=>button.onclick=signOut);document.querySelectorAll('[data-auth-download]').forEach(button=>button.onclick=download);
 }
 function setMode(value){if(['register','login'].includes(value)&&value!==mode){mode=value;message='';}}
 function greeting(){return user?`<span class="user-greeting">${cu().hello}, ${escapeHTML(user.name)}!</span>`:'';}
 window.addEventListener('storage',event=>{if(event.key===SESSION){restore();render(false);}else if(event.key===USERS)validateVisible?.();});
 restore();
 return {view,bind,profile,signOut,changed:()=>{},notice:()=>'',configured:()=>true,gate:()=>!user,signedIn:()=>!!user,greeting,setMode,prepareRegistration:()=>setMode('register'),start:()=>{},mode:()=>mode,currentUser:()=>user?{...user}:null};
})();
// Совместимость с сохранёнными маршрутами и компонентами лаборатории.
window.FotimaCloud=window.LocalAuth;
