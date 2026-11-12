import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "bestpicks-admin-categories";

const PLACEHOLDER_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='12' fill='%23FFF1F3'/%3E%3Cpath d='M24 10 36 17v14L24 38 12 31V17l12-7Z' fill='none' stroke='%23D90432' stroke-width='2.3' stroke-linejoin='round'/%3E%3Cpath d='m18.5 24 3.5 3.5 7.5-8' fill='none' stroke='%23D90432' stroke-width='2.3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const starterCategories = [
  {
    id: "home-insurance",
    name: "Home insurance",
    description: "Cover options for homeowners and property.",
    listings: 32,
    status: "Active",
    icon: "/category-icons/home-insurance.svg",
  },
  {
    id: "auto-insurance",
    name: "Auto insurance",
    description: "Compare cover for cars and other vehicles.",
    listings: 28,
    status: "Active",
    icon: "/category-icons/auto-insurance.svg",
  },
  {
    id: "medical-alert",
    name: "Medical alert",
    description: "Personal emergency response and medical alert services.",
    listings: 12,
    status: "Active",
    icon: "/category-icons/medical-alert.svg",
  },
  {
    id: "home-security",
    name: "Home security",
    description: "Protect your home with security systems and monitoring.",
    listings: 15,
    status: "Active",
    icon: "/category-icons/home-security.svg",
  },
  {
    id: "life-insurance",
    name: "Life insurance",
    description: "Cover options to help protect your family's future.",
    listings: 22,
    status: "Active",
    icon: "/category-icons/life-insurance.svg",
  },
  {
    id: "mortgage-loans",
    name: "Mortgage loans",
    description: "Compare home loan and refinancing options.",
    listings: 18,
    status: "Active",
    icon: "/category-icons/mortgage-loans.svg",
  },
  {
    id: "renters-insurance",
    name: "Renters insurance",
    description: "Cover for personal belongings and rental homes.",
    listings: 14,
    status: "Active",
    icon: "/category-icons/renters-insurance.svg",
  },
  {
    id: "debt-consolidation",
    name: "Debt consolidation",
    description: "Options to combine and manage outstanding debt.",
    listings: 9,
    status: "Active",
    icon: "/category-icons/debt-consolidation.svg",
  },
  {
    id: "personal-loans",
    name: "Personal loans",
    description: "Loan options for common personal needs.",
    listings: 20,
    status: "Draft",
    icon: "/category-icons/personal-loans.svg",
  },
  {
    id: "pet-insurance",
    name: "Pet insurance",
    description: "Plans to help manage your companion's care costs.",
    listings: 11,
    status: "Active",
    icon: "/category-icons/pet-insurance.svg",
  },
  {
    id: "credit-cards",
    name: "Credit cards",
    description: "Cards grouped by features, rates and benefits.",
    listings: 24,
    status: "Active",
    icon: "/category-icons/credit-cards.svg",
  },
  {
    id: "travel-insurance",
    name: "Travel insurance",
    description: "Cover for trips, cancellations and travel emergencies.",
    listings: 16,
    status: "Active",
    icon: "/category-icons/travel-insurance.svg",
  },
];

function loadCategories() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));

    return Array.isArray(saved)
      ? saved.map((category) => ({
          ...category,
          icon: category.icon || PLACEHOLDER_ICON,
        }))
      : starterCategories;
  } catch {
    return starterCategories;
  }
}

function CategoryIcon({ src, alt }) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={!src || failed ? PLACEHOLDER_ICON : src}
      alt={alt}
      width="48"
      height="48"
      loading="eager"
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
      className="h-12 w-12 shrink-0 rounded-xl object-contain"
    />
  );
}

