import { createHmac, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { cookies } from 'next/headers'
import { getDb } from './db.js'

const scrypt = promisify(scryptCallback)
const cookieName = 'cybergys_admin_session'
const secret = () => process.env.AUTH_SECRET

export async function hashPassword(password) {
  const salt = crypto.randomUUID().replaceAll('-', '')
  const hash = await scrypt(password, salt, 64)
  return `scrypt$${salt}$${Buffer.from(hash).toString('hex')}`
}

export async function verifyPassword(password, encoded) {
  const [kind, salt, expected] = String(encoded).split('$')
  if (kind !== 'scrypt' || !salt || !expected) return false
  const actual = Buffer.from(await scrypt(password, salt, 64)).toString('hex')
  return actual.length === expected.length && timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
}

function sign(value) { return createHmac('sha256', secret()).update(value).digest('base64url') }

export function sessionValue(user) {
  if (!secret()) throw new Error('AUTH_SECRET must be configured.')
  const payload = Buffer.from(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export async function currentAdmin() {
  if (!secret()) return null
  const value = (await cookies()).get(cookieName)?.value
  if (!value) return null
  const [payload, signature] = value.split('.')
  if (!payload || !signature || signature !== sign(payload)) return null
  try {
    const user = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return user.exp > Date.now() ? user : null
  } catch { return null }
}

export async function requireAdmin() {
  const admin = await currentAdmin()
  if (!admin) throw new Error('UNAUTHORIZED')
  return admin
}

export const sessionCookie = (value) => ({ name: cookieName, value, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 8 * 60 * 60 })
export const expiredSessionCookie = { name: cookieName, value: '', httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 }

export async function ensureInitialAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) return
  const db = getDb()
  const existing = await db.query('SELECT id FROM admin_users LIMIT 1')
  if (!existing.rowCount) await db.query('INSERT INTO admin_users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)', [process.env.ADMIN_NAME ?? 'Administrator', email, await hashPassword(password), 'super_admin'])
}
