import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowDown, ArrowUp, Check, ChevronDown, ExternalLink, Eye, Globe2, ImagePlus, Info, Link2, Plus, Save, Search, Settings2, ShieldCheck, Trash2, Upload, X } from "lucide-react";

const STORAGE_KEY = "bestpicks-admin-site-settings";
const initialSettings = {
  siteName: "Cybergys Technologies",
  siteUrl: "https://cybergys.com",
  logo: "",
  analyticsId: "",
  metaDescription: "Compare trusted providers for insurance, finance, and more.",
  contactEmail: "info@cybergys.com",
  affiliateDisclosure: "Cybergys may earn a commission when you visit a partner through links on this site. This does not affect our comparisons or rankings.",
  webhookUrl: "",
  trustBarTitle: "Compare with confidence",
  trustStats: [
    { id: "stat-1", label: "Trusted providers", value: "50+" },
    { id: "stat-2", label: "Offers compared", value: "1,000+" },
    { id: "stat-3", label: "Free to compare", value: "Always" },
  ],
  brandHeading: "Our trusted partners",
  brands: [
    { id: "brand-1", name: "ToaSt", logo: "" },
    { id: "brand-2", name: "Lightspeed", logo: "" },
    { id: "brand-3", name: "Epos Now", logo: "" },
  ],
  scoringFactors: [
    { id: "factor-1", label: "Pricing & value", weight: 30, details: "Rates, fees, and the overall value compared with similar offers." },
    { id: "factor-2", label: "Product quality", weight: 25, details: "Coverage, features, limits, and provider reliability." },
    { id: "factor-3", label: "Customer experience", weight: 25, details: "Support options, service reputation, and ease of use." },
    { id: "factor-4", label: "Transparency", weight: 20, details: "Clear terms, fees, eligibility, and disclosure of limitations." },
  ],
  status: "Draft",
  publishedAt: "",
};

function readSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === "object" ? { ...initialSettings, ...saved } : initialSettings;
  } catch {
    return initialSettings;
  }
}

function Field({ label, hint, value, onChange, placeholder, type = "text", maxLength, ...props }) {
  return <label className="block min-w-0 text-sm font-semibold text-slate-700">{label}{hint && <span className="ml-2 text-xs font-normal text-slate-400">{hint}</span>}<input type={type} value={value} maxLength={maxLength} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} {...props} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100" /></label>;
}

function TextArea({ label, hint, value, onChange, rows = 3, maxLength }) {
  return <label className="block min-w-0 text-sm font-semibold text-slate-700">{label}{hint && <span className="ml-2 text-xs font-normal text-slate-400">{hint}</span>}<textarea value={value} maxLength={maxLength} rows={rows} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#ff7a00] focus:ring-2 focus:ring-orange-100" /></label>;
}

