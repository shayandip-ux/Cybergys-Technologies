import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  FileText,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "bestpicks-admin-pages";
const statuses = ["Published", "Draft", "In review"];

const starterPages = [
  {
    id: "about-bestpicksfor",
    title: "About Cybergys",
    path: "/about",
    purpose: "Introduce the service and explain how comparisons work.",
    content:
      "Cybergys helps visitors compare trusted providers across insurance and finance. We make it easier to understand available options and find a choice that fits your needs.",
    status: "Published",
    updated: "2026-10-14",
  },
  {
    id: "contact-us",
    title: "Contact us",
    path: "/contact",
    purpose: "Show visitors how to get in touch with the team.",
    content:
      "Contact the Cybergys team for help with the site, provider information, or general questions. We aim to direct each request to the right person.",
    status: "Published",
    updated: "2026-10-11",
  },
  {
    id: "privacy-policy",
    title: "Privacy policy",
    path: "/privacy",
    purpose: "Explain what information is collected and how it is handled.",
    content:
      "This page explains the information collected when you use the service and how that information is handled. Update this sample with your approved privacy policy before publishing.",
    status: "Published",
    updated: "2026-10-05",
  },
  {
    id: "terms-of-use",
    title: "Terms of use",
    path: "/terms",
    purpose: "Describe the terms for using the website and its content.",
    content:
      "These terms describe the rules for using the Cybergys website and its content. Replace this sample with your approved terms before publishing.",
    status: "Draft",
    updated: "2026-10-02",
  },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadPages() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : starterPages;
  } catch {
    return starterPages;
  }
}

