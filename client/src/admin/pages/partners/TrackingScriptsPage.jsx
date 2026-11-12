
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Code2,
  Search,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
  Filter,
  Columns3,
  Copy,
  Check,
  MousePointerClick,
  Globe,
  Tag,
  Eye,
} from "lucide-react";

const initialScripts = [
  {
    id: 1,
    name: "Conversion pixel",
    partner: "Northstar Lending",
    placement: "Thank-you page",
    scope: "Page specific",
    status: "Active",
    code: "<!-- Conversion tracking pixel -->",
    createdAt: "2026-10-10",
  },
  {
    id: 2,
    name: "Referral tracker",
    partner: "Brightpath Life",
    placement: "All pages",
    scope: "Global",
    status: "Active",
    code: "<!-- Referral tracking script -->",
    createdAt: "2026-10-11",
  },
  {
    id: 3,
    name: "Lead event tag",
    partner: "Cedarline Cards",
    placement: "Lead form",
    scope: "Category specific",
    status: "Draft",
    code: "<!-- Lead event tracking -->",
    createdAt: "2026-10-12",
  },
  {
    id: 4,
    name: "Click attribution",
    partner: "Harborline Financial",
    placement: "Offer page",
    scope: "Page specific",
    status: "Active",
    code: "<!-- Click attribution script -->",
    createdAt: "2026-10-13",
  },
  {
    id: 5,
    name: "Google Analytics",
    partner: "Internal",
    placement: "All pages",
    scope: "Global",
    status: "Active",
    code: "<!-- Google Analytics placeholder -->",
    createdAt: "2026-10-14",
  },
  {
    id: 6,
    name: "Meta conversion event",
    partner: "Internal",
    placement: "Thank-you page",
    scope: "Page specific",
    status: "Draft",
    code: "<!-- Meta conversion event placeholder -->",
    createdAt: "2026-10-15",
  },
  {
    id: 7,
    name: "Form submission event",
    partner: "Northstar Lending",
    placement: "Lead form",
    scope: "Category specific",
    status: "Active",
    code: "<!-- Form submission event -->",
    createdAt: "2026-10-16",
  },
  {
    id: 8,
    name: "Partner outbound click",
    partner: "Brightpath Life",
    placement: "Offer page",
    scope: "Page specific",
    status: "Inactive",
    code: "<!-- Partner outbound click -->",
    createdAt: "2026-10-17",
  },
];

const initialForm = {
  name: "",
  partner: "",
  placement: "All pages",
  scope: "Global",
  status: "Draft",
  code: "",
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Draft: "bg-slate-100 text-slate-600",
  Inactive: "bg-orange-50 text-orange-700",
};

