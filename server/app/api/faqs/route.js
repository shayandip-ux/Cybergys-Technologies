import { NextResponse } from 'next/server'
import { listCms } from '../../../src/lib/cms-repository.js'
export async function GET(request) { try { const page = new URL(request.url).searchParams.get('page') ?? 'home'; const rows = await listCms('faqs'); return NextResponse.json({ data: rows.filter((item) => item.page_slug === page) }) } catch { return NextResponse.json({ error: 'FAQ content is unavailable.' }, { status: 503 }) } }
