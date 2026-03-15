# Match Preview Race Filter Logic

## Race Categories (Priority Order: Title > Top 5 > European)

Each fixture is tagged with **ONE race category only** — the highest that applies.
A fixture with no qualifying team gets no race tag (appears only in "All Fixtures" view).

---

### 🏆 Title Race
- **Threshold:** Within **5 points of 1st place**
- Teams qualify if: `pts >= (1st place pts - 5)`
- Example GW31: Arsenal = 70pts → threshold = 65pts+

### 🔵 Top 5 Race *(Europa League)*
- **Threshold:** Within **5 points of 5th place**
- Teams qualify if: `pts >= (5th place pts - 5)`
- Example GW31: Chelsea = 48pts → threshold = 43pts+
- **Priority:** Top 5 > European (if a team hits both, Top 5 wins)

### 🌍 European Race *(Conference League / broader push)*
- **Threshold:** Within **4 points of 6th place**
- Teams qualify if: `pts >= (6th place pts - 4)`
- Example GW31: Liverpool = 48pts → threshold = 44pts+
- **Only applies** if team NOT already tagged Title or Top 5

---

## Application Rules
1. Check BOTH teams in a fixture
2. If either team qualifies for a category → fixture gets that tag
3. Apply priority: Title first, then Top 5, then European
4. One tag per fixture, no duplicates across filters
5. Fixtures with no qualifying teams → unlabelled (visible under "All Fixtures" only)

---

## Example: GW31 (15 March 2026)

| Fixture | Home Pts | Away Pts | Tag |
|---|---|---|---|
| Man City vs Crystal Palace | 61 | 38 | *(empty — Man City misses 65pt title threshold)* |
| Bournemouth vs Man United | 41 | 51 | *(empty — Man Utd misses 65pt title threshold)* |
| Brighton vs Liverpool | 40 | 48 | Top 5 |
| Brentford vs Wolves | 44 | 16 | Top 5 |
| Aston Villa vs West Ham | 51 | 29 | *(empty — Villa misses 65pt title threshold)* |
| Newcastle vs Sunderland | 42 | 40 | *(none — Newcastle 42pts misses Top 5 at 43+)* |
| Spurs vs Nottm Forest | 29 | 28 | *(none)* |
| Fulham vs Burnley | 40 | 20 | *(none)* |

**GW31 result:** Title = empty · Top 5 = 2 fixtures · European = empty

*Note: Title and European filters empty this GW because the standings gap is wide. Filters will populate naturally as the season tightens.*

---

*Last updated: 2026-03-15 by Scout. Confirmed by Referee.*
