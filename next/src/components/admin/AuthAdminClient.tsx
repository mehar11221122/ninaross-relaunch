"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useAdmin } from "@/hooks/use-admin";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { ADMIN_IMAGE_SLOTS } from "@/lib/admin-slots";
import {
  getOverrideUrl,
  reloadImageOverrides,
  saveOverride,
  subscribeImageOverrides,
  getOverrideVersion,
} from "@/lib/image-overrides";
import { BlogAdminClient } from "@/components/admin/BlogAdminClient";

type Mode = "signin" | "signup";
type AdminTab = "blogs" | "images";

export function AuthAdminClient() {
  const { user, isAdmin, loading } = useAdmin();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overrideTick, setOverrideTick] = useState(0);
  const [savingSlot, setSavingSlot] = useState<string | null>(null);
  const [tab, setTab] = useState<AdminTab>("blogs");

  useEffect(() => {
    return subscribeImageOverrides(() => setOverrideTick(getOverrideVersion()));
  }, []);

  const slots = useMemo(() => {
    void overrideTick;
    return ADMIN_IMAGE_SLOTS.map((s) => ({
      ...s,
      liveUrl: getOverrideUrl(s.id) ?? s.defaultSrc,
      hasOverride: Boolean(getOverrideUrl(s.id)),
    }));
  }, [overrideTick]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    const supabase = getSupabaseBrowser();
    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (err) {
        setError(err.message);
        return;
      }
      setMessage("Signed in.");
    } else {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      setBusy(false);
      if (err) {
        setError(err.message);
        return;
      }
      setSignedUp(true);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    setError(null);
    const supabase = getSupabaseBrowser();
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth` },
    });
    if (err) {
      setBusy(false);
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    await getSupabaseBrowser().auth.signOut();
    setBusy(false);
    setMessage("Signed out.");
  };

  const handleUpload = async (slotId: string, file: File | undefined) => {
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) {
      setError("Drop a PNG, JPG, or WebP.");
      return;
    }
    setSavingSlot(slotId);
    setError(null);
    try {
      await saveOverride(slotId, file, user.id);
      await reloadImageOverrides();
      setMessage(`Updated ${slotId}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setSavingSlot(null);
    }
  };

  return (
    <div className="nr-auth">
      <style>{AUTH_CSS}</style>
      <div className="nr-auth__wrap">
        <Link href="/" className="nr-auth__back">
          ← Back to the site
        </Link>

        <div className="nr-auth__card">
          <p className="nr-auth__eyebrow">Site Admin.</p>

          {loading ? (
            <h1 className="nr-auth__title">Checking session…</h1>
          ) : user && isAdmin ? (
            <>
              <div className="nr-auth__top">
                <div>
                  <p className="nr-auth__eyebrow">CMS</p>
                  <h1 className="nr-auth__title">Blog editor.</h1>
                  <p className="nr-auth__lead nr-auth__lead--tight">
                    <strong>{user.email}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="nr-auth__btn nr-auth__btn--dark nr-auth__btn--sm"
                  disabled={busy}
                  onClick={() => void handleSignOut()}
                >
                  Sign out
                </button>
              </div>
              <div className="nr-auth__tabs">
                <button
                  type="button"
                  className={tab === "blogs" ? "is-on" : undefined}
                  onClick={() => setTab("blogs")}
                >
                  Blogs
                </button>
                <button
                  type="button"
                  className={tab === "images" ? "is-on" : undefined}
                  onClick={() => setTab("images")}
                >
                  Images
                </button>
              </div>

              {tab === "blogs" ? <BlogAdminClient /> : null}

              {tab === "images" ? (
                <>
                  <p className="nr-auth__note">
                    Landing image slots. Visitors load swaps via{" "}
                    <code>/api/public/site-image/…</code>.
                  </p>
                  <ul className="nr-auth__slots">
                    {slots.map((s) => (
                      <li key={s.id} className="nr-auth__slot">
                        <div className="nr-auth__slot-meta">
                          <strong>{s.label}</strong>
                          <span>{s.id}</span>
                          {s.hasOverride ? <em>override live</em> : <em>default</em>}
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.liveUrl} alt="" width={160} height={120} />
                        <label className="nr-auth__file">
                          <input
                            type="file"
                            accept="image/*"
                            disabled={savingSlot === s.id}
                            onChange={(e) =>
                              void handleUpload(s.id, e.target.files?.[0] ?? undefined)
                            }
                          />
                          {savingSlot === s.id ? "Saving…" : "Replace"}
                        </label>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </>
          ) : user && !isAdmin ? (
            <>
              <h1 className="nr-auth__title">Signed in.</h1>
              <p className="nr-auth__lead">
                You’re signed in as <strong>{user.email}</strong>, but this account is not an
                admin. Ask the project owner to grant the <code>admin</code> role in Supabase.
              </p>
              <button
                type="button"
                className="nr-auth__btn nr-auth__btn--dark"
                disabled={busy}
                onClick={() => void handleSignOut()}
              >
                Sign out
              </button>
            </>
          ) : signedUp ? (
            <>
              <h1 className="nr-auth__title">Check your inbox.</h1>
              <p className="nr-auth__lead">
                We sent a confirmation link to <strong>{email}</strong>. Confirm, then sign in.
              </p>
            </>
          ) : (
            <>
              <h1 className="nr-auth__title">
                {mode === "signin" ? "Sign in." : "Create account."}
              </h1>
              <p className="nr-auth__lead">
                Sign in to manage blogs and image overrides. This page is noindex and not linked in
                the public nav.
              </p>

              <form onSubmit={(e) => void handleSubmit(e)} className="nr-auth__form">
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    required
                    minLength={6}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </label>
                <button type="submit" className="nr-auth__btn nr-auth__btn--gold" disabled={busy}>
                  {busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              <div className="nr-auth__or">or</div>

              <button
                type="button"
                className="nr-auth__btn nr-auth__btn--outline"
                disabled={busy}
                onClick={() => void handleGoogle()}
              >
                Continue with Google
              </button>

              <button
                type="button"
                className="nr-auth__switch"
                onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
              >
                {mode === "signin" ? "Need an account? Create one" : "Have an account? Sign in"}
              </button>
            </>
          )}

          {error ? <p className="nr-auth__error">{error}</p> : null}
          {message ? <p className="nr-auth__ok">{message}</p> : null}
        </div>
      </div>
    </div>
  );
}

const AUTH_CSS = `
.nr-auth{min-height:100vh;background:#101112;color:#F5F1E9;font-family:Montserrat,system-ui,sans-serif;padding:2.5rem 1.25rem 4rem}
.nr-auth__wrap{max-width:68rem;margin:0 auto}
.nr-auth__back{display:inline-block;font-size:10px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,241,233,.7);text-decoration:none;margin-bottom:1.25rem}
.nr-auth__back:hover{color:#CFB078}
.nr-auth__card{background:#F5F1E9;color:#101112;padding:1.5rem;box-shadow:0 25px 50px rgba(0,0,0,.35)}
@media(min-width:640px){.nr-auth__card{padding:2rem}}
.nr-auth__top{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem;margin-top:.5rem}
.nr-auth__tabs{display:flex;gap:.4rem;margin:1.25rem 0 0;padding:.25rem;background:rgba(16,17,18,.06);width:fit-content}
.nr-auth__tabs button{border:0;background:transparent;padding:.6rem 1rem;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;color:#6d6658}
.nr-auth__tabs button.is-on{background:#101112;color:#F5F1E9}
.nr-auth__eyebrow{font-size:10px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#7A2E2E;margin:0}
.nr-auth__title{font-family:Georgia,"Times New Roman",serif;font-size:1.75rem;margin:.35rem 0 0;line-height:1.15}
.nr-auth__lead,.nr-auth__note{font-size:14px;line-height:1.6;color:#6d6658;margin:1rem 0 0}
.nr-auth__lead--tight{margin:.4rem 0 0;font-size:13px}
.nr-auth__note{font-size:12px;border-left:2px solid #CFB078;padding-left:12px}
.nr-auth__form{display:grid;gap:1rem;margin-top:2rem}
.nr-auth__form label{display:grid;gap:.4rem}
.nr-auth__form span{font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase}
.nr-auth__form input{border:1px solid rgba(16,17,18,.15);background:#fff;padding:.85rem 1rem;font:inherit}
.nr-auth__form input:focus{outline:none;border-color:#CFB078}
.nr-auth__btn{display:inline-flex;align-items:center;justify-content:center;width:100%;padding:.9rem 1rem;border:0;cursor:pointer;font:800 11px/1 Montserrat,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;margin-top:1rem;text-decoration:none;box-sizing:border-box}
.nr-auth__btn--sm{width:auto;margin-top:0;padding:.65rem 1rem;flex:none}
.nr-auth__btn:disabled{opacity:.55;cursor:not-allowed}
.nr-auth__btn--gold{background:#CFB078;color:#101112}
.nr-auth__btn--dark{background:#101112;color:#F5F1E9}
.nr-auth__btn--outline{background:transparent;color:#101112;border:1px solid #101112}
.nr-auth__or{display:flex;align-items:center;gap:1rem;margin:1.5rem 0;font-size:9px;font-weight:800;letter-spacing:.25em;text-transform:uppercase;color:#6d6658}
.nr-auth__or::before,.nr-auth__or::after{content:"";flex:1;height:1px;background:rgba(16,17,18,.1)}
.nr-auth__switch{display:block;width:100%;margin-top:1.5rem;background:none;border:0;cursor:pointer;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#7A2E2E}
.nr-auth__error{margin-top:1rem;color:#7A2E2E;font-size:13px}
.nr-auth__ok{margin-top:1rem;color:#2f5d3a;font-size:13px}
.nr-auth__slots{list-style:none;padding:0;margin:2rem 0 0;display:grid;gap:1rem}
.nr-auth__slot{display:grid;grid-template-columns:1fr auto;gap:.75rem 1rem;align-items:center;border:1px solid rgba(16,17,18,.1);padding:1rem;background:#fff}
.nr-auth__slot img{width:160px;height:120px;object-fit:cover;grid-row:span 2}
.nr-auth__slot-meta{display:flex;flex-direction:column;gap:.25rem;font-size:12px}
.nr-auth__slot-meta span,.nr-auth__slot-meta em{color:#6d6658;font-style:normal;font-size:11px}
.nr-auth__file{display:inline-flex;align-items:center;justify-content:center;padding:.55rem .9rem;background:#101112;color:#F5F1E9;font:800 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}
.nr-auth__file input{display:none}
@media(max-width:640px){
  .nr-auth__slot{grid-template-columns:1fr}
  .nr-auth__slot img{width:100%;height:160px}
}
`;
