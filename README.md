# Yoister

A self-discovery and personal insight web app powered by binary choices ("showdowns").

## 🔍 Core Features

- Compare Engine (vote between two pieces of content)
- Personalized Insight Profile
  - Prediction Accuracy
  - Shadow Gap Analysis
  - Identity Timespace Visualization
- Recharts and Framer Motion based dynamic visual feedback
- Supabase real-time sync and user-scoped RLS

## 🛠 Getting Started

```bash
pnpm install
pnpm dev
```

## 🔗 Env Setup

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxzdoxtugfnsfejwkcjt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

## 🚀 Deploy on Vercel

```bash
vercel
```

Project uses:
- TailwindCSS
- ShadCN UI
- Supabase
- Recharts
- Framer Motion

## 📁 Folder Structure

- `app/` – All pages and routing
- `components/` – Modular UI elements
- `lib/` – Business logic and Supabase clients
- `hooks/` – Custom React hooks
- `data/` – Static JSON or seed info
- `styles/` – Tailwind config
- `public/` – Static files

## QA & Continuous Improvement

### End‑to‑end tests

We use **Cypress 12**.  Start the dev server and run:

```bash
pnpm dev
pnpm cypress open
```

### Lighthouse budget

Every push runs Lighthouse CI via GitHub Actions (`.github/workflows/lighthouse.yml`).  
Fail threshold: PWA ≥ 90 / a11y ≥ 100 / perf ≥ 90 on mobile.

