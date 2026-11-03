/* Раздельные задняя кромка, рукав/рука и передняя часть перчатки. Исходные текстуры сохраняются. */
const WardrobeGloves=(()=>{
 const W=896,H=1200,A=17*Math.PI/180,C=Math.cos(A),S=Math.sin(A);
 const point=(u,v,n=0)=>{const x=217+u*C-v*S;return [n?W-x:x,734+u*S+v*C];};
 const local=(x,y,n=0)=>{if(n)x=W-x;const dx=x-217,dy=y-734;return [dx*C+dy*S,-dx*S+dy*C];};
 const polygon=ps=>ps.map((p,n)=>(n?'L':'M')+p.join(' ')).join('')+'Z';
 const full='M0 0H896V1200H0Z';
 function profile(image,r,patches=[],bare=false){
  const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)return null;
  ctx.drawImage(image,r.x,r.y,r.width,r.height);const rgba=ctx.getImageData(0,0,W,H).data;
  const alpha=(x,y)=>{if(patches.some(p=>x>=p.bounds[0]&&x<=p.bounds[2]&&y>=p.bounds[1]&&y<=p.bounds[3]))[x,y]=WardrobeJoints.inverse(patches,x,y);x=Math.round(x);y=Math.round(y);return x>=0&&x<W&&y>=0&&y<H?rgba[(y*W+x)*4+3]:0;};
  const arms=[0,1].map(n=>{
   const rows={};let hem=-230;
   for(let v=-230;v<=215;v++){
    const runs=[];let start=null;
    for(let u=-90;u<=96;u++){
     const solid=u<96&&alpha(...point(u,v,n))>180;
     if(solid&&start===null)start=u;
     if(!solid&&start!==null){if(u-start>=5)runs.push([start,u-1]);start=null;}
    }
    runs.sort((a,b)=>Math.max(a[0],-a[1],0)-Math.max(b[0],-b[1],0));
    let row=runs[0];
    // В кисти учитываем отдельные пальцы; одежду на бёдрах не принимаем за рукав.
    if(bare&&v>=0&&runs.length){row=[runs[0][0],runs[0][1]];runs.forEach(r=>{row[0]=Math.min(row[0],r[0]);row[1]=Math.max(row[1],r[1]);});}
    if(row&&(bare&&v>=0||Math.max(row[0],-row[1],0)<35)&& (bare||v<55)){
     rows[v]=row;if(row[1]-row[0]>=11)hem=v;
    }
   }
   return {rows,hem};
  });
  if(bare){arms.alpha=new Uint8Array(W*H);for(let i=0;i<arms.alpha.length;i++)arms.alpha[i]=rgba[i*4+3];}
  return arms;
 }
 function rowAt(arm,v){
  const y=Math.round(v);for(const delta of [0,-1,-2,-3,1,2])if(arm?.rows[y+delta])return arm.rows[y+delta];return null;
 }
 function connect(base,garment,image,r,fit){
  if(!base)return null;
  const source=fit.opening,sv=local(source.x,source.y)[1];
  const cuffs=[0,1].map(n=>{
   let v=sv,arm=garment?.[n],cloth=false;
   // Выбираем ткань выше прежнего отверстия манжеты, а не его узкие боковые остатки.
   if(arm&&arm.hem<v&&v-arm.hem<=36)v=arm.hem-12;
   let row=rowAt(arm,v-3);cloth=!!row;
   if(!row){v=sv;row=rowAt(base[n],v-3)||[-28,28];arm=null;}
   const u=(row[0]+row[1])/2,rx=(row[1]-row[0])/2+2,[x,y]=point(u,v,n),angle=n?-17:17;
   const a=source.angle*Math.PI/180,outer=source.rx+4,target=rx+4;
   const pins=[-1,1].map(sign=>{
    const sx=source.x+sign*outer*Math.cos(a),sy=source.y+sign*outer*Math.sin(a);
    return {from:[n?W-sx:sx,sy],to:point(u+sign*target,v,n)};
   });
   return {pins,opening:{x,y,rx,ry:source.ry,angle},u,v,cloth,arm,base:base[n],rise:fit.backRise||source.ry+5};
  });
  const patches=WardrobeJoints.build(cuffs),raster=WardrobeJoints.rasterize(image,r,patches);if(!raster)return null;
  return {arms:cuffs,patches,raster,baseAlpha:base.alpha};
 }
 function holes(c,kind){
  return c.arms.map((a,n)=>{
   const profile=kind==='base'?a.base:a.arm;if(!profile||kind!=='base'&&!a.cloth)return '';
   const rows=Object.entries(profile.rows).filter(([v])=>+v>=a.v&&+v<=profile.hem+2).map(([v,r])=>[+v,r]).sort((a,b)=>a[0]-b[0]);if(!rows.length)return '';
   const edge=rows.filter((_,i)=>i%2===0||i===rows.length-1),first=edge[0],last=edge[edge.length-1];
   return polygon([point(first[1][0]-3,a.v,n),...edge.map(([v,r])=>point(r[1]+3,v,n)),point(last[1][1]+3,last[0]+4,n),point(last[1][0]-3,last[0]+4,n),...edge.slice().reverse().map(([v,r])=>point(r[0]-3,v,n))]);
  }).join('');
 }
 function openings(c){return c.arms.map(a=>polygon(WardrobeJoints.openingPoints(a.opening))).join('');}
 function clip(c,kind,id,normalized=false){
  const transform=normalized?` transform="scale(${1/W} ${1/H})"`:'';
  return `<clipPath id="${id}"${normalized?' clipPathUnits="objectBoundingBox"':''}><path clip-rule="evenodd"${transform} d="${full+holes(c,kind)}"></path><path${transform} d="${openings(c)}"></path></clipPath>`;
 }
 function contains(c,kind,x,y){
  return c.arms.every((a,n)=>{
   const arm=kind==='base'?a.base:a.arm;if(!arm||kind!=='base'&&!a.cloth)return true;
   const [u,v]=local(x,y,n),row=rowAt(arm,Math.min(v,arm.hem));
   return v<a.v||v>arm.hem+4||!row||u<row[0]-3||u>row[1]+3||WardrobeJoints.inOpening(a.opening,x,y);
  });
 }
 function visible(c,part,x,y){
  const n=x<W/2?0:1,a=c.arms[n],[u,v]=local(x,y,n);
  return u>=-110&&u<=120&&v<240&&(part==='back'?v>=a.v-a.rise&&v<a.v:v>=a.v)&&!c.arms.some(a=>WardrobeJoints.inOpening(a.opening,x,y));
 }
 function graphic(c,part,prefix){
  const regions=c.arms.map((a,n)=>polygon([point(-110,part==='back'?a.v-a.rise:a.v,n),point(120,part==='back'?a.v-a.rise:a.v,n),point(120,part==='back'?a.v:240,n),point(-110,part==='back'?a.v:240,n)])).join('');
  return `<defs><clipPath id="${prefix}-region"><path d="${regions}"></path></clipPath><clipPath id="${prefix}-mouth"><path clip-rule="evenodd" d="${full+openings(c)}"></path></clipPath></defs><g data-sw-glove-${part}="${c.handId}" clip-path="url(#${prefix}-region)"><g clip-path="url(#${prefix}-mouth)"><image href="${c.raster}" width="896" height="1200"></image></g></g>`;
 }
 return {profile,connect,clip,contains,visible,graphic,point,local};
})();
