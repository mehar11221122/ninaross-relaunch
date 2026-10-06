/**
 * Article listen player for Next kit articles.
 * Slug is taken only from body[data-slug]; API must echo the same slug.
 */
(function () {
  const slug = document.body?.dataset?.slug;
  if (!slug || !/^[a-z0-9-]{1,120}$/.test(slug)) return;

  const SPEEDS = [1, 1.5, 2];
  const fmt = (s) =>
    !isFinite(s) ? "0:00" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const posKey = `nr-audio-pos:${slug}`;

  let audioMeta = null;
  let audioChecked = false;
  let open = false;
  let playing = false;
  let speed = 1;
  let dock = null;
  /** @type {HTMLAudioElement|null} */
  let audioEl = null;
  /** @type {{ t: number, el: HTMLElement }[]} */
  let targets = [];
  /** @type {HTMLElement|null} */
  let lit = null;

  const mount = document.createElement("div");
  mount.className = "la-mount la-mount--in";

  function ensureMount() {
    const note = document.querySelector(".a3-note");
    if (!note || mount.isConnected) return !!note;
    const lbl = note.querySelector(".a3-note__lbl");
    if (lbl) lbl.after(mount);
    else note.prepend(mount);
    return true;
  }

  function ensureBy() {
    const meta = document.querySelector(".a3-by__m");
    if (!meta || meta.querySelector(".la-by")) return;
    const by = document.createElement("span");
    by.className = "la-by";
    meta.append(by);
  }

  async function load() {
    const res = await fetch(`/api/article-audio/${encodeURIComponent(slug)}`, {
      credentials: "same-origin",
      headers: { accept: "application/json" },
    });
    const data = await res.json().catch(() => null);
    // Reject any payload that isn't for this page's slug.
    if (!data || data.slug !== slug) {
      audioMeta = null;
      audioChecked = true;
      render();
      return;
    }
    if (data.audio) {
      if (data.audio.path && data.audio.path !== `audio/${slug}.mp3`) {
        audioMeta = null;
      } else if (data.slug !== slug) {
        audioMeta = null;
      } else {
        // Confirm the slug-bound file endpoint can actually stream before enabling play.
        try {
          const head = await fetch(data.audio.url, { method: "HEAD", credentials: "same-origin" });
          audioMeta = head.ok ? data.audio : null;
        } catch {
          audioMeta = null;
        }
      }
    } else {
      audioMeta = null;
    }
    audioChecked = true;
    render();
  }

  function mapCues() {
    if (!audioMeta?.cues?.length) {
      targets = [];
      return;
    }
    const els = Array.from(
      document.querySelectorAll(
        ".a3-h1, .a3-note > p:not(.a3-note__lbl):not(.a3-by__m), .a3-short p, .a3-short li, .a3-body h2, .a3-body h3, .a3-body > * p, .a3-body li, .a3-food__g",
      ),
    ).filter((e) => !e.closest(".a3-side, .a3-links, .a3-inbook, .a3-food ul, .la-mount, .a3-note__sig"));
    const texts = els.map((e) => norm(e.textContent || ""));
    const out = [];
    let from = 0;
    for (const c of audioMeta.cues) {
      const key = c.k.slice(0, 24);
      for (let i = from; i < els.length; i++) {
        const n = texts[i];
        if (n.startsWith(key) || (n.length >= 4 && key.startsWith(n.slice(0, 24)))) {
          out.push({ t: c.t, el: els[i] });
          from = i + 1;
          break;
        }
      }
    }
    targets = out;
  }

  function highlight(now) {
    let cur = null;
    for (const x of targets) {
      if (x.t <= now + 0.1) cur = x.el;
      else break;
    }
    if (cur === lit) return;
    lit?.classList.remove("la-hl");
    cur?.classList.add("la-hl");
    lit = cur;
  }

  function measureDock() {
    const col = document.querySelector(".a3-body h2")?.parentElement;
    if (col && window.innerWidth >= 1000) {
      const r = col.getBoundingClientRect();
      dock = { left: r.left, width: r.width };
    } else dock = null;
  }

  function start() {
    if (!audioMeta || !audioEl) return;
    open = true;
    render();
    requestAnimationFrame(() => {
      const a = audioEl;
      if (!a) return;
      const saved = Number(localStorage.getItem(posKey) || 0);
      if (saved > 0 && !a.currentTime) a.currentTime = saved;
      a.playbackRate = speed;
      void a.play();
    });
  }

  function close() {
    audioEl?.pause();
    open = false;
    lit?.classList.remove("la-hl");
    lit = null;
    render();
  }

  function render() {
    ensureBy();
    const by = document.querySelector(".la-by");
    if (by) {
      by.innerHTML = "";
      if (audioMeta) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "la-by__btn";
        btn.setAttribute("aria-label", "Listen to this article");
        btn.innerHTML = '<span aria-hidden="true">🎧</span> Listen';
        btn.addEventListener("click", start);
        by.append(btn);
      }
    }

    mount.innerHTML = "";
    if (!open) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "la-btn";
      if (!audioChecked) btn.setAttribute("aria-busy", "true");
      btn.innerHTML = `<span class="la-btn__ic" aria-hidden="true">▶</span><span><b>Listen to this article</b><small>${
        audioMeta
          ? "AI-generated voice of Dr. Nina Ross, ND"
          : audioChecked
            ? "Audio is temporarily unavailable"
            : "Loading audio..."
      }</small></span>`;
      btn.addEventListener("click", () => {
        if (audioMeta) start();
        else void load();
      });
      mount.append(btn);
    }

    if (audioMeta) {
      if (!audioEl || audioEl.dataset.slug !== slug) {
        audioEl?.remove();
        audioEl = document.createElement("audio");
        audioEl.dataset.slug = slug;
        audioEl.preload = "none";
        audioEl.src = audioMeta.url;
        audioEl.addEventListener("play", () => {
          playing = true;
          updateBar();
        });
        audioEl.addEventListener("pause", () => {
          playing = false;
          updateBar();
        });
        audioEl.addEventListener("timeupdate", () => {
          highlight(audioEl.currentTime);
          localStorage.setItem(posKey, String(Math.floor(audioEl.currentTime)));
          updateBar();
        });
        audioEl.addEventListener("ended", () => {
          localStorage.removeItem(posKey);
          open = false;
          lit?.classList.remove("la-hl");
          lit = null;
          render();
        });
        mount.append(audioEl);
      } else if (!audioEl.isConnected) {
        mount.append(audioEl);
      }
    }

    let bar = document.getElementById("la-bar");
    if (audioMeta && open) {
      mapCues();
      measureDock();
      if (!bar) {
        bar = document.createElement("div");
        bar.id = "la-bar";
        bar.className = "la-bar";
        bar.setAttribute("role", "region");
        bar.setAttribute("aria-label", "Article audio player");
        document.body.append(bar);
      }
      updateBar();
    } else if (bar) {
      bar.remove();
    }
  }

  function updateBar() {
    const bar = document.getElementById("la-bar");
    if (!bar || !audioEl) return;
    if (dock) {
      bar.style.left = `${dock.left}px`;
      bar.style.width = `${dock.width}px`;
      bar.style.right = "auto";
    } else {
      bar.style.left = "";
      bar.style.width = "";
      bar.style.right = "";
    }
    const t = audioEl.currentTime || 0;
    const dur = audioEl.duration || 0;
    bar.innerHTML = `
      <button type="button" class="la-ctl" data-act="back" aria-label="Back 15 seconds">↺15</button>
      <button type="button" class="la-play" data-act="toggle" aria-label="${playing ? "Pause" : "Play"}">${playing ? "❚❚" : "▶"}</button>
      <div class="la-mid">
        <div class="la-row">
          <span class="la-wave${playing ? " is-on" : ""}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <small class="la-ai">AI-generated voice of Dr. Nina Ross, ND</small>
        </div>
        <div class="la-row">
          <span class="la-time">${fmt(t)}</span>
          <input type="range" min="0" max="${dur || 0}" step="1" value="${t}" aria-label="Seek" data-act="seek" />
          <span class="la-time">${fmt(dur)}</span>
        </div>
      </div>
      <button type="button" class="la-ctl" data-act="speed" aria-label="Playback speed">${speed}x</button>
      <button type="button" class="la-ctl" data-act="close" aria-label="Close player">✕</button>
    `;
    bar.onclick = (e) => {
      const act = e.target?.closest?.("[data-act]")?.dataset?.act;
      if (!act || !audioEl) return;
      if (act === "back") audioEl.currentTime = Math.max(0, audioEl.currentTime - 15);
      if (act === "toggle") playing ? audioEl.pause() : void audioEl.play();
      if (act === "speed") {
        speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length] ?? 1;
        audioEl.playbackRate = speed;
        updateBar();
      }
      if (act === "close") close();
    };
    const range = bar.querySelector('input[data-act="seek"]');
    if (range) {
      range.addEventListener("input", (e) => {
        if (audioEl) audioEl.currentTime = Number(e.target.value);
      });
    }
  }

  window.addEventListener("resize", () => {
    if (!open) return;
    measureDock();
    updateBar();
  });

  const boot = () => {
    if (!ensureMount()) return false;
    ensureBy();
    render();
    void load();
    return true;
  };

  if (!boot()) {
    const obs = new MutationObserver(() => {
      if (boot()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    const t = setInterval(() => {
      if (boot()) {
        clearInterval(t);
        obs.disconnect();
      }
    }, 250);
  }
})();
