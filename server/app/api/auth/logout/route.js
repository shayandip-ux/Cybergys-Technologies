import { NextResponse } from 'next/server'
import { expiredSessionCookie } from '../../../../src/lib/auth.js'
export async function POST() { const response = NextResponse.json({ data: { loggedOut: true } }); response.cookies.set(expiredSessionCookie); return response }
