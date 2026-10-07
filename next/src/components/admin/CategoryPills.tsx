"use client";

import { blogCategories } from "@/data/blog-categories";

type Props = {
  categorySlug: string;
  readOnly?: boolean;
  onChange: (next: { category: string; categorySlug: string }) => void;
  /** Show counts like the blog index tabs (optional). */
  counts?: Record<string, number>;
  className?: string;
};

/** Blog-index-style category pills for CMS create/edit. */
export function CategoryPills({
  categorySlug,
  readOnly,
  onChange,
  counts,
  className,
}: Props) {
  return (
    <div className={className}>
      <style>{PILL_CSS}</style>
      <nav className="ba-cats" aria-label="Blog category">
        {blogCategories.map((c) => {
          const on = c.slug === categorySlug;
          const count = counts?.[c.slug];
          return (
            <button
              key={c.slug}
              type="button"
              className={on ? "is-on" : undefined}
              aria-pressed={on}
              disabled={readOnly}
              onClick={() => onChange({ category: c.title, categorySlug: c.slug })}
            >
              {c.title}
              {typeof count === "number" ? <small>{count}</small> : null}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

const PILL_CSS = `
.ba-cats{display:flex;flex-wrap:wrap;gap:8px}
.ba-cats button{
  min-height:44px;flex:none;display:inline-flex;align-items:center;gap:8px;
  border:1px solid rgba(16,17,18,.12);border-radius:999px;padding:0 16px;
  color:#101112;background:#fff;font:700 13.5px/1 Montserrat,system-ui,sans-serif;
  white-space:nowrap;cursor:pointer
}
.ba-cats button:disabled{cursor:default;opacity:.85}
.ba-cats button.is-on{border-color:#101112;background:#101112;color:#F5F1E9}
.ba-cats small{color:#6d6658;font-size:11px;font-weight:700}
.ba-cats button.is-on small{color:#CFB078}
`;
