import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | Nina Ross" },
      { name: "description", content: "Sign in to manage the site's images." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  // Already signed in? Head back to the site.
  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) {
        toast.error("Couldn't sign you in", { description: error.message });
        return;
      }
      navigate({ to: "/", replace: true });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setBusy(false);
      if (error) {
        toast.error("Couldn't create the account", { description: error.message });
        return;
      }
      setSignedUp(true);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in failed", { description: result.error.message });
      return;
    }
    if (result.redirected) return; // browser is navigating to Google
    setBusy(false);
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="hero-texture flex min-h-screen items-center justify-center bg-ink px-5 py-16">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.22em] text-cream/70 uppercase transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-3.5" /> Back to the site
        </Link>

        <div className="mt-6 bg-cream p-8 shadow-2xl sm:p-10">
          <p className="eyebrow eyebrow--maroon">Site Admin.</p>
          <h1 className="headline mt-3 text-3xl sm:text-4xl">
            {signedUp ? "Check Your Inbox." : mode === "signin" ? "Sign In." : "Create Account."}
          </h1>

          {signedUp ? (
            <div className="mt-6 flex gap-4 border border-gold/50 bg-card p-5">
              <MailCheck className="size-6 shrink-0 text-maroon" />
              <p className="text-sm leading-relaxed text-stone-warm">
                We sent a confirmation link to{" "}
                <span className="font-bold text-ink">{email}</span>. Click it to confirm your
                account, then come back and sign in.
              </p>
            </div>
          ) : (
            <>
              <p className="mt-3 text-sm leading-relaxed text-stone-warm">
                Sign in to drag &amp; drop new images onto the site. Changes go live for every
                visitor.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="block">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-ink uppercase">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5 w-full border border-ink/15 bg-card px-4 py-3 text-sm text-ink outline-none placeholder:text-stone-warm/60 focus:border-gold"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-ink uppercase">
                    Password
                  </span>
                  <input
                    type="password"
                    required
                    minLength={6}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1.5 w-full border border-ink/15 bg-card px-4 py-3 text-sm text-ink outline-none placeholder:text-stone-warm/60 focus:border-gold"
                  />
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="btn btn-gold w-full justify-center disabled:opacity-60"
                >
                  {busy && <Loader2 className="size-4 animate-spin" />}
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-ink/10" />
                <span className="text-[9px] font-extrabold tracking-[0.25em] text-stone-warm uppercase">
                  Or
                </span>
                <span className="h-px flex-1 bg-ink/10" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={busy}
                className="btn btn-outline-dark w-full justify-center disabled:opacity-60"
              >
                Continue With Google
              </button>

              <button
                type="button"
                onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
                className="mt-6 w-full text-center text-[10px] font-extrabold tracking-[0.18em] text-maroon uppercase transition-colors hover:text-ink"
              >
                {mode === "signin" ? "Need an account? Create one" : "Have an account? Sign in"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
