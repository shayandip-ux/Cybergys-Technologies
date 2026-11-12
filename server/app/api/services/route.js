import { NextResponse } from 'next/server'
import { listCms } from '../../../src/lib/cms-repository.js'

export async function GET() { try { return NextResponse.json({ data: await listCms('services') }) } catch { return NextResponse.json({ error: 'Services are unavailable.' }, { status: 503 }) } }
