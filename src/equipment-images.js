/* Image presentation only: task state, validation and rewards remain in their native engines. */
const EquipmentImages=(()=>{
 const aliases={flask:'conical-flask',cylinder:'graduated-cylinder','test-tube':'heat-test-tube',tube:'heat-test-tube',burner:'gas-burner',gauze:'wire-gauze',base:'clamp-stand',stand:'clamp-stand',clamp:'clamp-stand','measuring-cylinder':'graduated-cylinder','tube-holder':'test-tube-holder',holder:'test-tube-holder',tongs:'crucible-tongs'};
 const ids=new Set(['heat-test-tube','spirit-lamp','mortar','graduated-cylinder','gas-burner','wire-gauze','beaker','alcohol-bottle','conical-flask','ring-stand','crucible-tongs','test-tube-holder','thermometer','alcohol','water','tripod','clamp-stand']);
 let pending;const sizes=()=>pending??=fetch(SiteRelease.asset('assets/lab/equipment/sizes.json')).then(r=>{if(!r.ok)throw Error('Equipment sizes: '+r.status);return r.json();});
 const id=value=>aliases[value]||value;
 const url=(value,type='objects',fallback='')=>ids.has(id(value))?SiteRelease.asset(`assets/lab/equipment/${type}/${id(value)}.webp`):fallback;
 function dimensions(data,key,k){const s=data[id(key)];return s.widthCm?{w:s.widthCm*k,h:s.widthCm*k*s.px[1]/s.px[0]}:{h:s.heightCm*k,w:s.heightCm*k*s.px[0]/s.px[1]};}
 function roomLayout(room,data,zoom=1){const w=room.clientWidth,h=room.clientHeight,k=Math.min(h*.75/60,w/110)*zoom,table=h*.84;room.classList.add('equipment-image-room');room.style.setProperty('--equipment-table',table+'px');const zones=[...room.querySelectorAll('.equipment-room-zone:not(.is-later)')];zones.forEach((z,i)=>{const key=z.dataset.roomZone,s=data[id(key)],dim=s?dimensions(data,key,k):{w:12*k,h:(key==='funnel'?17:5)*k};Object.assign(z.style,{left:(w*(i+1)/(zones.length+1)-dim.w/2)+'px',top:(table-dim.h)+'px',width:dim.w+'px',height:dim.h+'px'});});}
 async function mount(host,options){const data=await sizes();if(options.signal.aborted)throw Error('Disposed');let progress=0,zoom=1,focused=null,run=null,selected=null,started=!options.manualHeat,temp=20,heatAt=0,disposed=false,frame=0;const points={};
 host.classList.add('equipment-image-scene');const layer=document.createElement('div');layer.className='equipment-image-layer';host.replaceChildren(layer);
 const nodes={};for(const key of ['base','stand','clamp','burner','tripod','gauze','thermometer','tube','beaker']){const img=document.createElement('img');img.src=url(key);img.alt='';img.draggable=false;img.dataset.equipmentObject=key;img.className='equipment-scene-object';layer.append(img);nodes[key]=img;img.addEventListener('click',()=>options.onSelect?.(key),{signal:options.signal});}
 const flame=document.createElement('i');flame.className='equipment-image-flame';layer.append(flame);
 // The supplied stand includes its clamp. Separate its arm so the attachment follows the tube.
 nodes.base.style.clipPath='polygon(0 89%,100% 89%,100% 100%,0 100%)';nodes.stand.style.clipPath='polygon(0 0,100% 0,100% 32%,33% 32%,33% 44%,100% 44%,100% 89%,0 89%,0 44%,26% 44%,26% 32%,0 32%)';nodes.clamp.style.clipPath='polygon(0 32%,100% 32%,100% 44%,0 44%)';
 const ghost=document.createElement('img');ghost.className='equipment-scene-object equipment-image-ghost';ghost.hidden=true;layer.append(ghost);
 function draw(){if(disposed)return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;const k=Math.min(h*.75/60,w/90)*zoom,table=h*.88,cx=w*.57,standDim=dimensions(data,'stand',k),standX=cx+1.3*k-standDim.w*.37;
 host.style.setProperty('--equipment-table',table+'px');
 const tubeBottom=21.5+(run?.pendingTube?(run.tubePercent-30)*.09:0),tubeTop=tubeBottom+15,clampHeight=tubeTop-5;
 const layout={base:{x:standX-standDim.w*.4,y:0,z:1},stand:{x:standX,y:0,z:1},clamp:{x:standX,y:clampHeight-36,z:6},burner:{x:cx,y:0,z:2},tripod:{x:cx,y:0,z:3},gauze:{x:cx,y:20,z:4},beaker:{x:cx,y:20,z:8},tube:{x:cx+1.3*k,y:tubeBottom,z:7},thermometer:{x:cx+1.3*k,y:tubeBottom+1.5,z:5}};
 for(const [index,key] of Object.keys(nodes).entries()){const node=nodes[key],p=layout[key],dim=dimensions(data,key,k);let x=p.x,y=table-p.y*k-dim.h;if(key==='gauze')y=table-20*k-dim.h/2;
 if(progress&&!options.workshop){x=w*(index+1)/9;y=table-dim.h;}
 const visible=focused?(key===focused||focused==='stand'&&key==='base'||focused==='water'&&key==='beaker'||focused==='alcohol'&&key==='tube'):(!options.workshop||run?.actions.includes(key==='base'?'stand':key)||key==='tube'&&run?.pendingTube);
 node.hidden=!visible;node.src=url(key==='beaker'&&(!options.workshop||run?.actions.includes('water'))?'water':key==='tube'&&(!options.workshop||run?.actions.includes('alcohol'))?'alcohol':key);
 Object.assign(node.style,{left:(x-dim.w/2)+'px',top:y+'px',width:dim.w+'px',height:dim.h+'px',zIndex:String(p.z),transform:key==='gauze'?'scaleY(0.4)':'none'});
 points[key]={x:key==='stand'?x-dim.w*.2:key==='clamp'?cx+1.3*k:x,y:key==='gauze'?table-20*k:key==='clamp'?table-clampHeight*k:y+dim.h*.45};
 }
 points.water={...points.beaker};points.alcohol={...points.tube};points['water-bottle']={...points.beaker};points['alcohol-bottle']={...points.tube};points.match={x:cx,y:table-12*k};points.valve={x:cx+2*k,y:table-8*k};
 flame.hidden=!(run?.done&&started);Object.assign(flame.style,{left:(cx-k)+'px',top:(table-19.5*k)+'px',width:2*k+'px',height:7.5*k+'px'});
 options.onAnchors?.(points);const step=Practical12AssemblyData.steps[run?.actions.length||0];options.onTargets?.({target:step?points[step.part]:null,valve:points.valve,match:points.match,temperature:{x:cx+5*k,y:table-45*k},temp});
 host.dataset.pixelsPerCm=k;host.dataset.tableY=table;
 }
 function heat(){started=true;heatAt=performance.now();function tick(now){temp=Math.min(60,20+(now-heatAt)/1000*8);draw();if(temp<60&&!disposed)frame=requestAnimationFrame(tick);}cancelAnimationFrame(frame);frame=requestAnimationFrame(tick);}
 const observer=new ResizeObserver(draw);observer.observe(host);draw();
 const workshop={sync(value){run=value;draw();},select(key){selected=key;ghost.src=url(key,'objects',key==='water-bottle'?'assets/lab/1-2/setup-focus-water.webp':'assets/lab/1-2/setup-focus-burner.webp');},move(x,y,key){const rect=host.getBoundingClientRect(),p=points[key]||points[Practical12AssemblyData.steps[run?.actions.length||0]?.part];if(!p)return {near:false};const near=x>=rect.left&&x<=rect.right&&y>=rect.top&&y<=rect.bottom&&(Math.hypot(x-rect.left-p.x,y-rect.top-p.y)<Math.max(40,rect.width*.16)||['stand','burner','tripod'].includes(key)&&y>rect.top+rect.height*.55);if(selected){const dim=data[id(key)]?dimensions(data,key,+host.dataset.pixelsPerCm):{w:40,h:70};ghost.hidden=false;Object.assign(ghost.style,{left:(x-rect.left-dim.w/2)+'px',top:(y-rect.top-dim.h/2)+'px',width:dim.w+'px',height:dim.h+'px'});}return {near};},clear(){selected=null;ghost.hidden=true;},reject(){this.clear();},snap(){draw();},pour(){return Promise.resolve();},heat,targets:()=>points,dispose};
 function dispose(){if(disposed)return;disposed=true;observer.disconnect();cancelAnimationFrame(frame);layer.remove();host.classList.remove('equipment-image-scene');}
 options.signal.addEventListener('abort',dispose,{once:true});
 return {renderer:'images',workshop,focus(key){focused=key;draw();},showAll(){focused=null;draw();},setProgress(value){progress=value;draw();options.onProgress?.(value,true);},zoom(value){zoom=Math.max(.5,Math.min(2,zoom+value));draw();},rotate(){draw();},reset(){zoom=1;focused=null;draw();},viewState:()=>({percent:Math.round(zoom*100)}),dispose};
 }
 return {id,url,sizes,dimensions,roomLayout,mount};
})();
