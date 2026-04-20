import './styles/main.css';
import { site } from './data/site.js';
import { renderSite } from './render.js';
import { initReveal } from './features/reveal.js';
import { initNav } from './features/nav.js';
import { initGitHubActivity } from './features/githubActivity.js';

renderSite(site);
initReveal();
initNav();
initGitHubActivity(site);

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
