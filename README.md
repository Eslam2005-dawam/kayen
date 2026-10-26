# KAYAN MATTRESS (test-1)

Premium Arabic RTL homepage — **React + Vite + TypeScript + Tailwind CSS v4**.

## Run locally

```bash
npm install
npm run dev
```

Production build: `npm run build` → output in `dist/`.

## GitHub Pages

This repository deploys to `https://eslam2005-dawam.github.io/kayen/` through
`.github/workflows/deploy.yml`. In the repository's **Settings → Pages**, set
**Build and deployment → Source** to **GitHub Actions**. The workflow builds
the Vite app and publishes `dist/` whenever `main` is updated. Publishing
`main / (root)` directly does not build the React app.

## Project layout

- **Source:** `src/` — components, data manifests, hooks  
- **Images:** `public/images/` (copied from `assets/imgs/`)  
- **UX boards:** `تخيل/`  
- **References:** [docs/PROJECT-REFERENCES.md](docs/PROJECT-REFERENCES.md)

## Replace assets

Edit paths and copy in **`src/data/imageManifest.ts`** and drop files under **`public/images/`**.
