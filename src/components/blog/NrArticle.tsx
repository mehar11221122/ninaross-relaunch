import { applySiteChrome } from "@/lib/site-chrome";
import { useEffect, useMemo } from "react";
import { renderArticleParts } from "@/lib/nr-article";
import { ArticleAudio } from "./ArticleAudio";

// Faithful port of the approved article: markup comes straight from the kit's render function,
// styled by /blog-kit/nr-blog.css and driven by /blog-kit/nr-blog.js.
export function NrArticle({ post }: { post: { slug: string } }) {
  const { body } = useMemo(() => renderArticleParts(post), [post]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("no-js");
    html.classList.add("js");
    document.body.classList.add("is-article");
    document.body.dataset["slug"] = post.slug;
    const s = document.createElement("script");
    s.src = "/blog-kit/nr-blog.js?v=4";
    s.defer = true;
    s.dataset["nrBlog"] = "";
    document.body.appendChild(s);
    return () => {
      s.remove();
      document.body.classList.remove("is-article");
      delete document.body.dataset["slug"];
      document.body.style.overflow = "";
    };
  }, [post.slug]);

  return (
    <>
      <div className="nr-article-root is-article" dangerouslySetInnerHTML={{ __html: applySiteChrome(body) }} />
      <ArticleAudio post={post} />
    </>
  );
}
