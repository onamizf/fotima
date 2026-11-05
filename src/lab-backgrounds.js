/* Only the current lab background is preloaded; other rooms load on demand. */
const LabBackgrounds=(()=>{
 function clear(){document.querySelector('[data-lab-preload]')?.remove();}
 function preload(id){clear();const link=document.createElement('link');link.rel='preload';link.as='image';link.type='image/webp';link.href=SiteRelease.asset('assets/backgrounds/'+id+'-bg.webp');link.dataset.labPreload=id;document.head.append(link);}
 return {clear,preload};
})();
