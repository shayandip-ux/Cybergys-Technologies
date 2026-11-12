import { NextResponse } from 'next/server'
import { currentAdmin, ensureInitialAdmin, sessionCookie, sessionValue, verifyPassword } from '../../../../src/lib/auth.js'
import { getDb } from '../../../../src/lib/db.js'
import { writeAudit } from '../../../../src/lib/audit.js'

export async function POST(request) {
  let body; try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }) }
  const email = String(body.email ?? '').trim().toLowerCase(); const password = String(body.password ?? '')
  if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  try {
    await ensureInitialAdmin()
    const result = await getDb().query('SELECT id, name, email, password_hash, role, avatar_url FROM admin_users WHERE email = $1 AND is_active = TRUE', [email])
    const user = result.rows[0]
    if (!user || !(await verifyPassword(password, user.password_hash))) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    await getDb().query('UPDATE admin_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1', [user.id])
    await writeAudit({ adminId: user.id, action: 'login', entityType: 'admin_users', entityId: user.id, request })
    const response = NextResponse.json({ data: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatar_url } })
    response.cookies.set(sessionCookie(sessionValue(user))); return response
  } catch (error) { console.error('Login failed:', error); return NextResponse.json({ error: 'Login is unavailable.' }, { status: 503 }) }
}

export async function GET() { const admin = await currentAdmin(); return admin ? NextResponse.json({ data: admin }) : NextResponse.json({ error: 'Authentication required.' }, { status: 401 }) }
