"use client";

import { useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export type AdminState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

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
  const supabase = getSupabaseBrowser();
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: u.id,
    _role: "admin",
  });
  if (requestId !== roleRequestId) return;
  setState({ isAdmin: !error && data === true, loading: false });
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const supabase = getSupabaseBrowser();
  supabase.auth.onAuthStateChange((_event, session) => {
    const u = session?.user ?? null;
    setState({ user: u });
    void checkRole(u);
  });
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
