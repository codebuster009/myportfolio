# Netlify Deployment

This project moved from a static CRA build (drag-drop deploy) to a full-stack
Next.js 14 app. **There is no manual folder upload anymore.** Netlify must be
**connected to the Git repo** so its servers run `next build` with the Next.js
Runtime and provision SSR / middleware / API routes / the scheduled function.

Config lives in `netlify.toml` (build + Node 20) and
`netlify/functions/publish-scheduled.mjs` (replaces the old Vercel cron — Netlify
ignores `vercel.json`).

---

## 1. Push the repo to GitHub

The deploy-critical files must be committed: `netlify.toml`,
`netlify/functions/publish-scheduled.mjs`, `.nvmrc`, and the build fix in
`app/case-studies/authnull/page.tsx`. (`.next/` and the stale `build/` CRA folder
are gitignored — correctly not deployed.)

## 2. Create the Netlify site

Netlify dashboard → **Add new site → Import an existing project** → pick the
GitHub repo. Build command and Node version come from `netlify.toml` — leave the
auto-detected settings. **Do not deploy yet** — set env vars first (step 4).

## 3. Pick the site URL first (avoids a rebuild)

`NEXT_PUBLIC_SITE_URL` is inlined into the bundle **at build time**, so it must
be correct *before* the build that ships. Set the site name (or attach a custom
domain) **now**, so you know the final URL before step 4.

- Site configuration → change site name → e.g. `kartavya.netlify.app`, **or**
- Domain management → add your custom domain.

## 4. Environment variables

Site configuration → **Environment variables** → add all of these (values come
from your local `.env.local`, which is gitignored and does NOT deploy):

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Postgres. **Use the POOLED connection string** (Neon `-pooler` host / Supabase pooler) — serverless functions exhaust direct connections. See `lib/db.ts`. |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | Final site URL, e.g. `https://kartavya.netlify.app` (NOT localhost) |
| `AUTH_GITHUB_ID` | GitHub OAuth App client ID (step 5) |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App client secret (step 5) |
| `ADMIN_GITHUB_LOGINS` | Comma-separated GitHub usernames allowed into `/admin` |
| `NEXT_PUBLIC_SITE_URL` | Final site URL — **build-time**, changing it later needs a redeploy |
| `RESEND_API_KEY` | Required by `/api/contact`. Without it the contact form returns 500 in prod. |
| `RESEND_FROM_EMAIL` | Sender shown in the contact email, e.g. `Portfolio Contact <onboarding@resend.dev>` |
| `SUPABASE_URL` | Optional. Only needed if admin uses Supabase storage for media uploads. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional. Pair with `SUPABASE_URL`. |
| `CRON_SECRET` | `openssl rand -base64 32`. Used by **both** the API route and the scheduled function (one value, set once). |
| `SUPABASE_MEDIA_BUCKET` | Optional — defaults to `media` |

## 5. GitHub OAuth callback

GitHub → Settings → Developer settings → OAuth Apps → your app → set
**Authorization callback URL** to:

```
https://<your-site>/api/auth/callback/github
```

Without this, `/admin` login fails with a redirect-uri mismatch. (`trustHost:
true` is already set in `auth.ts`, so host detection itself is fine.)

## 6. Deploy

Trigger a deploy. Netlify clones the repo, runs `npm run build`, applies the
Next.js Runtime, and registers the scheduled function.

## 7. Verify after deploy

- [ ] Site loads; a few pages render (all are SSR).
- [ ] `/admin/login` → GitHub → returns authenticated (your username is in `ADMIN_GITHUB_LOGINS`).
- [ ] **Functions** tab lists `publish-scheduled` with schedule `0 * * * *`.
- [ ] Manual cron check:
  ```
  curl -i -H "Authorization: Bearer <CRON_SECRET>" https://<your-site>/api/cron/publish
  ```
  Expect `{"ok":true,"published":N}`. A wrong/missing bearer must return `401`.
- [ ] Trigger the scheduled function once from the Functions tab; logs show `[publish-scheduled] 200 {"ok":true,...}`.

---

## Notes

- **`vercel.json` is now dead config on Netlify** (its cron never fires here).
  Safe to keep for reference or delete — it does nothing on Netlify.
- **DB connections:** `lib/db.ts` uses `pg.Pool({ max: 10 })` per function
  instance. On free Postgres tiers under concurrency this can exhaust
  connections — prefer the pooled connection string and consider lowering `max`.
- **Netlify free tier** has no commercial-use restriction (unlike Vercel Hobby)
  and supports SSR + Scheduled Functions; a portfolio stays well under quota.
