import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/** Load parent repo `.env` into process.env for local Next (secrets stay outside next/). */
function loadParentEnv() {
  const envPath = path.join(root, "..", ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
loadParentEnv();

/** Legacy Shopify /blogs/* → /blog/{slug} (301). */
const LEGACY_BLOG_REDIRECTS: { source: string; destination: string }[] = [
  {
    source: "/blogs/hair-loss/hair-loss-and-potassium-deficiency-what-s-the-relationship",
    destination: "/blog/hair-loss-and-potassium-deficiency",
  },
  {
    source: "/blogs/hair-loss/hair-loss-epidemic-among-black-women",
    destination: "/blog/hair-loss-epidemic-among-black-women",
  },
  {
    source: "/blogs/hair-loss/how-to-stop-alopecia-areata-from-getting-worse",
    destination: "/blog/how-to-stop-alopecia-areata-from-spreading",
  },
  {
    source: "/blogs/hair-loss/how-to-stop-alopecia-areata-from-spreading",
    destination: "/blog/how-to-stop-alopecia-areata-from-spreading",
  },
  {
    source: "/blogs/hair-loss/minoxidil-itchy-scalp-know-the-surprising-facts",
    destination: "/blog/minoxidil-itchy-scalp",
  },
  {
    source: "/blogs/hair-loss/stop-hair-loss-with-dht-blockers",
    destination: "/blog/stop-hair-loss-with-dht-blockers",
  },
  {
    source: "/blogs/hair-loss/things-to-do-before-you-google-trichologist-near-me",
    destination: "/blog/choosing-a-trichologist-near-me",
  },
  {
    source: "/blogs/hair-loss/traction-alopecia-when-is-it-too-late",
    destination: "/blog/traction-alopecia-reversibility",
  },
  {
    source: "/blogs/hair-loss/trichologist-for-black-hair",
    destination: "/blog/trichologist-for-black-hair",
  },
  {
    source: "/blogs/health-wellness-posts/7-amazing-amino-acids-for-hair-regrowth-you-should-know",
    destination: "/blog/amino-acids-for-hair-regrowth",
  },
  {
    source: "/blogs/health-wellness-posts/magnesium-for-hair-growth",
    destination: "/blog/magnesium-for-hair-growth",
  },
  {
    source: "/blogs/health-wellness-posts/magnesium-hair-growth",
    destination: "/blog/magnesium-for-hair-growth",
  },
  {
    source:
      "/blogs/health-wellness-posts/unlocking-the-secret-to-radiance-l-lysine-benefits-for-skin-before-and-after",
    destination: "/blog/l-lysine-benefits-for-skin",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/bgjkk0du/**",
      },
    ],
  },
  async redirects() {
    return LEGACY_BLOG_REDIRECTS.map((r) => ({
      source: r.source,
      destination: r.destination,
      statusCode: 301 as const,
    }));
  },
};

export default nextConfig;
