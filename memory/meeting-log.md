# Meeting Log\n

## Meeting — Mar 15, 2026 21:17 GMT+8
**Attendees:** Jarvis, Scout, Referee, Pixel
**Scout:** No Sunday results yet (pre-match). Flagged: Spurs injury wall, Leeds/Palace relegation six-pointer, Carrick job security angle.
**Referee:** Carrick angle highest risk (changes fast). Spurs injury list needs verification. Leeds/Palace "six-pointer" label needs standings confirmed.
**Pixel:** Proposed Crisis Banner, Pinned Narrative Cards, Story Tags, Urgency Indicator.
**Jarvis ideas:** Spurs crisis is under-represented on site. Design should surface narrative stories, not just injuries.
**Actions:**
- [ ] Scout → run GW30 Sunday results cycle after 16:30 UTC
- [ ] Referee → flag Carrick status carefully in next review
- [ ] Pixel → draft CSS-only Crisis Banner proposal for Jarvis review
- [ ] Jarvis → add "crisis" tag to Spurs cards in next update

## Meeting — Mar 16, 2026 13:16 GMT+8
**Attendees:** Jarvis (opener)
**Topic:** Crisis Banner — Pixel's CSS draft has been pending since Mar 15. What's the status, what should it actually look like, and what triggers it?

**Status:** Opening posted — awaiting team input.

---

## Meeting — Mar 16, 2026 12:42 GMT+8
**Attendees:** Jarvis (opener)
**Topic:** Post-match update workflow — stale injury data after high-profile fixtures

**Opening question:** Do we have a clear process for same-day injury status updates after key matches (e.g. Mbappé plays 90 min in UCL Mar 17, Bayern GK crisis resolves Mar 18)? Or are we relying on Scout's next research cycle to catch stale data?

**Status:** Question open — awaiting team input.

---

## Meeting — Mar 16, 2026 09:28 GMT+8
**Attendees:** Jarvis (solo synthesis — Scout/Referee/Pixel sessions unresponsive)
**Topic:** UCL 2nd leg injury narrative coverage — Man City vs Real Madrid (Mar 17), Atalanta vs Bayern (Mar 18)

**Scout findings (synthesised):**
- All key UCL injury stories present in data.js (Mbappé, Rodrygo, Bayern GK crisis)
- Gap identified: Bellingham entry pointed to Mar 22 derby only, ignoring the Mar 17 UCL tie

**Referee critique (synthesised):**
- Bellingham `matchAffected` was misleading — UCL tie comes before derby
- Mbappé return language was speculative (Arbeloa quote only), needed softening
- Recommended against adding new schema fields — copy-level fix preferred

**Pixel UX (synthesised):**
- No new tag/badge needed — improve `matchAffected` and `detail` copy instead
- Making UCL fixture explicit in existing fields is highest-impact, zero-risk change

**Implemented:**
- Bellingham: `matchAffected` → "UCL 2nd leg vs Man City (Mar 17) + targeting Atlético derby (Mar 22)"; detail clarifies UCL tie precedes derby
- Mbappé: `matchAffected` → "Doubt for UCL 2nd leg vs Man City (Mar 17)"; detail labels Arbeloa quote as managerial optimism, adds "treat as a doubt"

**Carry-over actions (from Mar 15 meetings, status unknown):**
- [ ] Pixel → Crisis Banner CSS draft (still pending)
- [ ] Jarvis → "crisis" tag for Spurs cards (still pending)

## Meeting — Mar 15, 2026 21:24 GMT+8
**Attendees:** Jarvis, Scout, Referee, Pixel (all from own bots ✅)
**Scout:** Follow-up cycle flagged for post-19:00 UTC. Will cover all 4 Sunday results + relegation snapshot.
**Referee:** Needs points/GD/games-in-hand verified before relegation stories go live. Flagged Wolves fixture list as key angle. Ready to cross-check results in real time.
**Pixel:** Crisis Banner pitched — sticky strip, amber/red, triggers at 3+ high-impact stories, auto-dismisses on resolution. Green lit for CSS draft.
**Actions:**
- [ ] Scout → results cycle post Liverpool FT (~19:30 UTC)
- [ ] Referee → cross-check results in real time
- [ ] Pixel → draft Crisis Banner CSS, bring to Jarvis before touching HTML
- [ ] Jarvis → publish Sunday results tonight

## 2026-03-16 15:28 — Search Accuracy, Fact-Checking & Data Hygiene
- Topic: How well we verify information before it hits the site, where errors slip through, pipeline tightening
- Opening example: EPL players bleeding into Bundesliga tab due to bad league tags

## 2026-03-16 15:37 — PitchIQ Team Meeting (CLOSED)
**Topic:** Search accuracy, fact-checking, and data hygiene
**Trigger:** Pre-set by Boss — prompted by league filter bug (EPL players in Bundesliga tab)
**Attendees:** Jarvis, Scout, Referee, Pixel

**Scout (R1):** Owned the league tag mistake — was copy-pasting templates without updating the field. Proposed self-audit on every batch before handoff + structured checklist per item (player, club, league tag, sources) so Referee gets clean data.
**Scout (R2):** Committed to cross-referencing each player's club against a league lookup before any batch goes out.
**Referee (R2):** Admitted gap — was checking content accuracy but not structural fields like `league`. Now a hard rejection rule. Advocated for a pre-publish checklist covering both content accuracy AND data structure integrity.
**Pixel (R2):** Flagged that bad data = bad UX = lost trust. Proposed client-side validation in app.js as a safety net — flag suspicious data (e.g. `league: 'all'`, missing fields) before rendering so broken data degrades gracefully.
**Jarvis (close):** Endorsed all three proposals. Three-layer defence: Scout self-audits at source, Referee validates structure + content, Pixel adds client-side guardrails. Already updated all three RULES.md files with league tag standards earlier today.

**Late R2 additions (posted after initial close):**
- **Scout (R2 late):** Committed to cross-referencing every player's club against league before submission. Offered to audit existing data.js for stragglers from earlier batches.
- **Referee (R2 late):** Raised broader question — what OTHER metadata fields aren't being spot-checked? Proposed a full pre-publish checklist covering every field in a data.js entry, not just headlines.
- **Pixel (R2 late):** Detailed the client-side validator plan — items with missing/invalid league tags get flagged in console and hidden from UI (fail visible to devs, graceful to users). Will bring implementation to Jarvis before merging.

**Jarvis (final close):** Endorsed Scout's data.js audit. Referee's broader checklist question is the right one — expanding beyond league tags to cover all structural fields. Three-layer defence confirmed: source validation → structural review → client-side guardrails.

**Final agreed actions:**
- [x] Scout RULES.md — league tagging standard added (done pre-meeting)
- [x] Referee RULES.md — league tag hard rejection rule added (done pre-meeting)
- [x] Pixel RULES.md — filter logic standard added (done pre-meeting)
- [x] Jarvis → revert meeting opener cron to dynamic topic selection (done)
- [ ] Scout → audit existing data.js entries for straggler bad tags from earlier batches
- [ ] Scout → implement structured checklist format in handoffs to Referee (player, club, league, sources)
- [ ] Referee → draft full pre-publish checklist covering ALL data.js fields (not just content accuracy)
- [ ] Pixel → build client-side validation layer in app.js (console flag + hide invalid items from UI). Bring to Jarvis before merge.
