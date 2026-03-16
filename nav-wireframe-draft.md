# PitchIQ Navigation Redesign — Wireframe Draft

**Status:** Ready for Boss approval  
**Date:** 2026-03-17 00:07 GMT+8  
**Designer:** Pixel  

---

## Overview

Redesign the current section-based nav into a **league-first** structure:
- 4 league tabs (All Leagues | Premier League | La Liga | Bundesliga)
- Section chips per league (show/hide content type)
- Unified home page across all leagues
- Mobile-first responsive design

---

## Current State (Problems)

### Navigation
- 7 tabs (Injuries, Transfers, Managers, Rules, Form, EPL Teams, Previews)
- Section-focused, not league-focused
- No way to filter by league within sections
- EPL Teams drill-down only — no La Liga/Bundesliga equivalents

### Data Structure (Root Cause)
- `EPL_TEAMS` hardcoded for PL only
- `EUROPEAN_NEWS` catch-all for La Liga + Bundesliga
- Missing `league` fields on many entries → fall back to `data-league="all"` → cross-league bleed
- No unified league drill-downs

---

## Proposed Design

### Header Layout

```
┌─────────────────────────────────────────────────────────┐
│  ⚽ PitchIQ              [League Tabs]    🔔 [Last Updated]  │
│                    Updated 2 mins ago    │
└─────────────────────────────────────────────────────────┘
```

#### League Tabs (Horizontal Tab Bar)
- **All Leagues** (default on page load)
- **Premier League**
- **La Liga**
- **Bundesliga**
- Plus: Live badge, last updated timestamp, mobile menu toggle

**Desktop:** Tabs inline in header  
**Mobile (< 768px):** Tabs wrap, stay visible, scroll if needed

---

### Main Content Area (After Tabs)

#### Section Chips (Horizontal Filter)
Below the tabs, a row of toggleable chips:
- **Injuries & Suspensions**
- **Transfers**
- **Manager Changes**
- **Rules & VAR**
- **Form & Stats**
- **Club Drill-Downs** (Team Details)
- **Match Previews**

When a chip is clicked:
- If **All Leagues** tab active → show that section for ALL leagues
- If **Premier League** tab active → show that section for PL only (filter by `league: 'pl'`)
- Same for La Liga, Bundesliga

**Mobile:** Chips scroll horizontally, snap to visible area

---

### Content Grid

#### Desktop (≥ 1200px)
```
┌────────────────────────────────────────────────────────┐
│ League Tabs: [All] [PL] [La Liga] [Bundesliga]        │
├────────────────────────────────────────────────────────┤
│ Section Chips: [Injuries] [Transfers] [Managers] ...  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │   Card 1        │  │   Card 2        │            │
│  │   (3-col grid)  │  │                 │            │
│  └─────────────────┘  └─────────────────┘            │
│  ┌─────────────────┐                                  │
│  │   Card 3        │                                  │
│  └─────────────────┘                                  │
└────────────────────────────────────────────────────────┘
```

#### Tablet (768px - 1199px)
- 2-column card grid
- Chips scroll if needed

#### Mobile (< 768px)
- 1-column card stack
- Tabs & chips scroll horizontally
- Full-width cards

---

### Home Page (All Leagues View)

When **All Leagues** tab is active AND no single section chip is selected:
- Show a **curated summary** across all leagues
- Top 5-10 most impactful items (mixed Injuries + Transfers + Managers)
- Grouped by league for clarity
- "See All" links per section that filter to that section

Example:
```
┌─ INJURIES & SUSPENSIONS ──────────────────┐
│ 🔴 [PL] Rodri — Hamstring (6 weeks)      │
│ 🔴 [La Liga] Haaland — Suspension (1)    │
│ 🟠 [Bundesliga] Müller — Ankle (2 weeks) │
│ [See All Injuries] →                     │
└────────────────────────────────────────────┘

┌─ TRANSFERS ────────────────────────────────┐
│ 🟢 [PL] Rice → Chelsea (£120M)           │
│ 🟢 [La Liga] Benzema → Al-Ittihad       │
│ [See All Transfers] →                   │
└────────────────────────────────────────────┘
```

---

### Club Drill-Downs (New)

**Current:** EPL Teams only (right sidebar on desktop, separate on mobile)

**Proposed:** Unified club drill-down per league

#### Layout
- When **Premier League** tab active + **Club Drill-Downs** chip selected:
  - Show list of all 20 PL clubs (searchable, A-Z, or by position)
  - Click club → expand card with:
    - **Recent Form** (last 5 matches)
    - **Key Injuries** (team-specific)
    - **Transfers In/Out** (this window)
    - **Manager Info** (name, record)
    - **Stats** (goals for/against, xG, possession avg)

**Mobile:** Full-width club list, expandable cards

---

## Implementation Plan

