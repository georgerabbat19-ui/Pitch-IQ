# MEMORY.md - Long-Term Memory

## About Me
- Name: Jarvis 🤖
- First boot: 2026-03-14

## About Boss
- Name: George, address as "Boss"
- Timezone: GMT+8
- First interaction: 2026-03-14

## PitchIQ Business
- Football news/analysis site — Premier League, La Liga, Bundesliga
- Pipeline: Scout → Referee → Pixel → Jarvis (fixed, no exceptions)
- **UCL rule:** We do NOT cover UCL as a league. UCL is only relevant when it affects player/club status in PL, La Liga, or Bundesliga (e.g. injuries picked up in a UCL match, suspensions carrying over to league games). No UCL standings, results, or UCL-specific narratives.
- Telegram group (-5104130761) is the team's visible workspace
- Every bot always posts from their own account
- Crons: pipeline check (6h), match preview update (3 days) — team meeting crons permanently deleted 2026-03-17, do NOT recreate
- match-previews.md lives at /home/ai/.openclaw/workspace/football-site/match-previews.md
- Match preview pipeline (every 3 days): Jarvis kickoff → Scout (research + last game + previous lineup) → Referee (fact-check all incl. lineups) → Pixel (quick visual review — sanity check only once structure is established)
- Model rule: Sonnet for all agent sessions (group + heartbeat), Opus for critical decisions

## Session Types (Lessons Learned)
- Each agent has multiple session types — do NOT confuse them when checking health:
  - `agent:<id>:telegram:group:-5104130761` → group chat session (last message from human/group interaction)
  - `agent:<id>:main` → heartbeat session (fires on heartbeat interval, completely separate)
  - `agent:<id>:cron:<job-id>` → isolated cron job session (one-shot, per cron run)
- **Always check `agent:<id>:main` for heartbeat recency** — the group chat session timestamp is NOT the heartbeat timestamp
- Heartbeat intervals: Referee=30min, Scout=1h, Jarvis=1h, Pixel=2h
- Scout research cron: every 6h (changed from 3h on 2026-03-17)

## Timezone — Malaysian Time (Non-Negotiable)
- **All times must be displayed in MYT (Malaysia Time) = UTC+8** — logs, memory files, group posts, meeting logs, preview labels, timestamps, everything
- `MYT = UTC + 8 hours`. Always suffix with `GMT+8` or `MYT`
- Exception: ISO UTC fields in data.js (e.g. `kickoff`) stay as UTC for machine use — but human-readable labels always show MYT
- Never display raw UTC to Boss or in the group. Use `exec` with Python to convert — never mental arithmetic.

## Approval Escalation Rule (Non-Negotiable)
When an agent needs approval or a response from Jarvis:
1. Agent posts in Telegram group + `sessions_send` → Jarvis
2. If Jarvis hasn't replied within **1 hour 30 minutes** → agent escalates directly to Boss in the group
3. Jarvis must not be a bottleneck. Boss is always the final authority.
This rule is in: all MEMORY.md files, all RULES.md files, action-items.md, and all relevant cron prompts.

## Visibility Rule (Non-Negotiable)
Every agent job, cron, or task — start AND finish:
1. **Post in the Telegram group** — Boss reads the group. Nothing happens silently.
2. **`sessions_send` → Jarvis (`agent:main:telegram:group:-5104130761`)** — Jarvis cannot read the group. The sessions_send is the only way Jarvis knows an agent ran.
Both always required. One without the other is not enough.
This is in: all RULES.md files, all cron prompts, action-items.md, and all MEMORY.md files.

