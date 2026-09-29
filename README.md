# GrownDirect Website — Render Free + GitHub CMS

Next.js website prepared for GitHub + Render Free.

## How content updates work

The public website is deployed by Render from GitHub.
The `/admin` page is a small password-protected CMS.

When you replace a banner or vegetable photo:

1. The image is resized in the browser.
2. The admin API uploads the image to the GitHub repository.
3. The CMS data is updated in `src/content/cms.json`.
4. Both are saved in one Git commit.
5. Render sees the GitHub commit and automatically redeploys.

Render's local disk does not need to be persistent.

## Render environment variables

Set these in Render → your service → Environment:

- `ADMIN_SECRET` — long random secret used for the admin session token.
- `ADMIN_PASSWORD` — the password used at `/admin`.
- `GITHUB_TOKEN` — fine-grained GitHub token with Contents: Read and write for this repository.
- `GITHUB_OWNER` — `789freshveg`
- `GITHUB_REPO` — `rootdirect.hk`
- `GITHUB_BRANCH` — `main`

No `DATABASE_URL` is required.

## Admin

Open `/admin` after deployment.

The CMS supports:

- Hero images
- Seasonal vegetables
- Individual products
- Partner farms
- Payment images and text
- Gallery images
- Add / delete / reorder / show-hide where supported

Normal photo/content updates do not require editing source code.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
