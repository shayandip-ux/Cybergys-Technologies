
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Handshake,
  Users,
  Search,
  Grid2X2,
  List,
  Plus,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const initialPartners = [
  {
    id: 1,
    name: "Northstar Lending",
    contact: "partners@northstar.example",
    offers: 8,
    status: "Active",
  },
  {
    id: 2,
    name: "Brightpath Life",
    contact: "hello@brightpath.example",
    offers: 5,
    status: "Active",
  },
  {
    id: 3,
    name: "Cedarline Cards",
    contact: "team@cedarline.example",
    offers: 3,
    status: "Pending review",
  },
  {
    id: 4,
    name: "Harborline Financial",
    contact: "connect@harborline.example",
    offers: 6,
    status: "Active",
  },
  {
    id: 5,
    name: "Evergreen Insurance",
    contact: "hello@evergreen.example",
    offers: 4,
    status: "Active",
  },
  {
    id: 6,
    name: "Summit Mortgage",
    contact: "contact@summit.example",
    offers: 7,
    status: "Pending review",
  },
  {
    id: 7,
    name: "Clearview Finance",
    contact: "team@clearview.example",
    offers: 2,
    status: "Active",
  },
  {
    id: 8,
    name: "Bluepeak Protection",
    contact: "partners@bluepeak.example",
    offers: 5,
    status: "Inactive",
  },
  {
    id: 9,
    name: "Oakline Financial",
    contact: "info@oakline.example",
    offers: 3,
    status: "Active",
  },
  {
    id: 10,
    name: "Horizon Cover",
    contact: "hello@horizon.example",
    offers: 6,
    status: "Pending review",
  },
  {
    id: 11,
    name: "Silverstone Lending",
    contact: "team@silverstone.example",
    offers: 4,
    status: "Active",
  },
  {
    id: 12,
    name: "Redwood Partners",
    contact: "contact@redwood.example",
    offers: 9,
    status: "Inactive",
  },
];

const badgeStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  "Pending review": "bg-amber-50 text-amber-700",
  Inactive: "bg-slate-100 text-slate-600",
};

