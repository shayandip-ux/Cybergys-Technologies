import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Plus, RefreshCw, Save, Search, Trash2, X } from "lucide-react";
import { getApi, mediaUrl, sendApi } from "../../../lib/api.js";

const displayValue = (value) => value === null || value === undefined ? "—" : typeof value === "object" ? JSON.stringify(value) : String(value);
const displayColumnName = (column) => String(column).replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
const recordKey = (record, index) => record && typeof record === "object" ? record.id ?? record.slug ?? record.name ?? index : index;
const copy = (value) => JSON.parse(JSON.stringify(value));

function emptyRecord(value) {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, emptyRecord(item)]));
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return "";
}

function fieldsFor(value, path = []) {
  if (Array.isArray(value)) return [{ path, value, type: "array" }];
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => fieldsFor(item, [...path, key]));
  return [{ path, value, type: typeof value }];
}

function setField(record, path, value) {
  const next = copy(record);
  let target = next;
  path.slice(0, -1).forEach((key) => { target = target[key]; });
  target[path[path.length - 1]] = value;
  return next;
}

function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const upload = async (event) => {
    const file = event.target.files?.[0]; if (!file) return;
    setUploading(true); setError("");
    try {
      const form = new FormData(); form.append("file", file); form.append("altText", label);
      const response = await fetch("/api/admin/media", { method: "POST", body: form }); const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Upload failed.");
      onChange(payload.data.url);
    } catch (uploadError) { setError(uploadError.message); } finally { setUploading(false); event.target.value = ""; }
  };
  return <div className="sm:col-span-2 rounded-xl border border-slate-200 p-3"><div className="flex flex-col gap-3 sm:flex-row"><div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 sm:w-44">{value ? <img src={mediaUrl(value)} alt={`${label} preview`} className="h-full w-full object-cover"/> : <span className="text-xs text-slate-400">No image selected</span>}</div><div className="min-w-0 flex-1"><span className="mb-1 block text-sm font-bold text-slate-700">{label}</span><input value={value ?? ""} onChange={(event) => onChange(event.target.value)} placeholder="Paste an image URL" className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"/><label className="mt-2 inline-flex cursor-pointer items-center rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-[#d96600]"><input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={upload} className="sr-only"/>{uploading ? "Uploading…" : "Upload image"}</label><p className="mt-1 text-xs text-slate-400">JPG, PNG, WebP, AVIF, or GIF · maximum 5 MB</p>{error && <p className="mt-1 text-xs text-red-600">{error}</p>}</div></div></div>;
}

