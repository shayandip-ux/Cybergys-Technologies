import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowUp, Check, ChevronDown, CircleHelp, Eye, EyeOff,
  FileText, House, LayoutGrid, Pencil, Plus, RotateCcw, Save, Sparkles,
  X,
} from "lucide-react";

const STORAGE_KEY = "bestpicks-admin-homepage-v1";

const initialPage = {
  headline: "Your Life, Covered. Your Money, Sorted.",
  intro: "Compare trusted providers to find the best picks for insurance, finance, and more.",
  sections: [
    { id: "hero", title: "Hero banner", description: "Main headline and supporting message that introduce the site.", detail: "Your Life, Covered. Your Money, Sorted.", visible: true },
    { id: "categories", title: "Popular categories", description: "Twelve quick links to the products visitors can compare.", detail: "Home, auto, medical alert, security, life, mortgage, renters, debt, personal loans, pet, credit cards, travel.", visible: true },
    { id: "how-it-works", title: "How it works", description: "A simple three-step explanation of the comparison process.", detail: "Pick what you need · Compare personalised offers · Choose the best fit", visible: true },
    { id: "home-insurance", title: "Home insurance guides", description: "Helpful articles for choosing and managing home cover.", detail: "5 Ways to Lower Your Home Insurance Premium · What Does Homeowners Insurance Actually Cover? · When Should You Update Your Home Insurance Policy?", visible: true },
    { id: "auto-insurance", title: "Auto insurance guides", description: "Articles about premiums, cover and choosing an auto policy.", detail: "How Your Driving Record Affects Your Premium · Full Coverage vs. Liability: What’s Right for You? · 5 Common Car Insurance Discounts You Might Be Missing", visible: true },
    { id: "mortgages", title: "Mortgage guides", description: "Guidance on rates, lenders and mortgage approval.", detail: "How to Choose the Best Mortgage Lender · Fixed vs. Adjustable Rate Mortgages · What Affects Your Mortgage Approval?", visible: true },
    { id: "credit-cards", title: "Credit card guides", description: "Articles that help visitors compare cards and build credit.", detail: "How to Pick the Right Credit Card · Building Credit With Your First Card · Balance Transfer Cards: Are They Worth It?", visible: true },
    { id: "personal-loans", title: "Personal loan guides", description: "Practical information for comparing personal loan options.", detail: "How to Apply for a Personal Loan · Personal Loan Requirements · How to Pay Off a Personal Loan Faster", visible: true },
    { id: "debt", title: "Debt consolidation guides", description: "Explain debt consolidation and ways to manage balances.", detail: "How Debt Consolidation Works · Debt Consolidation vs. Debt Settlement · Is Debt Consolidation Right for You?", visible: true },
    { id: "faq", title: "Frequently asked questions", description: "Answers to common questions about BestPicksFor.com.", detail: "What is BestPicksFor.com? · How can it help me? · Is it free to use? · How do I get started? · How do I compare providers? · How does it make money?", visible: true },
    { id: "footer", title: "Site footer", description: "Brand, disclosures, social links and policy links.", detail: "About us · Privacy policy · Partner with us · Advertising Policy · California consumers privacy · Do not sell my information", visible: true },
  ],
  checklist: [false, false, false, false],
  published: false,
};

function loadPage() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (!stored || !Array.isArray(stored.sections)) return initialPage;
    return { ...initialPage, ...stored, sections: stored.sections.map((item) => ({ ...item, visible: item.visible !== false })) };
  } catch { return initialPage; }
}

const moveItem = (items, from, to) => {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
};

function StatusPill({ published }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}><span className={`h-1.5 w-1.5 rounded-full ${published ? "bg-emerald-500" : "bg-amber-500"}`} />{published ? "Published" : "Draft"}</span>;
}

