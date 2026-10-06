import { useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AdminState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

/**
 * Shared admin/session store. Every component calling useAdmin()
 * subscribes to this ONE store — a single auth listener and a single
 * has_role check per auth change, no matter how many images are on the
 * page. (Previously each EditableImage ran its own copy of this hook,
 * flooding the page load with dozens of duplicate role checks that
 * competed with the actual image requests.)
 *
 * The role check hits the database (RLS-protected) so it can never be
 * faked client-side — worst case an attacker sees edit UI they can't use,
 * because every write is re-checked server-side.
 */

const SERVER_STATE: AdminState = { user: null, isAdmin: false, loading: true };
let state: AdminState = SERVER_STATE;
const listeners = new Set<() => void>();
let initialized = false;
let roleRequestId = 0;

function emit() {
  listeners.forEach((l) => l());
}

function setState(patch: Partial<AdminState>) {
  state = { ...state, ...patch };
  emit();
}

async function checkRole(u: User | null) {
  const requestId = ++roleRequestId;
  if (!u) {
    setState({ isAdmin: false, loading: false });
    return;
  }
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: u.id,
    _role: "admin",
  });
  // A newer auth event superseded this request — drop the stale result.
  if (requestId !== roleRequestId) return;
  setState({ isAdmin: !error && data === true, loading: false });
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // onAuthStateChange fires immediately with the current session
  // (INITIAL_SESSION), so this one subscription covers page load,
  // sign-in and sign-out — a single role check per auth change.
  supabase.auth.onAuthStateChange((_event, session) => {
    const u = session?.user ?? null;
    setState({ user: u });
    void checkRole(u);
  });

  // Re-verify the role when the tab regains focus, so a role granted
  // after sign-in takes effect without a full page reload.
  const onRefocus = () => {
    if (document.visibilityState === "visible") void checkRole(state.user);
  };
  window.addEventListener("focus", onRefocus);
  document.addEventListener("visibilitychange", onRefocus);
}

export function useAdmin(): AdminState {
  return useSyncExternalStore(
    (listener) => {
      init();
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    () => state,
    () => SERVER_STATE,
  );
}
