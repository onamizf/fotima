/* Обувь соединяется со штаниной: задний край, ткань и передний край рисуются раздельно. */
const WardrobeFootwear=(()=>{
 function legProfile(image,r,retainAlpha=false){
  const c=document.createElement('canvas');c.width=896;c.height=1200;const ctx=c.getContext('2d',{willReadFrequently:true});if(!ctx)return null;
  ctx.drawImage(image,r.x,r.y,r.width,r.height);const rgba=ctx.getImageData(0,0,896,1200).data;
  const result=[360,536].map((center,n)=>{
   const rows={},a=n?448:240,b=n?656:448;let hem=0;
   for(let y=780;y<1120;y++){
    const runs=[];let start=null;
    for(let x=a;x<=b;x++){
     const solid=x<b&&rgba[(y*896+x)*4+3]>180;
     if(solid&&start===null)start=x;
     if(!solid&&start!==null){if(x-start>=12)runs.push([start,x-1]);start=null;}
    }
    runs.sort((u,v)=>Math.max(u[0]-center,center-u[1],0)-Math.max(v[0]-center,center-v[1],0)||(v[1]-v[0])-(u[1]-u[0]));
    const run=runs[0];if(run&&Math.max(run[0]-center,center-run[1],0)<65){rows[y]=run;if(run[1]-run[0]>=19)hem=y;}
   }
   return {rows,hem,center};
  });
  if(retainAlpha){result.alpha=new Uint8Array(896*1200);for(let n=0;n<result.alpha.length;n++)result.alpha[n]=rgba[n*4+3];}
  return result;
 }
 function connect(legs,image,r,profile){
  if(!legs||legs.some(l=>!l.hem))return null;
  const cuffs=profile.openings.map((source,n)=>{
   const leg=legs[n],row=leg.rows[Math.min(source.y,leg.hem-8)]||leg.rows[leg.hem-8]||[leg.center-42,leg.center+42];
   const width=row[1]-row[0]+1,x=(row[0]+row[1])/2,outer=width/2+8;
   const lower=Object.entries(leg.rows).filter(([y])=>+y>=source.y&&(!profile.bare||source.y>=930||+y<=930)).map(([,r])=>r);
   const region=lower.length?[Math.min(...lower.map(r=>r[0]))-3,Math.max(...lower.map(r=>r[1]))+3]:[row[0]-3,row[1]+3];
   return {pins:[{from:[source.x-source.outer,source.y],to:[x-outer,source.y]},{from:[source.x+source.outer,source.y],to:[x+outer,source.y]}],opening:{x,y:source.y,rx:width/2+1,ry:source.ry,angle:0},hem:leg.hem,region};
  });
  const patches=WardrobeJoints.build(cuffs),raster=WardrobeJoints.rasterize(image,r,patches);if(!raster)return null;
  return {mode:profile.mode,legs:cuffs.map((c,n)=>({...c.opening,hem:c.hem,region:c.region,top:profile.mode==='covered'?c.hem-8:profile.openings[n].y-profile.openings[n].ry-4})),patches,raster};
 }
 const ellipse=o=>Array.from({length:40},(_,n)=>[o.x+o.rx*Math.cos(n/40*Math.PI*2),o.y+o.ry*Math.sin(n/40*Math.PI*2)]);
 const path=points=>points.map((p,n)=>(n?'L':'M')+p.join(' ')).join('')+'Z';
 function regions(c,part){
  return c.legs.map((o,n)=>{const left=n?448:0,right=n?896:448,top=part==='back'?o.top:c.mode==='covered'?o.top:o.y,bottom=part==='back'?o.y:1200;return `M${left} ${top}H${right}V${bottom}H${left}Z`;}).join('');
 }
 function bodyPath(c){
  if(c.mode==='covered')return 'M0 0H896V1200H0Z';
  return 'M0 0H896V1200H0Z'+c.legs.map(o=>path([[o.region[0],o.y],...Array.from({length:21},(_,n)=>[o.x+o.rx*Math.cos(Math.PI-n/20*Math.PI),o.y+o.ry*Math.sin(Math.PI-n/20*Math.PI)]),[o.region[1],o.y],[o.region[1],1200],[o.region[0],1200]])).join('');
 }
 function bodyContains(c,x,y){return c.mode!=='tucked'||c.legs.every(o=>!(x>=o.region[0]&&x<=o.region[1]&&y>o.y)||WardrobeJoints.inOpening(o,x,y));}
 function visible(c,part,x,y){
  const o=c.legs[x<448?0:1];
  const inBand=part==='back'?y>=o.top&&y<o.y:y>=(c.mode==='covered'?o.top:o.y);
  return inBand&&!c.legs.some(o=>WardrobeJoints.inOpening(o,x,y));
 }
 function graphic(c,part,prefix){
  if(part==='back'&&c.mode!=='tucked')return '';
  return `<defs><clipPath id="${prefix}-region"><path d="${regions(c,part)}"></path></clipPath><clipPath id="${prefix}-mouth"><path clip-rule="evenodd" d="M0 0H896V1200H0Z${c.legs.map(o=>path(ellipse(o))).join('')}"></path></clipPath></defs><g data-sw-boot-${part}="${c.footId}" clip-path="url(#${prefix}-region)"><g clip-path="url(#${prefix}-mouth)"><image href="${c.raster}" width="896" height="1200"></image></g></g>`;
 }
 return {legProfile,connect,bodyPath,bodyContains,visible,graphic};
})();
