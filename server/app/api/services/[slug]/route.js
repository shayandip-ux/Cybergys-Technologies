import { NextResponse } from 'next/server'
import { getDb } from '../../../../src/lib/db.js'

export async function GET(_request, { params }) {
  const { slug } = await params
  try {
    const result = await getDb().query("SELECT * FROM services WHERE slug = $1 AND status = 'published' AND is_active = TRUE", [slug])
    if (!result.rowCount) return NextResponse.json({ error: 'Service not found.' }, { status: 404 })
    return NextResponse.json({ data: result.rows[0] })
  } catch (error) {
    console.error('Unable to read service:', error)
    return NextResponse.json({ error: 'Database content is unavailable.' }, { status: 503 })
  }

}
