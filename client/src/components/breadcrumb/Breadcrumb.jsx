import "./breadcrumb.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApi, mediaUrl } from "../../lib/api.js";

import breadcrumbBg from "../../assets/new-breadcumarea.png";

export default function Breadcrumb({ title }) {
  const { pathname, search } = useLocation();
  const slug = pathname.slice(1) || "home";
  const [content, setContent] = useState({});
  const editor = new URLSearchParams(search).has("cmsPreview");
  useEffect(() => { const controller = new AbortController(); getApi(`/api/cms/pages/${slug}/content`, { signal: controller.signal }).then((data) => setContent(Object.fromEntries(data.content.map((item) => [item.content_key, item])))).catch(() => {}); return () => controller.abort(); }, [slug]);
  useEffect(() => {
    if (!editor) return undefined;
    const receivePreviewUpdate = (event) => {
      if (event.origin !== window.location.origin || event.data?.type !== "cms-preview-update") return;
      const [section, key] = String(event.data.key ?? "").split(".");
      if (section !== "banner" || !key) return;
      setContent((current) => ({ ...current, [key]: { ...current[key], value: { value: event.data.value } } }));
    };
    window.addEventListener("message", receivePreviewUpdate);
    return () => window.removeEventListener("message", receivePreviewUpdate);
  }, [editor]);
  const bannerTitle = content.banner_title?.value?.value || title;
  const bannerImage = content.banner_image?.value?.value;
  const select = (key) => (event) => { if (!editor) return; event.preventDefault(); event.stopPropagation(); window.parent.postMessage({ type: "cms-element-selected", key: `banner.${key}`, value: content[key]?.value?.value ?? "", elementType: content[key]?.content_type }, window.location.origin); };
  return (
    <section
      className="page-breadcrumb"
      aria-labelledby="page-breadcrumb-title"
      style={{
        backgroundImage: `url(${mediaUrl(bannerImage) || breadcrumbBg})`,
      }}
      onClick={select("banner_image")}
    >
      {/* DARK OVERLAY */}
      <div className="page-breadcrumb__overlay"></div>

      <div className="page-breadcrumb__container">
        {/* LEFT CONTENT */}
        <div className="page-breadcrumb__content">
          <h1 className="page-breadcrumb__title" id="page-breadcrumb-title" onClick={select("banner_title")} style={editor ? { outline: "2px dashed #ff7a00", outlineOffset: 6, cursor: "pointer" } : undefined}>
            {bannerTitle}
          </h1>

          <nav className="page-breadcrumb__trail" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li aria-hidden="true">/</li>

              <li aria-current="page">{bannerTitle}</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
