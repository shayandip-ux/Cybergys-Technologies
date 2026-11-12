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

## Other scripts

- `npm run build` — build the client and Next.js API.
- `npm run lint` — lint the client.
- `npm run start` — start the API.
