import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "bestpicks-admin-posts";
const categories = [
  "Home insurance",
  "Auto insurance",
  "Health insurance",
  "Personal loans",
  "Credit cards",
  "Mortgage loans",
  "Life insurance",
  "Pet insurance",
  "Travel insurance",
  "Medical alert",
  "Home security",
  "Debt consolidation",
];
const statuses = ["Published", "Draft", "In review"];

const starterPosts = [
  {
    id: "home-insurance-comparison-guide",
    title: "A practical guide to comparing home insurance",
    excerpt: "Key details to review when comparing cover, limits, and exclusions.",
    body: "Compare the policy limits, exclusions, deductibles, and claims support before choosing a home insurance provider.",
    category: "Home insurance",
    status: "Published",
    date: "2026-10-12",
  },
  {
    id: "first-car-insurance-quote",
    title: "Understanding your first car insurance quote",
    excerpt: "A simple walkthrough of the common sections in a vehicle insurance quote.",
    body: "Learn how coverage limits, deductibles, driver details, and vehicle information shape an auto insurance quote.",
    category: "Auto insurance",
    status: "Draft",
    date: "2026-10-10",
  },
  {
    id: "personal-loan-questions",
    title: "Questions to ask before choosing a personal loan",
    excerpt: "Compare fees, repayment terms, and total borrowing costs before applying.",
    body: "Before choosing a loan, review the APR, fees, repayment schedule, and whether early repayment has a charge.",
    category: "Personal loans",
    status: "In review",
    date: "2026-10-08",
  },
  {
    id: "credit-card-rewards",
    title: "How to compare credit card rewards",
    excerpt: "Look beyond welcome offers to understand the value of ongoing rewards.",
    body: "Compare reward rates, annual fees, redemption limits, and the categories where you spend most.",
    category: "Credit cards",
    status: "Published",
    date: "2026-10-06",
  },
  {
    id: "mortgage-rate-basics",
    title: "Fixed or variable mortgage rates: what to consider",
    excerpt: "Understand how rate structure can affect your monthly payment over time.",
    body: "Compare the initial rate, future adjustment rules, fees, and the length of time you expect to keep the loan.",
    category: "Mortgage loans",
    status: "Draft",
    date: "2026-10-04",
  },
  {
    id: "pet-insurance-basics",
    title: "What to check in a pet insurance plan",
    excerpt: "Review waiting periods, exclusions, reimbursement, and annual limits.",
    body: "A good comparison includes covered conditions, waiting periods, reimbursement rates, and annual or lifetime limits.",
    category: "Pet insurance",
    status: "Published",
    date: "2026-10-02",
  },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadPosts() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : starterPosts;
  } catch {
    return starterPosts;
  }
}

