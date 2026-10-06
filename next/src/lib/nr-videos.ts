import fs from "node:fs";
import path from "node:path";

const template = fs.readFileSync(
  path.join(process.cwd(), "src", "lib", "nr-videos-template.html"),
  "utf8",
);

export function renderVideosParts() {
  const html = template;
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf('<script src="js/blog.js');
  const body = html.slice(bodyStart, bodyEnd > bodyStart ? bodyEnd : html.lastIndexOf("</body>"));
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "";

  return { body, schema };
}
