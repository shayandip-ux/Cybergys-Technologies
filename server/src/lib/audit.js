import { getDb } from './db.js'

function clientIp(request) {
  const forwarded = request?.headers?.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded && /^[0-9a-fA-F:.]+$/.test(forwarded) ? forwarded : null
}

export async function writeAudit({ adminId, action, entityType = null, entityId = null, oldData = null, newData = null, request = null }) {
  try {
    await getDb().query(
      `INSERT INTO audit_logs (admin_id, action, entity_type, entity_id, old_data, new_data, ip_address)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7::inet)`,
      [adminId, action, entityType, entityId, JSON.stringify(oldData), JSON.stringify(newData), clientIp(request)],
    )
  } catch (error) {
    // Auditing must never prevent the authenticated admin action from completing.
    console.error('Unable to write audit log:', error.message)
  }
}
