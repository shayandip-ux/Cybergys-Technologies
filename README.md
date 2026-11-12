# Cybergys Technologies

This repository uses npm workspaces to keep the frontend and backend independent:

```
client/  # React, Vite, and Tailwind UI
server/  # Next.js API application
```

## Setup

```sh
npm install
```

## PostgreSQL

PostgreSQL is provided locally through Docker. Create the API environment file and start the database before running the API:

```sh
cp server/.env.example server/.env
docker compose up -d postgres
```

The database is available at `127.0.0.1:5433`; the default connection string is in `server/.env.example`.
Docker initializes the `contact_submissions` table on its first startup. To reset local database data and run the initialization again, use `docker compose down -v` followed by `docker compose up -d postgres`.

To browse the database in a local web UI, start Adminer:

```sh
docker compose up -d adminer
```

Open `http://localhost:8080` and sign in with:

- System: `PostgreSQL`
- Server: `postgres`
- Username: `cybergys`
- Password: `cybergys_local_password`
- Database: `cybergys`

## Development

Optionally create a local environment file from the template if you want to override the default development ports or API URL:

```sh
cp .env.example .env
```

Then start both services:

```sh
npm run dev
```

One command starts both services:

- Client: http://localhost:5173
- API: http://localhost:5000

The client forwards `/api` requests to the Next.js API. You can still run `npm run dev:client` or `npm run dev:server` individually.

## API foundation

The following content endpoints are ready for the client to consume when it is migrated from static data:

- `GET /api/banner`
- `GET /api/services`
- `GET /api/services/:slug`
- `GET /api/testimonials`
- `GET /api/technologies`
- `GET /api/portfolio`
- `GET /api/contact` — contact details and subject options
- `POST /api/contact` — accepts `name` (or `fullName`), `email`, and `message`
- `GET /api/health`

The API keeps its public site content in `server/src/content/site-content.js`. Contact form submissions are persisted to PostgreSQL.

## CMS behaviour

The first request to each content endpoint seeds its fallback content into PostgreSQL's `app_content` table. The existing admin content screens edit that database-backed content; records with `status` set to `draft`, `archived`, or `unpublished`, `active: false`, or an out-of-range publication date are excluded from public collection responses.

The public React sections use the shared API client and read `/api/banner`, `/api/services`, `/api/technologies`, and `/api/portfolio`. An optional `VITE_API_BASE_URL` may be used in deployments where the API is hosted on a different origin.

Contact submissions use `contact_submissions`. The initialization is non-destructive and adds `status`, `internal_notes`, and `updated_at` where absent. Admin tooling can query and update them through:

- `GET /api/admin/contacts?page=1&pageSize=20&search=&status=`
- `PATCH /api/admin/contacts` with `{ "id", "status", "internalNotes" }`

Admin access uses an HTTP-only signed session cookie. Configure `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `server/.env` to create the first `super_admin` on its first successful login. Rotate/remove `ADMIN_PASSWORD` after bootstrap.

## Seed the current frontend content

After PostgreSQL is running, seed the existing banner, services, portfolio, technologies, and contact settings into the relational CMS tables:

```sh
npm run seed:cms --workspace=server
```

The seed is idempotent: it uses unique slugs and only inserts missing rows. It never overwrites records that were changed in the admin panel.

## Other scripts

- `npm run build` — build the client and Next.js API.
- `npm run lint` — lint the client.
- `npm run start` — start the API.
