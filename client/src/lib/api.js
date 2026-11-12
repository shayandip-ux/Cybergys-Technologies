const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
const MEDIA_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

function url(path) {
  return `${API_BASE_URL}${path}`;
}

export async function getApi(path, { signal } = {}) {
  const response = await fetch(url(path), { signal, headers: { Accept: "application/json" } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error ?? "Unable to load content.");
  return payload.data;
}

export async function sendApi(path, method, data, { signal } = {}) {
  const response = await fetch(url(path), {
    method,
    signal,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error ?? "Unable to save content.");
  return payload;
}

export function mediaUrl(value) {
  if (!value || /^(data:|https?:\/\/)/i.test(value)) return value;
  return `${MEDIA_BASE_URL}${value}`;
}
