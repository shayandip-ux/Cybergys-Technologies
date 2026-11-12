import { NextResponse } from 'next/server'
import { services } from '../../../../src/content/site-content.js'
import { readContent } from '../../../../src/lib/content-store.js'

export async function GET(_request, { params }) {
  const { slug } = await params
  let service

  try {
    const currentServices = await readContent('site:services', services)
    service = currentServices.find((item) => item.slug === slug)
  } catch (error) {
    console.error('Unable to read service:', error)
    return NextResponse.json({ error: 'Database content is unavailable.' }, { status: 503 })
  }

  if (!service) {
    return NextResponse.json({ error: 'Service not found.' }, { status: 404 })
  }

  return NextResponse.json({ data: service })
}
