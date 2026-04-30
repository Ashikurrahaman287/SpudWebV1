import { useEffect } from "react";
import { getSEO } from "@/lib/storage";

export function useSEO(pageKey: string, fallback?: { title: string; description: string }) {
  useEffect(() => {
    const seo = getSEO()[pageKey] ?? fallback;
    if (!seo) return;
    document.title = seo.title;
    setMeta("description", seo.description);
    if ("keywords" in seo && seo.keywords) setMeta("keywords", seo.keywords);
    setMeta("og:title", seo.title, true);
    setMeta("og:description", seo.description, true);
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
  }, [pageKey, fallback]);
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
