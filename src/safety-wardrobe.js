/* Safety wardrobe: scoped view, account storage, disposable animations/listeners. */
const SafetyWardrobe=(()=>{
 const d=SafetyWardrobeData,local=value=>CourseModel.text(value),esc=value=>escapeHTML(String(value??''));
 const text=(key,params={})=>local(d.copy[key]||{ru:key}).replace(/\{(\w+)\}/g,(_,k)=>params[k]??'');
 const item=id=>d.items.find(i=>i.id===id),profession=id=>d.professions.find(p=>p.id===id);
 const reduced=()=>state.settings.reduceMotion||matchMedia('(prefers-reduced-motion: reduce)').matches;
 let root,controller,screen='start',category='head',selected={},job=null,mistakes=0,hints=0,finished=false,flipped=false,timers=new Set(),animations=new Set(),dialogOpener,speechVersion=0,resizeObserver,parallaxRAF=0,calibrationKey=null,calibrationDrag=null,calibrationValues={},showFrames=false;
 const jointCache=new Map(),neckCache=new Map(),neckPending=new WeakSet();
 const layerCache=new Map(),incoming=new Map(),fallbackBound=new WeakSet();
 function later(fn,delay){const id=setTimeout(()=>{timers.delete(id);if(root?.isConnected)fn();},reduced()?0:delay);timers.add(id);return id;}
 function animate(el,frames,options){if(!el||reduced())return;const a=el.animate(frames,options);animations.add(a);a.finished.catch(()=>{}).finally(()=>animations.delete(a));return a;}
 function blank(){return {completed:{},master:false};}
 function sanitize(value){const clean=blank();for(const p of d.professions){const stars=value?.completed?.[p.id];if(Number.isInteger(stars)&&stars>=1&&stars<=3)clean.completed[p.id]=stars;}clean.master=Object.keys(clean.completed).length===13&&value?.master===true;return clean;}
 const progress=()=>state.safetyWardrobe??=blank();
 const count=()=>Object.keys(progress().completed).length;
 const worn=()=>Object.values(selected);
 const calibrating=()=>new URLSearchParams(location.search).get('calibrate')==='1';
 const correct=()=>job?job.required.filter(id=>worn().includes(id)).length:0;
 // Версия URL обновляет заменённые WebP без очистки прогресса и аккаунта.
 const assetURL=path=>path.endsWith('.webp')?path+'?v='+encodeURIComponent(document.querySelector('meta[name=application-version]')?.content||'local'):path;
 function image(path,label,cls='',lazy=true){path=assetURL(path);return `<img class="${cls}" src="${path}" alt="${esc(label)}" ${lazy?'loading="lazy"':''} draggable="false">`;}

 function sprite(i){return `<span class="sw-art" aria-hidden="true">${image('assets/game/items/'+i.id+'.png','')}</span>`;}

 function art(i){return `<span class="sw-icon-frame">${sprite(i)}</span>`;}

 // Полные модели остаются в общем холсте; запасные иконки имеют отдельную геометрию.
 function pieces(){
  const result=[];
  for(const id of worn()){
   const i=item(id);
   if(worn().some(other=>other!==id&&item(other).hides?.includes(i.category)))continue;
   const asset=layerCache.get(id);
   if(asset?.status==='ready'){result.push({id,key:id+':layer',full:true,z:i.z});continue;}
   if(asset?.status!=='missing')continue;
   const points=d.scene.flightPoints[i.category];
   points.forEach((point,n)=>{
    const key=id+':'+(points.length===2?(n?'right':'left'):'icon');
    const initial={...point,w:i.category==='feet'?d.scene.fallbacks.feet.w:28,rotate:0};
    result.push({id,key,full:false,part:points.length===2?(n?'right':'left'):'icon',...initial,...calibrationValues[key],z:i.z});
   });
  }
  return result.sort((a,b)=>a.z-b.z);
 }

 function layerStyle(p){const blend=item(p.id).coverage?.footBlend;return p.full?`z-index:${p.z}${blend?`;--sw-foot-blend-from:${blend.from}%;--sw-foot-blend-to:${blend.to}%`:''}`:`left:${p.x}%;top:${p.y}%;width:${p.w}%;--wear-rotate:${p.rotate}deg;z-index:${p.z}`;}

 // Разметка рисунка внутри общего холста привязана к анатомии манекена.
 // Исходные WebP не меняются: SVG размещает прежнюю модель между опорными границами.
 function registration(i){
  const r=i.registration;if(!r)return {x:0,y:0,width:896,height:1200,sx:1,sy:1};
  const [x1,y1,x2,y2]=r.source,[a1,b1,a2,b2]=r.body,sx=(a2-a1)/(x2-x1),sy=(b2-b1)/(y2-y1);
  return {x:a1-x1*sx,y:b1-y1*sy,width:896*sx,height:1200*sy,sx,sy};
 }
 function jointGeometry(i){if(!jointCache.has(i.id))jointCache.set(i.id,i.joints?WardrobeJoints.build(i.joints.cuffs):[]);return jointCache.get(i.id);}
 function openingPath(o){return WardrobeJoints.openingPoints(o).map((p,n)=>(n?'L':'M')+p.join(',')).join('')+'Z';}
 function registeredImage(i){
  const r=registration(i),patches=jointGeometry(i),id='sw-joints-'+i.id,entry=layerCache.get(i.id);
  if(patches.length&&!entry.fitted)entry.fitted=WardrobeJoints.rasterize(entry.image,r,patches);
  const fitted=patches.length&&entry.fitted;
  const image=`<image href="${fitted||assetURL(i.layer)}" x="${fitted?0:r.x}" y="${fitted?0:r.y}" width="${fitted?896:r.width}" height="${fitted?1200:r.height}" preserveAspectRatio="none"></image>`;
  const openings=i.joints?[...patches.map(p=>p.opening),...(i.joints.neck.opening?[i.joints.neck.opening]:[])]:[];
  const contents=openings.length?`<defs><clipPath id="${id}-openings"><path clip-rule="evenodd" d="M0 0H896V1200H0Z${openings.map(openingPath).join('')}"></path></clipPath></defs><g clip-path="url(#${id}-openings)">${image}</g>`:image;
  return `<svg class="sw-layer-image ${i.coverage?.footBlend?'sw-foot-blend':''} ${i.coverage?.clipAbove?'sw-foot-top-clip':''}" viewBox="0 0 896 1200" preserveAspectRatio="none" aria-hidden="true" style="${i.coverage?.clipAbove?'--sw-foot-clip-top:'+i.coverage.clipAbove+'%':''}">${contents}</svg>`;
 }
 function layerMarkup(p){
  const i=item(p.id),label=esc(local(i.name));
  if(p.full){
   return `<span class="sw-wearable sw-full-layer" data-sw-layer="${i.id}" data-sw-key="${p.key}" data-sw-slot="${i.category}" style="${layerStyle(p)}" role="img" aria-label="${label}">${registeredImage(i)}</span>`;
  }
  return `<button type="button" class="sw-wearable sw-fallback-layer ${calibrationKey===p.key?'sw-calibration-selected':''}" data-sw-layer="${i.id}" data-sw-key="${p.key}" data-sw-part="${p.part}" data-sw-slot="${i.category}" style="${layerStyle(p)}" aria-label="${label}"><span class="sw-wear-pose ${p.part!=='icon'?'sw-half sw-half-'+p.part:''}">${sprite(i)}</span><span class="sw-layer-fallback" aria-hidden="true">${d.categories.find(c=>c.id===i.category).emoji}</span></button>`;
 }
 function layers(){return pieces().map(layerMarkup).join('');}
 // Результаты onload/onerror кэшируются. Добавленный впоследствии файл подхватится при следующем входе/F5.
 function loadLayer(id){
  if(layerCache.has(id))return layerCache.get(id).promise;
  const entry={status:'loading',image:new Image(),alpha:null};
  layerCache.set(id,entry);
  entry.promise=new Promise(resolve=>{
   const done=status=>{entry.status=status;entry.image.onload=entry.image.onerror=null;resolve(entry);if(root?.isConnected&&screen==='wardrobe'&&worn().includes(id))updateLayers();};
   entry.image.onload=()=>done('ready');entry.image.onerror=()=>done('missing');entry.image.src=assetURL(item(id).layer);
  });
  return entry.promise;
 }
 function preloadCategory(){d.items.filter(i=>i.category===category).forEach(i=>loadLayer(i.id));}
 function hitLayer(event){
  if(finished||calibrationDrag||event.target.closest('.sw-fallback-layer'))return;
  const box=root.querySelector('.sw-doll').getBoundingClientRect();
  let x=(event.clientX-box.left)/box.width,y=(event.clientY-box.top)/box.height;if(flipped)x=1-x;
  if(x<0||x>1||y<0||y>1)return;
  for(const p of pieces().filter(p=>p.full).reverse()){
   const i=item(p.id),patches=jointGeometry(i),point=[x*896,y*1200];
   if(i.joints&&[...patches.map(p=>p.opening),...(i.joints.neck.opening?[i.joints.neck.opening]:[])].some(o=>WardrobeJoints.inOpening(o,...point)))continue;
   const [jointX,jointY]=WardrobeJoints.inverse(patches,...point),r=registration(i),sourceX=(jointX-r.x)/r.width,sourceY=(jointY-r.y)/r.height;
   if(sourceX<0||sourceX>1||sourceY<0||sourceY>1)continue;
   if(i.coverage?.clipAbove&&y*100<i.coverage.clipAbove)continue;
   const blend=i.coverage?.footBlend,opacity=blend?Math.max(0,Math.min(1,(y*100-blend.from)/(blend.to-blend.from))):1;
   const entry=layerCache.get(p.id);
   if(!entry.alpha){
    const canvas=document.createElement('canvas');canvas.width=entry.image.naturalWidth;canvas.height=entry.image.naturalHeight;
    const context=canvas.getContext('2d',{willReadFrequently:true});
    if(!context)continue;context.drawImage(entry.image,0,0);entry.alpha=context.getImageData(0,0,canvas.width,canvas.height).data;
   }
   const w=entry.image.naturalWidth,h=entry.image.naturalHeight,index=(Math.min(h-1,Math.floor(sourceY*h))*w+Math.min(w-1,Math.floor(sourceX*w)))*4+3;
   if(entry.alpha[index]*opacity>32){toggle(p.id,root.querySelector(`[data-sw-layer="${p.id}"]`));return;}
  }
 }

 function calibrationPanel(){return calibrating()?`<details class="sw-calibration"><summary>${text('expandCalibration')}</summary><strong>${text('calibration')}</strong><p>${text('calibrationHint')}</p>${button('show-frames',text(showFrames?'hideFrames':'showFrames'),'sw-frame-button',`aria-pressed="${showFrames}"`)}<output data-sw-calibration>${text('calibrationSelect')}</output>${button('copy-calibration',text('copySettings'))}<textarea class="sw-calibration-json" readonly hidden aria-label="JSON"></textarea></details>`:'';}

 function button(action,label,cls='',extra=''){return `<button type="button" class="${cls}" data-sw="${action}" ${extra}>${esc(label)}</button>`;}
 function view(){return `<section class="sw" data-safety-wardrobe aria-label="${esc(text('title'))}"></section>`;}
 function top(){return `<header class="sw-top"><span class="sw-badge"><span class="sw-badge-label">🦺 ${text('wardrobe')}</span> ${button('help','?','sw-round',`aria-label="${text('instructions')}"`)}</span>${job?`<div class="sw-task"><strong title="${esc(local(job.name))}">${job.emoji} ${local(job.name)}</strong><span data-sw-progress>${text('complete',{n:correct(),total:job.required.length})}</span><progress max="${job.required.length}" value="${correct()}"></progress></div>`:''}${button('exit','×','sw-round',`aria-label="${text('exit')}"`)}</header>`;}
 function start(){return `${top()}<div class="sw-cover">${image('assets/game/cover.jpg',text('title'),'sw-cover-image',false)}<div class="sw-cover-copy"><span class="sw-eyebrow">🧪 · 🦺 · 💚</span><h1>${text('title')}</h1><p>${text('freeIntro')}</p><div class="sw-actions">${button('play',text('play'),'sw-green')}${button('professions',text('professions'),'sw-blue')}</div><p class="sw-completed">${text('progress',{n:count()})}</p>${progress().master?`<strong>${text('master')}</strong>`:''}</div></div>`;}
 function tabs(){return `<div class="sw-tabs" role="tablist" aria-label="${text('wardrobe')}"><kbd>Q</kbd>${d.categories.map(c=>`<button type="button" role="tab" id="sw-tab-${c.id}" aria-controls="sw-items" aria-label="${esc(local(c.name))}" title="${esc(local(c.name))}" aria-selected="${category===c.id}" tabindex="${category===c.id?0:-1}" data-sw-category="${c.id}" class="${job&&job.required.some(id=>item(id).category===c.id&&!worn().includes(id))?'sw-needed':''}"><span aria-hidden="true">${c.emoji}</span><small class="sw-tab-tooltip">${local(c.name)}</small></button>`).join('')}<kbd>E</kbd></div>`;}
 function cards(){return d.items.filter(i=>i.category===category).map((i,n)=>`<button type="button" class="sw-card ${worn().includes(i.id)?'sw-selected':''}" data-sw-item="${i.id}" aria-pressed="${worn().includes(i.id)}" aria-label="${esc(local(i.name)+'. '+local(i.tip))}" title="${esc(local(i.name)+' — '+local(i.tip))}" style="--delay:${n*30}ms">${art(i)}<span class="sw-item-fallback" aria-hidden="true">${d.categories.find(c=>c.id===i.category).emoji}</span><span class="sw-check" aria-hidden="true">✓</span><span class="sw-tooltip">${local(i.name)}<small>${local(i.tip)}</small></span></button>`).join('');}
 function badges(){const obscure=worn().includes('space-helmet')||worn().includes('welding-mask');return worn().map(id=>{const i=item(id);return `<button type="button" data-sw-remove="${id}" class="sw-worn-icon ${obscure&&(i.category==='eyes'||i.category==='face')&&id!=='welding-mask'?'sw-obscured':''}" aria-label="${esc(local(i.name))}">${art(i)}</button>`;}).join('');}
 function coverageDefinitions(){
  // Вычитаем только свободные рукава базовой футболки: ворот и середина остаются под открытой курткой.
  return `<svg class="sw-coverage-defs" aria-hidden="true"><defs><clipPath id="sw-shirt-sleeve-cutouts" clipPathUnits="objectBoundingBox"><path clip-rule="evenodd" d="M0 0H1V1H0Z M.28 .32L.40 .32L.38 .47L.35 .49L.28 .44Z M.72 .32L.60 .32L.62 .47L.65 .49L.72 .44Z"></path></clipPath><clipPath id="sw-shirt-collar-cutouts" clipPathUnits="objectBoundingBox"><path clip-rule="evenodd" d="M0 0H1V1H0Z M.28 .32L.44 .32L.44 .38L.38 .47L.35 .49L.28 .44Z M.72 .32L.56 .32L.56 .38L.62 .47L.65 .49L.72 .44Z"></path></clipPath></defs></svg>`;
 }
 function neckSkin(){return `<svg class="sw-neck-skin" viewBox="0 0 896 1200" aria-hidden="true" hidden><image data-sw-neck-skin width="896" height="1200"></image></svg>`;}
 function wardrobe(){return `<div class="sw-room"><div class="sw-scene-viewport"><div class="sw-world" data-sw-scene><div class="sw-room-background" style="background-image:url('${d.scene.background}')"></div><div class="sw-character-anchor"><span class="sw-foot-shadow" aria-hidden="true"></span><div class="sw-frog-turn" style="transform:scaleX(${flipped?-1:1})"><div class="sw-frog-bounce"><div class="sw-frog-idle"><div class="sw-doll">${coverageDefinitions()}<div class="sw-base">${image(d.scene.base,text('frogAlt'),'frog-base',false)}<span class="sw-frog-fallback" aria-hidden="true">🐸</span></div>${neckSkin()}<div class="sw-layers">${layers()}</div></div></div></div></div><span class="sw-sparkles" aria-hidden="true"></span></div></div></div><p class="sw-speech" role="status" aria-live="polite">${job?local(job.greeting):text('freeIntro')}</p><div class="sw-vignette" aria-hidden="true"></div>${top()}<div class="sw-small-controls">${button('left','↶','sw-round',`aria-label="${text('left')}"`)}${button('right','↷','sw-round',`aria-label="${text('right')}"`)}${button('reset','↺','sw-round',`aria-label="${text('reset')}"`)}</div><div class="sw-worn"><span>${text('worn')}</span><div data-sw-worn>${badges()}</div></div><div class="sw-selection">${selection()}</div>${calibrationPanel()}</div>`;}

 function selection(){return `${tabs()}<h2 class="sw-sticker">${text('choose',{name:local(d.categories.find(c=>c.id===category).name)})}</h2><div class="sw-grid" id="sw-items" role="tabpanel" aria-labelledby="sw-tab-${category}">${cards()}</div><div class="sw-actions">${button('professions',text('professions')+' 👩‍🔬','sw-blue')}${button('done',text('done'),'sw-green')}</div>${job?button('hint',text('hint'),'sw-hint'):''}`;}
 function layout(){
  if(!root)return;
  const stacked=root.clientWidth<900;root.dataset.layout=stacked?'stacked':'wide';
  root.style.setProperty('--sw-scene-split',Math.min(root.clientHeight*.52,Math.max(root.clientHeight*.45,root.clientWidth/d.scene.width*d.scene.height*.85))+'px');
  const viewport=root.querySelector('.sw-scene-viewport'),world=root.querySelector('[data-sw-scene]');if(!viewport||!world)return;
  const w=viewport.clientWidth,h=viewport.clientHeight,scale=Math.max(w/d.scene.width,h/d.scene.height)*(stacked?1:1.025);
  world.style.width=d.scene.width*scale+'px';world.style.height=d.scene.height*scale+'px';
  world.style.left=(stacked?Math.max(w-d.scene.width*scale,Math.min(0,w/2-d.scene.width*scale*.36)):(w-d.scene.width*scale)/2)+'px';world.style.top=(h-d.scene.height*scale)/2+'px';
  const frog=world.querySelector('.sw-character-anchor'),c=d.scene.character;
  // Высота привязана к видимой сцене, ступни — к коврику в общей системе координат.
  const height=h*c.height/100;frog.style.height=height+'px';frog.style.top=(d.scene.height*scale*c.footY/100-height*c.footInCanvas/100)+'px';
  const wornRow=root.querySelector('.sw-worn');
  if(wornRow){const frame=root.getBoundingClientRect(),doll=root.querySelector('.sw-doll').getBoundingClientRect();wornRow.style.left=(doll.left+doll.width/2-frame.left)+'px';}
  positionSpeech();
  const calibration=root.querySelector('.sw-calibration');
  if(calibration){const frame=root.getBoundingClientRect(),frogBox=root.querySelector('.sw-doll').getBoundingClientRect(),left=stacked?52:66;calibration.style.width=Math.max(125,Math.min(260,frogBox.left+frogBox.width*.24-frame.left-left-12))+'px';}
 }

 function draw(focus){if(!root)return;root.dataset.screen=screen;root.dataset.job=String(!!job);root.classList.toggle('sw-calibrating',calibrating());root.classList.toggle('sw-debug-frames',calibrating()&&showFrames);root.innerHTML=screen==='start'?start():screen==='result'?result():wardrobe();bindFallbacks();layout();if(screen==='wardrobe')preloadCategory();if(focus)root.querySelector(focus)?.focus({preventScroll:true});}

 function bindFallbacks(){root?.querySelectorAll('img').forEach(img=>{if(fallbackBound.has(img))return;fallbackBound.add(img);const fail=()=>{img.hidden=true;img.parentElement.classList.add('sw-image-missing');img.closest('.sw-card,.sw-worn-icon,.sw-fallback-layer,.sw-base,.sw-result,.sw-cover')?.classList.add('sw-image-missing');};img.addEventListener('error',fail,{once:true,signal:controller.signal});if(img.complete&&!img.naturalWidth)fail();});}

 function positionSpeech(){
  const bubble=root?.querySelector('.sw-speech'),doll=root?.querySelector('.sw-doll'),viewport=root?.querySelector('.sw-scene-viewport');if(!bubble||!doll)return;
  const frame=root.getBoundingClientRect(),frog=doll.getBoundingClientRect(),v=viewport.getBoundingClientRect(),stacked=root.dataset.layout==='stacked';
  const faceLeft=frog.left+frog.width*.29,available=faceLeft-frame.left-24,width=Math.max(80,Math.min(stacked?116:195,available));
  bubble.style.width=width+'px';bubble.style.left=Math.max(10,faceLeft-frame.left-width-12)+'px';
  const minY=Math.max(v.top,frame.top)+60,maxY=v.bottom-bubble.offsetHeight-12;
  bubble.style.top=Math.max(minY,Math.min(maxY,frog.top+frog.height*.10-frame.top))+'px';
 }

 function say(message,typewriter=false){const version=++speechVersion,el=root?.querySelector('.sw-speech');if(!el)return;el.textContent=message;positionSpeech();if(typewriter&&!reduced()){el.textContent='';const chars=Array.from(message);let n=0;const step=()=>{if(!el.isConnected||version!==speechVersion)return;el.textContent=chars.slice(0,++n).join('');positionSpeech();if(n<chars.length)later(step,24);};step();}}

 function updateLayers(){
  const container=root?.querySelector('.sw-layers');if(!container)return;
  const desired=pieces(),keys=new Set(desired.map(p=>p.key));
  container.querySelectorAll('[data-sw-key]').forEach(node=>{if(!keys.has(node.dataset.swKey)&&!node.classList.contains('sw-leaving')){node.classList.add('sw-leaving');const a=animate(node,[{opacity:1},{opacity:0}],{duration:200,fill:'forwards'});if(a)a.finished.catch(()=>{}).finally(()=>node.remove());else node.remove();}});
  for(const p of desired){
   let node=[...container.children].find(el=>el.dataset.swKey===p.key&&!el.classList.contains('sw-leaving'));
   if(node){node.style.cssText=layerStyle(p);continue;}
   container.insertAdjacentHTML('beforeend',layerMarkup(p));node=container.lastElementChild;
   if(incoming.has(p.id)&&!reduced()){
    const delay=Math.max(0,incoming.get(p.id)-performance.now());
    const target=p.full?node.querySelector('.sw-layer-image'):node;
    const from=item(p.id).category==='feet'?'inset(100% 0 0 0)':'inset(0 0 100% 0)';
    animate(target,p.full?[{opacity:0,clipPath:from},{opacity:1,clipPath:'inset(0)'}]:[{opacity:0},{opacity:1}],{duration:400,delay,easing:'ease-out',fill:'backwards'});
   }
  }
  for(const id of new Set(desired.map(p=>p.id)))incoming.delete(id);
  // Ступни базы скрываются только при наличии готового слоя обуви, а не запасной PNG.
  const body=desired.find(p=>p.full&&item(p.id).category==='body');
  root.querySelector('.sw-base')?.classList.toggle('shirt-sleeves-hidden',!!body&&!!item(body.id).coverage?.hideShirtSleeves);
  const neck=body?item(body.id).joints?.neck:null,skin=root.querySelector('.sw-neck-skin');
  if(skin){
   const baseImage=root.querySelector('.frog-base'),ready=!!neck&&baseImage.complete&&baseImage.naturalWidth>0;
   skin.toggleAttribute('hidden',!ready);
   if(ready){if(!neckCache.has(neck.extend))neckCache.set(neck.extend,WardrobeJoints.neck(baseImage,neck.extend));const href=neckCache.get(neck.extend);skin.toggleAttribute('hidden',!href);if(href)skin.querySelector('image').setAttribute('href',href);}
   else if(neck&&!baseImage.complete&&!neckPending.has(baseImage)){neckPending.add(baseImage);baseImage.addEventListener('load',()=>root?.isConnected&&updateLayers(),{once:true,signal:controller.signal});}
   root.querySelector('.sw-base')?.classList.toggle('shirt-collar-hidden',ready&&!!neckCache.get(neck.extend));
  }
  const base=root.querySelector('.frog-base'),shoe=desired.find(p=>p.full&&item(p.id).category==='feet');
  if(base){
   base.classList.toggle('feet-hidden',!!shoe);
   const edge=shoe?item(shoe.id).coverage?.baseFeet:null;
   base.style.setProperty('--sw-base-feet-opaque',(edge?.opaque??77.5)+'%');
   base.style.setProperty('--sw-base-feet-hidden',(edge?.hidden??77.5)+'%');
  }
  updateCalibration();bindFallbacks();
 }

 function refresh(){const panel=root.querySelector('.sw-selection'),focus=document.activeElement?.dataset.swItem,scroll=panel.querySelector('.sw-grid')?.scrollTop||0;panel.innerHTML=selection();root.querySelector('.sw-grid').scrollTop=scroll;root.querySelector('[data-sw-worn]').innerHTML=badges();const label=root.querySelector('[data-sw-progress]');if(label){label.textContent=text('complete',{n:correct(),total:job.required.length});root.querySelector('progress').value=correct();}updateLayers();if(focus)root.querySelector(`[data-sw-item="${focus}"]`)?.focus({preventScroll:true});}
 // Начало и конец полёта считаются в экранных координатах с учётом зеркального поворота.
 function motionBox(el){const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};}

 function flying(from,to,content,reject=false,delay=0,reverse=false){
  if(reduced()||!from||!to)return;
  const a=motionBox(from),b=motionBox(to),clone=document.createElement('span');clone.innerHTML=content;clone.setAttribute('aria-hidden','true');clone.className='sw-flying';clone.style.cssText=`left:${a.x}px;top:${a.y}px;width:${a.w}px;height:${a.h}px`;root.append(clone);
  const dx=b.x+b.w/2-a.x-a.w/2,dy=b.y+b.h/2-a.y-a.h/2,s=b.w/a.w;
  const end=`translate(${dx}px,${dy}px) scale(${s})`,arc=`translate(${dx*.5}px,${dy*.5-70}px) scale(${(1+s)/2})`;
  const frames=reject?[{transform:'none',opacity:1},{transform:end,opacity:1,offset:.6},{transform:'none',opacity:0}]:[{transform:'none',opacity:1},{transform:arc,opacity:1,offset:.5},{transform:end,opacity:reverse?1:0}];
  const aMotion=animate(clone,frames,{duration:reject?650:500,delay,easing:'cubic-bezier(.25,.5,.3,1)',fill:'both'});aMotion?.finished.catch(()=>{}).finally(()=>clone.remove());
 }

 function bodyTargets(id){
  const box=root.querySelector('.sw-doll').getBoundingClientRect();
  return d.scene.flightPoints[item(id).category].map(p=>{const x=box.left+box.width*(flipped?100-p.x:p.x)/100,y=box.top+box.height*p.y/100,size=Math.max(20,box.width*.13);return {getBoundingClientRect:()=>({x:x-size/2,y:y-size/2,width:size,height:size})};});
 }

 function fly(id,source,back=false,reject=false,delay=0){
  if(reduced())return;
  const targets=bodyTargets(id),content=art(item(id));
  if(back){const card=root.querySelector(`[data-sw-item="${id}"]`);if(card)targets.forEach(target=>flying(target,card,content,false,0,true));return;}
  targets.forEach(target=>flying(source,target,content,reject,delay));
 }

 function bounce(){const glow=root.querySelector('.sw-foot-shadow');animate(glow,[{opacity:1,transform:'scale(1)'},{opacity:.4,transform:'scale(1.2)'},{opacity:1,transform:'scale(1)'}],{duration:500});animate(root.querySelector('.sw-frog-bounce'),[{transform:'translateY(0) scale(1)'},{transform:'translateY(-16px) scale(1.03,.97)'},{transform:'translateY(0) scale(.98,1.02)'},{transform:'none'}],{duration:500});const spark=root.querySelector('.sw-sparkles');if(spark){spark.innerHTML=Array.from({length:6},(_,n)=>`<i style="--spark:${n}">✦</i>`).join('');animate(spark,[{opacity:0,transform:'scale(.5)'},{opacity:1,offset:.35},{opacity:0,transform:'scale(1.35)'}],{duration:750});}}

 function toggle(id,source){
  if(finished)return;const i=item(id);if(!i)return;
  if(selected[i.category]===id){if(category!==i.category){category=i.category;refresh();preloadCategory();}fly(id,source,true);delete selected[i.category];incoming.delete(id);refresh();return;}
  if(job&&!job.required.includes(id)){mistakes++;fly(id,source,false,true);animate(source,[{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:300});say(text(job.id+':'+id)!==job.id+':'+id?text(job.id+':'+id):text('wrong',{name:local(d.categories.find(c=>c.id===i.category).name)}));return;}
  const rect=source?.getBoundingClientRect(),from=rect?{getBoundingClientRect:()=>rect}:source,replacing=!!selected[i.category],delay=replacing?200:0;
  selected[i.category]=id;incoming.set(id,performance.now()+delay);loadLayer(id);refresh();fly(id,from||source,false,false,delay);later(bounce,delay+400);
  if(job){const praise=text('praise').split('|');say(praise[Math.floor(Math.random()*praise.length)]);if(correct()===job.required.length)later(()=>{if(!finished&&correct()===job.required.length)finish();},650);}
 }

 function updateCalibration(){const box=root?.querySelector('[data-sw-calibration]');if(!box)return;const p=pieces().find(p=>!p.full&&p.key===calibrationKey);box.textContent=p?`${local(item(p.id).name)} · ${p.part}: x ${p.x.toFixed(1)} · y ${p.y.toFixed(1)} · w ${p.w.toFixed(1)} · rotate ${p.rotate.toFixed(1)}°`:text('calibrationSelect');}

 async function copyCalibration(){const json=JSON.stringify({fallbackAdjustments:calibrationValues},null,2);console.info('Safety wardrobe fallback calibration',json);const field=root.querySelector('.sw-calibration-json');field.value=json;try{await navigator.clipboard.writeText(json);say(text('copied'));}catch{field.hidden=false;field.focus();field.select();say(text('copyFallback'));}}

 function calibratePointer(e){if(!calibrating())return;const node=e.target.closest('.sw-fallback-layer');if(!node)return;e.preventDefault();calibrationKey=node.dataset.swKey;const p=pieces().find(p=>!p.full&&p.key===calibrationKey),r=root.querySelector('.sw-doll').getBoundingClientRect();if(!p)return;calibrationDrag={x:e.clientX,y:e.clientY,rect:r,initial:{...p},pointer:e.pointerId};calibrationValues[p.key]??={x:p.x,y:p.y,w:p.w,rotate:p.rotate};node.setPointerCapture(e.pointerId);root.querySelectorAll('.sw-fallback-layer').forEach(el=>el.classList.toggle('sw-calibration-selected',el===node));updateCalibration();}

 function moveCalibration(e){if(!calibrationDrag||e.pointerId!==calibrationDrag.pointer)return;const t=calibrationDrag,p=calibrationValues[calibrationKey];p.x=t.initial.x+(e.clientX-t.x)/t.rect.width*100*(flipped?-1:1);p.y=t.initial.y+(e.clientY-t.y)/t.rect.height*100;const node=root.querySelector(`[data-sw-key="${calibrationKey}"]`);if(node)node.style.cssText=layerStyle({...pieces().find(p=>p.key===calibrationKey),...p});updateCalibration();}

 function confetti(){if(reduced())return;const canvas=document.createElement('canvas');canvas.className='sw-confetti';canvas.setAttribute('aria-hidden','true');root.append(canvas);const ctx=canvas.getContext('2d');if(!ctx){canvas.remove();return;}canvas.width=root.clientWidth;canvas.height=root.clientHeight;const pieces=Array.from({length:85},()=>({x:Math.random()*canvas.width,y:-Math.random()*canvas.height,v:2+Math.random()*4,a:Math.random()*6,c:['#ffd45a','#72d8ad','#81b7fa','#fba4bd'][Math.floor(Math.random()*4)]}));const start=performance.now();let raf;const paint=now=>{if(!root?.isConnected||!canvas.isConnected||now-start>2600){canvas.remove();return;}ctx.clearRect(0,0,canvas.width,canvas.height);pieces.forEach(p=>{p.y+=p.v;p.x+=Math.sin(p.a+=.04);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;ctx.fillRect(-4,-7,8,14);ctx.restore();});raf=requestAnimationFrame(paint);};raf=requestAnimationFrame(paint);controller.signal.addEventListener('abort',()=>{cancelAnimationFrame(raf);canvas.remove();},{once:true});}
 function reactions(){
  if(reduced())return;
  ['🎉','👏','⭐','🧪','💚'].forEach((symbol,n)=>{
   const reaction=document.createElement('span');reaction.className='sw-reaction';reaction.setAttribute('aria-hidden','true');reaction.textContent=symbol;reaction.style.left=(20+n*9)+'%';root.append(reaction);
   animate(reaction,[{opacity:0,transform:'translateY(30px) scale(.5)'},{opacity:1,transform:'translateY(-30px) scale(1.2)',offset:.3},{opacity:0,transform:'translateY(-160px) scale(.8)'}],{duration:1500,delay:n*100,fill:'both'})?.finished.catch(()=>{}).finally(()=>reaction.remove());
  });
 }
 function result(){const stars=Number(root.dataset.stars)||progress().completed[job.id],gain=root.dataset.reward||'0',master=root.dataset.master==='true';return `${top()}<div class="sw-result">${image('assets/game/scenes/'+job.id+'.jpg',local(job.name),'sw-scene',false)}<div class="sw-scene-fallback" aria-hidden="true">${job.emoji} 🐸</div><div class="sw-result-copy"><h1>${text('ready').split(' ').map((word,n)=>`<span style="--delay:${n*100}ms">${word} </span>`).join('')}</h1><div class="sw-stars" aria-label="${text('stars',{n:stars})}">${[1,2,3].map(n=>`<span style="--delay:${n*250}ms" aria-hidden="true">${n<=stars?'⭐':'☆'}</span>`).join('')}</div><p class="sw-xp" data-sw-xp>${gain==='0'?text('already'):text('reward',{n:gain})}</p>${master?`<h2>${text('master')}</h2><p>${text('bonus')}</p>`:''}<div class="sw-actions">${button('professions',text('another'),'sw-blue')}${button('exit',text('exit'),'sw-green')}</div></div></div>`;}
 function finish(){if(finished)return;if(!job){say(text('free'));confetti();animate(root.querySelector('.sw-frog-turn'),[{rotate:'0deg'},{rotate:'360deg'}],{duration:750});root.querySelector('[data-sw=professions]').classList.add('sw-highlight');return;}
  if(correct()<job.required.length){const missing=item(job.required.find(id=>!worn().includes(id)));say(text('missing',{name:local(d.categories.find(c=>c.id===missing.category).name)}));return;}
  speechVersion++;finished=true;const stars=mistakes+hints===0?3:mistakes+hints<=2?2:1;root.dataset.stars=stars;progress().completed[job.id]=Math.max(stars,progress().completed[job.id]||0);const gain=CourseGame.wardrobeAward(job.id);let master=false;if(count()===13&&!progress().master){progress().master=true;master=CourseGame.wardrobeAward('master');}saveState();root.dataset.reward=gain?'20':'0';root.dataset.master=String(master);const header=document.querySelector('.header-xp');if(header)header.outerHTML=CourseGame.header();say(text('great'));bounce();confetti();reactions();const banner=document.createElement('div');banner.className='sw-super';banner.textContent=text('great');root.append(banner);animate(root.querySelector('.sw-frog-turn'),[{rotate:'0deg'},{rotate:'360deg'}],{duration:1000});later(()=>{root.classList.add('sw-depart');later(()=>{root.classList.remove('sw-depart');screen='result';draw('[data-sw=professions]');if(master)confetti();const xp=root.querySelector('[data-sw-xp]');if(gain&&!reduced()){let n=0;const tick=()=>{xp.textContent=text('reward',{n:++n});if(n<20)later(tick,30);};tick();}},600);},1500);
 }
 function closeDialog(){const dialog=root.querySelector('dialog');if(!dialog)return;dialog.close();dialog.remove();dialogOpener?.focus({preventScroll:true});}
 function modal(content,focusSelector='button'){closeDialog();dialogOpener=document.activeElement;const dialog=document.createElement('dialog');dialog.className='sw-dialog';dialog.innerHTML=button('close-dialog','×','sw-round sw-dialog-close',`aria-label="${text('close')}"`)+`<div class="sw-dialog-body">${content}</div>`;root.append(dialog);dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();},{signal:controller.signal});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}},{signal:controller.signal});dialog.showModal();dialog.querySelector(focusSelector)?.focus();}
 function professions(){
  const groups=[...new Set(d.professions.map(p=>local(p.group)))];
  modal(`<header class="sw-profession-heading"><h2>${text('chooseProfession')}</h2><p>${text('professionProgress',{n:count()})}</p><progress max="13" value="${count()}" aria-label="${text('professionProgress',{n:count()})}"></progress></header><div class="sw-professions">${d.professions.map((p,n)=>{
   const completed=!!progress().completed[p.id],group=local(p.group).toLocaleLowerCase(),label=group.charAt(0).toLocaleUpperCase()+group.slice(1),index=groups.indexOf(local(p.group));
   return `<button type="button" data-sw="job" data-job="${p.id}" data-group="${index}" class="sw-profession ${completed?'sw-profession-completed':''}" aria-pressed="${job?.id===p.id}" aria-label="${esc(local(p.name)+(completed?'. '+text('professionCompleted'):''))}"><span class="sw-profession-top"><span class="sw-profession-number">${n+1}</span><span class="sw-profession-icon" aria-hidden="true">${p.emoji}</span></span>${completed?`<span class="sw-profession-check" aria-label="${text('professionCompleted')}">✓</span>`:''}<strong title="${esc(local(p.name))}">${local(p.name)}</strong><small>${local(p.description)}</small><span class="sw-profession-group">${label}</span></button>`;
  }).join('')}</div>`);
 }
 function choose(id){if(job&&!finished){modal(`<h2>${text('change')}</h2><div class="sw-actions">${button('confirm-job',text('yes'),'sw-green',`data-job="${id}"`)}${button('professions',text('cancel'),'sw-blue')}</div>`);return;}begin(id);}
 function begin(id){
  const old=root.querySelector('.sw-layers'),oldBox=old?.getBoundingClientRect(),frame=root.getBoundingClientRect(),oldMarkup=old?.innerHTML,oldFlipped=flipped;
  timers.forEach(clearTimeout);timers.clear();animations.forEach(a=>a.cancel());speechVersion++;root.classList.remove('sw-depart');closeDialog();job=profession(id);selected={};incoming.clear();mistakes=hints=0;finished=false;category='head';screen='wardrobe';
  const preload=new Image();preload.src='assets/game/scenes/'+job.id+'.jpg';job.required.forEach(loadLayer);draw('[data-sw-category="head"]');say(local(job.greeting),true);
  // Прежний комплект растворяется отдельно от нового задания и не перехватывает клики.
  if(oldMarkup&&!reduced()){
   const ghost=document.createElement('div');ghost.className='sw-clear-ghost';ghost.innerHTML=oldMarkup;ghost.setAttribute('aria-hidden','true');ghost.style.cssText=`left:${oldBox.left-frame.left}px;top:${oldBox.top-frame.top}px;width:${oldBox.width}px;height:${oldBox.height}px;transform:scaleX(${oldFlipped?-1:1})`;root.append(ghost);
   animate(ghost,[{opacity:1},{opacity:0}],{duration:200})?.finished.catch(()=>{}).finally(()=>ghost.remove());
  }
 }
 function changeCategory(id,focus=false){category=id;const grid=root.querySelector('.sw-grid');if(grid)grid.scrollTop=0;refresh();preloadCategory();if(focus)root.querySelector(`[data-sw-category="${id}"]`)?.focus({preventScroll:true});}

 function exit(){location.hash='#home';}
 function mount(){dispose();root=document.querySelector('[data-safety-wardrobe]');if(!root)return;controller=new AbortController();screen='start';category='head';job=null;selected={};finished=false;flipped=false;calibrationKey=null;showFrames=false;calibrationValues=structuredClone(d.scene.fallbackAdjustments||{});incoming.clear();for(const [id,entry] of layerCache)if(entry.status==='missing')layerCache.delete(id);for(const path of [d.scene.base,d.scene.background,'assets/game/items/'+d.items[0].id+'.png']){const preload=new Image();preload.src=assetURL(path);}draw();resizeObserver=new ResizeObserver(layout);resizeObserver.observe(root);root.addEventListener('click',event=>{if(calibrating()&&event.target.closest('.sw-fallback-layer'))return;const layer=event.target.closest('.sw-fallback-layer');if(layer){toggle(layer.dataset.swLayer,layer);return;}if(event.target.closest('.sw-doll')){hitLayer(event);return;}const cat=event.target.closest('[data-sw-category]'),card=event.target.closest('[data-sw-item]'),badge=event.target.closest('[data-sw-remove]'),b=event.target.closest('[data-sw]');if(cat&&!finished){changeCategory(cat.dataset.swCategory,true);return;}if(card){toggle(card.dataset.swItem,card);return;}if(badge){toggle(badge.dataset.swRemove,badge);return;}if(!b)return;switch(b.dataset.sw){case 'play':screen='wardrobe';category='head';job=null;selected={};finished=false;draw('[data-sw-category="head"]');break;case 'exit':exit();break;case 'professions':professions();break;case 'job':choose(b.dataset.job);break;case 'confirm-job':begin(b.dataset.job);break;case 'close-dialog':closeDialog();break;case 'help':modal(`<h2>${text('instructions')}</h2><p>${text('help')}</p>`);break;case 'left':case 'right':flipped=b.dataset.sw==='left';root.querySelector('.sw-frog-turn').style.transform=`scaleX(${flipped?-1:1})`;break;case 'reset':if(!finished){selected={};incoming.clear();refresh();}break;case 'hint':if(!finished){const missing=job.required.find(id=>!worn().includes(id));if(missing){hints++;category=item(missing).category;refresh();preloadCategory();const target=root.querySelector(`[data-sw-item="${missing}"]`);target.classList.add('sw-highlight');target.focus({preventScroll:true});}}break;case 'show-frames':showFrames=!showFrames;root.classList.toggle('sw-debug-frames',showFrames);b.setAttribute('aria-pressed',String(showFrames));b.textContent=text(showFrames?'hideFrames':'showFrames');break;case 'copy-calibration':copyCalibration();break;case 'done':finish();break;}},{signal:controller.signal});document.addEventListener('keydown',e=>{if(e.defaultPrevented)return;if(calibrating()&&calibrationKey&&['[',']'].includes(e.key)){e.preventDefault();const p=pieces().find(p=>!p.full&&p.key===calibrationKey);if(p){calibrationValues[p.key]??={x:p.x,y:p.y,w:p.w,rotate:p.rotate};calibrationValues[p.key].rotate+=e.key===']'?2:-2;updateLayers();}return;}if(e.key==='Escape'){if(root.querySelector('dialog[open]'))return;e.preventDefault();exit();return;}if(screen!=='wardrobe'||finished||root.querySelector('dialog[open]')||e.ctrlKey||e.metaKey||e.altKey||/input|textarea|select/i.test(e.target.tagName))return;const key=e.key.toLowerCase();if(key==='q'||key==='e'||(e.target.matches('[role=tab]')&&['arrowleft','arrowright'].includes(key))){e.preventDefault();const delta=key==='q'||key==='arrowleft'?-1:1,index=d.categories.findIndex(c=>c.id===category);changeCategory(d.categories[(index+delta+6)%6].id,true);}},{signal:controller.signal});root.addEventListener('pointerdown',calibratePointer,{signal:controller.signal});root.addEventListener('pointermove',e=>{moveCalibration(e);if(calibrating()||calibrationDrag||root.dataset.layout==='stacked'||reduced()||matchMedia('(max-width:899px),(hover:none)').matches)return;const rect=root.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;cancelAnimationFrame(parallaxRAF);parallaxRAF=requestAnimationFrame(()=>{root?.style.setProperty('--sw-parallax-x',x*16+'px');root?.style.setProperty('--sw-parallax-y',y*12+'px');});},{signal:controller.signal});root.addEventListener('pointerup',()=>calibrationDrag=null,{signal:controller.signal});root.addEventListener('pointercancel',()=>calibrationDrag=null,{signal:controller.signal});root.addEventListener('pointerleave',()=>{root?.style.setProperty('--sw-parallax-x','0px');root?.style.setProperty('--sw-parallax-y','0px');},{signal:controller.signal});root.addEventListener('wheel',e=>{if(!calibrating()||!calibrationKey||!e.target.closest('.sw-fallback-layer'))return;e.preventDefault();const p=pieces().find(p=>!p.full&&p.key===calibrationKey);if(!p)return;calibrationValues[p.key]??={x:p.x,y:p.y,w:p.w,rotate:p.rotate};calibrationValues[p.key].w=Math.max(5,Math.min(180,calibrationValues[p.key].w+(e.deltaY<0?2:-2)));updateLayers();},{signal:controller.signal,passive:false});}
 function dispose(){resizeObserver?.disconnect();cancelAnimationFrame(parallaxRAF);calibrationDrag=null;controller?.abort();timers.forEach(clearTimeout);timers.clear();animations.forEach(a=>a.cancel());animations.clear();root?.querySelector('dialog')?.close();root=null;}
 return {text,blank,sanitize,view,mount,dispose};
})();
