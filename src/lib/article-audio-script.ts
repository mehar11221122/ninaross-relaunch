// Builds the spoken script for an article. Shared by the admin "stale" check (browser)
// and the audio generator (server), so both hash exactly the same text.

type Block = any;
type Post = {
  title: string;
  note?: { text: string } | null;
  shortAnswer?: { text: string; takeaways?: string[] };
  body: Block[];
};

const PAUSE = ' <break time="1.2s" /> ';

function clean(s: unknown): string {
  return String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/Results not typical\.?\s*Individual results will vary\.?/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;/g, " ")
    .replace(/[◆○→]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const end = (s: string) => (/[.!?:]$/.test(s) ? s : `${s}.`);

// Units are the on-screen blocks the reader can follow along with while listening.
export function buildArticleUnits(post: Post): string[] {
  return collect(post).units;
}

export function buildArticleScript(post: Post): string {
  return collect(post).script;
}

function collect(post: Post): { script: string; units: string[] } {
  const parts: string[] = [];
  const units: string[] = [];
  const title = end(clean(post.title));
  parts.push(title);
  units.push(title);
  if (post.note?.text) {
    parts.push(`A note from Dr. Nina Ross. ${clean(post.note.text)}`);
    units.push(clean(post.note.text));
  }
  if (post.shortAnswer?.text) {
    const t = [clean(post.shortAnswer.text), ...(post.shortAnswer.takeaways ?? []).map((k) => end(clean(k)))];
    parts.push(`The short answer. ${t.join(" ")}`);
    units.push(...t);
  }
  let section: string[] = [];
  const flush = () => {
    if (section.length) parts.push(section.join(" "));
    section = [];
  };
  const push = (...xs: string[]) => {
    section.push(...xs);
    units.push(...xs.filter(Boolean));
  };
  for (const b of post.body) {
    switch (b.type) {
      case "h2":
        flush();
        push(end(clean(b.text)));
        break;
      case "h3":
        push(end(clean(b.text)));
        break;
      case "p":
      case "pullquote":
        push(clean(b.text));
        break;
      case "callout":
        push([b.title ? end(clean(b.title)) : "", clean(b.text)].filter(Boolean).join(" "));
        break;
      case "checklist":
        push(...(b.items ?? []).map((i: string) => end(clean(i))));
        break;
      case "timeline":
        push(...(b.steps ?? []).map((s: any) => `${end(clean(s.title))} ${clean(s.text)}`));
        break;
      case "foodgrid":
        push(
          ...(b.groups ?? []).map((g: any) => `${clean(g.title)}: ${(g.items ?? []).map(clean).join(", ")}.`),
        );
        break;
      default:
        break; // figures, tables, video, booking, links, raw html are not read
    }
  }
  flush();
  parts.push(
    "Thank you for listening. If you'd like to learn more, the full article is on screen with links to related topics.",
  );
  return { script: parts.filter(Boolean).join(PAUSE), units };
}

// Lowercase letters/digits only, for tolerant text matching.
export const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export function hashScript(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16) + ":" + s.length;
}