const availableColumns = [
  { key: "name", label: "Script label" },
  { key: "partner", label: "Partner" },
  { key: "placement", label: "Placement" },
  { key: "scope", label: "Assignment" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created" },
  { key: "actions", label: "Actions" },
];

export default function TrackingScriptsPage() {
  const [scripts, setScripts] = useState(initialScripts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [placementFilter, setPlacementFilter] = useState("All placements");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [columns, setColumns] = useState(
    availableColumns.reduce((result, column) => {
      result[column.key] = true;
      return result;
    }, {})
  );

  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingScript, setEditingScript] = useState(null);
  const [viewingScript, setViewingScript] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState(false);

  const filteredScripts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return scripts.filter((script) => {
      const matchesSearch =
        !query ||
        script.name.toLowerCase().includes(query) ||
        script.partner.toLowerCase().includes(query) ||
        script.placement.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All statuses" ||
        script.status === statusFilter;

      const matchesPlacement =
        placementFilter === "All placements" ||
        script.placement === placementFilter;

      return matchesSearch && matchesStatus && matchesPlacement;
    });
  }, [scripts, search, statusFilter, placementFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredScripts.length / itemsPerPage)
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, placementFilter, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleScripts = filteredScripts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const startItem = filteredScripts.length ? startIndex + 1 : 0;
  const endItem = Math.min(
    startIndex + itemsPerPage,
    filteredScripts.length
  );

  const activeCount = scripts.filter(
    (script) => script.status === "Active"
  ).length;

  const draftCount = scripts.filter(
    (script) => script.status === "Draft"
  ).length;

  const openCreateModal = () => {
    setEditingScript(null);
    setForm({ ...initialForm });
    setModalOpen(true);
  };

  const openEditModal = (script) => {
    setEditingScript(script);
    setForm({
      name: script.name,
      partner: script.partner,
      placement: script.placement,
      scope: script.scope,
      status: script.status,
      code: script.code,
    });
    setModalOpen(true);
  };

  const saveScript = (event) => {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) return;

    const record = {
      ...form,
      name,
      partner: form.partner.trim() || "Internal",
      code: form.code.trim(),
    };

    if (editingScript) {
      setScripts((previous) =>
        previous.map((script) =>
          script.id === editingScript.id
            ? { ...script, ...record }
            : script
        )
      );
    } else {
      setScripts((previous) => [
        ...previous,
        {
          ...record,
          id: Date.now(),
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ]);
      setCurrentPage(1);
    }

    setModalOpen(false);
  };

  const deleteScript = (script) => {
    const confirmed = window.confirm(
      `Delete "${script.name}"? This cannot be undone in this demo.`
    );

    if (!confirmed) return;

    setScripts((previous) =>
      previous.filter((item) => item.id !== script.id)
    );

    if (viewingScript?.id === script.id) {
      setViewingScript(null);
    }
  };

  const toggleColumn = (key) => {
    setColumns((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All statuses");
    setPlacementFilter("All placements");
  };

  const copyScript = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.alert("Clipboard access is unavailable in this browser.");
    }
  };

  const Pagination = () => (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <p>
          Showing{" "}
          <strong className="text-slate-900">
            {startItem}–{endItem}
          </strong>{" "}
          of{" "}
          <strong className="text-slate-900">
            {filteredScripts.length}
          </strong>
        </p>

        <label className="flex items-center gap-2">
          <span>Rows</span>
          <select
            value={itemsPerPage}
            onChange={(event) =>
              setItemsPerPage(Number(event.target.value))
            }
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-[#ff7a00]"
          >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={17} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`h-9 min-w-9 rounded-lg border px-3 text-sm font-semibold ${
                currentPage === page
                  ? "border-[#ff7a00] bg-[#ff7a00] text-white"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() =>
            setCurrentPage((page) => Math.min(totalPages, page + 1))
          }
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Page header */}
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00]">
              <Code2 size={26} />
            </span>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff7a00]">
                Partners &amp; Tracking
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Tracking Scripts
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage tracking pixels, scripts, and metadata assigned
                globally, by category, or to individual pages.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-4 py-3 text-sm font-bold text-white sm:mt-1"
          >
            <Plus size={17} />
            Create new
          </button>
        </header>

        {/* Demo notice */}
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-900">
          <span className="mt-0.5 shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ff7a00]">
            Demo
          </span>
          <p>
            These are sample tracking records. Changes are held in React
            state and are not published or saved to your database.
          </p>
        </div>

        {/* Summary cards */}
        <section
          className="mb-5 grid grid-cols-3 gap-2 sm:gap-3"
          aria-label="Tracking script summary"
        >
          {[
            [scripts.length, "Configured scripts", Code2],
            [activeCount, "Active scripts", Activity],
            [draftCount, "Draft scripts", Tag],
          ].map(([value, label, Icon]) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-extrabold text-slate-950">
                  {value}
                </p>
                <Icon size={19} className="text-[#ff7a00]" />
              </div>
              <p className="mt-1 text-sm text-slate-500 max-sm:text-[12px]">{label}</p>
            </article>
          ))}
        </section>

        {/* Directory */}
        <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.05)]">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="mb-4">
              <h2 className="font-extrabold text-slate-950">
                Tracking script directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search and manage your tracking configurations.
              </p>
            </div>

            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              {/* Search */}
              <div className="relative min-w-0 flex-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by label, partner, or placement..."
                  aria-label="Search tracking scripts"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-[#ff7a00]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Columns dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setColumnsOpen((open) => !open);
                      setFiltersOpen(false);
                    }}
                    aria-expanded={columnsOpen}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700"
                  >
                    <Columns3 size={16} />
                    Columns
                    <ChevronDown size={15} />
                  </button>

                  {columnsOpen && (
                    <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                        Visible columns
                      </p>

                      {availableColumns.map((column) => (
                        <label
                          key={column.key}
                          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-700"
                        >
                          <input
                            type="checkbox"
                            checked={columns[column.key]}
                            disabled={column.key === "name"}
                            onChange={() => toggleColumn(column.key)}
                            className="accent-[#ff7a00]"
                          />
                          {column.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filters dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setFiltersOpen((open) => !open);
                      setColumnsOpen(false);
                    }}
                    aria-expanded={filtersOpen}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium ${
                      statusFilter !== "All statuses" ||
                      placementFilter !== "All placements"
                        ? "border-orange-200 bg-orange-50 text-[#ff7a00]"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <Filter size={16} />
                    Filters
                    <ChevronDown size={15} />
                  </button>

                  {filtersOpen && (
                    <div className="absolute right-0 top-full z-30 mt-2 w-[min(290px,calc(100vw-48px))] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                      <div className="mb-4">
                        <label
                          htmlFor="status-filter"
                          className="mb-1.5 block text-sm font-semibold text-slate-700"
                        >
                          Status
                        </label>
                        <select
                          id="status-filter"
                          value={statusFilter}
                          onChange={(event) =>
                            setStatusFilter(event.target.value)
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                        >
                          <option>All statuses</option>
                          <option>Active</option>
                          <option>Draft</option>
                          <option>Inactive</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="placement-filter"
                          className="mb-1.5 block text-sm font-semibold text-slate-700"
                        >
                          Placement
                        </label>
                        <select
                          id="placement-filter"
                          value={placementFilter}
                          onChange={(event) =>
                            setPlacementFilter(event.target.value)
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                        >
                          <option>All placements</option>
                          <option>All pages</option>
                          <option>Thank-you page</option>
                          <option>Lead form</option>
                          <option>Offer page</option>
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={clearFilters}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Click-away layer for menus */}
          {(columnsOpen || filtersOpen) && (
            <button
              type="button"
              aria-label="Close dropdown menus"
              onClick={() => {
                setColumnsOpen(false);
                setFiltersOpen(false);
              }}
              className="fixed inset-0 z-10 cursor-default"
            />
          )}

          {/* Results */}
          {visibleScripts.length === 0 ? (
            <div className="px-5 py-16 text-center sm:py-20">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#ff7a00]">
                <Search size={25} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-950">
                No results found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                No tracking scripts match your search or selected filters.
                Try adjusting your criteria or create a new tracking script.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Clear filters
                </button>
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="flex items-center gap-2 rounded-lg bg-[#ff7a00] px-4 py-2.5 text-sm font-bold text-white"
                >
                  <Plus size={16} />
                  Create new script
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wide text-slate-400">
                      {availableColumns
                        .filter((column) => columns[column.key])
                        .map((column) => (
                          <th
                            key={column.key}
                            className="whitespace-nowrap px-4 py-3 sm:px-5"
                          >
                            {column.label}
                          </th>
                        ))}
                    </tr>
                  </thead>

                  <tbody>
                    {visibleScripts.map((script) => (
                      <tr
                        key={script.id}
                        className="border-b border-slate-50 last:border-0"
                      >
                        {columns.name && (
                          <td className="px-4 py-4 sm:px-5">
                            <div className="flex min-w-[160px] items-center gap-3">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff7a00]">
                                <Code2 size={19} />
                              </span>
                              <div>
                                <p className="font-bold text-slate-900">
                                  {script.name}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                  ID: {script.id}
                                </p>
                              </div>
                            </div>
                          </td>
                        )}

                        {columns.partner && (
                          <td className="whitespace-nowrap px-4 py-4 text-slate-600 sm:px-5">
                            {script.partner}
                          </td>
                        )}

                        {columns.placement && (
                          <td className="whitespace-nowrap px-4 py-4 text-slate-600 sm:px-5">
                            <span className="inline-flex items-center gap-2">
                              <MousePointerClick
                                size={15}
                                className="text-slate-400"
                              />
                              {script.placement}
                            </span>
                          </td>
                        )}

                        {columns.scope && (
                          <td className="whitespace-nowrap px-4 py-4 text-slate-600 sm:px-5">
                            {script.scope}
                          </td>
                        )}

                        {columns.status && (
                          <td className="px-4 py-4 sm:px-5">
                            <span
                              className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
                                statusStyles[script.status]
                              }`}
                            >
                              {script.status}
                            </span>
                          </td>
                        )}

                        {columns.createdAt && (
                          <td className="whitespace-nowrap px-4 py-4 text-slate-500 sm:px-5">
                            {script.createdAt}
                          </td>
                        )}

                        {columns.actions && (
                          <td className="px-4 py-4 sm:px-5">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setViewingScript(script)}
                                title="View script"
                                aria-label={`View ${script.name}`}
                                className="rounded-lg p-2 text-slate-500"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => openEditModal(script)}
                                title="Edit script"
                                aria-label={`Edit ${script.name}`}
                                className="rounded-lg p-2 text-slate-500"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteScript(script)}
                                title="Delete script"
                                aria-label={`Delete ${script.name}`}
                                className="rounded-lg p-2 text-slate-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination />
            </>
          )}
        </section>

        {/* Create / Edit modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setModalOpen(false);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="script-modal-title"
              className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                <div>
                  <h2
                    id="script-modal-title"
                    className="text-xl font-extrabold text-slate-950"
                  >
                    {editingScript
                      ? "Edit tracking script"
                      : "Create tracking script"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Configure the label, placement, and assignment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                  className="rounded-lg p-2 text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={saveScript}>
                <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="script-name"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Script label *
                    </label>
                    <input
                      id="script-name"
                      required
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      placeholder="e.g. Meta conversion pixel"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="script-partner"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Partner
                    </label>
                    <input
                      id="script-partner"
                      value={form.partner}
                      onChange={(event) =>
                        setForm({ ...form, partner: event.target.value })
                      }
                      placeholder="Internal or partner name"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="script-status"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Status
                    </label>
                    <select
                      id="script-status"
                      value={form.status}
                      onChange={(event) =>
                        setForm({ ...form, status: event.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                    >
                      <option>Draft</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="script-placement"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Placement
                    </label>
                    <select
                      id="script-placement"
                      value={form.placement}
                      onChange={(event) =>
                        setForm({ ...form, placement: event.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                    >
                      <option>All pages</option>
                      <option>Thank-you page</option>
                      <option>Lead form</option>
                      <option>Offer page</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="script-scope"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Assignment
                    </label>
                    <select
                      id="script-scope"
                      value={form.scope}
                      onChange={(event) =>
                        setForm({ ...form, scope: event.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                    >
                      <option>Global</option>
                      <option>Category specific</option>
                      <option>Page specific</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="script-code"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Script code / snippet
                    </label>
                    <textarea
                      id="script-code"
                      rows={5}
                      value={form.code}
                      onChange={(event) =>
                        setForm({ ...form, code: event.target.value })
                      }
                      placeholder="Paste your tracking code here..."
                      className="w-full resize-y rounded-lg border border-slate-200 px-3 py-3 font-mono text-xs leading-5 outline-none focus:border-[#ff7a00]"
                    />
                    <p className="mt-1.5 text-xs text-slate-400">
                      Demo only. Saving here does not execute or publish this code.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#ff7a00] px-4 py-2.5 text-sm font-bold text-white"
                  >
                    {editingScript ? "Save changes" : "Create script"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}

        {/* View script modal */}
        {viewingScript && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setViewingScript(null);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="view-script-title"
              className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
                <div className="min-w-0">
                  <h2
                    id="view-script-title"
                    className="break-words text-xl font-extrabold text-slate-950"
                  >
                    {viewingScript.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {viewingScript.partner} · {viewingScript.placement}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingScript(null)}
                  aria-label="Close script details"
                  className="rounded-lg p-2 text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-slate-800">
                    Script snippet
                  </p>
                  <button
                    type="button"
                    onClick={() => copyScript(viewingScript.code)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy code"}
                  </button>
                </div>

                <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                  {viewingScript.code || "No code snippet added."}
                </pre>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span
                    className={`rounded-full px-2.5 py-1 font-semibold ${
                      statusStyles[viewingScript.status]
                    }`}
                  >
                    {viewingScript.status}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                    {viewingScript.scope}
                  </span>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-100 p-4">
                <button
                  type="button"
                  onClick={() => setViewingScript(null)}
                  className="rounded-lg bg-[#ff7a00] px-4 py-2.5 text-sm font-bold text-white"
                >
                  Close
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
