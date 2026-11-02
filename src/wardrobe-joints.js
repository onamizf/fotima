/* Локальная посадка манжет: непрерывная деформация прежней текстуры без перерисовки модели. */
const WardrobeJoints=(()=>{
 const kernel=t=>t>=1?0:(1-t)**4*(4*t+1);
 function affine(s,t){
  const [p,q,r]=s,[u,v,w]=t,det=(q[0]-p[0])*(r[1]-p[1])-(r[0]-p[0])*(q[1]-p[1]);
  if(Math.abs(det)<1e-8)throw Error('Degenerate wardrobe triangle');
  const a=((v[0]-u[0])*(r[1]-p[1])-(w[0]-u[0])*(q[1]-p[1]))/det;
  const c=((w[0]-u[0])*(q[0]-p[0])-(v[0]-u[0])*(r[0]-p[0]))/det;
  const b=((v[1]-u[1])*(r[1]-p[1])-(w[1]-u[1])*(q[1]-p[1]))/det;
  const d=((w[1]-u[1])*(q[0]-p[0])-(v[1]-u[1])*(r[0]-p[0]))/det;
  return [a,b,c,d,u[0]-a*p[0]-c*p[1],u[1]-b*p[0]-d*p[1]];
 }
 const apply=(m,x,y)=>[m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]];
 function inside(p,t){
  const [a,b,c]=t,cross=(u,v,w)=>(v[0]-u[0])*(w[1]-u[1])-(v[1]-u[1])*(w[0]-u[0]);
  const d=[cross(a,b,p),cross(b,c,p),cross(c,a,p)];return d.every(v=>v>=-1e-6)||d.every(v=>v<=1e-6);
 }
 function patch(pins){
  const [a,b]=pins,rx=120,ry=100,k=kernel(Math.hypot((a.from[0]-b.from[0])/rx,(a.from[1]-b.from[1])/ry)),det=1-k*k;
  if(det<1e-5)throw Error('Wardrobe cuff pins too close');
  const da=a.to.map((v,n)=>v-a.from[n]),db=b.to.map((v,n)=>v-b.from[n]);
  const wa=da.map((v,n)=>(v-k*db[n])/det),wb=db.map((v,n)=>(v-k*da[n])/det);
  const deform=([x,y])=>{
   const ka=kernel(Math.hypot((x-a.from[0])/rx,(y-a.from[1])/ry)),kb=kernel(Math.hypot((x-b.from[0])/rx,(y-b.from[1])/ry));
   return [x+wa[0]*ka+wb[0]*kb,y+wa[1]*ka+wb[1]*kb];
  };
  const xs0=pins.map(p=>p.from[0]),ys0=pins.map(p=>p.from[1]);
  const bounds=[Math.max(0,Math.min(...xs0)-125),Math.max(0,Math.min(...ys0)-105),Math.min(896,Math.max(...xs0)+125),Math.min(1200,Math.max(...ys0)+105)];
  const xs=[...new Set([bounds[0],...xs0,(xs0[0]+xs0[1])/2,bounds[2]])].sort((a,b)=>a-b);
  const ys=[...new Set([bounds[1],...ys0,(ys0[0]+ys0[1])/2,bounds[3]])].sort((a,b)=>a-b),triangles=[];
  for(let y=0;y<ys.length-1;y++)for(let x=0;x<xs.length-1;x++){
   const p=[xs[x],ys[y]],q=[xs[x+1],ys[y]],r=[xs[x+1],ys[y+1]],s=[xs[x],ys[y+1]];
   for(const source of [[p,q,r],[p,r,s]]){const target=source.map(deform);triangles.push({source,target,matrix:affine(source,target),inverse:affine(target,source)});}
  }
  return {bounds,triangles,deform};
 }
 function build(cuffs){return cuffs.map(c=>({...patch(c.pins),opening:c.opening}));}
 function inverse(patches,x,y){for(const p of patches)for(const t of p.triangles)if(inside([x,y],t.target))return apply(t.inverse,x,y);return [x,y];}
 function openingPoints(o){
  if(o.entry){const e=o.entry;return [[e.left,e.top],[e.right,e.top],[e.right,e.shoulder],...Array.from({length:21},(_,n)=>[o.x+o.rx*Math.cos(n/20*Math.PI),o.y+o.ry*Math.sin(n/20*Math.PI)]),[e.left,e.shoulder]];}
  return Array.from({length:40},(_,n)=>{const t=n/40*Math.PI*2,a=(o.angle||0)*Math.PI/180,x=o.rx*Math.cos(t),y=o.ry*Math.sin(t);return [o.x+x*Math.cos(a)-y*Math.sin(a),o.y+x*Math.sin(a)+y*Math.cos(a)];});
 }
 function inOpening(o,x,y){
  if(o.entry){const points=openingPoints(o);let hit=false;for(let n=0,k=points.length-1;n<points.length;k=n++){const a=points[n],b=points[k];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
  const a=-(o.angle||0)*Math.PI/180,dx=x-o.x,dy=y-o.y,u=dx*Math.cos(a)-dy*Math.sin(a),v=dx*Math.sin(a)+dy*Math.cos(a);return (u/o.rx)**2+(v/o.ry)**2<=1;
 }
 // Каждый пиксель записывается один раз: нет швов и потемнения полупрозрачной ткани на границах ячеек.
 function sample(source,x,y,out,index){
  x-=.5;y-=.5;const x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0;let alpha=0,r=0,g=0,b=0;
  for(let j=0;j<2;j++)for(let i=0;i<2;i++){
   const u=x0+i,v=y0+j;if(u<0||v<0||u>=896||v>=1200)continue;
   const k=(v*896+u)*4,w=(i?fx:1-fx)*(j?fy:1-fy),a=source[k+3]*w;
   alpha+=a;r+=source[k]*a;g+=source[k+1]*a;b+=source[k+2]*a;
  }
  out[index]=alpha?r/alpha:0;out[index+1]=alpha?g/alpha:0;out[index+2]=alpha?b/alpha:0;out[index+3]=alpha;
 }
 function rasterize(image,r,patches){
  const canvas=document.createElement('canvas');canvas.width=896;canvas.height=1200;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)return null;
  ctx.drawImage(image,r.x,r.y,r.width,r.height);const source=ctx.getImageData(0,0,896,1200),out=new ImageData(new Uint8ClampedArray(source.data),896,1200);
  for(const patch of patches)for(const t of patch.triangles){
   const xs=t.target.map(p=>p[0]),ys=t.target.map(p=>p[1]);
   const left=Math.max(0,Math.floor(Math.min(...xs))),right=Math.min(896,Math.ceil(Math.max(...xs))),top=Math.max(0,Math.floor(Math.min(...ys))),bottom=Math.min(1200,Math.ceil(Math.max(...ys)));
   for(let y=top;y<bottom;y++)for(let x=left;x<right;x++){
    if(!inside([x+.5,y+.5],t.target))continue;
    const [u,v]=apply(t.inverse,x+.5,y+.5);sample(source.data,u,v,out.data,(y*896+x)*4);
   }
  }
  ctx.putImageData(out,0,0);return canvas.toDataURL('image/png');
 }
 let neckSource=null,neckURL='';
 function neck(image,extend){
  const canvas=document.createElement('canvas');canvas.width=896;canvas.height=1200;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)return null;
  if(neckURL!==image.src||!neckSource){
   ctx.save();ctx.clip(new Path2D('M334 350Q356 370 373 390L387 410Q402 438 448 438Q493 438 514 410L522 390Q540 370 561 350Z'));ctx.drawImage(image,0,0,896,1200);ctx.restore();neckSource=ctx.getImageData(0,0,896,1200).data;neckURL=image.src;
  }
  const out=ctx.createImageData(896,1200),sy=1+extend/88;
  for(let y=350;y<Math.ceil(438+extend);y++){
   const v=350+(y+.5-350)/sy,t=(v-350)/88,sx=1+.9*t*t;
   for(let x=250;x<646;x++)sample(neckSource,448+(x+.5-448)/sx,v,out.data,(y*896+x)*4);
  }
  ctx.putImageData(out,0,0);return canvas.toDataURL('image/png');
 }
 return {build,inverse,inOpening,openingPoints,rasterize,neck,apply};
})();
