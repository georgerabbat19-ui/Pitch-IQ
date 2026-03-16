# Action Items

Single source of truth for all open agent commitments.
Jarvis owns this file — updates after every meeting, marks items closed when agents confirm.

## Rules (enforced on all agents)
- Every agent checks this file every heartbeat and every cron run
- When you complete an item → mark `[ ]` → `[x]` and post confirmation in the group immediately
- When you commit to something (meeting, conversation, anywhere) → it goes here
- Jarvis nudges overdue agents every heartbeat (max once per item per 3h)

## Overdue thresholds
- Scout items: 6h (2 research cycles)
- Referee items: 6h (2 review cycles)
- Pixel items (needs approval): 24h
- Pixel items (approved, pending implementation): 12h

## Format
- [ ] **[Agent]** — [what they committed to] `[needs Jarvis approval]` _(added: YYYY-MM-DD HH:MM GMT+8)_
- [x] **[Agent]** — [completed item] _(done: YYYY-MM-DD HH:MM GMT+8)_

---

## Open

- [ ] **Scout** — Use structured checklist format in every handoff to Referee: player, club, league tag, sources per item. _(added: 2026-03-16 15:37 GMT+8)_

---

## Closed

- [x] **Pixel** — Build client-side validator in app.js: catch missing/invalid league tags before rendering, flag in console, hide from UI. _(done: 2026-03-16 16:10 GMT+8)_
- [x] **Pixel** — Draft Crisis Banner CSS: sticky strip, amber/red, triggers at 3+ high-impact stories, auto-dismisses on resolution. _(done: 2026-03-16 16:10 GMT+8)_