## Lessons Learned — Cron Timing
- **Never manually calculate Unix timestamps** — always use `exec` with Python to convert `nextRunAtMs` to local time. Mental math on 13-digit ms timestamps causes errors (got 18:14 instead of 18:34 on 2026-03-16, caused Boss to push an unnecessary manual trigger of Scout's cron).
- **Check `runningAtMs` before declaring a cron overdue** — if `runningAtMs` is set with no `lastRunAtMs`, the job is mid-run, not missed. `cron runs` returns empty while a job is in-flight.
- **Never manually trigger Scout's research cron** — it runs on its own schedule. Only flag to Boss if genuinely overdue after verifying with accurate timestamp calculation.

## mentionPatterns Config (Lessons Learned)
- Correct key: `agents.list[].groupChat.mentionPatterns` — NOT `routing.groupChat.mentionPatterns`
- Patterns are case-insensitive by default — no need for `(?i)` prefix
- No `\b` word boundaries needed — simple strings work fine
- Don't use sed to edit JSON — use Python to avoid escape mangling
- `openclaw gateway restart` kills itself mid-run (it's the gateway process) — use `nohup bash -c 'sleep 3 && systemctl --user restart openclaw-gateway.service' & disown` instead

## Agent Communication Model (Non-Negotiable)
**Telegram group = Boss's visual feed only.** Posts are announcements — not instructions. Other agents do NOT act on Telegram messages.
**`sessions_send` = the only real agent wire.** If you need another agent to DO something, `sessions_send` them. Period.

**Cross-agent workflow (applies to all agents including Jarvis):**
1. When told to "check with [agent]" or relay a task → `sessions_send` with full context
2. Agent processes, announces in Telegram (for Boss), `sessions_send` back if input needed
3. Loop continues via `sessions_send` until task is done
4. Final result announced in Telegram group

**How Telegram posting actually works (critical — bots get this wrong):**
- Responding from your group session IS the Telegram post. Boss sees it. No extra step.
- `sessions_send` is private inbox delivery only. It does NOT appear in Telegram. Boss cannot see it.
- Never `sessions_send` an announcement thinking Boss will see it. He won't.
- Two separate actions every time: (1) `sessions_send` for the agent, (2) group session reply for Boss.

**If Boss's final permission is needed:** post in the group addressed to Boss. Never go silent — the chain waits for the green light, then continues. A permission request nobody receives is a dead end.

## Telegram Group Routing (Hardcoded)
- **Mention-only:** Every bot only responds when directly addressed — their name, @handle, or "everyone"
- **Privacy mode is OFF** — bots can see all group messages including from other bots
- Correct orchestration: Jarvis posts to Telegram group with a mention → bot sees it → bot replies in Telegram from their own account ✅
- NEVER use `sessions_send` to a bot's group session as the trigger — that routes the reply to webchat, not Telegram ❌
- NEVER use `sessions_spawn` to bring in a team bot — subagents post from Jarvis's default account (wrong)
- Session key format: `agent:<agentId>:telegram:group:-5104130761` (e.g. `agent:scout:telegram:group:-5104130761`)
- Always specify `model: haiku` for simple/casual group interactions (greetings, acks, status checks)
- Use `sonnet` for analysis tasks, `opus` for critical decisions
- accountId mapping: Scout → scout, Referee → referee, Pixel → pixel, Jarvis → default
- Never reply on behalf of another bot — each bot speaks for itself

## Proactive Expectations
- Boss expects Jarvis to understand the full business and act accordingly
- When something changes, cascade it to all affected agents without being asked
- Don't wait to be told the obvious — think ahead and handle it

## PitchIQ Site Status (as of 2026-03-17)
- Nav redesign COMPLETE: league tabs (All | Premier League | La Liga | Bundesliga), section chips, home page, club drill-downs — all bugs fixed and verified
- data.js fully cleaned: all entries have correct `league` field, no stale bad tags
- Pixel's nav wireframe delivered and approved; full implementation complete (2026-03-17 02:44 GMT+8)
- Referee's pre-publish checklist for all 30 data.js fields is now live at `/home/ai/.openclaw/agents/referee/workspace/memory/data-js-pre-publish-checklist.md`
- Client-side validator in app.js: catches missing/invalid league tags, flags in console, hides from UI
- Crisis Banner CSS: implemented (triggers at 3+ high-impact stories)
- Git push required after every site change — Vercel deploys on push

## Known Stale / Redundant Files (Noted, Not Deleted)
- `SUPERVISOR.md` (Jarvis workspace) — describes old single-agent model (Researcher/Designer). Superseded by current Scout/Referee/Pixel team structure. Safe to archive but kept for reference.
- `REVIEWER.md` (Jarvis workspace) — early Reviewer agent spec. Superseded by Referee's RULES.md and SOUL.md. Kept for reference.
- `agents/designer/` and `agents/researcher/` — legacy workspace stubs from initial pipeline design. Now replaced by actual `/home/ai/.openclaw/agents/pixel/` and `/home/ai/.openclaw/agents/scout/`. Not deleted — may contain valid design history notes.
