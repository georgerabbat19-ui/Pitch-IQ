# Match Preview Race Filter Logic

## Race Categories (Priority Order: Title > Top 5 > European)

Each fixture is tagged with **ONE race category only** — the highest that applies.
A fixture with no qualifying team gets no race tag (appears only in "All Fixtures" view).

---

### 🏆 Title Race
- **Threshold:** Within **5 points of 1st place**
- Condition: `team pts >= (1st place pts - 5)`
- Example GW31: Arsenal = 70pts → threshold = 65pts+ → **no team qualifies → filter empty**

### 🔵 Top 5 Race *(Europa League)*
- **Threshold:** Within **5 points of 5th place**
- Condition: `team pts >= (5th place pts - 5)`
- **Guard clause:** Top 5 tag is DISABLED if `(2nd place pts - 6th place pts) > 6`
  - If 2nd place is more than 6 points ahead of 6th, the race isn't competitive enough to tag
- Example GW31: Chelsea = 48pts → threshold = 43pts+, BUT Man City (2nd, 61pts) vs Liverpool (6th, 48pts) = **13pt gap > 6 → Top 5 DISABLED**
- **Priority:** Top 5 > European (if enabled and a team hits both, Top 5 wins)

### 🌍 European Race *(Conference League / broader push)*
- **Threshold:** Within **4 points of 6th place**
- Condition: `team pts >= (6th place pts - 4)`
- Example GW31: Liverpool = 48pts → threshold = 44pts+
- **Only applies** if Top 5 tag is either disabled or team not already tagged Title/Top 5
- Example GW31: Top 5 disabled → Liverpool (48pts) and Brentford (44pts) fall here

---

## Application Rules (in order)
1. Check if Title race is active: any team in the fixture within 5pts of 1st?
2. Check if Top 5 race is active: gap between 2nd and 6th ≤ 6pts? If yes, any team within 5pts of 5th?
3. Check European race: any team within 4pts of 6th, not already tagged?
4. One tag per fixture, highest priority wins
5. Fixtures with no qualifying teams → unlabelled (visible under "All Fixtures" only)

---

## Example: GW31 (15 March 2026)

**Standings used:** Arsenal 70 (1st) · Man City 61 (2nd) · Chelsea 48 (5th) · Liverpool 48 (6th)

**Thresholds:**
- Title: 65pts+ → nobody qualifies
- Top 5: DISABLED (2nd to 6th gap = 13pts, exceeds 6pt guard)
- European: 44pts+ → Liverpool (48) ✅, Brentford (44) ✅

| Fixture | Tag |
|---|---|
| Man City vs Crystal Palace | *(none — title disabled, top5 disabled, neither hits 44+)* |
| Bournemouth vs Man United | *(none)* |
| Brighton vs Liverpool | 🌍 European |
| Brentford vs Wolves | 🌍 European |
| Aston Villa vs West Ham | *(none — 51pts below title threshold 65+)* |
| Newcastle vs Sunderland | *(none — 42pts below European threshold 44+)* |
| Spurs vs Nottm Forest | *(none)* |
| Fulham vs Burnley | *(none)* |

**GW31 result:** Title = empty · Top 5 = disabled · European = 2 fixtures

---

*Last updated: 2026-03-15 by Scout. To be confirmed by Referee.*
