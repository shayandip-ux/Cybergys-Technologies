import { NextResponse } from 'next/server'
import { listCms } from '../../../src/lib/cms-repository.js'

export async function GET() {
  try { return NextResponse.json({ data: await listCms('banners') }) } catch { return NextResponse.json({ error: 'Banner content is unavailable.' }, { status: 503 }) }
}
