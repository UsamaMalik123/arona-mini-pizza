import * as THREE from "three";
import imgA_url from "../assets/mini-pizza.webp";
import imgB_url from "../assets/blech.webp";

/* Canvas renderer, making-of film, 3D tray and page interactions.
   Runs once after React has rendered the markup. */
let started = false;
export function initSite() {
  if (started) return;
  started = true;

"use strict";
const IMG_A=imgA_url,IMG_B=imgB_url;
const RM=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);
const mk=(w,h)=>{const c=document.createElement("canvas");c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h==null?w:h));return c};
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
const ease=t=>1-Math.pow(1-t,3);
const easeBack=t=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
const TAU=Math.PI*2;
const later=fn=>setTimeout(fn,16);

const imgA=new Image(),imgB=new Image();imgA.src=IMG_A;imgB.src=IMG_B;
document.getElementById("photoA").src=IMG_A;document.getElementById("photoB").src=IMG_B;document.getElementById("miniImg").src=IMG_A;

/* ---------- noise ---------- */
function makeNoise(seed){const R=mulberry(seed),p=[...Array(256).keys()];for(let i=255;i>0;i--){const j=R()*(i+1)|0;const t=p[i];p[i]=p[j];p[j]=t}
  const P=new Uint8Array(512);for(let i=0;i<512;i++)P[i]=p[i&255];const G=new Float32Array(256);for(let i=0;i<256;i++)G[i]=R();
  function n2(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,X=xi&255,Y=yi&255;const a=G[P[P[X]+Y]],b=G[P[P[X+1]+Y]],c=G[P[P[X]+Y+1]],d=G[P[P[X+1]+Y+1]];const u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
  function fbm(x,y,o){let s=0,a=.5,f=1,n=0;for(let i=0;i<o;i++){s+=a*n2(x*f,y*f);n+=a;a*=.5;f*=2.03}return s/n}
  return{n2,fbm}}
const NZ=makeNoise(11);
function hash(x,y){let h=(Math.imul(x|0,374761393)+Math.imul(y|0,668265263))|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296}

/* ---------- photo-like pizza surface, rendered pixel by pixel ---------- */
function surface(w,h,o){
  w=Math.max(1,Math.round(w));h=Math.max(1,Math.round(h));
  const c=mk(w,h),x=c.getContext("2d"),img=x.createImageData(w,h),d=img.data;
  const st=o.stage||"baked",e=o.edge||0,ed=o.edges||[1,1,1,1],rad=o.radius||0,f=o.scale||1,ox=o.ox||0,oy=o.oy||0;
  for(let y=0;y<h;y++){for(let X=0;X<w;X++){
    let dist=1e9;
    if(ed[0])dist=Math.min(dist,y+.5);if(ed[2])dist=Math.min(dist,h-y-.5);if(ed[3])dist=Math.min(dist,X+.5);if(ed[1])dist=Math.min(dist,w-X-.5);
    if(rad){let cx=-1,cy=-1;
      if(ed[0]&&ed[3]&&X<rad&&y<rad){cx=rad;cy=rad}else if(ed[0]&&ed[1]&&X>w-rad&&y<rad){cx=w-rad;cy=rad}else if(ed[2]&&ed[3]&&X<rad&&y>h-rad){cx=rad;cy=h-rad}else if(ed[2]&&ed[1]&&X>w-rad&&y>h-rad){cx=w-rad;cy=h-rad}
      if(cx>=0)dist=Math.min(dist,rad-Math.hypot(X+.5-cx,y+.5-cy))}
    const i=(y*w+X)*4;if(dist<=0){d[i+3]=0;continue}
    const nx=(X+ox)/f,ny=(y+oy)/f;let r,g,b,k;
    const m=NZ.fbm(nx/38,ny/38,3);
    if(st==="dough"){
      r=236+(m-.5)*36;g=212+(m-.5)*32;b=168+(m-.5)*26;
      const s=NZ.n2(nx/2.2,ny/2.2);if(s>.8){k=(s-.8)*4;r+=(255-r)*k;g+=(252-g)*k;b+=(242-b)*k}
      if(e&&dist<e*1.5){const t=dist/(e*1.5);k=Math.sin(t*Math.PI)*.12;r+=40*k;g+=34*k;b+=26*k;if(t<.25){k=(.25-t)*1.2;r-=40*k;g-=46*k;b-=46*k}}
    }else if(st==="baked"){
      const ru=nx*.8-ny*.6,rv=nx*.6+ny*.8,b0=NZ.fbm(ru/22+31,rv/22+17,4),s=NZ.n2(rv/4.5+11,-ru/4.5),q=NZ.fbm(nx/26+77,ny/26+5,2);
      const eb=e?(1-smooth(0,e*2.8,dist))*.42:0,B=b0+eb;
      r=249;g=233;b=186;const sh=(m-.5)*40;r+=sh;g+=sh;b+=sh*.8;
      k=smooth(.5,.64,B);r+=(240-r)*k;g+=(196-g)*k;b+=(118-b)*k;
      k=smooth(.62,.74,B);r+=(204-r)*k;g+=(126-g)*k;b+=(52-b)*k;
      k=smooth(.74,.86,B);r+=(118-r)*k;g+=(55-g)*k;b+=(18-b)*k;
      if(q<.34){k=Math.min(.5,(.34-q)*3);r+=(228-r)*k;g+=(130-g)*k;b+=(58-b)*k}
      if(s>.8){k=Math.min(.7,(s-.8)*5);r+=(212-r)*k;g+=(122-g)*k;b+=(48-b)*k}
      const gl=NZ.n2(nx/4+300,ny/4);if(gl>.82&&B<.62){k=(gl-.82)*4;r+=40*k;g+=38*k;b+=30*k}
      if(e&&dist<e){const t=dist/e,cr=NZ.fbm(nx/7+9,ny/7,2);let a,bb,cc;
        if(t<.5){const u=t/.5;a=92+104*u;bb=42+70*u;cc=14+30*u}else{const u=(t-.5)/.5;a=196+26*u;bb=112+38*u;cc=44+30*u}
        if(cr>.58){const z=Math.min(1,(cr-.58)*2.5);a+=(64-a)*z;bb+=(27-bb)*z;cc+=(10-cc)*z}
        const w2=1-smooth(.72,1,t);r+=(a-r)*w2;g+=(bb-g)*w2;b+=(cc-b)*w2}
    }else{
      const sv=NZ.fbm(nx/20+40,ny/20,3);r=172+(sv-.5)*64;g=36+(sv-.5)*30;b=24+(sv-.5)*16;
      if(NZ.n2(nx/3,ny/3)>.7){r+=30;g+=20;b+=10}
      if(NZ.n2(nx/1.4+90,ny/1.4)>.9){r=80;g=88;b=34}
      if(st==="raw"){const v=Math.max(NZ.n2(nx/3.4,ny/1.1),NZ.n2(nx/1.1+50,ny/3.4),NZ.n2((nx+ny)/2.4+20,(nx-ny)/1.1));if(v>.58){k=smooth(.58,.64,v);const sd=(v-.58)*70;r+=(252-sd-r)*k;g+=(242-sd-g)*k;b+=(210-sd-b)*k}}
      const rim=e?1-smooth(e*.5,e*1.05,dist):0;
      if(rim>0){const dr=232+(m-.5)*30,dg=204+(m-.5)*28,db=158+(m-.5)*22;r+=(dr-r)*rim;g+=(dg-g)*rim;b+=(db-b)*rim}
    }
    const gn=(hash(X+ox*7,y+oy*7)-.5)*(st==="baked"?7:12);
    d[i]=r+gn;d[i+1]=g+gn;d[i+2]=b+gn;d[i+3]=dist<1?dist*255:255;
  }}
  x.putImageData(img,0,0);return c;
}
function blob(x,cx,cy,r,R,j){x.beginPath();const n=44,p=[R()*6,R()*6,R()*6];for(let i=0;i<=n;i++){const a=i/n*TAU;const rr=r*(1+j*(Math.sin(a*3+p[0])+.6*Math.sin(a*5+p[1])+.3*Math.sin(a*9+p[2])));const px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr;i?x.lineTo(px,py):x.moveTo(px,py)}x.closePath()}
const ns=c=>{c.shadowColor="rgba(0,0,0,0)"};

/* ---------- toppings ---------- */
const DR={
 salami(c,u,R){const r=9*u;let g=c.createRadialGradient(-r*.25,-r*.3,r*.05,0,0,r);g.addColorStop(0,"#e04d34");g.addColorStop(.55,"#c9331f");g.addColorStop(.9,"#a6231a");g.addColorStop(1,"#7a160e");
  c.fillStyle=g;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();ns(c);c.save();c.beginPath();c.arc(0,0,r*.98,0,TAU);c.clip();
  for(let i=0;i<170;i++){const a=R()*TAU,d=Math.sqrt(R())*r;c.fillStyle=`rgba(255,${160+R()*50|0},${140+R()*30|0},${.3+R()*.4})`;c.beginPath();c.ellipse(Math.cos(a)*d,Math.sin(a)*d,r*(.01+R()*.025),r*(.008+R()*.018),R()*3,0,TAU);c.fill()}
  for(let i=0;i<90;i++){const a=R()*TAU,d=Math.sqrt(R())*r;c.fillStyle="rgba(70,10,5,.45)";c.beginPath();c.arc(Math.cos(a)*d,Math.sin(a)*d,r*(.008+R()*.014),0,TAU);c.fill()}
  c.strokeStyle="rgba(100,18,8,.5)";c.lineWidth=r*.06;c.beginPath();c.arc(0,0,r*.97,0,TAU);c.stroke();
  const a0=R()*TAU;c.strokeStyle="rgba(60,12,4,.35)";c.lineWidth=r*.1;c.beginPath();c.arc(0,0,r*.95,a0,a0+1+R());c.stroke();
  g=c.createRadialGradient(-r*.3,-r*.35,0,-r*.3,-r*.35,r*.7);g.addColorStop(0,"rgba(255,220,200,.3)");g.addColorStop(1,"rgba(255,220,200,0)");c.fillStyle=g;c.fillRect(-r,-r,2*r,2*r);c.restore()},
 sucuk(c,u,R){const r=7.6*u;let g=c.createRadialGradient(-r*.3,-r*.3,r*.1,0,0,r);g.addColorStop(0,"#9a3320");g.addColorStop(.7,"#6b1c10");g.addColorStop(1,"#3c0d06");c.fillStyle=g;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();ns(c);
  for(let i=0;i<30;i++){const a=R()*TAU,d=Math.sqrt(R())*r*.85;c.fillStyle=`rgba(230,180,140,${.4+R()*.4})`;c.beginPath();c.arc(Math.cos(a)*d,Math.sin(a)*d,u*(.25+R()*.45),0,TAU);c.fill()}
  c.strokeStyle="rgba(30,6,2,.8)";c.lineWidth=1.2*u;c.beginPath();c.arc(0,0,r-.6*u,0,TAU);c.stroke();
  c.fillStyle="rgba(255,170,110,.25)";c.beginPath();c.ellipse(-r*.3,-r*.35,r*.35,r*.15,-.6,0,TAU);c.fill()},
 peperoni(c,u,R){const L=30*u,W=3.9*u,bend=(R()>.5?1:-1)*(4+R()*6)*u,N=26,left=[],right=[],mid=[],cen=[],nrm=[];
  for(let i=0;i<=N;i++){const t=i/N,x=-L/2+L*t,y=bend*(1-Math.pow(2*t-1,2));const dy=-4*bend*(2*t-1)/L,len=Math.hypot(1,dy),nx=-dy/len,ny=1/len;
    const w=W*Math.pow(Math.sin(Math.PI*Math.min(1,t*1.02+.03)),.5)*(1-.42*t)*(1+.06*Math.sin(t*23));left.push([x+nx*w,y+ny*w]);right.push([x-nx*w,y-ny*w]);mid.push([x-nx*w*.38,y-ny*w*.38]);cen.push([x,y,w]);nrm.push([nx,ny])}
  c.beginPath();left.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));for(let i=right.length-1;i>=0;i--)c.lineTo(right[i][0],right[i][1]);c.closePath();
  let g=c.createLinearGradient(0,bend-W*1.6,0,bend+W*1.6);g.addColorStop(0,"#c3cc55");g.addColorStop(.5,"#9caa33");g.addColorStop(1,"#6c8220");c.fillStyle=g;c.fill();ns(c);
  c.save();c.clip();c.strokeStyle="rgba(70,90,15,.55)";c.lineWidth=W*.55;c.beginPath();right.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
  c.strokeStyle="rgba(80,95,20,.4)";c.lineWidth=.5*u;for(let k=0;k<5;k++){const j=3+(R()*(N-8)|0),p=cen[j],n=nrm[j];c.beginPath();c.moveTo(p[0]+n[0]*p[2]*.8,p[1]+n[1]*p[2]*.8);c.quadraticCurveTo(p[0]+2*u,p[1],p[0]-n[0]*p[2]*.6,p[1]-n[1]*p[2]*.6);c.stroke()}c.restore();
  c.strokeStyle="rgba(55,72,12,.6)";c.lineWidth=.45*u;c.beginPath();left.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));for(let i=right.length-1;i>=0;i--)c.lineTo(right[i][0],right[i][1]);c.closePath();c.stroke();
  c.lineCap="round";c.strokeStyle="rgba(238,245,170,.5)";c.lineWidth=W*.3;c.beginPath();for(let i=3;i<N-5;i++){const p=mid[i];i>3?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])}c.stroke();
  c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=W*.1;c.beginPath();c.moveTo(mid[6][0],mid[6][1]);c.lineTo(mid[10][0],mid[10][1]);c.stroke();
  c.fillStyle="#76692a";c.beginPath();c.ellipse(-L/2-1*u,0,1.7*u,1.5*u,0,0,TAU);c.fill()},
 mushroom(c,u,R){const w=8*u,h=w*.85;const p=new Path2D();p.moveTo(-w,.08*w);p.bezierCurveTo(-w*.98,-w*(.85+R()*.15),w*.98,-w*(.85+R()*.15),w,.08*w);p.quadraticCurveTo(w*.7,.2*w,w*.32,.16*w);p.lineTo(w*.28,h*.82);p.quadraticCurveTo(0,h*.95,-w*.28,h*.82);p.lineTo(-w*.32,.16*w);p.quadraticCurveTo(-w*.7,.2*w,-w,.08*w);p.closePath();
  c.globalAlpha*=.86;let g=c.createRadialGradient(-w*.2,-w*.3,w*.1,0,0,w*1.1);g.addColorStop(0,"#e9dcbd");g.addColorStop(1,"#bfa77f");c.fillStyle=g;c.fill(p);ns(c);
  c.save();c.clip(p);c.fillStyle="rgba(120,98,80,.7)";c.beginPath();c.moveTo(-w*.9,.06*w);c.quadraticCurveTo(0,-w*.1,w*.9,.06*w);c.quadraticCurveTo(w*.6,w*.3,0,w*.26);c.quadraticCurveTo(-w*.6,w*.3,-w*.9,.06*w);c.fill();
  g=c.createLinearGradient(-w*.28,0,w*.28,0);g.addColorStop(0,"#cdbd9a");g.addColorStop(.5,"#e6dac0");g.addColorStop(1,"#c2ad86");c.fillStyle=g;c.fillRect(-w*.28,w*.14,w*.56,h*.75);
  c.fillStyle="rgba(248,234,200,.5)";c.beginPath();c.ellipse((R()-.5)*w*.6,w*.3,w*.8,w*.35,0,0,TAU);c.fill();c.restore();
  c.strokeStyle="rgba(112,82,56,.9)";c.lineWidth=w*.1;c.lineCap="round";c.beginPath();c.moveTo(-w*.97,.05*w);c.bezierCurveTo(-w*.95,-w*.92,w*.95,-w*.92,w*.97,.05*w);c.stroke()},
 ham(c,u,R){blob(c,0,0,6.5*u,R,.14);let g=c.createLinearGradient(-6*u,-6*u,6*u,6*u);g.addColorStop(0,"#f2b0a6");g.addColorStop(1,"#d47a70");c.fillStyle=g;c.fill();ns(c);
  c.strokeStyle="rgba(255,240,236,.7)";c.lineWidth=1*u;c.beginPath();c.moveTo(-4*u,-2*u);c.quadraticCurveTo(0,R()*3*u,4*u,1*u);c.stroke();c.fillStyle="rgba(180,90,40,.25)";blob(c,1*u,1*u,3*u,R,.2);c.fill()},
 olive(c,u){c.strokeStyle="#241a1f";c.lineWidth=2.8*u;c.beginPath();c.arc(0,0,3.8*u,0,TAU);c.stroke();ns(c);c.strokeStyle="rgba(150,130,140,.6)";c.lineWidth=.8*u;c.beginPath();c.arc(0,0,4.4*u,3.6,4.6);c.stroke()},
 pineapple(c,u){c.beginPath();c.moveTo(-6*u,4*u);c.lineTo(-3*u,-5*u);c.lineTo(3*u,-5*u);c.lineTo(6*u,4*u);c.closePath();let g=c.createLinearGradient(0,-5*u,0,4*u);g.addColorStop(0,"#fde783");g.addColorStop(1,"#e5ad2a");c.fillStyle=g;c.fill();ns(c);
  c.strokeStyle="rgba(180,120,20,.55)";c.lineWidth=.6*u;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*1.4*u,-4.5*u);c.lineTo(i*2*u,3.5*u);c.stroke()}c.fillStyle="rgba(190,110,30,.35)";c.fillRect(-5*u,2.4*u,10*u,1.6*u)},
 tuna(c,u,R){for(let i=0;i<7;i++){c.fillStyle=["#d4b38c","#bb946d","#a37c5a"][i%3];blob(c,(R()-.5)*8*u,(R()-.5)*7*u,(1.6+R()*1.8)*u,R,.25);c.fill();if(!i)ns(c)}},
 onion(c,u,R){const a=R()*TAU;c.lineCap="round";c.strokeStyle="#f5eef5";c.lineWidth=1.6*u;c.beginPath();c.arc(0,0,6*u,a,a+2.3);c.stroke();ns(c);c.strokeStyle="#9c5ba6";c.lineWidth=.7*u;c.beginPath();c.arc(0,0,7*u,a,a+2.3);c.stroke()},
 broccoli(c,u,R){c.fillStyle="#9dc96a";c.fillRect(-1.3*u,0,2.6*u,6*u);ns(c);for(let i=0;i<8;i++){const x=(R()-.5)*7*u,y=-R()*5*u;let g=c.createRadialGradient(x-u,y-u,.2*u,x,y,3*u);g.addColorStop(0,"#5aac48");g.addColorStop(1,"#245f22");c.fillStyle=g;c.beginPath();c.arc(x,y,2.6*u,0,TAU);c.fill()}},
 corn(c,u,R){for(let i=0;i<3;i++){const x=(R()-.5)*7*u,y=(R()-.5)*6*u;let g=c.createRadialGradient(x-.5*u,y-.5*u,.1,x,y,2.2*u);g.addColorStop(0,"#fff19a");g.addColorStop(1,"#e8b51c");c.fillStyle=g;c.beginPath();c.ellipse(x,y,2.2*u,1.8*u,R()*3,0,TAU);c.fill();if(!i)ns(c)}},
 spinach(c,u,R){c.fillStyle="rgba(40,86,30,.92)";blob(c,0,0,7*u,R,.22);c.fill();ns(c);c.strokeStyle="rgba(95,150,70,.7)";c.lineWidth=.6*u;c.beginPath();c.moveTo(-5*u,0);c.quadraticCurveTo(0,-2*u,5*u,0);c.stroke()},
 tomato(c,u,R){c.fillStyle="#cf2a1a";c.beginPath();c.arc(0,0,6*u,0,TAU);c.fill();ns(c);let g=c.createRadialGradient(0,0,u,0,0,5*u);g.addColorStop(0,"#ff8a6a");g.addColorStop(1,"#e9442c");c.fillStyle=g;c.beginPath();c.arc(0,0,4.9*u,0,TAU);c.fill();
  for(let i=0;i<3;i++){const a=i*TAU/3+R();c.fillStyle="rgba(250,190,140,.85)";c.beginPath();c.ellipse(Math.cos(a)*2.4*u,Math.sin(a)*2.4*u,1.7*u,1.1*u,a,0,TAU);c.fill();c.fillStyle="#f6dd8a";c.beginPath();c.arc(Math.cos(a)*2.4*u,Math.sin(a)*2.4*u,.4*u,0,TAU);c.fill()}
  c.fillStyle="rgba(255,255,255,.35)";c.beginPath();c.ellipse(-2.5*u,-3*u,1.6*u,.7*u,-.6,0,TAU);c.fill()},
 blue(c,u,R){let g=c.createRadialGradient(-u,-u,.5*u,0,0,6*u);g.addColorStop(0,"#fbf6e6");g.addColorStop(1,"#e3d6b0");c.fillStyle=g;blob(c,0,0,5.5*u,R,.18);c.fill();ns(c);c.fillStyle="rgba(80,115,120,.85)";for(let i=0;i<7;i++){c.beginPath();c.ellipse((R()-.5)*7*u,(R()-.5)*7*u,(.4+R()*.8)*u,(.3+R()*.5)*u,R()*3,0,TAU);c.fill()}},
 feta(c,u,R){c.fillStyle="#fbf8ef";c.beginPath();const s=3.6*u;c.moveTo(-s,-s+R()*u);c.lineTo(s,-s);c.lineTo(s-R()*u,s);c.lineTo(-s,s);c.closePath();c.fill();ns(c);c.strokeStyle="rgba(205,150,80,.55)";c.lineWidth=.9*u;c.stroke()},
 caper(c,u,R){for(let i=0;i<2;i++){const x=(R()-.5)*4*u,y=(R()-.5)*4*u;let g=c.createRadialGradient(x-.6*u,y-.6*u,.1,x,y,2.4*u);g.addColorStop(0,"#b3c25e");g.addColorStop(1,"#4f601c");c.fillStyle=g;c.beginPath();c.arc(x,y,2.3*u,0,TAU);c.fill();if(!i)ns(c)}},
 anchovy(c,u){let g=c.createLinearGradient(0,-2*u,0,2*u);g.addColorStop(0,"#b07b60");g.addColorStop(1,"#62402f");c.fillStyle=g;c.beginPath();c.ellipse(0,0,11*u,2.3*u,0,0,TAU);c.fill();ns(c);c.strokeStyle="rgba(225,225,235,.55)";c.lineWidth=.5*u;c.beginPath();c.moveTo(-10*u,0);c.lineTo(10*u,0);c.stroke()},
 artichoke(c,u){const cols=["#c9c58c","#aeab6e","#8e8c52"];for(let i=0;i<3;i++){c.fillStyle=cols[i];c.beginPath();c.moveTo(0,6*u);c.quadraticCurveTo(-(6-i*1.6)*u,-i*u,0,-(7-i*1.5)*u);c.quadraticCurveTo((6-i*1.6)*u,-i*u,0,6*u);c.fill();if(!i)ns(c)}},
 basil(c,u){c.beginPath();c.moveTo(0,-9*u);c.quadraticCurveTo(7.5*u,-2*u,0,9*u);c.quadraticCurveTo(-7.5*u,-2*u,0,-9*u);let g=c.createLinearGradient(-5*u,-8*u,5*u,8*u);g.addColorStop(0,"#57b444");g.addColorStop(1,"#22621c");c.fillStyle=g;c.fill();ns(c);c.strokeStyle="rgba(150,210,120,.7)";c.lineWidth=.6*u;c.beginPath();c.moveTo(0,-8*u);c.lineTo(0,8*u);c.stroke()}
};
const RAD={salami:9,sucuk:7.6,mushroom:7,peperoni:12,ham:6.5,olive:4.5,pineapple:6,tuna:5,onion:6,broccoli:5,corn:4,spinach:7,tomato:6,blue:5.5,feta:4,caper:3,anchovy:9,artichoke:6,basil:8};
function drawTop(c,t,u,o={}){c.save();if(o.a!=null)c.globalAlpha*=o.a;c.translate(t.x,t.y+(o.dy||0));c.rotate(t.rot);const s=t.s*(o.sc||1);c.scale(s,s);
  c.shadowColor="rgba(40,15,0,.45)";c.shadowBlur=2.2*u*(o.sc||1);c.shadowOffsetY=1.2*u*(o.sc||1);DR[t.type](c,u,mulberry(t.seed));c.restore()}
