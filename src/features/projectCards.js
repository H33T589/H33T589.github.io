function onCardMove(e, card) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
}

export function initProjectCards() {
  document.querySelectorAll('[data-project-card]').forEach((card) => {
    card.addEventListener('mousemove', (e) => onCardMove(e, card));
  });
}
