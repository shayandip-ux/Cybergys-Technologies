import { useEffect, useRef, useState } from "react";
import { Monitor, Save, Send, Smartphone, Tablet, Upload } from "lucide-react";
import { getApi, mediaUrl, sendApi } from "../../../lib/api.js";

const devices = [
  { id: "desktop", label: "Desktop", Icon: Monitor },
  { id: "tablet", label: "Tablet", Icon: Tablet },
  { id: "mobile", label: "Mobile", Icon: Smartphone },
];

export default function VisualCmsPage() {
  const previewRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(null);
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");
  const [device, setDevice] = useState("desktop");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getApi("/api/cms/pages")
      .then((items) => {
        setPages(items);
        setPage(items[0] ?? null);
      })
      .catch((error) => setMessage(error.message));
  }, []);

  useEffect(() => {
    if (!page) return;
    setSelected(null);
    setValue("");
    getApi(`/api/cms/pages/${page.page_slug}/content`)
      .then((data) => setContent(data.content ?? []))
      .catch((error) => setMessage(error.message));
  }, [page]);

  useEffect(() => {
    const selectFromPreview = (event) => {
      if (event.origin !== window.location.origin || event.data?.type !== "cms-element-selected") return;
      const field = content.find((item) => `${item.section_key}.${item.content_key}` === event.data.key);
      if (!field) return;
      setSelected(field);
      setValue(field.value?.value ?? "");
    };
    window.addEventListener("message", selectFromPreview);
    return () => window.removeEventListener("message", selectFromPreview);
  }, [content]);

  const updatePreview = (nextValue) => {
    if (!selected || !previewRef.current?.contentWindow) return;
    previewRef.current.contentWindow.postMessage(
      { type: "cms-preview-update", key: `${selected.section_key}.${selected.content_key}`, value: nextValue },
      window.location.origin,
    );
  };

  const changeValue = (nextValue) => {
    setValue(nextValue);
    updatePreview(nextValue);
  };

  const saveDraft = async () => {
    if (!selected) return;
    setBusy(true);
    try {
      await sendApi(`/api/cms/content/${selected.id}/draft`, "PUT", { value });
      setContent((items) => items.map((item) => item.id === selected.id ? { ...item, value: { value } } : item));
      setMessage("Draft saved. Publish the page when you are ready.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const publishPage = async () => {
    if (!page) return;
    setBusy(true);
    try {
      await sendApi(`/api/cms/pages/${page.page_slug}/publish`, "POST", {});
      setMessage("Page published successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error ?? "Unable to upload image.");
      changeValue(payload.data.url);
      setMessage("Image uploaded. Save the draft, then publish the page.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  const isImage = selected?.content_type === "image";
  const previewWidth = device === "mobile" ? 390 : device === "tablet" ? 768 : "100%";

  return (
    <main className="min-h-screen bg-[#fff9fa] p-4 sm:p-6">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ff7a00]">Visual Content Studio</p>
          <h1 className="mt-1 text-3xl font-black text-slate-950">Live page editor</h1>
          <p className="mt-2 text-sm text-slate-500">Select an orange-outlined heading, text, or banner to edit it.</p>
        </div>
        <button type="button" onClick={publishPage} disabled={!page || busy} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#ff7a00] px-4 text-sm font-bold text-white disabled:opacity-60">
          <Send size={15} /> Publish page
        </button>
      </header>

      {message && <p className="mb-4 rounded-xl border border-orange-100 bg-orange-50 p-3 text-sm text-slate-700">{message}</p>}

      <div className="grid min-h-[720px] gap-4 xl:grid-cols-[230px_minmax(0,1fr)_320px]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Pages</p>
          {pages.map((item) => (
            <button type="button" key={item.id} onClick={() => setPage(item)} className={`mb-1 w-full rounded-xl px-3 py-3 text-left text-sm font-bold ${page?.id === item.id ? "bg-orange-50 text-[#d96600]" : "text-slate-600 hover:bg-slate-50"}`}>
              {item.page_name}
              <small className="mt-1 block font-normal text-slate-400">{item.page_url}</small>
            </button>
          ))}
        </aside>

        <section className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <div className="flex gap-2 border-b border-slate-200 bg-white p-3">
            {devices.map(({ id, label, Icon }) => <button type="button" key={id} title={label} onClick={() => setDevice(id)} className={`rounded-lg p-2 ${device === id ? "bg-orange-50 text-[#d96600]" : "text-slate-500"}`}><Icon size={18} /></button>)}
          </div>
          <div className="flex flex-1 justify-center overflow-auto p-4">
            <iframe ref={previewRef} title="Live page preview" src={`${page?.page_url ?? "/"}?cmsPreview=1`} style={{ width: previewWidth, minWidth: previewWidth }} className="min-h-[920px] border-0 bg-white shadow-lg" />
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-extrabold text-slate-950">Element editor</h2>
          {!selected ? <p className="mt-4 text-sm leading-6 text-slate-500">Select an orange-outlined item in the preview to begin editing.</p> : <>
            <p className="mt-2 text-xs font-bold uppercase text-[#d96600]">{selected.label}</p>
            {isImage ? <div className="mt-4">
              <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-sm text-slate-400">
                {value ? <img src={mediaUrl(value)} alt="Selected banner preview" className="h-full w-full object-cover" /> : "No image selected"}
              </div>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-bold text-[#d96600]">
                <Upload size={15} /> Upload image
                <input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={uploadImage} className="hidden" />
              </label>
              <p className="mt-2 text-xs text-slate-400">JPG, PNG, WebP, AVIF, or GIF · maximum 5 MB</p>
            </div> : <textarea value={value} onChange={(event) => changeValue(event.target.value)} className="mt-4 min-h-40 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-orange-400" />}
            <button type="button" onClick={saveDraft} disabled={busy} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"><Save size={15} /> Save draft</button>
          </>}
        </aside>
      </div>
    </main>
  );
}
