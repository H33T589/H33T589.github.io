// === Fade-in on scroll ===
const fadeElems = document.querySelectorAll('.fade-in');
function onScrollFade(){
  fadeElems.forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < innerHeight - 80) el.style.animationPlayState = 'running';
  });
}
addEventListener('scroll', onScrollFade, {passive:true});
addEventListener('load', onScrollFade);

// === 3D Tilt Cards ===
document.querySelectorAll('.tilt').forEach(card=>{
  const strength = 10;
  card.addEventListener('mousemove', e=>{
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width;
    const y = (e.clientY - rect.top)/rect.height;
    const rx = (0.5 - y) * strength;
    const ry = (x - 0.5) * strength;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.setProperty('--mx', `${x*100}%`);
    card.style.setProperty('--my', `${y*100}%`);
  });
  card.addEventListener('mouseleave', ()=>card.style.transform='rotateX(0deg) rotateY(0deg)');
});

// === Parallax Hero Mouse ===
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
if(hero && heroBg){
  hero.addEventListener('mousemove', e=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width - 0.5;
    const y = (e.clientY - rect.top)/rect.height - 0.5;
    heroBg.style.transform = `rotateX(${y*-6}deg) rotateY(${x*6}deg)`;
  });
  hero.addEventListener('mouseleave', ()=>heroBg.style.transform='rotateX(0deg) rotateY(0deg)');
}

// === Reality Drift: inverse scroll parallax ===
addEventListener('scroll', ()=>{
  const scrollY = window.scrollY || window.pageYOffset;
  const layers = document.querySelectorAll('.hero-bg .layer');
  layers.forEach((layer, i)=>{
    const speed = (i+1) * 0.05; // subtle difference per layer
    layer.style.transform = `translate(-50%, calc(-50% + ${scrollY * speed * -1}px)) rotate(${(i*10)-12}deg) translateZ(${-(i+1)*100}px)`;
  });
},{passive:true});

// === Quantum Collapse Effect ===
const heroTitle = document.querySelector('.hero h1');
if(heroTitle && heroBg){
  heroTitle.addEventListener('dblclick', e=>{
    // Step 1: compress aurora layers toward center
    heroBg.classList.add('collapse-phase');
    heroBg.querySelectorAll('.layer').forEach(l=>{
      l.style.transition = 'all 0.6s ease';
      l.style.transform = 'translate(-50%, -50%) scale(0.1)';
      l.style.opacity = '0.1';
      l.style.filter = 'blur(20px)';
    });

    // Step 2: create flash at click position
    const flash = document.createElement('div');
    flash.className = 'collapse-flash';
    flash.style.left = `${e.clientX}px`;
    flash.style.top = `${e.clientY}px`;
    document.body.appendChild(flash);

    // Step 3: restore aurora layers after flash
    setTimeout(()=>{
      heroBg.querySelectorAll('.layer').forEach((l,i)=>{
        l.style.transition = 'all 1.5s ease-out';
        const z = -(i+1)*100;
        const angle = (i*10)-12;
        l.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateZ(${z}px) scale(1)`;
        l.style.opacity = i===2?0.14:0.18;
        l.style.filter = 'blur(30px)';
      });
      flash.remove();
    },1200);
  });
}

// === Glow Trail Canvas ===
(function(){
  const c = document.getElementById('fx-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth;
  let h = c.height = innerHeight;
  const trail = [];
  const maxTrail = 25;
  let lastScrollY = pageYOffset;

  addEventListener('resize', ()=>{w=c.width=innerWidth; h=c.height=innerHeight;});

  function addStamp(y){
    const dy = pageYOffset - lastScrollY;
    const x = w/2 + dy*2;
    trail.push({x, y, r: 120, alpha: 0.22});
    if(trail.length > maxTrail) trail.shift();
    lastScrollY = pageYOffset;
  }

  function draw(){
    ctx.fillStyle = 'rgba(10,6,18,0.14)';
    ctx.fillRect(0,0,w,h);
    ctx.globalCompositeOperation = 'lighter';
    for(let t of trail){
      const g = ctx.createRadialGradient(t.x,t.y,0,t.x,t.y,t.r);
      g.addColorStop(0,`rgba(94,161,255,${t.alpha})`);
      g.addColorStop(0.45,`rgba(0,188,212,${t.alpha*0.8})`);
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;
      ctx.beginPath(); ctx.arc(t.x,t.y,t.r,0,Math.PI*2); ctx.fill();
      t.alpha*=0.96; t.r*=0.996;
    }
    ctx.globalCompositeOperation='source-over';
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  addEventListener('load', ()=>addStamp(scrollY+innerHeight*0.5));
  addEventListener('scroll', ()=>addStamp(scrollY+innerHeight*0.5),{passive:true});
})();
