import { NextResponse } from 'next/server'
import { readContent, writeContent } from '../../../../src/lib/content-store.js'

const allowedKeys = new Set([
  'users', 'categories', 'listings', 'posts', 'pages', 'regions',
  'site-settings', 'navigation', 'home-page', 'partners',
  'tracking-scripts', 'partner-enquiries', 'partner-form', 'settings',
])

function validateKey(key) {
  return allowedKeys.has(key)
}

export async function GET(_request, { params }) {
  const { key } = await params
  if (!validateKey(key)) return NextResponse.json({ error: 'Unknown admin resource.' }, { status: 404 })

  try {
    return NextResponse.json({ data: await readContent(`admin:${key}`, []) })
  } catch (error) {
    console.error(`Unable to read admin resource ${key}:`, error)
    return NextResponse.json({ error: 'Database content is unavailable.' }, { status: 503 })
  }
}

export async function PUT(request, { params }) {
  const { key } = await params
  if (!validateKey(key)) return NextResponse.json({ error: 'Unknown admin resource.' }, { status: 404 })

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  if (!Object.hasOwn(payload, 'data')) {
    return NextResponse.json({ error: 'data is required.' }, { status: 400 })
  }

  try {
    const saved = await writeContent(`admin:${key}`, payload.data)
    return NextResponse.json({ data: saved.value, updatedAt: saved.updated_at })
  } catch (error) {
    console.error(`Unable to update admin resource ${key}:`, error)
    return NextResponse.json({ error: 'Unable to save data.' }, { status: 503 })
  }
}
