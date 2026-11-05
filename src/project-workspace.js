/* One route owner per practical work; the legacy 1.2 editor has been replaced. */
const ProjectWorkspace=(()=>{
 function view(route){if(route.chapterId==='ch1'&&route.stepId==='1.2')return Lab12Workbook.view(route);return SafetyWorkspace.view(route);}
 function mount(route){if(route.chapterId==='ch1'&&route.stepId==='1.2')return Lab12Workbook.mount();return SafetyWorkspace.mount(route);}
 function dispose(){Lab12Workbook.dispose();SafetyWorkspace.dispose();}
 return {view,mount,dispose};
})();
