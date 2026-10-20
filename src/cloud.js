/* Supabase Auth + per-user progress. Only public project configuration lives in the site. */
window.FotimaCloud=(()=>{
 const ROOT_KEY='fotima.chemistry7.curriculum.v2',SESSION_KEY='fotima.auth.session.v1';
 const cfg=window.FOTIMA_CLOUD_CONFIG||{};
 let session=null,loaded=false,busy=false,mode='register',message='',status='',revision=0,ack='',dirty=false,conflict=false,timer=null,writing=false,loading=false,epoch=0,recovery=false,localOnly=false,failure=null;
 function configured(){
  if(cfg.enabled!==true)return false;
  if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(cfg.url||''))return false;
  if((cfg.publishableKey||'').startsWith('sb_publishable_'))return true;
  try{return JSON.parse(atob(cfg.publishableKey.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role==='anon';}catch{return false;}
 }
 function capture(error,stage){
  const raw=String(error.code||'');
  const code=/^[A-Za-z0-9_]{1,48}$/.test(raw)?raw:error.name==='AbortError'?'TIMEOUT':error.name==='TypeError'?'NETWORK':error.message==='response'?'BAD_RESPONSE':'CLIENT_ERROR';
  const http=Number.isInteger(error.status)?error.status:null;
  const kind=['PGRST205','42P01'].includes(code)?'missingTable':['PGRST202','42883'].includes(code)?'missingRoutine':code==='42703'?'schema':http===401?'expired':code==='42501'||http===403?'permissions':['TIMEOUT','NETWORK'].includes(code)?'network':'service';
  failure={stage,http,code,kind};
 }
 function failureView(){if(!failure)return '';const u=cu();return `<details class="cloud-diagnostic" open><summary>${u.details}</summary><p>${u[failure.kind]||u.service}</p><code>${failure.stage}${failure.http?' · HTTP '+failure.http:''} · ${failure.code}</code></details>`;}
 function canContinue(){return !!session&&!loaded&&!loading&&!!failure&&failure.kind!=='expired';}
 function notice(){if(!session||(!localOnly&&!conflict&&!failure))return '';return `<aside class="warning cloud-local-note" role="status"><p>${localOnly?cu().localNotice:conflict?cu().conflict:cu()[status]||cu().offline}</p>${link(cu().accountSettings,'settings')}</aside>`;}
 function notify(){document.querySelectorAll('[data-cloud-status]').forEach(el=>el.textContent=cu()[status]||'');document.querySelectorAll('[data-cloud=load]').forEach(el=>el.disabled=loading||writing);document.querySelectorAll('[data-cloud=save]').forEach(el=>el.disabled=!loaded||conflict||loading||writing);}
 function storeSession(){sessionStorage.setItem(SESSION_KEY,JSON.stringify(session));}
 function metaKey(){return STORAGE_KEY+'.cloud';}
 function storeMeta(){try{localStorage.setItem(metaKey(),JSON.stringify({revision,dirty}));}catch{}}
 async function request(path,{body,method='GET',token}={}){
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
  try{
   const response=await fetch(cfg.url+path,{method,headers:{apikey:cfg.publishableKey,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:controller.signal,cache:'no-store'});
   const raw=await response.text();let result;try{result=raw?JSON.parse(raw):null;}catch{throw new Error('response');}
   if(!response.ok){const error=new Error('request');error.status=response.status;error.code=result?.code;throw error;}return result;
  }finally{clearTimeout(timeout);}
 }
 async function token(){
  if(!session)throw new Error('session');
  const ownEpoch=epoch;
  if(session.expires_at<Date.now()/1000+60){
   const next=await request('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:session.refresh_token}});
   if(ownEpoch!==epoch)throw new Error('session');
   session={access_token:next.access_token,refresh_token:next.refresh_token,expires_at:Date.now()/1000+next.expires_in,user:next.user};storeSession();
  }
  return session.access_token;
 }
 function localChanged(){
  if(!session||loading||recovery)return;
  if(!loaded){if(localOnly){dirty=true;storeMeta();status='pendingLocal';notify();}return;}
  dirty=JSON.stringify(state)!==ack;storeMeta();
  if(!dirty)return;
  if(!conflict){status='pending';clearTimeout(timer);timer=setTimeout(()=>save(),900);}
  notify();
 }
 function sessionKey(id){return ROOT_KEY+'.user.'+id;}
 async function activate(next){
  // Validate identity on the server before changing the active local cache.
  const verified=await request('/auth/v1/user',{token:next.access_token});
  if(!verified?.id||!/^[a-f0-9-]{36}$/i.test(verified.id))throw new Error('identity');
  session={access_token:next.access_token,refresh_token:next.refresh_token,expires_at:next.expires_at||Date.now()/1000+next.expires_in,user:{id:verified.id,email:verified.email||''}};
  try{storeSession();}catch{session=null;throw new Error('storage');}
  epoch++;loaded=false;conflict=false;localOnly=false;failure=null;clearTimeout(timer);
  STORAGE_KEY=sessionKey(session.user.id);state=readState();revision=0;dirty=false;ack=JSON.stringify(state);
  try{const meta=JSON.parse(localStorage.getItem(metaKey())||'null');if(Number.isInteger(meta?.revision)&&meta.revision>=0){revision=meta.revision;dirty=meta.dirty===true;}}catch{}
  status='busy';render(false);await load(false);
 }
 async function load(force=false){
  if(!session||loading||writing)return;
  if(force&&dirty&&!confirm(cu().loadConfirm))return;
  clearTimeout(timer);const ownEpoch=epoch,priorRevision=revision,wasDirty=dirty;
  loading=true;status='busy';render(false);
  try{
   const access=await token();const rows=await request('/rest/v1/lab_progress?select=payload,revision&user_id=eq.'+encodeURIComponent(session.user.id),{token:access});
   if(ownEpoch!==epoch)return;
   if(!Array.isArray(rows)||rows.length>1)throw new Error('response');
   const row=rows[0];if(row&&(!Number.isInteger(row.revision)||row.revision<1||row.payload?.version!==2))throw new Error('response');
   loading=false;
   if(wasDirty&&!force){
    loaded=true;localOnly=false;failure=null;
    if((row?.revision||0)!==priorRevision){conflict=true;status='conflict';render(false);return;}
    revision=row?.revision||0;ack='';status='pending';render(false);await save();return;
   }
   revision=row?.revision||0;
   state=row?readState(row.payload):state;
   ack=JSON.stringify(state);dirty=false;conflict=false;loaded=true;localOnly=false;failure=null;status=row?'saved':'pending';storeMeta();
   saveState();render(false);
   if(!row){ack='';dirty=true;storeMeta();await save();}
  }catch(error){if(ownEpoch===epoch){capture(error,'progress-read');status=error.status===401?'expired':loaded?'offline':'loadError';notify();}}
  finally{if(ownEpoch===epoch){loading=false;render(false);}}
 }
 async function save(){
  if(!session||!loaded||writing||loading||conflict)return;
  clearTimeout(timer);const snapshot=JSON.stringify(state);
  if(snapshot===ack){dirty=false;storeMeta();return;}
  const ownEpoch=epoch;writing=true;dirty=true;storeMeta();status='saving';notify();
  try{
   const access=await token();const next=await request('/rest/v1/rpc/save_lab_progress',{method:'POST',token:access,body:{p_payload:JSON.parse(snapshot),p_expected:revision}});
   if(ownEpoch!==epoch)return;
   if(!Number.isInteger(next)||next<1)throw new Error('response');
   revision=next;ack=snapshot;failure=null;dirty=JSON.stringify(state)!==ack;storeMeta();status=dirty?'pending':'saved';
  }catch(error){if(ownEpoch===epoch){capture(error,'progress-write');if(error.code==='40001'||error.status===409){conflict=true;status='conflict';}else status=error.status===401?'expired':'offline';}}
  finally{writing=false;notify();if(ownEpoch===epoch&&dirty&&!conflict&&status==='pending')timer=setTimeout(()=>save(),900);}
 }
 async function logout(){
  if(dirty&&!confirm(cu().logoutConfirm))return;
  const access=session?.access_token;epoch++;clearTimeout(timer);session=null;loaded=false;loading=false;dirty=false;conflict=false;ack='';message='';status='';recovery=false;localOnly=false;failure=null;
  try{sessionStorage.removeItem(SESSION_KEY);}catch{}
  STORAGE_KEY=ROOT_KEY;state=readState();location.hash='account';render(false);
  if(access)try{await request('/auth/v1/logout?scope=local',{method:'POST',token:access});}catch{}
 }
 function download(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='fotima-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function profile(){const u=cu();return `<section class="panel cloud-profile"><h2>${u.account}</h2><p>${escapeHTML(session.user.email)}</p><p class="note" role="status" data-cloud-status>${u[status]||''}</p>${failureView()}${canContinue()?`<p><button type="button" class="primary" data-cloud="continue-local">${u.continueLocal}</button></p>`:''}<div class="row"><button type="button" data-cloud="save" ${!loaded||conflict?'disabled':''}>${u.save}</button><button type="button" data-cloud="load" ${loading||writing?'disabled':''}>${u.load}</button><button type="button" data-cloud="download">${u.download}</button></div><details class="cloud-import"><summary>${u.localImport}</summary><p class="note">${u.importConfirm}</p><button type="button" data-cloud="import" ${!loaded||conflict?'disabled':''}>${u.localImport}</button></details><button type="button" class="textbtn" data-cloud="logout">${u.logout}</button></section>`;}
 function view(){const u=cu();
  if(session&&!recovery)return profile();
  const passwordMode=recovery||mode!=='recover',signup=mode==='register'&&!recovery;
  return `<section class="account-layout"><div class="account-story"><p class="discovery-kicker">${gameUI().eyebrow}</p><h1>${u.title}</h1><p>${u.intro}</p><div class="account-flask" aria-hidden="true">${vessel('flask')}</div></div><section class="account-card panel"><h2>${recovery?u.recovery:signup?u.register:mode==='recover'?u.recovery:u.login}</h2>${!recovery?`<div class="account-tabs"><button type="button" data-cloud="register" aria-pressed="${signup}">${u.register}</button><button type="button" data-cloud="login" aria-pressed="${mode==='login'}">${u.login}</button></div>`:''}${!configured()?`<p class="warning">${u.setup}</p>`:''}<form id="accountForm">${!recovery?`<label>${u.email}<input name="email" type="email" autocomplete="email" required maxlength="254"></label>`:''}${passwordMode?`<label>${recovery?u.newPassword:u.password}<input name="password" type="password" autocomplete="${signup||recovery?'new-password':'current-password'}" required ${signup||recovery?'minlength="8"':''} maxlength="128"></label>${signup||recovery?`<p class="note">${u.passwordHint}</p>`:''}`:''}<button class="primary" ${!configured()||busy?'disabled':''}>${busy?u.busy:recovery?u.changePassword:signup?u.create:mode==='recover'?u.forgot:u.login}</button></form><p id="accountMessage" role="status" class="note">${u[message]||''}</p>${!recovery?`<button type="button" class="textbtn" data-cloud="recover">${u.forgot}</button>`:''}<p class="account-privacy">${u.privacy}</p></section></section>`;
 }
 async function submit(event){
  event.preventDefault();if(busy||!configured())return;
  const form=event.currentTarget,data=new FormData(form),email=String(data.get('email')||'').trim(),password=String(data.get('password')||'');
  busy=true;message='busy';form.querySelector('button').disabled=true;document.querySelector('#accountMessage').textContent=cu().busy;
  try{
   // Fail before sending credentials if this browser cannot retain a session.
   sessionStorage.setItem('fotima.auth.test','1');sessionStorage.removeItem('fotima.auth.test');
   const redirect=location.origin+location.pathname;
   if(recovery){await request('/auth/v1/user',{method:'PUT',token:await token(),body:{password}});recovery=false;message='updated';location.hash='home';}
   else if(mode==='recover'){await request('/auth/v1/recover?redirect_to='+encodeURIComponent(redirect),{method:'POST',body:{email}});message='resetSent';}
   else if(mode==='register'){
    const result=await request('/auth/v1/signup?redirect_to='+encodeURIComponent(redirect),{method:'POST',body:{email,password}});
    if(result?.access_token){await activate(result);location.hash='home';}else{message='confirm';mode='login';}
   }else{
    const result=await request('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password}});await activate(result);location.hash='home';
   }
  }catch(error){message=error.name==='SecurityError'||error.message==='storage'?'storage':error.status===400||error.status===401||error.status===422?'invalid':'error';}
  finally{busy=false;render(false);}
 }
 function bind(){
  const form=document.getElementById('accountForm');if(form)form.onsubmit=submit;
  document.querySelectorAll('[data-cloud]').forEach(el=>el.onclick=async()=>{
   const key=el.dataset.cloud;
   if(['register','login','recover'].includes(key)){mode=key;message='';render(false);return;}
   if(key==='continue-local'&&canContinue()){localOnly=true;status='pendingLocal';location.hash='home';render(false);return;}
   if(key==='logout'){await logout();return;}
   if(key==='save'){await save();render(false);return;}
   if(key==='load'){await load(true);return;}
   if(key==='download'){download();return;}
   if(key==='import'&&loaded&&!conflict&&confirm(cu().importConfirm)){
    try{const raw=localStorage.getItem(ROOT_KEY);if(raw){state=readState(JSON.parse(raw));saveState();render(false);await save();}}catch{status='offline';notify();}
   }
  });
 }
 async function start(){
  if(!configured())return;
  try{
   const params=new URLSearchParams(location.hash.slice(1));
   if(params.has('access_token')){
    const next={access_token:params.get('access_token'),refresh_token:params.get('refresh_token'),expires_in:Number(params.get('expires_in')||3600)};
    recovery=params.get('type')==='recovery';history.replaceState(null,'',location.pathname+location.search+'#account');await activate(next);if(!recovery){location.hash='home';render(false);}return;
   }
   const raw=sessionStorage.getItem(SESSION_KEY);
   if(raw){session=JSON.parse(raw);await token();const next=session;session=null;await activate(next);render(false);}
  }catch{session=null;loaded=false;message='expired';try{sessionStorage.removeItem(SESSION_KEY);}catch{}render(false);}
 }
 window.addEventListener('online',()=>{if(session&&loaded&&!conflict)save();});
 return {configured,view,bind,start,changed:localChanged,gate:()=>configured()&&(!session||(!loaded&&!localOnly)||recovery||loading),signedIn:()=>!!session,profile,notice};
})();
