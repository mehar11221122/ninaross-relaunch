import { applySiteChrome } from "@/lib/site-chrome";
import { useEffect, useMemo } from "react";
import { renderCategoryParts, type CategoryEntry } from "@/lib/nr-category";

export function NrCategory({ category }: { category: CategoryEntry }) {
  const { body } = useMemo(() => renderCategoryParts(category), [category]);

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    document.body.classList.add("is-article", "is-category");
    document.body.dataset["category"] = category.slug;

    const script = document.createElement("script");
    script.src = "/blog-kit/nr-blog.js?v=5";
    script.defer = true;
    script.dataset["nrBlog"] = "";
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.body.classList.remove("is-article", "is-category");
      delete document.body.dataset["category"];
      document.body.style.overflow = "";
    };
  }, [category.slug]);

  return <div className="nr-category-root is-article is-category" dangerouslySetInnerHTML={{ __html: applySiteChrome(body) }} />;
}