function formatDate(value) {
  if (!value) return "Not updated";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(date);
}

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-emerald-50 text-emerald-700",
    Draft: "bg-slate-100 text-slate-600",
    "In review": "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${
        styles[status] || styles.Draft
      }`}
    >
      {status}
    </span>
  );
}

function PageModal({ page, onClose, onSave }) {
  const [form, setForm] = useState(
    page ?? {
      title: "",
      path: "/new-page",
      purpose: "",
      content: "",
      status: "Draft",
      updated: today(),
    },
  );

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    let normalizedPath = form.path.trim().toLowerCase().replace(/\s+/g, "-");
    if (!normalizedPath.startsWith("/")) normalizedPath = `/${normalizedPath}`;
    normalizedPath = normalizedPath.replace(/\/{2,}/g, "/");

    onSave({
      ...form,
      title: form.title.trim(),
      path: normalizedPath || "/new-page",
      purpose: form.purpose.trim(),
      content: form.content.trim(),
      updated: today(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071322]/45 p-4 backdrop-blur-[2px]"
      onMouseDown={onClose}
    >
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="page-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="page-modal-title" className="text-lg font-extrabold text-slate-950">
              {page ? "Edit page" : "Create page"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage the evergreen information on your website.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Page title
            <input
              autoFocus
              required
              maxLength={100}
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#ff7a00]"
              placeholder="e.g. About Cybergys"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Page URL path
            <input
              required
              maxLength={100}
              value={form.path}
              onChange={(event) => update("path", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#ff7a00]"
              placeholder="/about"
            />
            <span className="mt-1 block text-xs font-normal text-slate-500">
              Enter a path such as <code>/about</code>. A leading slash is added automatically.
            </span>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Purpose / short description
            <textarea
              maxLength={220}
              value={form.purpose}
              onChange={(event) => update("purpose", event.target.value)}
              className="mt-1.5 min-h-20 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-[#ff7a00]"
              placeholder="Describe what this page is for."
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Page content
            <textarea
              value={form.content}
              onChange={(event) => update("content", event.target.value)}
              className="mt-1.5 min-h-40 w-full rounded-lg border border-slate-200 p-3 leading-6 outline-none focus:border-[#ff7a00]"
              placeholder="Write the page content here..."
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700 sm:max-w-xs">
            Status
            <select
              value={form.status}
              onChange={(event) => update("status", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-[#ff7a00]"
            >
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-4 text-sm font-bold text-white hover:bg-[#d96600]"
          >
            <Check size={15} />
            {page ? "Save changes" : "Create page"}
          </button>
        </div>
      </form>
    </div>
  );
}

function PreviewModal({ page, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071322]/45 p-4 backdrop-blur-[2px]"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="page-preview-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#ff7a00]">Page preview · {page.path}</p>
            <h2 id="page-preview-title" className="mt-2 text-2xl font-black text-slate-950">{page.title}</h2>
          </div>
          <button type="button" aria-label="Close preview" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <p className="mt-5 text-sm font-medium leading-6 text-slate-600">{page.purpose}</p>
        <div className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-700">
          {page.content || "No page content has been added yet."}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <StatusBadge status={page.status} />
          <span className="text-xs text-slate-400">Updated {formatDate(page.updated)}</span>
        </div>
      </section>
    </div>
  );
}

export default function PagesPage() {
  const [pages, setPages] = useState(loadPages);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [viewAll, setViewAll] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch {
      // Keep the current session usable when browser storage is unavailable.
    }
  }, [pages]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return pages.filter((page) => {
      const searchable = `${page.title} ${page.path} ${page.purpose} ${page.content}`.toLowerCase();
      const matchesStatus = statusFilter === "All statuses" || page.status === statusFilter;
      return searchable.includes(normalizedQuery) && matchesStatus;
    });
  }, [pages, query, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, pageCount);
  const visible = viewAll
    ? filtered
    : filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const start = filtered.length ? (safePage - 1) * pageSize + 1 : 0;
  const end = viewAll ? filtered.length : Math.min(safePage * pageSize, filtered.length);

  const changeFilter = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
    setViewAll(false);
  };

  const savePage = (value) => {
    if (editing?.id) {
      setPages((current) =>
        current.map((item) =>
          item.id === editing.id ? { ...value, id: editing.id } : item,
        ),
      );
    } else {
      setPages((current) => [
        { ...value, id: `page-${Date.now()}` },
        ...current,
      ]);
    }
    setEditing(null);
    setCurrentPage(1);
  };

  const togglePublish = (id) => {
    setPages((current) =>
      current.map((page) =>
        page.id === id
          ? { ...page, status: page.status === "Published" ? "Draft" : "Published" }
          : page,
      ),
    );
  };

  const copyPath = async (page) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(page.path);
      } else {
        const input = document.createElement("textarea");
        input.value = page.path;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("Copy failed");
      }
      setCopiedId(page.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setCopiedId(null);
    }
  };

  const renderActions = (page) => (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={() => setPreview(page)}
        aria-label={`Preview ${page.title}`}
        title="Preview page"
        className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
      >
        <Eye size={16} />
      </button>
      <button
        type="button"
        onClick={() => togglePublish(page.id)}
        aria-label={page.status === "Published" ? `Unpublish ${page.title}` : `Publish ${page.title}`}
        title={page.status === "Published" ? "Move to draft" : "Publish page"}
        className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
      >
        {page.status === "Published" ? <X size={16} /> : <Check size={16} />}
      </button>
      <button
        type="button"
        onClick={() => setEditing(page)}
        aria-label={`Edit ${page.title}`}
        title="Edit page"
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
      >
        <Pencil size={16} />
      </button>
      <button
        type="button"
        onClick={() => setDeleteTarget(page)}
        aria-label={`Delete ${page.title}`}
        title="Delete page"
        className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  return (
    <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-6 flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00]">
            <FileText size={26} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Pages</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500 sm:text-base">
              Manage the evergreen information pages that explain your service, policies, and how visitors can reach you.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-800 sm:flex-row sm:items-center">
          <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-[#ff7a00]">ADMIN</span>
          <p>Page changes are saved in this browser. Connect this page to your API to share updates with other admins.</p>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_5px_22px_rgba(15,23,42,0.07)] sm:p-6" aria-label="Website page directory">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">Website pages</h2>
              <p className="mt-1 text-sm text-slate-500">{filtered.length} {filtered.length === 1 ? "page" : "pages"} · Manage your evergreen information</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" aria-hidden="true" />
                <input
                  value={query}
                  onChange={changeFilter(setQuery)}
                  placeholder="Search pages"
                  aria-label="Search pages"
                  className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-[#ff7a00]"
                />
              </label>

              <select
                value={statusFilter}
                onChange={changeFilter(setStatusFilter)}
                aria-label="Filter pages by status"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#ff7a00]"
              >
                <option>All statuses</option>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>

              <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-white p-1" role="group" aria-label="Page view">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  aria-label="Grid view"
                  title="Grid view"
                  className={`flex h-8 w-9 items-center justify-center rounded-md transition ${viewMode === "grid" ? "bg-orange-50 text-[#ff7a00]" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  <LayoutGrid size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                  aria-label="List view"
                  title="List view"
                  className={`flex h-8 w-9 items-center justify-center rounded-md transition ${viewMode === "list" ? "bg-orange-50 text-[#ff7a00]" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  <List size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setEditing({})}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#d96600]"
              >
                <Plus size={16} /> Create page
              </button>
            </div>
          </div>

          {visible.length ? (
            viewMode === "list" ? (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="hidden grid-cols-[minmax(180px,1.1fr)_minmax(120px,0.8fr)_minmax(220px,1.7fr)_120px_132px] gap-4 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
                  <span>Page</span><span>URL</span><span>Purpose</span><span>Status</span><span className="text-right">Actions</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {visible.map((page) => (
                    <article key={page.id} className="grid gap-3 p-4 sm:p-5 lg:grid-cols-[minmax(180px,1.1fr)_minmax(120px,0.8fr)_minmax(220px,1.7fr)_120px_132px] lg:items-center lg:gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff7a00]"><FileText size={18} /></span>
                        <div className="min-w-0"><h3 className="truncate text-sm font-bold text-slate-900">{page.title}</h3><p className="mt-1 text-xs text-slate-400">Updated {formatDate(page.updated)}</p></div>
                      </div>

                      <div className="flex items-center gap-2 lg:block">
                        <span className="text-[11px] font-semibold uppercase text-slate-400 lg:hidden">URL</span>
                        <code className="truncate text-sm text-sky-700">{page.path}</code>
                        <button type="button" onClick={() => copyPath(page)} aria-label={`Copy ${page.path}`} title={copiedId === page.id ? "Copied" : "Copy page path"} className="rounded p-1 text-slate-400 hover:bg-orange-50 hover:text-[#ff7a00]">
                          {copiedId === page.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>

                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold uppercase text-slate-400 lg:hidden">Purpose</span>
                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600 lg:mt-0">{page.purpose || "No purpose added yet."}</p>
                      </div>

                      <div className="flex items-center justify-between gap-2 lg:justify-start"><span className="text-[11px] font-semibold uppercase text-slate-400 lg:hidden">Status</span><StatusBadge status={page.status} /></div>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 lg:justify-end lg:border-0 lg:pt-0"><span className="text-[11px] font-semibold uppercase text-slate-400 lg:hidden">Actions</span>{renderActions(page)}</div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((page) => (
                  <article key={page.id} className="flex min-h-[245px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_8px_26px_rgba(15,23,42,0.11)]">
                    <div className="flex items-center justify-between gap-3"><StatusBadge status={page.status} /><code className="truncate text-xs text-sky-700">{page.path}</code></div>
                    <div className="mt-5 flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff7a00]"><FileText size={18} /></span><h3 className="text-base font-extrabold leading-6 text-slate-950">{page.title}</h3></div>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{page.purpose || "No purpose added yet."}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4"><span className="text-xs text-slate-400">Updated {formatDate(page.updated)}</span>{renderActions(page)}</div>
                  </article>
                ))}
              </div>
            )
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">No pages match your search or filter.</div>
          )}

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Showing <strong className="text-slate-800">{start}–{end}</strong> of <strong className="text-slate-800">{filtered.length}</strong></p>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => { setViewAll((current) => !current); setCurrentPage(1); }} className="h-9 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{viewAll ? "Paginated view" : "View all"}</button>
              {!viewAll && <>
                <label className="sr-only" htmlFor="page-page-size">Pages per page</label>
                <select id="page-page-size" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setCurrentPage(1); }} className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700"><option value={6}>6 / page</option><option value={9}>9 / page</option><option value={12}>12 / page</option></select>
                <button type="button" aria-label="Previous page" onClick={() => setCurrentPage((current) => Math.max(1, current - 1))} disabled={safePage === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40"><ChevronLeft size={17} /></button>
                <span className="px-1 text-sm text-slate-600">{safePage} / {pageCount}</span>
                <button type="button" aria-label="Next page" onClick={() => setCurrentPage((current) => Math.min(pageCount, current + 1))} disabled={safePage === pageCount} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40"><ChevronRight size={17} /></button>
              </>}
            </div>
          </div>
        </section>

        <aside className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-[0_3px_14px_rgba(15,23,42,0.05)] sm:p-5">
          <h2 className="font-bold text-slate-900">Pages vs. posts</h2>
          <p className="mt-1 leading-6 text-slate-500">Pages hold lasting information like policies and contact details. Posts are dated articles and updates that are added over time.</p>
        </aside>
      </div>

      {editing && <PageModal page={editing.id ? editing : null} onClose={() => setEditing(null)} onSave={savePage} />}
      {preview && <PreviewModal page={preview} onClose={() => setPreview(null)} />}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071322]/45 p-4" onMouseDown={() => setDeleteTarget(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="delete-page-title" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <h2 id="delete-page-title" className="text-lg font-bold text-slate-950">Delete page?</h2>
            <p className="mt-2 text-sm text-slate-600">Delete <strong>{deleteTarget.title}</strong>? This removes it from this browser&apos;s page data.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setDeleteTarget(null)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold">Cancel</button>
              <button type="button" onClick={() => { setPages((current) => current.filter((page) => page.id !== deleteTarget.id)); setDeleteTarget(null); }} className="h-10 rounded-lg bg-[#ff7a00] px-4 text-sm font-bold text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
