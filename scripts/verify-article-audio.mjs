import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve("m:/ninarosshair/.env");
const env = {};
for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const i = t.indexOf("=");
  if (i < 1) continue;
  const k = t.slice(0, i).trim();
  let v = t.slice(i + 1).trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  env[k] = v;
}

const url = env.SUPABASE_URL;
const key =
  env.SUPABASE_SERVICE_ROLE_KEY ||
  env.SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_PUBLISHABLE_KEY;
const using = env.SUPABASE_SERVICE_ROLE_KEY ? "service_role" : "publishable";
console.log(`key_type=${using}`);
console.log(`url_host=${new URL(url).host}`);

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: rows, error: rowErr } = await sb
  .from("article_audio")
  .select("slug, path, text_hash, updated_at")
  .order("updated_at", { ascending: false });
console.log(`table_error=${rowErr?.message || "none"}`);
console.log(`table_rows=${rows?.length ?? 0}`);
for (const r of rows || []) console.log(`ROW ${r.slug} => ${r.path}`);

const { data: buckets, error: buckErr } = await sb.storage.listBuckets();
console.log(`buckets_error=${buckErr?.message || "none"}`);
console.log(
  `buckets=${JSON.stringify((buckets || []).map((b) => ({ name: b.name, public: b.public })))}`,
);

const { data: rootListed, error: rootErr } = await sb.storage
  .from("article-audio")
  .list("", { limit: 100 });
console.log(`root_error=${rootErr?.message || "none"}`);
console.log(`root_count=${rootListed?.length ?? 0}`);
for (const f of rootListed || []) {
  console.log(`ROOT ${f.name} id=${f.id ?? "folder?"} size=${f.metadata?.size ?? "-"}`);
}

const { data: listed, error: listErr } = await sb.storage
  .from("article-audio")
  .list("audio", { limit: 100 });
console.log(`list_error=${listErr?.message || "none"}`);
console.log(`list_count=${listed?.length ?? 0}`);
for (const f of listed || []) {
  console.log(
    `FILE ${f.name} size=${f.metadata?.size ?? f.metadata?.contentLength ?? "?"}`,
  );
}

for (const r of rows || []) {
  const { data, error } = await sb.storage.from("article-audio").download(r.path);
  if (error) console.log(`DL_FAIL ${r.path} :: ${error.message}`);
  else {
    const n = (await data.arrayBuffer()).byteLength;
    console.log(`DL_OK ${r.path} bytes=${n}`);
  }
  const { data: signed, error: signErr } = await sb.storage
    .from("article-audio")
    .createSignedUrl(r.path, 60);
  if (signErr || !signed?.signedUrl) {
    console.log(`SIGN_FAIL ${r.path} :: ${signErr?.message || "no url"}`);
  } else {
    const head = await fetch(signed.signedUrl, { method: "HEAD" });
    console.log(
      `SIGN_OK ${r.path} http=${head.status} type=${head.headers.get("content-type") || "?"} len=${head.headers.get("content-length") || "?"}`,
    );
  }
}
