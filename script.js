/* script.js: add simple interactive features */
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  // Create a theme toggle button
  const btn = document.createElement('button');
  btn.textContent = 'Toggle theme';
  btn.style.background = '#272731';
  btn.style.color = '#e8e8ea';
  btn.style.border = '1px solid #444';
  btn.style.padding = '6px 12px';
  btn.style.borderRadius = '8px';
  btn.style.cursor = 'pointer';
  btn.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
  });
  header.appendChild(btn);
});
