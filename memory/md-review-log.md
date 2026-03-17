# MD Review Log

## 2026-03-18 03:00 MYT — Daily Markdown File Review

**Run by:** Jarvis (cron)
**Files scanned:** 4 workspaces — Jarvis, Scout, Referee, Pixel
**Total markdown files:** ~90 across all workspaces

---

### Changes Made

#### football-site/PROJECT.md
- **Fixed:** Design Decisions section said "All data lives in `app.js`" — corrected to `data.js` (factual error)
- **Updated:** Changelog — added Mar 16-17 entries: league filter tabs, section chips, client-side validator, crisis banner CSS, nav redesign completion
- **Updated:** Pending/Planned — marked league filter as DONE

#### memory/meeting-log.md
- **Updated:** 2026-03-17 team meeting status changed from OPEN → COMPLETE with outcome summary

#### agents/pixel/workspace/MEMORY.md
- **Filled in:** "Lessons Learned" placeholder — added 5 real lessons from operational experience (deploy process breach, syntax errors, EUROPEAN_NEWS wiring gap, renderClubDrillDown bug, git push rule)
- **Filled in:** "Key Decisions" placeholder — Referee-approval-as-green-light rule (Mar 17)

#### agents/referee/workspace/MEMORY.md
- **Filled in:** "Lessons Learned" placeholder — added 6 real lessons (scope mismatch, international duty, wrong clubs, suspension estimates, standings context errors, correction routing)
- **Filled in:** "Key Decisions" placeholder — pre-publish checklist and badge ID audit

#### MEMORY.md (Jarvis)
- **Added:** "Known File Gaps" section noting `memory/pipeline-log.md` doesn't exist but is referenced in HEARTBEAT.md
- **Updated:** Meeting note — team communication rules meeting marked COMPLETE

---

### Issues Logged (Not Fixed — Preserved Intentionally)

| File | Issue | Reason Not Fixed |
|---|---|---|
| `SUPERVISOR.md` | Describes old single-agent model (Researcher/Designer) | Historical reference, flagged in MEMORY.md |
| `REVIEWER.md` | Early Reviewer spec, superseded by Referee | Historical reference, flagged in MEMORY.md |
| `agents/designer/MEMORY.md` | Legacy stub, references old pipeline | Historical |
| `agents/researcher/MEMORY.md` | Legacy stub, references old pipeline | Historical |
| `agents/scout/workspace/memory/MEMORY.md` | Only has token efficiency rules — no operational content | Scout owns this file; no edits to agent-owned files without instruction |
| `agents/referee/workspace/memory/MEMORY.md` | Same — stub only | Same reason |

---

### No Contradictions Found

- All MEMORY.md files across agents are consistent on: Timezone (MYT), Approval Escalation Rule, Visibility Rule, Deployment Rule (Referee approval = green light)
- Pipeline rules consistent across RULES.md files
- Session key references consistent across all files

---

### No Duplicate Content Found

- Each agent's operational MEMORY.md covers different domain knowledge appropriate to their role
- Shared rules (Timezone, Visibility, Escalation) are intentionally duplicated — this is by design so each agent is self-contained

---

**Next review:** 2026-03-19 ~03:00 MYT (daily cron)
