"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { ArticleBlock } from "@/content/posts";
import type { BlogDocument } from "@/lib/blog-cms";
import { uploadBlogAudio, uploadBlogImage } from "@/lib/blog-media-upload";

type Props = {
  doc: BlogDocument;
  readOnly?: boolean;
  onChange: (patch: Partial<BlogDocument>) => void;
};

function PencilBtn({
  onClick,
  label,
  busy,
}: {
  onClick: () => void;
  label: string;
  busy?: boolean;
}) {
  return (
    <button
      type="button"
      className="bve-pen"
      onClick={onClick}
      aria-label={label}
      title={label}
      disabled={busy}
    >
      {busy ? "…" : "✎"}
    </button>
  );
}

function EditableText({
  value,
  onChange,
  readOnly,
  multiline,
  className,
  as: Tag = "span",
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  readOnly?: boolean;
  multiline?: boolean;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "figcaption" | "li";
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const block = Tag === "h1" || Tag === "h2" || Tag === "h3" || Tag === "p" || Tag === "figcaption" || Tag === "li";
  const Wrap: "div" | "span" = block ? "div" : "span";

  if (readOnly) {
    return <Tag className={className}>{value}</Tag>;
  }
  return (
    <Wrap className={`bve-slot ${open ? "is-open" : ""} ${block ? "bve-slot--block" : ""}`}>
      <PencilBtn label={`Edit ${label}`} onClick={() => setOpen((o) => !o)} />
      {open ? (
        multiline ? (
          <textarea
            className="bve-input bve-input--multi"
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setOpen(false)}
            autoFocus
          />
        ) : (
          <input
            className="bve-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setOpen(false)}
            autoFocus
          />
        )
      ) : (
        <Tag className={className}>{value || <em className="bve-empty">({label} empty)</em>}</Tag>
      )}
    </Wrap>
  );
}

function EditableImage({
  src,
  alt,
  slug,
  kind,
  readOnly,
  className,
  width,
  height,
  onUploaded,
  label,
}: {
  src: string;
  alt: string;
  slug: string;
  kind: string;
  readOnly?: boolean;
  className?: string;
  width?: number;
  height?: number;
  label: string;
  onUploaded: (r: { url: string; width: number; height: number }) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const pick = async (file: File | undefined) => {
    if (!file || readOnly) return;
    setBusy(true);
    setErr(null);
    try {
      onUploaded(await uploadBlogImage(slug, kind, file));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <span className="bve-slot bve-slot--img">
      {!readOnly ? (
        <>
          <PencilBtn
            label={`Replace ${label}`}
            busy={busy}
            onClick={() => inputRef.current?.click()}
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              void pick(f);
            }}
          />
        </>
      ) : null}
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={className}
          src={src}
          alt={alt || label}
          width={width || 1200}
          height={height || 900}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const ph = e.currentTarget.nextElementSibling;
            if (ph instanceof HTMLElement) ph.hidden = false;
          }}
        />
      ) : null}
      <div className="bve-img-ph" hidden={Boolean(src)}>
        No {label} — click ✎ to upload
      </div>
      {err ? <span className="bve-err">{err}</span> : null}
    </span>
  );
}

function ListenAudioEditor({ slug, readOnly }: { slug: string; readOnly?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [hasLocal, setHasLocal] = useState(false);
  const audioId = useId();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(`/api/article-audio/${encodeURIComponent(slug)}/file`, {
          method: "HEAD",
        });
        if (!cancelled) setHasLocal(res.ok);
      } catch {
        if (!cancelled) setHasLocal(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, ok]);

  const pick = async (file: File | undefined) => {
    if (!file || readOnly) return;
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      await uploadBlogAudio(slug, file);
      setOk(`Audio saved for ${slug}`);
      setHasLocal(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bve-audio">
      <div className="bve-slot bve-slot--audio">
        {!readOnly ? (
          <>
            <PencilBtn
              label="Upload listen audio (MP3)"
              busy={busy}
              onClick={() => inputRef.current?.click()}
            />
            <input
              ref={inputRef}
              id={audioId}
              type="file"
              accept="audio/mpeg,audio/mp3,.mp3"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                void pick(f);
              }}
            />
          </>
        ) : null}
        <button
          type="button"
          className="bve-listen"
          onClick={() => !readOnly && inputRef.current?.click()}
        >
          <span className="bve-listen__ic" aria-hidden="true">
            ▶
          </span>
          <span>
            <b>{busy ? "Uploading…" : hasLocal ? "Listen to this article" : "Add listen audio"}</b>
            <small>{readOnly ? (hasLocal ? "Audio on file" : "No audio") : "Upload MP3"}</small>
          </span>
        </button>
      </div>
      {ok ? <p className="bve-ok">{ok}</p> : null}
      {err ? <p className="bve-err">{err}</p> : null}
      {hasLocal ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio controls src={`/api/article-audio/${encodeURIComponent(slug)}/file`} className="bve-audio-el" />
      ) : null}
    </div>
  );
}

