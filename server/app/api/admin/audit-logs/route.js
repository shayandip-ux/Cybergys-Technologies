import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/auth.js'
import { getDb } from '../../../../src/lib/db.js'

export async function GET() {
  try {
    await requireAdmin()
    const result = await getDb().query(`
      SELECT audit_logs.id, audit_logs.action, audit_logs.entity_type, audit_logs.entity_id,
             audit_logs.old_data, audit_logs.new_data, audit_logs.ip_address, audit_logs.created_at,
             admin_users.name AS admin_name, admin_users.email AS admin_email
      FROM audit_logs
      LEFT JOIN admin_users ON admin_users.id = audit_logs.admin_id
      ORDER BY audit_logs.created_at DESC
      LIMIT 250`)
    return NextResponse.json({ data: result.rows })
  } catch (error) {
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Authentication required.' : 'Unable to load activity.' }, { status: error.message === 'UNAUTHORIZED' ? 401 : 503 })
  }
}
