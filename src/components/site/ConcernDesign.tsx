import { applySiteChrome } from "@/lib/site-chrome";
import { useEffect } from "react";

export function ConcernDesign({ body, slug }: { body: string; slug: string }) {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    document.body.classList.add("is-hub", "is-detail", "is-article", "nr-kit-page");

    const script = document.createElement("script");
    script.src = "/blog-kit/nr-blog.js?v=7";
    script.defer = true;
    script.dataset["nrBlog"] = "";
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.body.classList.remove("is-hub", "is-detail", "is-article", "nr-kit-page");
      document.body.style.overflow = "";
    };
  }, [slug]);

  return <div className="nr-detail-root is-hub is-detail is-article nr-kit-page" dangerouslySetInnerHTML={{ __html: applySiteChrome(body) }} />;
}
