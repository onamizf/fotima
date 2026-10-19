// A constrained qualitative learning model. No numerical measurements are inferred.
const investigationOrder=['inspect','water','add','stir'];
const investigationFields=['state','color','solubility'];
const explanationOptions=['remainsSolution','separatePhase','mixedLiquids','sameSubstance','partiallyDissolved','newSubstance','vanished'];
function expectedExplanation(id){return {soluble:'remainsSolution',insoluble:'separatePhase',miscible:'mixedLiquids',sameWater:'sameSubstance',slightly:'partiallyDissolved'}[sampleCards[sampleIds.indexOf(id)][3]];}
function blankInvestigation(){return {version:1,records:{}};}
function blankObservation(){return {actions:[],answers:{},checked:false};}
function sanitiseInvestigation(value){
 const clean=blankInvestigation();if(value?.version!==1)return clean;
 for(const id of sampleIds){const raw=value.records?.[id];if(!raw)continue;const row=blankObservation();
  if(Array.isArray(raw.actions))for(const step of raw.actions.slice(0,5)){
   const next=investigationOrder.find(key=>!row.actions.includes(key));
   if(step===next||(step==='reference'&&row.actions.includes('inspect')&&!row.actions.includes(step)))row.actions.push(step);else break;
  }
  for(const field of tableFields.filter(f=>investigationFields.includes(f.id))){const answer=tableValue(field,raw.answers?.[field.id]);if(answer)row.answers[field.id]=answer;}
  if(explanationOptions.includes(raw.answers?.explanation))row.answers.explanation=raw.answers.explanation;
  row.checked=raw.checked===true&&observationReady(row)&&observationCorrect(id,row);clean.records[id]=row;
 }return clean;
}
function observationRecord(id=state.activeSample){return state.investigation.records[id]||(state.investigation.records[id]=blankObservation());}
function observationReady(row){return [...investigationOrder,'reference'].every(key=>row.actions.includes(key));}
function observationCorrect(id,row){const card=sampleCards[sampleIds.indexOf(id)];return row.answers.explanation===expectedExplanation(id)&&['state','color','solubility'].every((field,i)=>row.answers[field]===card[[0,1,3][i]]);}
function observationPassed(id){const row=state.investigation.records[id];return !!row&&row.checked&&observationReady(row)&&observationCorrect(id,row);}
function observationCount(){return sampleIds.filter(observationPassed).length;}
function observationStatus(id,row){const ui=it();if(!row.actions.includes('inspect'))return ui.initial;if(!row.actions.includes('water'))return ui.inspected;if(!row.actions.includes('add'))return ui.waterReady;if(!row.actions.includes('stir'))return ui.added;return ui[{soluble:'dissolved',insoluble:'remains',slightly:'partial',miscible:'mixed',sameWater:'same'}[sampleCards[sampleIds.indexOf(id)][3]]];}
function investigationScene(id,row){
 const card=sampleCards[sampleIds.indexOf(id)],palette={white:'#F6F4E8',colorless:'#C9E1E5',blue:'#4D9ED4',silver:'#BFC7CD',gray:'#707C85',redbrown:'#B56B45',yellow:'#E4CB52',grayblack:'#42404C'},color=palette[card[1]],has=key=>row.actions.includes(key),mixed=has('stir'),solution=has('add')&&mixed,soluble=card[3]==='soluble',residue=has('add')&&(!mixed||['insoluble','slightly'].includes(card[3]));
 const fill=solution&&id==='copper-sulfate'?'#74B8DE':solution&&id==='iodine'?'#DCC69A':'#C4E4EB';
 return `<div class="property-bench"><svg viewBox="0 0 660 390" role="img" aria-label="${escapeHTML(sampleName(id)+'. '+observationStatus(id,row))}"><defs><linearGradient id="benchglass" x2="1" y2="1"><stop stop-color="#FFFFFF" stop-opacity=".85"/><stop offset="1" stop-color="#D9EBED" stop-opacity=".35"/></linearGradient></defs><path d="M0 275H660V390H0Z" fill="#E6E0D1"/><path d="M0 275H660" stroke="#C9D8D5" stroke-width="3"/><ellipse cx="440" cy="328" rx="105" ry="17" fill="#17272B" opacity=".08"/><ellipse cx="148" cy="312" rx="90" ry="19" fill="#FFF" stroke="#8BAEB1" stroke-width="2"/>
 ${card[0]==='liquid'?`<path d="M120 210H176V296Q148 314 120 296Z" fill="url(#benchglass)" stroke="#759CA0" stroke-width="3"/><path d="M125 250H171V291Q148 303 125 291Z" fill="${color}"/>`:`<g fill="${color}" stroke="#657579" stroke-width="1.5">${[0,1,2,3,4].map(i=>`<path d="M${111+i*13} ${294-i%2*7}l8 -11 10 7 -3 13Z"/>`).join('')}</g>`}
 <path d="M355 135H367V310Q367 325 382 325H502Q517 325 517 310V135H530" fill="url(#benchglass)" stroke="#759CA0" stroke-width="4"/>
 ${has('water')?`<path data-bench-water d="M372 226Q440 231 512 226V309Q512 319 499 319H385Q372 319 372 309Z" fill="${fill}" opacity=".85"/>`:''}
 ${residue?`<g data-bench-residue fill="${color}" stroke="#657579" stroke-width="1">${[0,1,2,3,4].map(i=>`<rect x="${388+i*22}" y="${300-i%2*10}" width="12" height="10" rx="2"/>`).join('')}</g>`:''}
 ${solution&&soluble?'<g data-bench-dissolved></g>':''}
 ${has('add')&&card[0]==='liquid'&&!mixed?'<path d="M374 237H510" stroke="#FFF" stroke-width="3" stroke-dasharray="8 6"/>':''}
 <path d="M546 95L480 291" stroke="#759CA0" stroke-width="8" stroke-linecap="round" class="bench-rod"/><path d="M545 95L479 291" stroke="#FFF" stroke-width="2" stroke-linecap="round" class="bench-rod"/>
 <path d="M378 151V213" stroke="#FFF" stroke-width="4" stroke-linecap="round"/>
 </svg><div class="bench-caption">${sampleName(id)} · ${t.conditions}</div></div>`;
}
let investigationFeedback=null;
function investigationView(){const ui=it(),id=state.activeSample,row=observationRecord(id),card=sampleCards[sampleIds.indexOf(id)],has=key=>row.actions.includes(key);
 return `<section class="investigation"><div class="eyebrow">01 · ${t.grade}</div><h1>${ui.title}</h1><p class="editorial-note">${ui.scope}</p><p class="note">${ui.safety}</p><div class="investigation-top"><label class="sample-picker">${t.sampleLabel}<select id="benchSample">${sampleIds.map(key=>`<option value="${key}" ${key===id?'selected':''}>${observationPassed(key)?'✓ ':''}${sampleName(key)}</option>`).join('')}</select></label><p><strong>${ui.count}: ${observationCount()} / 12</strong></p></div><div class="investigation-grid"><div class="workspace">${investigationScene(id,row)}<p class="panel bench-observation" role="status" data-observation>${observationStatus(id,row)}${has('inspect')?`<br><strong>${ui.initialSample}: ${t[card[0]]} · ${t[card[1]]}</strong>`:''}</p><div class="bench-command-grid">${[...investigationOrder,'reference'].map(key=>`<button type="button" data-investigation="${key}" aria-pressed="${has(key)}">${has(key)?'✓ ':''}${ui[key]}</button>`).join('')}</div><div class="row resource-links"><button type="button" data-investigation="undo" ${row.actions.length?'':'disabled'}>${ui.undo}</button><button type="button" data-investigation="reset">${ui.reset}</button><button type="button" data-investigation="hint">${t.hint}</button></div><p class="small">${ui.resetNote}</p>${has('reference')?`<aside class="editorial-note"><strong>${t.odorLabel}: ${t[card[2]]}</strong><p>${t.referenceNote}</p></aside>`:''}${has('stir')?`<p>${ui[card[3]==='sameWater'?'sameExplanation':card[3]==='miscible'?'liquidExplanation':card[3]==='slightly'?'partialExplanation':'solidExplanation']}</p>`:''}${id==='copper-sulfate'?`<p class="small">${t.copperNote}</p>`:''}</div><aside class="panel bench-answers"><h2>${ui.observations}</h2><p>${ui.answerPrompt}</p>${investigationFields.map(fieldId=>{const field=tableFields.find(f=>f.id===fieldId),wrong=investigationFeedback==='wrong'&&row.answers[fieldId]!==card[{state:0,color:1,solubility:3}[fieldId]];return `<label class="property-field" for="observe-${fieldId}">${t[field.label]}<select id="observe-${fieldId}" data-observe="${fieldId}" ${wrong?'aria-invalid="true" aria-describedby="investigationFeedback"':''}><option value="">${t.chooseValue}</option>${field.options.map(option=>`<option value="${option}" ${row.answers[fieldId]===option?'selected':''}>${t[option]}</option>`).join('')}</select></label>`;}).join('')}<label class="property-field" for="observe-explanation">${ui.explanation}<select id="observe-explanation" data-observe="explanation" ${investigationFeedback==='wrong'&&row.answers.explanation!==expectedExplanation(id)?'aria-invalid="true" aria-describedby="investigationFeedback"':''}><option value="">${t.chooseValue}</option>${explanationOptions.map(option=>`<option value="${option}" ${row.answers.explanation===option?'selected':''}>${ui[option]}</option>`).join('')}</select></label><button type="button" class="primary" data-investigation="check">${ui.check}</button><div id="investigationFeedback" role="status" class="bench-feedback ${investigationFeedback==='wrong'||investigationFeedback==='needActions'?'warning':'note'}">${investigationFeedback?escapeHTML(ui[investigationFeedback]||investigationFeedback):observationPassed(id)?ui.correct:''}</div>${observationPassed(id)?`<button type="button" data-investigation="copy">${ui.copy}</button>`:''}<div class="row resource-links">${link(ui.report,'result',topics[0],'button')}${link(t.tableOpen,'table',topics[0],'button')}</div></aside></div><dialog id="observationReset"><p>${ui.resetConfirm}</p><div class="row"><button type="button" data-investigation="cancelReset">${t.cancel}</button><button type="button" data-investigation="confirmReset">${ui.reset}</button></div></dialog><dialog id="observationCopy"><p>${ui.copyConfirm}</p><div class="row"><button type="button" data-investigation="cancelCopy">${t.cancel}</button><button type="button" data-investigation="confirmCopy">${ui.copy}</button></div></dialog></section>`;
}
function observationReport(){const ui=it();return `<section class="panel report-section"><h2>${ui.report}</h2><p><strong>${ui.count}: ${observationCount()} / 12</strong></p>${observationCount()===12?`<p>${ui.allObserved}</p>`:''}<ul class="observation-summary">${sampleIds.map(id=>`<li>${observationPassed(id)?'✓':'○'} ${sampleName(id)}${observationPassed(id)?` — ${investigationFields.map(f=>t[state.investigation.records[id].answers[f]]).join(' · ')+' · '+ui[state.investigation.records[id].answers.explanation]}`:''}</li>`).join('')}</ul><div class="row">${link(ui.start,'lab',topics[0],'button primary')}${link(t.tableOpen,'table',topics[0],'button')}</div></section>`;}
function bindInvestigation(){
 const picker=document.getElementById('benchSample');if(!picker)return;
 picker.onchange=event=>{state.activeSample=event.target.value;investigationFeedback=null;saveState();render(false);document.getElementById('benchSample').focus();};
 document.querySelectorAll('[data-observe]').forEach(input=>input.onchange=()=>{const row=observationRecord();row.answers[input.dataset.observe]=input.value;row.checked=false;investigationFeedback=null;saveState();render(false);document.querySelector(`[data-observe="${input.dataset.observe}"]`).focus();});
 document.querySelectorAll('[data-investigation]').forEach(button=>button.onclick=()=>{
  const command=button.dataset.investigation,row=observationRecord(),ui=it();investigationFeedback=null;
  if(command==='reset'){document.getElementById('observationReset').showModal();return;}
  if(command==='cancelReset'){document.getElementById('observationReset').close();return;}
  if(command==='copy'){if(observationPassed(state.activeSample))document.getElementById('observationCopy').showModal();return;}
  if(command==='cancelCopy'){document.getElementById('observationCopy').close();return;}
  if(command==='confirmReset')state.investigation.records[state.activeSample]=blankObservation();
  else if(command==='confirmCopy'&&observationPassed(state.activeSample)){state.propertyTable[state.activeSample]??={};for(const field of investigationFields)state.propertyTable[state.activeSample][field]=row.answers[field];investigationFeedback='copyDone';}
  else if(command==='undo'){row.actions.pop();row.checked=false;}
  else if(command==='hint')investigationFeedback='hint';
  else if(command==='check'){row.checked=observationReady(row)&&observationCorrect(state.activeSample,row);investigationFeedback=!observationReady(row)?'needActions':row.checked?'correct':'wrong';}
  else if([...investigationOrder,'reference'].includes(command)&&!row.actions.includes(command)){
   const next=investigationOrder.find(key=>!row.actions.includes(key));
   if(command===next||(command==='reference'&&row.actions.includes('inspect')))row.actions.push(command);
   else investigationFeedback=ui.order+' '+ui[command==='reference'?'inspect':next];
  }
  saveState();render(false);
  const target=document.querySelector(`[data-investigation="${command==='confirmCopy'?'copy':command==='confirmReset'?'reset':command}"]`);if(target&&!target.disabled)target.focus();else document.getElementById('benchSample').focus();
  if(command==='stir'&&row.actions.includes('stir'))document.querySelector('.property-bench')?.classList.add('just-stirred');
 });
}
