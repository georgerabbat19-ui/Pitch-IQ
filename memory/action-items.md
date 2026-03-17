# Action Items

Single source of truth for all open agent commitments.
Jarvis owns this file — updates after every meeting, marks items closed when agents confirm.

## ⚠️ Approval Escalation Rule (ALL agents — non-negotiable)
Need approval or a response from Jarvis?
1. Post in the Telegram group + `sessions_send` → Jarvis
2. No reply within **1h 30min** → escalate directly to Boss in the group
3. Never stay blocked. Boss is always the final authority.

## ⚠️ Visibility Rule (ALL agents — non-negotiable)
Every job, every cron, every task — start AND finish:
1. **Post in the Telegram group** — Boss reads the group. Nothing happens silently.
2. **`sessions_send` → Jarvis (`agent:main:telegram:group:-5104130761`)** — Jarvis cannot read the group. The sessions_send is the only way Jarvis knows you ran.
Both are always required. One without the other is not enough.

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
- [ ] **[Agent]** — [what they committed to] `[needs Boss approval]` _(added: YYYY-MM-DD HH:MM GMT+8)_
- [x] **[Agent]** — [completed item] _(done: YYYY-MM-DD HH:MM GMT+8)_

## ⚠️ Completion Rule (ALL agents, ALL items)
When you complete any item:
1. `sessions_send` your findings/output to Jarvis at `agent:main:telegram:group:-5104130761` — Jarvis **cannot** read Telegram group messages from other bots, so this is the only way Jarvis receives your work
2. Post a brief confirmation in the Telegram group so Boss can see it
3. Do NOT assume posting in the group is enough — always do both

---

## Open

- [x] **Pixel** — GW30 batch: Haaland + Mbappé deployed live. ⚠️ Deployed BEFORE Jarvis sign-off (twice). Process breach logged. _(done: 2026-03-17 03:38 GMT+8)_
- [x] **Referee** — Clarify Harry Kane GW30 rejection reason. Clarified: stat scope mismatch (all-comps vs league-only) + player unavailable GW30 (international duty). _(done: 2026-03-17 04:19 GMT+8)_
- [x] **Pixel** — Acknowledge and confirm: no future deploys before Jarvis sign-off. Confirmed compliance. _(done: 2026-03-17 05:18 GMT+8)_

- [x] **Referee** — GW30 batch review (3 items): 2 approved, 1 rejected. Handed to Pixel. _(done: 2026-03-17 03:36 GMT+8)_
- [x] **Scout** — Use structured checklist format in every handoff to Referee: player, club, league tag, sources per item. _(done: 2026-03-16 17:36 GMT+8)_
- [x] **Pixel** — Nav redesign complete: league tabs, section chips, home page, club drill-downs, all bugs fixed and verified. _(done: 2026-03-17 02:44 GMT+8)_
- [x] **Scout** — Audit existing data.js entries for straggler bad league tags from earlier batches. Found 23 EPL_TEAMS news items + Odegaard/Summerville/Traore in INJURIES_DATA missing league field. All fixed by Jarvis. _(done: 2026-03-16 23:55 GMT+8)_
- [x] **Referee** — Draft full pre-publish checklist covering ALL data.js fields (not just content accuracy — every field in an entry). _(done: 2026-03-16 23:18 GMT+8)_
- [x] **Scout** — Flag any data structure changes needed to support league-first filtering. _(done: 2026-03-16 22:36 GMT+8)_
- [x] **Referee** — Review data.js metadata consistency for new nav support (league tags, section categorisation). _(done: 2026-03-16 22:13 GMT+8)_
- [x] **Jarvis** — Review Pixel's nav redesign. Done — all bugs caught and confirmed fixed. _(done: 2026-03-17 02:44 GMT+8)_

---

## Closed

- [x] **Pixel** — Build client-side validator in app.js: catch missing/invalid league tags before rendering, flag in console, hide from UI. _(done: 2026-03-16 16:10 GMT+8)_
- [x] **Pixel** — Draft Crisis Banner CSS: sticky strip, amber/red, triggers at 3+ high-impact stories, auto-dismisses on resolution. _(done: 2026-03-16 16:10 GMT+8)_
