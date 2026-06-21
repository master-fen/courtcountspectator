import { useEffect, useState } from "react";

const STORAGE_KEY = "court-count-auth";

type AuthState = "guest" | "authed";

const listeners = new Set<(s: AuthState) => void>();

function readInitial(): AuthState {
  if (typeof window === "undefined") return "guest";
  return (window.localStorage.getItem(STORAGE_KEY) as AuthState) || "guest";
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(readInitial);

  useEffect(() => {
    const fn = (s: AuthState) => setState(s);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  const setAuth = (s: AuthState) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, s);
    }
    listeners.forEach((l) => l(s));
  };

  return {
    isAuthed: state === "authed",
    signIn: () => setAuth("authed"),
    signOut: () => setAuth("guest"),
    toggle: () => setAuth(state === "authed" ? "guest" : "authed"),
  };
}
