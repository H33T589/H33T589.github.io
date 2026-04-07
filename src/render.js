function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function renderHero(site) {
  const { hero } = site;
  const tagEl = document.getElementById('heroTag');
  if (tagEl) tagEl.textContent = hero.tag;

  const statusEl = document.getElementById('heroStatus');
  if (statusEl) statusEl.textContent = hero.status;

  const codeEl = document.getElementById('heroCode');
  if (codeEl) codeEl.textContent = hero.code;

  const title1 = document.getElementById('heroTitleLine1');
  if (title1) title1.textContent = hero.titleLine1;

  const gradient = document.getElementById('heroTitleGradient');
  if (gradient) gradient.textContent = hero.titleGradient;

  const description = document.getElementById('heroDescription');
  if (description) description.textContent = hero.description;

  const ctaProjects = document.getElementById('ctaProjects');
  if (ctaProjects) {
    ctaProjects.href = hero.ctaProjects.href;
    ctaProjects.textContent = hero.ctaProjects.label;
  }

  const ctaContact = document.getElementById('ctaContact');
  if (ctaContact) {
    ctaContact.href = hero.ctaContact.href;
    ctaContact.textContent = hero.ctaContact.label;
  }

  const heroMetrics = document.getElementById('heroMetrics');
  if (heroMetrics) {
    heroMetrics.innerHTML = hero.metrics
      .map(
        (metric) => `
          <article class="metric-card reveal">
            <span class="metric-label">${esc(metric.label)}</span>
            <strong class="metric-value">${esc(metric.value)}</strong>
          </article>
        `
      )
      .join('');
  }

  const primaryPhoto = site.photos?.hero?.[0];
  if (primaryPhoto) {
    const image = document.getElementById('heroPhoto0');
    if (image) {
      image.src = primaryPhoto.src;
      image.alt = primaryPhoto.alt;
    }

    const caption = document.getElementById('heroPhoto0Caption');
    if (caption) caption.textContent = primaryPhoto.caption;

    const detail = document.getElementById('heroPhoto0Detail');
    if (detail) detail.textContent = primaryPhoto.detail;
  }
}

function renderFieldLog(site) {
  const titleEl = document.getElementById('fieldLogTitle');
  if (titleEl) titleEl.textContent = site.fieldLog.title;

  const subtitleEl = document.getElementById('fieldLogSubtitle');
  if (subtitleEl) subtitleEl.textContent = site.fieldLog.subtitle;

  const entriesEl = document.getElementById('fieldLogEntries');
  if (entriesEl) {
    entriesEl.innerHTML = site.fieldLog.entries
      .map(
        (entry) => `
          <div class="log-entry">
            <span class="log-time">${esc(entry.time)}</span>
            <span class="log-label">${esc(entry.label)}</span>
            <span class="log-message">${esc(entry.message)}</span>
          </div>
        `
      )
      .join('');
  }
}

function renderAbout(site) {
  const aboutLabel = document.getElementById('aboutLabel');
  if (aboutLabel) aboutLabel.textContent = site.about.label;

  const aboutTitle = document.getElementById('aboutTitle');
  if (aboutTitle) aboutTitle.textContent = site.about.title;

  const aboutLead = document.getElementById('aboutLead');
  if (aboutLead) aboutLead.textContent = site.about.lead;

  const aboutBody = document.getElementById('aboutBody');
  if (aboutBody) {
    aboutBody.innerHTML = site.about.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('');
  }
}

function renderDashboard(site) {
  const dashboardTitle = document.getElementById('statusTitle');
  if (dashboardTitle) dashboardTitle.textContent = site.dashboard.statusTitle;

  const statusList = document.getElementById('statusList');
  if (statusList) {
    statusList.innerHTML = site.dashboard.statuses
      .map(
        (status) => `
          <div class="status-row">
            <div class="status-copy">
              <span class="status-label">${esc(status.label)}</span>
              <strong class="status-value">${esc(status.value)}</strong>
            </div>
            <div class="status-bar">
              <span class="status-fill" style="width: ${Math.max(0, Math.min(status.progress, 100))}%"></span>
            </div>
          </div>
        `
      )
      .join('');
  }

  const activeLabel = document.getElementById('activeNodeLabel');
  if (activeLabel) activeLabel.textContent = site.dashboard.activeNode.label;

  const activeTitle = document.getElementById('activeNodeTitle');
  if (activeTitle) activeTitle.textContent = site.dashboard.activeNode.title;

  const activeDescription = document.getElementById('activeNodeDescription');
  if (activeDescription) activeDescription.textContent = site.dashboard.activeNode.description;

  const activeAction = document.getElementById('activeNodeAction');
  if (activeAction) {
    activeAction.href = site.dashboard.activeNode.action.href;
    activeAction.textContent = site.dashboard.activeNode.action.label;
  }
}

