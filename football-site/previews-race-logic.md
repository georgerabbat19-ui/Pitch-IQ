# Match Preview Race Filter Logic

## Race Categories (Priority Order: Title > Top 5 > European)

Each fixture is tagged with **ONE race category only** — the highest that applies.
A fixture with no qualifying team gets no race tag (appears only in "All Fixtures" view).

---

### 🏆 Title Race
- **Threshold:** Within **5 points of 1st place**
- Condition: `team pts >= (1st place pts - 5)`
- Example GW31: Arsenal = 70pts → threshold = 65pts+ → no team qualifies → filter empty

### 🔵 Top 5 Race *(Europa League)*
- **Threshold:** Within **5 points of 5th place**
- Condition: `team pts >= (5th place pts - 5)`
- **2nd place exception:** If 2nd place is more than 6 points ahead of 6th place, 2nd place team does NOT qualify for Top 5 (they are not in that race). All other teams still use the standard threshold.
- Example GW31: Chelsea = 48pts → threshold = 43pts+
  - Man City (2nd, 61pts): gap to 6th (Liverpool, 48pts) = 13pts > 6 → **Man City excluded from Top 5**
  - Liverpool (48pts): qualifies ✅ | Brentford (44pts): qualifies ✅
- **Priority:** Top 5 > European

### 🌍 European Race *(Conference League / broader push)*
- **Threshold:** Within **4 points of 6th place**
- Condition: `team pts >= (6th place pts - 4)`
- **Only applies** if team NOT already tagged Title or Top 5
- Example GW31: threshold = 44pts+ → Liverpool and Brentford already tagged Top 5, so European is empty

---

## Application Rules (in order)
1. Check Title race: any team within 5pts of 1st?
2. Check Top 5 race: any team within 5pts of 5th? (exclude 2nd place if they are 6+ pts clear of 6th)
3. Check European race: any team within 4pts of 6th, not already tagged Title/Top 5?
4. One tag per fixture, highest priority wins
5. Fixtures with no qualifying teams → unlabelled (visible under "All Fixtures" only)

---

## Example: GW31 (15 March 2026)

**Standings:** Arsenal 70 (1st) · Man City 61 (2nd) · Chelsea 48 (5th) · Liverpool 48 (6th) · Brentford 44 (7th)

| Fixture | Tag | Reason |
|---|---|---|
| Man City vs Crystal Palace | *(none)* | Man City misses Title (65+); excluded from Top 5 (2nd, 13pts clear of 6th) |
| Bournemouth vs Man United | *(none)* | Man Utd 51pts misses Title (65+) and Top 5 (43+ but Man Utd is not in that race) |
| Brighton vs Liverpool | 🔵 Top 5 | Liverpool 48pts ≥ 43pt threshold |
| Brentford vs Wolves | 🔵 Top 5 | Brentford 44pts ≥ 43pt threshold |
| Aston Villa vs West Ham | *(none)* | Villa 51pts misses Title (65+); not in Top 5 race |
| Newcastle vs Sunderland | *(none)* | Newcastle 42pts below Top 5 threshold (43+) |
| Spurs vs Nottm Forest | *(none)* | Neither qualifies |
| Fulham vs Burnley | *(none)* | Neither qualifies |

**GW31 result:** Title = empty · Top 5 = 2 fixtures · European = empty

---

*Last updated: 2026-03-15 by Scout. To be confirmed by Referee.*
