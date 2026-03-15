# PitchIQ — Build Summary

## What Was Built

A complete, single-page static football predictions intelligence website called **PitchIQ**, located at `/home/ai/.openclaw/workspace/football-site/`.

---

## Files

| File | Size | Purpose |
|------|------|---------|
| `index.html` | ~8KB | Main page structure, semantic sections, nav |
| `style.css` | ~18KB | Full dark theme, responsive layout, animations |
| `app.js` | ~24KB | All data, rendering, filtering, search logic |
| `README.md` | ~2.5KB | Usage and deployment instructions |

---

## Design Decisions

### Layout
- **Single-page with scroll** — all 5 sections on one page, each with anchor links in the sticky nav. More cohesive than multi-page for a news aggregator.
- **Card-based layout** with 3-column responsive grid (auto-fill, min 300px). Wide variant (360px) for richer cards like manager changes and VAR rules.
- **3px left-border accent** on each card to colour-code by type (red=injury, orange=suspension, green=transfer-in, purple=manager, blue=VAR, yellow=form).

### Dark Theme
- Custom CSS variables throughout — easy to retheme.
- `#0d0f14` primary background (very dark navy-black).
- `#00e676` accent green for positive states, stats, and CTAs — classic sports/prediction app green.
- Subtle radial gradients on the hero, card hover states with `transform: translateY(-1px)`.

### Interactivity (app.js)
- **Per-section filter buttons** — Injuries (All / Injuries / Suspensions / Doubt), Transfers (All / Signings / Departures), Form (All / Premier League / La Liga / Bundesliga / Serie A).
- **Global search bar** — searches across all 5 sections simultaneously by player name, club, or keyword (via `data-search` attributes).
- **IntersectionObserver** — highlights the correct nav tab as you scroll.
- **Empty state** — shows a "no items match" message when filters return nothing.
- **Mobile nav** — collapsible hamburger menu for screens < 900px.
- **Fade-up animation** — cards animate in on load with staggered delays.

### Content (Realistic Placeholders)
- 8 injury/suspension entries (realistic Premier Division/European club names, positions, injury types)
- 6 transfer records (plausible fees, loan types, reasoning)
- 4 manager change entries (with tactical notes and prediction implications)
- 3 VAR/rule change items (based on real 2025/26 IFAB changes, adapted)
- 6 form/stats cards across 4 leagues (W/D/L streaks, points, goal diff, clean sheets)

---

## Notable Features

- **Hero stats bar** — live counts of active items per section
- **Alert banner** — GW29 prediction tip above the fold
- **Impact badges** — High/Medium/Low on every card
- **Prediction notes** — VAR cards include explicit "what this means for your bets" callouts
- **Last updated timestamp** — auto-set to current session time on load
- **Live badge** — red pulsing dot in the header

---

## How to Run

```bash
open /home/ai/.openclaw/workspace/football-site/index.html
# or serve it:
cd /home/ai/.openclaw/workspace/football-site && python3 -m http.server 8080
```

No build step. No dependencies. Zero install required.

---

## EPL Teams Section — 2026-03-15

### What Was Built
Added a new **EPL Teams** tab and section to the PitchIQ site, showing all 20 current Premier League clubs (2024/25 season).

### Implementation

**index.html:**
- Added "EPL Teams" nav item to the sticky navbar (with `data-section="epl-teams"` for IntersectionObserver tracking)
- Added `<section id="epl-teams">` with a `.epl-teams-grid` container
- Added the EPL team news modal markup (`#eplModalOverlay`) with accessible `role="dialog"` and `aria-modal` attributes
- Modal has sticky header showing team badge + name, close button, and scrollable body

**style.css:**
- `.epl-teams-grid` — responsive auto-fill grid, min 180px columns (140px on mobile)
- `.epl-team-card` — dark card with top green border on hover, badge + name + news count
- `.epl-modal-overlay` — fixed full-viewport overlay with backdrop blur, opacity transition
- `.epl-modal` — centered modal with scale+translateY entrance animation, max-height scroll
- `.epl-modal-body .card` — news cards in modal reuse existing card styles with animation/hover disabled

**app.js:**
- `EPL_TEAMS` array — 20 team objects, each with `id`, `name`, `badge`, and `news[]` array
- Each team has 2–4 realistic placeholder news items (injuries, suspensions, transfers, manager news)
- `renderEplTeamCard()` — renders the grid card with staggered animation delays
- `renderEplNewsCard()` — renders news items using existing `formatTag()` + `impactBadge()` helpers
- `openEplModal()` / `closeEplModal()` — modal state management + body scroll lock
- `setupEplTeams()` — event delegation on grid, close button, overlay click, Escape key
- `renderAll()` updated to inject EPL teams grid and set count badge
- `setupSearch()` extended to filter EPL team cards by team name

### Teams Covered
Arsenal, Aston Villa, Bournemouth, Brentford, Brighton, Chelsea, Crystal Palace, Everton, Fulham, Ipswich Town, Leicester City, Liverpool, Man City, Man United, Newcastle, Nottm Forest, Southampton, Spurs, West Ham, Wolves

### Design Consistency
- Matches existing dark theme (`#0d0f14` background, `#00e676` accent)
- Impact badges (High/Medium/Low) and left-border colour coding match existing card system
- Type tags (injury/suspension/transfer-in/manager) use same `formatTag()` function
- Fade-up animations consistent with existing card animations