export default function PartnersPage() {
  const [partners, setPartners] = useState(initialPartners);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    offers: 0,
    status: "Active",
  });

  const filteredPartners = useMemo(() => {
    const term = search.trim().toLowerCase();

    return partners.filter((partner) => {
      const matchesSearch =
        !term ||
        partner.name.toLowerCase().includes(term) ||
        partner.contact.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All statuses" ||
        partner.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [partners, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPartners.length / itemsPerPage)
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedPartners = filteredPartners.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const startItem =
    filteredPartners.length === 0 ? 0 : startIndex + 1;

  const endItem = Math.min(
    startIndex + itemsPerPage,
    filteredPartners.length
  );

  const activeCount = partners.filter(
    (partner) => partner.status === "Active"
  ).length;

  const pendingCount = partners.filter(
    (partner) => partner.status === "Pending review"
  ).length;

  const changePage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const openAddModal = () => {
    setEditingPartner(null);
    setFormData({
      name: "",
      contact: "",
      offers: 0,
      status: "Active",
    });
    setShowModal(true);
  };

  const openEditModal = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      contact: partner.contact,
      offers: partner.offers,
      status: partner.status,
    });
    setShowModal(true);
  };

  const handleSavePartner = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const contact = formData.contact.trim();

    if (!name || !contact) return;

    if (editingPartner) {
      setPartners((previous) =>
        previous.map((partner) =>
          partner.id === editingPartner.id
            ? {
                ...partner,
                ...formData,
                name,
                contact,
                offers: Math.max(0, Number(formData.offers) || 0),
              }
            : partner
        )
      );
    } else {
      setPartners((previous) => [
        ...previous,
        {
          ...formData,
          id: Date.now(),
          name,
          contact,
          offers: Math.max(0, Number(formData.offers) || 0),
        },
      ]);
      setCurrentPage(1);
    }

    setShowModal(false);
  };

  const deletePartner = (id) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) {
      return;
    }

    setPartners((previous) =>
      previous.filter((partner) => partner.id !== id)
    );
  };

  const toggleStatus = (partner) => {
    const nextStatus =
      partner.status === "Active" ? "Inactive" : "Active";

    setPartners((previous) =>
      previous.map((item) =>
        item.id === partner.id
          ? { ...item, status: nextStatus }
          : item
      )
    );
  };

  const Pagination = () => (
    <footer className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-4">
        <p>
          Showing{" "}
          <span className="font-bold text-slate-900">
            {startItem}–{endItem}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-900">
            {filteredPartners.length}
          </span>
        </p>

        <label className="flex items-center gap-2">
          <span>Per page</span>
          <select
            value={itemsPerPage}
            onChange={(event) =>
              setItemsPerPage(Number(event.target.value))
            }
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-[#ff7a00]"
          >
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => changePage(page)}
              aria-label={`Go to page ${page}`}
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
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </footer>
  );

  return (
    <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <header className="mb-5 flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00]">
            <Handshake size={26} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff7a00]">
              Partners &amp; Tracking
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Partners
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500 sm:text-base">
              Manage the businesses and referral partners connected to your offers.
            </p>
          </div>
        </header>

        <div className="mb-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-900">
          <span className="mt-0.5 shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ff7a00]">
            Demo
          </span>
          <p>
            Sample partner information for understanding this page. Changes are
            stored only in this page&apos;s React state and are not saved to a
            database.
          </p>
        </div>

        <section className="mb-5 grid grid-cols-3 gap-2 sm:gap-3" aria-label="Partner summary">
          {[
            [partners.length, "Total partners", Users],
            [activeCount, "Active", Activity],
            [pendingCount, "Pending review", Activity],
          ].map(([value, label, Icon]) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                <Icon size={19} className="text-[#ff7a00]" />
              </div>
              <p className="mt-1 text-sm text-slate-500 max-sm:text-[12px]">{label}</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 sm:px-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-extrabold text-slate-950">Partner directory</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredPartners.length} matching partners
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="relative min-w-0 sm:min-w-[220px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search partners"
                  aria-label="Search partners"
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#ff7a00]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by status"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#ff7a00]"
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Pending review</option>
                <option>Inactive</option>
              </select>

              <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-1">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  className={`rounded-md p-2 ${
                    view === "grid"
                      ? "bg-orange-50 text-[#ff7a00]"
                      : "text-slate-500"
                  }`}
                >
                  <Grid2X2 size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  className={`rounded-md p-2 ${
                    view === "list"
                      ? "bg-orange-50 text-[#ff7a00]"
                      : "text-slate-500"
                  }`}
                >
                  <List size={17} />
                </button>
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-4 py-2.5 text-sm font-bold text-white"
              >
                <Plus size={17} />
                Add partner
              </button>
            </div>
          </div>

          {paginatedPartners.length === 0 ? (
            <div className="px-4 py-16 text-center sm:px-6">
              <Users size={34} className="mx-auto text-slate-300" />
              <h3 className="mt-3 font-bold text-slate-900">
                No partners found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try a different search or status filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All statuses");
                }}
                className="mt-4 text-sm font-semibold text-[#ff7a00]"
              >
                Clear filters
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 2xl:grid-cols-3">
              {paginatedPartners.map((partner) => (
                <article
                  key={partner.id}
                  className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-orange-200 bg-orange-50 text-[#ff7a00]">
                      <Handshake size={23} />
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        badgeStyles[partner.status]
                      }`}
                    >
                      {partner.status}
                    </span>
                  </div>

                  <h3 className="mt-4 break-words font-bold text-slate-950">
                    {partner.name}
                  </h3>
                  <p className="mt-1 break-all text-sm text-slate-500">
                    {partner.contact}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-500">
                      <span className="font-bold text-slate-900">
                        {partner.offers}
                      </span>{" "}
                      offers
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => toggleStatus(partner)}
                        title={
                          partner.status === "Active"
                            ? "Deactivate partner"
                            : "Activate partner"
                        }
                        aria-label={`Change status for ${partner.name}`}
                        className="rounded-md p-2 text-slate-500"
                      >
                        {partner.status === "Active" ? (
                          <X size={16} />
                        ) : (
                          <Activity size={16} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditModal(partner)}
                        title="Edit partner"
                        aria-label={`Edit ${partner.name}`}
                        className="rounded-md p-2 text-slate-500"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePartner(partner.id)}
                        title="Delete partner"
                        aria-label={`Delete ${partner.name}`}
                        className="rounded-md p-2 text-slate-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
                    {["Partner", "Contact", "Offers", "Status", "Actions"].map(
                      (column) => (
                        <th key={column} className="px-4 py-3 sm:px-5">
                          {column}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedPartners.map((partner) => (
                    <tr
                      key={partner.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="px-4 py-4 font-bold text-slate-900 sm:px-5">
                        {partner.name}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {partner.contact}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {partner.offers}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            badgeStyles[partner.status]
                          }`}
                        >
                          {partner.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditModal(partner)}
                            aria-label={`Edit ${partner.name}`}
                            className="rounded-md p-2 text-slate-500"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePartner(partner.id)}
                            aria-label={`Delete ${partner.name}`}
                            className="rounded-md p-2 text-slate-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Pagination />
        </section>

        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="partner-modal-title"
              className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2
                  id="partner-modal-title"
                  className="text-xl font-extrabold text-slate-950"
                >
                  {editingPartner ? "Edit partner" : "Add partner"}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  aria-label="Close modal"
                  className="rounded-lg p-2 text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSavePartner} className="space-y-4">
                <div>
                  <label
                    htmlFor="partner-name"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Partner name
                  </label>
                  <input
                    id="partner-name"
                    required
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter partner name"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="partner-contact"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Contact email
                  </label>
                  <input
                    id="partner-contact"
                    type="email"
                    required
                    value={formData.contact}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        contact: event.target.value,
                      })
                    }
                    placeholder="name@company.com"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="partner-offers"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Number of offers
                  </label>
                  <input
                    id="partner-offers"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.offers}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        offers: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="partner-status"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Status
                  </label>
                  <select
                    id="partner-status"
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        status: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                  >
                    <option>Active</option>
                    <option>Pending review</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#ff7a00] px-4 py-2.5 text-sm font-bold text-white"
                  >
                    {editingPartner ? "Save changes" : "Add partner"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
