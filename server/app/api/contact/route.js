import { NextResponse } from 'next/server'
import { contact } from '../../../src/content/site-content.js'
import { getContent, updateContent } from '../../../src/lib/content-api.js'
import { getDb } from '../../../src/lib/db.js'

const submissions = new Map()
function isRateLimited(request) {
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const attempts = (submissions.get(key) ?? []).filter((time) => now - time < 60_000)
  attempts.push(now); submissions.set(key, attempts)
  return attempts.length > 5
}

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

  if (isRateLimited(request)) return NextResponse.json({ error: 'Too many messages. Please wait a moment and try again.' }, { status: 429 })

  if (typeof name !== 'string' || typeof message !== 'string' || !name.trim() || !message.trim() || !email) {
    return NextResponse.json(
      { error: 'name, email, and message are required.' },
      { status: 400 },
    )
  }

  if (name.length > 160 || message.length > 10_000 || (phone && String(phone).length > 40) || (subject && String(subject).length > 160)) {
    return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 })
  }

  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'email must be valid.' }, { status: 400 })
  }

  try {
    await getDb().query(
      `INSERT INTO contacts (name, email, phone, subject, service_interest, message, source_page, source_url)
       VALUES ($1, $2, $3, $4, $4, $5, $6, $7)`,
      [name.trim(), email.trim().toLowerCase(), phone?.trim() || null, subject?.trim() || null, message.trim(), payload.sourcePage ?? 'contact-us', payload.sourceUrl ?? null],
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
