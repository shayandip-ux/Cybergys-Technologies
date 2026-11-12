import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Globe2, MapPin, Pencil, Plus, Search, ToggleLeft, ToggleRight, Trash2, X } from "lucide-react";

const STORAGE_KEY = "bestpicks-admin-regions";
const starterRegions = [
  { id: "US", region: "United States", code: "US", currency: "USD · $", language: "English (US)", timezone: "America/New_York", status: "Enabled" },
  { id: "GB", region: "United Kingdom", code: "GB", currency: "GBP · £", language: "English (UK)", timezone: "Europe/London", status: "Enabled" },
  { id: "AU", region: "Australia", code: "AU", currency: "AUD · $", language: "English (AU)", timezone: "Australia/Sydney", status: "Enabled" },
  { id: "CA", region: "Canada", code: "CA", currency: "CAD · $", language: "English (CA)", timezone: "America/Toronto", status: "Coming soon" },
];

function readRegions() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value) ? value : starterRegions;
  } catch {
    return starterRegions;
  }
}

function Badge({ status }) {
  const classes = status === "Enabled" ? "bg-emerald-50 text-emerald-700" : status === "Coming soon" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600";
  return <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${classes}`}>{status}</span>;
}

function RegionModal({ region, onClose, onSave, regions }) {
  const [form, setForm] = useState(region || { region: "", code: "", currency: "", language: "", timezone: "", status: "Enabled" });
  const [error, setError] = useState("");
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    const code = form.code.trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(code)) return setError("Enter a 2-letter region code, such as US or GB.");
    if (regions.some((item) => item.code === code && item.id !== region?.id)) return setError("That region code is already in use.");
    onSave({ ...form, id: region?.id || code, code, region: form.region.trim(), currency: form.currency.trim(), language: form.language.trim(), timezone: form.timezone.trim() });
  };
  const fields = [["region", "Region name", "United States"], ["code", "Region code", "US"], ["currency", "Currency", "USD · $"], ["language", "Language / locale", "English (US)"], ["timezone", "Time zone", "America/New_York"]];
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071322]/50 p-3 backdrop-blur-sm" onMouseDown={onClose}>
    <form role="dialog" aria-modal="true" aria-labelledby="region-modal-title" onSubmit={submit} onMouseDown={(event) => event.stopPropagation()} className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
      <div className="flex items-start justify-between gap-4"><div><h2 id="region-modal-title" className="text-xl font-extrabold text-slate-950">{region ? "Edit region" : "Add region"}</h2><p className="mt-1 text-sm text-slate-500">Set the locale details used across your site.</p></div><button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{fields.map(([key, label, placeholder]) => <label key={key} className={`text-sm font-semibold text-slate-700 ${key === "region" || key === "timezone" ? "sm:col-span-2" : ""}`}>{label}<input required maxLength={key === "code" ? 2 : 100} value={form[key]} onChange={(event) => set(key, key === "code" ? event.target.value.toUpperCase() : event.target.value)} placeholder={placeholder} className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100" /></label>)}
        <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Availability<select value={form.status} onChange={(event) => set("status", event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-[#ff7a00]"><option>Enabled</option><option>Coming soon</option><option>Disabled</option></select></label>
      </div>
      {error && <p role="alert" className="mt-3 rounded-lg bg-orange-50 px-3 py-2 text-sm text-orange-700">{error}</p>}
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700">Cancel</button><button type="submit" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-4 text-sm font-bold text-white hover:bg-[#d96600]"><Check size={16} />{region ? "Save changes" : "Add region"}</button></div>
    </form>
  </div>;
}

export default function RegionsPage() {
  const [regions, setRegions] = useState(readRegions);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All regions");
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [notice, setNotice] = useState("");

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(regions)); } catch { setNotice("Could not save in this browser. Changes will last for this session."); } }, [regions]);

  const filtered = useMemo(() => regions.filter((item) => {
    const term = query.trim().toLowerCase();
    return (!term || `${item.region} ${item.code} ${item.currency} ${item.language} ${item.timezone}`.toLowerCase().includes(term)) && (filter === "All regions" || item.status === filter);
  }), [regions, query, filter]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const enabledCount = regions.filter((item) => item.status === "Enabled").length;
  const currencyCount = new Set(regions.map((item) => item.currency.split("·")[0].trim()).filter(Boolean)).size;
  const saveRegion = (value) => { setRegions((current) => modal?.id ? current.map((item) => item.id === modal.id ? value : item) : [value, ...current]); setModal(null); setPage(1); setNotice("Region settings saved in this browser."); };
  const toggleRegion = (item) => { setRegions((current) => current.map((region) => region.id === item.id ? { ...region, status: region.status === "Enabled" ? "Disabled" : "Enabled" } : region)); setNotice(`${item.region} ${item.status === "Enabled" ? "disabled" : "enabled"}.`); };

  return <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-4 py-6 sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-[1600px]">
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00]"><Globe2 size={26} /></span><div><h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Regions</h1><p className="mt-1 max-w-3xl text-sm text-slate-500 sm:text-base">Choose the countries and locales where your website and offers are available.</p></div></div><button type="button" onClick={() => setModal({})} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#d96600]"><Plus size={17} />Add region</button></header>
    <section className="mb-5 grid grid-cols-3 gap-2 sm:gap-3" aria-label="Region settings summary">{[[enabledCount, "Enabled regions"], [regions.length, "Total regions"], [currencyCount, "Currencies"]].map(([value, label]) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.05)]"><p className="text-2xl font-extrabold text-slate-950">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></article>)}</section>
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_5px_22px_rgba(15,23,42,0.07)] sm:p-6" aria-label="Regional availability"><div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><div><h2 className="text-lg font-extrabold text-slate-950">Regional availability</h2><p className="mt-1 text-sm text-slate-500">A region controls the locale, currency, and time zone used for local experiences.</p></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative min-w-0 sm:w-64"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search regions" aria-label="Search regions" className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-[#ff7a00]"/></label><label className="relative"><span className="sr-only">Filter by availability</span><select value={filter} onChange={(event) => { setFilter(event.target.value); setPage(1); }} className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-700 sm:w-44"><option>All regions</option><option>Enabled</option><option>Coming soon</option><option>Disabled</option></select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-3 text-slate-500"/></label></div></div>
      {notice && <div role="status" className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-sm text-orange-800"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15}/></button></div>}
      {visible.length ? <div className="divide-y divide-slate-100">{visible.map((item) => <article key={item.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff7a00]"><MapPin size={20}/></span><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-slate-900">{item.region} <span className="ml-1 text-xs font-medium text-slate-400">{item.code}</span></h3><p className="mt-1 text-xs text-slate-500">{item.language} · {item.currency}</p><p className="mt-1 break-all text-[11px] text-slate-400">{item.timezone}</p></div><Badge status={item.status}/><div className="flex items-center justify-end gap-1 border-t border-slate-100 pt-2 sm:border-0 sm:pt-0"><button type="button" onClick={() => toggleRegion(item)} disabled={item.status === "Coming soon"} title={item.status === "Enabled" ? "Disable region" : "Enable region"} aria-label={`${item.status === "Enabled" ? "Disable" : "Enable"} ${item.region}`} className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00] disabled:cursor-not-allowed disabled:opacity-40">{item.status === "Enabled" ? <ToggleRight size={18}/> : <ToggleLeft size={18}/>}</button><button type="button" onClick={() => setModal(item)} aria-label={`Edit ${item.region}`} title="Edit region" className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"><Pencil size={16}/></button><button type="button" onClick={() => setDeleteTarget(item)} aria-label={`Delete ${item.region}`} title="Delete region" className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"><Trash2 size={16}/></button></div></article>)}</div> : <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">No regions match your search or filter.</div>}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-slate-500">Showing <strong className="text-slate-800">{filtered.length ? (safePage - 1) * pageSize + 1 : 0}–{Math.min(safePage * pageSize, filtered.length)}</strong> of <strong className="text-slate-800">{filtered.length}</strong></p><div className="flex items-center gap-2"><label className="sr-only" htmlFor="region-page-size">Regions per page</label><select id="region-page-size" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm"><option value={6}>6 / page</option><option value={12}>12 / page</option><option value={24}>24 / page</option></select><button type="button" aria-label="Previous page" disabled={safePage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 disabled:opacity-40"><ChevronLeft size={17}/></button><span className="text-sm text-slate-600">{safePage} / {pageCount}</span><button type="button" aria-label="Next page" disabled={safePage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 disabled:opacity-40"><ChevronRight size={17}/></button></div></div>
    </section>
    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.05)] sm:p-5"><h2 className="font-bold text-slate-900">What region settings affect</h2><p className="mt-1 text-sm leading-6 text-slate-500">Regional settings help keep prices, content formats, and availability consistent for visitors.</p><ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">{[["Currency", "Display prices and amounts in the selected local currency."], ["Language", "Choose the language and locale format for content."], ["Availability", "Control which offers are available in each region."]].map(([title, description]) => <li key={title} className="rounded-xl bg-slate-50 p-3"><strong className="block text-slate-800">{title}</strong><span className="mt-1 block text-xs leading-5">{description}</span></li>)}</ul></section>
    </div>
    {modal && <RegionModal region={modal.id ? modal : null} regions={regions} onClose={() => setModal(null)} onSave={saveRegion}/>}
    {deleteTarget && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071322]/50 p-4" onMouseDown={() => setDeleteTarget(null)}><section role="dialog" aria-modal="true" aria-labelledby="delete-region-title" onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"><h2 id="delete-region-title" className="text-lg font-bold text-slate-950">Remove region?</h2><p className="mt-2 text-sm text-slate-600">Remove <strong>{deleteTarget.region}</strong> from this browser&apos;s region settings?</p><div className="mt-5 flex justify-end gap-2"><button onClick={() => setDeleteTarget(null)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold">Cancel</button><button onClick={() => { setRegions((current) => current.filter((item) => item.id !== deleteTarget.id)); setDeleteTarget(null); setNotice("Region removed."); }} className="h-10 rounded-lg bg-[#ff7a00] px-4 text-sm font-bold text-white">Remove</button></div></section></div>}
  </main>;
}
