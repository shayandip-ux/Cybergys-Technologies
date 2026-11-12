import { NextResponse } from 'next/server'
import { readContent, writeContent } from './content-store.js'

function isPublicRecord(record, now = new Date()) {
  if (!record || typeof record !== 'object') return true
  if (record.active === false || ['draft', 'archived', 'unpublished'].includes(String(record.status ?? '').toLowerCase())) return false
  const start = record.published_at ?? record.publish_at ?? record.publishAt
  const end = record.unpublish_at ?? record.unpublishAt
  return (!start || new Date(start) <= now) && (!end || new Date(end) >= now)
}

export function publicContent(value) {
  return Array.isArray(value) ? value.filter(isPublicRecord).sort((a, b) => (a.display_order ?? a.order ?? 0) - (b.display_order ?? b.order ?? 0)) : value
}

export async function getContent(key, fallback, { publicOnly = true } = {}) {
  try {
    const value = await readContent(key, fallback)
    return NextResponse.json({ data: publicOnly ? publicContent(value) : value })
  } catch (error) {
    console.error(`Unable to read ${key}:`, error)
    return NextResponse.json({ error: 'Database content is unavailable.' }, { status: 503 })
  }
}

export async function updateContent(request, key) {
  let payload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  if (!Object.hasOwn(payload, 'data')) {
    return NextResponse.json({ error: 'data is required.' }, { status: 400 })
  }

  if (JSON.stringify(payload.data).length > 1_000_000) {
    return NextResponse.json({ error: 'Content payload is too large.' }, { status: 413 })
  }

  try {
    const saved = await writeContent(key, payload.data)
    return NextResponse.json({ data: saved.value, updatedAt: saved.updated_at })
  } catch (error) {
    console.error(`Unable to update ${key}:`, error)
    return NextResponse.json({ error: 'Unable to save content.' }, { status: 503 })
  }
}
