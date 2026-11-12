import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";

const displayValue = (value) => value === null || value === undefined ? "—" : typeof value === "object" ? JSON.stringify(value) : String(value);
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

export default function SiteContentPage({ title, endpoint, description }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editor, setEditor] = useState(null);
  const [formData, setFormData] = useState({});
  const isCollection = Array.isArray(data);
  const rows = isCollection ? data : data === null ? [] : [data];
  const columns = useMemo(() => {
    const keys = new Set();
    rows.slice(0, 20).forEach((row) => row && typeof row === "object" && !Array.isArray(row) && Object.keys(row).forEach((key) => keys.add(key)));
    return [...keys].slice(0, 7);
  }, [rows]);
  const fields = useMemo(() => fieldsFor(formData), [formData]);

  const loadContent = async () => {
    setIsLoading(true); setError("");
    try {
      const response = await fetch(endpoint); const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Could not load this content.");
      setData(payload.data);
    } catch (loadError) { setError(loadError.message); } finally { setIsLoading(false); }
  };
  useEffect(() => { loadContent(); }, [endpoint]);

  const persist = async (nextData, message) => {
    setIsSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch(endpoint, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: nextData }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Could not save this content.");
      setData(payload.data); setEditor(null); setNotice(message);
    } catch (saveError) { setError(saveError.message); } finally { setIsSaving(false); }
  };

  const openCreate = () => { setFormData(rows[0] ? emptyRecord(rows[0]) : {}); setEditor({ mode: "create" }); };
  const openEdit = (record, index) => { setFormData(copy(record)); setEditor({ mode: "edit", index }); };
  const saveEditor = () => {
    if (!isCollection) { persist(formData, "Saved to PostgreSQL."); return; }
    const nextData = editor.mode === "create" ? [...data, formData] : data.map((record, index) => index === editor.index ? formData : record);
    persist(nextData, editor.mode === "create" ? "Record created." : "Record updated.");
  };
  const deleteRecord = (index) => { if (window.confirm("Delete this record? This cannot be undone.")) persist(data.filter((_, recordIndex) => recordIndex !== index), "Record deleted."); };
  const updateValue = (field, value) => setFormData((current) => setField(current, field.path, value));

  return <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-4 py-5 sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-[1600px]">
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff7a00]">Website content</p><h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">{description}</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={loadContent} disabled={isLoading || isSaving} className="inline-flex h-10 items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 text-sm font-bold text-[#d96600] hover:bg-orange-50 disabled:opacity-60"><RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />Refresh</button>{isCollection && <button type="button" onClick={openCreate} disabled={isLoading || isSaving} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#d96600] disabled:opacity-60"><Plus size={16} />Add record</button>}{!isCollection && data !== null && <button type="button" onClick={() => openEdit(data, 0)} disabled={isLoading || isSaving} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#d96600] disabled:opacity-60"><Pencil size={16} />Edit</button>}</div></header>
    {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>}{notice && <p role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{notice}</p>}
    {isLoading ? <p className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">Loading records…</p> : <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.06)]"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><p className="text-sm font-bold text-slate-800">{rows.length} record{rows.length === 1 ? "" : "s"}</p><p className="text-xs text-slate-500">Stored in PostgreSQL</p></div><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-bold">{column}</th>)}<th className="px-4 py-3 text-right font-bold">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((record, index) => <tr key={recordKey(record, index)} className="hover:bg-slate-50/70">{columns.map((column) => <td key={column} className="max-w-[300px] truncate px-4 py-3 text-slate-700" title={displayValue(record?.[column])}>{displayValue(record?.[column])}</td>)}<td className="whitespace-nowrap px-4 py-3 text-right"><button type="button" onClick={() => openEdit(record, index)} className="mr-2 inline-flex rounded-lg p-2 text-slate-600 hover:bg-orange-50 hover:text-[#d96600]" aria-label="Edit record"><Pencil size={16} /></button>{isCollection && <button type="button" onClick={() => deleteRecord(index)} className="inline-flex rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-600" aria-label="Delete record"><Trash2 size={16} /></button>}</td></tr>)}{!rows.length && <tr><td colSpan={Math.max(columns.length + 1, 1)} className="px-4 py-10 text-center text-slate-500">No records yet. Use Add record to create one.</td></tr>}</tbody></table></div></section>}
  </div>{editor && <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-4"><div className="mx-auto my-8 w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl" role="dialog" aria-modal="true"><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-black text-slate-950">{editor.mode === "create" ? "Add" : "Edit"} {title}</h2><p className="mt-1 text-sm text-slate-500">Update the fields, then save to PostgreSQL.</p></div><button type="button" onClick={() => setEditor(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close editor"><X size={18} /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2">{fields.map((field) => { const label = field.path.join(" · "); const isLongText = field.type === "string" && /description|review|message|address/i.test(label); if (field.type === "boolean") return <label key={label} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700"><input type="checkbox" checked={Boolean(field.value)} onChange={(event) => updateValue(field, event.target.checked)} />{label}</label>; if (field.type === "array") return <label key={label} className="sm:col-span-2"><span className="mb-1 block text-sm font-bold text-slate-700">{label}</span><input value={field.value.join(", ")} onChange={(event) => updateValue(field, event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} placeholder="Comma-separated values" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>; return <label key={label} className={isLongText ? "sm:col-span-2" : ""}><span className="mb-1 block text-sm font-bold text-slate-700">{label}</span>{isLongText ? <textarea value={field.value ?? ""} onChange={(event) => updateValue(field, event.target.value)} className="min-h-28 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /> : <input type={field.type === "number" ? "number" : "text"} value={field.value ?? ""} onChange={(event) => updateValue(field, field.type === "number" ? Number(event.target.value) : event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />}</label>; })}</div>{!fields.length && <p className="mt-5 text-sm text-slate-500">There are no fields yet. Add a first record through the database or an existing module template.</p>}<div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setEditor(null)} className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button><button type="button" onClick={saveEditor} disabled={isSaving || !fields.length} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white hover:bg-[#d96600] disabled:opacity-60"><Save size={16} />{isSaving ? "Saving…" : "Save"}</button></div></div></div>}</main>;
}
