import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BriefcaseBusiness, Layers3, Mail, MessageSquareQuote, MonitorCog, RefreshCw, Wrench } from "lucide-react";

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

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-extrabold text-slate-950">Recent testimonials</h2><p className="mt-1 text-xs text-slate-500">Latest customer feedback currently delivered by the API.</p></div><Link to="/admin/content/testimonials" className="shrink-0 text-sm font-bold text-[#ff7a00] hover:text-[#d96600]">View all</Link></div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">{testimonials.slice(0, 3).map((testimonial) => <article key={testimonial.id} className="rounded-xl bg-orange-50/50 p-4"><p className="text-sm leading-6 text-slate-700">“{testimonial.review}”</p><div className="mt-4 flex items-center justify-between gap-2"><div><p className="text-sm font-bold text-slate-900">{testimonial.name}</p><p className="text-xs text-slate-500">{testimonial.position}</p></div><span className="text-sm font-black text-[#ff7a00]">★ {testimonial.rating}</span></div></article>)}</div>
        </section>
      </div>
    </main>
  );
}
