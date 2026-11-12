import { getDb } from './db.js'

let schemaPromise

function ensureSchema() {
  schemaPromise ??= getDb().query(`
    CREATE TABLE IF NOT EXISTS app_content (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  return schemaPromise
}

export async function readContent(key, fallback) {
  await ensureSchema()
  const db = getDb()
  const result = await db.query('SELECT value FROM app_content WHERE key = $1', [key])

  if (result.rowCount) return result.rows[0].value

  const inserted = await db.query(
    `INSERT INTO app_content (key, value)
     VALUES ($1, $2::jsonb)
     ON CONFLICT (key) DO NOTHING
     RETURNING value`,
    [key, JSON.stringify(fallback)],
  )

  if (inserted.rowCount) return inserted.rows[0].value

  const existing = await db.query('SELECT value FROM app_content WHERE key = $1', [key])
  return existing.rows[0].value
}

export async function writeContent(key, value) {
  await ensureSchema()
  const result = await getDb().query(
    `INSERT INTO app_content (key, value, updated_at)
     VALUES ($1, $2::jsonb, NOW())
     ON CONFLICT (key)
     DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
     RETURNING value, updated_at`,
    [key, JSON.stringify(value)],
  )

  return result.rows[0]
}
