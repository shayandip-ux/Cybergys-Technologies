
import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Columns3,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Check,
  X,
  Layers,
} from "lucide-react";

const initialUsers = [
  { id: 1, name: "Alex Morgan", email: "alex.morgan@example.com", role: "Administrator", status: "Active", updatedAt: "2026-10-19T09:42:00" },
  { id: 2, name: "Jamie Chen", email: "jamie.chen@example.com", role: "Editor", status: "Active", updatedAt: "2026-10-19T08:15:00" },
  { id: 3, name: "Taylor Brooks", email: "taylor.brooks@example.com", role: "Content Manager", status: "Invited", updatedAt: "2026-10-18T12:30:00" },
  { id: 4, name: "Jordan Patel", email: "jordan.patel@example.com", role: "Analyst", status: "Inactive", updatedAt: "2026-10-12T10:00:00" },
  { id: 5, name: "Morgan Lee", email: "morgan.lee@example.com", role: "Editor", status: "Active", updatedAt: "2026-10-11T14:25:00" },
  { id: 6, name: "Casey Williams", email: "casey.williams@example.com", role: "Content Manager", status: "Active", updatedAt: "2026-10-10T11:10:00" },
  { id: 7, name: "Riley James", email: "riley.james@example.com", role: "Analyst", status: "Invited", updatedAt: "2026-10-09T15:40:00" },
  { id: 8, name: "Avery Thomas", email: "avery.thomas@example.com", role: "Editor", status: "Inactive", updatedAt: "2026-10-08T09:20:00" },
  { id: 9, name: "Drew Martin", email: "drew.martin@example.com", role: "Administrator", status: "Active", updatedAt: "2026-10-07T13:00:00" },
  { id: 10, name: "Sam Taylor", email: "sam.taylor@example.com", role: "Analyst", status: "Active", updatedAt: "2026-10-06T10:35:00" },
  { id: 11, name: "Robin Clark", email: "robin.clark@example.com", role: "Editor", status: "Active", updatedAt: "2026-10-05T16:00:00" },
  { id: 12, name: "Cameron Scott", email: "cameron.scott@example.com", role: "Content Manager", status: "Active", updatedAt: "2026-10-04T12:45:00" },
];

const initialColumns = {
  email: true,
  name: true,
  role: true,
  status: true,
  updatedAt: true,
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Invited: "bg-amber-50 text-amber-700",
  Inactive: "bg-slate-100 text-slate-600",
};

