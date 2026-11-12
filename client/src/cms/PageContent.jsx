import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getApi } from "../lib/api.js";

const CmsContext = createContext({ values: {}, editor: false });
export function PageContentProvider({ page, children }) {
  const [values, setValues] = useState({}); const editor = new URLSearchParams(window.location.search).has("cmsPreview");
  useEffect(() => { const controller = new AbortController(); getApi(`/api/cms/pages/${page}/content`, { signal: controller.signal }).then((data) => setValues(Object.fromEntries(data.content.map((item) => [`${item.section_key}.${item.content_key}`, item.value])))).catch(() => {}); return () => controller.abort(); }, [page]);
  useEffect(() => { if (!editor) return undefined; const receive = (event) => { if (event.origin !== window.location.origin || event.data?.type !== "cms-preview-update") return; setValues((current) => ({ ...current, [event.data.key]: { value: event.data.value } })); }; window.addEventListener("message", receive); return () => window.removeEventListener("message", receive); }, [editor]);
  return <CmsContext.Provider value={{ values, editor }}>{children}</CmsContext.Provider>;
}
export function CmsText({ contentKey, as: Tag = "span", fallback, className, children }) { const { values, editor } = useContext(CmsContext); const value = values[contentKey]?.value ?? fallback; const select = (event) => { if (!editor) return; event.preventDefault(); event.stopPropagation(); window.parent.postMessage({ type: "cms-element-selected", key: contentKey, value, elementType: Tag }, window.location.origin); }; return <Tag className={className} data-cms-key={contentKey} onClick={select} style={editor ? { outline: "2px dashed #ff7a00", outlineOffset: "4px", cursor: "pointer" } : undefined}>{children ?? value}</Tag>; }
