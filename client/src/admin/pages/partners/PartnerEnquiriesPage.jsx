
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Columns3,
  Download,
  Filter,
  Mail,
  MousePointerClick,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

const initialEnquiries = [
  {
    id: 1,
    company: "Evergreen Cover",
    contact: "Maya Chen",
    email: "maya@evergreencover.example",
    phone: "+1 555-010-1001",
    interest: "Home insurance",
    status: "New",
    createdAt: "2026-10-18T09:30:00",
  },
  {
    id: 2,
    company: "Pioneer Finance",
    contact: "Oliver Grant",
    email: "oliver@pioneerfinance.example",
    phone: "+1 555-010-1002",
    interest: "Personal loans",
    status: "In progress",
    createdAt: "2026-10-17T14:15:00",
  },
  {
    id: 3,
    company: "Sunrise Benefits",
    contact: "Ava Brooks",
    email: "ava@sunrisebenefits.example",
    phone: "+1 555-010-1003",
    interest: "Life insurance",
    status: "Qualified",
    createdAt: "2026-10-16T11:45:00",
  },
  {
    id: 4,
    company: "Atlas Card Co.",
    contact: "Noah Patel",
    email: "noah@atlascard.example",
    phone: "+1 555-010-1004",
    interest: "Credit cards",
    status: "In progress",
    createdAt: "2026-10-15T16:20:00",
  },
  {
    id: 5,
    company: "Northstar Lending",
    contact: "Emma Wilson",
    email: "emma@northstar.example",
    phone: "+1 555-010-1005",
    interest: "Mortgage loans",
    status: "New",
    createdAt: "2026-10-14T10:10:00",
  },
  {
    id: 6,
    company: "Brightpath Life",
    contact: "Liam Turner",
    email: "liam@brightpath.example",
    phone: "+1 555-010-1006",
    interest: "Life insurance",
    status: "Qualified",
    createdAt: "2026-10-13T13:00:00",
  },
  {
    id: 7,
    company: "Cedarline Cards",
    contact: "Sophia Martin",
    email: "sophia@cedarline.example",
    phone: "+1 555-010-1007",
    interest: "Credit cards",
    status: "Closed",
    createdAt: "2026-10-12T08:45:00",
  },
  {
    id: 8,
    company: "Harborline Financial",
    contact: "James Cooper",
    email: "james@harborline.example",
    phone: "+1 555-010-1008",
    interest: "Debt consolidation",
    status: "In progress",
    createdAt: "2026-10-11T15:30:00",
  },
  {
    id: 9,
    company: "Oakwood Protection",
    contact: "Isabella Scott",
    email: "isabella@oakwood.example",
    phone: "+1 555-010-1009",
    interest: "Home insurance",
    status: "New",
    createdAt: "2026-10-10T12:10:00",
  },
  {
    id: 10,
    company: "Summit Auto Finance",
    contact: "Ethan Brooks",
    email: "ethan@summitauto.example",
    phone: "+1 555-010-1010",
    interest: "Auto insurance",
    status: "Qualified",
    createdAt: "2026-10-09T09:20:00",
  },
  {
    id: 11,
    company: "Meadow Pet Cover",
    contact: "Amelia Davis",
    email: "amelia@meadowpet.example",
    phone: "+1 555-010-1011",
    interest: "Pet insurance",
    status: "New",
    createdAt: "2026-10-08T10:50:00",
  },
  {
    id: 12,
    company: "Clearview Partners",
    contact: "Lucas Hall",
    email: "lucas@clearview.example",
    phone: "+1 555-010-1012",
    interest: "Personal loans",
    status: "Closed",
    createdAt: "2026-10-07T17:00:00",
  },
];

