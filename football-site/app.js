// ===== PitchIQ — app.js (Rendering Engine) =====
// DO NOT EDIT data here. All data lives in data.js

// ─── RENDERING ENGINE ─────────────────────────────────────────────────────────

function impactClass(impact) {
  return { high: 'impact-high', medium: 'impact-medium', low: 'impact-low' }[impact] || 'impact-low';
}
function impactLabel(impact) {
  return { high: 'High', medium: 'Medium', low: 'Low' }[impact] || 'Low';
}
function typeColor(type) {
  const map = { injury:'var(--red)', suspension:'var(--orange)', doubt:'var(--yellow)',
    'transfer-in':'var(--green)', 'transfer-out':'var(--purple)', manager:'var(--blue)', var:'var(--blue)' };
  return map[type] || 'var(--accent)';
}
function formatTag(type) {
  const map = { injury:'Injury', suspension:'Suspension', doubt:'Doubt',
    'transfer-in':'Signing', 'transfer-out':'Departure', manager:'Manager', var:'VAR/Rule' };
  return map[type] || type;
}

function renderInjuries(filter = 'all') {
  const grid = document.getElementById('injuries-grid');
  const items = filter === 'all' ? INJURIES_DATA : INJURIES_DATA.filter(i => i.type === filter);
  document.getElementById('countInjuries').textContent = INJURIES_DATA.length;
  if (!items.length) { grid.innerHTML = '<p class="empty-state">No items match this filter.</p>'; return; }
  grid.innerHTML = items.map(i => `
    <div class="card" data-search="${i.player} ${i.club} ${i.detail}" data-type="${i.type}">
      <div class="card-border" style="background:${typeColor(i.type)}"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-tag">${formatTag(i.type)}</span>
          <span class="impact-badge ${impactClass(i.impact)}">${impactLabel(i.impact)}</span>
        </div>
        <div class="card-title">${i.player}</div>
        <div class="card-subtitle">${i.clubBadge} ${i.club} · ${i.position}</div>
        <div class="card-detail">${i.detail}</div>
        <div class="card-footer">
          <span class="card-date">📅 ${i.date}</span>
          ${i.matchAffected ? `<span class="card-match">⚽ ${i.matchAffected}</span>` : ''}
          ${i.source ? `<a class="card-source" href="${i.source}" target="_blank" rel="noopener">Source ↗</a>` : ''}
        </div>
      </div>
    </div>`).join('');
}

function renderTransfers(filter = 'all') {
  const grid = document.getElementById('transfers-grid');
  const items = filter === 'all' ? TRANSFERS_DATA : TRANSFERS_DATA.filter(i => i.type === filter);
  document.getElementById('countTransfers').textContent = TRANSFERS_DATA.length;
  if (!items.length) { grid.innerHTML = '<p class="empty-state">No items match this filter.</p>'; return; }
  grid.innerHTML = items.map(i => `
    <div class="card" data-search="${i.player} ${i.toClub} ${i.fromClub} ${i.detail}" data-type="${i.type}">
      <div class="card-border" style="background:${typeColor(i.type)}"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-tag">${formatTag(i.type)}</span>
          <span class="impact-badge ${impactClass(i.impact)}">${impactLabel(i.impact)}</span>
        </div>
        <div class="card-title">${i.player}</div>
        <div class="card-subtitle">${i.fromBadge} ${i.fromClub} → ${i.toBadge} ${i.toClub} · ${i.fee || ''}</div>
        <div class="card-detail">${i.detail}</div>
        <div class="card-footer">
          <span class="card-date">📅 ${i.date}</span>
          ${i.window ? `<span class="card-match">${i.window}</span>` : ''}
          ${i.source ? `<a class="card-source" href="${i.source}" target="_blank" rel="noopener">Source ↗</a>` : ''}
        </div>
      </div>
    </div>`).join('');
}

function renderManagers() {
  const grid = document.getElementById('managers-grid');
  document.getElementById('countManagers').textContent = MANAGERS_DATA.length;
  if (!MANAGERS_DATA.length) { grid.innerHTML = '<p class="empty-state">No recent manager changes.</p>'; return; }
  grid.innerHTML = MANAGERS_DATA.map(i => `
    <div class="card" data-search="${i.club} ${i.newManager} ${i.previousManager}">
      <div class="card-border" style="background:var(--blue)"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-tag">Manager Change</span>
          <span class="impact-badge ${impactClass(i.impact)}">${impactLabel(i.impact)}</span>
        </div>
        <div class="card-title">${i.badge} ${i.club}</div>
        <div class="card-subtitle">${i.previousManager} → <strong>${i.newManager}</strong></div>
        <div class="card-detail"><strong>Why:</strong> ${i.reason}<br><br>${i.detail}</div>
        <div class="card-footer">
          <span class="card-date">📅 ${i.date}</span>
          <span class="card-match">${i.matchesInCharge} matches in charge</span>
          ${i.source ? `<a class="card-source" href="${i.source}" target="_blank" rel="noopener">Source ↗</a>` : ''}
        </div>
      </div>
    </div>`).join('');
}

