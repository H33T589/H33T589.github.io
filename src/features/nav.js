function setActiveLink(links, activeHash) {
  links.forEach((link) => {
    const isActive = link.getAttribute('href') === activeHash;
    link.classList.toggle('is-active', isActive);
    link.classList.toggle('rail-link--active', isActive && link.classList.contains('rail-link'));
    link.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function updateRailIndicator(indicator, activeLink) {
  if (!indicator || !activeLink) return;

  indicator.style.height = `${activeLink.offsetHeight}px`;
  indicator.style.transform = `translateY(${activeLink.offsetTop}px)`;
  indicator.style.opacity = '1';
}

function getActiveSection(sections) {
  const probe = window.innerHeight * 0.32;

  let active = sections[0];
  for (const section of sections) {
    const rect = section.element.getBoundingClientRect();
    if (rect.top <= probe) active = section;
    else break;
  }

  return active;
}

export function initNav() {
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const railLinks = [...document.querySelectorAll('.rail-link')];
  const topLinks = [...document.querySelectorAll('.nav-link')];
  const allLinks = [...railLinks, ...topLinks];
  const indicator = document.getElementById('railIndicator');

  if (!nav || !menuToggle || !navLinks || !allLinks.length) return;

  const sections = [...new Set(allLinks.map((link) => link.getAttribute('href')))]
    .filter((href) => href?.startsWith('#'))
    .map((href) => {
      const element = document.querySelector(href);
      return element ? { href, element } : null;
    })
    .filter(Boolean);

  const syncActiveState = () => {
    if (!sections.length) return;

    const activeSection = getActiveSection(sections);
    const activeHash = activeSection?.href ?? sections[0].href;
    setActiveLink(allLinks, activeHash);

    const activeRailLink = railLinks.find((link) => link.getAttribute('href') === activeHash) ?? railLinks[0];
    updateRailIndicator(indicator, activeRailLink);
  };

  const onScroll = () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    syncActiveState();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', syncActiveState);

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const open = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  allLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');

      const href = link.getAttribute('href');
      if (!href) return;

      setActiveLink(allLinks, href);
      const activeRailLink = railLinks.find((railLink) => railLink.getAttribute('href') === href);
      updateRailIndicator(indicator, activeRailLink);
    });
  });

  syncActiveState();
}
