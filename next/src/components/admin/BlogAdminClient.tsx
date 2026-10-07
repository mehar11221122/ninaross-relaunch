"use client";

import { useCallback, useEffect, useState } from "react";
import type { ArticleBlock } from "@/content/posts";
import type { BlogDocument } from "@/lib/blog-cms";
import { uploadBlogAudio, uploadBlogImage } from "@/lib/blog-media-upload";
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

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="ba-field">
      <span>{label}</span>
      {multiline ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function ImageFileField({
  label,
  slug,
  kind,
  src,
  onUploaded,
}: {
  label: string;
  slug: string;
  kind: string;
  src: string;
  onUploaded: (result: { url: string; width: number; height: number }) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onPick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const result = await uploadBlogImage(slug, kind, file);
      onUploaded(result);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ba-media">
      <span className="ba-media__label">{label}</span>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={200} height={140} className="ba-media__thumb" />
      ) : (
        <p className="ba-media__empty">No image yet</p>
      )}
      <label className="ba-file">
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            void onPick(f);
          }}
        />
        {busy ? "Uploading…" : src ? "Replace image" : "Upload image"}
      </label>
      {err ? <p className="ba-media__err">{err}</p> : null}
    </div>
  );
}

function AudioFileField({ slug }: { slug: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const onPick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      await uploadBlogAudio(slug, file);
      setOk(`Uploaded audio/${slug}.mp3`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ba-media">
      <span className="ba-media__label">Listen audio (MP3)</span>
      <p className="ba-media__hint">
        Stored as <code>audio/{slug}.mp3</code> in Supabase. Replacing updates the live Listen
        player after save/refresh.
      </p>
      <label className="ba-file">
        <input
          type="file"
          accept="audio/mpeg,audio/mp3,.mp3"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            void onPick(f);
          }}
        />
        {busy ? "Uploading…" : "Upload MP3"}
      </label>
      {ok ? <p className="ba-media__ok">{ok}</p> : null}
      {err ? <p className="ba-media__err">{err}</p> : null}
    </div>
  );
}

