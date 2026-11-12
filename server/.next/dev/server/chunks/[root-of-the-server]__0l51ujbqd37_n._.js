module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/server/app/api/portfolio/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$cms$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/src/lib/cms-repository.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$cms$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$cms$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function GET() {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$cms$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listCms"])('portfolio')
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Portfolio is unavailable.'
        }, {
            status: 503
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/server/src/lib/cms-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "createCms",
    ()=>createCms,
    "deleteCms",
    ()=>deleteCms,
    "getCms",
    ()=>getCms,
    "listCms",
    ()=>listCms,
    "resource",
    ()=>resource,
    "updateCms",
    ()=>updateCms
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/src/lib/db.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const resources = {
    banners: {
        table: 'banners',
        fields: [
            'title',
            'subtitle',
            'description',
            'desktop_image',
            'mobile_image',
            'button_text',
            'button_url',
            'secondary_button_text',
            'secondary_button_url',
            'placement',
            'background_color',
            'text_color',
            'sort_order',
            'status',
            'is_active',
            'start_date',
            'end_date',
            'seo_title',
            'seo_description'
        ]
    },
    services: {
        table: 'services',
        fields: [
            'title',
            'slug',
            'short_description',
            'description',
            'icon',
            'featured_image',
            'banner_image',
            'features',
            'button_text',
            'button_url',
            'sort_order',
            'is_featured',
            'is_active',
            'status',
            'seo_title',
            'seo_description',
            'seo_keywords'
        ]
    },
    portfolio: {
        table: 'portfolio',
        fields: [
            'title',
            'slug',
            'category',
            'short_description',
            'description',
            'featured_image',
            'project_images',
            'client_name',
            'project_url',
            'project_date',
            'project_details',
            'is_featured',
            'is_active',
            'sort_order',
            'status',
            'seo_title',
            'seo_description',
            'seo_keywords'
        ]
    },
    technologies: {
        table: 'technologies',
        fields: [
            'name',
            'slug',
            'category',
            'description',
            'logo',
            'website_url',
            'sort_order',
            'is_featured',
            'is_active',
            'status'
        ]
    },
    teams: {
        table: 'teams',
        fields: [
            'name',
            'slug',
            'designation',
            'department',
            'short_bio',
            'bio',
            'profile_image',
            'email',
            'social_links',
            'sort_order',
            'is_featured',
            'is_active',
            'status'
        ]
    },
    faqs: {
        table: 'faqs',
        fields: [
            'page_slug',
            'question',
            'answer',
            'sort_order',
            'status'
        ]
    }
};
function resource(name) {
    return resources[name];
}
const publicClause = "status = 'published' AND is_active = TRUE AND (start_date IS NULL OR start_date <= NOW()) AND (end_date IS NULL OR end_date >= NOW())";
async function listCms(name, isAdmin = false) {
    const config = resource(name);
    if (!config) throw new Error('Unknown CMS resource.');
    const where = isAdmin ? '' : name === 'banners' ? `WHERE ${publicClause}` : name === 'faqs' ? "WHERE status = 'published'" : "WHERE status = 'published' AND is_active = TRUE";
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().query(`SELECT * FROM ${config.table} ${where} ORDER BY sort_order ASC, created_at DESC`);
    return result.rows;
}
async function getCms(name, id) {
    const config = resource(name);
    if (!config) throw new Error('Unknown CMS resource.');
    return (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().query(`SELECT * FROM ${config.table} WHERE id = $1`, [
        id
    ])).rows[0] ?? null;
}
function normalize(config, input) {
    const record = {};
    for (const field of config.fields)if (Object.hasOwn(input, field)) record[field] = input[field] === '' ? null : input[field];
    for (const field of [
        'features',
        'project_images',
        'project_details',
        'social_links'
    ])if (Object.hasOwn(record, field)) record[field] = JSON.stringify(record[field] ?? (field === 'project_details' || field === 'social_links' ? {} : []));
    return record;
}
async function createCms(name, input, userId) {
    const config = resource(name);
    if (!config) throw new Error('Unknown CMS resource.');
    const record = normalize(config, input);
    const fields = Object.keys(record);
    if (!fields.length) throw new Error('No content fields supplied.');
    const values = fields.map((field)=>record[field]);
    values.push(userId);
    const query = `INSERT INTO ${config.table} (${fields.join(', ')}, created_by, updated_by) VALUES (${fields.map((_, index)=>`$${index + 1}`).join(', ')}, $${fields.length + 1}, $${fields.length + 1}) RETURNING *`;
    return (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().query(query, values)).rows[0];
}
async function updateCms(name, id, input, userId) {
    const config = resource(name);
    if (!config) throw new Error('Unknown CMS resource.');
    const record = normalize(config, input);
    const fields = Object.keys(record);
    if (!fields.length) throw new Error('No content fields supplied.');
    const values = fields.map((field)=>record[field]);
    values.push(userId, id);
    const sets = fields.map((field, index)=>`${field} = $${index + 1}`).concat(`updated_by = $${fields.length + 1}`, 'updated_at = NOW()');
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().query(`UPDATE ${config.table} SET ${sets.join(', ')} WHERE id = $${fields.length + 2} RETURNING *`, values);
    return result.rows[0] ?? null;
}
async function deleteCms(name, id) {
    const config = resource(name);
    if (!config) throw new Error('Unknown CMS resource.');
    return (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().query(`DELETE FROM ${config.table} WHERE id = $1 RETURNING *`, [
        id
    ])).rows[0] ?? null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/server/src/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "ensureContactSubmissionsSchema",
    ()=>ensureContactSubmissionsSchema,
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const globalForDb = globalThis;
let contactSchemaPromise;
function getDb() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('DATABASE_URL is required to connect to PostgreSQL.');
    }
    const db = globalForDb.__cybergysPostgresPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
        connectionString: databaseUrl
    });
    if ("TURBOPACK compile-time truthy", 1) {
        globalForDb.__cybergysPostgresPool = db;
    }
    return db;
}
function ensureContactSubmissionsSchema() {
    contactSchemaPromise ??= getDb().query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone TEXT;
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS subject TEXT;
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS internal_notes TEXT;
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
  `);
    return contactSchemaPromise;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0l51ujbqd37_n._.js.map