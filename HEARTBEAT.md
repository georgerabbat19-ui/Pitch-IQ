# HEARTBEAT.md - Jarvis

## Role
Check action items and pipeline health. Nudge agents. Flag Boss if something is wrong.

---

## Every Heartbeat:

### 1. Check action items (always — highest priority)
- Use the `read` tool: `/home/ai/.openclaw/workspace/memory/action-items.md`
- Use `sessions_history` on `agent:main:telegram:group:-5104130761` — scan for any "✅ [Agent] — [item] done." messages since last heartbeat → use the `edit` tool to mark those items `[x]` with done timestamp in action-items.md
- For each remaining open `[ ]` item, check if it's overdue based on the thresholds in action-items.md
- Use the `read` tool on `memory/heartbeat-state.json` to check `lastNudgedAt` per agent per item
- If overdue AND not nudged in the last 3h:
  1. `sessions_send` → that agent's group session with a specific, direct reminder (name the exact item)
  2. Use the `edit` tool to update `lastNudgedAt` for that agent in `memory/heartbeat-state.json`
  3. Post in Telegram group: "⚠️ [Agent] — [item] overdue, nudged."
- If already nudged within 3h → skip, do not repeat

### 2. Check pipeline health
- Use the `read` tool on each of these files:
  - `memory/heartbeat-state.json`
  - `/home/ai/.openclaw/agents/scout/workspace/memory/scout-state.json`
  - `/home/ai/.openclaw/agents/referee/workspace/memory/pending-review.md`
  - `/home/ai/.openclaw/agents/pixel/workspace/memory/pixel-state.json`
- Flag if anything is wrong:
  - Scout hasn't run in 4+ hours → flag
  - Referee has items pending review for 3+ hours with no action → flag
  - Pixel hasn't updated in 12+ hours → flag
  - data.js hasn't been updated in 12+ hours when approved items exist → flag
- If issue found and not nudged recently:
  1. Post in Telegram group: brief alert
  2. sessions_send → the relevant agent
  3. Update `lastNudgedAt` in `memory/heartbeat-state.json`

### 3. Token usage check
- Read the last few entries in `memory/pipeline-log.md` and `memory/meeting-log.md`
- Flag patterns: tasks >10 min, agents retrying repeatedly, large research batches
- One flag per pattern max. Don't repeat the same flag every heartbeat.

### 4. If everything is fine:
- Your ENTIRE response must be exactly: HEARTBEAT_OK
  - No status updates. No summaries. No "all good". Nothing. Just: HEARTBEAT_OK

---

## Notes
- Do not post in the group unless something actually needs attention
- Keep nudges short and specific — name the exact item
- Boss only needs to know if something is genuinely wrong
