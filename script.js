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

// === 3D Tilt Cards with shine ===
const tiltCards = document.querySelectorAll('.tilt');
const tiltClamp = (n, min, max)=> Math.max(min, Math.min(max, n));

tiltCards.forEach(card=>{
  const strength = 10; // degrees
  function handleMove(e){
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0..1
    const y = (e.clientY - rect.top) / rect.height;   // 0..1
    const rx = tiltClamp((0.5 - y) * strength, -strength, strength);
    const ry = tiltClamp((x - 0.5) * strength, -strength, strength);
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.setProperty('--mx', `${x*100}%`);
    card.style.setProperty('--my', `${y*100}%`);
  }
  function reset(){ card.style.transform = 'rotateX(0deg) rotateY(0deg)' }
  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', reset);
});

// === Parallax Hero (mouse reactive) ===
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
if(hero && heroBg){
  hero.addEventListener('mousemove', (e)=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width - 0.5;
    const y = (e.clientY - rect.top)/rect.height - 0.5;
    const tiltX = y * -6;
    const tiltY = x * 6;
    heroBg.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  hero.addEventListener('mouseleave', ()=>{
    heroBg.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

// === Scroll-synced glow trail (canvas) ===
(function(){
  const c = document.getElementById('fx-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth;
  let h = c.height = innerHeight;
  const trail = [];
  const maxTrail = 30; // number of glow stamps kept
  let lastScrollY = pageYOffset;

  function onResize(){
    w = c.width = innerWidth;
    h = c.height = innerHeight;
  }
  addEventListener('resize', onResize);

  function addStamp(y){
    // center x; slight horizontal drift based on scroll delta
    const dy = pageYOffset - lastScrollY;
    const x = w/2 + dy * 2; // drift left/right with scroll direction
    trail.push({x, y, r: 140, alpha: 0.22});
    if(trail.length > maxTrail) trail.shift();
    lastScrollY = pageYOffset;
  }

  function draw(){
    // fade the whole canvas slightly to create motion blur
    ctx.fillStyle = 'rgba(10,6,18,0.14)';
    ctx.fillRect(0,0,w,h);

    // additive glow stamps
    ctx.globalCompositeOperation = 'lighter';
    for(let i=0;i<trail.length;i++){
      const t = trail[i];
      const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r);
      // purple-blue glow
      g.addColorStop(0, `rgba(168,117,255,${t.alpha})`);
      g.addColorStop(0.45, `rgba(138,160,255,${t.alpha*0.85})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r, 0, Math.PI*2);
      ctx.fill();

      // fade out each stamp over time
      t.alpha *= 0.96;
      t.r *= 0.996;
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }

  // seed the canvas background
  ctx.fillStyle = 'rgba(10,6,18,1)';
  ctx.fillRect(0,0,w,h);
  requestAnimationFrame(draw);

  // place a glow stamp at viewport center on load
  addEventListener('load', ()=> addStamp(scrollY + innerHeight*0.5));

  // on scroll, add a new glow following the viewport center
  addEventListener('scroll', ()=>{
    addStamp(scrollY + innerHeight*0.5);
  }, {passive:true});
})();
