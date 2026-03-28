function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const styles = getComputedStyle(document.documentElement);
  const particleFillRgb = styles.getPropertyValue('--particle-fill-rgb').trim() || '47, 108, 99';
  const particleLineRgb = styles.getPropertyValue('--particle-line-rgb').trim() || '111, 148, 113';

  let width;
  let height;
  let particles = [];
  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleFillRgb}, 0.42)`;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0 && distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 3;
          const directionY = forceDirectionY * force * 3;
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      this.draw();
    }
  }

  function initParticles() {
    particles = [];
    const numberOfParticles = (width * height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const distance =
          (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
          (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y);

        if (distance < (width / 7) * (height / 7)) {
          opacityValue = 1 - distance / 20000;
          ctx.strokeStyle = `rgba(${particleLineRgb}, ${opacityValue * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
    connectParticles();
  }

  window.addEventListener('resize', resize);
  resize();
  animateParticles();
}
