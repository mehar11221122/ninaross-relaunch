import fs from "node:fs";
import path from "node:path";
import { HOST, nap } from "@/data/trust";
import { CONCERN_SLUGS, TREATMENT_SLUGS } from "@/lib/nr-detail";

export const dynamic = "force-dynamic";

type Named = { slug: string; name: string; title?: string };

function loadNamed(dir: string, slugs: string[]): Named[] {
  const root = path.join(process.cwd(), "src", "content", dir);
  return slugs.map((slug) => {
    const file = path.join(root, `${slug}.json`);
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as Named;
    return { slug, name: data.name || data.title || slug };
  });
}

export async function GET() {
  const concerns = loadNamed("concerns", CONCERN_SLUGS);
  const treatments = loadNamed("treatments", TREATMENT_SLUGS);
  const body = `# Nina Ross Hair Therapy

> Trichology and naturopathic hair restoration clinic in Sandy Springs, serving all of Metro Atlanta, specializing in textured hair and hair loss in Black women and men.

## About
Nina Ross Hair Therapy is led by Dr. Nina Ross, ND, a naturopathic doctor and trichologist. She designs and oversees every protocol; certified trichologists perform scalp evaluations under her direction. Every client's scalp is read at 200x magnification, and care is handled in-house.

## Location
- ${nap.name}
- ${nap.full}
- Phone: ${nap.phone}
- Hours: ${nap.hours}

## Offer
The $99 Hair & Body Discovery: a 30 minute visit with a 200x scalp read and a full-body biofeedback scan. Book: ${HOST}/book

## Conditions We Treat
${concerns.map((c) => `- [${c.name}](${HOST}/concerns/${c.slug})`).join("\n")}

## Treatments
${treatments.map((x) => `- [${x.name}](${HOST}/treatments/${x.slug})`).join("\n")}

## Links
- [Concerns](${HOST}/concerns)
- [Treatments](${HOST}/treatments)
- [Book](${HOST}/book)
- [About](${HOST}/about)
- [Blog](${HOST}/blog)
- [FAQ](${HOST}/faq)
`;
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
