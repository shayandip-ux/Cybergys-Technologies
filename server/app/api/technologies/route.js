import { NextResponse } from 'next/server'
import { listCms } from '../../../src/lib/cms-repository.js'

export async function GET() { try { return NextResponse.json({ data: await listCms('technologies') }) } catch { return NextResponse.json({ error: 'Technologies are unavailable.' }, { status: 503 }) } }
