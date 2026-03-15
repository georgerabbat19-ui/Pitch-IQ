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

  // reuse same club meta from EPL teams section
  const formClubMeta = {
    'Arsenal':           { color: '#ef0107', plId: 't3'  },
    'Manchester City':   { color: '#1c86cd', plId: 't43' },
    'Chelsea':           { color: '#034694', plId: 't8'  },
    'Liverpool':         { color: '#c8102e', plId: 't14' },
    'Tottenham Hotspur': { color: '#132257', plId: 't6'  },
    'Wolves':            { color: '#c8a84b', plId: 't39' },
    'Manchester United': { color: '#da291c', plId: 't1'  },
    'Aston Villa':       { color: '#670e36', plId: 't7'  },
    'Brentford':         { color: '#e30613', plId: 't94' },
    'Fulham':            { color: '#cc0000', plId: 't54' },
    'Bournemouth':       { color: '#d71920', plId: 't91' },
    'Brighton':          { color: '#0057b8', plId: 't36' },
    'Newcastle':         { color: '#241f20', plId: 't4'  },
    'Crystal Palace':    { color: '#1b458f', plId: 't31' },
    'Everton':           { color: '#003399', plId: 't11' },
    'Sunderland':        { color: '#eb172b', plId: 't56' },
    'Leeds United':      { color: '#1d428a', plId: 't2'  },
    'West Ham':          { color: '#7a263a', plId: 't21' },
    'Nottm Forest':      { color: '#dd0000', plId: 't17' },
    'Burnley':           { color: '#6c1d45', plId: 't90' },
  };
  const PL_BADGE = id => `https://resources.premierleague.com/premierleague/badges/70/${id}.png`;

  items.sort((a, b) => (a.rank || 99) - (b.rank || 99));
  grid.innerHTML = items.map(i => {
    const gd = i.gf - i.ga;
    const gdStr = (gd >= 0 ? '+' : '') + gd;
    const formPips = i.form.map(r => `<span class="form-pip form-${r.toLowerCase()}">${r}</span>`).join('');
    const meta = formClubMeta[i.team] || { color: '#2a2f40', plId: '' };
    const pts = i.wins * 3 + i.draws;
    const badgeImg = meta.plId
      ? `<img class="form-card-badge-img" src="${PL_BADGE(meta.plId)}" alt="${i.team}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`
      : '';
    const badgeFallback = `<span style="${meta.plId ? 'display:none' : ''};font-size:2.2rem">${i.badge}</span>`;

    return `
    <div class="form-stat-card" data-search="${i.team} ${i.leagueName}">
      <div class="form-stat-header" style="background:linear-gradient(135deg,${meta.color}ee 0%,${meta.color}88 100%)">
        <div class="form-stat-header-left">
          ${badgeImg}${badgeFallback}
          <div>
            <div class="form-stat-team">${i.team}</div>
            <div class="form-stat-league">${i.leagueName}</div>
          </div>
        </div>
        <div class="form-stat-rank">#${i.rank}</div>
      </div>
      <div class="form-stat-body">
        <div class="form-stat-pips">${formPips}</div>
        <div class="form-stat-row">
          <div class="form-stat-box">
            <span class="form-stat-val">${pts}</span>
            <span class="form-stat-lbl">PTS</span>
          </div>
          <div class="form-stat-box">
            <span class="form-stat-val">${i.wins}W ${i.draws}D ${i.losses}L</span>
            <span class="form-stat-lbl">Record</span>
          </div>
          <div class="form-stat-box">
            <span class="form-stat-val ${gd >= 0 ? 'positive' : 'negative'}">${gdStr}</span>
            <span class="form-stat-lbl">GD</span>
          </div>
          <div class="form-stat-box">
            <span class="form-stat-val">${i.cleanSheets}</span>
            <span class="form-stat-lbl">CS</span>
          </div>
        </div>
        <div class="form-stat-scorer">⭐ ${i.topScorer}</div>
        <div class="form-stat-footer">
          <span class="form-stat-next">Next: ${i.nextMatch}</span>
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

  const clubMeta = {
    'arsenal':       { color: '#ef0107', plId: 't3'  },
    'aston-villa':   { color: '#670e36', plId: 't7'  },
    'bournemouth':   { color: '#d71920', plId: 't91' },
    'brentford':     { color: '#e30613', plId: 't94' },
    'brighton':      { color: '#0057b8', plId: 't36' },
    'burnley':       { color: '#6c1d45', plId: 't90' },
    'chelsea':       { color: '#034694', plId: 't8'  },
    'crystal-palace':{ color: '#1b458f', plId: 't31' },
    'everton':       { color: '#003399', plId: 't11' },
    'fulham':        { color: '#cc0000', plId: 't54' },
    'liverpool':     { color: '#c8102e', plId: 't14' },
    'man-city':      { color: '#1c86cd', plId: 't43' },
    'man-utd':       { color: '#da291c', plId: 't1'  },
    'newcastle':     { color: '#241f20', plId: 't4'  },
    'nottm-forest':  { color: '#dd0000', plId: 't17' },
    'leeds':         { color: '#1d428a', plId: 't2'  },
    'spurs':         { color: '#132257', plId: 't6'  },
    'west-ham':      { color: '#7a263a', plId: 't21' },
    'wolves':        { color: '#c8a84b', plId: 't39' },
    'sunderland':    { color: '#eb172b', plId: 't56' },
  };
  const PL_BADGE = id => `https://resources.premierleague.com/premierleague/badges/70/${id}.png`;

  grid.innerHTML = items.map(t => {
    const hasNew = t.news.some(n => n.isNew);
    const stats = formLookup[t.id] || {};
    const meta = clubMeta[t.id] || { color: '#2a2f40', plId: '' };
    const formPips = (stats.form || []).map(r =>
      `<span class="form-pip form-${r.toLowerCase()}">${r}</span>`
    ).join('');
    const newsLabel = t.news.length > 0
      ? `<span class="team-news-count">${t.news.length} update${t.news.length !== 1 ? 's' : ''}${hasNew ? ' · <b style="color:#f44336">NEW</b>' : ''}</span>`
      : `<span class="team-news-count no-news">No updates</span>`;
    const badgeImg = meta.plId
      ? `<img class="team-badge-img" src="${PL_BADGE(meta.plId)}" alt="${t.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`
      : '';
    const badgeFallback = `<span class="team-badge-emoji" style="${meta.plId ? 'display:none' : ''}">${t.badge}</span>`;

    return `
    <div class="team-card" data-search="${t.name}" onclick="openTeamModal('${t.id}')">
      <div class="team-card-header" style="background:linear-gradient(160deg,${meta.color}dd 0%,${meta.color}88 100%)">
        <div class="tc-rank-bg">${stats.rank || ''}</div>
        ${badgeImg}${badgeFallback}
        ${stats.rank ? `<span class="team-rank">#${stats.rank}</span>` : ''}
      </div>
      <div class="team-card-accent" style="background:${meta.color}"></div>
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
    // Filter all static data-search cards (injuries, transfers, managers, rules)
    document.querySelectorAll('.card[data-search], .var-card[data-search]').forEach(card => {
      card.style.display = card.dataset.search.toLowerCase().includes(q) ? '' : 'none';
    });
    // Re-render dynamic sections with search filter
    renderEplTeams(q);
    // Filter form cards directly (they're re-rendered on filter change, so just show/hide)
    document.querySelectorAll('.form-stat-card[data-search]').forEach(card => {
      card.style.display = (!q || card.dataset.search.toLowerCase().includes(q)) ? '' : 'none';
    });
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

// ─── MATCH PREVIEWS ───────────────────────────────────────────────────────────

function importanceLabel(key) {
  return { title: '🏆 Title Race', top4: '⭐ Top 4', europa: '🌍 European Push', relegation: '🔥 Relegation Battle', low: '— Mid-table' }[key] || key;
}
function importanceClass(key) {
  return { title: 'imp-title', top4: 'imp-top4', europa: 'imp-europa', relegation: 'imp-relegation', low: 'imp-low' }[key] || 'imp-low';
}

function renderPreviews(filter = 'all') {
  const grid = document.getElementById('previews-grid');
  if (!grid || typeof PREVIEWS_DATA === 'undefined') return;
  const items = filter === 'all'
    ? PREVIEWS_DATA.filter(p => p.id)
    : PREVIEWS_DATA.filter(p => p.id && (p.homeImportance === filter || p.awayImportance === filter));

  document.getElementById('countPreviews').textContent = PREVIEWS_DATA.filter(p => p.id).length;

  const PL_BADGE = id => `https://resources.premierleague.com/premierleague/badges/70/${id}.png`;

  grid.innerHTML = items.map(p => {
    const homeInj = p.homeInjuries.length
      ? p.homeInjuries.map(i => `<li>${i}</li>`).join('')
      : '<li class="no-issues">None reported</li>';
    const awayInj = p.awayInjuries.length
      ? p.awayInjuries.map(i => `<li>${i}</li>`).join('')
      : '<li class="no-issues">None reported</li>';
    const flagHtml = p.flag ? `<div class="preview-flag">⚠️ ${p.flag}</div>` : '';
    const managerHtml = p.managerNote ? `<div class="preview-manager-note">🎙️ ${p.managerNote}</div>` : '';

    return `
    <div class="preview-card" data-home="${p.homeImportance}" data-away="${p.awayImportance}">
      ${flagHtml}

      <!-- Header: matchup -->
      <div class="preview-header">
        <div class="preview-team preview-team-home">
          <img class="preview-badge" src="${PL_BADGE(p.homeBadgePlId)}" alt="${p.home}" loading="lazy" onerror="this.style.display='none'">
          <span class="preview-team-name">${p.home}</span>
          <span class="preview-imp ${importanceClass(p.homeImportance)}">${importanceLabel(p.homeImportance)}</span>
        </div>
        <div class="preview-vs">
          <span class="preview-vs-text">VS</span>
          <span class="preview-kickoff">${p.kickoffLabel}</span>
          <span class="preview-comp">${p.competition}</span>
        </div>
        <div class="preview-team preview-team-away">
          <img class="preview-badge" src="${PL_BADGE(p.awayBadgePlId)}" alt="${p.away}" loading="lazy" onerror="this.style.display='none'">
          <span class="preview-team-name">${p.away}</span>
          <span class="preview-imp ${importanceClass(p.awayImportance)}">${importanceLabel(p.awayImportance)}</span>
        </div>
      </div>

      <!-- Colour bar: split home/away colours -->
      <div class="preview-colour-bar">
        <div style="background:${p.homeColor};flex:1"></div>
        <div style="background:${p.awayColor};flex:1"></div>
      </div>

      <!-- Narrative -->
      <div class="preview-body">
        <p class="preview-narrative">${p.narrative}</p>

        <!-- Injury columns -->
        <div class="preview-injury-grid">
          <div class="preview-injury-col">
            <div class="preview-injury-header" style="color:${p.homeColor === '#241f20' ? '#aaa' : p.homeColor}">
              🩹 ${p.home} Absentees
            </div>
            <ul class="preview-injury-list">${homeInj}</ul>
          </div>
          <div class="preview-injury-col">
            <div class="preview-injury-header" style="color:${p.awayColor}">
              🩹 ${p.away} Absentees
            </div>
            <ul class="preview-injury-list">${awayInj}</ul>
          </div>
        </div>

        ${managerHtml}
      </div>
    </div>`;
  }).join('');
}

function setupPreviewFilters() {
  document.querySelectorAll('[data-preview-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-preview-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPreviews(btn.dataset.previewFilter);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderInjuries();
  renderTransfers();
  renderManagers();
  renderRules();
  renderForm();
  renderEplTeams();
  renderPreviews();
  updateHeroStats();
  setupFilters();
  setupPreviewFilters();
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
