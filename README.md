# PyMaster

PyMaster is a public Python learning platform built with React, TypeScript, Vite, Tailwind, and Supabase.

It combines structured lessons, Python practice problems, a browser-based code runner, gamified progress tracking, job discovery, leaderboard features, and a paid certificate flow in one product.

## What The App Includes

- Structured Python lessons for beginner to advanced learners
- Interactive practice problems with starter code and test cases
- In-browser Python execution using Pyodide inside an isolated Web Worker
- Streaks, XP, wallet rewards, stars, badges, and daily tasks
- Public leaderboard and public profile sharing
- Python jobs board with local save/applied tracking
- Certificate generation, verification, and payment-gated download
- Mobile-friendly landing pages, dashboard, and install-to-home-screen support
- AdSense-ready ad slots with safe fallback placeholders

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- Framer Motion
- Monaco Editor
- Supabase Auth + Database + RPC
- Pyodide running in a Web Worker

## Key Product Areas

### Learning

- `/learn` for structured Python lessons
- `/career/:trackId` for career-focused learning tracks
- `/dsa` for DSA theory and examples
- `/quick-prep` for quick revision content

### Practice

- `/problems` for the problem bank
- `/problems/:id` for solving individual problems
- `/compiler` for free-form Python experimentation

### Progress And Gamification

- XP, streaks, wallet, badges, stars, daily tasks
- dashboard sharing and public profile pages
- leaderboard with all-time and lightweight weekly view

### Career And Certificates

- `/jobs` for curated Python jobs
- `/certificate` for qualification, payment, preview, and PDF download
- `/certificate/verify/:certificateId` for public verification

## Python Execution Model

PyMaster currently runs Python in the browser using Pyodide, inside a dedicated Web Worker.

That means:

- execution does **not** run on your main UI thread
- runaway code can be terminated safely
- there is a default safety timeout
- normal learning usage does not consume server-side compute

Current safeguards:

- isolated worker execution
- hard execution timeout
- manual stop support
- output/error handling returned to the UI

Important note:

This is a strong learning-mode setup, but it is not the same as a full server-side production judge. If you later want hidden test infrastructure, CPU quotas, queueing, package controls, or centralized execution analytics, you should add a hardened backend execution layer.

## Project Structure

```text
src/
  components/         Reusable UI and app-specific components
  contexts/           Auth and progress global state
  data/               Problems, lessons, riddles, ads, career content
  hooks/              Custom React hooks
  lib/                Supabase client, progress helpers, execution logic
  pages/              Route-level pages
  workers/            Web Worker for Python execution

public/
  manifest.json       PWA manifest
  robots.txt          Search crawler rules
  sitemap.xml         Sitemap for indexing
  sw.js               Minimal service worker

supabase/
  migrations/
    20260324_backend_schema_repair.sql
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local`

Use the following variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

VITE_ADSENSE_CLIENT=ca-pub-your-publisher-id
VITE_ADSENSE_SLOT_HOME=your-home-slot
VITE_ADSENSE_SLOT_LEARN=your-learn-slot
VITE_ADSENSE_SLOT_JOBS=your-jobs-slot
VITE_ADSENSE_SLOT_PROBLEMS=your-problems-slot

# Optional: footer social links (hide icons if not set)
VITE_SOCIAL_GITHUB=https://github.com/yourname
VITE_SOCIAL_LINKEDIN=https://linkedin.com/in/yourname
VITE_SOCIAL_YOUTUBE=https://youtube.com/@yourchannel
```

Notes:

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are required for auth, profiles, leaderboard, certificates, and cloud sync.
- AdSense vars are optional. If omitted, the app falls back to non-AdSense placeholder sponsor blocks.

### 3. Run the app

```bash
npm run dev
```

Default local URL:

```text
http://localhost:8080
```

### 4. Production build

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - production build
- `npm run build:dev` - development-mode build
- `npm run preview` - preview the built app
- `npm run lint` - lint the source code
- `npm run test` - run tests once with Vitest
- `npm run test:watch` - run Vitest in watch mode

## Supabase Setup

Run the SQL in:

- [`supabase/migrations/20260324_backend_schema_repair.sql`](supabase/migrations/20260324_backend_schema_repair.sql)

This migration repairs and creates the backend pieces used by the app, including:

- `profiles`
- `certificates`
- leaderboard RPC
- certificate issue/verify RPCs
- certificate payment fields
- relevant RLS and helper functions

If you already have users in Supabase Auth, make sure profile rows exist for them as well before testing the full app flow.

## SEO And Indexing

The app already includes:

- `public/robots.txt`
- `public/sitemap.xml`
- canonical tags in `index.html`
- page-level Helmet metadata

After deployment:

1. Add the site to Google Search Console
2. Verify your domain
3. Submit `https://your-domain.com/sitemap.xml`
4. Request indexing for your key public routes

## Deployment

Recommended stack:

- Frontend: Vercel
- Backend: Supabase

Why:

- Vite deployment is straightforward
- preview deployments help before pushing changes live
- custom domains are easy to connect
- Supabase stays separate and clean for auth/data

Before going live:

- set your real domain
- update `robots.txt`, `sitemap.xml`, and canonical URLs if the domain changes
- confirm `.env.local` equivalents are set in your hosting provider
- test auth, leaderboard, certificate, and public routes on the deployed domain

## Ads And Monetization Notes

PyMaster includes AdSense-ready placements on selected public content pages.

Recommended ad-safe areas:

- landing page
- learn page content flow
- jobs page
- problems list page

Avoid placing AdSense too close to:

- run/submit controls
- payment buttons
- certificate download actions
- game/reward interactions

The app was adjusted to remove risky "watch ad to earn money" wording for better AdSense compliance.

## PWA Support

PyMaster includes:

- web app manifest
- basic service worker
- add-to-home-screen button

Install behavior is best tested on a real HTTPS deployment rather than localhost.

## Known Limitations

- Python execution is browser-based, not a full backend judge
- some certificate preview areas are still scroll-based on very small screens
- the weekly leaderboard is a lightweight derived view, not a deep historical analytics system
- Firebase config exists as a legacy placeholder file and is not part of the active app flow

## Security And Architecture Notes

- authentication and app data use Supabase
- Python execution runs in a browser worker, not on your server
- execution is time-limited and cancellable
- client-side storage is used for some lightweight convenience features like saved jobs and some share/profile presentation details

If you want to evolve this into a more enterprise-grade public coding platform, the next major upgrades should be:

- stronger problem judging
- optional backend execution infrastructure
- richer submission/test reporting
- analytics and abuse monitoring
- stricter public data validation for profile/share surfaces

## Author

Built by **Dinesh Raja M**

- Buy Me a Coffee: `https://buymeacoffee.com/dineshjas9r`

## License

This project is licensed under the MIT License.

- License file: [`LICENSE`](LICENSE)
