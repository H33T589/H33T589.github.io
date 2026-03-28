const CACHE_KEY = 'github-activity-v2';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const YEAR_DAYS = 365;
const MAX_COMMITS_PAGES = 10;

function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const days = Math.max(0, Math.floor(diffMs / DAY_MS));

  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  return `${months} months ago`;
}

function formatShortMonth(date) {
  return date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
}

function getDayKey(dateString) {
  return new Date(dateString).toISOString().slice(0, 10);
}

function getDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function getCachedActivity() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.timestamp || !parsed.data) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedActivity(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );
  } catch {
    // Ignore storage failures.
  }
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return response.json();
}

async function fetchAllRepos(username) {
  const repos = [];

  for (let page = 1; page <= 3; page += 1) {
    const data = await fetchJson(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&type=owner&sort=updated`
    );

    if (!Array.isArray(data) || data.length === 0) break;
    repos.push(...data);

    if (data.length < 100) break;
  }

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .filter((repo) => repo.owner?.login?.toLowerCase() === username.toLowerCase());
}

async function fetchRepoCommits(repoFullName, author, sinceIso) {
  const commits = [];

  for (let page = 1; page <= MAX_COMMITS_PAGES; page += 1) {
    const url =
      `https://api.github.com/repos/${repoFullName}/commits?author=${encodeURIComponent(author)}` +
      `&since=${encodeURIComponent(sinceIso)}&per_page=100&page=${page}`;

    const data = await fetchJson(url);
    if (!Array.isArray(data) || data.length === 0) break;
    commits.push(...data);
    if (data.length < 100) break;
  }

  return commits;
}

function getStreaks(dayKeys) {
  if (!dayKeys.length) {
    return { current: 0, longest: 0 };
  }

  const sorted = [...new Set(dayKeys)].sort();
  let longest = 1;
  let currentRun = 1;

  for (let i = 1; i < sorted.length; i += 1) {
    const previous = new Date(`${sorted[i - 1]}T00:00:00Z`);
    const current = new Date(`${sorted[i]}T00:00:00Z`);
    const diffDays = Math.round((current.getTime() - previous.getTime()) / DAY_MS);

    if (diffDays === 1) {
      currentRun += 1;
      longest = Math.max(longest, currentRun);
    } else {
      currentRun = 1;
    }
  }

  let current = 0;
  const today = new Date();
  let cursor = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const uniqueDaySet = new Set(sorted);

  if (!uniqueDaySet.has(getDateKey(cursor))) {
    const yesterday = new Date(cursor.getTime() - DAY_MS);
    if (uniqueDaySet.has(getDateKey(yesterday))) {
      cursor = yesterday;
    }
  }

  while (uniqueDaySet.has(getDateKey(cursor))) {
    current += 1;
    cursor = new Date(cursor.getTime() - DAY_MS);
  }

  return { current, longest };
}

function buildHeatmap(dayCounts) {
  const end = new Date();
  const endUtc = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
  const start = new Date(endUtc.getTime() - (YEAR_DAYS - 1) * DAY_MS);
  const rangeStart = new Date(start);
  rangeStart.setUTCDate(rangeStart.getUTCDate() - rangeStart.getUTCDay());

  const cells = [];
  const monthLabels = [];
  let currentMonth = '';
  let weekIndex = -1;

  for (let date = new Date(rangeStart); date <= endUtc; date = new Date(date.getTime() + DAY_MS)) {
    if (date.getUTCDay() === 0) {
      weekIndex += 1;
      const month = formatShortMonth(date);
      if (month !== currentMonth) {
        currentMonth = month;
        monthLabels.push({ weekIndex, month });
      }
    }

    const key = getDateKey(date);
    const count = dayCounts.get(key) ?? 0;
    const inRange = date >= start;
    cells.push({
      key,
      count,
      weekIndex,
      weekday: date.getUTCDay(),
      inRange,
    });
  }

  return { cells, monthLabels };
}

function getLevel(count) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function aggregateActivity(repos, commitEntries) {
  const dayCounts = new Map();

  for (const entry of commitEntries) {
    const key = getDayKey(entry.date);
    dayCounts.set(key, (dayCounts.get(key) ?? 0) + 1);
  }

  const uniqueDays = [...dayCounts.keys()].sort();
  const { current, longest } = getStreaks(uniqueDays);
  const last30Cutoff = Date.now() - 30 * DAY_MS;
  const commitsLast30Days = commitEntries.filter((entry) => new Date(entry.date).getTime() >= last30Cutoff).length;

  const reposByCount = repos
    .map((repo) => ({
      name: repo.full_name,
      htmlUrl: repo.html_url,
      pushedAt: repo.pushed_at,
      commitsYear: repo._commitsYear ?? 0,
    }))
    .filter((repo) => repo.commitsYear > 0)
    .sort((a, b) => b.commitsYear - a.commitsYear);

  return {
    contributionsYear: commitEntries.length,
    activeDaysYear: uniqueDays.length,
    commitsLast30Days,
    currentStreak: current,
    longestStreak: longest,
    latestPush: repos
      .map((repo) => repo.pushed_at)
      .filter(Boolean)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0],
    reposWithActivity: reposByCount.length,
    totalReposScanned: repos.length,
    reposByCount,
    heatmap: buildHeatmap(dayCounts),
  };
}

function renderHeadline(headlineEl, aggregate) {
  headlineEl.textContent = `${aggregate.contributionsYear} commit contributions in the last year`;
}

