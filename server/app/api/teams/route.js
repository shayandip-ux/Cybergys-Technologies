import { NextResponse } from 'next/server'
import { listCms } from '../../../src/lib/cms-repository.js'
export async function GET() { try { return NextResponse.json({ data: await listCms('teams') }) } catch { return NextResponse.json({ error: 'Team content is unavailable.' }, { status: 503 }) } }
