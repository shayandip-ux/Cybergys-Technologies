import { banner } from '../../../src/content/site-content.js'
import { getContent, updateContent } from '../../../src/lib/content-api.js'

export function GET() {
  return getContent('site:banner', banner)
}

export function PUT(request) { return updateContent(request, 'site:banner') }