function CategoryModal({ category, onClose, onSave }) {
  const [form, setForm] = useState(
    category ?? {
      name: "",
      description: "",
      listings: 0,
      status: "Draft",
      icon: PLACEHOLDER_ICON,
    },
  );

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      listings: Number(form.listings) || 0,
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
        aria-labelledby="category-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between">
          <h2
            id="category-modal-title"
            className="text-lg font-extrabold text-slate-950"
          >
            {category ? "Edit category" : "Add category"}
          </h2>

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
            Category name
            <input
              autoFocus
              required
              maxLength={60}
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#ff7a00]"
              placeholder="e.g. Home insurance"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Description
            <textarea
              maxLength={180}
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              className="mt-1.5 min-h-20 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-[#ff7a00]"
              placeholder="Short description for admins"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Image src{" "}
            <span className="font-normal text-slate-400">
              (SVG, PNG or WebP)
            </span>
            <input
              value={form.icon || ""}
              onChange={(event) => update("icon", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#ff7a00]"
              placeholder="/category-icons/home-insurance.svg"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Listings
              <input
                type="number"
                min="0"
                value={form.listings}
                onChange={(event) => update("listings", event.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#ff7a00]"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Status
              <select
                value={form.status}
                onChange={(event) => update("status", event.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-[#ff7a00]"
              >
                <option>Active</option>
                <option>Draft</option>
                <option>Paused</option>
              </select>
            </label>
          </div>

          <p className="rounded-lg bg-orange-50 px-3 py-2 text-xs leading-5 text-orange-800">
            Put image files in <code>public/category-icons/</code>, then use a
            path starting with <code>/category-icons/</code>.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-10 rounded-lg bg-[#ff7a00] px-4 text-sm font-bold text-white hover:bg-[#d96600]"
          >
            {category ? "Save changes" : "Create category"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState(loadCategories);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [viewAll, setViewAll] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const filtered = useMemo(
    () =>
      categories.filter((category) => {
        const matchesText = `${category.name} ${category.description}`
          .toLowerCase()
          .includes(query.toLowerCase());

        return (
          matchesText &&
          (statusFilter === "All statuses" || category.status === statusFilter)
        );
      }),
    [categories, query, statusFilter],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, pageCount);
  const visible = viewAll
    ? filtered
    : filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const start = filtered.length ? (safePage - 1) * pageSize + 1 : 0;
  const end = viewAll
    ? filtered.length
    : Math.min(safePage * pageSize, filtered.length);

  const changeFilter = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
    setViewAll(false);
  };

  const saveCategory = (value) => {
    if (editing?.id) {
      setCategories((current) =>
        current.map((item) =>
          item.id === editing.id ? { ...value, id: editing.id } : item,
        ),
      );
    } else {
      setCategories((current) => [
        { ...value, id: `category-${Date.now()}` },
        ...current,
      ]);
    }

    setEditing(null);
  };

  const toggleStatus = (id) => {
    setCategories((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Paused" : "Active",
            }
          : item,
      ),
    );
  };

  return (
    <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-6 flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00]">
            <Layers3 size={26} aria-hidden="true" />
          </span>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Categories
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500 sm:text-base">
              Manage the insurance and finance topics visitors can browse.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-800 sm:flex-row sm:items-center">
          <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-[#ff7a00]">
            ADMIN
          </span>
          <p>
            Category changes are saved in this browser. Connect this page to
            your API to share updates with other admins.
          </p>
        </div>

        <section
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_5px_22px_rgba(15,23,42,0.07)] sm:p-6"
          aria-label="Category directory"
        >
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">
                Category directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filtered.length}{" "}
                {filtered.length === 1 ? "category" : "categories"} · Add your
                own SVG icons when ready
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <input
                  value={query}
                  onChange={changeFilter(setQuery)}
                  placeholder="Search categories"
                  aria-label="Search categories"
                  className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-[#ff7a00]"
                />
              </label>

              <select
                value={statusFilter}
                onChange={changeFilter(setStatusFilter)}
                aria-label="Filter by status"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#ff7a00]"
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Paused</option>
              </select>

              <div
                className="flex h-10 items-center rounded-lg border border-slate-200 bg-white p-1"
                role="group"
                aria-label="Category view"
              >
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  aria-label="Grid view"
                  title="Grid view"
                  className={`flex h-8 w-9 items-center justify-center rounded-md transition ${
                    viewMode === "grid"
                      ? "bg-orange-50 text-[#ff7a00]"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <LayoutGrid size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                  aria-label="List view"
                  title="List view"
                  className={`flex h-8 w-9 items-center justify-center rounded-md transition ${
                    viewMode === "list"
                      ? "bg-orange-50 text-[#ff7a00]"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setEditing({})}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#d96600]"
              >
                <Plus size={16} />
                Add category
              </button>
            </div>
          </div>

          {visible.length ? (
            viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((category) => (
                  <article
                    key={category.id}
                    className="flex min-h-[232px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_8px_26px_rgba(15,23,42,0.11)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        aria-label={`${category.name} icon`}
                        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-orange-200 bg-orange-50/50"
                      >
                        <CategoryIcon
                          key={`${category.id}-${category.icon}`}
                          src={category.icon}
                          alt={`${category.name} icon`}
                        />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          category.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : category.status === "Draft"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {category.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-950">
                      {category.name}
                    </h3>
                    <p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">
                      {category.description || "No description added yet."}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                      <p className="text-sm text-slate-500">
                        <span className="font-bold text-slate-900">
                          {category.listings}
                        </span>{" "}
                        listings
                      </p>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleStatus(category.id)}
                          title={
                            category.status === "Active"
                              ? "Pause category"
                              : "Activate category"
                          }
                          aria-label={
                            category.status === "Active"
                              ? `Pause ${category.name}`
                              : `Activate ${category.name}`
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
                        >
                          {category.status === "Active" ? (
                            <X size={16} />
                          ) : (
                            <Check size={16} />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditing(category)}
                          aria-label={`Edit ${category.name}`}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(category)}
                          aria-label={`Delete ${category.name}`}
                          className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {visible.map((category) => (
                  <article
                    key={category.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_6px_20px_rgba(15,23,42,0.1)] sm:flex-row sm:items-center sm:gap-5"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div
                        aria-label={`${category.name} icon`}
                        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-orange-200 bg-orange-50/50"
                      >
                        <CategoryIcon
                          key={`${category.id}-${category.icon}`}
                          src={category.icon}
                          alt={`${category.name} icon`}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-slate-950 sm:text-base">
                          {category.name}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                          {category.description || "No description added yet."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:justify-end sm:border-0 sm:pt-0">
                      <span className="whitespace-nowrap text-xs text-slate-500 sm:min-w-24 sm:text-sm">
                        <strong className="text-slate-900">
                          {category.listings}
                        </strong>{" "}
                        listings
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          category.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : category.status === "Draft"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {category.status}
                      </span>

                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleStatus(category.id)}
                          title={
                            category.status === "Active"
                              ? "Pause category"
                              : "Activate category"
                          }
                          aria-label={
                            category.status === "Active"
                              ? `Pause ${category.name}`
                              : `Activate ${category.name}`
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
                        >
                          {category.status === "Active" ? (
                            <X size={16} />
                          ) : (
                            <Check size={16} />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditing(category)}
                          aria-label={`Edit ${category.name}`}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(category)}
                          aria-label={`Delete ${category.name}`}
                          className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
              No categories match your search.
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <strong className="text-slate-800">
                {start}–{end}
              </strong>{" "}
              of <strong className="text-slate-800">{filtered.length}</strong>
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setViewAll((current) => !current);
                  setCurrentPage(1);
                }}
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {viewAll ? "Paginated view" : "View all"}
              </button>

              {!viewAll && (
                <>
                  <label className="sr-only" htmlFor="category-page-size">
                    Categories per page
                  </label>
                  <select
                    id="category-page-size"
                    value={pageSize}
                    onChange={(event) => {
                      setPageSize(Number(event.target.value));
                      setCurrentPage(1);
                    }}
                    className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700"
                  >
                    <option value={6}>6 / page</option>
                    <option value={9}>9 / page</option>
                    <option value={12}>12 / page</option>
                  </select>

                  <button
                    type="button"
                    aria-label="Previous page"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={safePage === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <span className="px-1 text-sm text-slate-600">
                    {safePage} / {pageCount}
                  </span>

                  <button
                    type="button"
                    aria-label="Next page"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(pageCount, page + 1))
                    }
                    disabled={safePage === pageCount}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <aside className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-[0_3px_14px_rgba(15,23,42,0.05)] sm:p-5">
          <h2 className="font-bold text-slate-900">Category icons</h2>
          <p className="mt-1 leading-6 text-slate-500">
            Each category icon uses an{" "}
            <code className="rounded bg-slate-100 px-1">img src</code>. Replace
            the category&apos;s{" "}
            <code className="rounded bg-slate-100 px-1">icon</code> path with
            your image file under{" "}
            <code className="rounded bg-slate-100 px-1">
              public/category-icons/
            </code>
            .
          </p>
        </aside>
      </div>

      {editing && (
        <CategoryModal
          category={editing.id ? editing : null}
          onClose={() => setEditing(null)}
          onSave={saveCategory}
        />
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071322]/45 p-4"
          onMouseDown={() => setDeleteTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-slate-950">
              Delete category?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Delete <strong>{deleteTarget.name}</strong>? This removes it from
              this browser&apos;s category list.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategories((current) =>
                    current.filter((item) => item.id !== deleteTarget.id),
                  );
                  setDeleteTarget(null);
                }}
                className="h-10 rounded-lg bg-[#ff7a00] px-4 text-sm font-bold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}