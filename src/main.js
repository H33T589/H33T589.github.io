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
import { initTerminal } from './features/terminal.js';

renderSite(site);
initReveal();
initProjectCards();
initNav();
initMagneticButtons();
initParticles();
initTypewriter(site.typewriterPhrases);
initTerminal(site);

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

window.addEventListener('load', () => {
  initLoader();
});