function patchBlock(
  body: ArticleBlock[],
  index: number,
  next: ArticleBlock,
): ArticleBlock[] {
  const copy = [...body];
  copy[index] = next;
  return copy;
}

function BlockView({
  block,
  index,
  doc,
  readOnly,
  onChange,
}: {
  block: ArticleBlock;
  index: number;
  doc: BlogDocument;
  readOnly?: boolean;
  onChange: (patch: Partial<BlogDocument>) => void;
}) {
  const set = (next: ArticleBlock) => onChange({ body: patchBlock(doc.body, index, next) });

  switch (block.type) {
    case "p":
      return (
        <EditableText
          as="p"
          label={`paragraph ${index + 1}`}
          value={block.text}
          multiline
          readOnly={readOnly}
          onChange={(text) => set({ type: "p", text })}
        />
      );
    case "h2":
      return (
        <EditableText
          as="h2"
          label={`heading ${index + 1}`}
          value={block.text}
          readOnly={readOnly}
          onChange={(text) => set({ ...block, type: "h2", text })}
        />
      );
    case "h3":
      return (
        <EditableText
          as="h3"
          label={`subheading ${index + 1}`}
          value={block.text}
          readOnly={readOnly}
          onChange={(text) => set({ type: "h3", text })}
        />
      );
    case "pullquote":
      return (
        <blockquote className="bve-pq">
          <EditableText
            as="p"
            label="pull quote"
            value={block.text}
            multiline
            readOnly={readOnly}
            onChange={(text) => set({ type: "pullquote", text })}
          />
        </blockquote>
      );
    case "figure":
      return (
        <figure className="bve-fig">
          <EditableImage
            label={`figure ${index + 1}`}
            slug={doc.slug}
            kind={`figure-${index}`}
            src={block.src || ""}
            alt={block.alt}
            width={block.width}
            height={block.height}
            readOnly={readOnly}
            onUploaded={({ url, width, height }) =>
              set({ ...block, type: "figure", src: url, width, height })
            }
          />
          <EditableText
            as="figcaption"
            label="figure caption"
            value={block.caption}
            readOnly={readOnly}
            onChange={(caption) => set({ ...block, type: "figure", caption })}
          />
        </figure>
      );
    case "checklist":
      return (
        <ul className="bve-check">
          {block.items.map((item, i) => (
            <li key={i}>
              <EditableText
                as="span"
                label={`checklist item ${i + 1}`}
                value={item}
                readOnly={readOnly}
                onChange={(v) => {
                  const items = [...block.items];
                  items[i] = v;
                  set({ type: "checklist", items });
                }}
              />
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className={`bve-call ${block.tone === "attention" ? "is-attn" : ""}`}>
          <EditableText
            as="p"
            label="callout text"
            value={`${block.title ? `${block.title} — ` : ""}${block.text}`}
            multiline
            readOnly={readOnly}
            onChange={(text) => set({ ...block, type: "callout", title: undefined, text })}
          />
        </div>
      );
    case "booking":
      return (
        <div className="bve-book">
          <EditableText
            as="p"
            label="booking"
            value={`${block.lead} ${block.text}`}
            multiline
            readOnly={readOnly}
            onChange={(text) => set({ type: "booking", lead: block.lead, text })}
          />
        </div>
      );
    case "timeline":
      return (
        <ol className="bve-tl">
          {block.steps.map((step, i) => (
            <li key={i}>
              <EditableText
                as="span"
                label={`step ${i + 1} title`}
                value={step.title}
                readOnly={readOnly}
                onChange={(title) => {
                  const steps = block.steps.map((s, j) =>
                    j === i ? { ...s, title } : s,
                  );
                  set({ type: "timeline", steps });
                }}
              />
              <EditableText
                as="p"
                label={`step ${i + 1} text`}
                value={step.text}
                multiline
                readOnly={readOnly}
                onChange={(text) => {
                  const steps = block.steps.map((s, j) =>
                    j === i ? { ...s, text } : s,
                  );
                  set({ type: "timeline", steps });
                }}
              />
            </li>
          ))}
        </ol>
      );
    case "foodgrid":
      return (
        <div className="bve-food">
          {block.groups.map((g, gi) => (
            <div key={gi}>
              <EditableText
                as="h3"
                label={`food group ${gi + 1}`}
                value={g.title}
                readOnly={readOnly}
                onChange={(title) => {
                  const groups = block.groups.map((x, j) =>
                    j === gi ? { ...x, title } : x,
                  );
                  set({ type: "foodgrid", groups });
                }}
              />
              <ul>
                {g.items.map((item, ii) => (
                  <li key={ii}>
                    <EditableText
                      as="span"
                      label={`food item ${gi + 1}.${ii + 1}`}
                      value={item}
                      readOnly={readOnly}
                      onChange={(v) => {
                        const groups = block.groups.map((x, j) => {
                          if (j !== gi) return x;
                          const items = [...x.items];
                          items[ii] = v;
                          return { ...x, items };
                        });
                        set({ type: "foodgrid", groups });
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "links":
      return (
        <nav className="bve-links">
          <EditableText
            as="h2"
            label="links title"
            value={block.title}
            readOnly={readOnly}
            onChange={(title) => set({ ...block, type: "links", title })}
          />
          {block.items.map((l, i) => (
            <div key={i} className="bve-link-row">
              <small>{l.kind}</small>
              <EditableText
                as="span"
                label={`link ${i + 1} title`}
                value={l.title}
                readOnly={readOnly}
                onChange={(title) => {
                  const items = block.items.map((x, j) =>
                    j === i ? { ...x, title } : x,
                  );
                  set({ ...block, type: "links", items });
                }}
              />
              <EditableText
                as="p"
                label={`link ${i + 1} text`}
                value={l.text}
                readOnly={readOnly}
                onChange={(text) => {
                  const items = block.items.map((x, j) =>
                    j === i ? { ...x, text } : x,
                  );
                  set({ ...block, type: "links", items });
                }}
              />
            </div>
          ))}
        </nav>
      );
    case "table":
    case "video":
      return (
        <div className="bve-complex">
          <em>{block.type} — edit in advanced fields below if needed</em>
        </div>
      );
    default:
      return null;
  }
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="bve">
      <style>{BVE_CSS}</style>
      <div className="bve-canvas">{children}</div>
    </div>
  );
}

export function BlogVisualEditor({ doc, readOnly, onChange }: Props) {
  const midAt = Math.max(1, Math.floor(doc.body.length * 0.55));

  return (
    <Shell>
      <figure className="bve-hero">
        <EditableImage
          label="hero image"
          className="bve-hero__img"
          slug={doc.slug}
          kind="hero"
          src={doc.hero.src}
          alt={doc.hero.alt}
          width={doc.hero.width}
          height={doc.hero.height}
          readOnly={readOnly}
          onUploaded={({ url, width, height }) =>
            onChange({ hero: { ...doc.hero, src: url, width, height } })
          }
        />
        <div className="bve-hero__in">
          <p className="bve-crumbs">
            Home / Blog / <span>{doc.category}</span>
          </p>
          <span className="bve-cat">{doc.category}</span>
          <EditableText
            as="h1"
            className="bve-h1"
            label="title"
            value={doc.title}
            readOnly={readOnly}
            onChange={(title) => onChange({ title, seoTitle: title, shortTitle: title })}
          />
          <EditableText
            as="p"
            className="bve-sub"
            label="subtitle"
            value={doc.subtitle}
            multiline
            readOnly={readOnly}
            onChange={(subtitle) => onChange({ subtitle })}
          />
          <EditableText
            as="figcaption"
            className="bve-cap"
            label="hero caption"
            value={doc.hero.caption}
            readOnly={readOnly}
            onChange={(caption) => onChange({ hero: { ...doc.hero, caption } })}
          />
        </div>
      </figure>

      <section className="bve-section">
        <p className="bve-kicker">A note from Dr. Nina Ross, ND</p>
        <EditableText
          as="p"
          className="bve-note"
          label="author note"
          value={doc.note.text}
          multiline
          readOnly={readOnly}
          onChange={(text) => onChange({ note: { ...doc.note, text } })}
        />
        <ListenAudioEditor slug={doc.slug} readOnly={readOnly} />
        <p className="bve-byline">
          <b>Written and reviewed by Dr. Nina Ross, ND</b>
          <span>
            Published{" "}
            <EditableText
              as="span"
              label="published date"
              value={doc.published || ""}
              readOnly={readOnly}
              onChange={(published) => onChange({ published })}
            />
            {" · "}
            <EditableText
              as="span"
              label="read time"
              value={String(doc.readTime)}
              readOnly={readOnly}
              onChange={(v) => onChange({ readTime: Number(v) || doc.readTime })}
            />{" "}
            min read
          </span>
        </p>
      </section>

      <section className="bve-section bve-short">
        <h2>The short answer</h2>
          <EditableText
            as="p"
            label="short answer"
            value={doc.shortAnswer.text}
            multiline
            readOnly={readOnly}
            onChange={(text) =>
              onChange({ shortAnswer: { ...doc.shortAnswer, text } })
            }
          />
          <ul>
            {doc.shortAnswer.takeaways.map((t, i) => (
              <li key={i}>
                <EditableText
                  as="span"
                  label={`takeaway ${i + 1}`}
                  value={t}
                  readOnly={readOnly}
                  onChange={(v) => {
                    const takeaways = [...doc.shortAnswer.takeaways];
                    takeaways[i] = v;
                    onChange({ shortAnswer: { ...doc.shortAnswer, takeaways } });
                  }}
                />
              </li>
            ))}
          </ul>
        {(doc.leadFigure || !readOnly) && (
          <figure className="bve-fig">
            <EditableImage
              label="lead image"
              slug={doc.slug}
              kind="lead"
              src={doc.leadFigure?.src || ""}
              alt={doc.leadFigure?.alt || ""}
              width={doc.leadFigure?.width}
              height={doc.leadFigure?.height}
              readOnly={readOnly}
              onUploaded={({ url, width, height }) =>
                onChange({
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
            <EditableText
              as="figcaption"
              label="lead caption"
              value={doc.leadFigure?.caption || ""}
              readOnly={readOnly}
              onChange={(caption) =>
                onChange({
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
          </figure>
        )}
      </section>

      <article className="bve-section bve-prose">
        {doc.body.map((block, i) => (
          <div key={`${block.type}-${i}`} className="bve-block">
            <BlockView
              block={block}
              index={i}
              doc={doc}
              readOnly={readOnly}
              onChange={onChange}
            />
            {i === midAt - 1 && (doc.midFigure || !readOnly) ? (
              <figure className="bve-fig">
                <EditableImage
                  label="mid image"
                  slug={doc.slug}
                  kind="mid"
                  src={doc.midFigure?.src || ""}
                  alt={doc.midFigure?.alt || ""}
                  width={doc.midFigure?.width}
                  height={doc.midFigure?.height}
                  readOnly={readOnly}
                  onUploaded={({ url, width, height }) =>
                    onChange({
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
                <EditableText
                  as="figcaption"
                  label="mid caption"
                  value={doc.midFigure?.caption || ""}
                  readOnly={readOnly}
                  onChange={(caption) =>
                    onChange({
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
              </figure>
            ) : null}
          </div>
        ))}

        {doc.faq.length ? (
          <section className="bve-faq">
            <h2>Frequently asked questions</h2>
            {doc.faq.map((item, i) => (
              <div key={i} className="bve-faq__item">
                <h3>
                  <EditableText
                    as="span"
                    label={`FAQ Q${i + 1}`}
                    value={item.q}
                    readOnly={readOnly}
                    onChange={(q) => {
                      const faq = [...doc.faq];
                      faq[i] = { ...faq[i]!, q };
                      onChange({ faq });
                    }}
                  />
                </h3>
                <EditableText
                  as="p"
                  label={`FAQ A${i + 1}`}
                  value={item.a}
                  multiline
                  readOnly={readOnly}
                  onChange={(a) => {
                    const faq = [...doc.faq];
                    faq[i] = { ...faq[i]!, a };
                    onChange({ faq });
                  }}
                />
              </div>
            ))}
          </section>
        ) : null}

        {doc.references.length ? (
          <section className="bve-refs">
            <h2>References</h2>
            <ol>
              {doc.references.map((ref, i) => (
                <li key={i}>
                  <EditableText
                    as="span"
                    label={`ref ${i + 1} title`}
                    value={ref.title || ""}
                    readOnly={readOnly}
                    onChange={(title) => {
                      const references = [...doc.references];
                      references[i] = { ...references[i]!, title };
                      onChange({ references });
                    }}
                  />
                  {" · "}
                  <EditableText
                    as="span"
                    label={`ref ${i + 1} url`}
                    value={ref.href || ""}
                    readOnly={readOnly}
                    onChange={(href) => {
                      const references = [...doc.references];
                      references[i] = { ...references[i]!, href };
                      onChange({ references });
                    }}
                  />
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </article>

      <section className="bve-section bve-meta">
        <h2>SEO</h2>
        <EditableText
          as="p"
          label="meta description"
          value={doc.description}
          multiline
          readOnly={readOnly}
          onChange={(description) => onChange({ description })}
        />
        <p className="bve-kicker">OG image</p>
        <EditableImage
          label="OG image"
          slug={doc.slug}
          kind="og"
          src={doc.hero.og || ""}
          alt="OG"
          readOnly={readOnly}
          onUploaded={({ url }) => onChange({ hero: { ...doc.hero, og: url } })}
        />
      </section>
    </Shell>
  );
}

const BVE_CSS = `
.bve{margin-top:.5rem;border:1px solid rgba(16,17,18,.1);background:#fff;overflow:hidden}
.bve-canvas{color:#101112;font-family:Georgia,"Times New Roman",serif;line-height:1.55}
.bve-hero{margin:0;background:#101112;color:#F5F1E9}
.bve-hero__img{display:block;width:100%;max-height:280px;object-fit:cover;background:#1a1a1a}
.bve-hero .bve-img-ph{min-height:160px;background:#1a1a1a;color:rgba(245,241,233,.55);border:0}
.bve-hero__in{padding:1.25rem 1.25rem 1.5rem}
.bve-crumbs{margin:0 0 .5rem;font:600 11px/1.4 Montserrat,system-ui,sans-serif;opacity:.7}
.bve-cat{display:inline-block;margin-bottom:.75rem;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#CFB078}
.bve-h1{margin:0 0 .5rem;font-size:clamp(1.6rem,4vw,2.2rem);line-height:1.15;font-weight:700}
.bve-sub{margin:0 0 .75rem;font-family:Montserrat,system-ui,sans-serif;font-size:15px;opacity:.85}
.bve-cap{margin:0;font:500 12px/1.4 Montserrat,system-ui,sans-serif;opacity:.65}
.bve-section{padding:1.35rem 1.25rem;border-top:1px solid rgba(16,17,18,.08)}
.bve-kicker{margin:0 0 .65rem;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#7A2E2E}
.bve-note{margin:0;font-size:1.05rem}
.bve-byline{margin:1rem 0 0;display:grid;gap:.35rem;font:500 13px/1.4 Montserrat,system-ui,sans-serif;color:#6d6658}
.bve-short h2,.bve-prose h2,.bve-faq h2,.bve-refs h2,.bve-meta h2,.bve-links h2{margin:0 0 .85rem;font:800 1.15rem/1.25 Georgia,"Times New Roman",serif}
.bve-short ul{margin:.75rem 0 0;padding-left:1.1rem}
.bve-short li{margin:.35rem 0}
.bve-fig{margin:1.25rem 0;padding:0}
.bve-fig img{display:block;width:100%;height:auto;max-height:360px;object-fit:cover;background:#eee}
.bve-fig figcaption{margin-top:.5rem;font:500 13px/1.4 Montserrat,system-ui,sans-serif;color:#6d6658}
.bve-prose{display:grid;gap:1rem}
.bve-block{position:relative}
.bve-prose p{margin:0;font-size:1.02rem}
.bve-prose h2{margin:1.25rem 0 .5rem}
.bve-prose h3{margin:.85rem 0 .4rem;font-size:1.05rem}
.bve-pq{margin:1rem 0;padding:1rem 1.1rem;border-left:3px solid #CFB078;background:#F5F1E9;font-size:1.15rem}
.bve-check{margin:.5rem 0;padding-left:1.1rem}
.bve-call{margin:1rem 0;padding:1rem;background:#F5F1E9;border:1px solid rgba(16,17,18,.08)}
.bve-call.is-attn{border-color:rgba(122,46,46,.35)}
.bve-book{margin:1rem 0;padding:1rem;background:#101112;color:#F5F1E9}
.bve-tl{margin:.75rem 0;padding-left:1.2rem;display:grid;gap:.75rem}
.bve-food{display:grid;gap:1rem}
@media(min-width:700px){.bve-food{grid-template-columns:1fr 1fr}}
.bve-links{display:grid;gap:.75rem}
.bve-link-row{padding:.75rem 0;border-bottom:1px solid rgba(16,17,18,.08);display:grid;gap:.25rem}
.bve-link-row small{font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#6d6658}
.bve-faq__item{padding:.85rem 0;border-bottom:1px solid rgba(16,17,18,.08)}
.bve-faq__item h3{margin:0 0 .4rem;font-size:1.05rem}
.bve-refs ol{margin:0;padding-left:1.2rem}
.bve-complex{padding:.75rem;border:1px dashed rgba(16,17,18,.2);color:#6d6658;font:500 13px Montserrat,system-ui,sans-serif}
.bve-slot{position:relative;display:inline-block;max-width:100%;vertical-align:top}
.bve-slot--block,.bve-slot.is-open{display:block;width:100%}
.bve-slot--img,.bve-slot--audio{display:block;width:100%}
.bve-pen{position:absolute;top:.15rem;right:.15rem;z-index:5;width:26px;height:26px;border:0;border-radius:50%;background:#CFB078;color:#101112;font:700 13px/1 Georgia,serif;cursor:pointer;opacity:0;transition:opacity .15s}
.bve-slot:hover .bve-pen,.bve-slot:focus-within .bve-pen,.bve-slot.is-open .bve-pen{opacity:1}
.bve-pen:disabled{opacity:.5}
.bve-input{width:100%;box-sizing:border-box;font:inherit;padding:.55rem .65rem;border:2px solid #CFB078;background:#fff;color:#101112}
.bve-input--multi{min-height:5.5rem;resize:vertical}
.bve-empty{opacity:.4;font-style:italic;font-family:Montserrat,system-ui,sans-serif;font-size:13px}
.bve-err{margin:.35rem 0 0;color:#7A2E2E;font:500 12px Montserrat,system-ui,sans-serif}
.bve-ok{margin:.35rem 0 0;color:#2f5d3a;font:500 12px Montserrat,system-ui,sans-serif}
.bve-img-ph{min-height:160px;display:grid;place-items:center;background:rgba(16,17,18,.05);border:1px dashed rgba(16,17,18,.2);color:#6d6658;font:500 13px Montserrat,system-ui,sans-serif}
.bve-audio{margin-top:1rem}
.bve-listen{display:flex;align-items:center;gap:12px;width:100%;max-width:420px;padding:10px 14px 10px 10px;border:1px solid rgba(207,176,120,.55);border-radius:999px;background:transparent;cursor:pointer;text-align:left;font-family:Montserrat,system-ui,sans-serif;color:#101112}
.bve-listen__ic{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#CFB078;font-size:12px}
.bve-listen b{display:block;font-size:14px}
.bve-listen small{display:block;font-size:11px;color:#6d6658}
.bve-audio-el{display:block;width:100%;max-width:420px;margin-top:.65rem}
`;