function BlockEditor({
  block,
  index,
  slug,
  onChange,
}: {
  block: ArticleBlock;
  index: number;
  slug: string;
  onChange: (b: ArticleBlock) => void;
}) {
  const set = (patch: Partial<ArticleBlock> & { type: ArticleBlock["type"] }) =>
    onChange({ ...block, ...patch } as ArticleBlock);

  return (
    <div className="ba-block">
      <header>
        <strong>
          #{index + 1} · {block.type}
        </strong>
        <em>structure locked</em>
      </header>
      {block.type === "p" || block.type === "h3" || block.type === "pullquote" ? (
        <Field
          label="Text"
          multiline
          value={block.text}
          onChange={(text) => set({ type: block.type, text })}
        />
      ) : null}
      {block.type === "h2" ? (
        <>
          <Field label="Heading" value={block.text} onChange={(text) => set({ type: "h2", text })} />
          <Field label="TOC label" value={block.toc} onChange={(toc) => set({ type: "h2", toc })} />
          <Field label="Anchor id" value={block.id} onChange={(id) => set({ type: "h2", id })} />
        </>
      ) : null}
      {block.type === "figure" ? (
        <>
          <ImageFileField
            label="Figure image"
            slug={slug}
            kind={`figure-${index}`}
            src={block.src || ""}
            onUploaded={({ url }) => set({ type: "figure", src: url })}
          />
          <Field label="Alt" value={block.alt} onChange={(alt) => set({ type: "figure", alt })} />
          <Field
            label="Caption"
            value={block.caption}
            onChange={(caption) => set({ type: "figure", caption })}
          />
        </>
      ) : null}
      {block.type === "checklist" ? (
        <Field
          label="Items (one per line)"
          multiline
          value={block.items.join("\n")}
          onChange={(v) =>
            set({ type: "checklist", items: v.split("\n").map((s) => s.trim()).filter(Boolean) })
          }
        />
      ) : null}
      {block.type === "callout" ? (
        <>
          <Field
            label="Title"
            value={block.title || ""}
            onChange={(title) => set({ type: "callout", title })}
          />
          <Field
            label="Text"
            multiline
            value={block.text}
            onChange={(text) => set({ type: "callout", text })}
          />
        </>
      ) : null}
      {block.type === "booking" ? (
        <>
          <Field label="Lead" value={block.lead} onChange={(lead) => set({ type: "booking", lead })} />
          <Field
            label="Text"
            multiline
            value={block.text}
            onChange={(text) => set({ type: "booking", text })}
          />
        </>
      ) : null}
      {block.type === "table" ? (
        <Field
          label="Table JSON (head + rows)"
          multiline
          value={JSON.stringify({ head: block.head, rows: block.rows }, null, 2)}
          onChange={(v) => {
            try {
              const parsed = JSON.parse(v) as { head: string[]; rows: string[][] };
              set({ type: "table", head: parsed.head, rows: parsed.rows });
            } catch {
              /* ignore while typing */
            }
          }}
        />
      ) : null}
      {block.type === "timeline" ? (
        <Field
          label="Steps JSON"
          multiline
          value={JSON.stringify(block.steps, null, 2)}
          onChange={(v) => {
            try {
              set({ type: "timeline", steps: JSON.parse(v) as typeof block.steps });
            } catch {
              /* ignore */
            }
          }}
        />
      ) : null}
      {block.type === "foodgrid" ? (
        <Field
          label="Groups JSON"
          multiline
          value={JSON.stringify(block.groups, null, 2)}
          onChange={(v) => {
            try {
              set({ type: "foodgrid", groups: JSON.parse(v) as typeof block.groups });
            } catch {
              /* ignore */
            }
          }}
        />
      ) : null}
      {block.type === "links" ? (
        <>
          <Field
            label="Section title"
            value={block.title}
            onChange={(title) => set({ type: "links", title })}
          />
          <Field
            label="Links JSON"
            multiline
            value={JSON.stringify(block.items, null, 2)}
            onChange={(v) => {
              try {
                set({ type: "links", items: JSON.parse(v) as typeof block.items });
              } catch {
                /* ignore */
              }
            }}
          />
        </>
      ) : null}
      {block.type === "video" ? (
        <>
          <Field
            label="Title"
            value={block.title}
            onChange={(title) => set({ type: "video", title })}
          />
          <Field
            label="YouTube id"
            value={block.youtubeId || ""}
            onChange={(youtubeId) => set({ type: "video", youtubeId })}
          />
        </>
      ) : null}
    </div>
  );
}