const formatDate = (value) =>
  new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [columns, setColumns] = useState(initialColumns);
  const [sort, setSort] = useState({ key: "name", direction: "asc" });
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Editor",
    status: "Active",
  });

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users
      .filter((user) => {
        const matchesSearch =
          !query ||
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query);

        return (
          matchesSearch &&
          (roleFilter === "All" || user.role === roleFilter) &&
          (statusFilter === "All" || user.status === statusFilter)
        );
      })
      .sort((a, b) => {
        const first = a[sort.key];
        const second = b[sort.key];
        const comparison =
          sort.key === "updatedAt"
            ? new Date(first) - new Date(second)
            : String(first).localeCompare(String(second));

        return sort.direction === "asc" ? comparison : -comparison;
      });
  }, [users, search, roleFilter, statusFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  const allSelected =
    pageUsers.length > 0 &&
    pageUsers.every((user) => selectedUsers.includes(user.id));

  const openCreateModal = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", role: "Editor", status: "Active" });
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setFormError("");
    setShowModal(true);
  };

  const saveUser = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      setFormError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (
      users.some(
        (user) =>
          user.email.toLowerCase() === email &&
          user.id !== editingUser?.id
      )
    ) {
      setFormError("A user with this email already exists.");
      return;
    }

    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? { ...user, name, email, role: form.role, status: form.status, updatedAt: new Date().toISOString() }
            : user
        )
      );
    } else {
      setUsers((previous) => [
        {
          id: Date.now(),
          name,
          email,
          role: form.role,
          status: form.status,
          updatedAt: new Date().toISOString(),
        },
        ...previous,
      ]);
    }

    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
    setSort({ key: "updatedAt", direction: "desc" });
    setPage(1);
    setShowModal(false);
    setEditingUser(null);
    setFormError("");
  };

  const toggleSort = (key) => {
    setSort((previous) => ({
      key,
      direction:
        previous.key === key && previous.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const toggleSelection = (id) => {
    setSelectedUsers((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleAll = () => {
    const visibleIds = pageUsers.map((user) => user.id);

    setSelectedUsers((previous) =>
      allSelected
        ? previous.filter((id) => !visibleIds.includes(id))
        : [...new Set([...previous, ...visibleIds])]
    );
  };

  const deleteUser = (user) => {
    if (!window.confirm(`Delete ${user.name} from the demo list?`)) return;

    setUsers((previous) => previous.filter((item) => item.id !== user.id));
    setSelectedUsers((previous) => previous.filter((id) => id !== user.id));
  };

  const deleteSelected = () => {
    if (
      !window.confirm(
        `Delete ${selectedUsers.length} selected demo user(s)?`
      )
    ) return;

    setUsers((previous) =>
      previous.filter((user) => !selectedUsers.includes(user.id))
    );
    setSelectedUsers([]);
    setPage(1);
  };

  const SortButton = ({ label, column }) => (
    <button
      type="button"
      onClick={() => toggleSort(column)}
      className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-[#ff7a00]"
    >
      {label}
      {sort.key === column ? (
        sort.direction === "asc" ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        )
      ) : (
        <ChevronsUpDown size={13} className="text-slate-400" />
      )}
    </button>
  );

  return (
    <main className="min-h-[calc(100vh-61px)] w-full min-w-0 overflow-x-clip bg-[#fff9fa] px-3 py-5 sm:px-5 md:px-6 lg:px-7">
      <div className="mx-auto w-full min-w-0 max-w-[1600px]">
        {/* Page heading */}
        <header className="mb-5 flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#ff7a00]">
            <Users size={27} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff7a00]">
              Admin
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Users
            </h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Review and manage dashboard user accounts and access.
            </p>
          </div>
        </header>

        {/* Notice */}
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-3.5 text-sm text-orange-900 sm:items-center sm:px-4">
          <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ff7a00]">
            Admin
          </span>
          <p>
            Changes are saved in this browser only. Connect this page to your
            API to share updates with other admins.
          </p>
        </div>

        {/* Directory panel */}
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_4px_18px_rgba(15,23,42,0.05)] sm:p-5 lg:p-6">
          {/* Directory heading and controls */}
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">
                User directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {users.length} users · Manage account access and roles
              </p>
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <label className="flex h-10 min-w-[150px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-400 sm:min-w-[210px] xl:max-w-[270px]">
                <Search size={16} className="shrink-0" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search users"
                  aria-label="Search users"
                  className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === "filters" ? null : "filters")}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <SlidersHorizontal size={15} />
                  <span>Filters</span>
                  <ChevronDown size={14} />
                </button>

                {openMenu === "filters" && (
                  <div className="absolute right-0 z-30 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                      Role
                    </label>
                    <select
                      value={roleFilter}
                      onChange={(event) => {
                        setRoleFilter(event.target.value);
                        setPage(1);
                      }}
                      className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                    >
                      <option value="All">All roles</option>
                      {[...new Set(users.map((user) => user.role))].map((role) => (
                        <option key={role}>{role}</option>
                      ))}
                    </select>

                    <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(event) => {
                        setStatusFilter(event.target.value);
                        setPage(1);
                      }}
                      className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                    >
                      <option value="All">All statuses</option>
                      {[...new Set(users.map((user) => user.status))].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        setRoleFilter("All");
                        setStatusFilter("All");
                        setPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === "columns" ? null : "columns")}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Columns3 size={15} />
                  <span>Columns</span>
                  <ChevronDown size={14} />
                </button>

                {openMenu === "columns" && (
                  <div className="absolute right-0 z-30 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    {[
                      ["email", "Email"],
                      ["name", "Name"],
                      ["role", "Role"],
                      ["status", "Status"],
                      ["updatedAt", "Updated At"],
                    ].map(([key, label]) => (
                      <label
                        key={key}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-orange-50"
                      >
                        <input
                          type="checkbox"
                          checked={columns[key]}
                          onChange={() =>
                            setColumns((previous) => ({
                              ...previous,
                              [key]: !previous[key],
                            }))
                          }
                          className="accent-[#ff7a00]"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d96600] focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <Plus size={17} />
                <span>Add user</span>
              </button>
            </div>
          </div>

          {/* Selection actions */}
          {selectedUsers.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-900">
              <span>
                {selectedUsers.length} user{selectedUsers.length !== 1 && "s"} selected
              </span>
              <button
                type="button"
                onClick={deleteSelected}
                className="inline-flex items-center gap-2 font-semibold hover:text-red-700"
              >
                <Trash2 size={15} />
                Delete selected
              </button>
            </div>
          )}

          {/* Responsive table */}
          <div className="w-full min-w-0 overflow-x-auto rounded-lg">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="bg-white">
                  <th className="w-12 border-b border-slate-200 px-4 py-4">
                    <input
                      type="checkbox"
                      aria-label="Select all users on this page"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-5 w-5 cursor-pointer accent-[#ff7a00]"
                    />
                  </th>

                  {columns.email && (
                    <th className="border-b border-slate-200 px-4 py-4">
                      <SortButton label="Email" column="email" />
                    </th>
                  )}
                  {columns.name && (
                    <th className="border-b border-slate-200 px-4 py-4">
                      <SortButton label="Name" column="name" />
                    </th>
                  )}
                  {columns.role && (
                    <th className="border-b border-slate-200 px-4 py-4">
                      <SortButton label="Role" column="role" />
                    </th>
                  )}
                  {columns.status && (
                    <th className="border-b border-slate-200 px-4 py-4">
                      <SortButton label="Status" column="status" />
                    </th>
                  )}
                  {columns.updatedAt && (
                    <th className="border-b border-slate-200 px-4 py-4">
                      <SortButton label="Updated At" column="updatedAt" />
                    </th>
                  )}
                  <th className="border-b border-slate-200 px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {pageUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`transition-colors hover:bg-orange-50/60 ${
                      index % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
                    }`}
                  >
                    <td className="border-b border-slate-100 px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelection(user.id)}
                        aria-label={`Select ${user.name}`}
                        className="h-5 w-5 cursor-pointer accent-[#ff7a00]"
                      />
                    </td>

                    {columns.email && (
                      <td className="border-b border-slate-100 px-4 py-4">
                        <a
                          href={`mailto:${user.email}`}
                          className="break-words text-slate-900 underline decoration-slate-400 underline-offset-2 hover:text-[#ff7a00]"
                        >
                          {user.email}
                        </a>
                      </td>
                    )}
                    {columns.name && (
                      <td className="border-b border-slate-100 px-4 py-4 font-medium text-slate-900">
                        {user.name}
                      </td>
                    )}
                    {columns.role && (
                      <td className="border-b border-slate-100 px-4 py-4 text-slate-700">
                        {user.role}
                      </td>
                    )}
                    {columns.status && (
                      <td className="border-b border-slate-100 px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            statusStyles[user.status]
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                    )}
                    {columns.updatedAt && (
                      <td className="whitespace-nowrap border-b border-slate-100 px-4 py-4 text-slate-700">
                        {formatDate(user.updatedAt)}
                      </td>
                    )}
                    <td className="border-b border-slate-100 px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(user)}
                          aria-label={`Edit ${user.name}`}
                          title="Edit user"
                          className="rounded-md p-2 text-slate-500 hover:bg-orange-100 hover:text-[#ff7a00]"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteUser(user)}
                          aria-label={`Delete ${user.name}`}
                          title="Delete user"
                          className="rounded-md p-2 text-slate-500 hover:bg-orange-100 hover:text-[#ff7a00]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pageUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={1 + Object.values(columns).filter(Boolean).length + 1}
                      className="px-4 py-14 text-center"
                    >
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <Search size={28} className="mb-3 text-slate-300" />
                        <p className="font-semibold text-slate-900">No users found</p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try another search or adjust your filters.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setRoleFilter("All");
                            setStatusFilter("All");
                            setPage(1);
                          }}
                          className="mt-3 text-sm font-semibold text-[#ff7a00] hover:underline"
                        >
                          Clear search and filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <footer className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredUsers.length === 0 ? 0 : startIndex + 1}–
                {Math.min(startIndex + pageSize, filteredUsers.length)}
              </span>{" "}
              of <span className="font-semibold text-slate-900">{filteredUsers.length}</span>
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setRoleFilter("All");
                  setStatusFilter("All");
                  setPage(1);
                }}
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View all
              </button>

              <label className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm text-slate-700">
                <select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setPage(1);
                  }}
                  className="max-w-full bg-transparent outline-none"
                  aria-label="Users per page"
                >
                  {[6, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size} / page
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => setPage((previous) => Math.max(1, previous - 1))}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="min-w-12 text-center text-sm text-slate-600">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </footer>
        </section>

        {/* Category-style footer note */}
        <aside className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.04)] sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#ff7a00]">
              <Layers size={18} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">User management</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Create, review, and manage sample user records here. This demo
                does not create real accounts or send invitations.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Create / edit modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
              setFormError("");
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-modal-title"
            className="my-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff7a00]">
                  Admin
                </p>
                <h2
                  id="user-modal-title"
                  className="mt-1 text-xl font-extrabold text-slate-950"
                >
                  {editingUser ? "Edit user" : "Add user"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editingUser
                    ? "Update this demo user's details."
                    : "Add a new user to the demo directory."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setFormError("");
                }}
                className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#ff7a00]"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveUser} className="space-y-4">
              <div>
                <label htmlFor="user-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Full name
                </label>
                <input
                  id="user-name"
                  autoFocus
                  value={form.name}
                  onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="user-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <input
                  id="user-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
                  placeholder="name@example.com"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="user-role" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Role
                  </label>
                  <select
                    id="user-role"
                    value={form.role}
                    onChange={(event) => setForm((previous) => ({ ...previous, role: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                  >
                    <option>Administrator</option>
                    <option>Editor</option>
                    <option>Content Manager</option>
                    <option>Analyst</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="user-status" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    id="user-status"
                    value={form.status}
                    onChange={(event) => setForm((previous) => ({ ...previous, status: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#ff7a00]"
                  >
                    <option>Active</option>
                    <option>Invited</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              {formError && (
                <p role="alert" className="rounded-lg border border-orange-100 bg-orange-50 px-3 py-2.5 text-sm text-orange-800">
                  {formError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormError("");
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d96600]"
                >
                  <Check size={16} />
                  {editingUser ? "Save changes" : "Add user"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
