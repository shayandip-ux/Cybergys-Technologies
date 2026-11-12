module.exports=[54799,(e,r,t)=>{r.exports=e.x("crypto",()=>require("crypto"))},70406,(e,r,t)=>{r.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,r,t)=>{r.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,r,t)=>{r.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,r,t)=>{r.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,r,t)=>{r.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,r,t)=>{r.exports=e.x("path",()=>require("path"))},92934,e=>e.a(async(r,t)=>{try{let i;var a=e.i(24858),n=r([a]);function s(){return i??=(0,a.f)().query(`
    CREATE TABLE IF NOT EXISTS app_content (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)}async function o(e,r){await s();let t=(0,a.f)(),n=await t.query("SELECT value FROM app_content WHERE key = $1",[e]);if(n.rowCount)return n.rows[0].value;let o=await t.query(`INSERT INTO app_content (key, value)
     VALUES ($1, $2::jsonb)
     ON CONFLICT (key) DO NOTHING
     RETURNING value`,[e,JSON.stringify(r)]);return o.rowCount?o.rows[0].value:(await t.query("SELECT value FROM app_content WHERE key = $1",[e])).rows[0].value}async function p(e,r){return await s(),(await (0,a.f)().query(`INSERT INTO app_content (key, value, updated_at)
     VALUES ($1, $2::jsonb, NOW())
     ON CONFLICT (key)
     DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
     RETURNING value, updated_at`,[e,JSON.stringify(r)])).rows[0]}[a]=n.then?(await n)():n,e.s(["k",0,o,"i",0,p]),t()}catch(e){t(e)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__1hmonhs2dnm5a._.js.map