function drape(c,t,u){const R=mulberry(t.seed+5),rr=(RAD[t.type]||6)*u*t.s;for(let k=0;k<3;k++){const a=R()*TAU,px=t.x+Math.cos(a)*rr*.92,py=t.y+Math.sin(a)*rr*.92,br=u*(1.4+R()*2.2);
  const g=c.createRadialGradient(px,py,0,px,py,br);g.addColorStop(0,"rgba(248,234,200,.85)");g.addColorStop(.6,"rgba(242,220,170,.5)");g.addColorStop(1,"rgba(240,215,160,0)");c.fillStyle=g;c.beginPath();c.arc(px,py,br,0,TAU);c.fill()}}
const ORD={spinach:0,ham:1,tuna:1,salami:2,sucuk:2,mushroom:3,artichoke:3,pineapple:3,broccoli:3,blue:4,feta:4,tomato:4,onion:5,peperoni:6,olive:6,corn:6,caper:6,anchovy:6,basil:7};
const byOrd=(a,b)=>(ORD[a.type]||0)-(ORD[b.type]||0);

/* melt pass: cheese film and relief over the toppings, then a slight soften */
function bake(c,f,ox,oy){const w=c.width,h=c.height,x=c.getContext("2d"),img=x.getImageData(0,0,w,h),d=img.data;
  for(let y=0;y<h;y++)for(let X=0;X<w;X++){const i=(y*w+X)*4;if(d[i+3]<10)continue;const nx=(X+ox)/f,ny=(y+oy)/f;
    const fl=smooth(.6,.76,NZ.fbm(nx/9+400,ny/9+3,2))*.55,hg=(NZ.fbm(nx/6+200,ny/6,2)-.5)*34,br=smooth(.7,.82,NZ.fbm(nx/13+600,ny/13,2))*.45;
    let r=d[i],g=d[i+1],b=d[i+2];r+=(246-r)*fl;g+=(228-g)*fl;b+=(180-b)*fl;r+=(196-r)*br;g+=(118-g)*br;b+=(48-b)*br;
    d[i]=r+hg;d[i+1]=g+hg;d[i+2]=b+hg*.8}
  x.putImageData(img,0,0);const s=mk(w/2,h/2);s.getContext("2d").drawImage(c,0,0,w/2,h/2);x.globalAlpha=.45;x.drawImage(s,0,0,w,h);x.globalAlpha=1}
