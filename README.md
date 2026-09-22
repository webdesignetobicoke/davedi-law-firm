# Davedi Law — Website

Next.js (App Router) site for Davedi Law Professional Corporation, styled after
douglaslawfirm.ca with content, logo and photos sourced from davedilaw.ca.

## Stack

- Next.js 16 + TypeScript + Tailwind CSS v4
- Prisma + Postgres (client reviews)
- Resend (email approve/reject links to lawyers)

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

The site runs fully without a database — every page works, except the review
system will show "temporarily unavailable" until Postgres is connected.

## Client review system

Visitors can leave a review for either lawyer on `/reviews` or on a lawyer's
profile page. The review is emailed to that lawyer with **Approve** /
**Reject** links — nothing appears on the site until the lawyer clicks
Approve. Approved reviews show on `/reviews` and on the lawyer's own profile
page (`/lawyers/[slug]`).

To wire this up for real, two things need to be connected:

### 1. Database — Vercel Postgres

1. In the Vercel project → **Storage** tab → **Create Database** → **Postgres**.
2. Connect it to this project. Vercel injects `POSTGRES_PRISMA_URL` and
   `POSTGRES_URL_NON_POOLING` automatically.
3. Locally, copy those two values from the Vercel dashboard's `.env.local` tab
   into your own `.env`.
4. Run `npm run db:push` once to create the `Review` table.

### 2. Email — Resend

1. Create a free account at [resend.com](https://resend.com).
2. Verify a sending domain (or use their shared test sender while testing).
3. Create an API key and set `RESEND_API_KEY` in your environment.
4. Set `REVIEWS_FROM_EMAIL` to an address on your verified domain, e.g.
   `"Davedi Law <reviews@davedilaw.ca>"`.
5. Set `NEXT_PUBLIC_SITE_URL` to the site's real URL so the approve/reject
   links in the email point at production.

Lawyer email addresses for review notifications live in
`src/lib/lawyers.ts` (`email` field) — update there if either lawyer's
contact email changes.

## Editable content

All firm content is in plain data files, not hardcoded in pages:

- `src/lib/lawyers.ts` — bios, achievements, contact info per lawyer
- `src/lib/services.ts` — practice areas and the specific services listed
  under each
- `src/lib/site.ts` — firm name, office contact info, social links

## Deploying

Push to GitHub and import into Vercel as usual. Add the environment
variables above in the Vercel project settings before the first deploy with
live reviews.
