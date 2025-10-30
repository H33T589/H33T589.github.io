// === Fade-in on scroll ===
const fadeElems = document.querySelectorAll('.fade-in');
function onScrollFade(){
  fadeElems.forEach(el=>{
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight - 80) el.style.animationPlayState = 'running';
  });
}
addEventListener('scroll', onScrollFade, { passive: true });
addEventListener('load', onScrollFade);

// === 3D Tilt Cards ===
document.querySelectorAll('.tilt').forEach(card=>{
  const strength = 10;
  card.addEventListener('mousemove', e=>{
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * strength;
    const ry = (x - 0.5) * strength;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', ()=> {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

// === Parallax Hero (mouse) ===
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
if (hero && heroBg) {
  hero.addEventListener('mousemove', e=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroBg.style.transform = `rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  });
  hero.addEventListener('mouseleave', ()=>{
    heroBg.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

// === Reality Drift (inverse parallax on scroll) ===
addEventListener('scroll', ()=>{
  const y = window.scrollY || window.pageYOffset;
  document.querySelectorAll('.hero-bg .layer').forEach((layer, i)=>{
    const speed = (i + 1) * 0.05;
    const angle = (i * 10) - 12;
    const z = -(i + 1) * 100;
    layer.style.transform =
      `translate(-50%, calc(-50% + ${y * speed * -1}px)) rotate(${angle}deg) translateZ(${z}px)`;
  });
}, { passive: true });

// === Quantum Collapse (cinematic white flash at click location) ===
const heroTitle = document.querySelector('.hero h1');
if (heroTitle && heroBg) {
  heroTitle.addEventListener('dblclick', e=>{
    // compress aurora
    heroBg.querySelectorAll('.layer').forEach(layer=>{
      layer.style.transition = 'all 0.6s ease';
      layer.style.transform  = 'translate(-50%, -50%) scale(0.1)';
      layer.style.opacity    = '0.1';
      layer.style.filter     = 'blur(20px)';
    });

    // white flash at click (viewport coords)
    const flash = document.createElement('div');
    flash.className = 'collapse-flash';
    flash.style.left = `${e.clientX}px`;
    flash.style.top  = `${e.clientY}px`;
    document.body.appendChild(flash);

    // restore aurora
    setTimeout(()=>{
      heroBg.querySelectorAll('.layer').forEach((layer,i)=>{
        layer.style.transition = 'all 1.5s ease-out';
        const z = -(i + 1) * 100;
        const angle = (i * 10) - 12;
        layer.style.transform =
          `translate(-50%, -50%) rotate(${angle}deg) translateZ(${z}px) scale(1)`;
        layer.style.opacity = (i === 2 ? 0.14 : 0.18);
        layer.style.filter  = 'blur(30px)';
      });
      flash.remove();
    }, 1200);
  });
}

// === Global aurora glow trail (subtle additive stamps) ===
(function(){
  const c = document.getElementById('fx-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth;
  let h = c.height = innerHeight;
  const trail = [];
  const maxTrail = 25;
  let lastScrollY = pageYOffset;

  addEventListener('resize', ()=>{ w = c.width = innerWidth; h = c.height = innerHeight; });

  function addStamp(y){
    const dy = pageYOffset - lastScrollY;
    const x = w / 2 + dy * 2;
    trail.push({ x, y, r: 120, alpha: 0.22 });
    if (trail.length > maxTrail) trail.shift();
    lastScrollY = pageYOffset;
  }

  function draw(){
    ctx.fillStyle = 'rgba(10,6,18,0.14)';
    ctx.fillRect(0,0,w,h);
    ctx.globalCompositeOperation = 'lighter';
    for (const t of trail) {
      const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r);
      g.addColorStop(0,   `rgba(94,161,255,${t.alpha})`);
      g.addColorStop(0.6, `rgba(0,188,212,${t.alpha * 0.8})`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      ctx.fill();
      t.alpha *= 0.96;
      t.r     *= 0.996;
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
  addEventListener('load', ()=> addStamp(scrollY + innerHeight * 0.5));
  addEventListener('scroll', ()=> addStamp(scrollY + innerHeight * 0.5), { passive: true });
})();

// === Smooth & slow cyan particles behind content ===
(function(){
  const c = document.getElementById('particle-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth;
  let h = c.height = innerHeight;

  const COUNT = 60;
  const particles = [];

  function reset(p){
    p.x = Math.random() * w;
    p.y = Math.random() * h;
    p.r = 1 + Math.random() * 2;
    p.alpha = 0.25 + Math.random() * 0.25;
    p.speed = 0.2 + Math.random() * 0.35; // slow & smooth
    p.wind  = (Math.random() - 0.5) * 0.15; // tiny horizontal drift
  }

  for (let i = 0; i < COUNT; i++) {
    const p = {};
    reset(p);
    particles.push(p);
  }

  addEventListener('resize', ()=>{
    w = c.width = innerWidth;
    h = c.height = innerHeight;
  });

  function draw(){
    ctx.clearRect(0,0,w,h);
    for (const p of particles) {
      p.y -= p.speed;
      p.x += p.wind;

      // wrap
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      // soft cyan/sapphire glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 80);
      grad.addColorStop(0,   `rgba(94,161,255,${p.alpha})`);
      grad.addColorStop(0.6, `rgba(0,188,212,${p.alpha * 0.8})`);
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2 + p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
