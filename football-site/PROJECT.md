# PROJECT.md — PitchIQ Source of Truth

> ⚠️ READ THIS BEFORE TOUCHING ANYTHING. This is the authoritative record of what exists and how it works. Do not remove or alter features unless explicitly instructed.

---

## What This Is
A static single-page football predictions intelligence website called **PitchIQ**.
Purpose: surface prediction-relevant news (injuries, transfers, manager changes, rules, form).
Stack: Pure HTML + CSS + JS. No frameworks. No build step.

---

## Files
| File | Purpose |
|---|---|
| `index.html` | Page structure, 5 sections, sticky nav |
| `style.css` | Dark theme, responsive layout, animations |
| `data.js` | ⚡ ALL DATA LIVES HERE — safe to edit, update frequently |
| `app.js` | 🔒 RENDERING ENGINE ONLY — do not touch unless explicitly told to |
| `PROJECT.md` | This file — source of truth |
| `BUILD_SUMMARY.md` | Original build notes |
| `README.md` | How to run/deploy |

## ⚠️ Sub-Agent Rules
- **Only edit `data.js`** when updating news/scores/injuries/transfers
- **Never rewrite `app.js`** unless explicitly instructed to change the UI
- **Never rewrite `style.css`** unless explicitly instructed to change design
- Always update the Changelog below after any change

## 📰 News Accuracy Rules
- Every news item MUST be verified by **at least 2 independent sources** (e.g. BBC Sport + Sky Sports, or NBC Sports + The Athletic)
- Include the primary source URL on each card
- If only 1 source reports something, either skip it or mark it `unverified: true` and note "Single source — unconfirmed"
- Acceptable sources: BBC Sport, Sky Sports, The Athletic, NBC Sports, ESPN, Guardian, Telegraph, Mail, Mirror, Transfermarkt
- Do NOT use Twitter/X, Reddit, or fan sites as primary sources

---

## Sections (DO NOT REMOVE)
1. **Injuries & Suspensions** — 8 cards, player availability
2. **Transfers** — 6 cards, signings/departures/loans
3. **Manager Changes** — 4 cards, tactical impact notes
4. **Rules & VAR** — 3 cards, prediction implications per rule
5. **Form & Stats** — 6 team cards, W/D/L/GD/clean sheets
6. **EPL Teams** — 20 team cards, all 2024/25 Premier League clubs; click for team-specific news modal

---

## Features (DO NOT BREAK)
- ✅ Sticky nav with scroll-tracking (IntersectionObserver)
- ✅ Global search bar (searches all 5 sections by player/club/keyword)
- ✅ Per-section filter buttons (Injuries: All/Injuries/Suspensions/Doubt | Transfers: All/Signings/Departures | Form: All + leagues)
- ✅ Impact badges — High / Medium / Low on every card
- ✅ 3px left-border colour coding by type (red=injury, orange=suspension, green=transfer-in, purple=manager, blue=VAR, yellow=form)
- ✅ Hero stats bar (live item counts per section)
- ✅ Alert banner (GW prediction tip)
- ✅ Mobile responsive — hamburger menu < 900px
- ✅ Fade-up card animations on load
- ✅ Empty state message when filters return nothing
- ✅ Live badge (red pulsing dot in header)
- ✅ Last updated timestamp (auto-set on load)
- ✅ Prediction notes on VAR cards
- ✅ EPL Teams section — 20 clickable team cards with badge/emoji, team name, news count badge
- ✅ Team news modal — clicking a team opens an animated modal with 2–4 news items per club
- ✅ Modal cards use same card format (impact badges, left-border colour coding, type tags)
- ✅ Modal closes via ✕ button, overlay click, or Escape key
- ✅ EPL Teams added to sticky nav with IntersectionObserver active-state tracking
- ✅ Search bar filters team cards by team name

---

## Design Decisions (DON'T CHANGE WITHOUT REASON)
- Dark theme — `#0d0f14` background, `#00e676` accent green
- Card grid: auto-fill, min 300px (wide variant 360px for manager/VAR cards)
- CSS variables throughout — easy to retheme if needed
- All data lives in `data.js` as JS arrays — no backend, no API yet

---

## Changelog
| Date | Change | By |
|---|---|---|
| 2026-03-14 | Initial build — all 5 sections, full feature set | subagent |
| 2026-03-15 | EPL Teams tab added — 20 teams, clickable modals | subagent |
| 2026-03-15 | Real EPL data populated — GW30 injuries/suspensions/transfers/managers/form/rules | subagent |
| 2026-03-15 | Rendering engine rebuilt — app.js was data-only, full JS render functions restored | Jarvis |
| 2026-03-15 | Hero stats and section counts made dynamic (no more hardcoded numbers) | Jarvis |
| 2026-03-15 | Split data.js (data only) from app.js (rendering engine) — prevents sub-agents breaking the UI | Jarvis |
| 2026-03-15 | Added EPL Teams section — 20 team cards, team news modal, nav item, CSS, search integration | subagent |
| 2026-03-16 | League filter tabs (All/PL/La Liga/Bundesliga), section chips, league-first data tagging | Pixel/Jarvis |
| 2026-03-16 | Client-side validator in app.js: catches missing/invalid league tags, flags in console | Pixel |
| 2026-03-16 | Crisis Banner CSS: sticky strip, amber/red, triggers at 3+ high-impact stories | Pixel |
| 2026-03-17 | Nav redesign complete: league tabs, section chips, home page, club drill-downs (all 3 leagues) — all bugs fixed and verified | Pixel/Jarvis |

---

## Pending / Planned
- [x] League filter for all sections — DONE (2026-03-17)
- [ ] Replace placeholder content with real scraped data (football-scraper skill, TBD)
- [ ] Real-time data feed via API (future)

---

## Instructions for Sub-Agents
- Always read this file before making any changes
- After making changes, update the Changelog section above
- Never remove existing features unless Boss (George) explicitly says to
- When adding features, add them to the Features list above
- Keep the stack pure HTML/CSS/JS unless Boss approves a framework
