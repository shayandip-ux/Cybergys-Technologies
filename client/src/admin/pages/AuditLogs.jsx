import { useEffect, useState } from "react";
import { getApi } from "../../lib/api.js";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => { getApi("/api/admin/audit-logs").then(setLogs).catch((reason) => setError(reason.message)); }, []);

  return <main className="p-4 sm:p-6">
    <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ff7a00]">Administration</p>
    <h1 className="mt-1 text-3xl font-black text-slate-950">Activity log</h1>
    <p className="mt-2 text-sm text-slate-500">Recent administrative changes and publishing activity.</p>
    {error ? <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">When</th><th className="px-4 py-3">Admin</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">Content</th><th className="px-4 py-3">IP address</th></tr></thead>
        <tbody className="divide-y divide-slate-100">{logs.map((log) => <tr key={log.id}><td className="whitespace-nowrap px-4 py-3 text-slate-500">{new Date(log.created_at).toLocaleString()}</td><td className="px-4 py-3 font-medium text-slate-800">{log.admin_name ?? log.admin_email ?? "System"}</td><td className="px-4 py-3"><span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold capitalize text-[#d96600]">{log.action}</span></td><td className="px-4 py-3 capitalize text-slate-600">{log.entity_type?.replaceAll("_", " ") ?? "—"}</td><td className="px-4 py-3 text-slate-500">{log.ip_address ?? "—"}</td></tr>)}{!logs.length && <tr><td colSpan="5" className="px-4 py-10 text-center text-slate-500">No activity recorded yet.</td></tr>}</tbody>
      </table>
    </div>}
  </main>;
}