function formatDate(value) {
  if (!value) return "Date not set";
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

function PostModal({ post, onClose, onSave }) {
  const [form, setForm] = useState(
    post ?? {
      title: "",
      excerpt: "",
      body: "",
      category: categories[0],
      status: "Draft",
      date: today(),
    },
  );

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    onSave({
      ...form,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body: form.body.trim(),
      category: form.category.trim(),
      date: form.date || today(),
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
        aria-labelledby="post-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="post-modal-title" className="text-lg font-extrabold text-slate-950">
              {post ? "Edit post" : "Write a post"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create an article for your insurance and finance readers.
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
            Post title
            <input
              autoFocus
              required
              maxLength={120}
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#ff7a00]"
              placeholder="e.g. A practical guide to comparing home insurance"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Short summary
            <textarea
              maxLength={220}
              value={form.excerpt}
              onChange={(event) => update("excerpt", event.target.value)}
              className="mt-1.5 min-h-20 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-[#ff7a00]"
              placeholder="A short description shown on the post card."
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Article content
            <textarea
              value={form.body}
              onChange={(event) => update("body", event.target.value)}
              className="mt-1.5 min-h-40 w-full rounded-lg border border-slate-200 p-3 leading-6 outline-none focus:border-[#ff7a00]"
              placeholder="Write the post content here..."
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-semibold text-slate-700">
              Category
              <select
                value={form.category}
                onChange={(event) => update("category", event.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-[#ff7a00]"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
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

            <label className="block text-sm font-semibold text-slate-700">
              Publish date
              <input
                type="date"
                value={form.date}
                onChange={(event) => update("date", event.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-[#ff7a00]"
              />
            </label>
          </div>
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
            {form.status === "Published" ? <Send size={15} /> : <Check size={15} />}
            {post ? "Save changes" : "Save post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function PostsPage() {
  const [posts, setPosts] = useState(loadPosts);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [viewAll, setViewAll] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {
      // Keep the current session usable when browser storage is unavailable.
    }
  }, [posts]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const searchText = `${post.title} ${post.excerpt} ${post.body} ${post.category}`.toLowerCase();
      const matchesStatus = statusFilter === "All statuses" || post.status === statusFilter;
      const matchesCategory = categoryFilter === "All categories" || post.category === categoryFilter;
      return searchText.includes(normalizedQuery) && matchesStatus && matchesCategory;
    });
  }, [posts, query, statusFilter, categoryFilter]);

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

  const savePost = (value) => {
    if (editing?.id) {
      setPosts((current) =>
        current.map((post) =>
          post.id === editing.id ? { ...value, id: editing.id } : post,
        ),
      );
    } else {
      setPosts((current) => [
        { ...value, id: `post-${Date.now()}` },
        ...current,
      ]);
    }
    setEditing(null);
    setCurrentPage(1);
  };

  const togglePublish = (id) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, status: post.status === "Published" ? "Draft" : "Published" }
          : post,
      ),
    );
  };

  const renderActions = (post) => (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={() => togglePublish(post.id)}
        title={post.status === "Published" ? "Move to draft" : "Publish post"}
        aria-label={post.status === "Published" ? `Unpublish ${post.title}` : `Publish ${post.title}`}
        className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
      >
        {post.status === "Published" ? <X size={16} /> : <Send size={15} />}
      </button>
      <button
        type="button"
        onClick={() => setEditing(post)}
        aria-label={`Edit ${post.title}`}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
      >
        <Pencil size={16} />
      </button>
      <button
        type="button"
        onClick={() => setDeleteTarget(post)}
        aria-label={`Delete ${post.title}`}
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
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Posts
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500 sm:text-base">
              Publish useful articles, buying guides, and updates to help visitors make informed comparisons.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-800 sm:flex-row sm:items-center">
          <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-[#ff7a00]">
            ADMIN
          </span>
          <p>
            Post changes are saved in this browser. Connect this page to your API to share posts with other admins.
          </p>
        </div>

        <section
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_5px_22px_rgba(15,23,42,0.07)] sm:p-6"
          aria-label="Post directory"
        >
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">Editorial posts</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filtered.length} {filtered.length === 1 ? "post" : "posts"} · Manage articles and publishing status
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <label className="relative min-w-0 flex-1 sm:w-52 sm:flex-none">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" aria-hidden="true" />
                <input
                  value={query}
                  onChange={changeFilter(setQuery)}
                  placeholder="Search posts"
                  aria-label="Search posts"
                  className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-[#ff7a00]"
                />
              </label>

              <select
                value={statusFilter}
                onChange={changeFilter(setStatusFilter)}
                aria-label="Filter posts by status"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#ff7a00]"
              >
                <option>All statuses</option>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>

              <select
                value={categoryFilter}
                onChange={changeFilter(setCategoryFilter)}
                aria-label="Filter posts by category"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#ff7a00]"
              >
                <option>All categories</option>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>

              <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-white p-1" role="group" aria-label="Post view">
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
                <Plus size={16} /> Write a post
              </button>
            </div>
          </div>

          {visible.length ? (
            viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((post) => (
                  <article key={post.id} className="flex min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_8px_26px_rgba(15,23,42,0.11)]">
                    <div className="flex items-center justify-between gap-3">
                      <StatusBadge status={post.status} />
                      <span className="truncate text-xs text-slate-400">{post.category}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold leading-7 text-slate-950">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{post.excerpt || "No summary added yet."}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                        <CalendarDays size={15} />{formatDate(post.date)}
                      </span>
                      {renderActions(post)}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {visible.map((post) => (
                  <article key={post.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_6px_20px_rgba(15,23,42,0.1)] sm:flex-row sm:items-center sm:gap-5">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <StatusBadge status={post.status} />
                        <span className="text-xs text-slate-400">{post.category}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-950 sm:text-base">{post.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm">{post.excerpt || "No summary added yet."}</p>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:justify-end sm:border-0 sm:pt-0">
                      <span className="inline-flex shrink-0 items-center gap-2 text-xs text-slate-400">
                        <CalendarDays size={15} />{formatDate(post.date)}
                      </span>
                      {renderActions(post)}
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
              No posts match your search or filters.
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing <strong className="text-slate-800">{start}–{end}</strong> of <strong className="text-slate-800">{filtered.length}</strong>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => { setViewAll((current) => !current); setCurrentPage(1); }}
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {viewAll ? "Paginated view" : "View all"}
              </button>
              {!viewAll && (
                <>
                  <label className="sr-only" htmlFor="post-page-size">Posts per page</label>
                  <select
                    id="post-page-size"
                    value={pageSize}
                    onChange={(event) => { setPageSize(Number(event.target.value)); setCurrentPage(1); }}
                    className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700"
                  >
                    <option value={6}>6 / page</option>
                    <option value={9}>9 / page</option>
                    <option value={12}>12 / page</option>
                  </select>
                  <button
                    type="button"
                    aria-label="Previous page"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={safePage === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <span className="px-1 text-sm text-slate-600">{safePage} / {pageCount}</span>
                  <button
                    type="button"
                    aria-label="Next page"
                    onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
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
          <h2 className="font-bold text-slate-900">Editorial workflow</h2>
          <p className="mt-1 leading-6 text-slate-500">
            Draft the article, assign a topic, review it for accuracy, then publish it when it is ready for readers.
          </p>
        </aside>
      </div>

      {editing && (
        <PostModal
          post={editing.id ? editing : null}
          onClose={() => setEditing(null)}
          onSave={savePost}
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
            aria-labelledby="delete-post-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2 id="delete-post-title" className="text-lg font-bold text-slate-950">
              Delete post?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Delete <strong>{deleteTarget.title}</strong>? This removes it from this browser&apos;s post data.
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
                  setPosts((current) => current.filter((post) => post.id !== deleteTarget.id));
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
