import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getArticle } from "@/content/posts";
import { buildArticleScript, buildArticleUnits, hashScript, norm } from "./article-audio-script";

const slugSchema = z.object({ slug: z.string().regex(/^[a-z0-9-]{1,120}$/) });

// Public: signed URL for the stored MP3, or null when none exists yet.
export const getArticleAudio = createServerFn({ method: "GET" })
  .inputValidator((d) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("article_audio")
      .select("path, text_hash, updated_at")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!row) return null;
    const { data: signed } = await supabaseAdmin.storage
      .from("article-audio")
      .createSignedUrl(row.path, 60 * 60 * 6);
    if (!signed?.signedUrl) return null;
    let cues: { k: string; t: number }[] = [];
    try {
      const { data: file } = await supabaseAdmin.storage
        .from("article-audio")
        .download(row.path.replace(/\.mp3$/, ".json"));
      if (file) cues = JSON.parse(await file.text());
    } catch {
      cues = [];
    }
    return { url: signed.signedUrl, hash: row.text_hash, updatedAt: row.updated_at, cues };
  });

function chunk(script: string, max = 4200): string[] {
  const paras = script.split(/(?= <break time="1\.2s" \/> )/);
  const out: string[] = [];
  let cur = "";
  for (const p of paras) {
    if ((cur + p).length > max && cur) {
      out.push(cur);
      cur = "";
    }
    if (p.length > max) {
      for (const s of p.match(/[^.!?]+[.!?]+\s*/g) ?? [p]) {
        if ((cur + s).length > max && cur) {
          out.push(cur);
          cur = "";
        }
        cur += s;
      }
    } else cur += p;
  }
  if (cur.trim()) out.push(cur);
  return out.map((c) => c.trim());
}

// Admin only: synthesize the article in Dr. Nina's voice and store it as audio/[slug].mp3.
export const generateArticleAudio = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => slugSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Only admins can generate audio.");

    const apiKey = process.env["ELEVENLABS_API_KEY"];
    const voiceId = process.env["ELEVENLABS_VOICE_ID"];
    if (!apiKey || !voiceId) throw new Error("ElevenLabs is not connected.");

    const post = getArticle(data.slug) as any;
    if (!post) throw new Error("Article not found.");
    const script = buildArticleScript(post);
    const pieces = chunk(script);

    const buffers: Uint8Array[] = [];
    const units = buildArticleUnits(post);
    const cues: { k: string; t: number }[] = [];
    let ui = 0;
    let offset = 0;
    for (let i = 0; i < pieces.length; i++) {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
          body: JSON.stringify({
            text: pieces[i],
            model_id: "eleven_multilingual_v2",
            previous_text: pieces[i - 1]?.slice(-400),
            next_text: pieces[i + 1]?.slice(0, 400),
            voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.4, use_speaker_boost: true },
          }),
        },
      );
      if (!res.ok) {
        const body = await res.text();
        console.error(`ElevenLabs failed [${res.status}]: ${body}`);
        throw new Error(`ElevenLabs error ${res.status}: ${body.slice(0, 300)}`);
      }
      const json = (await res.json()) as {
        audio_base64: string;
        alignment?: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
      };
      const bin = atob(json.audio_base64);
      const bytes = new Uint8Array(bin.length);
      for (let j = 0; j < bin.length; j++) bytes[j] = bin.charCodeAt(j);
      buffers.push(bytes);
      const al = json.alignment;
      if (al) {
        // Normalized alignment text with a map back to character timings.
        let flat = "";
        const idx: number[] = [];
        al.characters.forEach((c, ci) => {
          const n = norm(c);
          for (const ch of n) {
            flat += ch;
            idx.push(ci);
          }
        });
        let cursor = 0;
        while (ui < units.length) {
          const key = norm(units[ui]!).slice(0, 24);
          if (!key) { ui++; continue; }
          const at = flat.indexOf(key, cursor);
          if (at < 0) break; // continues in next chunk
          cues.push({ k: norm(units[ui]!).slice(0, 40), t: +(offset + al.character_start_times_seconds[idx[at]!]!).toFixed(2) });
          cursor = at + key.length;
          ui++;
        }
        offset += al.character_end_times_seconds.at(-1) ?? 0;
      }
    }
    const total = buffers.reduce((n, b) => n + b.length, 0);
    const mp3 = new Uint8Array(total);
    let o = 0;
    for (const b of buffers) {
      mp3.set(b, o);
      o += b.length;
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const path = `audio/${data.slug}.mp3`;
    const up = await supabaseAdmin.storage
      .from("article-audio")
      .upload(path, mp3, { contentType: "audio/mpeg", upsert: true });
    if (up.error) throw new Error(up.error.message);
    const cueUp = await supabaseAdmin.storage
      .from("article-audio")
      .upload(`audio/${data.slug}.json`, new Blob([JSON.stringify(cues)], { type: "application/json" }), {
        contentType: "application/json",
        upsert: true,
      });
    if (cueUp.error) console.error("Cue upload failed:", cueUp.error.message);
    const hash = hashScript(script);
    const { error } = await supabaseAdmin
      .from("article_audio")
      .upsert({ slug: data.slug, path, text_hash: hash, char_count: script.length, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true, hash, chars: script.length };
  });
