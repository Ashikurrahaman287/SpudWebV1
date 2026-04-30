import { useEffect } from "react";
import { getSEO } from "@/lib/storage";

export function useSEO(pageKey: string) {
  useEffect(() => {
    const seo = getSEO();
    const settings = seo[pageKey];
    if (settings) {
      if (settings.title) {
        document.title = settings.title;
      }
      
      if (settings.description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement("meta");
          metaDesc.setAttribute("name", "description");
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute("content", settings.description);
        
        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (!ogDesc) {
          ogDesc = document.createElement("meta");
          ogDesc.setAttribute("property", "og:description");
          document.head.appendChild(ogDesc);
        }
        ogDesc.setAttribute("content", settings.description);
      }
      
      if (settings.title) {
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
          ogTitle = document.createElement("meta");
          ogTitle.setAttribute("property", "og:title");
          document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute("content", settings.title);
      }
    }
  }, [pageKey]);
}
