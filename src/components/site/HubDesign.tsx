import { applySiteChrome } from "@/lib/site-chrome";
import { useEffect, useMemo } from "react";
import { renderHubParts, type HubKey } from "@/lib/nr-hub";

export function HubDesign({ hubKey }: { hubKey: HubKey }) {
  const { body, slug } = useMemo(() => renderHubParts(hubKey), [hubKey]);

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    document.body.classList.add("is-hub", "is-article", "nr-kit-page");
    document.body.dataset["hub"] = slug;

    const script = document.createElement("script");
    script.src = "/blog-kit/nr-blog.js?v=6";
    script.defer = true;
    script.dataset["nrBlog"] = "";
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.body.classList.remove("is-hub", "is-article", "nr-kit-page");
      delete document.body.dataset["hub"];
      document.body.style.overflow = "";
    };
  }, [slug]);

  return <div className="nr-hub-root is-hub is-article nr-kit-page" dangerouslySetInnerHTML={{ __html: applySiteChrome(body) }} />;
}