function renderSummary(summaryEl, aggregate) {
  const cards = [
    { label: 'Commits / year', value: String(aggregate.contributionsYear) },
    { label: 'Active days / year', value: String(aggregate.activeDaysYear) },
    { label: 'Commits / 30d', value: String(aggregate.commitsLast30Days) },
    { label: 'Current streak', value: `${aggregate.currentStreak} day${aggregate.currentStreak === 1 ? '' : 's'}` },
    { label: 'Longest streak', value: `${aggregate.longestStreak} day${aggregate.longestStreak === 1 ? '' : 's'}` },
    { label: 'Repos with activity', value: `${aggregate.reposWithActivity}/${aggregate.totalReposScanned}` },
  ];

  summaryEl.innerHTML = cards
    .map(
      (card) => `
        <article class="signal-card">
          <span class="signal-label">${card.label}</span>
          <strong class="signal-value">${card.value}</strong>
        </article>
      `
    )
    .join('');
}

function renderMonths(monthsEl, monthLabels, totalWeeks) {
  monthsEl.style.gridTemplateColumns = `repeat(${totalWeeks}, minmax(0, 1fr))`;
  monthsEl.innerHTML = monthLabels
    .map(
      ({ weekIndex, month }) => `
        <span class="heatmap-month" style="grid-column: ${weekIndex + 1} / span 4">${month}</span>
      `
    )
    .join('');
}

function renderHeatmap(gridEl, monthsEl, aggregate) {
  const totalWeeks = Math.max(...aggregate.heatmap.cells.map((cell) => cell.weekIndex)) + 1;
  renderMonths(monthsEl, aggregate.heatmap.monthLabels, totalWeeks);

  gridEl.style.gridTemplateColumns = `repeat(${totalWeeks}, minmax(0, 1fr))`;
  gridEl.innerHTML = aggregate.heatmap.cells
    .map((cell) => {
      const level = getLevel(cell.count);
      const muted = cell.inRange ? '' : ' heatmap-cell--out';
      const title = cell.inRange ? `${cell.key}: ${cell.count} commit${cell.count === 1 ? '' : 's'}` : '';
      return `
        <span
          class="heatmap-cell heatmap-cell--${level}${muted}"
          style="grid-column: ${cell.weekIndex + 1}; grid-row: ${cell.weekday + 1};"
          title="${title}"
        ></span>
      `;
    })
    .join('');
}

function renderRepos(reposEl, aggregate) {
  reposEl.innerHTML = aggregate.reposByCount
    .slice(0, 6)
    .map((repo) => {
      const width = `${Math.max(8, (repo.commitsYear / Math.max(aggregate.contributionsYear, 1)) * 100)}%`;
      return `
        <a class="activity-repo" href="${repo.htmlUrl}" target="_blank" rel="noopener noreferrer">
          <div class="activity-repo-top">
            <span class="activity-repo-name">${repo.name}</span>
            <span class="activity-repo-count">${repo.commitsYear} commits</span>
          </div>
          <div class="activity-repo-bar">
            <span class="activity-repo-fill" style="width: ${width}"></span>
          </div>
          <span class="activity-repo-meta">updated ${formatRelativeDate(repo.pushedAt)}</span>
        </a>
      `;
    })
    .join('');
}

function renderError(headlineEl, summaryEl, heatmapEl, reposEl) {
  headlineEl.textContent = 'GitHub activity is unavailable right now';
  summaryEl.innerHTML = `
    <article class="signal-card signal-card--wide">
      <span class="signal-label">GitHub activity</span>
      <strong class="signal-value signal-value--small">GitHub rate-limited or temporarily unavailable</strong>
    </article>
  `;
  heatmapEl.innerHTML = '<div class="activity-empty">Unable to build contribution heatmap.</div>';
  reposEl.innerHTML = '';
}

export async function initGitHubActivity(site) {
  const section = site.githubSection;
  if (!section || section.enabled === false) return;
  const headlineEl = document.getElementById('githubHeadline');
  const summaryEl = document.getElementById('githubSummary');
  const monthsEl = document.getElementById('githubMonths');
  const heatmapEl = document.getElementById('githubHeatmap');
  const reposEl = document.getElementById('githubRepos');
  const profileLink = document.getElementById('githubProfileLink');

  if (!headlineEl || !summaryEl || !monthsEl || !heatmapEl || !reposEl) return;
  if (profileLink) profileLink.href = section.profileUrl;

  const cached = getCachedActivity();
  if (cached) {
    renderHeadline(headlineEl, cached.aggregate);
    renderSummary(summaryEl, cached.aggregate);
    renderHeatmap(heatmapEl, monthsEl, cached.aggregate);
    renderRepos(reposEl, cached.aggregate);
  }

  const sinceIso = new Date(Date.now() - (YEAR_DAYS - 1) * DAY_MS).toISOString();

  try {
    const repos = await fetchAllRepos(section.author);
    const relevantRepos = repos.filter((repo) => new Date(repo.pushed_at).getTime() >= new Date(sinceIso).getTime());

    const repoCommitLists = await Promise.all(
      relevantRepos.map(async (repo) => {
        const commits = await fetchRepoCommits(repo.full_name, section.author, sinceIso);
        repo._commitsYear = commits.length;
        return commits.map((commit) => ({
          repo: repo.full_name,
          date: commit?.commit?.author?.date,
        }));
      })
    );

    const commitEntries = repoCommitLists.flat().filter((entry) => entry.date);
    const aggregate = aggregateActivity(relevantRepos, commitEntries);
    const data = { aggregate };

    setCachedActivity(data);
    renderHeadline(headlineEl, aggregate);
    renderSummary(summaryEl, aggregate);
    renderHeatmap(heatmapEl, monthsEl, aggregate);
    renderRepos(reposEl, aggregate);
  } catch {
    if (!cached) renderError(headlineEl, summaryEl, heatmapEl, reposEl);
  }
}
