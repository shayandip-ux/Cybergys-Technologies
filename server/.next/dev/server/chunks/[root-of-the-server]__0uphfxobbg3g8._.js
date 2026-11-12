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
"[project]/server/app/api/cms/pages/[slug]/content/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$visual$2d$cms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/src/lib/visual-cms.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$visual$2d$cms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$visual$2d$cms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function GET(_r, { params }) {
    const { slug } = await params;
    const page = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$visual$2d$cms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cmsPage"])(slug);
    return page ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        data: page
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Page not found.'
    }, {
        status: 404
    });
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
"[project]/server/src/lib/visual-cms.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "cmsPage",
    ()=>cmsPage,
    "ensureVisualCms",
    ()=>ensureVisualCms
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/src/lib/db.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
let ready;
const pageDefaults = [
    [
        'home',
        'Home',
        '/',
        'Homepage'
    ],
    [
        'about-us',
        'About Us',
        '/about-us',
        'Company story and team'
    ],
    [
        'services',
        'Services',
        '/services',
        'Service overview'
    ],
    [
        'portfolio',
        'Portfolio',
        '/portfolio',
        'Portfolio overview'
    ],
    [
        'technologies',
        'Technologies',
        '/technologies',
        'Technology overview'
    ],
    [
        'contact-us',
        'Contact Us',
        '/contact-us',
        'Contact page'
    ]
];
const contentDefaults = {
    home: [
        [
            'about',
            'eyebrow',
            'text',
            'About eyebrow',
            '1. WHO WE ARE'
        ],
        [
            'about',
            'heading_line_one',
            'heading',
            'About heading, line 1',
            'HAVE A BRILLIANT'
        ],
        [
            'about',
            'heading_line_two',
            'heading',
            'About heading, line 2',
            'IDEA BOOST THE'
        ],
        [
            'about',
            'highlight_growth',
            'heading',
            'About heading highlight: Growth',
            'GROWTH'
        ],
        [
            'about',
            'highlight_development',
            'heading',
            'About heading highlight: Development',
            'DEVELOPMENT'
        ],
        [
            'about',
            'heading_agency',
            'heading',
            'About heading: Agency',
            'AGENCY'
        ],
        [
            'about',
            'heading_branding',
            'heading',
            'About heading: Branding',
            'YOUR BRANDING!'
        ],
        [
            'about',
            'intro',
            'richtext',
            'About introduction',
            'Welcome to Cybergys Technologies – Empowering Technological Excellence Since 2006.'
        ],
        [
            'about',
            'description',
            'richtext',
            'About description',
            'Our expertise spans a spectrum of services, including Web development, Web design, Application development, Digital marketing, BPO/KPO and Customer support services. Specializing in Web development, our professionals bring innovation and expertise to every project.'
        ],
        [
            'about',
            'client_count',
            'text',
            'Client count',
            '32k+'
        ],
        [
            'about',
            'client_caption',
            'richtext',
            'Client caption',
            'happy clients of our services'
        ],
        [
            'about',
            'cta',
            'button',
            'About CTA',
            'Explore Us More'
        ],
        [
            'quick-project',
            'label',
            'text',
            'Project label',
            'Have a Projects?'
        ],
        [
            'quick-project',
            'heading',
            'heading',
            'Project heading',
            'Have A Project? Speak With Our expert.'
        ]
    ],
    'about-us': [
        [
            'banner',
            'banner_title',
            'heading',
            'Banner title',
            'About Us'
        ],
        [
            'banner',
            'banner_image',
            'image',
            'Banner image',
            ''
        ],
        [
            'about',
            'eyebrow',
            'text',
            'About eyebrow',
            '1. WHO WE ARE'
        ],
        [
            'about',
            'heading_line_one',
            'heading',
            'About heading, line 1',
            'HAVE A BRILLIANT'
        ],
        [
            'about',
            'heading_line_two',
            'heading',
            'About heading, line 2',
            'IDEA BOOST THE'
        ],
        [
            'about',
            'highlight_growth',
            'heading',
            'About heading highlight: Growth',
            'GROWTH'
        ],
        [
            'about',
            'highlight_development',
            'heading',
            'About heading highlight: Development',
            'DEVELOPMENT'
        ],
        [
            'about',
            'heading_agency',
            'heading',
            'About heading: Agency',
            'AGENCY'
        ],
        [
            'about',
            'heading_branding',
            'heading',
            'About heading: Branding',
            'YOUR BRANDING!'
        ],
        [
            'about',
            'intro',
            'richtext',
            'About introduction',
            'Welcome to Cybergys Technologies – Empowering Technological Excellence Since 2006.'
        ],
        [
            'about',
            'description',
            'richtext',
            'About description',
            'Our expertise spans a spectrum of services, including Web development, Web design, Application development, Digital marketing, BPO/KPO and Customer support services. Specializing in Web development, our professionals bring innovation and expertise to every project.'
        ],
        [
            'about',
            'client_count',
            'text',
            'Client count',
            '32k+'
        ],
        [
            'about',
            'client_caption',
            'richtext',
            'Client caption',
            'happy clients of our services'
        ],
        [
            'about',
            'cta',
            'button',
            'About CTA',
            'Explore Us More'
        ]
    ],
    services: [
        [
            'banner',
            'banner_title',
            'heading',
            'Banner title',
            'Our Services'
        ],
        [
            'banner',
            'banner_image',
            'image',
            'Banner image URL',
            ''
        ]
    ],
    portfolio: [
        [
            'banner',
            'banner_title',
            'heading',
            'Banner title',
            'Our Portfolio'
        ],
        [
            'banner',
            'banner_image',
            'image',
            'Banner image URL',
            ''
        ]
    ],
    technologies: [
        [
            'banner',
            'banner_title',
            'heading',
            'Banner title',
            'Technologies'
        ],
        [
            'banner',
            'banner_image',
            'image',
            'Banner image URL',
            ''
        ]
    ],
    'contact-us': [
        [
            'banner',
            'banner_title',
            'heading',
            'Banner title',
            'Contact Us'
        ],
        [
            'banner',
            'banner_image',
            'image',
            'Banner image URL',
            ''
        ]
    ]
};
async function ensureVisualCms() {
    ready ??= (async ()=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        await db.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;
      CREATE TABLE IF NOT EXISTS cms_pages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), page_name TEXT NOT NULL, page_slug TEXT UNIQUE NOT NULL, page_url TEXT NOT NULL, description TEXT, seo_title TEXT, seo_description TEXT, is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
      CREATE TABLE IF NOT EXISTS cms_page_content (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), page_id UUID NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE, section_key TEXT NOT NULL, content_key TEXT NOT NULL, content_type TEXT NOT NULL, label TEXT NOT NULL, draft_value JSONB NOT NULL DEFAULT '{}'::jsonb, published_value JSONB NOT NULL DEFAULT '{}'::jsonb, is_editable BOOLEAN NOT NULL DEFAULT TRUE, sort_order INTEGER DEFAULT 0, updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(page_id, section_key, content_key));
      CREATE TABLE IF NOT EXISTS cms_content_revisions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), page_content_id UUID NOT NULL REFERENCES cms_page_content(id) ON DELETE CASCADE, content_value JSONB NOT NULL, revision_number INTEGER NOT NULL, changed_by UUID REFERENCES admin_users(id) ON DELETE SET NULL, change_note TEXT, created_at TIMESTAMPTZ DEFAULT NOW());`);
        for (const [slug, name, url, description] of pageDefaults)await db.query(`INSERT INTO cms_pages (page_slug,page_name,page_url,description) VALUES ($1,$2,$3,$4) ON CONFLICT (page_slug) DO NOTHING`, [
            slug,
            name,
            url,
            description
        ]);
        for (const [slug, entries] of Object.entries(contentDefaults)){
            const page = await db.query('SELECT id FROM cms_pages WHERE page_slug=$1', [
                slug
            ]);
            for (const [section, key, type, label, value] of entries)await db.query(`INSERT INTO cms_page_content (page_id,section_key,content_key,content_type,label,draft_value,published_value) VALUES ($1,$2,$3,$4,$5,$6::jsonb,$6::jsonb) ON CONFLICT (page_id,content_key) DO NOTHING`, [
                page.rows[0].id,
                section,
                key,
                type,
                label,
                JSON.stringify({
                    value
                })
            ]);
        }
    })();
    return ready;
}
async function cmsPage(slug, draft = false) {
    await ensureVisualCms();
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const page = await db.query('SELECT * FROM cms_pages WHERE page_slug=$1 AND is_active=TRUE', [
        slug
    ]);
    if (!page.rowCount) return null;
    const rows = await db.query(`SELECT id,section_key,content_key,content_type,label,${draft ? 'draft_value' : 'published_value'} AS value,updated_at FROM cms_page_content WHERE page_id=$1 AND is_editable=TRUE ORDER BY sort_order,id`, [
        page.rows[0].id
    ]);
    return {
        ...page.rows[0],
        content: rows.rows
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0uphfxobbg3g8._.js.map