function renderRules() {
  const grid = document.getElementById('rules-grid');
  document.getElementById('countRules').textContent = RULES_DATA.length;
  if (!RULES_DATA.length) { grid.innerHTML = '<p class="empty-state">No recent rule changes.</p>'; return; }
  grid.innerHTML = RULES_DATA.map(i => `
    <div class="card" data-search="${i.title} ${i.detail}">
      <div class="card-border" style="background:var(--blue)"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-tag">${i.category}</span>
          <span class="impact-badge impact-medium">Info</span>
        </div>
        <div class="card-title">${i.icon} ${i.title}</div>
        <div class="card-detail">${i.detail}</div>
        ${i.predictionNote ? `<div class="card-prediction">💡 <strong>Prediction note:</strong> ${i.predictionNote}</div>` : ''}
        <div class="card-footer">
          <span class="card-date">📅 ${i.date}</span>
          ${i.source ? `<a class="card-source" href="${i.source}" target="_blank" rel="noopener">Source ↗</a>` : ''}
        </div>
      </div>
    </div>`).join('');
}

function renderForm(filter = 'all') {
  const grid = document.getElementById('form-grid');
  const items = filter === 'all' ? FORM_DATA : FORM_DATA.filter(i => i.league === filter);
  document.getElementById('countForm').textContent = FORM_DATA.length;
  if (!items.length) { grid.innerHTML = '<p class="empty-state">No items match this filter.</p>'; return; }
  grid.innerHTML = items.map(i => {
    const gd = i.gf - i.ga;
    const formPips = i.form.map(r => `<span class="form-pip form-${r.toLowerCase()}">${r}</span>`).join('');
    return `
    <div class="card" data-search="${i.team} ${i.leagueName}">
      <div class="card-border" style="background:var(--yellow)"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-tag">${i.leagueName}</span>
          <span class="impact-badge impact-low">#${i.rank}</span>
        </div>
        <div class="card-title">${i.badge} ${i.team}</div>
        <div class="card-form">${formPips}</div>
        <div class="card-stats">
          <span>P${i.played}</span><span>${i.wins}W-${i.draws}D-${i.losses}L</span>
          <span>GD ${gd >= 0 ? '+' : ''}${gd}</span><span>${i.cleanSheets} CS</span>
        </div>
        <div class="card-detail">⭐ ${i.topScorer}</div>
        <div class="card-footer">
          <span class="card-match">Next: ${i.nextMatch}</span>
          ${i.source ? `<a class="card-source" href="${i.source}" target="_blank" rel="noopener">Source ↗</a>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderEplTeams(searchTerm = '') {
  const grid = document.getElementById('epl-teams-grid');
  if (!grid) return;
  const items = searchTerm
    ? EPL_TEAMS.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : EPL_TEAMS;
  document.getElementById('countEplTeams').textContent = EPL_TEAMS.length;
  // Build rank + form lookup from FORM_DATA — keyed by team id to avoid badge collisions
  const idToFormKey = {
    'arsenal': 'Arsenal', 'aston-villa': 'Aston Villa', 'bournemouth': 'Bournemouth',
    'brentford': 'Brentford', 'brighton': 'Brighton', 'burnley': 'Burnley',
    'chelsea': 'Chelsea', 'crystal-palace': 'Crystal Palace', 'everton': 'Everton',
    'fulham': 'Fulham', 'liverpool': 'Liverpool', 'man-city': 'Manchester City',
    'man-utd': 'Manchester United', 'newcastle': 'Newcastle', 'nottm-forest': 'Nottm Forest',
    'leeds': 'Leeds United', 'spurs': 'Tottenham Hotspur', 'west-ham': 'West Ham',
    'wolves': 'Wolves', 'sunderland': 'Sunderland'
  };
  const formLookup = {};
  FORM_DATA.forEach(f => {
    const match = EPL_TEAMS.find(t => {
      const key = idToFormKey[t.id] || '';
      return key.toLowerCase() === f.team.toLowerCase() || f.team.toLowerCase().includes(t.name.toLowerCase().split(' ')[0].toLowerCase());
    });
    if (match) formLookup[match.id] = { rank: f.rank, form: f.form };
  });

  const clubColors = {
    'arsenal': '#ef0107', 'aston-villa': '#670e36', 'bournemouth': '#d71920',
    'brentford': '#e30613', 'brighton': '#0057b8', 'burnley': '#6c1d45',
    'chelsea': '#034694', 'crystal-palace': '#1b458f', 'everton': '#003399',
    'fulham': '#cc0000', 'liverpool': '#c8102e', 'man-city': '#1c86cd',
    'man-utd': '#da291c', 'newcastle': '#241f20', 'nottm-forest': '#dd0000',
    'leeds': '#1d428a', 'spurs': '#132257', 'west-ham': '#7a263a',
    'wolves': '#fdb913', 'sunderland': '#eb172b'
  };

  grid.innerHTML = items.map(t => {
    const hasNew = t.news.some(n => n.isNew);
    const stats = formLookup[t.id] || {};
    const rankBadge = stats.rank ? `<span class="team-rank">#${stats.rank}</span>` : '';
    const formPips = (stats.form || []).map(r =>
      `<span class="form-pip form-${r.toLowerCase()}">${r}</span>`
    ).join('');
    const color = clubColors[t.id] || '#2a2f40';
    const newsLabel = t.news.length > 0
      ? `<span class="team-news-count">${t.news.length} update${t.news.length !== 1 ? 's' : ''}${hasNew ? ' · NEW' : ''}</span>`
      : `<span class="team-news-count no-news">No updates</span>`;

    return `
    <div class="team-card" data-search="${t.name}" onclick="openTeamModal('${t.id}')" style="--club-color:${color}">
      <div class="team-card-header">
        <div class="team-badge-large">${t.badge}</div>
        ${rankBadge}
      </div>
      <div class="team-card-body">
        <div class="team-name">${t.name}</div>
        ${formPips ? `<div class="team-form">${formPips}</div>` : ''}
      </div>
      <div class="team-card-footer">
        ${newsLabel}
      </div>
    </div>`;
  }).join('');
}

function openTeamModal(teamId) {
  const team = EPL_TEAMS.find(t => t.id === teamId);
  if (!team) return;
  const overlay = document.getElementById('eplModalOverlay');
  document.getElementById('eplModalBadge').textContent = team.badge;
  document.getElementById('eplModalTitle').textContent = team.name;
  document.getElementById('eplModalBody').innerHTML = team.news.length
    ? team.news.map(n => `
        <div class="card" style="margin-bottom:12px;">
          <div class="card-border" style="background:${typeColor(n.type || n.tag)}"></div>
          <div class="card-body">
            <div class="card-top">
              <span class="card-tag">${formatTag(n.type || n.tag)}</span>
              <span class="impact-badge ${impactClass(n.impact)}">${impactLabel(n.impact)}</span>
            </div>
            <div class="card-title">${n.title}</div>
            <div class="card-subtitle">${n.subtitle || ''}</div>
            <div class="card-detail">${n.body}</div>
            <div class="card-footer">
              <span class="card-date">📅 ${n.date}</span>
              ${n.source ? `<a class="card-source" href="${n.source}" target="_blank" rel="noopener">Source ↗</a>` : ''}
            </div>
          </div>
        </div>`).join('')
    : '<p class="empty-state">No recent news for this team.</p>';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTeamModal() {
  const overlay = document.getElementById('eplModalOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function updateHeroStats() {
  document.getElementById('statInjuries').textContent = INJURIES_DATA.length;
  document.getElementById('statTransfers').textContent = TRANSFERS_DATA.length;
  document.getElementById('statManagers').textContent = MANAGERS_DATA.length;
  document.getElementById('statVar').textContent = RULES_DATA.length;
  document.getElementById('statTeams').textContent = EPL_TEAMS.length;
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const filter = btn.dataset.filter;
      btn.closest('.section-filters').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (target === 'injuries-grid') renderInjuries(filter);
      else if (target === 'transfers-grid') renderTransfers(filter);
      else if (target === 'form-grid') renderForm(filter);
    });
  });
}

function setupSearch() {
  const bar = document.getElementById('searchBar');
  if (!bar) return;
  bar.addEventListener('input', () => {
    const q = bar.value.toLowerCase().trim();
    document.querySelectorAll('.card[data-search]').forEach(card => {
      card.style.display = card.dataset.search.toLowerCase().includes(q) ? '' : 'none';
    });
    renderEplTeams(q);
  });
}

function setupNav() {
  const sections = document.querySelectorAll('section.section');
  const navLinks = document.querySelectorAll('[data-section]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));

  const menuBtn = document.getElementById('mobileMenuBtn');
  const navTabs = document.getElementById('navTabs');
  if (menuBtn && navTabs) {
    menuBtn.addEventListener('click', () => navTabs.classList.toggle('open'));
  }
}

function setupLastUpdated() {
  const el = document.getElementById('lastUpdated');
  if (el) el.textContent = 'Updated ' + new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
  renderInjuries();
  renderTransfers();
  renderManagers();
  renderRules();
  renderForm();
  renderEplTeams();
  updateHeroStats();
  setupFilters();
  setupSearch();
  setupNav();
  setupLastUpdated();

  // EPL modal close handlers
  const closeBtn = document.getElementById('eplModalClose');
  const overlay = document.getElementById('eplModalOverlay');
  if (closeBtn) closeBtn.addEventListener('click', closeTeamModal);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeTeamModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTeamModal(); });
});
