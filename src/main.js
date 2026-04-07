import './styles/main.css';
import { site } from './data/site.js';
import { renderSite } from './render.js';
import { initLoader } from './features/loader.js';
import { initParticles } from './features/particles.js';
import { initTypewriter } from './features/typewriter.js';
import { initReveal } from './features/reveal.js';
import { initProjectCards } from './features/projectCards.js';
import { initNav } from './features/nav.js';
import { initMagneticButtons } from './features/magnetic.js';
import { initGitHubActivity } from './features/githubActivity.js';

function initFieldLogClock() {
  const clockEl = document.getElementById('fieldLogClock');
  if (!clockEl) return;

  const formatter = new Intl.DateTimeFormat('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  });

  const update = () => {
    clockEl.textContent = formatter.format(new Date());
  };

  update();
  window.setInterval(update, 60_000);
}

renderSite(site);
initReveal();
initProjectCards();
initNav();
initMagneticButtons();
initParticles();
initTypewriter(site.typewriterPhrases);
initGitHubActivity(site);
initFieldLogClock();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

window.addEventListener('load', () => {
  initLoader(site);
});
