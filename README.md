# Tyre Fitting Near Me Ltd — Website

24/7 mobile tyre-fitting marketing site with a custom, self-hosted CMS.

- **Framework:** Next.js 16 (App Router, React Server Components, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** PostgreSQL (your Hostinger VPS) via Prisma
- **Auth:** Auth.js (NextAuth v5) — email + password, bcrypt, no third-party provider
- **Admin CMS:** `/admin` — manage counties, towns, services, blog posts, reviews, FAQs, brands and site settings
- **Images:** Vercel Blob
- **Email:** Resend (booking/quote notifications)
- **Hosting:** Vercel (static generation + ISR)

The business is a **service-area business**: it comes to the customer (home, work,
roadside). **No street address is shown anywhere** — locations are modelled as
counties + towns and exposed via `areaServed` in the structured data.

---

## 1. Architecture at a glance

```
src/
  app/
    (site)/                 Public site (shares header / footer / sticky CTAs)
      page.tsx              Homepage
      [county]/             County hub        -> /kent
        page.tsx
        [town]/page.tsx     Town page         -> /kent/maidstone   (the SEO money pages)
      services/[service]/   Service template  -> /services/puncture-repair
      blog/[slug]/          Blog post
      about, contact, reviews, book, areas, privacy, terms
    admin/                  Protected CMS (see §5)
    api/
      auth/[...nextauth]    Auth.js handlers
      lead/                 Booking form -> Resend email
      upload/               Image upload -> Vercel Blob
    sitemap.ts, robots.ts   Auto-generated from the DB
  components/               UI, layout, sections, admin, seo
  lib/
    prisma.ts               Singleton Prisma client (serverless-safe)
    data.ts                 Cached read queries for public pages
    seo.ts                  Metadata + JSON-LD builders
    admin/                  Config-driven CRUD (resources.ts is the field source of truth)
prisma/
  schema.prisma            Models + indexes
  seed.ts                  Starter content + first admin user
```

**Content model:** `County 1—* Town`. `Service`, `BlogPost`, `Review`, `Faq`,
`Brand`, and a singleton `SiteSetting`. Reviews & FAQs can be global or attached
to a town/county/service for genuinely unique local pages.

---

## 2. Prerequisites

- Node.js 20+ (developed on Node 25)
- Access to your PostgreSQL database on the VPS
- A Vercel account (for hosting + Blob storage)
- A Resend account (optional, for lead emails)

---

## 3. Environment variables

Copy `.env.example` → `.env.local` and fill it in. **Never commit real secrets** —
`.env*` is git-ignored (except `.env.example`).

| Variable | Where it goes | Notes |
| --- | --- | --- |
| `DATABASE_URL` | `.env.local` + Vercel | **Pooled** connection used at runtime. Point at PgBouncer once added (`&pgbouncer=true`). |
| `DIRECT_URL` | `.env.local` + Vercel | **Direct** connection used by Prisma migrations only. |
| `AUTH_SECRET` | `.env.local` + Vercel | `npx auth secret` or `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | `.env.local` + Vercel | `http://localhost:3000` locally; `https://tyrefittingnearme.co.uk` in prod. |
| `NEXT_PUBLIC_SITE_URL` | `.env.local` + Vercel | Canonical URL for SEO/OG/sitemap. Same values as above. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | `.env.local` (+ once in Vercel to seed) | First admin login created by `npm run db:seed`. |
| `BLOB_READ_WRITE_TOKEN` | `.env.local` + Vercel | From your Vercel Blob store. Required for image uploads. |
| `RESEND_API_KEY` | `.env.local` + Vercel | Optional. Without it, leads are logged server-side. |
| `LEAD_NOTIFY_TO` / `LEAD_NOTIFY_FROM` | `.env.local` + Vercel | Recipient + verified sender for lead emails. |

### Connection-string format

```
postgresql://USER:PASSWORD@VPS_PUBLIC_IP:32768/DBNAME?sslmode=require
```

- `USER` = `POSTGRES_USER`, `PASSWORD` = `POSTGRES_PASSWORD`, `DBNAME` = `POSTGRES_DB`
  (the values from your `docker-compose.yaml`).
- `32768` is the host port your compose file maps to the container's `5432`.
- Keep `sslmode=require` for any connection over the public internet.

> ⚠️ **SSL note:** the stock `postgres` Docker image does **not** enable TLS, so
> `sslmode=require` fails with *"server does not support SSL"*. Either terminate
> TLS in front of Postgres (Traefik/nginx) and keep `sslmode=require`, or use
> `sslmode=disable` **only** while testing over an SSH tunnel. Do not expose an
> unencrypted Postgres to the public internet.

---

## 4. Local development

```bash
npm install
# 1. Fill in .env.local (DATABASE_URL/DIRECT_URL must reach your VPS)
# 2. Create the tables on the remote DB:
npm run db:push          # or: npm run db:migrate  (creates a migration)
# 3. Seed starter content + the first admin user:
npm run db:seed
# 4. Run the dev server:
npm run dev              # http://localhost:3000  (admin at /admin)
```

> The DB scripts load `.env.local` via `dotenv-cli`. Prisma's CLI otherwise only
> reads `.env`, so keep using the `npm run db:*` scripts.

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run db:push` | Sync schema to the DB (no migration files) |
| `npm run db:migrate` | Create + apply a migration (dev) |
| `npm run db:deploy` | Apply migrations (production/CI) |
| `npm run db:seed` | Seed content + admin user |
| `npm run db:studio` | Open Prisma Studio against the remote DB |

---

## 5. The admin CMS (`/admin`)

- Sign in at **`/admin/login`** with `ADMIN_EMAIL` / `ADMIN_PASSWORD` (the seed
  hashes the password with bcrypt). Everything under `/admin` is protected by
  middleware.
- Manage: **Counties, Towns, Services, Blog posts, Reviews, FAQs, Brands** and
  **Site settings** (phone, WhatsApp, counters, default SEO).
- Rich-text editing (Tiptap) for body fields; image upload to Vercel Blob.
- Saving any record triggers **on-demand ISR revalidation**, so the public site
  updates within seconds without a redeploy.

### Adding a new field (for the maintaining developer)

1. Add the column to the model in `prisma/schema.prisma`, then
   `npm run db:migrate`.
2. Add one entry to the resource's `fields` array in
   [`src/lib/admin/resources.ts`](src/lib/admin/resources.ts).
3. If the public page should show it, render it in the relevant template.

That's it — the admin list/create/edit forms are generated from that config.

---

## 6. SEO & performance

- Per-page `generateMetadata` (title, description, canonical, OG/Twitter).
- JSON-LD: `AutoRepair`/`LocalBusiness` with `areaServed` (no address),
  `FAQPage`, `BreadcrumbList`, and `Article` on blog posts.
- `sitemap.xml` and `robots.txt` are generated dynamically from the DB, so new
  CMS pages are included automatically.
- All pages are statically generated with **ISR** (`revalidate = 3600`), so the
  database isn't hit on every visit.
- `next/image` (AVIF/WebP), self-hosted Inter font, lightweight gradient hero.
- Sticky click-to-call header, fixed mobile call bar, and WhatsApp float on every
  page.

---

## 7. Deploying to Vercel

1. Push the repo to GitHub and import it into Vercel.
2. Add **all** environment variables from §3 in
   **Project → Settings → Environment Variables** (set `NEXTAUTH_URL` and
   `NEXT_PUBLIC_SITE_URL` to `https://tyrefittingnearme.co.uk`).
3. Create a **Vercel Blob** store and copy its token into `BLOB_READ_WRITE_TOKEN`.
4. Run migrations against the production DB (from your machine, with prod creds in
   `.env.local`, **or** as a one-off):
   ```bash
   npm run db:deploy
   ```
5. Deploy. The build runs `prisma generate && next build`.
6. Point the domain `tyrefittingnearme.co.uk` at Vercel.

### 🔒 Firewall — required before Vercel can connect

Your VPS must accept connections to Postgres from Vercel (and from your dev
machine). Vercel's serverless functions do **not** have static IPs, so you must
either:

- **Recommended:** put PgBouncer + TLS in front of Postgres and restrict access
  with TLS/auth; or
- allow the DB port through the firewall **with SSL enforced**, e.g.:
  ```bash
  sudo ufw allow 32768/tcp        # open the mapped Postgres port
  # ...and ensure sslmode=require actually works (see SSL note in §3)
  ```

Open the port **restricted and over SSL only**. Never expose an unencrypted
database to the public internet. For the tightest setup, run the app's DB access
through PgBouncer with TLS and keep the raw Postgres port closed to the world.

---

## 8. Security notes

- No real credentials live in the repo. `.env.local` (git-ignored) holds secrets.
- Rotate any credential that has been shared in plain text (e.g. over chat).
- The admin is `noindex` and protected by middleware + bcrypt-hashed passwords.
- `robots.txt` disallows `/admin` and `/api/`.

---

## 9. Legal

`/privacy` and `/terms` are **starter templates** — have them reviewed by a
solicitor before launch.
