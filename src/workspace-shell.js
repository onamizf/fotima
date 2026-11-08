/* Reuse the normal site header; task views occupy only the remaining viewport. */
const WorkspaceShell=(()=>{
 let observer,control,header;
 function dispose(){observer?.disconnect();control?.abort();document.body.classList.remove('workspace-fullscreen');document.documentElement.style.removeProperty('--site-header-height');}
 function mount(){dispose();header=document.querySelector('#app>.topbar');if(!header)return;control=new AbortController();const {signal}=control;
 function layout(){const full=!!document.fullscreenElement;document.body.classList.toggle('workspace-fullscreen',full);document.documentElement.style.setProperty('--site-header-height',full?'0px':Math.ceil(header.getBoundingClientRect().height)+'px');}
 observer=new ResizeObserver(layout);observer.observe(header);
 document.querySelector('.skip')?.addEventListener('click',e=>{e.preventDefault();const task=document.querySelector('.pw-editor,.wb-page,.es-study');if(task){task.tabIndex=-1;task.focus({preventScroll:true});}},{signal});
 const inner=header.querySelector('.topinner'),menu=document.createElement('details');menu.className='workspace-header-menu';menu.innerHTML=`<summary aria-label="${StudentText('language')}">⋯</summary><div class="workspace-header-menu-content"></div>`;inner.append(menu);const slots=[...inner.querySelectorAll('.user-greeting,.header-notice-wrap,.header-language')].map(node=>({node,anchor:node.nextSibling})),mobile=matchMedia('(max-width:767px)');function arrange(){for(const {node,anchor}of slots){if(mobile.matches)menu.lastElementChild.append(node);else inner.insertBefore(node,anchor?.parentNode===inner?anchor:menu);}menu.hidden=!mobile.matches;layout();}mobile.addEventListener('change',arrange,{signal});arrange();
 document.addEventListener('workspace-progress',()=>{const xp=header.querySelector('.header-xp');if(xp)xp.outerHTML=CourseGame.header();},{signal});document.addEventListener('fullscreenchange',layout,{signal});document.addEventListener('webkitfullscreenchange',layout,{signal});layout();
 }
 return {mount,dispose};
})();
