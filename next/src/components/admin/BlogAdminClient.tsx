"use client";

import { useCallback, useEffect, useState } from "react";
import { BlogVisualEditor } from "@/components/admin/BlogVisualEditor";
import { CategoryPills } from "@/components/admin/CategoryPills";
import { blogCategories } from "@/data/blog-categories";
import type { BlogDocument } from "@/lib/blog-cms";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type Summary = {
  slug: string;
  title: string;
  source: "static" | "cms";
  status: "published" | "draft";
  updatedAt: string | null;
};

type Template = { slug: string; title: string };

async function authHeaders(): Promise<HeadersInit> {
  const { data } = await getSupabaseBrowser().auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Not signed in");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export function BlogAdminClient({ readOnly = false }: { readOnly?: boolean }) {
  const [articles, setArticles] = useState<Summary[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [doc, setDoc] = useState<BlogDocument | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [source, setSource] = useState<"static" | "cms">("static");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [templateSlug, setTemplateSlug] = useState("traction-alopecia-reversibility");
  const [newCategorySlug, setNewCategorySlug] = useState("hair-loss");

  const refreshList = useCallback(async () => {
    setError(null);
    try {
      if (readOnly) return;
      const headers = await authHeaders();
      const res = await fetch("/api/admin/blog", { headers });
      const json = (await res.json()) as {
        articles?: Summary[];
        templates?: Template[];
        error?: string;
        hint?: string;
      };
      if (!res.ok) throw new Error(json.hint ? `${json.error} — ${json.hint}` : json.error || "Load failed");
      setArticles(json.articles || []);
      setTemplates(json.templates || []);
      if (json.templates?.[0] && !templateSlug) setTemplateSlug(json.templates[0].slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    }
  }, [templateSlug, readOnly]);

  useEffect(() => {
    void refreshList();
  }, [refreshList]);

  const openArticle = async (slug: string) => {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const headers = await authHeaders();
      const res = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`, { headers });
      const json = (await res.json()) as {
        document?: BlogDocument;
        status?: "draft" | "published";
        source?: "static" | "cms";
        error?: string;
        hint?: string;
      };
      if (!res.ok) throw new Error(json.hint ? `${json.error} — ${json.hint}` : json.error || "Open failed");
      setDoc(json.document || null);
      setStatus(json.status || "published");
      setSource(json.source || "static");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Open failed");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!doc || readOnly) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const headers = await authHeaders();
      const res = await fetch(`/api/admin/blog/${encodeURIComponent(doc.slug)}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ document: doc, status }),
      });
      const json = (await res.json()) as { error?: string; hint?: string; ok?: boolean };
      if (!res.ok) throw new Error(json.hint ? `${json.error} — ${json.hint}` : json.error || "Save failed");
      setMessage(`Saved ${doc.slug} (${status}).`);
      setSource("cms");
      await refreshList();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const createNew = async () => {
    if (readOnly) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const headers = await authHeaders();
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers,
        body: JSON.stringify({
          templateSlug,
          title: newTitle,
          slug: newSlug || undefined,
          status: "draft",
          categorySlug: newCategorySlug,
          category:
            blogCategories.find((c) => c.slug === newCategorySlug)?.title || "Hair Loss",
        }),
      });
      const json = (await res.json()) as {
        error?: string;
        hint?: string;
        slug?: string;
        document?: BlogDocument;
      };
      if (!res.ok) throw new Error(json.hint ? `${json.error} — ${json.hint}` : json.error || "Create failed");
      setMessage(`Created draft ${json.slug}.`);
      setNewTitle("");
      setNewSlug("");
      await refreshList();
      if (json.document) {
        setDoc(json.document);
        setStatus("draft");
        setSource("cms");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create failed");
    } finally {
      setBusy(false);
    }
  };

  const patchDoc = (patch: Partial<BlogDocument>) => {
    setDoc((d) => (d ? { ...d, ...patch } : d));
  };

  return (
    <div className="ba">
      <style>{BA_CSS}</style>

      {doc ? (
        <section className="ba-edit">
          <header className="ba-toolbar">
            <div className="ba-toolbar__row">
              <button type="button" className="ba-chip" onClick={() => setDoc(null)}>
                ← Articles
              </button>
              <code className="ba-slug">{doc.slug}</code>
              <span className="ba-muted">{source}</span>
              <select
                className="ba-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                disabled={readOnly}
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
              <a className="ba-link" href={`/blog/${doc.slug}`} target="_blank" rel="noreferrer">
                Live →
              </a>
              {!readOnly ? (
                <button type="button" className="ba-btn" disabled={busy} onClick={() => void save()}>
                  {busy ? "Saving…" : "Save"}
                </button>
              ) : (
                <span className="ba-ro">read-only</span>
              )}
            </div>
            {!readOnly ? (
              <div className="ba-toolbar__cats">
                <span className="ba-lbl">Category</span>
                <CategoryPills
                  categorySlug={doc.categorySlug}
                  onChange={({ category, categorySlug }) =>
                    patchDoc({ category, categorySlug })
                  }
                />
              </div>
            ) : null}
          </header>
          <p className="ba-hint">
            Hover any block and click ✎ to edit. Upload Listen audio under the author note. Published
            posts use the same kit layout as existing articles.
          </p>
          <BlogVisualEditor doc={doc} readOnly={readOnly} onChange={patchDoc} />
        </section>
      ) : (
        <>
          <p className="ba-note">
            Create from a template (structure locked), edit in the visual layout, then publish.
            Live pages render through the same article kit as existing posts.
          </p>

          {!readOnly ? (
            <section className="ba-panel">
              <h2>New draft</h2>
              <div className="ba-row">
                <label>
                  <span>Template</span>
                  <select value={templateSlug} onChange={(e) => setTemplateSlug(e.target.value)}>
                    {templates.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Title</span>
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Article title"
                  />
                </label>
                <label>
                  <span>Slug</span>
                  <input
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="optional"
                  />
                </label>
              </div>
              <div className="ba-cat-block">
                <span className="ba-lbl">Category</span>
                <CategoryPills
                  categorySlug={newCategorySlug}
                  onChange={({ categorySlug }) => setNewCategorySlug(categorySlug)}
                />
              </div>
              <button
                type="button"
                className="ba-btn"
                disabled={busy || !newTitle.trim()}
                onClick={() => void createNew()}
              >
                Create draft
              </button>
            </section>
          ) : null}

          <section className="ba-panel">
            <h2>Articles</h2>
            <ul className="ba-list">
              {articles.map((a) => (
                <li key={a.slug}>
                  <button type="button" onClick={() => void openArticle(a.slug)} disabled={busy}>
                    <strong>{a.title}</strong>
                    <span>
                      {a.slug} · {a.source}/{a.status}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {error ? <p className="ba-error">{error}</p> : null}
      {message ? <p className="ba-ok">{message}</p> : null}
    </div>
  );
}

const BA_CSS = `
.ba{margin-top:1.25rem;color:#101112;font-family:Montserrat,system-ui,sans-serif}
.ba-note,.ba-hint{font-size:12px;line-height:1.5;color:#6d6658;margin:0 0 1rem}
.ba-note{border-left:2px solid #CFB078;padding-left:10px}
.ba-panel{margin-top:1rem;padding:1.25rem;background:#fff;border:1px solid rgba(16,17,18,.08)}
.ba-panel h2{margin:0 0 1rem;font:800 11px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase}
.ba-row{display:grid;gap:.75rem}
@media(min-width:720px){.ba-row{grid-template-columns:1.3fr 1.3fr .9fr}}
.ba-row label{display:grid;gap:.35rem}
.ba-lbl,.ba-row span{font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#6d6658}
.ba-cat-block{margin:1rem 0 0;display:grid;gap:.5rem}
.ba-row input,.ba-row select,.ba-select{
  border:1px solid rgba(16,17,18,.12);padding:.7rem .8rem;font:500 14px/1.3 Montserrat,system-ui,sans-serif;background:#fff;color:#101112;border-radius:0
}
.ba-btn{display:inline-flex;align-items:center;justify-content:center;border:0;background:#101112;color:#F5F1E9;padding:.7rem 1.1rem;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;width:fit-content;margin-top:1rem}
.ba-btn:disabled{opacity:.45}
.ba-chip{border:1px solid rgba(16,17,18,.15);background:#fff;padding:.45rem .75rem;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}
.ba-list{list-style:none;margin:0;padding:0;display:grid;gap:.35rem;max-height:360px;overflow:auto}
.ba-list button{width:100%;text-align:left;border:1px solid rgba(16,17,18,.06);background:#F5F1E9;padding:.75rem .85rem;cursor:pointer;display:grid;gap:.2rem}
.ba-list button:hover{border-color:rgba(16,17,18,.2)}
.ba-list strong{font-size:13px;font-weight:700}
.ba-list span{font-size:11px;color:#6d6658;letter-spacing:0;text-transform:none;font-weight:500}
.ba-edit{margin-top:.5rem}
.ba-toolbar{position:sticky;top:0;z-index:20;background:#F5F1E9;border:1px solid rgba(16,17,18,.1);padding:.85rem 1rem;margin-bottom:.75rem;display:grid;gap:.75rem}
.ba-toolbar__row{display:flex;flex-wrap:wrap;align-items:center;gap:.55rem}
.ba-toolbar__cats{display:grid;gap:.45rem;padding-top:.65rem;border-top:1px solid rgba(16,17,18,.08)}
.ba-slug{font-size:12px;background:rgba(16,17,18,.06);padding:.35rem .55rem}
.ba-muted{font-size:11px;color:#6d6658}
.ba-link{font-size:12px;color:#7A2E2E;font-weight:700;text-decoration:none;margin-left:auto}
.ba-error{color:#7A2E2E;margin-top:1rem;font-size:13px}
.ba-ok{color:#2f5d3a;margin-top:1rem;font-size:13px}
.ba-ro{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#6d6658}
`;
