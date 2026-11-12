import pg from 'pg'
import { banner, contact, portfolio, services, technologies } from '../src/content/site-content.js'

const { Pool } = pg
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) throw new Error('DATABASE_URL is required. Run this from server/ with its .env file.')

const db = new Pool({ connectionString: databaseUrl })
const slugify = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

try {
  const bannerCount = await db.query('SELECT COUNT(*)::int AS count FROM banners')
  if (bannerCount.rows[0].count === 0) {
    await db.query(
      `INSERT INTO banners (title, subtitle, description, placement, sort_order, status, is_active)
       VALUES ($1, $2, $3, 'homepage_hero', 1, 'published', TRUE)`,
      [banner.eyebrow, banner.serviceLines.join('\n'), banner.highlight],
    )
  }

  for (const [index, service] of services.entries()) {
    await db.query(
      `INSERT INTO services (title, slug, short_description, description, sort_order, status, is_active, features)
       VALUES ($1, $2, $3, $3, $4, 'published', TRUE, '[]'::jsonb)
       ON CONFLICT (slug) DO NOTHING`,
      [service.title, service.slug, service.description, index + 1],
    )
  }

  for (const [index, project] of portfolio.entries()) {
    const slug = project.slug ?? project.id ?? slugify(`${project.title}-${index + 1}`)
    await db.query(
      `INSERT INTO portfolio (title, slug, category, project_date, sort_order, status, is_active, project_images)
       VALUES ($1, $2, $3, $4, $5, 'published', TRUE, '[]'::jsonb)
       ON CONFLICT (slug) DO NOTHING`,
      [project.title, slug, project.category, `${project.year ?? new Date().getFullYear()}-01-01`, index + 1],
    )
  }

  for (const [index, technology] of technologies.entries()) {
    const slug = slugify(technology.name)
    await db.query(
      `INSERT INTO technologies (name, slug, sort_order, status, is_active)
       VALUES ($1, $2, $3, 'published', TRUE)
       ON CONFLICT (slug) DO NOTHING`,
      [technology.name, slug, index + 1],
    )
  }

  const team = [
    ['Alex Carter', 'alex-carter', 'UI/UX Designer', 'Design', 'Create user-friendly designs that are modern, beautiful and driven by real user needs.'],
    ['Emily Watson', 'emily-watson', 'Lead Developer', 'Engineering', 'Love clean code, scalable systems, and turning complex challenges into simple solutions.'],
    ['Sophia Mitchell', 'sophia-mitchell', 'AI Developer', 'Engineering', 'Focus on turning ideas into meaningful digital experiences that solve real problems.'],
  ]
  for (const [index, [name, slug, designation, department, shortBio]] of team.entries()) {
    await db.query(
      `INSERT INTO teams (name, slug, designation, department, short_bio, sort_order, status, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, 'published', TRUE) ON CONFLICT (slug) DO NOTHING`,
      [name, slug, designation, department, shortBio, index + 1],
    )
  }

  const faqs = [
    ['What is your software development process?', 'Our software development process includes discovery, planning, UI/UX design, development, quality assurance, deployment and ongoing support.'],
    ['How long does it take to complete a software development project?', 'Project timelines depend on scope, complexity and requirements. After understanding your project, we provide a detailed timeline and milestones.'],
    ['Can you develop software tailored to my business needs?', 'Yes. We develop customized software solutions based on your business requirements, workflows, goals and future scalability.'],
  ]
  for (const [index, [question, answer]] of faqs.entries()) {
    const found = await db.query('SELECT id FROM faqs WHERE page_slug = $1 AND question = $2', ['home', question])
    if (!found.rowCount) await db.query(`INSERT INTO faqs (page_slug, question, answer, sort_order, status) VALUES ('home', $1, $2, $3, 'published')`, [question, answer, index + 1])
  }

  await db.query(
    `INSERT INTO site_settings (setting_key, setting_value, description)
     VALUES ('contact', $1::jsonb, 'Public contact details and enquiry subjects')
     ON CONFLICT (setting_key) DO NOTHING`,
    [JSON.stringify(contact)],
  )
  console.log('CMS seed complete. Existing rows were preserved.')
} finally {
  await db.end()
}
