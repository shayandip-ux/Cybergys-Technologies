import { getDb } from './db.js'

const resources = {
  banners: { table: 'banners', fields: ['title', 'subtitle', 'description', 'desktop_image', 'mobile_image', 'button_text', 'button_url', 'secondary_button_text', 'secondary_button_url', 'placement', 'background_color', 'text_color', 'sort_order', 'status', 'is_active', 'start_date', 'end_date', 'seo_title', 'seo_description'] },
  services: { table: 'services', fields: ['title', 'slug', 'short_description', 'description', 'icon', 'featured_image', 'banner_image', 'features', 'button_text', 'button_url', 'sort_order', 'is_featured', 'is_active', 'status', 'seo_title', 'seo_description', 'seo_keywords'] },
  portfolio: { table: 'portfolio', fields: ['title', 'slug', 'category', 'short_description', 'description', 'featured_image', 'project_images', 'client_name', 'project_url', 'project_date', 'project_details', 'is_featured', 'is_active', 'sort_order', 'status', 'seo_title', 'seo_description', 'seo_keywords'] },
  technologies: { table: 'technologies', fields: ['name', 'slug', 'category', 'description', 'logo', 'website_url', 'sort_order', 'is_featured', 'is_active', 'status'] },
  teams: { table: 'teams', fields: ['name', 'slug', 'designation', 'department', 'short_bio', 'bio', 'profile_image', 'email', 'social_links', 'sort_order', 'is_featured', 'is_active', 'status'] },
  faqs: { table: 'faqs', fields: ['page_slug', 'question', 'answer', 'sort_order', 'status'] },
}

export function resource(name) { return resources[name] }
const publicClause = "status = 'published' AND is_active = TRUE AND (start_date IS NULL OR start_date <= NOW()) AND (end_date IS NULL OR end_date >= NOW())"

export async function listCms(name, isAdmin = false) {
  const config = resource(name); if (!config) throw new Error('Unknown CMS resource.')
  const where = isAdmin ? '' : name === 'banners' ? `WHERE ${publicClause}` : name === 'faqs' ? "WHERE status = 'published'" : "WHERE status = 'published' AND is_active = TRUE"
  const result = await getDb().query(`SELECT * FROM ${config.table} ${where} ORDER BY sort_order ASC, created_at DESC`)
  return result.rows
}

export async function getCms(name, id) {
  const config = resource(name); if (!config) throw new Error('Unknown CMS resource.')
  return (await getDb().query(`SELECT * FROM ${config.table} WHERE id = $1`, [id])).rows[0] ?? null
}

function normalize(config, input) {
  const record = {}
  for (const field of config.fields) if (Object.hasOwn(input, field)) record[field] = input[field] === '' ? null : input[field]
  for (const field of ['features', 'project_images', 'project_details', 'social_links']) if (Object.hasOwn(record, field)) record[field] = JSON.stringify(record[field] ?? (field === 'project_details' || field === 'social_links' ? {} : []))
  return record
}

export async function createCms(name, input, userId) {
  const config = resource(name); if (!config) throw new Error('Unknown CMS resource.')
  const record = normalize(config, input)
  const fields = Object.keys(record); if (!fields.length) throw new Error('No content fields supplied.')
  const values = fields.map((field) => record[field]); values.push(userId)
  const query = `INSERT INTO ${config.table} (${fields.join(', ')}, created_by, updated_by) VALUES (${fields.map((_, index) => `$${index + 1}`).join(', ')}, $${fields.length + 1}, $${fields.length + 1}) RETURNING *`
  return (await getDb().query(query, values)).rows[0]
}

export async function updateCms(name, id, input, userId) {
  const config = resource(name); if (!config) throw new Error('Unknown CMS resource.')
  const record = normalize(config, input); const fields = Object.keys(record)
  if (!fields.length) throw new Error('No content fields supplied.')
  const values = fields.map((field) => record[field]); values.push(userId, id)
  const sets = fields.map((field, index) => `${field} = $${index + 1}`).concat(`updated_by = $${fields.length + 1}`, 'updated_at = NOW()')
  const result = await getDb().query(`UPDATE ${config.table} SET ${sets.join(', ')} WHERE id = $${fields.length + 2} RETURNING *`, values)
  return result.rows[0] ?? null
}

export async function deleteCms(name, id) {
  const config = resource(name); if (!config) throw new Error('Unknown CMS resource.')
  return (await getDb().query(`DELETE FROM ${config.table} WHERE id = $1 RETURNING *`, [id])).rows[0] ?? null
}
