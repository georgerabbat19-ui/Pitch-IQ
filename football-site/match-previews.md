# Match Previews — Schema Reference

> This file is a **schema reference only** — not a data store.
> Actual preview data lives in `data.js` → `PREVIEWS_DATA[]`
> All agents must use this file to understand what fields are required.

---

## Pipeline
Jarvis (kickoff + prune) → Scout (research) → Referee (fact-check) → Pixel (visual) → Jarvis (confirm)

## Scope
- **Leagues:** Premier League, La Liga, Bundesliga
- **Window:** All fixtures in the next 7 days
- **Frequency:** Every 3 days
- **Data target:** `PREVIEWS_DATA` array in `football-site/data.js`

---

## Data Structure — Each Entry in PREVIEWS_DATA

```js
{
  id: 'home-team-away-team',           // kebab-case, e.g. 'brentford-wolves'
  home: 'Club Name',                   // Full display name
  homeId: 'club-id',                   // kebab-case id
  homeBadgePlId: 't94',                // Badge ID for img lookup (PL badge system)
  homeColor: '#hex',                   // Primary club colour (hex)
  away: 'Club Name',
  awayId: 'club-id',
  awayBadgePlId: 't1',
  awayColor: '#hex',

  kickoff: 'YYYY-MM-DDTHH:MM:SSZ',     // ISO 8601 UTC — REQUIRED, used for pruning FT matches
  kickoffLabel: 'Mon 16 Mar · 04:00 MYT', // Human-readable label — MUST be in MYT (UTC+8). Convert kickoff UTC → MYT for display.
  competition: 'Premier League GW31',  // League + gameweek

  homeImportance: 'top5|relegation|low',  // Drives importance badge on card
  awayImportance: 'top5|relegation|low',

  narrative: 'String...',              // 2-4 sentence match context. Sourced, factual, no speculation.

  homeInjuries: ['Player (body part — status)'],  // Array of strings, or [] if none
  awayInjuries: ['Player (body part — status)'],

  managerNote: 'String or null',       // Manager news, loan restrictions, sacking etc. null if nothing.
  flag: 'String or null',              // ⚠️ warnings or ❌ postponements. null if nothing.

  homeLastMatch: {
    opponent: 'Club Name',
    score: 'X-Y',
    result: 'W|D|L',
    lastMatchDate: 'YYYY-MM-DDTHH:MM:SSZ',  // ISO 8601 UTC
    lineup: [
      { number: 1, name: 'Surname' },  // 11 starters only, jersey number + name
      // ... 10 more
    ],
    changes: 'String — key absences/returns for upcoming match. 1-2 sentences max.',
  },

  awayLastMatch: {
    opponent: 'Club Name',
    score: 'X-Y',
    result: 'W|D|L',
    lastMatchDate: 'YYYY-MM-DDTHH:MM:SSZ',
    lineup: [
      { number: 1, name: 'Surname' },
      // ... 10 more
    ],
    changes: 'String — key absences/returns for upcoming match.',
  },
}
```

---

## Field Rules (Scout must follow, Referee must enforce)

| Field | Rule |
|---|---|
| `kickoff` | Must be ISO UTC (machine use only — for pruning logic). |
| `kickoffLabel` | Human-readable. **Must show MYT (UTC+8).** Format: `Mon 16 Mar · 04:00 MYT`. Never show UTC or GMT offset. |
| `competition` | Must match league name exactly — "Premier League", "La Liga", "Bundesliga" |
| `homeImportance` / `awayImportance` | Must be exactly: `top5`, `relegation`, or `low` |
| `narrative` | Factual only. No speculation. Must reflect current standings/form. Source in Referee notes. |
| `homeInjuries` / `awayInjuries` | Each entry: "Player Name (body part — status)". Status: out / doubt / long-term. Empty array `[]` if none confirmed. |
| `managerNote` | Use for manager changes, loan restrictions, notable quotes. `null` if nothing relevant. |
| `flag` | Use for postponements (❌), unverified data warnings (⚠️). `null` if clean. |
| `lineup` | Exactly 11 starters. Jersey number + last name only. Must be from the actual last match — not predicted. |
| `changes` | What's different for the upcoming match — injuries, suspensions, returns. 1-2 sentences. |
| `lastMatchDate` | Must be ISO UTC of the actual match played, not the current date. |

---

## Coverage Report (Scout must include in handoff to Referee)

Every preview cycle handoff must start with:

```
## Preview Coverage Report
Fixtures researched: [X total — PL: X, La Liga: X, Bundesliga: X]
Window: [date range]
Removed (FT/postponed): [list or "none"]
Missing data flagged: [any fields Scout couldn't verify — or "none"]
```

If this report is missing → Referee bounces the entire batch back.

---

## Referee Fact-Check Checklist (per fixture)

For every entry, Referee must verify:
- [ ] `kickoff` date and time correct (cross-check fixture list)
- [ ] `competition` label correct
- [ ] `narrative` claims factual and sourced (standings, form, injuries)
- [ ] `homeInjuries` / `awayInjuries` verified against recent reports
- [ ] `managerNote` accurate if present
- [ ] `flag` warranted if present
- [ ] `homeLastMatch` / `awayLastMatch` — date, opponent, score, result all correct
- [ ] `lineup` — 11 players, jersey numbers accurate for that match
- [ ] `changes` — absences/returns correctly stated and sourced
- [ ] `homeImportance` / `awayImportance` — appropriate given current league position

Any field that fails → ❌ CORRECTIONS NEEDED, named specifically. Scout fixes and resubmits.
