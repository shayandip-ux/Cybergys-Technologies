import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "bestpicks-admin-listings";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23FFF1F3'/%3E%3Cpath d='M14 28 32 15l18 13v22H14V28Z' fill='none' stroke='%23D90432' stroke-width='3' stroke-linejoin='round'/%3E%3Cpath d='M25 50V36h14v14M21 29h.1M32 29h.1M43 29h.1' stroke='%23D90432' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E";

const starterListings = [
  {
    id: "pinewood-protect",
    provider: "Pinewood Protect",
    offer: "Home cover options",
    description:
      "Flexible home insurance for owners looking to protect their property and belongings.",
    category: "Home insurance",
    website: "pinewoodprotect.com",
    image: "/listing-images/pinewood-protect.svg",
    status: "Needs review",
  },
  {
    id: "harborline-financial",
    provider: "Harborline Financial",
    offer: "Flexible vehicle cover",
    description:
      "Compare coverage options for cars, drivers, and everyday journeys.",
    category: "Auto insurance",
    website: "harborlinefinancial.com",
    image: "/listing-images/harborline-financial.svg",
    status: "Published",
  },
  {
    id: "summit-key-lending",
    provider: "Summit Key Lending",
    offer: "Personal loan comparison",
    description:
      "Review loan terms and repayment options for planned expenses.",
    category: "Personal loans",
    website: "summitkeylending.com",
    image: "/listing-images/summit-key-lending.svg",
    status: "Draft",
  },
  {
    id: "clearwater-coverage",
    provider: "Clearwater Coverage",
    offer: "Everyday health plans",
    description:
      "Health insurance options designed for different budgets and needs.",
    category: "Health insurance",
    website: "clearwater.example",
    image: "/listing-images/clearwater-coverage.svg",
    status: "Needs review",
  },
  {
    id: "cedarline-cards",
    provider: "Cedarline Cards",
    offer: "Rewards credit cards",
    description:
      "Explore card features, rewards, and introductory offers.",
    category: "Credit cards",
    website: "cedarline.example",
    image: "/listing-images/cedarline-cards.svg",
    status: "Published",
  },
  {
    id: "northstar-lending",
    provider: "Northstar Lending",
    offer: "Home loan solutions",
    description:
      "Mortgage options for home buyers and homeowners considering a refinance.",
    category: "Mortgage loans",
    website: "northstarlending.example",
    image: "/listing-images/northstar-lending.svg",
    status: "Published",
  },
  {
    id: "brightpath-life",
    provider: "Brightpath Life",
    offer: "Family life cover",
    description:
      "Life insurance products to help families plan for the future.",
    category: "Life insurance",
    website: "brightpathlife.example",
    image: "/listing-images/brightpath-life.svg",
    status: "Draft",
  },
  {
    id: "safepaws",
    provider: "SafePaws",
    offer: "Pet care protection",
    description:
      "Help plan for eligible veterinary and pet care expenses.",
    category: "Pet insurance",
    website: "safepaws.example",
    image: "/listing-images/safepaws.svg",
    status: "Paused",
  },
  {
    id: "roamwell-travel",
    provider: "Roamwell Travel",
    offer: "Travel protection plans",
    description:
      "Cover options for trips, cancellations, and travel emergencies.",
    category: "Travel insurance",
    website: "roamwell.example",
    image: "/listing-images/roamwell-travel.svg",
    status: "Published",
  },
  {
    id: "guardian-alert",
    provider: "Guardian Alert",
    offer: "Medical alert service",
    description:
      "Personal emergency response services and wearable alert devices.",
    category: "Medical alert",
    website: "guardianalert.example",
    image: "/listing-images/guardian-alert.svg",
    status: "Needs review",
  },
  {
    id: "securehome-systems",
    provider: "SecureHome Systems",
    offer: "Home monitoring",
    description:
      "Security systems and monitoring plans for different home sizes.",
    category: "Home security",
    website: "securehome.example",
    image: "/listing-images/securehome-systems.svg",
    status: "Published",
  },
  {
    id: "clearpath-debt",
    provider: "Clearpath Finance",
    offer: "Debt consolidation options",
    description:
      "Compare options for combining eligible outstanding balances.",
    category: "Debt consolidation",
    website: "clearpath.example",
    image: "/listing-images/clearpath-debt.svg",
    status: "Draft",
  },
];

