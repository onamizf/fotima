/* Проверяемые доказательства выполнения отделены от сцен и интерфейса. */
const IntroModel=(()=>{
 const taskIds=IntroData.tasks.map(t=>t.id),mainEquipment=IntroData.equipment.filter(e=>!e.bonus).map(e=>e.id);
 const assembly=IntroData.rules.assembly;
 const labels=IntroData.rules.labels;
 const safeTube=IntroData.rules.safeTube;
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const empty=()=>({version:2,active:'map',work:'safety',task:taskIds[0],rows:{},lesson12:{version:1,rows:{}},lesson11:{version:3,reviews:{}},safetyRetry:[],self:{ratings:[],plan:'',saved:false,proof:null},quiz:{answers:[],order:[],swipes:[],research:{},attempts:[],demoDone:false}});
 function scrub(value,depth=0){if(depth>8)return null;if(typeof value==='string')return value.slice(0,800);if(typeof value==='number')return Number.isFinite(value)?Math.max(-10000,Math.min(10000,value)):0;if(typeof value==='boolean'||value===null)return value;if(Array.isArray(value))return value.slice(0,80).map(v=>scrub(v,depth+1));if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([k])=>!['__proto__','constructor','prototype'].includes(k)).slice(0,80).map(([k,v])=>[k,scrub(v,depth+1)]));return null;}
 function defaults(){return {gas:0,air:0,flame:false,match:false,near:false,phase:0,leak:false,gasDelay:0,light:true,xray:false,exploded:false,run:false,elapsed:0,cooling:0,temp:20,progress:0,flip:false,goggles:false,holder:72,angle:45,direction:'away',heatPoint:15,movement:0,sweep:0,stationary:0,overheat:0,boiled:false,cracked:false};}
 function validTask(id,r){const a=r?.answers||{},e=r?.evidence||{},m=r?.matches||{};
  if(id.startsWith('danger-')&&e.tutorialReview)return typeof SafetyLessonData!=='undefined'&&SafetyLessonData.validReview(e.tutorialReview);
  if(id.startsWith('danger-')&&e.writtenSafety){const p=e.writtenSafety;return typeof SafetyLessonData!=='undefined'&&p.version===1&&p.id===id.slice(7)&&typeof p.risk==='string'&&typeof p.precaution==='string'&&p.risk.length<=800&&p.precaution.length<=800&&SafetyLessonData.analyze(id,p.risk,p.precaution).accepted;}
  if(id==='danger-a'&&e.sceneA&&!(e.sceneHotspot===true&&e.sceneRisk===0&&equal(e.sceneActions,[0,1])))return false;
  if(id==='danger-b'&&e.sceneB&&!(Array.isArray(e.sceneHotspots)&&equal([...e.sceneHotspots].sort(),['goggles','tube'])&&e.sceneRisk===0&&equal(e.sceneActions,[0,1,2,3])))return false;
  if(id==='danger-c'&&e.sceneC&&!(equal(e.sceneHotspots,['vapour'])&&e.sceneRisk===0&&equal(e.sceneOrder,[0,1,2,3])&&equal(e.sceneActions,[0,1])))return false;
  if(id==='danger-d'&&e.sceneD&&!(equal(e.sceneHotspots,['face-near-beaker'])&&e.sceneRisk===0&&equal(e.sceneActions,[0,1,2,3])))return false;
  if(id.startsWith('danger-')){const d=IntroData.dangers.find(d=>d.id===id);return a.danger===d.correctDanger&&a.precaution===d.correctAction;}
  if(id==='museum'&&e.equipmentSheet)return typeof Practical12Data!=='undefined'&&Practical12Data.proofValid(e.equipmentSheet);
  if(id==='museum')return mainEquipment.every(id=>Array.isArray(r.visited)&&r.visited.includes(id)&&a[id]===id)&&['neck','body','bottom'].every(id=>m[id]===id);
  if(id==='assembly'&&e.setupExploded)return typeof Setup12Data!=='undefined'&&Setup12Data.proofValid(e.setupExploded);
  if(id==='assembly')return equal(r.order,assembly)&&e.warmed===true;
  if(id==='evap-labels')return Object.entries(labels).every(([k,v])=>m[k]===v)&&e.crystals===true;
  if(id==='burner-parts')return IntroData.parts.every(p=>m[p.id]===p.id)&&IntroData.functions.every(p=>m['f-'+p.id]===p.id);
  if(id==='ignition')return equal(e.sequence,[1,2,3,4,5]);
  if(id==='flames')return ['yellow','blue','low','high','light'].every(k=>e[k]===true)&&Object.entries(IntroData.rules.flameAnswers).every(([key,value])=>a[key]===value);
  if(id==='race')return e.raced===true&&e.flipped===true&&Math.abs(Number(a.yellowTime)-IntroData.rules.race.yellowTime)<=IntroData.rules.race.tolerance&&Math.abs(Number(a.blueTime)-IntroData.rules.race.blueTime)<=IntroData.rules.race.tolerance&&a.variable===IntroData.rules.race.variable&&equal([...(Array.isArray(a.controlled)?a.controlled:[])].sort(),[...IntroData.rules.race.controlled].sort())&&a.conclusion===IntroData.rules.race.conclusion;
  if(id==='tube')return safeTube.every(k=>Array.isArray(e.safeTube)&&e.safeTube.includes(k));return false;
 }
 function selfComplete(){const s=state.intro?.self;return !!s&&(s.proof?selfValid(s.proof):s.saved&&selfValid(s));}
 function selfValid(value){return Array.isArray(value.ratings)&&value.ratings.length===5&&value.ratings.every(v=>['yes','unsure','no'].includes(v))&&(value.ratings.every(v=>v==='yes')||typeof value.plan==='string'&&value.plan.trim().length>0);}
 function score(attempt){let correct=IntroData.quiz.reduce((n,q,i)=>n+Number(attempt.answers?.[i]===q.correct),0);correct+=Number(equal(attempt.order,[0,1,2,3,4,5]));correct+=IntroData.swipes.reduce((n,q,i)=>n+Number(attempt.swipes?.[i]===q.answer),0);for(const [key,value] of Object.entries(IntroData.rules.research))correct+=Number(attempt.research?.[key]===value);return {correct,total:14,percent:Math.floor(correct/14*100)};}
 function sanitize(value){const out=empty();value=SafetySituations.migrateIntro(value);if(value?.version!==2)return out;const input=scrub(value);if(['map','brief','task','self','quiz','safety-summary'].includes(input.active))out.active=input.active;if(IntroData.works.some(w=>w.id===input.work))out.work=input.work;if(taskIds.includes(input.task))out.task=input.task;out.safetyRetry=Array.isArray(input.safetyRetry)?[...new Set(input.safetyRetry.filter(id=>SafetySituations.ids.includes(id)))]:[];
  for(const id of taskIds){const r=input.rows?.[id];if(!r||typeof r!=='object'||Array.isArray(r))continue;const row={answers:r.answers&&typeof r.answers==='object'?r.answers:{},matches:r.matches&&typeof r.matches==='object'?r.matches:{},evidence:r.evidence&&typeof r.evidence==='object'?r.evidence:{},visited:Array.isArray(r.visited)?r.visited.filter(x=>mainEquipment.includes(x)):[],order:Array.isArray(r.order)?r.order.filter(x=>assembly.includes(x)):[],checked:r.checked===true,sim:{...defaults(),...(r.sim&&typeof r.sim==='object'?r.sim:{})}};row.sim.gas=0;row.sim.flame=false;row.sim.run=false;row.sim.match=false;row.sim.near=false;row.sim.gasDelay=0;if(id==='ignition'&&row.sim.phase!==5){row.sim.phase=0;row.evidence.sequence=[];}row.proof=r.proof&&typeof r.proof==='object'?r.proof:null;for(const record of [row,row.proof].filter(Boolean)){if(id==='museum'&&record.evidence?.equipmentSheet?.version===1&&typeof Practical12Data!=='undefined'&&Practical12Data.proofValid(record.evidence.equipmentSheet))record.evidence.equipmentSheet={version:2,studied:Practical12Data.items.map(i=>i.id)};if(id==='assembly'&&typeof Setup12Data!=='undefined'&&Setup12Data.proofValid(record.evidence?.setupExploded))record.evidence.setupExploded={version:2,exploded:true,visited:[...new Set(record.evidence.setupExploded.visited.filter(x=>Setup12Data.ids.includes(x)))]};}row.checked=row.checked&&validTask(id,row.proof||row);out.rows[id]=row;}
  if(input.self){out.self={ratings:Array.isArray(input.self.ratings)?input.self.ratings.slice(0,5).map(v=>['yes','unsure','no'].includes(v)?v:null):[],plan:typeof input.self.plan==='string'?input.self.plan.slice(0,600):'',saved:input.self.saved===true};out.self.saved=out.self.saved&&selfValid(out.self);out.self.proof=input.self.proof&&selfValid(input.self.proof)?input.self.proof:out.self.saved?{ratings:[...out.self.ratings],plan:out.self.plan}:null;}
  const q=input.quiz;if(q&&typeof q==='object'){out.quiz={answers:Array.isArray(q.answers)?q.answers.slice(0,4):[],order:Array.isArray(q.order)?q.order.slice(0,6):[],swipes:Array.isArray(q.swipes)?q.swipes.slice(0,5):[],research:q.research&&typeof q.research==='object'?q.research:{},demoDone:q.demoDone===true,attempts:Array.isArray(q.attempts)?q.attempts.filter(a=>a&&a.demoDone===true).slice(-50):[]};}
  if(typeof SafetyLessonData!=='undefined')out.lesson11=SafetyLessonData.sanitize(value.lesson11);
  if(typeof Practical12Data!=='undefined')out.lesson12=Practical12Data.sanitize(value.lesson12);
  return out;
 }
 const data=()=>state.intro??=(empty());
 function row(id=data().task){return data().rows[id]??={answers:{},matches:{},evidence:{},visited:[],order:[],checked:false,sim:defaults()};}
 const sim=()=>row().sim;
 function done(id){const r=state.intro?.rows?.[id];return !!r?.checked&&validTask(id,r.proof||r);}
 function unlockedTask(id){const i=taskIds.indexOf(id);return i>=0&&taskIds.slice(0,i).every(done);}
 function safetyComplete(){return SafetySituations.ids.every(done);}
 function safetySummary(){const counts={'danger-a':1,'danger-b':2,'danger-c':1,'danger-d':1};let found=0,attempts=0,correct=0,legacy=0;const errors=[];
  for(const id of SafetySituations.ids){if(!done(id))continue;const r=row(id),e=(r.proof||r).evidence||{},s=e.sceneStats,base=counts[id]+2,valid=s&&Number.isFinite(s.attempts)&&Number.isFinite(s.correct)&&Number.isFinite(s.found)&&s.attempts>=base&&s.correct>=0&&s.correct<=s.attempts;
   const a=valid?Math.min(10000,Math.floor(s.attempts)):base,c=valid?Math.min(a,Math.floor(s.correct)):base;attempts+=a;correct+=c;found+=valid?Math.max(0,Math.min(counts[id],Math.floor(s.found))):counts[id];if(!valid)legacy++;if(c<a)errors.push(id);
  }
  return {complete:safetyComplete(),found,total:5,attempts,correct,accuracy:attempts?Math.round(correct/attempts*100):0,errors,legacy};
 }
 function openSafetySummary(){if(!safetyComplete())return false;pause();const d=data();d.active='safety-summary';d.work='safety';return true;}

 function workDone(id){return IntroData.tasks.filter(t=>t.work===id).every(t=>done(t.id));}
 function stepOpen(index){return IntroData.works.slice(0,Math.min(index,3)).every(w=>workDone(w.id))&&(index<4||selfComplete());}
 function check(id=data().task){const r=row(id);if(!unlockedTask(id)||!validTask(id,r))return false;r.checked=true;r.proof=JSON.parse(JSON.stringify({answers:r.answers,matches:r.matches,evidence:r.evidence,visited:r.visited,order:r.order}));return true;}
 function bestPercent(){return Math.max(0,...(state.intro?.quiz.attempts||[]).map(a=>score(a).percent));}
 function passed(){return taskIds.every(done)&&selfComplete()&&bestPercent()>=IntroData.rules.passPercent;}
 function progress(){return {value:taskIds.filter(done).length+Number(selfComplete())+Number(passed()),max:taskIds.length+2};}
 function openTask(id){if(!unlockedTask(id))return false;pause();const d=data(),task=IntroData.tasks.find(t=>t.id===id);d.active='task';d.task=id;d.work=task.work;row(id);return true;}
 function recordAnswer(key,value){row().answers[key]=value;}
 function match(source,target){const d=data(),r=row(),id=d.task;let right=false;if(id==='museum')right=source===target&&['neck','body','bottom'].includes(source);if(id==='evap-labels')right=labels[target]===source;if(id==='burner-parts')right=source===target.replace(/^f-/,'');if(right)r.matches[target]=source;return right;}
 function assemble(id){const r=row();if(assembly[r.order.length]!==id)return false;r.order.push(id);return true;}
 function visit(id){if(mainEquipment.includes(id)&&!row().visited.includes(id))row().visited.push(id);sim().selected=id;}
 function pausedSim(s){s.run=false;s.gas=0;s.flame=false;s.match=false;s.near=false;s.gasDelay=0;}
 function pause(){let changed=false;for(const [id,r] of Object.entries(state.intro?.rows||{})){changed=changed||r.sim.run||r.sim.gas>0||r.sim.flame||r.sim.match;pausedSim(r.sim);if(id==='ignition'&&r.sim.phase!==5){changed=changed||r.sim.phase!==0;r.sim.phase=0;r.evidence.sequence=[];}}return changed;}
 function beginIgnition(){const r=row();r.evidence.sequence=[1];Object.assign(r.sim,defaults(),{phase:1,air:100});}
 function setControl(key,value){const r=row(),s=r.sim,id=data().task;s[key]=value;
  if(id==='ignition'){
   if(key==='air'&&s.phase===1&&value<=5){s.phase=2;r.evidence.sequence=[1,2];}
   if(key==='gas'){
    if(value>0&&s.phase===2&&s.air<=5&&s.match&&s.near){s.flame=true;s.phase=3;s.gasDelay=0;r.evidence.sequence=[1,2,3];}
    else if(value===0){if(s.phase===4){s.phase=5;r.evidence.sequence=[1,2,3,4,5];}else if(s.phase!==5){s.phase=0;r.evidence.sequence=[];}s.flame=false;}
   }
  }
  if(id==='flames'&&s.flame){if(s.air<=20)r.evidence.yellow=true;if(s.air>=70)r.evidence.blue=true;if(s.gas<=30&&s.gas>0)r.evidence.low=true;if(s.gas>=75)r.evidence.high=true;if(s.gas===0)s.flame=false;}
  if(id==='tube'&&s.flame&&key!=='sweep'&&!tubeSafe(s)){s.flame=false;s.gas=0;return 'tubeWarning';}
  return '';
 }
 function tubeSafe(s){return s.goggles&&s.holder>=67&&s.holder<=80&&s.angle>=35&&s.angle<=55&&s.direction==='away'&&s.air>=70;}
 function action(key){const r=row(),s=r.sim,id=data().task;
  if(key==='prepare'){beginIgnition();return '';}
  if(key==='lightMatch'){if(s.phase!==2||s.air>5)return 'sequenceError';s.match=true;return '';}
  if(key==='matchNear'){if(!s.match||s.phase!==2)return 'sequenceError';s.near=true;return '';}
  if(key==='putOutMatch'){if(s.phase!==3)return 'sequenceError';s.match=false;s.phase=4;r.evidence.sequence=[1,2,3,4];return '';}
  if(key==='explode'){s.exploded=!s.exploded;return '';}
  if(key==='light'){s.light=!s.light;r.evidence.light=true;return '';}
  if(key==='xray'){s.xray=!s.xray;return '';}
  if(key==='goggles'){s.goggles=true;return '';}
  if(key==='sweep'){s.sweep=s.sweep>.1?-.22:.22;s.movement++;s.stationary=0;s.overheat=Math.max(0,s.overheat-.25);return '';}
  if(key==='resetTube'){r.sim=defaults();return '';}
  if(key==='flip'){if(!r.evidence.raced||s.cooling>0)return 'cool';s.flip=true;r.evidence.flipped=true;return '';}
  if(key==='stop'){
   if(id==='tube'&&s.boiled&&!s.cracked&&tubeSafe(s)&&s.movement>=3)r.evidence.safeTube=[...safeTube];
   if(id==='ignition')setControl('gas',0);else{s.flame=false;s.gas=0;s.run=false;}return '';
  }
  if(key==='heat'){
   if(id==='assembly'&&r.order.length!==assembly.length)return 'empty';
   if(id==='evap-labels'&&!Object.entries(labels).every(([k,v])=>r.matches[k]===v))return 'empty';
   if(id==='tube'){if(s.cracked)return 'cracked';if(!tubeSafe({...s,air:100}))return 'tubeWarning';s.air=100;s.stationary=0;s.boiled=false;s.elapsed=0;}
   if(id==='race'){s.elapsed=0;s.cooling=0;s.flip=false;r.evidence.raced=false;r.evidence.flipped=false;}
   if(['assembly','evap-labels'].includes(id)){s.elapsed=0;s.progress=0;s.temp=20;}s.gas=50;s.flame=true;s.run=true;if(id==='flames')r.evidence[s.air>=70?'blue':'yellow']=true;return '';
  }
  return '';
 }
 function advance(seconds){const id=data().task,r=row(),s=r.sim;let event='';const dt=Math.min(.25,Math.max(0,seconds));
  if(id==='ignition'&&s.gas>0&&!s.flame){s.gasDelay+=dt;if(s.gasDelay>=3){pausedSim(s);s.leak=true;s.phase=0;r.evidence.sequence=[];event='gasAlarm';}}
  if(s.cooling>0)s.cooling=Math.max(0,s.cooling-dt);
  if(id==='assembly'&&s.run){s.elapsed+=dt;s.temp=20+40*Math.min(1,s.elapsed/6);if(s.elapsed>=6){pausedSim(s);r.evidence.warmed=true;event='correct';}}
  if(id==='evap-labels'&&s.run){s.elapsed+=dt;s.progress=Math.min(1,s.elapsed/10);if(s.elapsed>=10){pausedSim(s);s.cooling=3;event='cool';}}
  if(id==='evap-labels'&&s.progress===1&&s.cooling===0){r.evidence.crystals=true;}
  if(id==='race'&&s.run){s.elapsed+=dt;if(s.elapsed>=20){pausedSim(s);s.elapsed=20;s.cooling=3;r.evidence.raced=true;event='cool';}}
  if(id==='tube'&&s.flame){s.stationary+=dt;if(s.heatPoint>33){s.cracked=true;pausedSim(s);event='cracked';}else if(!tubeSafe(s)){pausedSim(s);event='tubeWarning';}else if(s.stationary>2){s.overheat+=dt/2;if(s.overheat>=1){s.cracked=true;pausedSim(s);event='cracked';}else event='moveWarning';}else{s.elapsed+=dt;if(s.elapsed>=7&&!s.boiled){s.boiled=true;event='stopBoiling';}else if(s.elapsed>=10){pausedSim(s);event='tubeWarning';}}}
  return event;
 }
 function submitQuiz(){const d=data(),q=d.quiz;if(!stepOpen(4)||!q.demoDone||q.answers.length!==4||Array.from({length:4},(_,i)=>q.answers[i]).some((n,i)=>!Number.isInteger(n)||n<0||n>=IntroData.quiz[i].options.length)||q.order.length!==6||q.order.some(n=>!Number.isInteger(n)||n<0||n>5)||new Set(q.order).size!==6||q.swipes.length!==5||q.swipes.some(v=>!['yellow','blue'].includes(v))||Object.keys(q.research).length!==4)return false;const a={answers:[...q.answers],order:[...q.order],swipes:[...q.swipes],research:{...q.research},demoDone:true};q.attempts.push(a);q.attempts=q.attempts.slice(-50);return score(a);}
 return {safetyComplete,safetySummary,openSafetySummary,blank:empty,sanitize,data,row,sim,done,check,validTask,unlockedTask,workDone,stepOpen,bestPercent,passed,progress,openTask,recordAnswer,match,assemble,visit,pause,action,setControl,advance,tubeSafe,submitQuiz,score,selfComplete,assembly,labels,mainEquipment};
})();
