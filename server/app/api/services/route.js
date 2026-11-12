import { services } from '../../../src/content/site-content.js'
import { getContent, updateContent } from '../../../src/lib/content-api.js'

export function GET() { return getContent('site:services', services) }
export function PUT(request) { return updateContent(request, 'site:services') }
