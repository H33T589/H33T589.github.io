// === Fade-in ===
const fadeElems = document.querySelectorAll('.fade-in');
function onScrollFade(){ fadeElems.forEach(el=>{ const r=el.getBoundingClientRect(); if(r.top<innerHeight-80) el.style.animationPlayState='running'; }); }
addEventListener('scroll', onScrollFade,{passive:true}); addEventListener('load', onScrollFade);

// === 3D Tilt ===
document.querySelectorAll('.tilt').forEach(card=>{
  const s=10;
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width;
    const y=(e.clientY-r.top)/r.height;
    const rx=(0.5-y)*s, ry=(x-0.5)*s;
    card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.setProperty('--mx',`${x*100}%`);
    card.style.setProperty('--my',`${y*100}%`);
  });
  card.addEventListener('mouseleave',()=>card.style.transform='rotateX(0deg) rotateY(0deg)');
});

// === Parallax Hero ===
const hero=document.querySelector('.hero'), heroBg=document.querySelector('.hero-bg');
if(hero&&heroBg){
  hero.addEventListener('mousemove',e=>{
    const r=hero.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    heroBg.style.transform=`rotateX(${y*-6}deg) rotateY(${x*6}deg)`;
  });
  hero.addEventListener('mouseleave',()=>heroBg.style.transform='rotateX(0deg) rotateY(0deg)');
}

// === Reality Drift (scroll parallax) ===
addEventListener('scroll',()=>{
  const y=window.scrollY||window.pageYOffset;
  document.querySelectorAll('.hero-bg .layer').forEach((l,i)=>{
    const s=(i+1)*0.05;
    l.style.transform=`translate(-50%, calc(-50% + ${y*s*-1}px)) rotate(${(i*10)-12}deg) translateZ(${-(i+1)*100}px)`;
  });
},{passive:true});

// === Quantum Collapse ===
const heroTitle=document.querySelector('.hero h1');
if(heroTitle&&heroBg){
  heroTitle.addEventListener('dblclick',e=>{
    heroBg.querySelectorAll('.layer').forEach(l=>{
      l.style.transition='all 0.6s ease';
      l.style.transform='translate(-50%, -50%) scale(0.1)';
      l.style.opacity='0.1';
      l.style.filter='blur(20px)';
    });
    const flash=document.createElement('div');
    flash.className='collapse-flash';
    flash.style.left=`${e.clientX}px`; flash.style.top=`${e.clientY}px`;
    document.body.appendChild(flash);
    setTimeout(()=>{
      heroBg.querySelectorAll('.layer').forEach((l,i)=>{
        l.style.transition='all 1.5s ease-out';
        const z=-(i+1)*100, a=(i*10)-12;
        l.style.transform=`translate(-50%, -50%) rotate(${a}deg) translateZ(${z}px) scale(1)`;
        l.style.opacity=i===2?0.14:0.18; l.style.filter='blur(30px)';
      });
      flash.remove();
    },1200);
  });
}

// === Floating Cyan Particles ===
(function(){
  const c=document.getElementById('particle-canvas');
  if(!c) return;
  const ctx=c.getContext('2d');
  let w=c.width=innerWidth, h=c.height=innerHeight;
  let particles=[];
  const count=60;
  function reset(p){
    p.x=Math.random()*w;
    p.y=Math.random()*h;
    p.r=1+Math.random()*2;
    p.alpha=0.25+Math.random()*0.25;
    p.speed=0.2+Math.random()*0.4;
  }
  for(let i=0;i<count;i++){let p={};reset(p);particles.push(p);}
  addEventListener('resize',()=>{w=c.width=innerWidth;h=c.height=innerHeight;});
  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#0b0d11';
    particles.forEach(p=>{
      p.y-=p.speed;
      if(p.y<-10) p.y=h+10;
      ctx.beginPath();
      const g=ctx.create
