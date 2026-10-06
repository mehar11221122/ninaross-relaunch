// Wraps the approved hub renderer (/concerns and /treatments) for the TanStack routes.
// @ts-expect-error plain JS module from the approved kit
import { renderHub } from "./nr-hub-render.js";
import hubs from "@/content/_hubs.json";

const ninaPortrait = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291388/ninaross/lovable/about-kit/dr-nina-ross-nd-portrait-white-coat-nina-ross-atlanta.webp";
const scopeHealthy = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291389/ninaross/lovable/about-kit/scalp-200x-flaking-closeup-nina-ross-atlanta.webp";
const scalpMacro = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291424/ninaross/lovable/hub-kit/scalp-200x-flaking-closeup-nina-ross-atlanta.webp";
const ASSETS: Record<string, string> = {
  "img/nina-portrait.webp": ninaPortrait,
  "img/scope-healthy.webp": scopeHealthy,
  "img/scalp-macro.webp": scalpMacro,
};

export type HubKey = "conditions" | "treatments";

export function renderHubParts(key: HubKey) {
  let html: string = renderHub(key, hubs as never);
  for (const [from, to] of Object.entries(ASSETS)) html = html.split(from).join(to);

  const hub = (hubs as Record<string, { slug: string; seoTitle: string; description: string }>)[key]!;
  const heroUrl = key === "conditions" ? scalpMacro : scopeHealthy;
  const publicHeroUrl = heroUrl;

  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "";
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf("<script src=");
  const body = html.slice(bodyStart, bodyEnd);

  return {
    body,
    schema,
    heroUrl,
    publicHeroUrl,
    slug: hub.slug,
    title: hub.seoTitle,
    description: hub.description,
  };
}