export function BlogAdminClient() {
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

  const refreshList = useCallback(async () => {
    setError(null);
    try {
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
  }, [templateSlug]);

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
    } catch (e) {
      setError(e instanceof Error ? e.message : "Open failed");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!doc) return;
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
        }),
      });
      const json = (await res.json()) as {
        error?: string;
        hint?: string;
        slug?: string;
        document?: BlogDocument;
      };
      if (!res.ok) throw new Error(json.hint ? `${json.error} — ${json.hint}` : json.error || "Create failed");
      setMessage(`Created draft ${json.slug}. Fill TODOs, then publish.`);
      setNewTitle("");
      setNewSlug("");
      await refreshList();
      if (json.document) {
        setDoc(json.document);
        setStatus("draft");
        setSource("cms");
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
      <p className="ba-lead">
        Edit existing articles in place (section order locked). Create new posts by cloning a
        template’s structure — headings, body blocks, FAQ, figures — then fill the copy. Saves go
        to Supabase <code>blog_articles</code> and override static JSON when published.
      </p>
      <p className="ba-note">
        One-time setup: run <code>drizzle/migrations/0001_blog_articles.sql</code> and{" "}
        <code>0002_article_audio_storage_admin.sql</code> in the Supabase SQL editor if uploads or
        saves fail.
      </p>

      <section className="ba-panel">
        <h2>New blog from template</h2>
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
            <span>New title</span>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Article title" />
          </label>
          <label>
            <span>Slug (optional)</span>
            <input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="auto-from-title" />
          </label>
        </div>
        <button type="button" className="ba-btn" disabled={busy || !newTitle.trim()} onClick={() => void createNew()}>
          Create draft
        </button>
      </section>

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

      {doc ? (
        <section className="ba-panel ba-editor">
          <div className="ba-editor-head">
            <h2>
              Editing <code>{doc.slug}</code>
            </h2>
            <span>
              {source} ·{" "}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
            </span>
            <a href={`/blog/${doc.slug}`} target="_blank" rel="noreferrer">
              Preview →
            </a>
            <button type="button" className="ba-btn" disabled={busy} onClick={() => void save()}>
              Save
            </button>
          </div>

          <div className="ba-grid">
            <Field label="Title" value={doc.title} onChange={(title) => patchDoc({ title })} />
            <Field
              label="SEO title"
              value={doc.seoTitle}
              onChange={(seoTitle) => patchDoc({ seoTitle })}
            />
            <Field
              label="Short title"
              value={doc.shortTitle}
              onChange={(shortTitle) => patchDoc({ shortTitle })}
            />
            <Field
              label="Description"
              multiline
              value={doc.description}
              onChange={(description) => patchDoc({ description })}
            />
            <Field
              label="Subtitle"
              multiline
              value={doc.subtitle}
              onChange={(subtitle) => patchDoc({ subtitle })}
            />
            <Field
              label="Category"
              value={doc.category}
              onChange={(category) => patchDoc({ category })}
            />
            <Field
              label="Category slug"
              value={doc.categorySlug}
              onChange={(categorySlug) => patchDoc({ categorySlug })}
            />
            <Field
              label="Published (YYYY-MM-DD)"
              value={doc.published || ""}
              onChange={(published) => patchDoc({ published })}
            />
            <Field
              label="Read time (min)"
              value={String(doc.readTime)}
              onChange={(v) => patchDoc({ readTime: Number(v) || doc.readTime })}
            />
          </div>

          <h3>Hero</h3>
          <div className="ba-grid">
            <ImageFileField
              label="Hero image"
              slug={doc.slug}
              kind="hero"
              src={doc.hero.src}
              onUploaded={({ url }) => patchDoc({ hero: { ...doc.hero, src: url } })}
            />
            <ImageFileField
              label="OG image"
              slug={doc.slug}
              kind="og"
              src={doc.hero.og || ""}
              onUploaded={({ url }) => patchDoc({ hero: { ...doc.hero, og: url } })}
            />
            <Field
              label="Hero alt"
              value={doc.hero.alt}
              onChange={(alt) => patchDoc({ hero: { ...doc.hero, alt } })}
            />
            <Field
              label="Hero caption"
              multiline
              value={doc.hero.caption}
              onChange={(caption) => patchDoc({ hero: { ...doc.hero, caption } })}
            />
          </div>

          <h3>Listen audio</h3>
          <AudioFileField slug={doc.slug} />

          <h3>Author note</h3>
          <Field
            label="Note"
            multiline
            value={doc.note.text}
            onChange={(text) => patchDoc({ note: { ...doc.note, text } })}
          />

          <h3>Short answer</h3>
          <Field
            label="Short answer"
            multiline
            value={doc.shortAnswer.text}
            onChange={(text) =>
              patchDoc({ shortAnswer: { ...doc.shortAnswer, text } })
            }
          />
          <Field
            label="Takeaways (one per line)"
            multiline
            value={doc.shortAnswer.takeaways.join("\n")}
            onChange={(v) =>
              patchDoc({
                shortAnswer: {
                  ...doc.shortAnswer,
                  takeaways: v.split("\n").map((s) => s.trim()).filter(Boolean),
                },
              })
            }
          />

          <h3>Lead image (after short answer)</h3>
          <div className="ba-grid">
            <ImageFileField
              label="Lead image"
              slug={doc.slug}
              kind="lead"
              src={doc.leadFigure?.src || ""}
              onUploaded={({ url, width, height }) =>
                patchDoc({
                  leadFigure: {
                    src: url,
                    width,
                    height,
                    alt: doc.leadFigure?.alt || "",
                    caption: doc.leadFigure?.caption || "",
                  },
                })
              }
            />
            <Field
              label="Alt"
              value={doc.leadFigure?.alt || ""}
              onChange={(alt) =>
                patchDoc({
                  leadFigure: {
                    src: doc.leadFigure?.src || "",
                    width: doc.leadFigure?.width || 1200,
                    height: doc.leadFigure?.height || 900,
                    alt,
                    caption: doc.leadFigure?.caption || "",
                  },
                })
              }
            />
            <Field
              label="Caption"
              value={doc.leadFigure?.caption || ""}
              onChange={(caption) =>
                patchDoc({
                  leadFigure: {
                    src: doc.leadFigure?.src || "",
                    width: doc.leadFigure?.width || 1200,
                    height: doc.leadFigure?.height || 900,
                    alt: doc.leadFigure?.alt || "",
                    caption,
                  },
                })
              }
            />
          </div>

          <h3>Mid-article image</h3>
          <div className="ba-grid">
            <ImageFileField
              label="Mid image"
              slug={doc.slug}
              kind="mid"
              src={doc.midFigure?.src || ""}
              onUploaded={({ url, width, height }) =>
                patchDoc({
                  midFigure: {
                    src: url,
                    width,
                    height,
                    alt: doc.midFigure?.alt || "",
                    caption: doc.midFigure?.caption || "",
                  },
                })
              }
            />
            <Field
              label="Alt"
              value={doc.midFigure?.alt || ""}
              onChange={(alt) =>
                patchDoc({
                  midFigure: {
                    src: doc.midFigure?.src || "",
                    width: doc.midFigure?.width || 1200,
                    height: doc.midFigure?.height || 900,
                    alt,
                    caption: doc.midFigure?.caption || "",
                  },
                })
              }
            />
            <Field
              label="Caption"
              value={doc.midFigure?.caption || ""}
              onChange={(caption) =>
                patchDoc({
                  midFigure: {
                    src: doc.midFigure?.src || "",
                    width: doc.midFigure?.width || 1200,
                    height: doc.midFigure?.height || 900,
                    alt: doc.midFigure?.alt || "",
                    caption,
                  },
                })
              }
            />
          </div>

          <h3>Body sections (order fixed)</h3>
          {doc.body.map((block, i) => (
            <BlockEditor
              key={`${block.type}-${i}`}
              index={i}
              slug={doc.slug}
              block={block}
              onChange={(next) => {
                const body = [...doc.body];
                body[i] = next;
                patchDoc({ body });
              }}
            />
          ))}

          <h3>FAQ</h3>
          {doc.faq.map((item, i) => (
            <div key={i} className="ba-block">
              <Field
                label={`Q${i + 1}`}
                value={item.q}
                onChange={(q) => {
                  const faq = [...doc.faq];
                  faq[i] = { ...faq[i]!, q };
                  patchDoc({ faq });
                }}
              />
              <Field
                label={`A${i + 1}`}
                multiline
                value={item.a}
                onChange={(a) => {
                  const faq = [...doc.faq];
                  faq[i] = { ...faq[i]!, a };
                  patchDoc({ faq });
                }}
              />
            </div>
          ))}

          <h3>References</h3>
          {doc.references.map((ref, i) => (
            <div key={i} className="ba-block">
              <Field
                label="Title"
                value={ref.title || ""}
                onChange={(title) => {
                  const references = [...doc.references];
                  references[i] = { ...references[i]!, title };
                  patchDoc({ references });
                }}
              />
              <Field
                label="URL"
                value={ref.href || ""}
                onChange={(href) => {
                  const references = [...doc.references];
                  references[i] = { ...references[i]!, href };
                  patchDoc({ references });
                }}
              />
            </div>
          ))}

          <button type="button" className="ba-btn" disabled={busy} onClick={() => void save()}>
            Save changes
          </button>
        </section>
      ) : null}

      {error ? <p className="ba-error">{error}</p> : null}
      {message ? <p className="ba-ok">{message}</p> : null}
    </div>
  );
}