function renderSkills(site) {
  const skillsLabel = document.getElementById('skillsLabel');
  if (skillsLabel) skillsLabel.textContent = site.skillsSection.label;

  const skillsTitle = document.getElementById('skillsTitle');
  if (skillsTitle) skillsTitle.textContent = site.skillsSection.title;

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = site.skills
      .map(
        (card) => `
          <article class="skill-card reveal">
            <div class="skill-head">
              <span class="skill-icon">${esc(card.icon)}</span>
              <h3 class="skill-category">${esc(card.category)}</h3>
            </div>
            <div class="skill-list">
              ${card.items.map((item) => `<span class="skill-item">${esc(item)}</span>`).join('')}
            </div>
          </article>
        `
      )
      .join('');
  }
}

function renderProjects(site) {
  const projectsLabel = document.getElementById('projectsLabel');
  if (projectsLabel) projectsLabel.textContent = site.projectsSection.label;

  const projectsTitle = document.getElementById('projectsTitle');
  if (projectsTitle) projectsTitle.textContent = site.projectsSection.title;

  const projectsIntro = document.getElementById('projectsIntro');
  if (projectsIntro) projectsIntro.textContent = site.projectsSection.intro;

  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = site.projects
      .map((project) => {
        const featuredClass = project.featured ? ' project-card--featured project-card--wide' : '';
        const toneClass = project.tone ? ` project-card--${project.tone}` : '';

        return `
          <article class="project-card reveal${featuredClass}${toneClass}" data-project-card>
            <div class="project-content">
              <div class="project-top">
                <span class="project-index">${esc(project.icon)}</span>
                <span class="project-category">${esc(project.category)}</span>
              </div>
              ${project.featured ? `<span class="project-badge">${esc(project.featuredLabel || 'Featured')}</span>` : ''}
              <h3 class="project-title">${esc(project.title)}</h3>
              <p class="project-description">${esc(project.description)}</p>
              <div class="project-tech">
                ${project.tech.map((item) => `<span class="tech-pill">${esc(item)}</span>`).join('')}
              </div>
              <div class="project-links">
                ${project.links
                  .map((link) => {
                    const smallClass = link.small ? ' project-link--small' : '';
                    const target = link.external !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
                    return `<a href="${esc(link.href)}" class="project-link${smallClass}"${target}>${esc(link.label)}</a>`;
                  })
                  .join('')}
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }
}

function renderGitHub(site) {
  const githubSection = document.getElementById('github');
  if (githubSection) githubSection.hidden = site.githubSection.enabled === false;

  const githubLabel = document.getElementById('githubLabel');
  if (githubLabel) githubLabel.textContent = site.githubSection.label;

  const githubTitle = document.getElementById('githubTitle');
  if (githubTitle) githubTitle.textContent = site.githubSection.title;

  const githubIntro = document.getElementById('githubIntro');
  if (githubIntro) githubIntro.textContent = site.githubSection.intro;

  const githubNote = document.getElementById('githubNote');
  if (githubNote) githubNote.textContent = site.githubSection.note;
}

function renderContact(site) {
  const contactLabel = document.getElementById('contactLabel');
  if (contactLabel) contactLabel.textContent = site.contact.label;

  const contactTitle = document.getElementById('contactTitle');
  if (contactTitle) contactTitle.textContent = site.contact.title;

  const contactDescription = document.getElementById('contactDescription');
  if (contactDescription) contactDescription.textContent = site.contact.description;

  const contactActions = document.getElementById('contactActions');
  if (contactActions) {
    contactActions.innerHTML = site.contact.actions
      .map((action, index) => {
        const target = action.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        const className = index === 0 ? 'btn btn-primary magnetic-btn' : 'btn btn-secondary';
        return `<a href="${esc(action.href)}" class="${className}"${target}>${esc(action.label)}</a>`;
      })
      .join('');
  }

  const contactLocation = document.getElementById('contactLocation');
  if (contactLocation) contactLocation.textContent = site.contact.location;
}

function renderFooter(site) {
  const footerNote = document.getElementById('footerNote');
  if (footerNote) footerNote.textContent = site.footer.note;

  const footerStatus = document.getElementById('footerStatus');
  if (footerStatus) footerStatus.textContent = site.footer.status;

  const footerVersion = document.getElementById('footerVersion');
  if (footerVersion) footerVersion.textContent = site.footer.version;

  const socialEmail = document.getElementById('socialEmail');
  if (socialEmail) socialEmail.href = site.social.email;

  const socialGithub = document.getElementById('socialGithub');
  if (socialGithub) socialGithub.href = site.social.github;

  const socialLinkedin = document.getElementById('socialLinkedin');
  if (socialLinkedin) socialLinkedin.href = site.social.linkedin;
}

export function renderSite(site) {
  document.title = site.meta.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', site.meta.description);

  const loaderText = document.querySelector('.loader-text');
  if (loaderText && site.loader?.title) loaderText.textContent = site.loader.title;

  const loaderStatus = document.getElementById('loaderStatus');
  if (loaderStatus && site.loader?.initialStatus) loaderStatus.textContent = site.loader.initialStatus;

  renderHero(site);
  renderFieldLog(site);
  renderAbout(site);
  renderDashboard(site);
  renderSkills(site);
  renderProjects(site);
  renderGitHub(site);
  renderContact(site);
  renderFooter(site);
}
