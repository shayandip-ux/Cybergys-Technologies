import { Settings2 } from "lucide-react";

export default function ConfigurationPageLayout({ title, description, icon: Icon = Settings2, children }) {
  return (
    <main className="min-h-screen min-w-0 bg-[#fffafb] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <header className="flex items-start gap-3 sm:gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#ff7a00] sm:h-12 sm:w-12">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff7a00]">Configuration</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
          </div>
        </header>

        <div className="flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-900">
          <span className="mt-0.5 rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ff7a00]">Demo</span>
          <p>This page shows example settings to explain how this area can be managed. The sample values are not connected to a live website.</p>
        </div>

        {children}
      </div>
    </main>
  );
}

export function ConfigCard({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.06)] sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-extrabold text-slate-950">{title}</h2>
        {description && <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function ConfigBadge({ children, tone = "green" }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700",
    slate: "bg-slate-100 text-slate-600",
    amber: "bg-amber-50 text-amber-700",
  };

  return <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>;
}