const statuses = ["Published", "Needs review", "Draft", "Paused"];

function loadListings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));

    return Array.isArray(saved)
      ? saved.map((listing) => ({ ...listing, image: listing.image || "" }))
      : starterListings;
  } catch {
    return starterListings;
  }
}

function ListingImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={!src || failed ? PLACEHOLDER_IMAGE : src}
      alt={alt}
      width="48"
      height="48"
      loading="eager"
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function ListingModal({ listing, onClose, onSave }) {
  const [form, setForm] = useState(
    listing ?? {
      provider: "",
      offer: "",
      description: "",
      category: "",
      website: "",
      image: "",
      status: "Draft",
    },
  );

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (!form.provider.trim() || !form.offer.trim()) return;

    onSave({
      ...form,
      provider: form.provider.trim(),
      offer: form.offer.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      website: form.website.trim(),
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
        aria-labelledby="listing-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between">
          <h2
            id="listing-modal-title"
            className="text-lg font-extrabold text-slate-950"
          >
            {listing ? "Edit listing" : "Add listing"}
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
            Provider name
            <input
              autoFocus
              required
              maxLength={80}
              value={form.provider}
              onChange={(event) => update("provider", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#ff7a00]"
              placeholder="e.g. Northstar Coverage"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Offer title
            <input
              required
              maxLength={100}
              value={form.offer}
              onChange={(event) => update("offer", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#ff7a00]"
              placeholder="e.g. Home cover options"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Description
            <textarea
              maxLength={240}
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              className="mt-1.5 min-h-20 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-[#ff7a00]"
              placeholder="Briefly explain what this offer provides."
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Image src{" "}
            <span className="font-normal text-slate-400">
              (SVG, PNG or WebP)
            </span>
            <input
              value={form.image || ""}
              onChange={(event) => update("image", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#ff7a00]"
              placeholder="/listing-images/provider-logo.svg"
            />
            <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">
              Place the image in <code>public/listing-images/</code> and use a
              path starting with <code>/listing-images/</code>.
            </span>
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <ListingImage
              key={form.image}
              src={form.image}
              alt="Listing image preview"
              className="h-12 w-12 rounded-lg border border-slate-200 bg-white object-contain p-1"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700">
                Image preview
              </p>
              <p className="truncate text-xs text-slate-500">
                {form.image || "Placeholder image"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Category
              <input
                maxLength={60}
                value={form.category}
                onChange={(event) => update("category", event.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-[#ff7a00]"
                placeholder="e.g. Home insurance"
              />
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
          </div>

          <label className="block text-sm font-semibold text-slate-700">
            Provider website
            <input
              maxLength={120}
              value={form.website}
              onChange={(event) => update("website", event.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#ff7a00]"
              placeholder="provider.example"
            />
          </label>
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
            {listing ? "Save changes" : "Create listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-emerald-50 text-emerald-700",
    "Needs review": "bg-amber-50 text-amber-700",
    Draft: "bg-slate-100 text-slate-600",
    Paused: "bg-slate-100 text-slate-600",
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

export default function ListingsPage() {
  const [listings, setListings] = useState(loadListings);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [viewAll, setViewAll] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    } catch {
      // Keep the current session usable when browser storage is unavailable.
    }
  }, [listings]);

  const filtered = useMemo(
    () =>
      listings.filter((listing) => {
        const searchText = `${listing.provider} ${listing.offer} ${listing.description} ${listing.category} ${listing.website}`.toLowerCase();

        return (
          searchText.includes(query.toLowerCase()) &&
          (statusFilter === "All statuses" || listing.status === statusFilter)
        );
      }),
    [listings, query, statusFilter],
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

  const saveListing = (value) => {
    if (editing?.id) {
      setListings((current) =>
        current.map((item) =>
          item.id === editing.id ? { ...value, id: editing.id } : item,
        ),
      );
    } else {
      setListings((current) => [
        { ...value, id: `listing-${Date.now()}` },
        ...current,
      ]);
    }

    setEditing(null);
  };

  const toggleStatus = (id) => {
    setListings((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Published" ? "Paused" : "Published",
            }
          : item,
      ),
    );
  };

  const renderActions = (listing) => (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={() => toggleStatus(listing.id)}
        title={listing.status === "Published" ? "Pause listing" : "Publish listing"}
        aria-label={
          listing.status === "Published"
            ? `Pause ${listing.provider}`
            : `Publish ${listing.provider}`
        }
        className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
      >
        {listing.status === "Published" ? <X size={16} /> : <Check size={16} />}
      </button>

      <button
        type="button"
        onClick={() => setEditing(listing)}
        aria-label={`Edit ${listing.provider}`}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
      >
        <Pencil size={16} />
      </button>

      <button
        type="button"
        onClick={() => setDeleteTarget(listing)}
        aria-label={`Delete ${listing.provider}`}
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
            <Building2 size={26} aria-hidden="true" />
          </span>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Listings
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500 sm:text-base">
              Manage provider offers and decide which listings are ready for
              visitors.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-800 sm:flex-row sm:items-center">
          <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-[#ff7a00]">
            ADMIN
          </span>
          <p>
            Listing changes are saved in this browser. Connect this page to your
            API to share updates with other admins.
          </p>
        </div>

        <section
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_5px_22px_rgba(15,23,42,0.07)] sm:p-6"
          aria-label="Listing directory"
        >
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">
                Listing directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filtered.length}{" "}
                {filtered.length === 1 ? "listing" : "listings"} · Search
                providers, offers, and categories
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  value={query}
                  onChange={changeFilter(setQuery)}
                  placeholder="Search listings"
                  aria-label="Search listings"
                  className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-[#ff7a00]"
                />
              </label>

              <select
                value={statusFilter}
                onChange={changeFilter(setStatusFilter)}
                aria-label="Filter listings by status"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#ff7a00]"
              >
                <option>All statuses</option>
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <div
                className="flex h-10 items-center rounded-lg border border-slate-200 bg-white p-1"
                role="group"
                aria-label="Listing view"
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
                Add listing
              </button>
            </div>
          </div>

          {visible.length ? (
            viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((listing) => (
                  <article
                    key={listing.id}
                    className="flex min-h-[232px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_8px_26px_rgba(15,23,42,0.11)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-orange-200 bg-orange-50/50">
                        <ListingImage
                          key={`${listing.id}-${listing.image}`}
                          src={listing.image}
                          alt={`${listing.provider} logo`}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                      <StatusBadge status={listing.status} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-950">
                      {listing.provider}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-slate-700">
                      {listing.offer}
                    </p>
                    <p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">
                      {listing.description || "No description added yet."}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-700">
                          {listing.category || "Uncategorized"}
                        </p>
                        {listing.website && (
                          <p className="mt-1 truncate text-xs text-slate-400">
                            {listing.website}
                          </p>
                        )}
                      </div>
                      {renderActions(listing)}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {visible.map((listing) => (
                  <article
                    key={listing.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_6px_20px_rgba(15,23,42,0.1)] sm:flex-row sm:items-center sm:gap-5"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-orange-200 bg-orange-50/50">
                        <ListingImage
                          key={`${listing.id}-${listing.image}`}
                          src={listing.image}
                          alt={`${listing.provider} logo`}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-slate-950 sm:text-base">
                          {listing.provider}
                        </h3>
                        <p className="mt-1 truncate text-xs font-medium text-slate-600 sm:text-sm">
                          {listing.offer}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                          {listing.description || "No description added yet."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:justify-end sm:border-0 sm:pt-0">
                      <span className="min-w-0 truncate text-xs text-slate-500 sm:min-w-32">
                        {listing.category || "Uncategorized"}
                      </span>
                      <StatusBadge status={listing.status} />
                      {renderActions(listing)}
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
              No listings match your search.
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
                  <label className="sr-only" htmlFor="listing-page-size">
                    Listings per page
                  </label>
                  <select
                    id="listing-page-size"
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
      </div>

      {editing && (
        <ListingModal
          listing={editing.id ? editing : null}
          onClose={() => setEditing(null)}
          onSave={saveListing}
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
            aria-labelledby="delete-listing-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2
              id="delete-listing-title"
              className="text-lg font-bold text-slate-950"
            >
              Delete listing?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Delete <strong>{deleteTarget.provider}</strong> —{" "}
              {deleteTarget.offer}? This removes it from this browser&apos;s
              listing data.
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
                  setListings((current) =>
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