export function initMagneticButtons() {
  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      const translateX = Math.max(-8, Math.min(8, x * 0.12));
      const translateY = Math.max(-6, Math.min(6, y * 0.12));
      btn.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}
