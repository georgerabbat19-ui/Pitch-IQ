# DOCS.md - Documentation Standards (Mandatory)

## The Rule
**If it happened, write it down. If it was decided, write it down. If it was learned, write it down.**

Memory files are how this team persists across sessions. Sloppy docs = lost context = repeated mistakes = wasted work.

---

## File Ownership

### Jarvis owns:
- `MEMORY.md` — long-term project memory, decisions, lessons
- `memory/YYYY-MM-DD.md` — daily activity log
- `memory/heartbeat-state.json` — pipeline timestamps
- `memory/meeting-log.md` — team meeting summaries + action items
- `football-site/BUILD_SUMMARY.md` — site changelog

### Scout owns:
- `memory/scout-state.json` — research cycle timestamps
- `memory/pending-research.md` — findings waiting for Referee
- `memory/published.json` — all published stories (deduplication)
- `memory/research-log.md` — full research history with sources
- `memory/MEMORY.md` — patterns, source quality, lessons learned

### Referee owns:
- `memory/pending-review.md` — items received from Scout
- `memory/review-verdicts.md` — all verdicts with reasoning
- `memory/rejection-log.md` — rejected items + reasons (Scout improvement reference)
- `memory/MEMORY.md` — patterns in Scout's errors, quality trends

### Pixel owns:
- `memory/pixel-state.json` — design cycle timestamps
- `memory/design-log.md` — full changelog of every change made or proposed
- `memory/proposals.md` — pending proposals awaiting Jarvis/Boss approval
- `memory/MEMORY.md` — design decisions, what worked, what didn't

---

## Update Rules

### After every research cycle (Scout):
- Update `memory/scout-state.json` with `lastResearchAt`
- Add findings to `memory/pending-research.md`
- Add sourced items to `memory/research-log.md`

### After every review (Referee):
- Update `memory/review-verdicts.md` with full verdicts
- Add rejections to `memory/rejection-log.md` with clear reasoning
- Update `memory/MEMORY.md` if a pattern is spotted

### After every design action (Pixel):
- Update `memory/design-log.md` with: what changed, file + line, before/after, reason
- Update `memory/pixel-state.json` with `lastReviewAt`
- Add proposals to `memory/proposals.md` until approved/rejected

### After every team meeting (Jarvis):
- Log summary to `memory/meeting-log.md`: date, attendees, key points, action items, owners
- Update individual agents' memory files if Jarvis spotted something on their behalf
- Update `MEMORY.md` with anything worth long-term retention

### After publishing to data.js (Jarvis):
- Update `memory/heartbeat-state.json` publishedStories array
- Update `football-site/BUILD_SUMMARY.md` with what was added

---

## Memory File Format

### meeting-log.md entry:
```
## Meeting — [Date] [Time]
**Attendees:** Jarvis, Scout, Referee, Pixel
**Scout:** [status]
**Referee:** [status]
**Pixel:** [status]
**Jarvis ideas:** [cross-dept observations]
**Actions:**
- [ ] [task] → [owner] → [deadline]
```

### research-log.md entry:
```
## [Date] Research Cycle
- **[Team]** | [Headline] | [Source URL] | Status: pending/approved/rejected
```

### design-log.md entry:
```
## [Date] — [Change title]
- **File:** style.css line X
- **Change:** [what changed]
- **Reason:** [why it's better]
- **Status:** implemented / proposed / rejected
```

---

## The Standard
Docs should be good enough that if a brand new agent replaced any of us tomorrow, they could read the memory files and pick up exactly where we left off. No gaps, no "I remember we decided..." — it's written down or it didn't happen.
