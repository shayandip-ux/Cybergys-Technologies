export default function ContentPageLayout({ title, description, icon: Icon, children }) {
  return (
    <main className="min-h-screen min-w-0 bg-[#fffafb] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <header className="flex items-start gap-3 sm:gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#ff7a00] sm:h-12 sm:w-12">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
          </div>
        </header>

        <div className="flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-900">
          <span className="mt-0.5 rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ff7a00]">Demo</span>
          <p>Sample information on this page is for learning the content workflow. It is not connected to live records and changes are not saved.</p>
        </div>

        {children}
      </div>
    </main>
  );
}

export function ContentStatus({ children, tone = "slate" }) {
  const styles = {
    slate: "bg-slate-100 text-slate-600",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-sky-50 text-sky-700",
  };

  return <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[tone]}`}>{children}</span>;
}
