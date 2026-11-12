import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, Clock3, FileText, Layers3, Mail, MessageSquareQuote, MonitorCog, RefreshCw, Send, Wrench } from "lucide-react";

const sections = [
  { key: "services", label: "Services", path: "services", endpoint: "/api/services", Icon: BriefcaseBusiness, description: "Website service cards" },
  { key: "testimonials", label: "Testimonials", path: "testimonials", endpoint: "/api/testimonials", Icon: MessageSquareQuote, description: "Customer reviews" },
  { key: "technologies", label: "Technologies", path: "technologies", endpoint: "/api/technologies", Icon: MonitorCog, description: "Technology stack" },
  { key: "portfolio", label: "Portfolio", path: "portfolio", endpoint: "/api/portfolio", Icon: Layers3, description: "Featured projects" },
];

function countItems(data) {
  return Array.isArray(data) ? data.length : data ? 1 : 0;
}

export default function Dashboard() {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setIsLoading(true);
    setError("");

    try {
      const requests = [
        ["banner", "/api/banner"],
        ["contact", "/api/contact"],
        ["contacts", "/api/admin/contacts?page=1&pageSize=8"],
        ["activity", "/api/admin/audit-logs"],
        ["banners", "/api/admin/content/banners"],
        ...sections.map(({ key, endpoint }) => [key, endpoint]),
      ];
      const results = await Promise.all(requests.map(async ([key, endpoint]) => {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Could not load website content.");
        const payload = await response.json();
        return [key, payload.data];
      }));
      setContent(Object.fromEntries(results));
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const services = content.services ?? [];
  const testimonials = content.testimonials ?? [];
  const contact = content.contact;
  const enquiries = content.contacts ?? [];
  const activity = content.activity ?? [];
  const banners = content.banners ?? [];
  const newEnquiries = enquiries.filter((item) => item.status === "new").length;
  const publishedBanners = banners.filter((item) => item.status === "published" && item.is_active).length;
  const contentTotal = sections.reduce((total, section) => total + countItems(content[section.key]), 0);

  return (
    <main className="min-h-screen w-full min-w-0 bg-[#fffafb] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 2xl:px-10">
      <div className="mx-auto w-full max-w-[1600px] space-y-5">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff7a00]">Cybergys Technologies</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Website content dashboard</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">Monitor and manage the content delivered to your public website.</p>
          </div>
          <button type="button" onClick={loadDashboard} disabled={isLoading} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#d96600] disabled:cursor-wait disabled:opacity-70">
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh data
          </button>
        </header>

        {error && <p role="alert" className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">{error}</p>}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Website content totals">
          {sections.map(({ key, label, path, Icon, description }) => (
            <Link key={key} to={`/admin/content/${path}`} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#ff7a00]"><Icon size={22} /></span>
                <div>
                  <p className="text-sm font-semibold text-slate-500">{label}</p>
                  <p className="mt-0.5 text-3xl font-black text-slate-950">{isLoading ? "—" : countItems(content[key])}</p>
                  <p className="mt-1 text-xs text-slate-400">{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#082c5c] via-[#0b407e] to-[#0b2854] p-6 text-white shadow-[0_16px_35px_rgba(7,47,108,0.18)]">
            <div className="absolute -right-12 -top-14 h-48 w-48 rounded-full border border-white/15" />
            <div className="absolute -bottom-24 right-28 h-52 w-52 rounded-full bg-[#ff7a00]/20 blur-2xl" />
            <div className="relative"><p className="text-xs font-bold uppercase tracking-[.16em] text-white/65">Content health</p><div className="mt-3 flex flex-wrap items-end justify-between gap-5"><div><p className="text-4xl font-black">{isLoading ? "—" : `${contentTotal} items`}</p><p className="mt-2 max-w-md text-sm leading-6 text-white/75">Your public content library is connected and ready to manage from one place.</p></div><Link to="/admin/cms" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#08356c] transition hover:-translate-y-0.5">Open Visual CMS <ArrowUpRight size={16} /></Link></div></div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)]"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Publishing status</p><p className="mt-2 text-3xl font-black text-slate-950">{isLoading ? "—" : publishedBanners}</p><p className="mt-1 text-sm text-slate-500">active homepage banners</p></div><span className="rounded-xl bg-emerald-50 p-3 text-emerald-600"><CheckCircle2 size={22} /></span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ffb300]" style={{ width: `${Math.min(100, Math.max(12, publishedBanners * 25))}%` }} /></div></article>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div><h2 className="text-lg font-extrabold text-slate-950">Services</h2><p className="mt-1 text-xs text-slate-500">Current services from the website API.</p></div>
              <Link to="/admin/content/services" className="text-sm font-bold text-[#ff7a00] hover:text-[#d96600]">Manage services</Link>
            </div>
            <div className="divide-y divide-slate-100">
              {services.slice(0, 5).map((service) => <div key={service.slug} className="flex items-center justify-between gap-4 px-5 py-4"><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-900">{service.title}</p><p className="mt-1 line-clamp-1 text-xs text-slate-500">{service.description}</p></div><span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-[#d96600]">{service.number}</span></div>)}
              {!isLoading && !services.length && <p className="px-5 py-8 text-center text-sm text-slate-500">No services found.</p>}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
            <div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-extrabold text-slate-950">Contact information</h2><p className="mt-1 text-xs text-slate-500">Shown on the public contact page.</p></div><Mail className="text-[#ff7a00]" size={22} /></div>
            {contact && <div className="mt-5 space-y-4 text-sm"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Email</p><p className="mt-1 font-semibold text-slate-800">{contact.email}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Phone</p><p className="mt-1 font-semibold text-slate-800">{contact.phone}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Subjects</p><div className="mt-2 flex flex-wrap gap-2">{contact.subjects?.map((subject) => <span key={subject} className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-[#d96600]">{subject}</span>)}</div></div></div>}
            {!isLoading && !contact && <p className="mt-5 text-sm text-slate-500">Contact information is unavailable.</p>}
            <Link to="/admin/content/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#ff7a00] hover:text-[#d96600]"><Wrench size={16} /> Manage contact details</Link>
          </article>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)]"><div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-extrabold text-slate-950">Latest enquiries</h2><p className="mt-1 text-xs text-slate-500">{newEnquiries} new leads in the latest submissions.</p></div><Link to="/admin/content/enquiries" className="rounded-lg bg-orange-50 p-2 text-[#d96600]"><Mail size={18} /></Link></div><div className="mt-4 divide-y divide-slate-100">{enquiries.slice(0, 4).map((enquiry) => <div key={enquiry.id} className="flex items-center justify-between gap-3 py-3"><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{enquiry.name}</p><p className="truncate text-xs text-slate-500">{enquiry.service_interest ?? enquiry.subject ?? enquiry.email}</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${enquiry.status === "new" ? "bg-orange-50 text-[#d96600]" : "bg-slate-100 text-slate-600"}`}>{enquiry.status}</span></div>)}{!isLoading && !enquiries.length && <p className="py-8 text-center text-sm text-slate-500">No enquiries yet.</p>}</div></article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)]"><div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-extrabold text-slate-950">Recent activity</h2><p className="mt-1 text-xs text-slate-500">Latest actions made by your admin team.</p></div><Link to="/admin/activity" className="rounded-lg bg-orange-50 p-2 text-[#d96600]"><Clock3 size={18} /></Link></div><div className="mt-4 divide-y divide-slate-100">{activity.slice(0, 4).map((log) => <div key={log.id} className="flex items-center gap-3 py-3"><span className="rounded-lg bg-slate-100 p-2 text-slate-500"><FileText size={15} /></span><div className="min-w-0 flex-1"><p className="text-sm font-bold capitalize text-slate-800">{log.action} {log.entity_type?.replaceAll("_", " ")}</p><p className="mt-0.5 truncate text-xs text-slate-500">{log.admin_name ?? log.admin_email ?? "System"}</p></div><time className="text-xs text-slate-400">{new Date(log.created_at).toLocaleDateString()}</time></div>)}{!isLoading && !activity.length && <p className="py-8 text-center text-sm text-slate-500">Activity will appear here as changes are made.</p>}</div></article>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-extrabold text-slate-950">Recent testimonials</h2><p className="mt-1 text-xs text-slate-500">Latest customer feedback currently delivered by the API.</p></div><Link to="/admin/content/testimonials" className="shrink-0 text-sm font-bold text-[#ff7a00] hover:text-[#d96600]">View all</Link></div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">{testimonials.slice(0, 3).map((testimonial) => <article key={testimonial.id} className="rounded-xl bg-orange-50/50 p-4"><p className="text-sm leading-6 text-slate-700">“{testimonial.review}”</p><div className="mt-4 flex items-center justify-between gap-2"><div><p className="text-sm font-bold text-slate-900">{testimonial.name}</p><p className="text-xs text-slate-500">{testimonial.position}</p></div><span className="text-sm font-black text-[#ff7a00]">★ {testimonial.rating}</span></div></article>)}</div>
        </section>
      </div>
    </main>
  );
}
