/* The entrypoint meta is the single release source for runtime URLs. */
const SiteRelease=(()=>{
 const version=document.querySelector('meta[name="application-version"]').content;
 const url=new URL(location.href);url.searchParams.set('v',version);history.replaceState(history.state,'',url);
 window.addEventListener('hashchange',event=>{
  if(history.state?.siteRoute===location.hash)return;
  history.replaceState({...history.state,siteRoute:location.hash,sitePrevious:new URL(event.oldURL).hash},'');
 });
 function back(fallback){if(history.state?.sitePrevious&&history.length>1)history.back();else location.hash=fallback;}
 function asset(path){const url=new URL(path,document.baseURI);url.searchParams.set('v',version);return url.pathname+url.search;}
 return {version,asset,back};
})();
