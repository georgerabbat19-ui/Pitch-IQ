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

// ─── DATA VALIDATION ───────────────────────────────────────────────────────────
function validateLeagueTag(item, arrayName) {
  const validLeagues = ['premier-league', 'la-liga', 'bundesliga', 'all'];
  const league = item.league;
  
  if (!league) {
    console.warn(`⚠️  Missing league tag in ${arrayName}:`, item);
    return false;
  }
  if (!validLeagues.includes(league)) {
    console.warn(`⚠️  Invalid league tag "${league}" in ${arrayName}:`, item);
    return false;
  }
  return true;
}

function validateAllData() {
  console.log('🔍 Validating data integrity...');
  const validationErrors = [];
  
  // Validate injuries
  INJURIES_DATA.forEach((item, idx) => {
    if (!validateLeagueTag(item, `INJURIES_DATA[${idx}]`)) {
      validationErrors.push(`INJURIES_DATA[${idx}] - missing/invalid league`);
    }
  });
  
  // Validate transfers
  TRANSFERS_DATA.forEach((item, idx) => {
    if (!validateLeagueTag(item, `TRANSFERS_DATA[${idx}]`)) {
      validationErrors.push(`TRANSFERS_DATA[${idx}] - missing/invalid league`);
    }
  });
  
  // Validate form
  FORM_DATA.forEach((item, idx) => {
    if (!validateLeagueTag(item, `FORM_DATA[${idx}]`)) {
      validationErrors.push(`FORM_DATA[${idx}] - missing/invalid league`);
    }
  });
  
  if (validationErrors.length > 0) {
    console.error(`❌ ${validationErrors.length} validation error(s) found:`);
    validationErrors.forEach(err => console.error(`  • ${err}`));
    return false;
  }
  
  console.log('✅ All data validated successfully');
  return true;
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
    <div class="card" data-search="${i.player} ${i.club} ${i.detail}" data-type="${i.type}" data-league="${i.league}">
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
    <div class="card" data-search="${i.player} ${i.toClub} ${i.fromClub} ${i.detail}" data-type="${i.type}" data-league="${i.league}">
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
    <div class="card" data-search="${i.club} ${i.newManager} ${i.previousManager}" data-league="${i.league}">
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
    <div class="card" data-search="${i.title} ${i.detail}" data-league="${i.league}">
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
  // Merge EPL, La Liga, and Bundesliga form data
  const allFormData = [
    ...FORM_DATA,
    ...(typeof LA_LIGA_FORM_DATA !== 'undefined' ? LA_LIGA_FORM_DATA : []),
    ...(typeof BUNDESLIGA_FORM_DATA !== 'undefined' ? BUNDESLIGA_FORM_DATA : [])
  ];
  const items = filter === 'all' ? allFormData : allFormData.filter(i => i.league === filter);
  document.getElementById('countForm').textContent = allFormData.length;
  if (!items.length) { grid.innerHTML = '<p class="empty-state">No items match this filter.</p>'; return; }
  
  const currentLeagueFilter = document.querySelector('.league-filter-btn.active')?.dataset.league || 'all';

  // Club metadata: EPL, La Liga, Bundesliga
  const formClubMeta = {
    // Premier League — PL CDN badges (plId) + ESPN CDN (espnId)
    'Arsenal':              { color: '#ef0107', plId: 't3',  espnId: '359'  },
    'Manchester City':      { color: '#1c86cd', plId: 't43', espnId: '382'  },
    'Chelsea':              { color: '#034694', plId: 't8',  espnId: '363'  },
    'Liverpool':            { color: '#c8102e', plId: 't14', espnId: '364'  },
    'Tottenham Hotspur':    { color: '#132257', plId: 't6',  espnId: '367'  },
    'Wolves':               { color: '#c8a84b', plId: 't39', espnId: '380'  },
    'Wolverhampton':        { color: '#c8a84b', plId: 't39', espnId: '380'  },
    'Manchester United':    { color: '#da291c', plId: 't1',  espnId: '360'  },
    'Aston Villa':          { color: '#670e36', plId: 't7',  espnId: '362'  },
    'Brentford':            { color: '#e30613', plId: 't94', espnId: '337'  },
    'Fulham':               { color: '#cc0000', plId: 't54', espnId: '370'  },
    'Bournemouth':          { color: '#d71920', plId: 't91', espnId: '349'  },
    'Brighton':             { color: '#0057b8', plId: 't36', espnId: '331'  },
    'Newcastle':            { color: '#241f20', plId: 't4',  espnId: '361'  },
    'Crystal Palace':       { color: '#1b458f', plId: 't31', espnId: '384'  },
    'Everton':              { color: '#003399', plId: 't11', espnId: '368'  },
    'Sunderland':           { color: '#eb172b', plId: 't56', espnId: '379'  },
    'Leeds United':         { color: '#1d428a', plId: 't2',  espnId: '357'  },
    'West Ham':             { color: '#7a263a', plId: 't21', espnId: '371'  },
    'Nottm Forest':         { color: '#dd0000', plId: 't17', espnId: '374'  },
    'Burnley':              { color: '#6c1d45', plId: 't90', espnId: '336'  },
    // La Liga — ESPN CDN IDs
    'Barcelona':            { color: '#004494', plId: '', espnId: '83'  },
    'Real Madrid':          { color: '#003087', plId: '', espnId: '86'  },
    'Atlético Madrid':      { color: '#eb172b', plId: '', espnId: '1068'},
    'Atletico Madrid':      { color: '#eb172b', plId: '', espnId: '1068'},
    'Villarreal':           { color: '#f4b400', plId: '', espnId: '102' },
    'Real Betis':           { color: '#146b3a', plId: '', espnId: '244' },
    'Celta Vigo':           { color: '#78bee9', plId: '', espnId: '85'  },
    'Real Sociedad':        { color: '#004d9e', plId: '', espnId: '89'  },
    'Espanyol':             { color: '#0050a0', plId: '', espnId: '88'  },
    'Getafe':               { color: '#0068a8', plId: '', espnId: '2922'},
    'Athletic Club':        { color: '#cc0000', plId: '', espnId: '93'  },
    'Osasuna':              { color: '#cc0000', plId: '', espnId: '97'  },
    'Girona':               { color: '#cc0000', plId: '', espnId: '9812'},
    'Valencia':             { color: '#f4b400', plId: '', espnId: '94'  },
    'Sevilla':              { color: '#cc0000', plId: '', espnId: '243' },
    'Mallorca':             { color: '#cc0000', plId: '', espnId: '84'  },
    'Alaves':               { color: '#004ca8', plId: '', espnId: '96'  },
    'Elche':                { color: '#00843d', plId: '', espnId: '3751'},
    'Levante':              { color: '#004ca8', plId: '', espnId: '1538'},
    'Real Oviedo':          { color: '#004ca8', plId: '', espnId: '92'  },
    'Rayo Vallecano':       { color: '#cc0000', plId: '', espnId: '101' },
    // Bundesliga — ESPN CDN IDs
    'Bayern Munich':        { color: '#c91c1f', plId: '', espnId: '132' },
    'Borussia Dortmund':    { color: '#ffd700', plId: '', espnId: '124' },
    'TSG Hoffenheim':       { color: '#0050a0', plId: '', espnId: '7911'},
    'VfB Stuttgart':        { color: '#c41e3a', plId: '', espnId: '134' },
    'RB Leipzig':           { color: '#cc0000', plId: '', espnId: '11420'},
    'Bayer Leverkusen':     { color: '#c41c1f', plId: '', espnId: '131' },
    'Eintracht Frankfurt':  { color: '#cc0000', plId: '', espnId: '125' },
    'SC Freiburg':          { color: '#cc0000', plId: '', espnId: '126' },
    'Union Berlin':         { color: '#cc0000', plId: '', espnId: '598' },
    'FC Augsburg':          { color: '#cc0000', plId: '', espnId: '3841'},
    'Hamburger SV':         { color: '#cc0000', plId: '', espnId: '127' },
    "Borussia M'gladbach":  { color: '#009a44', plId: '', espnId: '268' },
    'Mainz 05':             { color: '#cc0000', plId: '', espnId: '2950'},
    '1. FC Köln':           { color: '#cc0000', plId: '', espnId: '122' },
    'Werder Bremen':        { color: '#009a44', plId: '', espnId: '137' },
    'FC St. Pauli':         { color: '#cc0000', plId: '', espnId: '270' },
    'VfL Wolfsburg':        { color: '#009a44', plId: '', espnId: '138' },
    '1. FC Heidenheim':     { color: '#cc0000', plId: '', espnId: '6418'},
  };
  const PL_BADGE   = id => `https://resources.premierleague.com/premierleague/badges/70/${id}.png`;
  const ESPN_BADGE = id => `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${id}.png&w=80&h=80`;

  items.sort((a, b) => (a.rank || 99) - (b.rank || 99));
  grid.innerHTML = items.map(i => {
    const gd = i.gf - i.ga;
    const gdStr = (gd >= 0 ? '+' : '') + gd;
    const formPips = i.form.map(r => `<span class="form-pip form-${r.toLowerCase()}">${r}</span>`).join('');
    const meta = formClubMeta[i.team] || { color: '#2a2f40', plId: '', espnId: '' };
    const pts = i.wins * 3 + i.draws;
    const badgeUrl = meta.plId ? PL_BADGE(meta.plId) : (meta.espnId ? ESPN_BADGE(meta.espnId) : '');
    const badgeImg = badgeUrl
      ? `<img class="form-card-badge-img" src="${badgeUrl}" alt="${i.team}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`
      : '';
    const badgeFallback = `<span style="${badgeUrl ? 'display:none' : ''};font-size:2.2rem">${i.badge}</span>`;

    return `
    <div class="form-stat-card" data-search="${i.team} ${i.leagueName}" data-league="${i.league}">
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
  // Wrapper that applies search filter to club drill-down cards
  const grid = document.getElementById('epl-teams-grid');
  if (!grid) return;
  
  const cards = grid.querySelectorAll('.team-card');
  if (searchTerm === '') {
    // Show all
    cards.forEach(card => card.style.display = '');
  } else {
    // Filter by search
    const q = searchTerm.toLowerCase();
    cards.forEach(card => {
      const searchText = card.dataset.search.toLowerCase();
      card.style.display = searchText.includes(q) ? '' : 'none';
    });
  }
  
  const totalTeams = EPL_TEAMS.length + (typeof LA_LIGA_TEAMS !== 'undefined' ? LA_LIGA_TEAMS.length : 0) + (typeof BUNDESLIGA_TEAMS !== 'undefined' ? BUNDESLIGA_TEAMS.length : 0);
  document.getElementById('countEplTeams').textContent = totalTeams;
}

function openTeamModal(teamId) {
  // Legacy wrapper — now routes to club drill-down
  openClubDrillDown(teamId);
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
  document.getElementById('statTeams').textContent = EPL_TEAMS.length + (typeof LA_LIGA_TEAMS !== 'undefined' ? LA_LIGA_TEAMS.length : 0) + (typeof BUNDESLIGA_TEAMS !== 'undefined' ? BUNDESLIGA_TEAMS.length : 0);
}

function updateSectionCounts(league) {
  const filter = (arr) => league === 'all' ? arr : arr.filter(i => i.league === league);
  const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  el('countInjuries', filter(INJURIES_DATA).length);
  el('countTransfers', filter(TRANSFERS_DATA).length);
  el('countManagers', filter(MANAGERS_DATA).length);
  el('countRules', filter(RULES_DATA).length);
  el('countForm', filter(FORM_DATA).length);
  el('countPreviews', filter(PREVIEWS_DATA.filter(p => p.id)).length);
  // Teams count
  const allClubs = [
    ...EPL_TEAMS.map(t => ({ league: 'premier-league' })),
    ...(typeof LA_LIGA_TEAMS !== 'undefined' ? LA_LIGA_TEAMS.map(t => ({ league: 'la-liga' })) : []),
    ...(typeof BUNDESLIGA_TEAMS !== 'undefined' ? BUNDESLIGA_TEAMS.map(t => ({ league: 'bundesliga' })) : []),
  ];
  el('countEplTeams', league === 'all' ? allClubs.length : allClubs.filter(c => c.league === league).length);
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
    // Filter all cards with data-search attribute (injuries, transfers, managers, rules, form, previews)
    document.querySelectorAll('.card[data-search], .var-card[data-search], .form-stat-card[data-search], .preview-card[data-search]').forEach(card => {
      const matches = !q || card.dataset.search.toLowerCase().includes(q);
      card.style.display = matches ? '' : 'none';
    });
    // Re-render EPL teams with search filter
    renderEplTeams(q);
  });
}

function setupNav() {
  // Note: removed IntersectionObserver — section chip active state is managed by
  // user clicks only (setupSectionChips). Observer was causing chips to jump to
  // "injuries" on page load since it's the first visible section.

  const menuBtn = document.getElementById('mobileMenuBtn');
  const navTabs = document.getElementById('navTabs');
  if (menuBtn && navTabs) {
    menuBtn.addEventListener('click', () => navTabs.classList.toggle('open'));
  }
}

function setupLastUpdated() {
  const el = document.getElementById('lastUpdated');
  const now = new Date();
    const datePart = now.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
    const timePart = now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
    if (el) el.textContent = 'Updated ' + datePart + ' · ' + timePart;
}

// ─── MATCH PREVIEWS ───────────────────────────────────────────────────────────

// Last match helpers
function hoursAgoLabel(isoDate) {
  const hours = (Date.now() - new Date(isoDate)) / 3600000;
  if (hours < 24) return `${Math.round(hours)}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function resultColor(result) {
  return { 'W': 'win', 'D': 'draw', 'L': 'loss' }[result] || '';
}

function renderLastMatchLineup(lineup) {
  if (!lineup || !lineup.length) return '<span style="color:var(--text-muted);font-size:0.75rem;">No lineup data</span>';
  return lineup.map(p => `<div class="lineup-player"><span class="lineup-number">${p.number}</span><span class="lineup-name">${p.name}</span></div>`).join('');
}

function importanceLabel(key) {
  return { title: '🏆 Title Race', top4: '⭐ Top 5', top5: '⭐ Top 5', europa: '🌍 European Push', relegation: '🔥 Relegation Battle', low: '— Mid-table' }[key] || key;
}
function importanceClass(key) {
  return { title: 'imp-title', top4: 'imp-top4', top5: 'imp-top5', europa: 'imp-europa', relegation: 'imp-relegation', low: 'imp-low' }[key] || 'imp-low';
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
    <div class="preview-card" data-home="${p.homeImportance}" data-away="${p.awayImportance}" data-league="${p.league}" data-search="${p.home} ${p.away} ${p.competition}">
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

        <!-- LAST MATCH SECTION (NEW) -->
        ${(p.homeLastMatch || p.awayLastMatch) ? `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <!-- HOME LAST MATCH -->
          ${p.homeLastMatch ? `
          <div class="preview-last-match">
            <div class="preview-last-match-header">
              <span class="preview-last-match-title">Last match</span>
              <span class="preview-last-match-meta">${hoursAgoLabel(p.homeLastMatch.lastMatchDate)}</span>
            </div>
            <div style="margin-bottom:8px;">
              <span class="preview-last-match-result ${resultColor(p.homeLastMatch.result)}">${p.homeLastMatch.result} ${p.homeLastMatch.score}</span>
              <span style="font-size:0.75rem;color:var(--text-muted);">vs ${p.homeLastMatch.opponent}</span>
            </div>
            <div class="preview-lineup">${renderLastMatchLineup(p.homeLastMatch.lineup)}</div>
            <div class="preview-changes">${p.homeLastMatch.changes}</div>
          </div>
          ` : ''}
          
          <!-- AWAY LAST MATCH -->
          ${p.awayLastMatch ? `
          <div class="preview-last-match">
            <div class="preview-last-match-header">
              <span class="preview-last-match-title">Last match</span>
              <span class="preview-last-match-meta">${hoursAgoLabel(p.awayLastMatch.lastMatchDate)}</span>
            </div>
            <div style="margin-bottom:8px;">
              <span class="preview-last-match-result ${resultColor(p.awayLastMatch.result)}">${p.awayLastMatch.result} ${p.awayLastMatch.score}</span>
              <span style="font-size:0.75rem;color:var(--text-muted);">vs ${p.awayLastMatch.opponent}</span>
            </div>
            <div class="preview-lineup">${renderLastMatchLineup(p.awayLastMatch.lineup)}</div>
            <div class="preview-changes">${p.awayLastMatch.changes}</div>
          </div>
          ` : ''}
        </div>
        ` : ''}

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

// ─── LEAGUE TABS (NEW) ───────────────────────────────────────────────────────────
function setupLeagueTabs() {
  const leagueTabs = document.getElementById('leagueTabs');
  if (!leagueTabs) return;

  leagueTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.league-tab');
    if (!tab) return;

    e.preventDefault();
    
    // Update active tab
    leagueTabs.querySelectorAll('.league-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const selectedLeague = tab.dataset.league;
    
    // RESET section to "All Sections" when league changes
    const sectionChips = document.getElementById('sectionChips');
    sectionChips.querySelectorAll('.section-chip').forEach(c => c.classList.remove('active'));
    const allSectionsChip = Array.from(sectionChips.querySelectorAll('.section-chip')).find(c => c.dataset.section === 'all');
    if (allSectionsChip) allSectionsChip.classList.add('active');
    
    // Always apply with "all" sections
    applyFilters(selectedLeague, 'all', true); // true = user-initiated
  });
}

// ─── SECTION CHIPS (NEW) ───────────────────────────────────────────────────────────
function setupSectionChips() {
  const sectionChips = document.getElementById('sectionChips');
  if (!sectionChips) return;

  sectionChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.section-chip');
    if (!chip) return;

    // Update active chip
    sectionChips.querySelectorAll('.section-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    
    const selectedSection = chip.dataset.section;
    
    // Get currently active league tab
    const leagueTabs = document.getElementById('leagueTabs');
    const activeTab = leagueTabs.querySelector('.league-tab.active');
    const selectedLeague = activeTab ? activeTab.dataset.league : 'all';
    
    // Apply both filters
    applyFilters(selectedLeague, selectedSection, true); // true = user-initiated
  });
}

// ─── COMBINED FILTER LOGIC ───────────────────────────────────────────────────────────
function applyFilters(league = 'all', section = 'all', userInitiated = false) {
  // Handle "home" league filter — dedicated home page view
  if (league === 'home') {
    // Hide all data sections, show only home page and header
    document.querySelectorAll('section.section').forEach(s => {
      if (s.id !== 'home-page') s.classList.add('hidden');
    });
    document.querySelectorAll('.section-divider').forEach(d => d.classList.add('hidden'));
    document.querySelector('.alert-banner')?.classList.add('hidden');
    document.querySelector('.section-chips-wrap')?.classList.add('hidden');
    document.querySelector('.search-bar-wrap')?.classList.add('hidden');
    document.querySelector('.hero')?.classList.remove('hidden');
    
    // Show home page
    const homeSection = document.getElementById('home-page');
    if (homeSection) homeSection.classList.remove('hidden');
    
    renderHomePage();
    return; // Early exit — home page only
  }
  
  // Not home view — show all data sections and UI, hide hero
  document.querySelectorAll('.section-divider').forEach(d => d.classList.remove('hidden'));
  document.querySelector('.alert-banner')?.classList.remove('hidden');
  document.querySelector('.section-chips-wrap')?.classList.remove('hidden');
  document.querySelector('.search-bar-wrap')?.classList.remove('hidden');
  document.querySelector('.hero')?.classList.add('hidden');
  const homeSectionNotHome = document.getElementById('home-page');
  if (homeSectionNotHome) homeSectionNotHome.classList.add('hidden');
  
  // Only hide sections if user clicked a tab/chip (not on startup)
  if (userInitiated) {
    document.querySelectorAll('section.section').forEach(s => {
      if (s.id !== 'home-page') s.classList.add('hidden');
    });
  }
  
  // Map section chips to actual sections
  const sectionMap = {
    'all': ['injuries', 'transfers', 'managers', 'rules', 'form', 'epl-teams', 'previews'],
    'injuries': ['injuries'],
    'transfers': ['transfers'],
    'managers': ['managers'],
    'rules': ['rules'],
    'form': ['form'],
    'previews': ['previews'],
    'clubs': ['epl-teams']
  };
  
  const sectionsToShow = sectionMap[section] || sectionMap['all'];
  
  // Show relevant sections
  sectionsToShow.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) section.classList.remove('hidden');
  });
  
  // Apply league filter to all cards
  const leagueToFilter = league === 'all' ? null : league;
  document.querySelectorAll('.card[data-league], .form-stat-card[data-league], .preview-card').forEach(card => {
    const cardLeague = card.dataset.league;
    
    if (leagueToFilter === null) {
      // All leagues — show all
      card.style.display = '';
    } else {
      // Filter by specific league
      card.style.display = (cardLeague === leagueToFilter) ? '' : 'none';
    }
  });

  // Re-render club cards when clubs section is visible (supports multi-league filtering)
  if (sectionsToShow.includes('epl-teams')) {
    renderClubDrillDown();
  }

  // Update section counts to reflect active league
  updateSectionCounts(league);
}

