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
- Crons: team meeting (6h), pipeline check (3h), match preview update (3 days)
- match-previews.md lives at /home/ai/.openclaw/workspace/football-site/match-previews.md
- Match preview pipeline (every 3 days): Jarvis kickoff → Scout (research + last game + previous lineup) → Referee (fact-check all incl. lineups) → Pixel (quick visual review — sanity check only once structure is established)
- Model rule: Haiku for simple/casual group tasks, Sonnet for analysis, Opus for critical

## mentionPatterns Config (Lessons Learned)
- Correct key: `agents.list[].groupChat.mentionPatterns` — NOT `routing.groupChat.mentionPatterns`
- Patterns are case-insensitive by default — no need for `(?i)` prefix
- No `\b` word boundaries needed — simple strings work fine
- Don't use sed to edit JSON — use Python to avoid escape mangling
- `openclaw gateway restart` kills itself mid-run (it's the gateway process) — use `nohup bash -c 'sleep 3 && systemctl --user restart openclaw-gateway.service' & disown` instead

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
