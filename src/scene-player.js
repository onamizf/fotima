/* Image scene player. Percentage coordinates stay in the original camera plane. */
const ScenePlayer=(()=>{
 const esc=s=>escapeHTML(String(s)),shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 function markup(){return '<div class="scene-player" data-scene-player></div>';}
 function mount(root,scenario,{language='ru',completed=false,reduced=false,sound=false,onComplete=()=>{},onNext=()=>{},onSound=()=>{}}={}){
  const t=scenario.copy[language]||scenario.copy.ru,controller=new AbortController(),{signal}=controller;
  let disposed=false,loaded=false,failed=false,time=completed?12:0,playing=false,stage=-1,question=completed?3:0,mistakes=0,feedback='',feedbackGood=false,frameId,last=0,audio,muted=!sound,successAt=0,selected=new Set(),animations=[];
  const media=matchMedia('(prefers-reduced-motion: reduce)'),motionOff=()=>reduced||media.matches;
  const riskOrder=shuffle(t.risks.map((_,i)=>i)),actionOrder=shuffle(t.actions.map((_,i)=>i));
  root.innerHTML=`<header class="sp-heading"><p>${esc(t.heading)}</p><nav aria-label="${esc(t.situation)}">${['A','B','D','E'].map((v,i)=>`<span ${i===0?'aria-current="step"':''}>${v}</span>`).join('')}</nav></header><div class="sp-layout"><div class="sp-left"><div class="sp-scene" tabindex="0" aria-label="${esc(t.title)}"><div class="sp-camera">${scenario.frames.map((src,i)=>`<img src="${src}" alt="${esc(t.alts[i])}" width="1376" height="768" style="opacity:0">`).join('')}<canvas aria-hidden="true"></canvas><div class="sp-hint" aria-hidden="true"></div><button type="button" class="sp-hotspot" aria-label="${esc(t.hotspot)}" hidden></button></div><div class="sp-dimmer"></div><span class="sp-badge" hidden></span><div class="sp-helper" hidden><img src="assets/frog.png" alt="" width="110" height="132"><p></p></div><p class="sp-subtitle" aria-live="polite"></p><div class="sp-loader" role="status">${esc(t.loading)}</div></div><div class="sp-controls"><button type="button" data-sp="play" aria-label="${esc(t.play)}">▶</button><button type="button" data-sp="restart">↺ ${esc(t.restart)}</button><nav class="sp-timeline" aria-label="${esc(t.timeline)}">${scenario.stages.map((_,i)=>`<button type="button" data-stage="${i}" aria-label="${esc(t.subtitles[i])}" ${i===4&&!completed?'disabled':''}>${i+1}</button>`).join('')}</nav><button type="button" data-sp="sound" aria-label="${esc(t.sound)}" aria-pressed="${!muted}">${muted?'🔇':'🔊'}</button><button type="button" data-sp="skip">${esc(t.skip)}</button></div></div><aside class="sp-panel" aria-live="polite"></aside></div>`;
  const $=selector=>root.querySelector(selector),scene=$('.sp-scene'),camera=$('.sp-camera'),images=[...camera.querySelectorAll('img')],canvas=$('canvas'),ctx=canvas.getContext('2d'),panel=$('.sp-panel'),hotspot=$('.sp-hotspot'),hint=$('.sp-hint'),loader=$('.sp-loader');
  for(const [el,z] of [[hotspot,scenario.zones.hotspot],[hint,scenario.zones.braid]])Object.assign(el.style,{left:z.x+'%',top:z.y+'%',width:z.w+'%',height:z.h+'%'});
  function resize(){const box=camera.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,3);canvas.width=Math.round(camera.clientWidth*ratio);canvas.height=Math.round(camera.clientHeight*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);}
  const observer=new ResizeObserver(resize);observer.observe(camera);
  function tone(kind){if(muted)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const now=audio.currentTime,gain=audio.createGain();gain.connect(audio.destination);gain.gain.setValueAtTime(.035,now);gain.gain.exponentialRampToValueAtTime(.001,now+(kind==='steam'?1:.25));if(kind==='steam'||kind==='splash'){const buffer=audio.createBuffer(1,audio.sampleRate*.7,audio.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.4;const source=audio.createBufferSource(),filter=audio.createBiquadFilter();source.buffer=buffer;filter.type='lowpass';filter.frequency.value=kind==='steam'?2000:400;source.connect(filter);filter.connect(gain);source.start();}else{const osc=audio.createOscillator();osc.frequency.value=kind==='wrong'?180:880;osc.connect(gain);osc.start();osc.stop(now+.25);}}catch{}}
  function helper(text){$('.sp-helper').hidden=false;$('.sp-helper p').textContent=text;}
  function setPlaying(value){playing=value&&loaded&&!failed&&time<9;last=performance.now();const b=$('[data-sp="play"]');b.textContent=playing?'⏸':'▶';b.setAttribute('aria-label',playing?t.pause:t.play);b.setAttribute('aria-pressed',String(playing));}
  function list(values){return '<ul>'+values.map(v=>'<li>'+esc(v)+'</li>').join('')+'</ul>';}
  function renderPanel(){
   let html=`<p class="sp-overline">${esc(t.situation)}</p><h2>${esc(t.title)}</h2>`;
   if(time<9)html+=`<p>${esc(t.subtitles[Math.min(stage,2)])}</p><small>${esc(t.watch)}</small>`;
   else if(question===0)html+=`<h3>${esc(t.q1)}</h3><p>${esc(mistakes?t.hint:t.watch)}</p>`;
   else if(question===1)html+=`<h3>${esc(t.q2)}</h3><div class="sp-answers">${riskOrder.map(i=>`<button type="button" data-risk="${i}">${esc(t.risks[i])}</button>`).join('')}</div>`;
   else if(question===2)html+=`<h3>${esc(t.q3)}</h3><p>${esc(t.multiHint)}</p><fieldset><legend class="visually-hidden">${esc(t.q3)}</legend>${actionOrder.map(i=>`<label><input type="checkbox" data-safe-action="${i}" ${selected.has(i)?'checked':''}>${esc(t.actions[i])}</label>`).join('')}</fieldset><button type="button" data-sp="check">${esc(t.check)}</button>`;
   else html+=`<div class="sp-explanation"><section><h3>${esc(t.whatTitle)}</h3><p>${esc(t.what)}</p></section><section><h3>${esc(t.whyTitle)}</h3>${list(t.why)}</section><section class="sp-bad"><h3>${esc(t.badTitle)}</h3>${list(t.bad)}</section><section class="sp-good"><h3>${esc(t.goodTitle)}</h3>${list(t.good)}</section><section><h3>${esc(t.helpTitle)}</h3><p>${esc(t.help)}</p></section></div><div class="sp-result-actions"><button type="button" data-sp="restart">${esc(t.replay)}</button><button type="button" class="sp-primary" data-sp="next">${esc(t.next)}</button></div>`;
   if(feedback)html+=`<p class="sp-feedback ${feedbackGood?'is-good':''}" role="status">${esc(feedback)}</p>`;
   panel.innerHTML=html;
   if(question===3&&!motionOff())panel.querySelectorAll('.sp-explanation section').forEach((el,i)=>{const a=el.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,delay:i*120,fill:'both'});animations.push(a);});
  }
  function applyStage(force=false){const next=question===3&&time>=9?4:time>=9?3:time>=5.5?2:time>=3?1:0;if(stage===next&&!force)return;stage=next;const data=scenario.stages[stage];images.forEach((img,i)=>img.style.opacity=i===data.frame?'1':'0');scene.dataset.stage=stage;$('.sp-subtitle').textContent=t.subtitles[stage];hotspot.hidden=stage!==3||question!==0;hint.classList.toggle('is-found',question>0);hint.classList.toggle('is-assisted',mistakes>=2);$('.sp-dimmer').style.opacity=stage===3?'.3':'0';const badge=$('.sp-badge');badge.hidden=stage<2||stage===3;badge.textContent=stage===4?t.safe:t.danger;
   $('.sp-helper').hidden=stage<2;if(stage===2||stage===3)helper(question>0?t.correct:mistakes?t.hint:t.stop);if(stage===4)helper(t.praise);
   root.querySelectorAll('button[data-stage]').forEach((b,i)=>{b.setAttribute('aria-current',i===stage?'step':'false');b.disabled=i===4&&question!==3;});
   if(stage===1||stage===2)tone(data.effect);if(stage===2&&!motionOff())animations.push(scene.animate([{transform:'translateX(0)'},{transform:'translateX(-3px)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}],{duration:400,iterations:1}));
   if(stage===3)setPlaying(false);renderPanel();
  }
  function seek(index){if(!loaded||index===4&&question!==3)return;feedback='';time=scenario.stages[index].at;setPlaying(false);applyStage(true);}
  function restart(){if(!loaded)return;question=0;mistakes=0;selected.clear();feedback='';hotspot.classList.remove('is-found');time=0;stage=-1;successAt=0;applyStage();setPlaying(true);}
  function finish(){question=3;time=12;setPlaying(false);feedback=t.correct;feedbackGood=true;successAt=performance.now();tone('correct');onComplete();applyStage(true);}
  function correctSpot(){if(stage!==3||question!==0)return;question=1;hotspot.classList.add('is-found');feedback=t.correct;feedbackGood=true;tone('correct');applyStage(true);}
  function wrongSpot(event){if(stage!==3||question!==0||event.target.closest('.sp-hotspot'))return;mistakes++;feedback=t.hint;feedbackGood=false;helper(t.hint);hint.classList.toggle('is-found',question>0);hint.classList.toggle('is-assisted',mistakes>=2);const rect=scene.getBoundingClientRect(),cross=document.createElement('span');cross.className='sp-cross';cross.textContent='×';cross.style.left=(event.clientX-rect.left)+'px';cross.style.top=(event.clientY-rect.top)+'px';scene.append(cross);if(!motionOff())animations.push(cross.animate([{opacity:1},{opacity:0}],{duration:900}));setTimeout(()=>cross.remove(),950);tone('wrong');renderPanel();}
  hotspot.addEventListener('click',correctSpot,{signal});scene.addEventListener('click',wrongSpot,{signal});
  root.addEventListener('change',event=>{if(event.target.matches('[data-safe-action]')){const id=Number(event.target.dataset.safeAction);event.target.checked?selected.add(id):selected.delete(id);}},{signal});
  root.addEventListener('click',event=>{
   const risk=event.target.closest('[data-risk]');if(risk&&question===1){const id=Number(risk.dataset.risk);feedbackGood=scenario.questions.risk.correct.includes(id);feedback=feedbackGood?t.correct:t.riskFeedback[id];tone(feedbackGood?'correct':'wrong');if(feedbackGood)question=2;renderPanel();return;}
   const step=event.target.closest('button[data-stage]');if(step){seek(Number(step.dataset.stage));return;}
   const command=event.target.closest('[data-sp]')?.dataset.sp;
   if(command==='play')setPlaying(!playing);if(command==='restart')restart();if(command==='skip')seek(3);if(command==='next')onNext();
   if(command==='sound'){muted=!muted;const b=$('[data-sp="sound"]');b.textContent=muted?'🔇':'🔊';b.setAttribute('aria-pressed',String(!muted));onSound(!muted);if(muted)audio?.suspend();else tone('correct');}
   if(command==='retry'){images.forEach((img,i)=>img.src=scenario.frames[i]+'?retry='+Date.now());preload();}
   if(command==='check'&&question===2){const correct=scenario.questions.actions.correct;if(selected.size===correct.length&&correct.every(i=>selected.has(i)))finish();else{feedbackGood=false;const wrong=[...selected].find(i=>!correct.includes(i));feedback=wrong===undefined?t.multiHint:t.actionFeedback[wrong];tone('wrong');renderPanel();}}
  },{signal});
  root.addEventListener('keydown',event=>{if(event.target.closest('input,textarea,select')||event.altKey||event.metaKey||event.ctrlKey)return;if(event.code==='Space'&&!event.target.closest('button')){event.preventDefault();setPlaying(!playing);}if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();seek(Math.max(0,Math.min(question===3?4:3,stage+(event.key==='ArrowRight'?1:-1))));}},{signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){setPlaying(false);audio?.suspend();}},{signal});
  media.addEventListener('change',()=>{animations.forEach(a=>a.cancel());camera.style.transform='none';},{signal});
  function draw(now){if(disposed)return;frameId=requestAnimationFrame(draw);const dt=Math.min(.1,(now-last)/1000);last=now;if(playing){time=Math.min(9,time+dt);applyStage();}
   const off=motionOff();let zoom=1;if(!off){zoom=stage===0?1+.06*Math.min(time/3,1):stage===1?1.06+.29*Math.min((time-3)/2.5,1):stage===2?1.35:1;}
   camera.style.transformOrigin='41% 65%';camera.style.transform=`scale(${zoom})`;hint.classList.toggle('is-visible',stage===0&&time>=2||stage===3&&(mistakes>=2||question>0));scene.classList.toggle('sp-reduced',off);
   const w=camera.clientWidth,h=camera.clientHeight;ctx.clearRect(0,0,w,h);if(off||!loaded||document.hidden)return;
   if(stage===1||stage===2){const elapsed=time-scenario.stages[stage].at,z=scenario.zones.beaker,cx=(z.x+z.w/2)/100*w,cy=.63*h;
    for(let i=0;i<(stage===2?40:14);i++){const phase=(elapsed*(stage===2?.45:.85)+i/40)%1,drift=Math.sin(i*12.7)*w*.018;ctx.beginPath();if(stage===1){ctx.fillStyle=`rgba(70,196,239,${1-phase})`;ctx.arc(cx+drift*phase*2,cy-Math.sin(phase*Math.PI)*h*.07,2+Math.sin(i)*1,0,Math.PI*2);}else{ctx.shadowColor='rgba(145,173,151,.4)';ctx.shadowBlur=8;ctx.fillStyle=`rgba(145,173,151,${(1-phase)*.3})`;ctx.arc(cx+drift*phase,cy-phase*h*.25,4+phase*w*.02,0,Math.PI*2);}ctx.fill();ctx.shadowBlur=0;}
    if(stage===1)for(let i=0;i<3;i++){const phase=(elapsed*.8+i/3)%1;ctx.strokeStyle=`rgba(86,208,244,${1-phase})`;ctx.beginPath();ctx.ellipse(cx,cy,phase*w*.025,phase*h*.006,0,0,Math.PI*2);ctx.stroke();}
   }
   if(stage===4&&successAt&&now-successAt<1800){const p=(now-successAt)/1800;for(let i=0;i<45;i++){ctx.fillStyle=['#22c55e','#1f6bff','#fbbf24','#f472b6'][i%4];ctx.fillRect(((i*97)%100)/100*w,(p*h*1.2+(i%7)*15)%h,5,8);}}
  }
  async function preload(){loaded=false;failed=false;loader.hidden=false;loader.textContent=t.loading;scene.setAttribute('aria-busy','true');try{await Promise.all(images.map(img=>img.complete&&img.naturalWidth?Promise.resolve():img.decode()));if(disposed)return;loaded=true;loader.hidden=true;scene.setAttribute('aria-busy','false');resize();applyStage(true);setPlaying(!completed);}catch{if(disposed)return;failed=true;setPlaying(false);loader.innerHTML=`<p>${esc(t.loadError)}</p><button type="button" data-sp="retry">${esc(t.retry)}</button>`;scene.setAttribute('aria-busy','false');}}
  applyStage(true);preload();last=performance.now();frameId=requestAnimationFrame(draw);
  return {setState(){},dispose(){disposed=true;controller.abort();cancelAnimationFrame(frameId);observer.disconnect();animations.forEach(a=>a.cancel());audio?.close();}};
 }
 return {markup,mount};
})();
