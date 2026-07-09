# Chloroethane — an interactive halogenoalkane (IB Chemistry SL)

A digital simulation for the IB Chemistry SL summer preview assignment, covering
**Reactivity 3.3 (electron sharing)** and **Reactivity 3.4 (electron-pair sharing)**
through one molecule: **chloroethane (C₂H₅Cl)**.

Features:

- Interactive 3D ball-and-stick model (ethane → chloroethane → ethanol).
- Animated, step-by-step **radical substitution** mechanism (R3.3) with fishhook arrows.
- Animated **nucleophilic substitution** mechanism (R3.4) with curly arrows and heterolytic fission.
- Verified physical properties, preparation routes, real-world uses, and a self-check quiz.

## Run locally

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173`.

## Build

```bash
npm run build      # output in dist/
npm run preview    # preview the production build
```

## Deploy to Vercel

**Option A — GitHub (recommended):** push this folder to a GitHub repo, then at
[vercel.com/new](https://vercel.com/new) import it. Vercel auto-detects **Vite**
(Build: `npm run build`, Output: `dist`). No configuration needed.

**Option B — CLI:**

```bash
npm i -g vercel
vercel          # first run: link + deploy a preview
vercel --prod   # promote to production
```

## Tech

Vite · React · TypeScript · Tailwind CSS · Framer Motion · three.js (react-three-fiber).
