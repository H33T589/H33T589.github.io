function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function renderSite(site) {
  document.title = site.meta.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', site.meta.description);

  const { hero } = site;
  const tagEl = document.getElementById('heroTag');
  if (tagEl) tagEl.textContent = hero.tag;
  const title1 = document.getElementById('heroTitleLine1');
  if (title1) title1.textContent = hero.titleLine1;
  const grad = document.getElementById('heroTitleGradient');
  if (grad) grad.textContent = hero.titleGradient;
  const desc = document.getElementById('heroDescription');
  if (desc) desc.textContent = hero.description;
  const ctaP = document.getElementById('ctaProjects');
  if (ctaP) {
    ctaP.href = hero.ctaProjects.href;
    ctaP.textContent = hero.ctaProjects.label;
  }
  const ctaC = document.getElementById('ctaContact');
  if (ctaC) {
    ctaC.href = hero.ctaContact.href;
    ctaC.textContent = hero.ctaContact.label;
  }

  site.photos?.hero?.forEach((photo, index) => {
    const image = document.getElementById(`heroPhoto${index}`);
    if (image) {
      image.src = photo.src;
      image.alt = photo.alt;
    }
    const caption = document.getElementById(`heroPhoto${index}Caption`);
    if (caption) caption.textContent = photo.caption;
    const detail = document.getElementById(`heroPhoto${index}Detail`);
    if (detail) detail.textContent = photo.detail;
  });

  const about = site.about;
  const aboutLabel = document.getElementById('aboutLabel');
  if (aboutLabel) aboutLabel.textContent = about.label;
  const aboutTitle = document.getElementById('aboutTitle');
  if (aboutTitle) aboutTitle.textContent = about.title;
  const aboutLead = document.getElementById('aboutLead');
  if (aboutLead) aboutLead.textContent = about.lead;
  const aboutBody = document.getElementById('aboutBody');
  if (aboutBody) {
    aboutBody.innerHTML = about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
  }
  const aboutStats = document.getElementById('aboutStats');
  if (aboutStats) {
    aboutStats.innerHTML = about.stats
      .map(
        (s) => `
        <div class="about-stat reveal">
          <span class="about-stat-label">${esc(s.label)}</span>
          <span class="about-stat-value">${esc(s.value)}</span>
        </div>`
      )
      .join('');
  }

  const skillsHeader = document.querySelector('#skills .section-header');
  if (skillsHeader) {
    skillsHeader.querySelector('.section-label').textContent = site.skillsSection.label;
    skillsHeader.querySelector('.section-title').textContent = site.skillsSection.title;
  }

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = site.skills
      .map(
        (card) => `
        <div class="skill-card reveal">
          <div class="skill-category">
            <span>${card.icon}</span> ${esc(card.category)}
          </div>
          <div class="skill-list">
            ${card.items.map((item) => `<span class="skill-item">${esc(item)}</span>`).join('')}
          </div>
        </div>`
      )
      .join('');
  }

  const projectsHeader = document.querySelector('#projects .section-header');
  if (projectsHeader) {
    projectsHeader.querySelector('.section-label').textContent = site.projectsSection.label;
    projectsHeader.querySelector('.section-title').textContent = site.projectsSection.title;
  }

  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = site.projects
      .map(
        (p) => `
        <article class="project-card reveal${p.featured ? ' project-card--featured' : ''}" data-project-card>
          <div class="project-content">
            ${p.featured ? `<span class="project-badge">${esc(p.featuredLabel || 'Featured')}</span>` : ''}
            <div class="project-icon">${p.icon}</div>
            <h3 class="project-title">${esc(p.title)}</h3>
            <p class="project-desc">${esc(p.description)}</p>
            <div class="project-tech">
              ${p.tech.map((t) => `<span class="tech-pill">${esc(t)}</span>`).join('')}
            </div>
            ${p.links
              .map((link) => {
                const small = link.small ? ' project-link--small' : '';
                const target = link.external !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
                return `<a href="${esc(link.href)}" class="project-link${small}"${target}>${esc(link.label)} <span aria-hidden="true">&rarr;</span></a>`;
              })
              .join('')}
          </div>
        </article>`
      )
      .join('');
  }

  const githubLabel = document.getElementById('githubLabel');
  const githubSectionEl = document.getElementById('github');
  if (githubSectionEl) {
    githubSectionEl.hidden = site.githubSection.enabled === false;
  }
  if (githubLabel) githubLabel.textContent = site.githubSection.label;
  const githubTitle = document.getElementById('githubTitle');
  if (githubTitle) githubTitle.textContent = site.githubSection.title;
  const githubIntro = document.getElementById('githubIntro');
  if (githubIntro) githubIntro.textContent = site.githubSection.intro;
  const githubNote = document.getElementById('githubNote');
  if (githubNote) githubNote.textContent = site.githubSection.note;

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const h = contactSection.querySelector('.section-header');
    if (h) {
      h.querySelector('.section-label').textContent = site.contact.label;
      h.querySelector('.section-title').textContent = site.contact.title;
    }
  }

  const contactDescription = document.getElementById('contactDescription');
  if (contactDescription) contactDescription.textContent = site.contact.description;

  const contactActions = document.getElementById('contactActions');
  if (contactActions) {
    contactActions.innerHTML = site.contact.actions
      .map((action, index) => {
        const isPrimary = index === 0 ? ' btn-primary' : ' btn-secondary';
        const target = action.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${esc(action.href)}" class="btn${isPrimary}"${target}>${esc(action.label)}</a>`;
      })
      .join('');
  }

  const socialEmail = document.getElementById('socialEmail');
  const socialGithub = document.getElementById('socialGithub');
  const socialLinkedin = document.getElementById('socialLinkedin');
  if (socialEmail) socialEmail.href = site.social.email;
  if (socialGithub) socialGithub.href = site.social.github;
  if (socialLinkedin) socialLinkedin.href = site.social.linkedin;
}