// Legacy setupLeagueFilter (kept for backward compatibility, now calls new setup)
function setupLeagueFilter() {
  setupLeagueTabs();
  setupSectionChips();
  // Note: applyFilters is NOT called on startup — it's only called when user clicks tabs/chips
  // This ensures all data renders on page load, then filtering works on interaction
}

// ─── CLUB DRILL-DOWN (Phase 4) ─────────────────────────────────────────────
function renderClubDrillDown() {
  const grid = document.getElementById('epl-teams-grid');
  if (!grid) return;

  // Determine active league filter
  const leagueTabs = document.getElementById('leagueTabs');
  const activeTab = leagueTabs ? leagueTabs.querySelector('.league-tab.active') : null;
  const activeLeague = activeTab ? activeTab.dataset.league : 'all';

  // Build unified club list from all three leagues
  const allClubs = [
    ...EPL_TEAMS.map(t => ({ id: t.id, name: t.name, badge: t.badge, league: 'premier-league', news: t.news || [], injuries: [], transfers: [] })),
    ...(typeof LA_LIGA_TEAMS !== 'undefined' ? LA_LIGA_TEAMS.map(t => ({ id: t.id, name: t.name, badge: t.badge, league: 'la-liga', news: t.news || [], injuries: [], transfers: [] })) : []),
    ...(typeof BUNDESLIGA_TEAMS !== 'undefined' ? BUNDESLIGA_TEAMS.map(t => ({ id: t.id, name: t.name, badge: t.badge, league: 'bundesliga', news: t.news || [], injuries: [], transfers: [] })) : []),
  ];

  // Filter by active league tab
  const clubs = activeLeague === 'all' ? allClubs : allClubs.filter(c => c.league === activeLeague);
  
  // Enhance clubs with injury data
  INJURIES_DATA.forEach(inj => {
    const club = clubs.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === inj.club.toLowerCase().replace(/\s+/g, '-'));
    if (club) {
      club.injuries.push(inj);
    }
  });
  
  // Enhance clubs with transfer data
  TRANSFERS_DATA.forEach(tf => {
    const toClub = clubs.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === tf.toClub.toLowerCase().replace(/\s+/g, '-'));
    if (toClub) {
      toClub.transfers.push({ ...tf, direction: 'in' });
    }
    const fromClub = clubs.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === tf.fromClub.toLowerCase().replace(/\s+/g, '-'));
    if (fromClub) {
      fromClub.transfers.push({ ...tf, direction: 'out' });
    }
  });
  
  // Get form data for clubs
  const formLookup = {};
  FORM_DATA.forEach(f => {
    const match = clubs.find(c => c.name === f.team);
    if (match) formLookup[match.id] = { rank: f.rank, form: f.form };
  });
  
  const clubMeta = {
    // Premier League (PL CDN + ESPN fallback)
    'arsenal':              { color: '#ef0107', plId: 't3',  espnId: '359'  },
    'aston-villa':          { color: '#670e36', plId: 't7',  espnId: '362'  },
    'bournemouth':          { color: '#d71920', plId: 't91', espnId: '349'  },
    'brentford':            { color: '#e30613', plId: 't94', espnId: '337'  },
    'brighton':             { color: '#0057b8', plId: 't36', espnId: '331'  },
    'burnley':              { color: '#6c1d45', plId: 't90', espnId: '336'  },
    'chelsea':              { color: '#034694', plId: 't8',  espnId: '363'  },
    'crystal-palace':       { color: '#1b458f', plId: 't31', espnId: '384'  },
    'everton':              { color: '#003399', plId: 't11', espnId: '368'  },
    'fulham':               { color: '#cc0000', plId: 't54', espnId: '370'  },
    'liverpool':            { color: '#c8102e', plId: 't14', espnId: '364'  },
    'man-city':             { color: '#1c86cd', plId: 't43', espnId: '382'  },
    'man-utd':              { color: '#da291c', plId: 't1',  espnId: '360'  },
    'newcastle':            { color: '#241f20', plId: 't4',  espnId: '361'  },
    'nottm-forest':         { color: '#dd0000', plId: 't17', espnId: '374'  },
    'leeds':                { color: '#1d428a', plId: 't2',  espnId: '357'  },
    'spurs':                { color: '#132257', plId: 't6',  espnId: '367'  },
    'west-ham':             { color: '#7a263a', plId: 't21', espnId: '371'  },
    'wolves':               { color: '#c8a84b', plId: 't39', espnId: '380'  },
    'sunderland':           { color: '#eb172b', plId: 't56', espnId: '379'  },
    // La Liga (ESPN CDN)
    'barcelona':            { color: '#004494', plId: '', espnId: '83'   },
    'real-madrid':          { color: '#003087', plId: '', espnId: '86'   },
    'atletico-madrid':      { color: '#eb172b', plId: '', espnId: '1068' },
    'villarreal':           { color: '#f4b400', plId: '', espnId: '102'  },
    'real-betis':           { color: '#146b3a', plId: '', espnId: '92'   },
    'celta-vigo':           { color: '#78bee9', plId: '', espnId: '558'  },
    'real-sociedad':        { color: '#004d9e', plId: '', espnId: '89'   },
    'espanyol':             { color: '#0050a0', plId: '', espnId: '88'   },
    'getafe':               { color: '#0068a8', plId: '', espnId: '3842' },
    'athletic-club':        { color: '#cc0000', plId: '', espnId: '93'   },
    'osasuna':              { color: '#cc0000', plId: '', espnId: '97'   },
    'girona':               { color: '#cc0000', plId: '', espnId: '9812' },
    'valencia':             { color: '#f4b400', plId: '', espnId: '94'   },
    'sevilla':              { color: '#cc0000', plId: '', espnId: '95'   },
    'mallorca':             { color: '#cc0000', plId: '', espnId: '715'  },
    'alaves':               { color: '#004ca8', plId: '', fdoId: '263'  },
    'elche':                { color: '#00843d', plId: '', espnId: '785'  },
    'levante':              { color: '#004ca8', plId: '', fdoId: '553'  },
    'real-oviedo':          { color: '#004ca8', plId: '', espnId: '3746' },
    'rayo-vallecano':       { color: '#cc0000', plId: '', fdoId: '399'  },
    // Bundesliga (ESPN CDN)
    'bayern-munich':        { color: '#c91c1f', plId: '', espnId: '132'  },
    'borussia-dortmund':    { color: '#ffd700', plId: '', espnId: '124'  },
    'hoffenheim':           { color: '#0050a0', plId: '', espnId: '167'  },
    'vfb-stuttgart':        { color: '#c41e3a', plId: '', espnId: '157'  },
    'rb-leipzig':           { color: '#cc0000', plId: '', espnId: '11420'},
    'bayer-leverkusen':     { color: '#c41c1f', plId: '', espnId: '131'  },
    'eintracht-frankfurt':  { color: '#cc0000', plId: '', espnId: '125'  },
    'sc-freiburg':          { color: '#cc0000', plId: '', espnId: '126'  },
    'union-berlin':         { color: '#cc0000', plId: '', espnId: ''     },
    'augsburg':             { color: '#cc0000', plId: '', espnId: '163'  },
    'hamburger-sv':         { color: '#cc0000', plId: '', espnId: '130'  },
    'borussia-monchengladbach': { color: '#009a44', plId: '', espnId: '123' },
    'mainz-05':             { color: '#cc0000', plId: '', espnId: '162'  },
    '1fc-koeln':            { color: '#cc0000', plId: '', espnId: '161'  },
    'werder-bremen':        { color: '#009a44', plId: '', espnId: '136'  },
    'fc-st-pauli':          { color: '#cc0000', plId: '', espnId: '182'  },
    'vfl-wolfsburg':        { color: '#009a44', plId: '', espnId: '160'  },
    '1fc-heidenheim':       { color: '#cc0000', plId: '', espnId: ''     },
  };
  const PL_BADGE   = id => `https://resources.premierleague.com/premierleague/badges/70/${id}.png`;
  const ESPN_BADGE = id => `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${id}.png&w=80&h=80`;
  
  grid.innerHTML = clubs.map(club => {
    const stats = formLookup[club.id] || {};
    const meta = clubMeta[club.id] || { color: '#2a2f40', plId: '', espnId: '' };
    const formPips = (stats.form || []).map(r =>
      `<span class="form-pip form-${r.toLowerCase()}">${r}</span>`
    ).join('');
    const badgeUrl = meta.plId ? PL_BADGE(meta.plId) : (meta.espnId ? ESPN_BADGE(meta.espnId) : '');
    const badgeImg = badgeUrl
      ? `<img class="team-badge-img" src="${badgeUrl}" alt="${club.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`
      : '';
    const badgeFallback = `<span class="team-badge-emoji" style="${badgeUrl ? 'display:none' : ''}">${club.badge}</span>`;
    
    const injuryCount = club.injuries.length;
    const transferCount = club.transfers.length;
    const newsCount = club.news.length;
    const totalAlerts = injuryCount + transferCount + newsCount;
    
    return `
    <div class="team-card" data-search="${club.name}" data-league="${club.league}" onclick="openClubDrillDown('${club.id}')">
      <div class="team-card-header" style="background:linear-gradient(160deg,${meta.color}dd 0%,${meta.color}88 100%)">
        <div class="tc-rank-bg">${stats.rank || ''}</div>
        ${badgeImg}${badgeFallback}
        ${stats.rank ? `<span class="team-rank">#${stats.rank}</span>` : ''}
      </div>
      <div class="team-card-accent" style="background:${meta.color}"></div>
      <div class="team-card-body">
        <div class="team-name">${club.name}</div>
        ${formPips ? `<div class="team-form">${formPips}</div>` : ''}
      </div>
      <div class="team-card-footer">
        ${totalAlerts > 0 
          ? `<span class="team-news-count">🔔 ${totalAlerts} alert${totalAlerts !== 1 ? 's' : ''}</span>`
          : `<span class="team-news-count no-news">✓ Quiet</span>`
        }
      </div>
    </div>`;
  }).join('');
}

function openClubDrillDown(clubId) {
  const allTeams = [
    ...EPL_TEAMS,
    ...(typeof LA_LIGA_TEAMS !== 'undefined' ? LA_LIGA_TEAMS : []),
    ...(typeof BUNDESLIGA_TEAMS !== 'undefined' ? BUNDESLIGA_TEAMS : []),
  ];
  const club = allTeams.find(t => t.id === clubId);
  if (!club) return;
  
  const overlay = document.getElementById('eplModalOverlay');
  document.getElementById('eplModalBadge').textContent = club.badge;
  document.getElementById('eplModalTitle').textContent = club.name;
  
  // Gather all club-related data
  const injuries = INJURIES_DATA.filter(i => i.club.toLowerCase().replace(/\s+/g, '-') === club.name.toLowerCase().replace(/\s+/g, '-'));
  const transfers = TRANSFERS_DATA.filter(t => 
    t.toClub.toLowerCase().replace(/\s+/g, '-') === club.name.toLowerCase().replace(/\s+/g, '-') ||
    t.fromClub.toLowerCase().replace(/\s+/g, '-') === club.name.toLowerCase().replace(/\s+/g, '-')
  );
  const allNews = [
    ...club.news,
    ...injuries.map(i => ({ type: i.type, title: `${i.player} - ${i.detail}`, body: i.detail, impact: i.impact, isNew: false })),
    ...transfers.map(t => ({ type: 'transfer', title: `${t.player} transfer`, body: `${t.fromClub} → ${t.toClub}`, impact: t.impact, isNew: false }))
  ];
  
  document.getElementById('eplModalBody').innerHTML = allNews.length
    ? allNews.map(n => `
        <div class="card">
          <div class="card-border" style="background:${typeColor(n.type || n.tag)}"></div>
          <div class="card-body">
            <div class="card-top">
              <span class="card-tag">${formatTag(n.type || n.tag)}</span>
              <span class="impact-badge ${impactClass(n.impact)}">${impactLabel(n.impact)}</span>
            </div>
            <div class="card-title">${n.title}</div>
            ${n.subtitle ? `<div class="card-subtitle">${n.subtitle}</div>` : ''}
            <div class="card-detail">${n.body}</div>
          </div>
        </div>`).join('')
    : '<p class="empty-state">No recent activity for this club.</p>';
  
  overlay.classList.add('open');
}

// ─── HOME PAGE CURATION (Dynamic) ─────────────────────────────────────────────
function formScore(team) {
  // Score a team's last-5 form: W=3, D=1, L=0. Max 15.
  return (team.form || []).reduce((sum, r) => sum + (r === 'W' ? 3 : r === 'D' ? 1 : 0), 0);
}

function renderHomePage() {
  const homeSection = document.getElementById('home-page');
  if (!homeSection) return;

  const now = Date.now();

  // ── Hottest / Coldest teams: rank ALL leagues by last-5 form score ──
  const leagueLabel = { 'premier-league': 'PL', 'la-liga': 'La Liga', 'bundesliga': 'BL' };
  const allFormTeams = [
    ...FORM_DATA,
    ...(typeof LA_LIGA_FORM_DATA !== 'undefined' ? LA_LIGA_FORM_DATA : []),
    ...(typeof BUNDESLIGA_FORM_DATA !== 'undefined' ? BUNDESLIGA_FORM_DATA : []),
  ];
  const scored = allFormTeams.map(f => ({ ...f, score: formScore(f) }));
  const hottest = [...scored].sort((a, b) => b.score - a.score || b.wins - a.wins).slice(0, 10);
  const coldest = [...scored].sort((a, b) => a.score - b.score || a.wins - b.wins).slice(0, 10);

  // Badge helpers for homepage
  const ESPN_BADGE_HOME = id => `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${id}.png&w=40&h=40`;

  const PL_BADGE_HOME   = id => `https://resources.premierleague.com/premierleague/badges/70/${id}.png`;
  const HOME_BADGE_MAP = {
    // PL
    'Arsenal': PL_BADGE_HOME('t3'), 'Manchester City': PL_BADGE_HOME('t43'), 'Chelsea': PL_BADGE_HOME('t8'),
    'Liverpool': PL_BADGE_HOME('t14'), 'Tottenham Hotspur': PL_BADGE_HOME('t6'), 'Wolves': PL_BADGE_HOME('t39'),
    'Wolverhampton': PL_BADGE_HOME('t39'), 'Manchester United': PL_BADGE_HOME('t1'), 'Aston Villa': PL_BADGE_HOME('t7'),
    'Brentford': PL_BADGE_HOME('t94'), 'Fulham': PL_BADGE_HOME('t54'), 'Bournemouth': PL_BADGE_HOME('t91'),
    'Brighton': PL_BADGE_HOME('t36'), 'Newcastle': PL_BADGE_HOME('t4'), 'Crystal Palace': PL_BADGE_HOME('t31'),
    'Everton': PL_BADGE_HOME('t11'), 'Sunderland': PL_BADGE_HOME('t56'), 'Leeds United': PL_BADGE_HOME('t2'),
    'West Ham': PL_BADGE_HOME('t21'), 'Nottm Forest': PL_BADGE_HOME('t17'), 'Burnley': PL_BADGE_HOME('t90'),
    // La Liga — verified ESPN IDs from ESPN standings API
    'Barcelona': ESPN_BADGE_HOME('83'), 'Real Madrid': ESPN_BADGE_HOME('86'), 'Atlético Madrid': ESPN_BADGE_HOME('1068'),
    'Atletico Madrid': ESPN_BADGE_HOME('1068'), 'Villarreal': ESPN_BADGE_HOME('102'), 'Real Betis': ESPN_BADGE_HOME('244'),
    'Celta Vigo': ESPN_BADGE_HOME('85'), 'Real Sociedad': ESPN_BADGE_HOME('89'), 'Espanyol': ESPN_BADGE_HOME('88'),
    'Getafe': ESPN_BADGE_HOME('2922'), 'Athletic Club': ESPN_BADGE_HOME('93'), 'Osasuna': ESPN_BADGE_HOME('97'),
    'Girona': ESPN_BADGE_HOME('9812'), 'Valencia': ESPN_BADGE_HOME('94'), 'Sevilla': ESPN_BADGE_HOME('243'),
    'Mallorca': ESPN_BADGE_HOME('84'), 'Alaves': ESPN_BADGE_HOME('96'), 'Elche': ESPN_BADGE_HOME('3751'),
    'Levante': ESPN_BADGE_HOME('1538'), 'Real Oviedo': ESPN_BADGE_HOME('92'), 'Rayo Vallecano': ESPN_BADGE_HOME('101'),
    // Bundesliga — verified ESPN IDs from ESPN standings API
    'Bayern Munich': ESPN_BADGE_HOME('132'), 'Borussia Dortmund': ESPN_BADGE_HOME('124'), 'TSG Hoffenheim': ESPN_BADGE_HOME('7911'),
    'VfB Stuttgart': ESPN_BADGE_HOME('134'), 'RB Leipzig': ESPN_BADGE_HOME('11420'), 'Bayer Leverkusen': ESPN_BADGE_HOME('131'),
    'Eintracht Frankfurt': ESPN_BADGE_HOME('125'), 'SC Freiburg': ESPN_BADGE_HOME('126'), 'Union Berlin': ESPN_BADGE_HOME('598'),
    'FC Augsburg': ESPN_BADGE_HOME('3841'), 'Hamburger SV': ESPN_BADGE_HOME('127'), "Borussia M'gladbach": ESPN_BADGE_HOME('268'),
    'Mainz 05': ESPN_BADGE_HOME('2950'), '1. FC Köln': ESPN_BADGE_HOME('122'), 'Werder Bremen': ESPN_BADGE_HOME('137'),
    'FC St. Pauli': ESPN_BADGE_HOME('270'), 'VfL Wolfsburg': ESPN_BADGE_HOME('138'), '1. FC Heidenheim': ESPN_BADGE_HOME('6418'),
  };

  const renderFormGrid = (teams, emoji, title) => teams.length ? `
    <div class="home-section">
      <div class="home-section-title">${emoji} ${title}</div>
      <div class="home-form-grid">
        ${teams.map((f, idx) => {
          const pips = (f.form || []).map(r => `<span class="form-pip form-${r.toLowerCase()}">${r}</span>`).join('');
          const league = leagueLabel[f.league] || '';
          const badgeUrl = HOME_BADGE_MAP[f.team] || '';
          const badgeHtml = badgeUrl
            ? `<img src="${badgeUrl}" alt="${f.team}" style="width:32px;height:32px;object-fit:contain;border-radius:4px;" loading="lazy" onerror="this.style.display='none'">`
            : `<span style="font-size:1.4rem">${f.badge}</span>`;
          return `
            <div class="home-form-card">
              <div class="home-form-rank">#${idx + 1}</div>
              <div class="home-form-team">${badgeHtml} ${f.team} <span style="font-size:0.7rem;opacity:0.5">${league}</span></div>
              <div class="home-form-pips">${pips}</div>
              <div class="home-form-pts">${f.score}/15</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  ` : '';

  const formHtml = renderFormGrid(hottest, '🔥', 'Hottest Teams Right Now') +
                   renderFormGrid(coldest, '🥶', 'Coldest Teams Right Now');

  // ── Closest upcoming fixtures: sort by kickoff asc, show next 5 ──
  const upcoming = (PREVIEWS_DATA || [])
    .filter(p => p.id && p.kickoff && new Date(p.kickoff).getTime() > now)
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
    .slice(0, 10);

  const previewsHtml = upcoming.length ? `
    <div class="home-section">
      <div class="home-section-title">🗓️ Up Next</div>
      <div class="home-previews-grid">
        ${upcoming.map(p => {
          const ko = new Date(p.kickoff);
          // Time until kickoff
          const diffMs = ko - now;
          const diffH = Math.floor(diffMs / 3600000);
          const diffD = Math.floor(diffH / 24);
          const timeLabel = diffD > 1 ? `in ${diffD}d` : diffH > 0 ? `in ${diffH}h` : 'soon';
          return `
            <div class="home-preview-card">
              <div class="home-match-teams">${p.home} <span class="vs">vs</span> ${p.away}</div>
              <div class="home-match-time">${p.kickoffLabel || ko.toUTCString().slice(0,16)} · ${timeLabel}</div>
              <div class="home-match-comp">${p.competition}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  ` : '';

  homeSection.innerHTML = `
    <div class="home-page-content">
      ${formHtml}
      ${previewsHtml}
    </div>
  `;
}

// ─── CRISIS BANNER AUTO-TRIGGER ───────────────────────────────────────────────
function manageCrisisBanner() {
  const banner = document.getElementById('crisisBanner');
  if (!banner) return;
  
  // Count high-impact stories across all sections
  let highImpactCount = 0;
  
  // Count high-impact injuries
  highImpactCount += INJURIES_DATA.filter(i => i.impact === 'high').length;
  
  // Count high-impact transfers
  highImpactCount += TRANSFERS_DATA.filter(t => t.impact === 'high').length;
  
  // Count high-impact managers
  highImpactCount += MANAGERS_DATA.filter(m => m.impact === 'high').length;
  
  // Count high-impact previews (flagged matches)
  highImpactCount += PREVIEWS_DATA.filter(p => p.flag).length;
  
  // Auto-show if 3+ high-impact stories
  if (highImpactCount >= 3) {
    banner.classList.remove('hidden');
    console.log(`🚨 Crisis banner auto-triggered: ${highImpactCount} high-impact stories detected`);
  } else {
    // Only hide if not manually dismissed
    if (!sessionStorage.getItem('crisisBannerDismissed')) {
      banner.classList.add('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Validate data before rendering
  const isValid = validateAllData();
  if (!isValid) {
    console.error('⛔ Data validation failed — some cards may be hidden from UI');
  }
  
  // Setup all event listeners first
  setupFilters();
  setupPreviewFilters();
  setupLeagueFilter();
  setupSearch();
  setupNav();
  setupLastUpdated();
  
  // Always render all data sections (rendering and visibility are separate concerns)
  renderInjuries();
  renderTransfers();
  renderManagers();
  renderRules();
  renderForm();
  renderClubDrillDown();
  renderPreviews();
  updateHeroStats();
  renderHomePage();

  // Now apply visibility based on active tab
  const activeTab = document.querySelector('.league-tab.active');
  const startLeague = activeTab ? activeTab.dataset.league : 'all';
  if (startLeague === 'home') {
    // Home view — show hero, hide data sections and chrome
    document.querySelector('.hero')?.classList.remove('hidden');
    document.querySelectorAll('section.section').forEach(s => {
      if (s.id !== 'home-page') s.classList.add('hidden');
    });
    document.querySelectorAll('.section-divider').forEach(d => d.classList.add('hidden'));
    document.querySelector('.alert-banner')?.classList.add('hidden');
    document.querySelector('.section-chips-wrap')?.classList.add('hidden');
    document.querySelector('.search-bar-wrap')?.classList.add('hidden');
    const homeSection = document.getElementById('home-page');
    if (homeSection) homeSection.classList.remove('hidden');
  } else {
    // All Leagues / league-specific view — hide hero, show data
    document.querySelector('.hero')?.classList.add('hidden');
    document.querySelector('.alert-banner')?.classList.remove('hidden');
    document.querySelector('.section-chips-wrap')?.classList.remove('hidden');
    document.querySelector('.search-bar-wrap')?.classList.remove('hidden');
    document.querySelectorAll('section.section').forEach(s => {
      if (s.id !== 'home-page') s.classList.remove('hidden');
    });
    document.querySelectorAll('.section-divider').forEach(d => d.classList.remove('hidden'));
    const homeSection = document.getElementById('home-page');
    if (homeSection) homeSection.classList.add('hidden');
  }
  
  manageCrisisBanner();

  // EPL modal close handlers
  const closeBtn = document.getElementById('eplModalClose');
  const overlay = document.getElementById('eplModalOverlay');
  if (closeBtn) closeBtn.addEventListener('click', closeTeamModal);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeTeamModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTeamModal(); });
});