function SettingsSection({ id, number, title, description, icon: Icon, children, isOpen, onToggle }) {
  return <section id={id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_22px_rgba(15,23,42,0.055)]"><button type="button" aria-expanded={isOpen} aria-controls={`${id}-panel`} onClick={onToggle} className="flex w-full items-start gap-3 px-4 py-4 text-left transition hover:bg-slate-50/70 sm:px-6 sm:py-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff7a00]"><Icon size={19}/></span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-[#ff7a00]">{number}</span><span className="text-base font-extrabold text-slate-950 sm:text-lg">{title}</span></span><span className="mt-1 block text-xs leading-5 text-slate-500 sm:text-sm">{description}</span></span><ChevronDown size={18} aria-hidden="true" className={`mt-1 shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}/></button><div id={`${id}-panel`} hidden={!isOpen} className="space-y-5 border-t border-slate-100 p-4 sm:p-6">{children}</div></section>;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.readAsDataURL(file);
  });
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState(readSettings);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(readSettings()));
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState("identity");
  const activeSection = openSection;
  const [showPreview, setShowPreview] = useState(false);
  const logoInput = useRef(null);
  const brandInputs = useRef({});
  const dirty = useMemo(() => JSON.stringify(settings) !== savedSnapshot, [settings, savedSnapshot]);
  const weightTotal = settings.scoringFactors.reduce((sum, item) => sum + (Number(item.weight) || 0), 0);

  const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
  const toggleSection = (id) => {
    setOpenSection((current) => current === id ? null : id);
  };
  const updateRow = (key, id, field, value) => setSettings((current) => ({ ...current, [key]: current[key].map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  const addRow = (key, row) => setSettings((current) => ({ ...current, [key]: [...current[key], { ...row, id: `${key}-${Date.now()}` }] }));
  const removeRow = (key, id) => setSettings((current) => ({ ...current, [key]: current[key].filter((item) => item.id !== id) }));
  const moveRow = (key, id, direction) => setSettings((current) => {
    const from = current[key].findIndex((item) => item.id === id);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= current[key].length) return current;
    const next = [...current[key]];
    [next[from], next[to]] = [next[to], next[from]];
    return { ...current, [key]: next };
  });

  const save = (publish = false) => {
    setError("");
    if (settings.siteName.trim().length < 2) return setError("Enter a site name with at least 2 characters.");
    try { new URL(settings.siteUrl); } catch { return setError("Enter a valid website URL, including https://."); }
    if (settings.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.contactEmail)) return setError("Enter a valid contact email address.");
    if (settings.webhookUrl) { try { new URL(settings.webhookUrl); } catch { return setError("Enter a valid webhook URL or leave it blank."); } }
    if (settings.trustStats.some((item) => !item.label.trim() || !item.value.trim())) return setError("Each trust statistic needs both a label and a value.");
    if (settings.brands.some((item) => !item.name.trim())) return setError("Each partner logo needs a brand name.");
    if (settings.scoringFactors.some((item) => !item.label.trim() || Number(item.weight) < 0)) return setError("Scoring factors need a label and a non-negative weight.");
    if (settings.scoringFactors.length && weightTotal !== 100) return setError(`Scoring weights currently total ${weightTotal}%. Adjust them to exactly 100% before saving.`);
    const next = { ...settings, siteName: settings.siteName.trim(), status: publish ? "Published" : "Draft", publishedAt: publish ? new Date().toISOString() : settings.publishedAt };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSettings(next);
      setSavedSnapshot(JSON.stringify(next));
      setToast(publish ? "Site settings published." : "Draft saved on this device.");
      window.setTimeout(() => setToast(""), 3500);
    } catch {
      setError("Could not save these settings in browser storage. Try using smaller logo images.");
    }
  };

  const handleImage = async (file, onSet) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Choose a PNG, JPG, SVG, or WebP image file.");
    if (file.size > 400 * 1024) return setError("Please choose an image under 400 KB so it can be stored safely in this browser.");
    try { onSet(await readFileAsDataUrl(file)); setError(""); } catch { setError("The image could not be loaded. Please try another file."); }
  };

  const resetDraft = () => { setSettings(JSON.parse(savedSnapshot)); setError(""); setToast("Unsaved changes discarded."); };
  const publishStatus = settings.status === "Published" ? "Published" : "Draft";

  return <main className="min-h-[calc(100vh-61px)] bg-[#fff9fa] px-4 py-5 sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-[1600px]">
    <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-white via-white to-orange-50 p-4 shadow-[0_5px_22px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Site settings</h1><span className={`rounded-full px-3 py-1 text-xs font-bold ${publishStatus === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{publishStatus}</span>{dirty && <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Unsaved changes</span>}</div><p className="mt-1 text-sm text-slate-500">Manage the public identity, trust content, and comparison rules for Cybergys.</p>{settings.publishedAt && <p className="mt-1 text-xs text-slate-400">Last published {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(settings.publishedAt))}</p>}</div><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={() => setShowPreview(true)} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Eye size={16}/>Preview summary</button><button type="button" onClick={() => save(false)} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-4 text-sm font-bold text-[#d96600] hover:bg-orange-50"><Save size={16}/>Save draft</button><button type="button" onClick={() => save(true)} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white shadow-sm hover:bg-[#d96600]"><Check size={16}/>Publish changes</button></div></div>

    {(toast || error) && <div role={error ? "alert" : "status"} className={`mb-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${error ? "border-orange-200 bg-orange-50 text-orange-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>{error ? <AlertCircle size={17} className="mt-0.5 shrink-0"/> : <Check size={17} className="mt-0.5 shrink-0"/>}<span className="flex-1">{error || toast}</span><button type="button" aria-label="Dismiss message" onClick={() => { setError(""); setToast(""); }}><X size={16}/></button></div>}

    <div className="grid items-start gap-5 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">
      {/* <nav aria-label="Settings sections" className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_4px_18px_rgba(15,23,42,0.05)] lg:sticky lg:top-20"> */}
      <nav aria-label="Settings sections" className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_4px_18px_rgba(15,23,42,0.05)] lg:sticky lg:top-20">
        <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Configuration</p>
        <div className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">{[["identity", "Brand identity"], ["discovery", "Analytics & SEO"], ["contact", "Contact & leads"], ["homepage", "Homepage trust"], ["partners", "Partner brands"], ["scoring", "Scoring methodology"]].map(([id, label], index) => <a key={id} href={`#${id}`} onClick={() => setOpenSection(id)} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${activeSection === id ? "bg-orange-50 text-[#ff7a00]" : "text-slate-600 hover:bg-slate-50"}`}><span className={`flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-extrabold ${activeSection === id ? "bg-white text-[#ff7a00]" : "bg-slate-100 text-slate-500"}`}>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</div><div className="mt-3 hidden rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500 lg:block"><Info size={15} className="mb-1 text-[#ff7a00]"/>Changes are saved in this browser. Connect these controls to your API/CMS to publish settings for all visitors.
        </div>
      </nav>

      <div className="min-w-0 space-y-5">
        <SettingsSection id="identity" number="01" title="Brand identity" description="The name, URL, and logo visitors see across Cybergys." icon={Globe2} isOpen={openSection === "identity"} onToggle={() => toggleSection("identity")}>
          <div className="grid gap-4 md:grid-cols-2"><Field label="Site name" value={settings.siteName} onChange={(value) => update("siteName", value)} maxLength={80}/><Field label="Website URL" type="url" value={settings.siteUrl} onChange={(value) => update("siteUrl", value)} placeholder="https://example.com"/></div>
          <div><p className="text-sm font-semibold text-slate-700">Site logo <span className="ml-2 text-xs font-normal text-slate-400">PNG, JPG, SVG or WebP · 400 KB max</span></p><div className="mt-2 flex flex-col gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 sm:flex-row sm:items-center"><div className="flex h-16 w-[250px] max-w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white px-3">{settings.logo ? <img src={settings.logo} alt="Site logo preview" style={{ maxWidth: "220px", maxHeight: "48px", width: "auto", height: "auto", objectFit: "contain" }}/> : <span className="text-sm font-black tracking-tight text-slate-800">✓ bestpicksfor<span className="text-[#ff7a00]">.com</span></span>}</div><div className="flex flex-wrap gap-2"><input ref={logoInput} className="sr-only" type="file" accept="image/*" onChange={(event) => handleImage(event.target.files?.[0], (logo) => update("logo", logo))}/><button type="button" onClick={() => logoInput.current?.click()} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-100"><Upload size={14}/>Upload logo</button>{settings.logo && <button type="button" onClick={() => update("logo", "")} className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold text-orange-700 hover:bg-orange-50"><Trash2 size={14}/>Remove</button>}</div><p className="text-xs text-slate-500 sm:ml-auto">This logo is shown in site navigation and footer.</p></div></div>
        </SettingsSection>

        <SettingsSection id="discovery" number="02" title="Analytics & search preview" description="Configure measurement and the default search result description." icon={Search} isOpen={openSection === "discovery"} onToggle={() => toggleSection("discovery")}>
          <Field label="Google Tag Manager ID" hint="Optional" value={settings.analyticsId} onChange={(value) => update("analyticsId", value)} placeholder="GTM-XXXXXXX" maxLength={30}/><p className="-mt-3 text-xs text-slate-400">Leave blank to disable. Analytics scripts must also be connected in your application.</p><TextArea label="Default meta description" hint={`${settings.metaDescription.length}/160`} value={settings.metaDescription} onChange={(value) => update("metaDescription", value)} rows={3} maxLength={160}/>
        </SettingsSection>

        <SettingsSection id="contact" number="03" title="Contact & lead delivery" description="Set the public contact details and partner referral disclosure." icon={Link2} isOpen={openSection === "contact"} onToggle={() => toggleSection("contact")}>
          <Field label="Contact email" type="email" value={settings.contactEmail} onChange={(value) => update("contactEmail", value)} placeholder="hello@example.com"/><TextArea label="Affiliate disclosure" hint="Shown near partner links and comparison results" value={settings.affiliateDisclosure} onChange={(value) => update("affiliateDisclosure", value)} rows={4} maxLength={600}/><Field label="Lead webhook URL" hint="Optional" type="url" value={settings.webhookUrl} onChange={(value) => update("webhookUrl", value)} placeholder="https://your-service.com/leads/webhook"/><p className="-mt-3 text-xs text-slate-400">Saving a URL here stores the setting; your backend must deliver lead submissions to it.</p>
        </SettingsSection>

        <SettingsSection id="homepage" number="04" title="Homepage trust bar" description="Control the reassurance strip and proof points shown on your public homepage." icon={ShieldCheck} isOpen={openSection === "homepage"} onToggle={() => toggleSection("homepage")}>
          <Field label="Trust bar heading" value={settings.trustBarTitle} onChange={(value) => update("trustBarTitle", value)} placeholder="Compare with confidence"/><div><div className="mb-3 flex items-center justify-between gap-3"><div><h3 className="text-sm font-bold text-slate-800">Trust statistics</h3><p className="mt-1 text-xs text-slate-500">Add short proof points; drag order with the arrow controls.</p></div><button type="button" onClick={() => addRow("trustStats", { label: "New statistic", value: "0" })} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-orange-200 px-3 text-xs font-bold text-[#d96600] hover:bg-orange-50"><Plus size={14}/>Add stat</button></div><div className="space-y-2">{settings.trustStats.map((item, index) => <div key={item.id} className="grid gap-2 rounded-xl border border-slate-200 p-3 sm:grid-cols-[minmax(0,1fr)_150px_auto]"><input aria-label="Statistic label" value={item.label} onChange={(event) => updateRow("trustStats", item.id, "label", event.target.value)} placeholder="Statistic label" className="h-10 min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#ff7a00]"/><input aria-label="Statistic value" value={item.value} onChange={(event) => updateRow("trustStats", item.id, "value", event.target.value)} placeholder="50+" className="h-10 min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#ff7a00]"/><div className="flex justify-end"><button type="button" disabled={index === 0} onClick={() => moveRow("trustStats", item.id, -1)} aria-label="Move statistic up" className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-30"><ArrowUp size={15}/></button><button type="button" disabled={index === settings.trustStats.length - 1} onClick={() => moveRow("trustStats", item.id, 1)} aria-label="Move statistic down" className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-30"><ArrowDown size={15}/></button><button type="button" onClick={() => removeRow("trustStats", item.id)} aria-label="Remove statistic" className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-700"><Trash2 size={15}/></button></div></div>)}</div></div>
        </SettingsSection>

        <SettingsSection id="partners" number="05" title="Trusted partner brands" description="Manage the logo carousel displayed on the homepage. Use each brand’s approved logo asset." icon={ImagePlus} isOpen={openSection === "partners"} onToggle={() => toggleSection("partners")}>
          <Field label="Section heading" value={settings.brandHeading} onChange={(value) => update("brandHeading", value)} placeholder="Our trusted partners"/><div className="flex items-center justify-between gap-3"><div><h3 className="text-sm font-bold text-slate-800">Partner logos</h3><p className="mt-1 text-xs text-slate-500">Upload a transparent image or keep a text-only brand label.</p></div><button type="button" onClick={() => addRow("brands", { name: "New partner", logo: "" })} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-orange-200 px-3 text-xs font-bold text-[#d96600] hover:bg-orange-50"><Plus size={14}/>Add brand</button></div>
          <div className="space-y-3">{settings.brands.map((brand, index) => <article key={brand.id} className="rounded-xl border border-slate-200"><div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2"><span className="text-xs font-bold text-slate-600">Partner {String(index + 1).padStart(2, "0")}</span><div className="flex items-center"><button type="button" disabled={!index} onClick={() => moveRow("brands", brand.id, -1)} aria-label="Move partner up" className="rounded p-1.5 text-slate-500 hover:bg-white disabled:opacity-30"><ArrowUp size={14}/></button><button type="button" disabled={index === settings.brands.length - 1} onClick={() => moveRow("brands", brand.id, 1)} aria-label="Move partner down" className="rounded p-1.5 text-slate-500 hover:bg-white disabled:opacity-30"><ArrowDown size={14}/></button><button type="button" onClick={() => removeRow("brands", brand.id)} aria-label="Remove partner" className="rounded p-1.5 text-slate-500 hover:bg-orange-100 hover:text-orange-700"><Trash2 size={14}/></button></div></div><div className="grid gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-end"><Field label="Brand name" value={brand.name} onChange={(value) => updateRow("brands", brand.id, "name", value)} placeholder="Partner name"/><div><p className="mb-1.5 text-sm font-semibold text-slate-700">Logo image <span className="text-xs font-normal text-slate-400">optional</span></p><div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 p-2"><div className="flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">{brand.logo ? <img src={brand.logo} alt={`${brand.name} logo`} className="max-h-8 max-w-14 object-contain"/> : <span className="text-[10px] font-bold text-slate-400">{brand.name}</span>}</div><input ref={(node) => { brandInputs.current[brand.id] = node; }} className="sr-only" type="file" accept="image/*" onChange={(event) => handleImage(event.target.files?.[0], (logo) => updateRow("brands", brand.id, "logo", logo))}/><button type="button" onClick={() => brandInputs.current[brand.id]?.click()} className="inline-flex h-9 min-w-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"><Upload size={14}/><span className="truncate">{brand.logo ? "Replace image" : "Upload image"}</span></button>{brand.logo && <button type="button" onClick={() => updateRow("brands", brand.id, "logo", "")} aria-label={`Remove ${brand.name} logo`} className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-700"><X size={15}/></button>}</div></div></div></article>)}</div>
        </SettingsSection>

        <SettingsSection id="scoring" number="06" title="Comparison scoring methodology" description="Weights explain how Cybergys ranks its comparison results. The total must equal 100%." icon={Settings2} isOpen={openSection === "scoring"} onToggle={() => toggleSection("scoring")}>
          <div className={`flex items-center justify-between rounded-xl px-4 py-3 ${weightTotal === 100 ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}><div className="flex items-center gap-2"><Info size={16}/><span className="text-sm font-semibold">Total weight</span></div><span className="text-lg font-black">{weightTotal}% <span className="text-xs font-semibold">/ 100%</span></span></div><div className="flex items-center justify-between gap-3"><p className="text-xs text-slate-500">Reorder factors and adjust their percentage weights.</p><button type="button" onClick={() => addRow("scoringFactors", { label: "New factor", weight: 0, details: "" })} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-orange-200 px-3 text-xs font-bold text-[#d96600] hover:bg-orange-50"><Plus size={14}/>Add factor</button></div>
          <div className="space-y-3">{settings.scoringFactors.map((factor, index) => <article key={factor.id} className="rounded-xl border border-slate-200 p-3 sm:p-4"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wide text-slate-400">Factor {String(index + 1).padStart(2, "0")}</span><div className="flex items-center"><button type="button" disabled={!index} onClick={() => moveRow("scoringFactors", factor.id, -1)} aria-label="Move factor up" className="rounded p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-30"><ArrowUp size={14}/></button><button type="button" disabled={index === settings.scoringFactors.length - 1} onClick={() => moveRow("scoringFactors", factor.id, 1)} aria-label="Move factor down" className="rounded p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-30"><ArrowDown size={14}/></button><button type="button" onClick={() => removeRow("scoringFactors", factor.id)} aria-label="Remove factor" className="rounded p-1.5 text-slate-500 hover:bg-orange-50 hover:text-orange-700"><Trash2 size={14}/></button></div></div><div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_120px]"><Field label="Factor name" value={factor.label} onChange={(value) => updateRow("scoringFactors", factor.id, "label", value)} placeholder="Factor name"/><Field label="Weight (%)" type="number" min="0" max="100" value={factor.weight} onChange={(value) => updateRow("scoringFactors", factor.id, "weight", value === "" ? "" : Number(value))}/></div><div className="mt-3"><TextArea label="What this factor measures" value={factor.details} onChange={(value) => updateRow("scoringFactors", factor.id, "details", value)} rows={2}/></div></article>)}</div>
          <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">Updating these labels here stores and presents the methodology in admin settings. Your ranking service must consume the saved weights separately for them to change actual provider rankings.</p>
        </SettingsSection>

        <div className="bottom-3 z-10 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_8px_30px_rgba(15,23,42,0.12)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-4"><p className="text-xs text-slate-500">{dirty ? "You have unsaved changes." : "All changes are saved."}</p><div className="flex gap-2"><button type="button" onClick={resetDraft} disabled={!dirty} className="h-10 flex-1 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none">Discard changes</button><button type="button" onClick={() => save(false)} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white hover:bg-[#d96600] sm:flex-none"><Save size={15}/>Save draft</button></div></div>
      </div>
    </div>
    </div>

    {showPreview && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071322]/50 p-4 backdrop-blur-sm" onMouseDown={() => setShowPreview(false)}><section role="dialog" aria-modal="true" aria-labelledby="site-settings-preview-title" onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-slate-100 p-5"><div><p className="text-xs font-bold uppercase tracking-wider text-[#ff7a00]">Public site preview</p><h2 id="site-settings-preview-title" className="mt-1 text-xl font-black text-slate-950">{settings.siteName || "Your site name"}</h2></div><button type="button" onClick={() => setShowPreview(false)} aria-label="Close preview" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18}/></button></div><div className="p-5"><p className="break-all text-sm text-sky-700">{settings.siteUrl}</p><p className="mt-4 text-sm leading-6 text-slate-600">{settings.metaDescription || "No default meta description set."}</p><div className="mt-5 rounded-xl bg-gradient-to-r from-[#002f6c] to-[#ff9500] p-4 text-white"><p className="text-sm font-bold">{settings.trustBarTitle}</p><div className="mt-3 grid grid-cols-3 gap-2">{settings.trustStats.map((item) => <div key={item.id} className="rounded-lg bg-white/15 p-2"><p className="text-lg font-black">{item.value}</p><p className="text-[10px] leading-4 text-white/85">{item.label}</p></div>)}</div></div><div className="mt-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Trusted partners</p><div className="mt-2 flex flex-wrap items-center gap-2">{settings.brands.map((brand) => <span key={brand.id} className="flex h-12 items-center justify-center rounded-lg border border-slate-200 px-3">{brand.logo ? <img src={brand.logo} alt={brand.name} className="max-h-8 max-w-24 object-contain"/> : <span className="text-sm font-bold text-slate-600">{brand.name}</span>}</span>)}</div></div><p className="mt-4 text-xs leading-5 text-slate-500">{settings.affiliateDisclosure}</p><a href={settings.siteUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#ff7a00]">Open website <ExternalLink size={14}/></a></div></section></div>}
  </main>;
}
