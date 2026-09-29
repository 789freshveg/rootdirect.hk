# GrownDirect Website

Next.js website project exported from Arena AI and prepared for GitHub.

## GitHub safety

- Secrets are supplied through environment variables and are not committed.
- `.env*` files are ignored, except `.env.example`.
- `node_modules` and Next.js build output are ignored.

## Required environment variables

Copy `.env.example` to `.env.local` and set:

- `DATABASE_URL`
- `ADMIN_SECRET`
- `ADMIN_PASSWORD`

Do not put real values in GitHub.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## GitHub

The repository root is this folder. Upload these files directly into the root of a new GitHub repository; do not upload the ZIP as the repository contents.
