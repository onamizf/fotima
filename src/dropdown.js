/* Общий Dropdown. Скрытый select остаётся адаптером прежних форм и обработчиков:
   пользователь работает только с овальной кнопкой и нашим listbox, нативный popup не открывается. */
window.Dropdown=(()=>{
 const controls=new Set(),bySelect=new WeakMap();let current=null,serial=0,observer;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches||document.body.classList.contains('reduce-motion');
 const mobile=()=>matchMedia('(max-width:767px)').matches;
 const labels={ru:{close:'Закрыть список',choose:'Выберите вариант'},'uz-Latn':{close:'Ro‘yxatni yopish',choose:'Variantni tanlang'},'uz-Cyrl':{close:'Рўйхатни ёпиш',choose:'Вариантни танланг'},en:{close:'Close list',choose:'Choose an option'}};
 const u=()=>labels[document.documentElement.lang]||labels.ru;
 function purpose(select){if(select.getAttribute('aria-label'))return select.getAttribute('aria-label');return [...select.labels||[]].map(label=>{const copy=label.cloneNode(true);copy.querySelectorAll('select,.dropdown').forEach(n=>n.remove());return copy.textContent.trim();}).filter(Boolean).join(' · ')||select.title||u().choose;}
 function visible(el){return !!el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden'&&!el.closest('[hidden],[inert]');}
 function options(c){return [...c.list.querySelectorAll('[role=option]:not([disabled])')];}
 function hide(c){c.animation?.cancel();c.animation=null;try{if(c.panel.matches(':popover-open'))c.panel.hidePopover();}catch{}c.panel.hidden=true;c.panel.inert=false;}
 function close(restore=false,animate=true){const c=current;if(!c)return;current=null;c.button.setAttribute('aria-expanded','false');c.overlay?.remove();c.overlay=null;document.body.classList.remove('dropdown-sheet-open');c.panel.inert=true;
  if(restore&&c.button.isConnected)c.button.focus({preventScroll:true});
  if(animate&&!reduced()&&c.panel.isConnected){c.animation?.cancel();c.animation=c.panel.animate([{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(-6px) scale(.96)'}],{duration:180,easing:'ease-in',fill:'both'});c.animation.finished.then(()=>hide(c)).catch(()=>{});}else hide(c);
 }
 function position(c){if(!c.button.isConnected){close(false,false);return;}if(mobile()){c.panel.style.cssText='';c.panel.dataset.direction='sheet';return;}const r=c.button.getBoundingClientRect(),h=Math.min(c.panel.scrollHeight,360,innerHeight-24),width=Math.min(r.width,innerWidth-24),below=innerHeight-r.bottom-20,above=r.top-20,up=below<h&&above>below,room=Math.max(80,up?above:below),height=Math.min(h,room),left=Math.max(12,Math.min(r.left,innerWidth-width-12));c.panel.dataset.direction=up?'up':'down';c.panel.style.width=width+'px';c.panel.style.left=left+'px';c.panel.style.maxHeight=Math.min(room,360)+'px';c.panel.style.top=Math.max(12,up?r.top-height-8:r.bottom+8)+'px';}
 function refresh(c){const s=c.select,selected=s.selectedOptions[0],text=selected?.textContent||u().choose,short=selected?.dataset.short||text;
  c.button.querySelector('.dropdown-value').textContent=text;c.button.querySelector('.dropdown-short').textContent=short;c.button.disabled=s.disabled||!s.options.length;c.button.setAttribute('aria-required',String(s.required));
  for(const attr of ['aria-invalid','aria-describedby']){if(s.hasAttribute(attr))c.button.setAttribute(attr,s.getAttribute(attr));else c.button.removeAttribute(attr);}
  c.button.title=text;c.title.textContent=c.purpose;c.closeButton.setAttribute('aria-label',u().close);
  c.list.innerHTML=[...s.options].map((o,i)=>`<button type="button" role="option" tabindex="-1" data-dropdown-index="${i}" aria-selected="${o.selected}" ${o.disabled||o.parentElement.disabled?'disabled aria-disabled="true"':''} ${o.hidden?'hidden':''} title="${esc(o.textContent)}"><span>${esc(o.textContent)}</span><span class="dropdown-check" aria-hidden="true">${Icon('check',20)}</span></button>`).join('');
 }
 function focusSelected(c){(c.list.querySelector('[aria-selected=true]:not([disabled]):not([hidden])')||options(c)[0])?.focus({preventScroll:true});}
 function open(c){if(current===c){close(true);return;}close(false,false);if(c.button.disabled)return;
  if(typeof StudentHeader!=='undefined')StudentHeader.close();window.dispatchEvent(new Event('student-header-open'));refresh(c);hide(c);current=c;c.panel.hidden=false;c.panel.inert=false;c.button.setAttribute('aria-expanded','true');
  const overlay=document.createElement('div');overlay.className='dropdown-backdrop';overlay.setAttribute('aria-hidden','true');overlay.setAttribute('popover','manual');c.wrapper.append(overlay);c.overlay=overlay;
  overlay.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();close(false);});overlay.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();});
  try{overlay.showPopover?.();c.panel.showPopover?.();}catch{}position(c);document.body.classList.toggle('dropdown-sheet-open',mobile());
  if(!reduced()){c.animation=c.panel.animate([{opacity:0,transform:'translateY(-6px) scale(.96)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:180,easing:'ease-out'});c.animation.finished.catch(()=>{});}
  focusSelected(c);
 }
 function choose(c,index){const option=c.select.options[index];if(!option||option.disabled||option.parentElement.disabled)return;const changed=c.select.selectedIndex!==index;c.select.selectedIndex=index;close(true);refresh(c);
  // События точно такие же, как у прежнего поля; сохранение и проверка ответов остаются в модели.
  if(changed){c.select.dispatchEvent(new Event('input',{bubbles:true}));c.select.dispatchEvent(new Event('change',{bubbles:true}));}
 }
 function enhance(select){if(bySelect.has(select)||select.multiple||select.size>1)return;const id=select.id||'dropdown-source-'+(++serial);select.id=id;const label=purpose(select),wrapper=document.createElement('span');wrapper.className='dropdown';wrapper.dataset.source=id;select.before(wrapper);wrapper.append(select);
  const button=document.createElement('button');button.type='button';button.className='dropdown-trigger';button.id=select.dataset.dropdownButtonId||id+'-trigger';button.setAttribute('role','combobox');button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label',label);button.innerHTML=`<span class="dropdown-value"></span><span class="dropdown-short"></span><span class="dropdown-chevron" aria-hidden="true">${Icon('chevron-down',20)}</span>`;
  const listId=select.dataset.dropdownListId||id+'-listbox',panel=document.createElement('div');panel.id=listId+'-popover';panel.className='dropdown-panel'+(id==='language'?' header-panel':'');panel.setAttribute('popover','manual');panel.hidden=true;
  panel.innerHTML=`<div class="dropdown-mobile-heading"><span class="dropdown-handle" aria-hidden="true"></span><strong></strong><button type="button" class="dropdown-close">${Icon('x',20)}</button></div><div id="${esc(listId)}" class="dropdown-options" role="listbox" aria-label="${esc(label)}" tabindex="-1"></div>`;button.setAttribute('aria-controls',listId);wrapper.append(button,panel);
  const c={select,wrapper,button,panel,list:panel.querySelector('.dropdown-options'),title:panel.querySelector('strong'),closeButton:panel.querySelector('.dropdown-close'),purpose:label,animation:null,overlay:null,prefix:'',typed:0};bySelect.set(select,c);controls.add(c);
  select.classList.add('dropdown-native');select.setAttribute('aria-hidden','true');select.tabIndex=-1;select.addEventListener('focus',()=>button.focus());select.addEventListener('click',e=>e.preventDefault());select.addEventListener('change',()=>{if(select.isConnected)refresh(c);});
  button.addEventListener('click',e=>{e.preventDefault();open(c);});panel.addEventListener('click',e=>{e.preventDefault();const item=e.target.closest('[data-dropdown-index]');if(item)choose(c,Number(item.dataset.dropdownIndex));});c.closeButton.addEventListener('click',()=>close(true));refresh(c);
 }
 function mount(root=document){if(root.matches?.('select'))enhance(root);root.querySelectorAll?.('select').forEach(enhance);for(const c of controls)if(!c.select.isConnected){if(current===c)close(false,false);hide(c);c.wrapper.remove();controls.delete(c);}}
 function keyboard(event){const c=current||[...controls].find(c=>c.button===event.target);if(!c)return;const inPanel=c.panel.contains(event.target),atButton=event.target===c.button;if(!inPanel&&!atButton)return;
  if(event.key==='Escape'&&current===c){event.preventDefault();event.stopImmediatePropagation();close(true);return;}
  if(event.key==='Tab'&&current===c){const fields=[...document.querySelectorAll('a[href],button,input,textarea,[tabindex]')].filter(el=>el.tabIndex>=0&&visible(el)&&!el.closest('.dropdown-panel')&&!el.disabled),index=fields.indexOf(c.button),next=fields[index+(event.shiftKey?-1:1)];close(false);if(next){event.preventDefault();next.focus();}return;}
  if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();event.stopPropagation();if(!current){open(c);return;}const list=options(c).filter(el=>!el.hidden),i=list.indexOf(document.activeElement),n=event.key==='Home'?0:event.key==='End'?list.length-1:event.key==='ArrowUp'?(i<=0?list.length-1:i-1):(i+1)%list.length;list[n]?.focus({preventScroll:true});list[n]?.scrollIntoView({block:'nearest'});return;}
  if(['Enter',' '].includes(event.key)){event.preventDefault();event.stopPropagation();if(atButton)open(c);else{const item=event.target.closest('[data-dropdown-index]');if(item)choose(c,Number(item.dataset.dropdownIndex));}return;}
  if(event.key.length===1&&!event.ctrlKey&&!event.metaKey){event.preventDefault();if(!current)open(c);const now=performance.now();c.prefix=(now-c.typed>700?'':c.prefix)+event.key.toLocaleLowerCase();c.typed=now;options(c).find(el=>el.textContent.trim().toLocaleLowerCase().startsWith(c.prefix))?.focus();}
 }
 document.addEventListener('keydown',keyboard,true);document.addEventListener('pointerdown',event=>{if(current&&!current.panel.contains(event.target)&&!current.button.contains(event.target))close(false);},true);
 window.addEventListener('resize',()=>{if(current){position(current);document.body.classList.toggle('dropdown-sheet-open',mobile());}});window.addEventListener('scroll',()=>{if(current&&!mobile())position(current);},true);
 window.addEventListener('hashchange',()=>close(false,false));window.addEventListener('student-header-open',()=>close(false,false));window.addEventListener('student-sidebar-open',()=>close(false,false));
 observer=new MutationObserver(records=>{for(const r of records){if(r.type==='childList')for(const node of r.addedNodes)if(node.nodeType===1&&!node.closest?.('.dropdown-panel'))mount(node);const source=r.target.closest?.('select');if(source&&bySelect.has(source))refresh(bySelect.get(source));}for(const c of controls)if(!c.select.isConnected){if(current===c)close(false,false);hide(c);controls.delete(c);}});
 observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','required','selected','value','aria-invalid','aria-describedby']});
 return {mount,close,refresh:()=>{for(const c of controls)refresh(c);}};
})();
