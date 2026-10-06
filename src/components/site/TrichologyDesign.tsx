import { applySiteChrome } from "@/lib/site-chrome";
import { useEffect, useMemo } from "react";
import { renderTrichologyBody } from "@/lib/nr-trichology";

export function TrichologyDesign() {
  const body = useMemo(() => renderTrichologyBody(), []);

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    document.body.classList.add("is-hub", "is-detail", "is-article", "is-trich", "nr-kit-page");

    const script = document.createElement("script");
    script.src = "/blog-kit/nr-blog.js?v=6";
    script.defer = true;
    script.dataset["nrBlog"] = "";
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.body.classList.remove("is-hub", "is-detail", "is-article", "is-trich", "nr-kit-page");
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="nr-trichology-root is-hub is-detail is-article is-trich nr-kit-page"
      dangerouslySetInnerHTML={{ __html: applySiteChrome(body) }}
    />
  );
}
