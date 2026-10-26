const {T,createStage}=await import('./core.js'+new URL(import.meta.url).search);
export function mount(host,options){return createStage(host,options,({k,group})=>{
 const widths=[.22,.36,.65],waters=[];for(let i=0;i<3;i++){const g=new T.Group();g.position.x=(i-1)*1.5;group.add(g);const r=widths[i],height=[1,.6,.2][i];k.lathe(g,[[0,0],[r,0],[r,height],[r-.03,height],[r-.03,.04],[0,.04]],k.glass());const water=k.liquid(g,.14,r-.04,'#3bbdff',.2);waters.push(water);}
 return {update(s){waters.forEach((water,i)=>{water.scale.y=1-(s.progress||0)*[.2,.5,.85][i];water.position.y=.04+.1*water.scale.y;});}};
 });}
