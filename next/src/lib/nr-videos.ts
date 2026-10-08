import fs from "node:fs";
import path from "node:path";
import {
  LIBRARY_SHORTS,
  LIBRARY_VIDEOS,
  SERIES_VIDEOS,
  type VideoEntry,
  youtubeEmbed,
  youtubeThumb,
  youtubeWatchUrl,
} from "@/lib/nr-videos-data";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderCard(v: VideoEntry): string {
  const isShort = v.format === "s";
  const cls = isShort ? "vd-card vd-card--s" : "vd-card vd-card--v";
  const tag = isShort ? "Short" : "Video";
  const href = youtubeWatchUrl(v.id, v.format);
  const thumb = youtubeThumb(v.id);
  const cats = v.cats.join(" ");
  return `<article class="${cls}" data-cat="${cats}" style="--c:${v.color}"><a class="vd-card__a" href="${esc(href)}" data-video data-yt="${esc(v.id)}" data-format="${v.format}" data-title="${esc(v.title)}" data-article="${esc(v.article)}"><span class="vd-card__media"><img src="${esc(thumb)}" width="480" height="360" alt="" loading="lazy" decoding="async"><span class="vd-play" aria-hidden="true"></span><span class="vd-tag">${tag}</span></span><span class="vd-card__b"><span class="vd-cat">${esc(v.label)}</span><h3>${esc(v.title)}</h3></span></a><a class="vd-rel" href="${esc(v.article)}">Read more on this →</a></article>`;
}

function renderLibraryGrid(): string {
  const videos = LIBRARY_VIDEOS.map(renderCard).join("\n");
  const shorts = LIBRARY_SHORTS.map(renderCard).join("\n");
  const shortBandClass =
    LIBRARY_SHORTS.length === 5 ? "vd-band vd-band--s vd-band--s5" : "vd-band vd-band--s";
  return `<div class="vd-grid" data-vgrid>
      <div class="vd-band vd-band--v">${videos}</div>
      <div class="${shortBandClass}">${shorts}</div>
    </div>`;
}

function schemaVideoItem(v: VideoEntry, position: number): object {
  return {
    "@type": "ListItem",
    position,
    item: {
      "@type": "VideoObject",
      name: v.title,
      thumbnailUrl: youtubeThumb(v.id),
      embedUrl: youtubeEmbed(v.id),
      contentUrl: youtubeWatchUrl(v.id, v.format),
      description: `${v.title}. Dr. Nina Ross, ND, Nina Ross Atlanta.`,
      publisher: { "@id": "https://www.ninaross.co/#organization" },
    },
  };
}

function buildSchema(): string {
  const all = [...SERIES_VIDEOS, ...LIBRARY_VIDEOS, ...LIBRARY_SHORTS];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.ninaross.co/videos#page",
        url: "https://www.ninaross.co/videos",
        name: "Hair Loss Videos from Dr. Nina Ross",
        description:
          "Short answers and full videos on hair loss, CCCA, hormones and scalp health.",
        publisher: { "@id": "https://www.ninaross.co/#organization" },
        mainEntity: { "@id": "https://www.ninaross.co/videos#list" },
      },
      {
        "@type": "ItemList",
        "@id": "https://www.ninaross.co/videos#list",
        itemListElement: all.map((v, i) => schemaVideoItem(v, i + 1)),
      },
      {
        "@type": "Organization",
        "@id": "https://www.ninaross.co/#organization",
        name: "Nina Ross Atlanta",
        url: "https://www.ninaross.co",
        sameAs: [
          "https://www.youtube.com/@NinaRossAtl",
          "https://instagram.com/ninarossatl",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.ninaross.co/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Videos",
            item: "https://www.ninaross.co/videos",
          },
        ],
      },
    ],
  };
  return JSON.stringify(graph);
}

const template = fs.readFileSync(
  path.join(process.cwd(), "src", "lib", "nr-videos-template.html"),
  "utf8",
);

export function renderVideosParts() {
  const html = template;
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf('<script src="js/blog.js');
  let body = html.slice(bodyStart, bodyEnd > bodyStart ? bodyEnd : html.lastIndexOf("</body>"));

  // Swap the static library grid for live YouTube cards
  const gridStart = body.indexOf('<div class="vd-grid" data-vgrid>');
  const moreStart = body.indexOf('<p class="vd-more">');
  if (gridStart >= 0 && moreStart > gridStart) {
    body =
      body.slice(0, gridStart) + renderLibraryGrid() + "\n    " + body.slice(moreStart);
  }

  return { body, schema: buildSchema() };
}
