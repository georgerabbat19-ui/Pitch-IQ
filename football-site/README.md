# ⚽ PitchIQ — Football Predictions Intelligence

A modern, dark-themed static website aggregating football intelligence for smarter match predictions.

## Features

- **Injuries & Suspensions** — Player availability cards with impact ratings
- **Transfers** — Signings and departures with prediction context
- **Manager Changes** — Coaching shifts and tactical notes
- **Rules & VAR Changes** — Regulatory updates affecting outcomes
- **Form & Stats** — Team performance tables with streaks and key stats
- 🔍 **Search** — Filter across all sections by player, club, or topic
- 🎛️ **Category filters** — Per-section filters (e.g. Injuries vs Suspensions)
- 📱 **Responsive** — Mobile-friendly layout with collapsible nav
- 🌑 **Dark theme** — Sports-aesthetic dark UI

## Running Locally

No build tools needed. Just open the file:

```bash
# Option 1: Direct open
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# Option 2: Local dev server (recommended to avoid CORS on fonts)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploying

### Netlify (drag & drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag the `football-site/` folder onto the deploy area
3. Done — live URL in seconds

### GitHub Pages
1. Push to a GitHub repo
2. Settings → Pages → Source: main branch, root folder
3. Visit `https://yourusername.github.io/repo-name`

### Vercel
```bash
npx vercel
```

### Any static host
Upload `index.html`, `style.css`, and `app.js` to any static hosting provider (Cloudflare Pages, Render, S3, etc.).

## File Structure

```
football-site/
├── index.html       # Main page (all sections)
├── style.css        # All styles (dark theme, responsive)
├── app.js           # Data, rendering, filtering, search
└── README.md        # This file
```

## Customising Content

All data lives in `app.js` at the top of the file as plain JS arrays:

- `INJURIES_DATA` — injury and suspension cards
- `TRANSFERS_DATA` — transfer move cards
- `MANAGERS_DATA` — manager change cards
- `RULES_DATA` — VAR/rule update cards
- `FORM_DATA` — team form/stats cards

Edit these arrays to add real data, connect to an API, or swap placeholder content.

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JS
- Google Fonts (Inter) via CDN
- No frameworks, no build step, no dependencies
- Works offline (except Google Fonts)

---

*Not affiliated with any football governing body. For informational purposes only.*
