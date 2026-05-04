# WonderPath Press Website

Production-ready baseline for the WonderPath Press web presence, built with Next.js (App Router), Tailwind CSS, and Prisma.

## Stack
- **Framework:** Next.js 16 (App Router)
- **Runtime:** Node.js 20+
- **Styling:** Tailwind CSS
- **Database:** Prisma ORM (SQLite for local development)
- **Auth/Admin:** Custom session/login flow with admin dashboard routes

## Prerequisites
- Node.js 20 or newer
- npm 10 or newer

## Local Development Setup
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment variables**
   Create a `.env.local` file in the repository root.

   Minimum expected values:
   ```bash
   DATABASE_URL="file:./prisma/dev.db"
   SESSION_SECRET="replace-with-a-long-random-secret"
   ```

3. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

4. **Initialize database schema (local)**
   ```bash
   npx prisma db push
   ```

5. **(Optional) Seed local data**
   ```bash
   npm run db:seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. Open `http://localhost:3000`.

## Quality Checks
- Run linting:
  ```bash
  npm run lint
  ```
- Build check:
  ```bash
  npm run build
  ```

## Production Deployment

### Environment Variables
Set these in your deployment platform:
- `DATABASE_URL` (production database connection string)
- `SESSION_SECRET` (high-entropy secret used for signing session tokens)
- Any additional environment values used by your hosting setup

### Recommended Deployment Flow
1. Install dependencies:
   ```bash
   npm ci
   ```
2. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
3. Build app:
   ```bash
   npm run build
   ```
4. Start server:
   ```bash
   npm run start
   ```

### Database in Production
- Do **not** use local SQLite for production.
- Point `DATABASE_URL` to a managed database.
- Apply schema changes through your migration process when schema changes are introduced.

## Project Scripts
- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint
- `npm run db:seed` — seed database with initial data

## Repository Notes
- Public pages are located under `src/app/(public)`.
- Admin pages are under `src/app/admin`.
- Prisma schema is in `prisma/schema.prisma`.

## Troubleshooting
- If Prisma client is missing, run `npx prisma generate`.
- If local DB is out of sync, run `npx prisma db push`.
- If build fails due to environment values, confirm required env vars are set.
