import { Pool } from 'pg'

const globalForDb = globalThis
let contactSchemaPromise

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to connect to PostgreSQL.')
  }

  const db = globalForDb.__cybergysPostgresPool ?? new Pool({
    connectionString: databaseUrl,
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForDb.__cybergysPostgresPool = db
  }

  return db
}

export function ensureContactSubmissionsSchema() {
  contactSchemaPromise ??= getDb().query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone TEXT;
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS subject TEXT;
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS internal_notes TEXT;
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
  `)

  return contactSchemaPromise
}
