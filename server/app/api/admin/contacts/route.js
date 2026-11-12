import { NextResponse } from 'next/server'
import { getDb } from '../../../../src/lib/db.js'
import { requireAdmin } from '../../../../src/lib/auth.js'

const allowedStatuses = new Set(['new', 'contacted', 'in_progress', 'converted', 'closed', 'spam'])

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(Number.parseInt(searchParams.get('page') ?? '1', 10) || 1, 1)
  const pageSize = Math.min(Math.max(Number.parseInt(searchParams.get('pageSize') ?? '20', 10) || 20, 1), 100)
  const search = searchParams.get('search')?.trim() ?? ''
  const status = searchParams.get('status')?.trim() ?? ''
  try { await requireAdmin() } catch { return NextResponse.json({ error: 'Authentication required.' }, { status: 401 }) }
  const where = []; const values = []
  if (search) { values.push(`%${search}%`); where.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR COALESCE(phone, '') ILIKE $${values.length})`) }
  if (allowedStatuses.has(status)) { values.push(status); where.push(`status = $${values.length}`) }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
  try {
    const db = getDb()
    const count = await db.query(`SELECT COUNT(*)::int AS total FROM contacts ${clause}`, values)
    values.push(pageSize, (page - 1) * pageSize)
    const rows = await db.query(`SELECT id, name, email, phone, subject, service_interest, message, status, notes AS internal_notes, created_at, updated_at FROM contacts ${clause} ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`, values)
    return NextResponse.json({ data: rows.rows, meta: { page, pageSize, total: count.rows[0].total } })
  } catch (error) {
    console.error('Unable to load contacts:', error)
    return NextResponse.json({ error: 'Unable to load contact submissions.' }, { status: 503 })
  }
}

export async function PATCH(request) {
  try { await requireAdmin() } catch { return NextResponse.json({ error: 'Authentication required.' }, { status: 401 }) }
  let payload
  try { payload = await request.json() } catch { return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 }) }
  const id = String(payload.id ?? '').trim()
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: 'A valid contact id is required.' }, { status: 400 })
  }
  if (payload.status && !allowedStatuses.has(payload.status)) return NextResponse.json({ error: 'Invalid contact status.' }, { status: 400 })
  if (payload.internalNotes !== undefined && (typeof payload.internalNotes !== 'string' || payload.internalNotes.length > 10_000)) return NextResponse.json({ error: 'Invalid internal notes.' }, { status: 400 })
  try {
    const result = await getDb().query(
      `UPDATE contacts SET status = COALESCE($2, status), notes = COALESCE($3, notes), updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, payload.status ?? null, payload.internalNotes ?? null],
    )
    if (!result.rowCount) return NextResponse.json({ error: 'Contact submission not found.' }, { status: 404 })
    return NextResponse.json({ data: result.rows[0] })
  } catch (error) {
    console.error('Unable to update contact:', error)
    return NextResponse.json({ error: 'Unable to update contact submission.' }, { status: 503 })
  }
}