export default function SiteContentPage({ title, endpoint, description }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editor, setEditor] = useState(null);
  const [formData, setFormData] = useState({});
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: "", direction: "asc" });
  const [pageSize, setPageSize] = useState(10);
  const isCollection = Array.isArray(data);
  const rows = useMemo(() => isCollection ? data : data === null ? [] : [data], [data, isCollection]);
  const columns = useMemo(() => {
    const keys = new Set();
    rows.slice(0, 20).forEach((row) => row && typeof row === "object" && !Array.isArray(row) && Object.keys(row).forEach((key) => keys.add(key)));
    return [...keys].slice(0, 7);
  }, [rows]);
  const fields = useMemo(() => fieldsFor(formData), [formData]);
  const filteredRows = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase())).sort((a, b) => {
    if (!sort.key) return 0;
    return String(a?.[sort.key] ?? "").localeCompare(String(b?.[sort.key] ?? ""), undefined, { numeric: true }) * (sort.direction === "asc" ? 1 : -1);
  }), [rows, query, sort]);
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const visibleRows = filteredRows.slice((Math.min(page, totalPages) - 1) * pageSize, Math.min(page, totalPages) * pageSize);

  const loadContent = useCallback(async () => {
    setIsLoading(true); setError("");
    try {
      setData(await getApi(endpoint));
    } catch (loadError) { setError(loadError.message); } finally { setIsLoading(false); }
  }, [endpoint]);
  useEffect(() => {
    const timer = window.setTimeout(() => { loadContent(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadContent]);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const persist = async (path, method, body, message) => {
    setIsSaving(true); setError(""); setNotice("");
    try {
      await sendApi(path, method, body);
      await loadContent(); setEditor(null); setNotice(message);
    } catch (saveError) { setError(saveError.message); } finally { setIsSaving(false); }
  };

  const openCreate = () => { setFormData(rows[0] ? emptyRecord(rows[0]) : { title: "", slug: "", status: "draft", active: true, display_order: rows.length + 1 }); setEditor({ mode: "create" }); };
  const openEdit = (record, index) => { setFormData(copy(record)); setEditor({ mode: "edit", index, record }); };
  const saveEditor = () => {
    if (!isCollection) { persist(endpoint, "PUT", { data: formData }, "Saved to PostgreSQL."); return; }
    persist(editor.mode === "create" ? endpoint : `${endpoint}/${editor.record.id}`, editor.mode === "create" ? "POST" : "PATCH", formData, editor.mode === "create" ? "Record created." : "Record updated.");
  };
  const deleteRecord = (record) => { if (window.confirm("Delete this record? This cannot be undone.")) persist(`${endpoint}/${record.id}`, "DELETE", undefined, "Record deleted."); };
  const updateValue = (field, value) => setFormData((current) => setField(current, field.path, value));

  return <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-4 py-5 sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-[1600px]">
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff7a00]">Content management</p><h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">{description}</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={loadContent} disabled={isLoading || isSaving} className="inline-flex h-10 items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 text-sm font-bold text-[#d96600] hover:bg-orange-50 disabled:opacity-60"><RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />Refresh</button>{isCollection && <button type="button" onClick={openCreate} disabled={isLoading || isSaving} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#d96600] disabled:opacity-60"><Plus size={16} />Add new</button>}{!isCollection && data !== null && <button type="button" onClick={() => openEdit(data, 0)} disabled={isLoading || isSaving} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#d96600] disabled:opacity-60"><Pencil size={16} />Edit</button>}</div></header>
    {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>}{notice && <p role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{notice}</p>}
    {isLoading ? <p className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">Loading records…</p> : <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.06)]"><div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-bold text-slate-800">{filteredRows.length} of {rows.length} records</p><label className="relative block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search records" className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-orange-400 sm:w-64"/></label></div><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-bold"><button type="button" onClick={() => setSort((current) => ({ key: column, direction: current.key === column && current.direction === "asc" ? "desc" : "asc" }))}>{displayColumnName(column)}{sort.key === column ? (sort.direction === "asc" ? " ↑" : " ↓") : ""}</button></th>)}<th className="sticky right-0 z-10 border-l border-slate-200 bg-slate-50 px-4 py-3 text-right font-bold shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.4)]">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{visibleRows.map((record) => <tr key={recordKey(record, rows.indexOf(record))} className="hover:bg-slate-50/70">{columns.map((column) => <td key={column} className="max-w-[300px] truncate px-4 py-3 text-slate-700" title={displayValue(record?.[column])}>{displayValue(record?.[column])}</td>)}<td className="sticky right-0 z-10 whitespace-nowrap border-l border-slate-100 bg-white px-4 py-3 text-right shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.4)]"><button type="button" onClick={() => openEdit(record, rows.indexOf(record))} className="mr-2 inline-flex rounded-lg p-2 text-slate-600 hover:bg-orange-50 hover:text-[#d96600]" aria-label="Edit record"><Pencil size={16} /></button>{isCollection && <button type="button" onClick={() => deleteRecord(record)} className="inline-flex rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-600" aria-label="Delete record"><Trash2 size={16} /></button>}</td></tr>)}{!visibleRows.length && <tr><td colSpan={Math.max(columns.length + 1, 1)} className="px-4 py-10 text-center text-slate-500">No records match this search.</td></tr>}</tbody></table></div><footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-sm text-slate-500"><label>Rows <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="ml-1 rounded border border-slate-200 p-1"><option>10</option><option>25</option><option>50</option></select></label><div className="flex items-center gap-2"><span>Page {Math.min(page, totalPages)} of {totalPages}</span><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded p-1 disabled:opacity-40"><ChevronLeft size={18}/></button><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page >= totalPages} className="rounded p-1 disabled:opacity-40"><ChevronRight size={18}/></button></div></footer></section>}
  </div>{editor && <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-4"><div className="mx-auto my-8 w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl" role="dialog" aria-modal="true"><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-black text-slate-950">{editor.mode === "create" ? "Add" : "Edit"} {title}</h2><p className="mt-1 text-sm text-slate-500">Update the fields, then save to PostgreSQL.</p></div><button type="button" onClick={() => setEditor(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close editor"><X size={18} /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2">{fields.map((field) => { const label = field.path.join(" · "); const isImage = /(^| · )(desktop_image|mobile_image|featured_image|banner_image|profile_image|logo)$/i.test(label); const isLongText = field.type === "string" && /description|review|message|address/i.test(label); if (isImage) return <ImageField key={label} label={label.replaceAll("_", " ")} value={field.value} onChange={(value) => updateValue(field, value)}/>; if (field.type === "boolean") return <label key={label} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700"><input type="checkbox" checked={Boolean(field.value)} onChange={(event) => updateValue(field, event.target.checked)} />{label}</label>; if (field.type === "array") return <label key={label} className="sm:col-span-2"><span className="mb-1 block text-sm font-bold text-slate-700">{label}</span><input value={field.value.join(", ")} onChange={(event) => updateValue(field, event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} placeholder="Comma-separated values" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>; return <label key={label} className={isLongText ? "sm:col-span-2" : ""}><span className="mb-1 block text-sm font-bold text-slate-700">{label}</span>{isLongText ? <textarea value={field.value ?? ""} onChange={(event) => updateValue(field, event.target.value)} className="min-h-28 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /> : <input type={field.type === "number" ? "number" : "text"} value={field.value ?? ""} onChange={(event) => updateValue(field, field.type === "number" ? Number(event.target.value) : event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />}</label>; })}</div>{!fields.length && <p className="mt-5 text-sm text-slate-500">There are no fields yet. Add a first record through the database or an existing module template.</p>}<div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setEditor(null)} className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button><button type="button" onClick={saveEditor} disabled={isSaving || !fields.length} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white hover:bg-[#d96600] disabled:opacity-60"><Save size={16} />{isSaving ? "Saving…" : "Save"}</button></div></div></div>}</main>;
}
