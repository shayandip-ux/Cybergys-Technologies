# Cybergys Technologies

This repository uses npm workspaces to keep the frontend and backend independent:

```
client/  # React, Vite, and Tailwind UI
server/  # Node.js HTTP API
```

## Setup

```sh
npm install
```

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

The client forwards `/api` requests to the API. You can still run `npm run dev:client` or `npm run dev:server` individually. The API provides `GET /api/health` and a starter `POST /api/contact` endpoint.

## Other scripts

- `npm run build` — build the client.
- `npm run lint` — lint the client.
- `npm run start` — start the API.
