import { testimonials } from '../../../src/content/site-content.js'
import { getContent, updateContent } from '../../../src/lib/content-api.js'

export function GET() { return getContent('site:testimonials', testimonials) }
export function PUT(request) { return updateContent(request, 'site:testimonials') }
