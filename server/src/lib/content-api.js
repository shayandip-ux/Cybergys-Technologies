import { NextResponse } from 'next/server'
import { readContent, writeContent } from './content-store.js'

export async function getContent(key, fallback) {
  try {
    return NextResponse.json({ data: await readContent(key, fallback) })
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

  try {
    const saved = await writeContent(key, payload.data)
    return NextResponse.json({ data: saved.value, updatedAt: saved.updated_at })
  } catch (error) {
    console.error(`Unable to update ${key}:`, error)
    return NextResponse.json({ error: 'Unable to save content.' }, { status: 503 })
  }
}
