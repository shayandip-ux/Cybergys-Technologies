import { NextResponse } from 'next/server'; import { cmsPage } from '../../../../../../src/lib/visual-cms.js';
export async function GET(_r,{params}){const {slug}=await params;const page=await cmsPage(slug);return page?NextResponse.json({data:page}):NextResponse.json({error:'Page not found.'},{status:404})}
