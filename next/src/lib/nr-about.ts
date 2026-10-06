// Wraps the approved About page renderer for the TanStack route.
import { renderAbout } from "./nr-about-render.js";
import { HOST } from "@/data/trust";

const ninaPortrait = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291388/ninaross/lovable/about-kit/dr-nina-ross-nd-portrait-white-coat-nina-ross-atlanta.webp";
const clinicLobby = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291388/ninaross/lovable/about-kit/clinic-lobby-sandy-springs-nina-ross-atlanta.webp";
const scopeHealthy = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291389/ninaross/lovable/about-kit/scalp-200x-flaking-closeup-nina-ross-atlanta.webp";
const jamaalLassiter = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291389/ninaross/lovable/about-kit/jamaal-lassiter-team-portrait-nina-ross-atlanta.jpg";
const treatmentRoom = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291389/ninaross/lovable/about-kit/scalp-serum-application-treatment-room-nina-ross-atlanta.jpg";
const fmConsult = "https://res.cloudinary.com/bgjkk0du/image/upload/v1791291423/ninaross/lovable/fm/functional-medicine-body-scan-consultation-nina-ross-atlanta.webp";
const ASSETS: Record<string, string> = {
  "img/nina-portrait.webp": ninaPortrait,
  "img/clinic-lobby.webp": clinicLobby,
  "img/scope-healthy.webp": scopeHealthy,
  "img/jamaal-lassiter.jpg": jamaalLassiter,
  "img/treatment-room.jpg": treatmentRoom,
  "img/functional-medicine-consult.webp": fmConsult,
};

export function renderAboutParts() {
  let html: string = renderAbout();
  for (const [from, to] of Object.entries(ASSETS)) html = html.split(from).join(to);

  const publicPortraitUrl = ninaPortrait;
  const publicLobbyUrl = clinicLobby;
  html = html
    .split(`${HOST}/img/nina-portrait.webp`)
    .join(publicPortraitUrl)
    .split(`${HOST}/img/clinic-lobby.webp`)
    .join(publicLobbyUrl);

  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "";
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf("<script src=");
  const body = html.slice(bodyStart, bodyEnd);
  const heroPreload = html.match(/<link rel="preload" as="image" href="([^"]+)"/)?.[1];

  return { body, schema, heroPreload, publicPortraitUrl };
}