const columnDefinitions = [
  { key: "company", label: "Company" },
  { key: "contact", label: "Full name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "interest", label: "Interested in" },
  { key: "createdAt", label: "Created at" },
  { key: "status", label: "Status" },
];

const statusStyles = {
  New: "bg-sky-50 text-sky-700",
  "In progress": "bg-amber-50 text-amber-700",
  Qualified: "bg-emerald-50 text-emerald-700",
  Closed: "bg-slate-100 text-slate-600",
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

export default function PartnerEnquiriesPage() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [sort, setSort] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columnDefinitions.map((column) => column.key)
  );

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return enquiries
      .filter((item) => {
        const matchesSearch =
          !query ||
          [
            item.company,
            item.contact,
            item.email,
            item.phone,
            item.interest,
            item.status,
          ].some((value) => value.toLowerCase().includes(query));

        const matchesStatus =
          statusFilter === "All statuses" ||
          item.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let first = a[sort.key];
        let second = b[sort.key];

        if (sort.key === "createdAt") {
          first = new Date(first).getTime();
          second = new Date(second).getTime();
        } else {
          first = String(first).toLowerCase();
          second = String(second).toLowerCase();
        }

        let result = 0;

        if (first < second) result = -1;
        if (first > second) result = 1;

        return sort.direction === "asc" ? result : -result;
      });
  }, [enquiries, search, statusFilter, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEnquiries.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEnquiries.slice(start, start + pageSize);
  }, [filteredEnquiries, currentPage, pageSize]);

  const pageIds = pageItems.map((item) => item.id);

  const allPageSelected =
    pageIds.length > 0 &&
    pageIds.every((id) => selectedIds.includes(id));

  const somePageSelected = pageIds.some((id) =>
    selectedIds.includes(id)
  );

  const selectedCount = selectedIds.filter((id) =>
    enquiries.some((item) => item.id === id)
  ).length;

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, pageSize]);

  function toggleSort(key) {
    setSort((previous) => ({
      key,
      direction:
        previous.key === key && previous.direction === "asc"
          ? "desc"
          : "asc",
    }));
  }

  function toggleRow(id) {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  }

  function togglePageSelection() {
    setSelectedIds((previous) => {
      if (allPageSelected) {
        return previous.filter((id) => !pageIds.includes(id));
      }

      return [...new Set([...previous, ...pageIds])];
    });
  }

  function toggleColumn(key) {
    setVisibleColumns((previous) => {
      if (previous.includes(key)) {
        if (previous.length === 1) return previous;
        return previous.filter((column) => column !== key);
      }

      return [
        ...previous,
        key,
      ];
    });
  }

  function exportSelected() {
    const rows =
      selectedCount > 0
        ? enquiries.filter((item) => selectedIds.includes(item.id))
        : filteredEnquiries;

    const headers = columnDefinitions.map((column) => column.label);

    const escapeCsv = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csvRows = rows.map((item) =>
      columnDefinitions
        .map(({ key }) =>
          escapeCsv(
            key === "createdAt"
              ? formatDate(item[key])
              : item[key]
          )
        )
        .join(",")
    );

    const csv = [headers.map(escapeCsv).join(","), ...csvRows].join(
      "\r\n"
    );

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "partner-enquiries.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  const newCount = enquiries.filter(
    (item) => item.status === "New"
  ).length;

  const inProgressCount = enquiries.filter(
    (item) => item.status === "In progress"
  ).length;

  const qualifiedCount = enquiries.filter(
    (item) => item.status === "Qualified"
  ).length;

  const startItem =
    filteredEnquiries.length === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    filteredEnquiries.length
  );

  function renderCell(item, key) {
    switch (key) {
      case "company":
        return (
          <span className="font-semibold text-slate-900">
            {item.company}
          </span>
        );

      case "contact":
        return (
          <span className="font-medium text-slate-800">
            {item.contact}
          </span>
        );

      case "email":
        return (
          <a
            href={`mailto:${item.email}`}
            className="text-slate-600 underline-offset-2 hover:underline"
          >
            {item.email}
          </a>
        );

      case "phone":
        return (
          <a
            href={`tel:${item.phone}`}
            className="text-slate-600"
          >
            {item.phone}
          </a>
        );

      case "interest":
        return <span className="text-slate-600">{item.interest}</span>;

      case "createdAt":
        return (
          <span className="whitespace-nowrap text-slate-600">
            {formatDate(item.createdAt)}
          </span>
        );

      case "status":
        return (
          <span
            className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
              statusStyles[item.status]
            }`}
          >
            {item.status}
          </span>
        );

      default:
        return null;
    }
  }

  return (
    <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Page heading */}
        <header className="mb-6 flex items-start gap-3 sm:gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00] sm:h-14 sm:w-14">
            <Mail size={25} />
          </span>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff7a00] sm:text-xs">
              Partners &amp; Tracking
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Partner Enquiries
            </h1>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage and review submissions from businesses interested
              in partnering with your platform.
            </p>
          </div>
        </header>

        {/* Demo notice */}
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-3 text-sm text-orange-900 sm:p-4">
          <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ff7a00]">
            Demo
          </span>

          <p className="leading-5">
            Sample enquiry records are used for this page preview.
            Changes are held in the current page session and are not
            saved to a backend.
          </p>
        </div>

        {/* Summary cards */}
        <section
          className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Partner enquiry summary"
        >
          {[
            {
              value: enquiries.length,
              label: "Total enquiries",
              Icon: Users,
            },
            {
              value: newCount,
              label: "New enquiries",
              Icon: Mail,
            },
            {
              value: inProgressCount,
              label: "In progress",
              Icon: Activity,
            },
            {
              value: qualifiedCount,
              label: "Qualified",
              Icon: MousePointerClick,
            },
          ].map(({ value, label, Icon }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.04)] sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-2xl font-extrabold text-slate-950">
                  {value}
                </p>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#ff7a00]">
                  <Icon size={19} />
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </article>
          ))}
        </section>

        {/* Enquiries table */}
        <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.04)]">
          {/* Panel heading */}
          <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="font-extrabold text-slate-950">
                All partner enquiries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search, filter, sort, and export enquiry records.
              </p>
            </div>

            <button
              type="button"
              onClick={exportSelected}
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d96600] sm:self-auto"
            >
              <Download size={16} />
              {selectedCount > 0 ? "Export selected" : "Export CSV"}
            </button>
          </div>

          {/* Search and controls */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by company, contact, email, phone..."
                  aria-label="Search partner enquiries"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Status filter */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setFiltersOpen((value) => !value);
                      setColumnsOpen(false);
                    }}
                    aria-expanded={filtersOpen}
                    className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium ${
                      statusFilter !== "All statuses"
                        ? "border-orange-200 bg-orange-50 text-[#ff7a00]"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <Filter size={15} />
                    Filters
                    <ChevronDown size={15} />
                  </button>

                  {filtersOpen && (
                    <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                        Filter by status
                      </p>

                      <select
                        value={statusFilter}
                        onChange={(event) =>
                          setStatusFilter(event.target.value)
                        }
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#ff7a00]"
                      >
                        <option>All statuses</option>
                        <option>New</option>
                        <option>In progress</option>
                        <option>Qualified</option>
                        <option>Closed</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          setStatusFilter("All statuses");
                          setFiltersOpen(false);
                        }}
                        className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Column visibility */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setColumnsOpen((value) => !value);
                      setFiltersOpen(false);
                    }}
                    aria-expanded={columnsOpen}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700"
                  >
                    <Columns3 size={16} />
                    Columns
                    <ChevronDown size={15} />
                  </button>

                  {columnsOpen && (
                    <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Visible columns
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            setVisibleColumns(
                              columnDefinitions.map(
                                (column) => column.key
                              )
                            )
                          }
                          className="text-xs font-semibold text-[#ff7a00]"
                        >
                          Reset
                        </button>
                      </div>

                      <div className="space-y-3">
                        {columnDefinitions.map((column) => (
                          <label
                            key={column.key}
                            className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                          >
                            <input
                              type="checkbox"
                              checked={visibleColumns.includes(column.key)}
                              disabled={
                                visibleColumns.length === 1 &&
                                visibleColumns.includes(column.key)
                              }
                              onChange={() => toggleColumn(column.key)}
                              className="h-4 w-4 accent-[#ff7a00]"
                            />
                            {column.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(search || statusFilter !== "All statuses") && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <SlidersHorizontal size={14} />

                <span>
                  Showing {filteredEnquiries.length} matching record
                  {filteredEnquiries.length !== 1 ? "s" : ""}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All statuses");
                  }}
                  className="font-semibold text-[#ff7a00]"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Selection feedback */}
          {selectedCount > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-100 bg-orange-50 px-4 py-3 text-sm sm:px-5">
              <p className="font-medium text-orange-900">
                {selectedCount} record{selectedCount !== 1 ? "s" : ""}{" "}
                selected
              </p>

              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="font-semibold text-[#ff7a00]"
              >
                Clear selection
              </button>
            </div>
          )}

          {/* Responsive table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allPageSelected}
                      ref={(element) => {
                        if (element) {
                          element.indeterminate =
                            somePageSelected && !allPageSelected;
                        }
                      }}
                      onChange={togglePageSelection}
                      aria-label="Select all enquiries on this page"
                      className="h-4 w-4 cursor-pointer accent-[#ff7a00]"
                    />
                  </th>

                  {columnDefinitions
                    .filter((column) =>
                      visibleColumns.includes(column.key)
                    )
                    .map((column) => {
                      const isSorted = sort.key === column.key;

                      return (
                        <th
                          key={column.key}
                          aria-sort={
                            isSorted
                              ? sort.direction === "asc"
                                ? "ascending"
                                : "descending"
                              : "none"
                          }
                          className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400"
                        >
                          <button
                            type="button"
                            onClick={() => toggleSort(column.key)}
                            className="inline-flex items-center gap-1.5 text-left transition-colors hover:text-slate-700"
                          >
                            {column.label}

                            {isSorted ? (
                              sort.direction === "asc" ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )
                            ) : (
                              <ChevronsUpDown
                                size={14}
                                className="text-slate-300"
                              />
                            )}
                          </button>
                        </th>
                      );
                    })}
                </tr>
              </thead>

              <tbody>
                {pageItems.map((item, index) => {
                  const selected = selectedIds.includes(item.id);

                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-slate-100 last:border-0 ${
                        selected
                          ? "bg-orange-50/70"
                          : index % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleRow(item.id)}
                          aria-label={`Select ${item.company}`}
                          className="h-4 w-4 cursor-pointer accent-[#ff7a00]"
                        />
                      </td>

                      {columnDefinitions
                        .filter((column) =>
                          visibleColumns.includes(column.key)
                        )
                        .map((column) => (
                          <td
                            key={column.key}
                            className="whitespace-nowrap px-4 py-4"
                          >
                            {renderCell(item, column.key)}
                          </td>
                        ))}
                    </tr>
                  );
                })}

                {pageItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={visibleColumns.length + 1}
                      className="px-4 py-16 text-center"
                    >
                      <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <Search size={21} />
                      </span>

                      <p className="font-bold text-slate-900">
                        No enquiries found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try another search term or clear your filters.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("All statuses");
                        }}
                        className="mt-4 text-sm font-semibold text-[#ff7a00]"
                      >
                        Reset search and filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {startItem}–{endItem}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {filteredEnquiries.length}
              </span>{" "}
              enquiries
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <label
                htmlFor="enquiry-page-size"
                className="text-sm text-slate-500"
              >
                Rows per page
              </label>

              <select
                id="enquiry-page-size"
                value={pageSize}
                onChange={(event) =>
                  setPageSize(Number(event.target.value))
                }
                className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 outline-none focus:border-[#ff7a00]"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <span className="mx-1 text-sm text-slate-500">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() =>
                  setPage((previous) => Math.max(1, previous - 1))
                }
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((previous) =>
                    Math.min(totalPages, previous + 1)
                  )
                }
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <p className="mt-4 text-xs leading-5 text-slate-400">
          Demo mode: search, filters, sorting, selection, pagination, and
          CSV export work with the sample records in this page. Connect
          your backend to load and manage real partner enquiries.
        </p>
      </div>
    </main>
  );
}