const BA_CSS = `
.ba{margin-top:2rem;color:#101112}
.ba-lead,.ba-note{font-size:13px;line-height:1.55;color:#6d6658;margin:0 0 .75rem}
.ba-note{border-left:2px solid #CFB078;padding-left:10px}
.ba-panel{margin-top:1.5rem;padding:1.25rem;background:#fff;border:1px solid rgba(16,17,18,.1)}
.ba-panel h2,.ba-panel h3{margin:0 0 .75rem;font-size:1rem}
.ba-row{display:grid;gap:.75rem}
@media(min-width:720px){.ba-row{grid-template-columns:1.2fr 1.4fr 1fr}}
.ba-row label,.ba-field{display:grid;gap:.35rem;font-size:12px;margin-bottom:.65rem}
.ba-row span,.ba-field span{font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.ba-row input,.ba-row select,.ba-field input,.ba-field textarea,.ba-editor-head select{
  border:1px solid rgba(16,17,18,.15);padding:.65rem .75rem;font:inherit;background:#F5F1E9
}
.ba-btn{margin-top:.75rem;border:0;background:#101112;color:#F5F1E9;padding:.7rem 1rem;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}
.ba-btn:disabled{opacity:.5}
.ba-list{list-style:none;margin:0;padding:0;display:grid;gap:.4rem;max-height:280px;overflow:auto}
.ba-list button{width:100%;text-align:left;border:1px solid rgba(16,17,18,.08);background:#F5F1E9;padding:.65rem .75rem;cursor:pointer;display:grid;gap:.2rem}
.ba-list strong{font-size:13px}
.ba-list span{font-size:11px;color:#6d6658}
.ba-editor-head{display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;margin-bottom:1rem}
.ba-editor-head a{font-size:12px;color:#7A2E2E}
.ba-grid{display:grid;gap:.5rem}
@media(min-width:900px){.ba-grid{grid-template-columns:1fr 1fr}}
.ba-block{border:1px dashed rgba(16,17,18,.2);padding:.75rem;margin:.75rem 0;background:#F5F1E9}
.ba-block header{display:flex;justify-content:space-between;margin-bottom:.5rem;font-size:12px}
.ba-block em{color:#6d6658;font-style:normal}
.ba-error{color:#7A2E2E;margin-top:1rem;font-size:13px}
.ba-ok{color:#2f5d3a;margin-top:1rem;font-size:13px}
.ba-media{display:grid;gap:.5rem;margin-bottom:.75rem}
.ba-media__label{font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.ba-media__thumb{max-width:220px;height:auto;object-fit:cover;border:1px solid rgba(16,17,18,.1);background:#eee}
.ba-media__empty,.ba-media__hint{margin:0;font-size:12px;color:#6d6658}
.ba-media__err{margin:0;font-size:12px;color:#7A2E2E}
.ba-media__ok{margin:0;font-size:12px;color:#2f5d3a}
.ba-file{display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:0;background:#101112;color:#F5F1E9;padding:.65rem 1rem;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;width:fit-content}
.ba-file input{display:none}
.ba-file:has(input:disabled){opacity:.5;cursor:not-allowed}
`;
