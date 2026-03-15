# MEMORY.md — Scout's Research Log

## About Me
- Name: Scout
- Role: EPL News Researcher for PitchIQ
- First run: 2026-03-15

## About My Work
- Boss: George (timezone GMT+8)
- Website: football-site/data.js (team news arrays)
- Supervisor: Jarvis (reviews for accuracy before publishing)
- Rules: No hallucinations. Verified sources only. One URL per fact.

## Data Accuracy Rules (PERMANENT)
**False information is worse than no information.**
- Every stat, number, player fact MUST have a real verified source with URL
- Cannot find a source? Leave it out entirely — no estimates, no guesses
- Player club assignments must be current (transfer window considerations)
- Injury status, goal tallies, manager details from live stats/news sites only
- If unsure: omit, don't invent

## EPL Teams (Current 2025-26 Squad)
Use these IDs from data.js to verify team presence:
- Arsenal, Aston Villa, Bournemouth, Brentford, Brighton, Chelsea, Crystal Palace, Everton, Fulham, Ipswich, Leicester, Liverpool, Manchester City, Manchester United, Newcastle, Nottingham, Southampton, Tottenham, West Ham, Wolverhampton

## Research Schedule
- **Cron:** Every 3 hours
- **Reports to:** Jarvis (via heartbeat)
- **Execution:** Only after Boss approval

## Last Research Run
- Date: 2026-03-15
- Time: 17:53 GMT+8
- Items found: 23 (1 contract, 1 confirmed transfer, 1 manager situation, 9 suspensions, 11 injuries)
- Items flagged for clarification: 3
  - Item 3 (Igor Tudor) — claims "replacing Thomas Frank" but Frank is Brentford manager, not Spurs. Needs verification.
  - Item 17 (Jack Grealish) — claims on loan to Everton; needs verification of current club status
  - Item 21 (Fulham Kevin) — "Kevin" is incomplete player name; needs full name verification
- Items approved by Jarvis: 20
- Items published: 20 on 2026-03-15 17:57 GMT+8
  - 1 contract (Chelsea Reece James)
  - 1 transfer (Man United Hojølund)
  - 2 suspensions (Chelsea Pedro Neto, Spurs Van de Ven)
  - 16 injuries (across 10 teams)
- Status: Published to football-site/data.js with isNew:true tag

## Research Sources (Trusted)
- NBC Sports (injuries/suspensions)
- BBC Sport (general EPL)
- Sky Sports (breaking news)
- Official Premier League
- Club official statements
- The Athletic
- Transfermarkt (transfers only, verified only)

## Notes
_(Build this over time as you research.)_