/* tray layout like the real Blech: salami grid, peperoni across, mushrooms everywhere */
function trayLayout(W,H,seed){const R=mulberry(seed),L=[],cols=5,rows=4,cw=W/cols,ch=H/rows,mg=W*.05;const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
  for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const cx=(i+.5)*cw,cy=(j+.5)*ch;
    for(let k=0;k<2+(R()*2|0);k++)L.push({type:"mushroom",x:cl(cx+(R()-.5)*cw*.85,mg,W-mg),y:cl(cy+(R()-.5)*ch*.85,mg,H-mg),rot:R()*TAU,s:.5+R()*.14,seed:R()*1e9|0});
    L.push({type:"salami",x:cl(cx+(R()-.5)*cw*.3,mg,W-mg),y:cl(cy+(R()-.5)*ch*.3,mg,H-mg),rot:R()*TAU,s:.95+R()*.1,seed:R()*1e9|0});
    if((i+j)%2===0)L.push({type:"peperoni",x:cl(cx+(R()-.5)*cw*.25,mg*2,W-mg*2),y:cl(cy+(R()-.5)*ch*.25,mg*1.5,H-mg*1.5),rot:(R()-.5)*1.2+(R()<.5?0:Math.PI),s:.9+R()*.15,seed:R()*1e9|0})}
  return L.sort(byOrd)}
