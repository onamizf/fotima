/* Shared optical treatment for both r128 laboratory viewers. No silhouette geometry. */
function createGlassMaterial({T,lowDetail=false,opacity=.9,side=T.FrontSide}={}){
 const m=new T.MeshPhysicalMaterial({transmission:.55,color:'#DCEBFA',roughness:.05,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.6,transparent:true,opacity,depthWrite:false,side});
 // r128 predates volume uniforms. Keep the physical parameters and apply equivalent
 // thin-wall absorption in its shader; newer runtimes use their native volume model.
 Object.assign(m,{ior:1.5,thickness:.4,attenuationColor:new T.Color('#9CC8F0'),attenuationDistance:2});
 m.userData.labGlass=true;m.userData.lowDetail=lowDetail;
 m.onBeforeCompile=shader=>{const edge=lowDetail?'edge*edge':'pow(edge,3.0)';
  shader.uniforms.labGlassBounds={value:m.userData.bounds||new T.Vector2(-1e4,1e4)};
  shader.vertexShader='varying float labGlassY;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nlabGlassY=position.y;');
  shader.fragmentShader='varying float labGlassY;uniform vec2 labGlassBounds;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );',`
  float facing=abs(dot(normalize(normal),normalize(vViewPosition)));
  float edge=1.0-facing;
  float fresnel=${edge}*.6;
  outgoingLight*=mix(vec3(1.0),vec3(.61,.78,.94),.4/2.0);
  outgoingLight+=vec3(fresnel);
  diffuseColor.a=max(diffuseColor.a,opacity*fresnel);
  float height=max(.001,labGlassBounds.y-labGlassBounds.x);
  float rim=max(1.0-smoothstep(0.0,height*.045,labGlassY-labGlassBounds.x),smoothstep(height*.97,height,labGlassY-labGlassBounds.x));
  outgoingLight=mix(outgoingLight,vec3(.92,.97,1.0),rim*.4);
  diffuseColor.a=mix(diffuseColor.a,min(.95,opacity/.9*.95),rim);
  gl_FragColor=vec4(outgoingLight,diffuseColor.a);`);};
 m.customProgramCacheKey=()=>`lab-glass-${lowDetail?'mobile':'desktop'}`;
 return m;
}

/* Geometry UVs run left-to-right on the +Z/front arc. BackSide text is never drawn. */
function createEquipmentPrintMaterial(T,texture){
 const m=new T.MeshBasicMaterial({map:texture,transparent:true,opacity:.95,side:T.FrontSide,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 m.userData.labPrint=true;
 m.onBeforeCompile=shader=>{
  shader.vertexShader='varying vec3 labPrintNormal;varying vec3 labPrintView;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nlabPrintNormal=normalize(normalMatrix*normal);labPrintView=-(modelViewMatrix*vec4(position,1.0)).xyz;');
  shader.fragmentShader='varying vec3 labPrintNormal;varying vec3 labPrintView;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );','diffuseColor.a*=smoothstep(.05,.55,dot(normalize(labPrintNormal),normalize(labPrintView)));\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);');
 };
 m.customProgramCacheKey=()=> 'lab-front-print-v1';return m;
}

function finishEquipmentGlass(group,{T,lowDetail,materials,geometries,textures}){
 const glass=[];group.traverse(o=>{if(o.isMesh&&o.material.userData.labGlass)glass.push(o);});
 let reflectionTexture;
 for(const front of glass){
  front.geometry.computeBoundingBox();const box=front.geometry.boundingBox,size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3()),radius=Math.max(size.x,size.z)/2;
  const foreground=createGlassMaterial({T,lowDetail});foreground.userData.bounds=new T.Vector2(box.min.y,box.max.y);materials.add(foreground);front.material=foreground;front.renderOrder=30;
  if(!lowDetail){const backMaterial=createGlassMaterial({T,opacity:.35,side:T.BackSide});backMaterial.userData.bounds=foreground.userData.bounds;materials.add(backMaterial);const back=new T.Mesh(front.geometry,backMaterial);back.name='glass-far-wall';back.renderOrder=20;back.userData.opticalLayer=true;front.add(back);}
  if(size.y<.5||radius<.05)continue;
  if(!reflectionTexture){const c=document.createElement('canvas');c.width=128;c.height=32;const x=c.getContext('2d'),g=x.createLinearGradient(0,0,128,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.4,'rgba(255,255,255,.12)');g.addColorStop(.5,'rgba(255,255,255,.8)');g.addColorStop(.6,'rgba(255,255,255,.12)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,32);reflectionTexture=new T.CanvasTexture(c);textures.add(reflectionTexture);}
  for(let i=0;i<(lowDetail?1:2);i++){
   const geo=new T.PlaneGeometry(radius*(i?.12:.22),size.y*.78),mat=new T.MeshBasicMaterial({map:reflectionTexture,transparent:true,opacity:i?.22:.42,depthWrite:false,blending:T.AdditiveBlending,side:T.FrontSide});geometries.add(geo);materials.add(mat);const strip=new T.Mesh(geo,mat);strip.name='window-reflection';strip.renderOrder=42;strip.userData.opticalLayer=true;front.add(strip);
   const cameraLocal=new T.Vector3();strip.onBeforeRender=(renderer,scene,camera)=>{camera.getWorldPosition(cameraLocal);front.worldToLocal(cameraLocal);const a=Math.atan2(cameraLocal.x-center.x,cameraLocal.z-center.z)+(i?-.50:.35);strip.position.set(center.x+Math.sin(a)*radius*1.006,center.y,center.z+Math.cos(a)*radius*1.006);strip.rotation.y=a;strip.updateMatrixWorld(true);};
  }
 }
}