export default function HomePageConfigPage() {
  const [page, setPage] = useState(loadPage);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(loadPage()));
  const [editing, setEditing] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const dirty = JSON.stringify(page) !== savedSnapshot;
  const visibleCount = useMemo(() => page.sections.filter((section) => section.visible).length, [page.sections]);

  useEffect(() => {
    if (!editing) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setEditing(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editing]);

  const updateSection = (id, values) => setPage((current) => ({ ...current, sections: current.sections.map((item) => item.id === id ? { ...item, ...values } : item) }));
  const save = (publish = false) => {
    setError("");
    if (!page.headline.trim() || !page.intro.trim()) { setError("Add a homepage headline and supporting text before saving."); return; }
    const next = { ...page, published: publish ? true : page.published };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setPage(next);
      setSavedSnapshot(JSON.stringify(next));
      setNotice(publish ? "Homepage settings marked as published in this browser." : "Homepage changes saved in this browser.");
      window.setTimeout(() => setNotice(""), 3500);
    } catch { setError("Browser storage is unavailable. Check your browser settings and try again."); }
  };
  const reset = () => {
    setPage(initialPage);
    setSavedSnapshot(JSON.stringify(initialPage));
    window.localStorage.removeItem(STORAGE_KEY);
    setNotice("Homepage settings reset to the sample content.");
    window.setTimeout(() => setNotice(""), 3000);
  };

  const iconFor = (id) => id === "hero" ? Sparkles : id === "categories" ? LayoutGrid : id === "faq" ? CircleHelp : id === "footer" ? House : FileText;
  const checklistLabels = ["Review headline and supporting message", "Confirm category links and destinations", "Check article groups and FAQ content", "Preview desktop and mobile layouts"];

  return <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-3 py-5 sm:px-5 lg:px-8"><div className="mx-auto w-full max-w-[1600px]">
    <header className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start gap-3 sm:gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00] sm:h-14 sm:w-14"><House size={25}/></span><div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ff7a00] sm:text-xs">Configuration · Public website</p><h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">Home Page</h1><p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">Manage the sections visitors see, from the crimson hero banner through the guides, FAQ and footer.</p></div></div>
      <div className="flex flex-wrap gap-2 sm:justify-end"><button type="button" onClick={() => setPreviewOpen((value) => !value)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"><Eye size={16}/>{previewOpen ? "Hide preview" : "Preview"}</button><button type="button" onClick={reset} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"><RotateCcw size={15}/>Reset</button><button type="button" onClick={() => save(false)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-orange-200 bg-white px-3 text-sm font-bold text-[#d96600] shadow-sm hover:bg-orange-50"><Save size={16}/>Save draft</button><button type="button" onClick={() => save(true)} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-[0_5px_14px_rgba(217,4,50,0.2)] hover:bg-[#d96600]"><Check size={16}/>Publish</button></div>
    </header>

    <div className="mb-5 flex flex-col gap-2 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-900 sm:flex-row sm:items-center"><span className="w-fit rounded-full bg-white px-3 py-1 text-[10px] font-extrabold tracking-wide text-[#ff7a00]">ADMIN</span><p className="min-w-0 flex-1 text-xs leading-5 sm:text-sm">Changes save in this browser. Connect this screen to your CMS/API to publish updates to the live website.</p><span className="flex items-center gap-2 text-xs font-semibold sm:ml-auto sm:whitespace-nowrap"><StatusPill published={page.published}/>{dirty && <span className="text-amber-700">Unsaved changes</span>}</span></div>
    {(notice || error) && <div role={error ? "alert" : "status"} className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${error ? "border-orange-200 bg-orange-50 text-orange-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>{error || notice}<button type="button" aria-label="Dismiss message" onClick={() => { setError(""); setNotice(""); }} className="ml-auto rounded p-1 hover:bg-black/5"><X size={15}/></button></div>}

    {previewOpen && <section className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_22px_rgba(15,23,42,0.055)]"><div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 sm:px-5"><div><h2 className="text-sm font-extrabold text-slate-900">Homepage preview</h2><p className="mt-1 text-xs text-slate-500">Preview uses the section order and visibility shown below.</p></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">{visibleCount} visible sections</span></div><div className="p-3 sm:p-5"><div className="overflow-hidden rounded-2xl bg-[#c50d3d] text-center text-white"><div className="bg-[linear-gradient(155deg,#bd123f_0%,#bd123f_58%,#e43663_58%,#e43663_100%)] px-4 py-8 sm:px-8 sm:py-10"><p className="mx-auto max-w-3xl text-2xl font-black leading-tight sm:text-4xl">{page.headline}</p><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base">{page.intro}</p></div></div><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{page.sections.filter((item) => item.visible && item.id !== "hero").map((item, i) => <div key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#ff7a00]"><span className="text-xs font-black">{String(i + 1).padStart(2, "0")}</span></span><span className="min-w-0"><b className="block truncate text-xs text-slate-800">{item.title}</b><span className="block truncate text-[11px] text-slate-500">{item.description}</span></span></div>)}</div></div></section>}

    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.055)]"><div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div><div className="flex items-center gap-2"><LayoutGrid size={18} className="text-[#ff7a00]"/><h2 className="text-lg font-extrabold text-slate-950">Homepage content sections</h2></div><p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">Ordered to match the live page: hero, comparison categories, guides, FAQs and footer.</p></div><div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">{visibleCount} visible</span><span className="rounded-full bg-slate-100 px-2.5 py-1">{page.sections.length} total</span></div></div>
      <ol className="space-y-2 p-3 sm:p-5">{page.sections.map((section, index) => { const Icon = iconFor(section.id); return <li key={section.id} className={`rounded-xl border p-3 transition sm:p-4 ${section.visible ? "border-slate-200 bg-white" : "border-slate-200 bg-slate-50/80"}`}><div className="flex flex-wrap items-center gap-2.5 sm:gap-3"><span className="hidden shrink-0 text-slate-300 sm:block"><span className="flex h-8 w-5 items-center justify-center"><span className="text-xl leading-none">⋮⋮</span></span></span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff7a00]"><Icon size={18}/></span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-xs font-black text-[#ff7a00]">{String(index + 1).padStart(2, "0")}</span><div className="min-w-0 flex-1 basis-[180px]"><h3 className={`truncate text-sm font-bold ${section.visible ? "text-slate-900" : "text-slate-500"}`}>{section.title}</h3><p className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">{section.description}</p></div><StatusPill published={page.published && section.visible}/><div className="ml-auto flex items-center gap-0.5 sm:ml-0"><button type="button" aria-label={`Move ${section.title} up`} disabled={index === 0} onClick={() => setPage((current) => ({ ...current, sections: moveItem(current.sections, index, index - 1) }))} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"><ArrowUp size={16}/></button><button type="button" aria-label={`Move ${section.title} down`} disabled={index === page.sections.length - 1} onClick={() => setPage((current) => ({ ...current, sections: moveItem(current.sections, index, index + 1) }))} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"><ArrowDown size={16}/></button><button type="button" aria-label={`${section.visible ? "Hide" : "Show"} ${section.title}`} title={section.visible ? "Hide section" : "Show section"} onClick={() => updateSection(section.id, { visible: !section.visible })} className={`rounded-lg p-2 ${section.visible ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-100"}`}>{section.visible ? <Eye size={16}/> : <EyeOff size={16}/>}</button><button type="button" onClick={() => setEditing({ ...section, headline: page.headline, intro: page.intro })} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-xs font-bold text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-[#d96600]"><Pencil size={14}/><span className="hidden sm:inline">Edit</span></button></div></div><p className="mt-2 line-clamp-2 rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-5 text-slate-500 sm:ml-[76px]">{section.detail}</p></li>; })}</ol>
    </section>

    <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]"><section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_5px_22px_rgba(15,23,42,0.055)] sm:p-5"><div className="mb-4"><h2 className="text-lg font-extrabold text-slate-950">Publishing checklist</h2><p className="mt-1 text-xs text-slate-500 sm:text-sm">Track the final review before publishing homepage changes.</p></div><ul className="grid gap-2 sm:grid-cols-2">{checklistLabels.map((label, index) => <li key={label}><label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border p-3 text-xs leading-5 transition ${page.checklist[index] ? "border-emerald-100 bg-emerald-50/70 text-slate-700" : "border-slate-100 bg-slate-50 text-slate-600"}`}><input type="checkbox" checked={Boolean(page.checklist[index])} onChange={(event) => setPage((current) => ({ ...current, checklist: current.checklist.map((checked, i) => i === index ? event.target.checked : checked) }))} className="h-4 w-4 accent-[#ff7a00]"/>{label}</label></li>)}</ul></section><aside className="rounded-2xl border border-orange-100 bg-orange-50 p-4 sm:p-5"><h2 className="text-sm font-extrabold text-orange-950">About this editor</h2><p className="mt-2 text-xs leading-5 text-orange-900">The content here follows your public homepage layout. Save and Publish store these settings in this browser; your site needs a connected CMS/API before visitors can see these changes.</p><button type="button" onClick={() => save(false)} className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-white px-3 text-xs font-bold text-[#d96600] shadow-sm hover:bg-orange-100"><Save size={14}/>Save current changes</button></aside></div>
  </div>

  {editing && <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditing(null); }}><section role="dialog" aria-modal="true" aria-labelledby="edit-section-title" className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 shadow-2xl sm:max-w-xl sm:rounded-2xl sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ff7a00]">Edit homepage section</p><h2 id="edit-section-title" className="mt-1 text-xl font-black text-slate-950">{editing.title}</h2></div><button type="button" aria-label="Close editor" onClick={() => setEditing(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18}/></button></div><div className="mt-5 space-y-4"><label className="block text-sm font-semibold text-slate-700">Section title<input autoFocus value={editing.title} onChange={(event) => setEditing((current) => ({ ...current, title: event.target.value }))} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100"/></label><label className="block text-sm font-semibold text-slate-700">Description<textarea rows={3} value={editing.description} onChange={(event) => setEditing((current) => ({ ...current, description: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-normal leading-5 outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100"/></label>{editing.id === "hero" && <><label className="block text-sm font-semibold text-slate-700">Main headline<input value={editing.headline} onChange={(event) => setEditing((current) => ({ ...current, headline: event.target.value }))} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100"/></label><label className="block text-sm font-semibold text-slate-700">Supporting message<textarea rows={2} value={editing.intro} onChange={(event) => setEditing((current) => ({ ...current, intro: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-normal leading-5 outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100"/></label></>}<label className="block text-sm font-semibold text-slate-700">Content summary<textarea rows={4} value={editing.detail} onChange={(event) => setEditing((current) => ({ ...current, detail: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-normal leading-5 outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100"/><span className="mt-1 block text-xs font-normal text-slate-400">Use · between items to keep the summary easy to scan.</span></label><label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={editing.visible} onChange={(event) => setEditing((current) => ({ ...current, visible: event.target.checked }))} className="h-4 w-4 accent-[#ff7a00]"/>Show this section on the homepage</label></div><div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={() => setEditing(null)} className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button><button type="button" onClick={() => { if (!editing.title.trim()) { setError("Section title cannot be empty."); return; } if (editing.id === "hero" && (!editing.headline.trim() || !editing.intro.trim())) { setError("Add a homepage headline and supporting text before saving."); return; } if (editing.id === "hero") setPage((current) => ({ ...current, headline: editing.headline, intro: editing.intro })); updateSection(editing.id, { title: editing.title, description: editing.description, detail: editing.detail, visible: editing.visible }); setEditing(null); }} className="h-10 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white hover:bg-[#d96600]">Save section</button></div></section></div>}
  </main>;
}
