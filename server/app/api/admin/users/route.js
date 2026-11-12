import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/auth.js'
import { getDb } from '../../../../src/lib/db.js'
export async function GET() { try { await requireAdmin(); const result = await getDb().query('SELECT id,name,email,role,avatar_url,is_active,last_login_at,created_at,updated_at FROM admin_users ORDER BY created_at DESC'); return NextResponse.json({ data: result.rows }) } catch (error) { return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Authentication required.' : 'Unable to load users.' }, { status: error.message === 'UNAUTHORIZED' ? 401 : 503 }) } }
