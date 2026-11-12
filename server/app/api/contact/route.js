import { NextResponse } from 'next/server'
import { contact } from '../../../src/content/site-content.js'
import { getContent, updateContent } from '../../../src/lib/content-api.js'
import { ensureContactSubmissionsSchema, getDb } from '../../../src/lib/db.js'

export function GET() {
  return getContent('site:contact', contact)
}

export function PUT(request) { return updateContent(request, 'site:contact') }

export async function POST(request) {
  let payload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  const name = payload.fullName ?? payload.name
  const { email, message, phone, subject } = payload

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'name, email, and message are required.' },
      { status: 400 },
    )
  }

  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'email must be valid.' }, { status: 400 })
  }

  try {
    await ensureContactSubmissionsSchema()
    await getDb().query(
      `INSERT INTO contact_submissions (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [name.trim(), email.trim().toLowerCase(), phone?.trim() || null, subject?.trim() || null, message.trim()],
    )
  } catch (error) {
    console.error('Unable to save contact submission:', error)
    return NextResponse.json(
      { error: 'Unable to save your message. Please try again later.' },
      { status: 503 },
    )
  }

  return NextResponse.json(
    { message: 'Thanks — your message has been received.' },
    { status: 201 },
  )
}
