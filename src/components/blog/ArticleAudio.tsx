import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useServerFn } from "@tanstack/react-start";
import { useAdmin } from "@/hooks/use-admin";
import { getArticleAudio, generateArticleAudio } from "@/lib/article-audio.functions";
import { buildArticleScript, hashScript, norm } from "@/lib/article-audio-script";

type Audio = { url: string; hash: string; updatedAt: string; cues?: { k: string; t: number }[] } | null;
const SPEEDS = [1, 1.5, 2];
const fmt = (s: number) =>
  !isFinite(s) ? "0:00" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function ArticleAudio({ post }: { post: any }) {
  const slug: string = post.slug;
  const fetchAudio = useServerFn(getArticleAudio);
  const genAudio = useServerFn(generateArticleAudio);
  const { isAdmin } = useAdmin();
  const [mount, setMount] = useState<HTMLElement | null>(null);
  const [byMount, setByMount] = useState<HTMLElement | null>(null);
  const targets = useRef<{ t: number; el: HTMLElement }[]>([]);
  const lit = useRef<HTMLElement | null>(null);
  const [audio, setAudio] = useState<Audio>(null);
  const [audioChecked, setAudioChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [gen, setGen] = useState<string | null>(null);
  const [dock, setDock] = useState<{ left: number; width: number } | null>(null);
  const el = useRef<HTMLAudioElement>(null);
  const key = `nr-audio-pos:${slug}`;
  const currentHash = useMemo(() => hashScript(buildArticleScript(post)), [post]);

  const load = () => fetchAudio({ data: { slug } })
    .then(setAudio)
    .catch(() => setAudio(null))
    .finally(() => setAudioChecked(true));

  useEffect(() => {
    let div: HTMLDivElement | null = null;
    let by: HTMLSpanElement | null = null;
    const attachBy = () => {
      if (by?.isConnected) return;
      const meta = document.querySelector(".a3-by__m");
      if (!meta) return;
      by = document.createElement("span");
      by.className = "la-by";
      meta.append(by);
      setByMount(by);
    };
    const attach = () => {
      attachBy();
      if (div?.isConnected) return true;
      const note = document.querySelector(".a3-note");
      if (!note) return false;
      div = document.createElement("div");
      div.className = "la-mount la-mount--in";
      const lbl = note.querySelector(".a3-note__lbl");
      if (lbl) lbl.after(div);
      else note.prepend(div);
      setMount(div);
      void load();
      return true;
    };
    attach();
    const observer = new MutationObserver(() => {
      if (!div?.isConnected || !by?.isConnected) attach();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = window.setInterval(attach, 250);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      div?.remove();
      by?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Desktop: dock to the reading column.
  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const col = document.querySelector(".a3-body h2")?.parentElement;
      if (col && window.innerWidth >= 1000) {
        const r = col.getBoundingClientRect();
        setDock({ left: r.left, width: r.width });
      } else setDock(null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  // Map timing cues to the matching on-screen blocks, in reading order.
  useEffect(() => {
    if (!open || !audio?.cues?.length) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".a3-h1, .a3-note > p:not(.a3-note__lbl):not(.a3-by__m), .a3-short p, .a3-short li, .a3-body h2, .a3-body h3, .a3-body > * p, .a3-body li, .a3-food__g",
      ),
    ).filter((e) => !e.closest(".a3-side, .a3-links, .a3-inbook, .a3-food ul, .la-mount, .a3-note__sig"));
    const texts = els.map((e) => norm(e.textContent || ""));
    const out: { t: number; el: HTMLElement }[] = [];
    let from = 0;
    for (const c of audio.cues) {
      const key = c.k.slice(0, 24);
      for (let i = from; i < els.length; i++) {
        const n = texts[i]!;
        if (n.startsWith(key) || (n.length >= 4 && key.startsWith(n.slice(0, 24)))) {
          out.push({ t: c.t, el: els[i]! });
          from = i + 1;
          break;
        }
      }
    }
    targets.current = out;
    return () => {
      lit.current?.classList.remove("la-hl");
      lit.current = null;
    };
  }, [open, audio]);

  const highlight = (now: number) => {
    let cur: HTMLElement | null = null;
    for (const x of targets.current) {
      if (x.t <= now + 0.1) cur = x.el;
      else break;
    }
    if (cur === lit.current) return;
    lit.current?.classList.remove("la-hl");
    cur?.classList.add("la-hl");
    lit.current = cur;
  };

  const start = () => {
    setOpen(true);
    requestAnimationFrame(() => {
      const a = el.current;
      if (!a) return;
      const saved = Number(localStorage.getItem(key) || 0);
      if (saved > 0 && !a.currentTime) a.currentTime = saved;
      a.playbackRate = speed;
      void a.play();
    });
  };
  const close = () => {
    el.current?.pause();
    setOpen(false);
  };

  const regenerate = async () => {
    setGen("Generating audio in Dr. Nina's voice. This can take a minute or two...");
    try {
      await genAudio({ data: { slug } });
      await load();
      setGen("Audio ready.");
    } catch (e: any) {
      setGen(e?.message || "Something went wrong.");
    }
  };

  if (!mount) return null;
  const stale = audio && audio.hash !== currentHash;

  return (
    <>
      {byMount && audio &&
        createPortal(
          <button type="button" className="la-by__btn" onClick={start} aria-label="Listen to this article">
            <span aria-hidden="true">🎧</span> Listen
          </button>,
          byMount,
        )}
      {createPortal(
    <>
      <style>{CSS}</style>
      {isAdmin && (
        <div className="la-admin">
          <b>Admin · Article audio</b>{" "}
          {audio ? (stale ? <span className="la-stale">Stale: article text changed since audio was made</span> : <span>Up to date</span>) : <span>No audio yet</span>}
          <button type="button" onClick={regenerate} disabled={!!gen && gen.startsWith("Generating")}>
            {audio ? "Regenerate audio" : "Generate audio"}
          </button>
          {gen && <small>{gen}</small>}
        </div>
      )}
      {!open && (
        <button
          type="button"
          className="la-btn"
          onClick={audio ? start : () => void load()}
          aria-busy={!audioChecked}
        >
          <span className="la-btn__ic" aria-hidden="true">▶</span>
          <span>
            <b>Listen to this article</b>
            <small>{audio ? "AI-generated voice of Dr. Nina Ross, ND" : audioChecked ? "Audio is temporarily unavailable" : "Loading audio..."}</small>
          </span>
        </button>
      )}
      {audio && (
        <audio
          ref={el}
          src={audio.url}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            setT(e.currentTarget.currentTime);
            highlight(e.currentTarget.currentTime);
            localStorage.setItem(key, String(Math.floor(e.currentTarget.currentTime)));
          }}
          onEnded={() => {
            localStorage.removeItem(key);
            setOpen(false);
            setT(0);
          }}
        />
      )}
      {audio && open &&
        createPortal(
          <div
            className="la-bar"
            role="region"
            aria-label="Article audio player"
            style={dock ? { left: dock.left, width: dock.width, right: "auto" } : undefined}
          >
            <button type="button" className="la-ctl" aria-label="Back 15 seconds" onClick={() => el.current && (el.current.currentTime = Math.max(0, el.current.currentTime - 15))}>↺15</button>
            <button type="button" className="la-play" aria-label={playing ? "Pause" : "Play"} onClick={() => (playing ? el.current?.pause() : el.current?.play())}>
              {playing ? "❚❚" : "▶"}
            </button>
            <div className="la-mid">
              <div className="la-row">
                <span className={`la-wave${playing ? " is-on" : ""}`} aria-hidden="true"><i /><i /><i /><i /></span>
                <small className="la-ai">AI-generated voice of Dr. Nina Ross, ND</small>
              </div>
              <div className="la-row">
                <span className="la-time">{fmt(t)}</span>
                <input
                  type="range"
                  min={0}
                  max={dur || 0}
                  step={1}
                  value={t}
                  aria-label="Seek"
                  onChange={(e) => el.current && (el.current.currentTime = Number(e.target.value))}
                />
                <span className="la-time">{fmt(dur)}</span>
              </div>
            </div>
            <button
              type="button"
              className="la-ctl"
              aria-label="Playback speed"
              onClick={() => {
                const s = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length] ?? 1;
                setSpeed(s);
                if (el.current) el.current.playbackRate = s;
              }}
            >
              {speed}x
            </button>
            <button type="button" className="la-ctl" aria-label="Close player" onClick={close}>✕</button>
          </div>,
          document.body,
        )}
    </>,
    mount,
  )}
    </>
  );
}

const CSS = `
.la-mount{width:min(720px,calc(100% - 40px));margin:0 auto}
.la-mount.la-mount--in{width:auto;margin:10px 0 14px}
.la-btn{display:flex;align-items:center;gap:14px;margin:20px 0 4px;padding:12px 18px 12px 12px;border:1px solid rgba(207,176,120,.55);border-radius:999px;background:transparent;color:var(--nr-ink,#101112);font-family:var(--font-sans,Montserrat,sans-serif);cursor:pointer;text-align:left;transition:background .2s}
.la-btn:hover{background:rgba(207,176,120,.1)}
.la-btn__ic{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--nr-gold,#CFB078);color:#171717;font-size:13px;padding-left:2px}
.la-btn b{display:block;font-size:15px;font-weight:700}
.la-btn small,.la-ai{display:block;font-size:11px;color:#6d6658;letter-spacing:.02em}
.la-bar{position:fixed;left:0;right:0;bottom:calc(var(--sticky-h,0px) + 0px);z-index:75;display:flex;align-items:center;gap:10px;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:rgba(16,17,18,.97);color:#F5F1E9;border-top:1px solid rgba(207,176,120,.45);font-family:var(--font-sans,Montserrat,sans-serif)}
@media(max-width:999px){.la-bar{bottom:calc(var(--sticky-h,0px) + 72px)}}
@media(min-width:1000px){.la-bar{bottom:16px;border:1px solid rgba(207,176,120,.45);border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.25)}}
.la-bar .la-ai{color:#CFB078}
.la-play{flex:none;width:42px;height:42px;border-radius:50%;border:0;background:var(--nr-gold,#CFB078);color:#171717;font-size:13px;cursor:pointer}
.la-ctl{flex:none;min-width:38px;height:36px;padding:0 8px;border-radius:8px;border:1px solid rgba(245,241,233,.2);background:transparent;color:#F5F1E9;font:600 12px var(--font-sans,Montserrat,sans-serif);cursor:pointer}
.la-mid{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}
.la-row{display:flex;align-items:center;gap:8px}
.la-row input{flex:1;min-width:0;accent-color:#CFB078}
.la-time{font-size:11px;font-variant-numeric:tabular-nums;color:rgba(245,241,233,.75)}
.la-wave{display:inline-flex;align-items:flex-end;gap:2px;height:12px}
.la-wave i{width:3px;height:3px;background:#CFB078;border-radius:1px}
.la-wave.is-on i{animation:la-w 1s ease-in-out infinite}
.la-wave.is-on i:nth-child(2){animation-delay:.15s}.la-wave.is-on i:nth-child(3){animation-delay:.3s}.la-wave.is-on i:nth-child(4){animation-delay:.45s}
@keyframes la-w{0%,100%{height:3px}50%{height:12px}}
@media(prefers-reduced-motion:reduce){.la-wave.is-on i{animation:none;height:8px}}
.la-admin{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:16px 0;padding:10px 14px;border:1px dashed #CFB078;border-radius:10px;font:13px var(--font-sans,Montserrat,sans-serif)}
.la-admin button{padding:6px 12px;border-radius:8px;border:0;background:#101112;color:#F5F1E9;cursor:pointer;font:600 12px inherit}
.la-admin button:disabled{opacity:.5}
.la-admin small{flex-basis:100%;color:#6d6658}
.la-by__btn{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:none;color:inherit;font:inherit;text-decoration:underline;text-decoration-color:#CFB078;text-underline-offset:3px;cursor:pointer}
.la-hl{background:rgba(207,176,120,.22);box-shadow:0 0 0 6px rgba(207,176,120,.22);border-radius:4px;transition:background .3s,box-shadow .3s}
.la-stale{color:#a1452f;font-weight:600}
`;