function renderTray(W,H,stage,list,ox){const c=mk(W,H),x=c.getContext("2d"),e=W*.035;
  x.drawImage(surface(W,H,{stage,edge:e,radius:e*1.4,scale:W/1000,ox:ox||0,oy:0}),0,0);
  if(list){const u=W/160;list.forEach(t=>drawTop(x,t,u));if(stage==="baked")bake(c,W/1000,ox||0,0)}return c}

/* a whole small tray pizza for the bestseller cards */
function renderWhole(tops,seed){const W=500,H=320,pad=30,R=mulberry(seed),list=[],n=tops.length===1?12:tops.length===2?7:tops.length===3?5:4,u=W/120;
  const pts=[];tops.forEach(type=>{for(let i=0;i<n;i++){let best=null,bd=-1;for(let k=0;k<30;k++){const px=W*(.1+R()*.8),py=H*(.12+R()*.76);let md=1e9;pts.forEach(q=>md=Math.min(md,Math.hypot(q[0]-px,q[1]-py)));if(md>bd){bd=md;best=[px,py]}}pts.push(best);
    list.push({type,x:best[0],y:best[1],rot:type==="peperoni"?(R()-.5)*1.4+(R()<.5?0:Math.PI):R()*TAU,s:type==="peperoni"?.75:type==="mushroom"?.6:type==="salami"?.9:1,seed:R()*1e9|0})}});
  const pz=mk(W,H),px=pz.getContext("2d"),e=W*.04;px.drawImage(surface(W,H,{stage:"baked",edge:e,radius:e*1.4,scale:W/700,ox:seed*13,oy:0}),0,0);list.sort(byOrd).forEach(t=>drawTop(px,t,u));bake(pz,W/700,seed*13,0);
  const c=mk(W+pad*2,H+pad*2+20),x=c.getContext("2d");x.save();x.shadowColor="rgba(0,0,0,.6)";x.shadowBlur=26;x.shadowOffsetY=14;
  const g=x.createLinearGradient(0,0,0,H+pad*2);g.addColorStop(0,"#2e2c2b");g.addColorStop(1,"#121111");x.fillStyle=g;x.beginPath();x.roundRect?x.roundRect(6,6,W+pad*2-12,H+pad*2-12,18):x.rect(6,6,W+pad*2-12,H+pad*2-12);x.fill();x.restore();
  x.strokeStyle="rgba(255,255,255,.1)";x.lineWidth=2;x.strokeRect(9,9,W+pad*2-18,H+pad*2-18);x.fillStyle="#0c0b0b";x.fillRect(pad-8,pad-8,W+16,H+16);x.drawImage(pz,pad,pad);return c}
/* single square slice, like a piece cut from the tray */
function renderSlice(S,tops,seed){const c=mk(S),x=c.getContext("2d"),R=mulberry(seed);
  const tx=S*.08,ty=S*.1,tw=S*.84,th=S*.64,side=S*.11;
  x.save();x.shadowColor="rgba(0,0,0,.6)";x.shadowBlur=S*.07;x.shadowOffsetY=S*.05;x.fillStyle="#6b3a16";x.fillRect(tx+S*.01,ty+S*.05,tw-S*.02,th+side-S*.06);x.restore();
  let g=x.createLinearGradient(0,ty+th-S*.03,0,ty+th+side);g.addColorStop(0,"#c2452a");g.addColorStop(.14,"#e6b878");g.addColorStop(.6,"#d39a55");g.addColorStop(1,"#8a4f1e");x.fillStyle=g;
  x.beginPath();x.moveTo(tx,ty+th-S*.03);x.lineTo(tx+tw,ty+th-S*.03);for(let k=0;k<=12;k++)x.lineTo(tx+tw*(1-k/12),ty+th+side-S*.01+(R()-.5)*S*.014);x.closePath();x.fill();
  for(let k=0;k<34;k++){x.fillStyle=`rgba(${120+R()*40|0},${70+R()*20|0},25,${.3+R()*.35})`;x.beginPath();x.ellipse(tx+R()*tw,ty+th+S*.012+R()*side*.8,S*(.004+R()*.01),S*(.003+R()*.006),0,0,TAU);x.fill()}
  x.drawImage(surface(tw,th,{stage:"baked",edge:S*.075,edges:[1,0,0,1],radius:S*.06,scale:S/300,ox:R()*3000,oy:R()*3000}),tx,ty);
  x.strokeStyle="rgba(120,55,15,.35)";x.lineWidth=S*.008;x.beginPath();x.moveTo(tx+tw,ty+S*.01);x.lineTo(tx+tw,ty+th-S*.02);x.stroke();
  const u=S/58,list=[],per=tops.length===1?3:tops.length===2?2:1;let types=[];tops.forEach(t=>{for(let i=0;i<per;i++)types.push(t)});if(types.length<3)types.push(tops[0]);types=types.slice(0,6);
  types.forEach(type=>{let best=null,bd=-1;for(let k=0;k<40;k++){const px=tx+tw*(.2+R()*.66),py=ty+th*(.22+R()*.58);let md=1e9;list.forEach(q=>{md=Math.min(md,Math.hypot(q.x-px,q.y-py))});if(md>bd){bd=md;best=[px,py]}}
    list.push({type,x:best[0],y:best[1],rot:type==="peperoni"?(R()-.5)*1.2:R()*TAU,s:type==="peperoni"?.62:type==="salami"?.85:type==="mushroom"?.85:1,seed:R()*1e9|0})});
  list.sort(byOrd).forEach(t=>drawTop(x,t,u));
  const top=mk(tw,th),tt=top.getContext("2d");tt.drawImage(c,tx,ty,tw,th,0,0,tw,th);bake(top,S/300,0,0);x.drawImage(top,tx,ty);
  return c}

