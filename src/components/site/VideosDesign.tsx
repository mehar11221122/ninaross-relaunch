import { applySiteChrome } from "@/lib/site-chrome";
import { useEffect, useMemo } from "react";
import { renderVideosParts } from "@/lib/nr-videos";

export function VideosDesign() {
  const { body } = useMemo(() => renderVideosParts(), []);

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    document.body.classList.add("is-hub", "is-detail", "is-article", "is-videos", "nr-kit-page");

    const blogScript = document.createElement("script");
    blogScript.src = "/blog-kit/nr-blog.js?v=6";
    blogScript.defer = true;
    blogScript.dataset["nrBlog"] = "";

    const videosScript = document.createElement("script");
    videosScript.src = "/blog-kit/videos.js?v=1";
    videosScript.defer = true;
    videosScript.dataset["nrVideos"] = "";

    document.body.append(blogScript, videosScript);

    return () => {
      blogScript.remove();
      videosScript.remove();
      document.body.classList.remove("is-hub", "is-detail", "is-article", "is-videos", "nr-kit-page");
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="nr-videos-root is-hub is-detail is-article is-videos nr-kit-page"
      dangerouslySetInnerHTML={{ __html: applySiteChrome(body) }}
    />
  );
}