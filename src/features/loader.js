function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initLoader() {
  const bar = document.getElementById('loaderBar');
  const status = document.getElementById('loaderStatus');
  const loader = document.getElementById('loader');
  if (!bar || !status || !loader) return;

  if (prefersReducedMotion()) {
    bar.style.width = '100%';
    status.textContent = 'System Ready.';
    loader.classList.add('loaded');
    loader.setAttribute('aria-busy', 'false');
    return;
  }

  const messages = [
    'Loading core modules...',
    'Initializing quantum states...',
    'Optimizing render pipeline...',
    'System Ready.',
  ];

  let progress = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;

    bar.style.width = `${progress}%`;

    if (progress > 25 && msgIndex === 0) {
      status.textContent = messages[1];
      msgIndex++;
    }
    if (progress > 60 && msgIndex === 1) {
      status.textContent = messages[2];
      msgIndex++;
    }
    if (progress === 100) {
      status.textContent = messages[3];
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('loaded');
        loader.setAttribute('aria-busy', 'false');
      }, 500);
    }
  }, 150);
}
