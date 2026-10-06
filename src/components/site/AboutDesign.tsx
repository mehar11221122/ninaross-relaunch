import { applySiteChrome } from "@/lib/site-chrome";
import { useEffect, useMemo } from "react";
import { renderAboutParts } from "@/lib/nr-about";

export function AboutDesign() {
  const { body } = useMemo(() => renderAboutParts(), []);

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    document.body.classList.add("is-about", "nr-kit-page");

    const script = document.createElement("script");
    script.src = "/blog-kit/nr-blog.js?v=6";
    script.defer = true;
    script.dataset["nrBlog"] = "";
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.body.classList.remove("is-about", "nr-kit-page");
      document.body.style.overflow = "";
    };
  }, []);

  return <div className="nr-about-root" dangerouslySetInnerHTML={{ __html: applySiteChrome(body) }} />;
}