/* ---------- menu data (from the shop's board) ---------- */
const P=[
 {n:"Pizza Tonno",a:"A,G,D,4",d:"mit Thunfisch und Zwiebeln",p:[4.30,8.30],t:["tuna","onion"]},
 {n:"Pizza Salami",a:"A,G,3,4,5,9",d:"mit Rindersalami",p:[4.30,8.30],t:["salami"]},
 {n:"Pizza Mista",a:"A,G,3,4,5,9",d:"mit Champignons, Rindersalami, Putenschinken und Peperoni",p:[4.30,8.70],t:["ham","salami","mushroom","peperoni"]},
 {n:"Pizza Margherita",a:"A,G,4",d:"mit Tomatensauce und Käse",p:[4.20,7.30],t:["basil"]},
 {n:"Pizza Funghi",a:"A,G,4",d:"mit Champignons",p:[4.20,8.20],t:["mushroom"]},
 {n:"Pizza Vegetarisch",a:"A,G,4",d:"mit Broccoli, Champignons, Zwiebeln und Mais",p:[4.20,8.20],t:["broccoli","mushroom","onion","corn"]},
 {n:"Pizza Spinaci",a:"A,4",d:"mit Spinat und Gorgonzola",p:[4.20,8.20],t:["spinach","blue"]},
 {n:"Pizza Vier-Jahres-Zeiten",a:"A,G,3,4,5,9",d:"mit Champignons, Putenschinken, Oliven und Artischocken",p:[4.20,8.20],t:["ham","mushroom","artichoke","olive"]},
 {n:"Pizza Käse",a:"A,G,4",d:"mit Gorgonzola, Mozzarella, Edamer und Schafskäse",p:[4.30,8.70],t:["blue","feta"]},
 {n:"Pizza Peperoni",a:"A,G,4",d:"mit Peperoni",p:[4.20,7.70],t:["peperoni"]},
 {n:"Pizza Hawaii",a:"A,G,3,4,5,9",d:"mit Putenschinken und Ananas",p:[4.20,8.20],t:["ham","pineapple"]},
 {n:"Pizza Gorgonzola",a:"A,4",d:"mit frischen Cherrytomaten und Gorgonzola",p:[4.30,8.30],t:["tomato","blue"]},
 {n:"Pizza Napoli",a:"A,D,G,4",d:"mit Kapern, Oliven und Sardellen",p:[4.20,8.20],t:["anchovy","olive","caper"]},
 {n:"Pizza Sucuk",a:"A,G,3,4,5,9",d:"mit türkischer Knoblauchwurst",p:[4.70,8.70],t:["sucuk"]}
];
const DES=[["Pannacotta","C,4,6",2.50],["Tiramisu","C,4,6",2.80]];
const DRK=[["Wasser still","","0,50 l",1.50],["Wasser mit Kohlensäure","","0,25 l",1.60],["Coca Cola","1,11","0,33 l",2.00],["Coca Cola zero","1,6,11,12","0,33 l",2.00],["Fanta","1,3","0,33 l",2.00],["Mezzo Mix","11","0,33 l",2.00],["Sprite","","0,33 l",2.00],["Uludağ","","0,33 l",2.00],["Red Bull","1,11,13","0,25 l",2.50],["Capri Sun","","0,20 l",1.00],["Ayran","","0,25 l",1.50],["Durstlöscher","","0,50 l",1.50],["Multivitamin","","0,33 l",2.50],["Ice Tea","","0,33 l",2.50],["Rubinvitamin","","0,33 l",2.50],["Kaffee","11","0,20 l",2.00],["Berliner Kindl","","0,33 l",2.00],["Beck's","","0,33 l",2.00]];
const eur=v=>v.toFixed(2)+"€";
const thumbs=new Array(P.length).fill("");
let size="both";
function renderPizzas(){document.getElementById("pizzaList").innerHTML=P.map((x,i)=>{
  const pr=size==="20"?`${eur(x.p[0])}<small>Ø 20 cm</small>`:size==="28"?`${eur(x.p[1])}<small>Ø 28 cm</small>`:`${eur(x.p[0])} <span style="color:var(--muted)">/</span> ${eur(x.p[1])}<small>Ø 20 / 28 cm</small>`;
  return `<div class="item"><img class="thumb" id="th${i}" ${thumbs[i]?`src="${thumbs[i]}"`:""} alt="${x.n}" width="128" height="91"><div style="min-width:0"><h3>${x.n}<sup>${x.a}</sup></h3><p>${x.d}</p></div><div class="price">${pr}</div></div>`}).join("")}
renderPizzas();
document.getElementById("dessertList").innerHTML=DES.map(d=>`<div class="drink"><h3>${d[0]} <sup>${d[1]}</sup></h3><span class="vol"></span><span class="price">${eur(d[2])}</span></div>`).join("");
document.getElementById("drinkList").innerHTML=DRK.map(d=>`<div class="drink"><h3>${d[0]}${d[1]?` <sup>${d[1]}</sup>`:""}</h3><span class="vol">${d[2]}</span><span class="price">${eur(d[3])}</span></div>`).join("");