### Phase 1: HTML & CSS (Pixel + Jarvis approval)
1. **Header Restructure**
   - Move league tabs into main nav (replace section tabs)
   - Keep live badge, updated timestamp, mobile menu
   - Style tabs: inactive (dim), active (bright green accent)

2. **Section Chips**
   - New `.section-chips` container below tabs
   - Horizontal scroll on mobile, flex wrap on desktop
   - Chip states: inactive (muted), active (bold + accent underline)

3. **Card Grid Updates**
   - Adjust grid layout for section filtering
   - Maintain existing card styles (no redesign, just layout)

4. **Mobile Breakpoints**
   - Tabs: scroll horizontally if needed, stay above content
   - Chips: scroll horizontally, snap alignment
   - Cards: stack to 1 column, full viewport width

### Phase 2: JavaScript (app.js)
1. **Tab Click Handler**
   - Click league tab → filter all visible cards by `data-league`
   - Show/hide cards based on selected league + active section chip
   - Update active tab styling

2. **Section Chip Click Handler**
   - Click chip → show only that section across current league
   - If "All Leagues" is active → show section across all leagues
   - Combination: league tab + section chip = filtered view

3. **Home Page Logic (All Leagues, no single chip)**
   - Collect top N items from each section (Injuries, Transfers, Managers, Form)
   - Sort by date (newest first)
   - Render curated summary with "See All" links
   - Each link filters to that section

4. **Club Drill-Down**
   - New click handler for club cards / club list
   - Expand card to show injury + transfer + manager + form data
   - Searchable club list (input filters A-Z list)

---

## Data Requirements

### data.js Changes
Every entry must have:
```javascript
{
  league: 'pl' | 'la-liga' | 'bundesliga',  // ⚠️ Required, no fallbacks
  section: 'injuries' | 'transfers' | 'managers' | 'form' | 'rules' | 'previews',
  club: 'Liverpool' | 'Real Madrid' | etc.  // For club drill-down grouping
  // ... other fields
}
```

### data-league Attributes (HTML)
Every card must have:
```html
<div class="card" data-league="pl" data-section="injuries">
```

**Note:** app.js client-side validator will catch missing fields and hide invalid cards with console warning.

---

## Visual Changes

### Colour & Contrast
- Active league tab: bright green (`--accent-green: #00e676`)
- Inactive tabs: dim text (`--text-secondary`)
- Active section chip: bold weight + underline
- Inactive chips: normal weight, muted colour

### Spacing & Rhythm
- Header height: keep current (~80px desktop, ~60px mobile)
- League tabs: 16px horizontal padding per tab
- Section chips: 8px horizontal gap, 12px vertical gap
- Cards: maintain current spacing (24px gaps)

### Animations
- Tab/chip click → fade in/out cards (0.2s)
- Smooth scroll on chip overflow (native browser, no custom scroll)
- No distracting transitions — quick, responsive feel

---

## Mobile-First Specifics

### Phones (< 480px)
- Tabs: stack or scroll, must stay accessible
- Chips: scroll horizontally, left-aligned
- Cards: 1 column, full width
- Club drill-down: accordion (expand/collapse)

### Tablets (480px - 768px)
- Tabs: inline if space, scroll otherwise
- Chips: wrap or scroll
- Cards: 1-2 columns depending on space
- Club drill-down: sidebar or expanded card

### Desktop (768px+)
- Tabs: inline, all visible
- Chips: wrap if needed
- Cards: 3-column grid
- Club drill-down: right sidebar (if space) or expanded card

---

## Reversibility & Risk

### Low Risk (CSS only)
- Tab styling
- Section chip styling
- Grid layout adjustments
- Colour/spacing changes

### Medium Risk (HTML + CSS)
- Header restructure (add league tabs, remove section tabs)
- Chip container markup

### High Risk (JavaScript)
- Filter logic (league + section)
- Club drill-down expansion
- Home page curation logic

**Fallback:** Current section tabs stay in place during Phase 1; league tabs added alongside. Once Phase 2 is stable, remove old tabs. Fully reversible.

---

## Questions for Boss Before I Start

1. **Home Page Curation:** How many items per section in the "All Leagues" summary? (5, 10, 20?)
2. **Club Drill-Down Data:** Should it pull from existing `EPL_TEAMS` or build new unified structure? (affects data.js scope)
3. **Search:** Want a global search bar (player name, club, etc.) or just per-club search in drill-down?
4. **Timeline:** Any preference on phasing? (all at once vs. tabs first, then sections, then drill-down?)

---

## Next Steps

Once you approve:
1. Confirm answers to questions above
2. Phase 1: Build HTML/CSS structure
3. Phase 2: JavaScript filtering logic
4. Test mobile at 320px, 768px, 1024px, 1440px
5. Deploy to Vercel

Ready when you are. 🎨

