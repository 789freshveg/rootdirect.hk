# Root Direct｜有種直送

This project is the original Arena AI Next.js site, prepared for deployment with the built-in **Admin CMS** preserved.

## Important architecture

- GitHub: source-code repository
- Vercel (recommended): hosts the Next.js site and `/api` routes
- PostgreSQL: stores editable website content and uploaded Admin CMS images
- `/admin`: password-protected content editor

**Do not deploy this version as a GitHub Pages-only static site** if you want the Admin CMS to work. GitHub Pages cannot run the Next.js API routes or PostgreSQL connection required by `/admin`.

## Admin CMS

The existing Admin CMS is kept. It can edit/reorder/show/hide:

- 首頁主圖 Hero
- 本季出產 Seasonal
- 獨立菜款 Products
- 合作農場 Farms
- 付款資料 Payment
- 相片庫 Gallery

The image picker converts uploaded images to compressed JPEG data and stores them in PostgreSQL, so changing an image from `/admin` changes the website content without editing code.

## Environment variables

Copy `.env.example` to `.env.local` for local development, or add the same variables in the hosting provider:

- `DATABASE_URL` — PostgreSQL connection string
- `ADMIN_PASSWORD` — password for `/admin`
- `ADMIN_SECRET` — optional secret for the admin session token

## Database setup

After creating the PostgreSQL database:

```bash
npm install
npm run db:push
```

The site seeds its initial content from `src/content/site.ts` when the database tables are empty.

## Local development

```bash
npm install
npm run dev
```

Then open `/admin` to manage content.

## Recommended deployment

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Add `DATABASE_URL`, `ADMIN_PASSWORD`, and `ADMIN_SECRET` in Vercel Environment Variables.
4. Create the database tables with `npm run db:push` using the same `DATABASE_URL`.
5. Deploy.
6. Open `https://YOUR-DOMAIN/admin` to change images/content.

The public domain can later be set to `https://rootdirect.hk`.
