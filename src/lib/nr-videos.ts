import template from "./nr-videos-template.html?raw";

export function renderVideosParts() {
  const html = template;
  const bodyStart = html.indexOf(">", html.indexOf("<body")) + 1;
  const bodyEnd = html.lastIndexOf('<script src="js/blog.js');
  const body = html.slice(bodyStart, bodyEnd > bodyStart ? bodyEnd : html.lastIndexOf("</body>"));
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "";

  return { body, schema };
}