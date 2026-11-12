import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/auth.js'
import { getDb } from '../../../../src/lib/db.js'
import { writeAudit } from '../../../../src/lib/audit.js'

export const runtime = 'nodejs'
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])
const maxFileSize = 5 * 1024 * 1024

export async function POST(request) {
  let admin
  try { admin = await requireAdmin() } catch { return NextResponse.json({ error: 'Authentication required.' }, { status: 401 }) }
  try {
    const form = await request.formData(); const file = form.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Choose an image file.' }, { status: 400 })
    if (!allowedTypes.has(file.type)) return NextResponse.json({ error: 'Use a JPG, PNG, WebP, AVIF, or GIF image.' }, { status: 400 })
    if (!file.size || file.size > maxFileSize) return NextResponse.json({ error: 'Image must be smaller than 5 MB.' }, { status: 400 })
    const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' })[file.type]
    const filename = `${randomUUID()}.${extension}`; const relativeUrl = `/uploads/${filename}`
    const directory = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(directory, { recursive: true }); await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()))
    try {
      await getDb().query(
        `INSERT INTO media (file_name, original_name, file_url, file_type, mime_type, file_size, alt_text, storage_provider, folder, uploaded_by)
         VALUES ($1, $2, $3, 'image', $4, $5, $6, 'local', 'banners', $7)`,
        [filename, file.name, relativeUrl, file.type, file.size, String(form.get('altText') ?? ''), admin.id],
      )
    } catch (error) { console.warn('Image was saved but could not be catalogued in media table:', error.message) }
    const data = { url: relativeUrl, fileName: filename, altText: String(form.get('altText') ?? '') }
    await writeAudit({ adminId: admin.id, action: 'upload', entityType: 'media', newData: data, request })
    return NextResponse.json({ data }, { status: 201 })
  } catch (error) { console.error('Image upload failed:', error); return NextResponse.json({ error: 'Unable to upload image.' }, { status: 500 }) }
}