const best=[[1,"Klassiker","rgba(229,57,44,.30)"],[2,"Alles drauf","rgba(255,123,46,.28)"],[10,"Süß & salzig","rgba(244,194,79,.26)"],[13,"Würzig","rgba(69,178,75,.24)"]];
document.getElementById("bestGrid").innerHTML=best.map(([i,tag,glow])=>{const x=P[i];return `<div class="tilt reveal"><div class="card3d" style="--glow:${glow}"><span class="tag">${tag}</span><img id="bs${i}" alt="${x.n}" width="560" height="380"><h3>${x.n}</h3><p>${x.d}</p><span class="price">ab ${eur(x.p[0])}</span></div></div>`}).join("");
if(!RM)document.querySelectorAll(".card3d").forEach(card=>{card.addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const r=card.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateY(${nx*16}deg) rotateX(${-ny*16}deg)`});card.addEventListener("pointerleave",()=>{card.style.transform=""})});
document.querySelectorAll(".stars").forEach(s=>{s.innerHTML=Array(5).fill('<svg viewBox="0 0 24 24"><path d="M12 2l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z" fill="#f4c24f"/></svg>').join("")});
const words=["100 % Halal","Frisch vom Blech","Mini Pizza 3,00 €","Pizza ab 4,20 €","Hermannstraße 168","U-Bhf Alt-Mariendorf"];
const tk=words.map(w=>`<span>${w}</span>`).join("");document.getElementById("t1").innerHTML=tk+tk+tk+tk;document.getElementById("t2").innerHTML=tk+tk+tk+tk;

const tabs=[...document.querySelectorAll(".tab")],sizes=document.getElementById("sizes");
tabs.forEach(t=>t.addEventListener("click",()=>{tabs.forEach(o=>{o.setAttribute("aria-selected",o===t);document.getElementById(o.getAttribute("aria-controls")).hidden=o!==t});sizes.hidden=t.id!=="tab-pizza"}));
document.querySelectorAll(".size").forEach(b=>b.addEventListener("click",()=>{size=b.dataset.size;document.querySelectorAll(".size").forEach(o=>o.setAttribute("aria-pressed",o===b));renderPizzas()}));
const burger=document.getElementById("burger"),links=document.getElementById("links");
burger.addEventListener("click",()=>{const o=links.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{links.classList.remove("open");burger.setAttribute("aria-expanded","false")}));
document.addEventListener("click",e=>{if(links.classList.contains("open")&&!links.contains(e.target)&&!burger.contains(e.target)){links.classList.remove("open");burger.setAttribute("aria-expanded","false")}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&links.classList.contains("open")){links.classList.remove("open");burger.setAttribute("aria-expanded","false");burger.focus()}});
document.querySelectorAll(".copy[data-copy]").forEach(btn=>btn.addEventListener("click",()=>{const lab=btn.textContent,sel=()=>{const r=document.createRange();r.selectNodeContents(document.getElementById(btn.dataset.target));const g=getSelection();g.removeAllRanges();g.addRange(r);btn.textContent="Markiert"};
  try{navigator.clipboard.writeText(btn.dataset.copy).then(()=>{btn.textContent="Kopiert"},sel)}catch(e){sel()}setTimeout(()=>btn.textContent=lab,1800)}));
(function(){const el=document.getElementById("openNK");if(!el)return;const now=new Date(new Date().toLocaleString("en-US",{timeZone:"Europe/Berlin"})),h=now.getHours()+now.getMinutes()/60,open=h>=11&&h<23;
  el.classList.toggle("closed",!open);el.lastElementChild.textContent=open?"Jetzt geöffnet · bis 23:00":"Geschlossen · öffnet 11:00"})();

/* ================= HERO FILM ================= */
const TW=1024,TH=623,LIST=trayLayout(TW,TH,21);
const ST={};
function initFilm(){
  const cv=document.getElementById("film"),x=cv.getContext("2d"),hero=document.querySelector(".player");
  const CH=[["Teig ins Blech","Frischer Teig, von Hand ins Blech gedrückt."],["Tomatensauce","Fruchtige Sauce bis in die Ecken."],["Käse","Reichlich geriebener Käse."],["Belag","Rindersalami, Champignons, Peperoni."],["Ab in den Ofen","Bei bis zu 450 °C goldbraun gebacken."],["Fertig","Frisch vom Blech, Stück für Stück."]];
  const LEN=24;let cw=1,ch=1,S0=1,OX=0,OY=0;
  ST.dough=renderTray(TW,TH,"dough",null);
  const stone=mk(480,270);{const t=stone.getContext("2d"),im=t.createImageData(480,270),d=im.data;for(let y=0;y<270;y++)for(let X=0;X<480;X++){const n=NZ.fbm(X/40+500,y/40,3),f=hash(X,y);const v=18+n*26+(f>.93?10:0),i=(y*480+X)*4;d[i]=v+7;d[i+1]=v+3;d[i+2]=v;d[i+3]=255}t.putImageData(im,0,0)}
  const bricks=mk(960,540);{const t=bricks.getContext("2d"),R=mulberry(8);t.fillStyle="#170d09";t.fillRect(0,0,960,540);for(let row=0;row<17;row++)for(let col=-1;col<12;col++){const bx=col*88+(row%2)*44,by=row*34;t.fillStyle=`rgb(${66+R()*30|0},${30+R()*14|0},${20+R()*10|0})`;t.fillRect(bx+3,by+3,82,28)}}
  const Rq=mulberry(55);
  const shreds=Array.from({length:260},()=>({x:160+Rq()*960,y:68+Rq()*584,t0:.2+Rq()*2.8,rot:Rq()*3.14,c:Rq()<.5?"#fcf3d4":"#f1dfa6"}));
  const flour=Array.from({length:80},()=>({x:Rq()*1280,y:Rq()*720,v:10+Rq()*30,r:1+Rq()*2.5,ph:Rq()*TAU}));
  const arch=new Path2D();arch.moveTo(90,700);arch.lineTo(90,330);arch.ellipse(640,330,550,270,0,Math.PI,0);arch.lineTo(1190,700);arch.closePath();
  function resize(){const dpr=Math.min(window.devicePixelRatio||1,1.6);cw=Math.max(1,Math.round(hero.clientWidth*dpr));ch=Math.max(1,Math.round(hero.clientHeight*dpr));cv.width=cw;cv.height=ch;
    S0=Math.min(cw*.95/1080,ch*.84/700);OX=cw/2-640*S0;OY=ch*.52-370*S0;
    frame(T)}
  const id=()=>x.setTransform(1,0,0,1,0,0),sub=()=>x.setTransform(S0,0,0,S0,OX,OY);
  function cover(img,z=1){const s=Math.max(cw/img.width,ch/img.height)*z,w=img.width*s,h=img.height*s;x.drawImage(img,(cw-w)/2,(ch-h)/2,w,h)}
  function rr(X,Y,W,H,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+W,Y,X+W,Y+H,r);x.arcTo(X+W,Y+H,X,Y+H,r);x.arcTo(X,Y+H,X,Y,r);x.arcTo(X,Y,X+W,Y,r);x.closePath()}
  function tray(){x.save();x.shadowColor="rgba(0,0,0,.6)";x.shadowBlur=50;x.shadowOffsetY=24;const g=x.createLinearGradient(0,50,0,690);g.addColorStop(0,"#2c2a29");g.addColorStop(1,"#131212");x.fillStyle=g;rr(130,40,1020,660,28);x.fill();x.restore();
    x.strokeStyle="rgba(255,255,255,.1)";x.lineWidth=3;rr(132,42,1016,656,27);x.stroke();x.fillStyle="#0c0b0b";rr(152,60,976,600,14);x.fill()}
  function ladle(px,py){x.save();x.strokeStyle="#b9bec4";x.lineWidth=14;x.lineCap="round";x.shadowColor="rgba(0,0,0,.45)";x.shadowBlur=20;x.shadowOffsetX=14;x.shadowOffsetY=10;x.beginPath();x.moveTo(px+30,py-20);x.lineTo(px+460,py-420);x.stroke();
    const g=x.createRadialGradient(px-12,py-12,4,px,py,56);g.addColorStop(0,"#f2f4f6");g.addColorStop(.6,"#a7adb4");g.addColorStop(1,"#6b7178");x.fillStyle=g;x.beginPath();x.arc(px,py,54,0,TAU);x.fill();x.restore();
    x.fillStyle="#a8221a";x.beginPath();x.ellipse(px-2,py-2,40,33,0,0,TAU);x.fill()}
  const IR=[160,68,960,584];
  function frame(T){
    const c=Math.min(5,Math.floor(T/4)),lt=T-c*4;x.globalAlpha=1;id();
    if(c<4){cover(stone);sub();tray()}
    if(c===0){const sp=ease(clamp((lt-.3)/2.8)),w=IR[2]*(.32+.68*sp),h=IR[3]*(.34+.66*sp),wob=1+.03*Math.sin(lt*8)*(1-sp);
      x.save();x.shadowColor="rgba(0,0,0,.4)";x.shadowBlur=24;x.shadowOffsetY=10;x.drawImage(ST.dough,640-w*wob/2,370-h/wob/2,w*wob,h/wob);x.restore();
      x.fillStyle="rgba(255,250,240,.55)";flour.forEach(f=>{let fy=(f.y-T*f.v)%720;if(fy<0)fy+=720;x.beginPath();x.arc(f.x+Math.sin(T+f.ph)*20,fy,f.r,0,TAU);x.fill()})}
    else if(c===1){x.drawImage(ST.dough,...IR);if(ST.sauce){const P4=ease(clamp(lt/3.4))*4;x.save();x.beginPath();let hx=0,hy=0;
        for(let r=0;r<4;r++){const rp=clamp(P4-r);if(rp<=0)break;const ry=IR[1]+r*IR[3]/4-6,rh=IR[3]/4+12,rw=IR[2]*rp;if(r%2===0){x.rect(IR[0],ry,rw,rh);hx=IR[0]+rw}else{x.rect(IR[0]+IR[2]-rw,ry,rw,rh);hx=IR[0]+IR[2]-rw}hy=ry+rh/2}
        x.clip();x.drawImage(ST.sauce,...IR);x.restore();if(lt<3.5&&P4>0)ladle(hx,hy)}}
    else if(c===2){x.drawImage(ST.sauce||ST.dough,...IR);if(ST.raw){x.globalAlpha=ease(clamp((lt-.4)/3));x.drawImage(ST.raw,...IR);x.globalAlpha=1}
      shreds.forEach(s=>{const q=(lt-s.t0)/.5;if(q<=0||q>=1)return;x.save();x.translate(s.x,s.y-(1-q*q)*520);x.rotate(s.rot+q*3);x.fillStyle=s.c;x.fillRect(-9,-2,18,4);x.restore()})}
    else if(c===3){x.drawImage(ST.raw||ST.sauce||ST.dough,...IR);x.save();x.translate(IR[0],IR[1]);x.scale(IR[2]/TW,IR[3]/TH);const u=TW/160,N=LIST.length;
      LIST.forEach((t,i)=>{const q=clamp((lt-.15-i/N*3)/.4);if(q<=0)return;drawTop(x,t,u,{dy:-(1-easeBack(q))*150,sc:1+(1-q)*.6,a:clamp(q*2)})});x.restore()}
    else if(c===4){cover(bricks);sub();
      x.save();x.shadowColor="rgba(0,0,0,.85)";x.shadowBlur=40;let g=x.createRadialGradient(640,480,40,640,480,560);g.addColorStop(0,"#4a1a08");g.addColorStop(1,"#120503");x.fillStyle=g;x.fill(arch);x.restore();
      x.lineWidth=26;x.strokeStyle="#5a2a1a";x.stroke(arch);
      x.save();x.clip(arch);x.globalCompositeOperation="lighter";
      for(let k=0;k<26;k++){const fx=140+k*40+Math.sin(T*2+k)*6,h=150+70*Math.sin(T*5+k*1.7)+40*Math.sin(T*9.3+k*2.1),by=420;
        g=x.createLinearGradient(0,by,0,by-h);g.addColorStop(0,"rgba(255,235,160,.85)");g.addColorStop(.45,"rgba(255,130,30,.6)");g.addColorStop(1,"rgba(200,40,10,0)");x.fillStyle=g;
        x.beginPath();x.moveTo(fx-28,by);x.quadraticCurveTo(fx-32,by-h*.5,fx+Math.sin(T*6+k)*10,by-h);x.quadraticCurveTo(fx+32,by-h*.5,fx+28,by);x.fill()}
      g=x.createRadialGradient(640,520,30,640,520,520);g.addColorStop(0,"rgba(255,120,40,.4)");g.addColorStop(1,"rgba(255,120,40,0)");x.fillStyle=g;x.fillRect(0,0,1280,720);x.restore();
      const sl=ease(clamp(lt/1.1)),oy=900-(900-560)*sl;
      x.save();x.translate(640,oy);x.scale(.8,.42);x.translate(-640,-370);tray();if(ST.rawFull)x.drawImage(ST.rawFull,...IR);if(ST.baked){x.globalAlpha=ease(clamp((lt-1.1)/2.3));x.drawImage(ST.baked,...IR)}x.restore();x.globalAlpha=1;
      const temp=Math.round(330+120*clamp(lt/3.4));x.font='64px "Share Tech Mono", monospace';x.textAlign="center";x.fillStyle="#ffb15a";x.shadowColor="rgba(255,120,30,.9)";x.shadowBlur=24;x.fillText(temp+" °C",640,150);x.shadowBlur=0}
    else{cover(stone);
      const showA=clamp((lt-2.1)/.6);
      if(showA<1&&imgB.complete&&imgB.naturalWidth){sub();const z=1+lt*.02,w0=imgB.naturalWidth,h0=imgB.naturalHeight,k=Math.min(1060/h0,700/w0);x.save();x.translate(640,370);x.scale(z,z);x.rotate(-Math.PI/2);x.shadowColor="rgba(0,0,0,.6)";x.shadowBlur=50;x.shadowOffsetX=-24;x.drawImage(imgB,-w0*k/2,-h0*k/2,w0*k,h0*k);x.restore()}
      if(showA>0&&imgA.complete&&imgA.naturalWidth){sub();const z=1+(lt-2.1)*.02,k=1060/imgA.naturalWidth,w=imgA.naturalWidth*k*z,h=imgA.naturalHeight*k*z;x.globalAlpha=showA;x.save();x.beginPath();x.moveTo(640-w/2+24,370-h/2);x.arcTo(640+w/2,370-h/2,640+w/2,370+h/2,24);x.arcTo(640+w/2,370+h/2,640-w/2,370+h/2,24);x.arcTo(640-w/2,370+h/2,640-w/2,370-h/2,24);x.arcTo(640-w/2,370-h/2,640+w/2,370-h/2,24);x.closePath();x.clip();x.drawImage(imgA,640-w/2,370-h/2,w,h);x.restore();x.globalAlpha=1}}
    id();const vg=x.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*.35,cw/2,ch/2,Math.max(cw,ch)*.75);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,.55)");x.fillStyle=vg;x.fillRect(0,0,cw,ch);
    const fade=Math.max(0,1-lt/.3,(lt-3.7)/.3);if(fade>0){x.fillStyle=`rgba(0,0,0,${fade})`;x.fillRect(0,0,cw,ch)}
  }
  const stories=document.getElementById("stories");
  stories.innerHTML=CH.map((c,i)=>`<button data-i="${i}" aria-label="Schritt ${i+1}: ${c[0]}"><span class="seg"><i></i></span><span class="l">${c[0]}</span></button>`).join("");
  const btns=[...stories.querySelectorAll("button")],fills=btns.map(b=>b.querySelector("i"));
  const nowStep=document.getElementById("nowStep"),nowTitle=document.getElementById("nowTitle"),playBtn=document.getElementById("playBtn"),icoPlay=document.getElementById("icoPlay"),icoPause=document.getElementById("icoPause");
  let T=RM?23:0,playing=!RM,inView=true,last=0,cur=-1,raf=0;
  function ui(){const c=Math.min(5,Math.floor(T/4));fills.forEach((f,i)=>f.style.width=(i<c?100:i===c?(T-c*4)/4*100:0)+"%");
    if(c!==cur){cur=c;nowStep.textContent=`SCHRITT ${c+1} / 6`;nowTitle.textContent=CH[c][0];btns.forEach((b,i)=>b.classList.toggle("on",i===c))}}
  function tick(now){raf=0;const dt=Math.min(.1,(now-last)/1000);last=now;if(playing&&inView)T=(T+dt)%LEN;frame(T);ui();if(playing&&inView)raf=requestAnimationFrame(tick)}
  function kick(){if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}}
  function setPlay(p){playing=p;icoPlay.hidden=p;icoPause.hidden=!p;playBtn.setAttribute("aria-label",p?"Pause":"Abspielen");kick()}
  playBtn.addEventListener("click",()=>setPlay(!playing));
  btns.forEach(b=>b.addEventListener("click",()=>{T=+b.dataset.i*4+.31;kick()}));
  if("IntersectionObserver" in window)new IntersectionObserver(es=>{inView=es[0].isIntersecting;if(inView)kick()},{threshold:.1}).observe(hero);
  if(window.ResizeObserver)new ResizeObserver(resize).observe(hero);else addEventListener("resize",resize);
  resize();setPlay(playing);ui();
  imgA.onload=imgB.onload=()=>frame(T);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>frame(T));
}
try{initFilm()}catch(e){console.error(e)}

/* ---------- staged rendering so the page stays responsive ---------- */
const queue=[
  ()=>{ST.baked=renderTray(TW,TH,"baked",LIST)},
  ()=>{try{init3D()}catch(e){console.error(e)}},
  ()=>{ST.sauce=renderTray(TW,TH,"sauce",null)},
  ()=>{ST.raw=renderTray(TW,TH,"raw",null);const c=mk(TW,TH),x=c.getContext("2d");x.drawImage(ST.raw,0,0);const u=TW/160;LIST.forEach(t=>drawTop(x,t,u));ST.rawFull=c},
  ...best.map(([i])=>()=>{const el=document.getElementById("bs"+i);if(el)el.src=renderWhole(P[i].t,i*37+11).toDataURL()}),
  ...P.map((p,i)=>()=>{const w=renderWhole(p.t,i*37+11),sm=mk(280,200);sm.getContext("2d").drawImage(w,0,0,280,200);thumbs[i]=sm.toDataURL();const el=document.getElementById("th"+i);if(el)el.src=thumbs[i]})
];
(function run(){const f=queue.shift();if(!f)return;try{f()}catch(e){console.error(e)}later(run)})();

/* ================= 3D TRAY ================= */
function init3D(){
  const stage=document.getElementById("stage3d"),canvas=document.getElementById("tray3d");
  const fallback=()=>{const im=new Image();im.src=IMG_B;im.className="fallback";im.alt="Blechpizza";stage.insertBefore(im,stage.firstChild);canvas.remove()};
  if(!THREE||!ST.baked)return fallback();
  let renderer;try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});if(!renderer.getContext())throw 0}catch(e){return fallback()}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(34,4/3,.1,100);cam.position.set(0,5.4,6.4);cam.lookAt(0,-.3,0);
  scene.add(new THREE.HemisphereLight(0xfff1dc,0x2a1206,.8));
  const key=new THREE.DirectionalLight(0xfff0dc,1.35);key.position.set(3,7,3.5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-4,right:4,top:4,bottom:-4,near:1,far:20});key.shadow.bias=-.0015;scene.add(key);
  const ember=new THREE.PointLight(0xff6a1e,2.2,14,2);ember.position.set(-3.4,1.2,-1.8);scene.add(ember);
  const rim=new THREE.DirectionalLight(0xffa860,.8);rim.position.set(-4,2.5,-5);scene.add(rim);
  const aniso=renderer.capabilities.getMaxAnisotropy(),tex=c=>{const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=aniso;return t};
  const group=new THREE.Group();scene.add(group);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity:.45}));floor.rotation.x=-Math.PI/2;floor.position.y=-.09;floor.receiveShadow=true;scene.add(floor);
  const steel=new THREE.MeshStandardMaterial({color:0x222020,roughness:.4,metalness:.55});
  const base=new THREE.Mesh(new THREE.BoxGeometry(4.5,.06,2.9),steel);base.position.y=-.06;base.castShadow=base.receiveShadow=true;group.add(base);
  [[4.5,.22,.06,0,1.42],[4.5,.22,.06,0,-1.42],[.06,.22,2.9,2.22,0],[.06,.22,2.9,-2.22,0]].forEach(a=>{const m=new THREE.Mesh(new THREE.BoxGeometry(a[0],a[1],a[2]),steel);m.position.set(a[3],.02,a[4]);m.castShadow=true;group.add(m)});
  const crust=mk(512,64);{const t=crust.getContext("2d"),R=mulberry(9);const g=t.createLinearGradient(0,0,0,64);g.addColorStop(0,"#d99a4e");g.addColorStop(.35,"#e9c48a");g.addColorStop(.8,"#c9894a");g.addColorStop(1,"#7a4418");t.fillStyle=g;t.fillRect(0,0,512,64);for(let i=0;i<400;i++){t.fillStyle=`rgba(${110+R()*50|0},60,20,${.2+R()*.4})`;t.beginPath();t.ellipse(R()*512,10+R()*50,1+R()*3,1+R()*2,0,0,TAU);t.fill()}}
  const cm=new THREE.MeshStandardMaterial({map:tex(crust),roughness:.85}),topM=new THREE.MeshStandardMaterial({map:tex(ST.baked),roughness:.5});
  const slab=new THREE.Mesh(new THREE.BoxGeometry(4.34,.2,2.64),[cm,cm,topM,cm,cm,cm]);slab.position.y=.07;slab.castShadow=slab.receiveShadow=true;group.add(slab);
  const sprite=(type,S,u,seed)=>{const c=mk(S),x=c.getContext("2d");x.translate(S/2,S/2);DR[type](x,u,mulberry(seed));return c};
  const plane=new THREE.PlaneGeometry(1,1),pm=(t,u)=>new THREE.MeshStandardMaterial({map:tex(sprite(t,256,u,3)),transparent:true,alphaTest:.3,side:THREE.DoubleSide,roughness:.5});
  const mats={basil:pm("basil",256/22),mushroom:pm("mushroom",256/22),peperoni:pm("peperoni",256/40),salami:pm("salami",256/20)};
  const tomatoMat=new THREE.MeshStandardMaterial({color:0xd12a18,roughness:.22}),stemMat=new THREE.MeshStandardMaterial({color:0x3f8a2a,roughness:.6});
  const floats=new THREE.Group();scene.add(floats);const R=mulberry(77),fl=[];
  for(let i=0;i<14;i++){const kind=["tomato","basil","mushroom","peperoni","salami"][i%5];let m;
    if(kind==="tomato"){m=new THREE.Group();const s=new THREE.Mesh(new THREE.SphereGeometry(.18,32,24),tomatoMat);s.castShadow=true;m.add(s);const st=new THREE.Mesh(new THREE.ConeGeometry(.06,.05,5),stemMat);st.position.y=.18;m.add(st)}
    else{m=new THREE.Mesh(plane,mats[kind]);m.scale.setScalar(kind==="peperoni"?.9:.55)}
    m.userData={a:i/14*TAU+R()*.3,rad:3.2+R()*.8,h:.5+R()*1.7,sp:.6+R()*.8,ph:R()*TAU,rs:[(R()-.5)*1.4,(R()-.5)*1.4]};floats.add(m);fl.push(m)}
  const sc=mk(128),sx=sc.getContext("2d"),sg=sx.createRadialGradient(64,64,0,64,64,64);sg.addColorStop(0,"rgba(255,255,255,.55)");sg.addColorStop(1,"rgba(255,255,255,0)");sx.fillStyle=sg;sx.fillRect(0,0,128,128);
  const stT=new THREE.CanvasTexture(sc),steam=[];for(let i=0;i<18;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:stT,transparent:true,depthWrite:false}));s.userData={ph:i/18,x:(R()-.5)*3.6,z:(R()-.5)*2};scene.add(s);steam.push(s)}
  function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);cam.aspect=w/h;cam.position.set(0,5.6,w/h<1.2?7.4:6.4);cam.lookAt(0,-.3,0);cam.updateProjectionMatrix()}
  resize();if(window.ResizeObserver)new ResizeObserver(resize).observe(stage);
  let rotY=-.5,vel=0,drag=false,lx=0,tx=0,tz=0,ttx=0,ttz=0,visible=false,raf=0;const t0=performance.now();let last=t0;
  stage.addEventListener("pointermove",e=>{const r=stage.getBoundingClientRect();ttz=-((e.clientX-r.left)/r.width-.5)*.2;ttx=((e.clientY-r.top)/r.height-.5)*.2;if(drag){vel=(e.clientX-lx)*.012;rotY+=vel;lx=e.clientX;kick()}});
  stage.addEventListener("pointerdown",e=>{drag=true;lx=e.clientX;try{stage.setPointerCapture(e.pointerId)}catch(_){}});
  ["pointerup","pointercancel"].forEach(ev=>stage.addEventListener(ev,()=>{drag=false}));stage.addEventListener("pointerleave",()=>{ttx=ttz=0});
  function loop(now){raf=0;const dt=Math.min(.05,(now-last)/1000);last=now;const T=(now-t0)/1000;
    if(!drag){rotY+=(RM?0:.18)*dt+vel*.6;vel*=.92}tx+=(ttx-tx)*.06;tz+=(ttz-tz)*.06;group.rotation.set(tx,rotY,tz);
    floats.rotation.y=-T*.08;fl.forEach(m=>{const d=m.userData;m.position.set(Math.cos(d.a)*d.rad,d.h+Math.sin(T*d.sp+d.ph)*.2,Math.sin(d.a)*d.rad*.8);m.rotation.x=T*d.rs[0];m.rotation.z=T*d.rs[1]});
    steam.forEach(s=>{const d=s.userData,k=(T*.18+d.ph)%1;s.position.set(d.x+Math.sin(T+d.ph*9)*.15,.3+k*2.4,d.z);s.scale.setScalar(.5+k*1.5);s.material.opacity=Math.sin(k*Math.PI)*.2});
    ember.intensity=2+Math.sin(T*3.1)*.25+Math.sin(T*7.3)*.15;renderer.render(scene,cam);
    if(visible&&(!RM||drag))raf=requestAnimationFrame(loop)}
  function kick(){if(!raf){last=performance.now();raf=requestAnimationFrame(loop)}}
  if("IntersectionObserver" in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)kick()}).observe(stage);else{visible=true}
  kick();
}

}
