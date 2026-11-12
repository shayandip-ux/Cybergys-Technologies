import { NextResponse } from 'next/server'
import { listCms } from '../../../src/lib/cms-repository.js'

export async function GET() { try { return NextResponse.json({ data: await listCms('portfolio') }) } catch { return NextResponse.json({ error: 'Portfolio is unavailable.' }, { status: 503 }) } }
