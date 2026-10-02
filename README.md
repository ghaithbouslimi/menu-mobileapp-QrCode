# Mama Mia by Fadi, digital menu

Static React + Vite menu. No backend. Run `npm install`, then:

- `npm run dev -- --host`  test on your phone (same Wi-Fi, open the Network URL)
- `npm run build`          creates `dist/`, the whole website

## Edit the menu
Dishes, prices, categories, FR/AR text and theme colors: `src/data/restaurants/mama-mia.ts`
Photos: drop files in `src/assets/menu/` named after the dish id (see README there).

## Deploy (pick one)

### A. Netlify Drop (fastest, no Git)
1. `npm run build`
2. Go to https://app.netlify.com/drop and drag the `dist` folder in.
3. Copy the https URL it gives you.

### B. GitHub + Vercel (best: every push goes live automatically)
1. Create a GitHub repo and push this project.
2. On https://vercel.com choose Add New > Project, import the repo, keep the defaults (Vite is detected), Deploy.
3. To update the menu later: edit the file, commit, push. It is live in about a minute.

### C. Cloudflare Pages
Connect the repo. Build command `npm run build`, output directory `dist`.

### D. GitHub Pages
Push to `main`; in the repo go to Settings > Pages > Source: GitHub Actions.
The included workflow builds with the right base path and the 404 fallback.
The URL will be https://USER.github.io/REPO/

## After deploying
Open the URL on a phone, test FR/AR, then make the QR code from that exact URL.
Use a custom domain for the QR if you can, so the QR never has to change if you switch host.
