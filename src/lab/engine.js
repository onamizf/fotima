// Pure equipment-work model. Rendering and translations never determine success.
const labItems=['beaker','rack','tube','rod','funnel'];
const labTargets={beaker:'bench',rack:'bench',tube:'rack',rod:'tools',funnel:'bench'};
function emptyBench(){return {protection:{rules:false,goggles:false,coat:false},ready:false,placed:[],answers:{},cleaned:false};}
function benchPrepared(model){return model.ready&&['beaker','rack','tube','rod'].every(item=>model.placed.includes(item));}
function benchExplained(model){return model.answers.support==='rack'&&model.answers.purpose==='stir';}
function benchComplete(model){return benchPrepared(model)&&benchExplained(model)&&model.cleaned;}
function applyBench(model,event){
 const next=JSON.parse(JSON.stringify(model));
 const reject=key=>({ok:false,model,message:key});
 if(!event||typeof event!=='object')return reject('labInvalid');
 if(model.cleaned)return reject('labFinished');
 switch(event.type){
  case 'protect':
   if(model.ready||!['rules','goggles','coat'].includes(event.item)||typeof event.on!=='boolean')return reject('labInvalid');
   next.protection[event.item]=event.on;break;
  case 'ready':
   if(model.ready)return reject('labAlready');
   if(!Object.values(model.protection).every(Boolean))return reject('labNeedProtection');
   next.ready=true;break;
  case 'place':
   if(!model.ready)return reject('labNeedProtection');
   if(!labItems.includes(event.item))return reject('labChoose');
   if(model.placed.includes(event.item))return reject('labAlready');
   if(event.item==='tube'&&!model.placed.includes('rack'))return reject('labNeedRack');
   if(event.target!==labTargets[event.item])return reject(event.item==='tube'?'labNeedRack':event.item==='rod'?'labNeedRodZone':'labWrongZone');
   next.placed.push(event.item);next.answers={};break;
  case 'return':
   if(!model.placed.includes(event.item))return reject('labNotPlaced');
   if(event.item==='rack'&&model.placed.includes('tube'))return reject('labRackOccupied');
   next.placed=next.placed.filter(item=>item!==event.item);next.answers={};break;
  case 'answer':
   if(!benchPrepared(model))return reject('labPrepareFirst');
   if(!Object.hasOwn({support:['rack','edge','rod'],purpose:['stir','measure','filter']},event.question))return reject('labInvalid');
   if(!({support:['rack','edge','rod'],purpose:['stir','measure','filter']}[event.question].includes(event.value)))return reject('labInvalid');
   next.answers[event.question]=event.value;break;
  case 'clean':
   if(!benchPrepared(model))return reject('labPrepareFirst');
   if(!benchExplained(model))return reject('labExplainFirst');
   next.cleaned=true;break;
  default:return reject('labInvalid');
 }
 return {ok:true,model:next,message:event.type==='answer'?(benchExplained(next)?'labAnswersCorrect':'labAnswerChecked'):'labActionDone'};
}
function replayBench(actions){let model=emptyBench();if(!Array.isArray(actions))return {model,actions:[]};const accepted=[];for(const event of actions.slice(0,300)){const result=applyBench(model,event);if(result.ok){model=result.model;accepted.push(event);}}return {model,actions:accepted};}
function cleanEquipmentSave(value){const replay=replayBench(value?.version===1?value.actions:[]);return {version:1,actions:replay.actions,selected:labItems.includes(value?.selected)?value.selected:null,choices:Object.fromEntries(Object.entries(value?.choices||{}).filter(([key,val])=>({support:['rack','edge','rod'],purpose:['stir','measure','filter']}[key]||[]).includes(val)))};}
function currentBench(){return replayBench(state.equipment.actions).model;}
function equipmentPassed(){return !!state.equipmentRecord&&benchComplete(replayBench(state.equipmentRecord.actions).model);}
function benchHint(model){if(!model.ready)return 'labNeedProtection';if(!model.placed.includes('beaker'))return 'labHintBeaker';if(!model.placed.includes('rack'))return 'labHintRack';if(!model.placed.includes('tube'))return 'labNeedRack';if(!model.placed.includes('rod'))return 'labHintRod';if(!benchExplained(model))return 'labExplainFirst';return 'labHintClean';}
let benchMessage=null;
function dispatchBench(event){if(state.equipment.actions.length>=300){benchMessage={key:'labHistoryLimit',ok:false};return {ok:false};}const result=applyBench(currentBench(),event);benchMessage={key:result.message,ok:result.ok};if(result.ok){state.equipment.actions.push(event);if(benchComplete(result.model))state.equipmentRecord={version:1,actions:state.equipment.actions.slice()};saveState();}return result;}
