import { NextResponse } from 'next/server'
import { getDb } from '../../../src/lib/db.js'

export async function GET() {
  try {
    await getDb().query('SELECT 1')
    return NextResponse.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    console.error('PostgreSQL health check failed:', error)
    return NextResponse.json(
      { status: 'error', database: 'unavailable' },
      { status: 503 },
    )
  }
}
