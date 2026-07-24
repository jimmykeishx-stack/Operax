"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AppRole = "super_admin" | "supervisor" | "admin";
export interface SessionUser { name: string; email: string; role: AppRole; }
interface PendingUser { name: string; email: string; }
interface AuthContextValue { user: SessionUser | null; pendingUser: PendingUser | null; ready: boolean; beginLogin: (email: string) => void; selectRole: (role: AppRole) => void; signOut: () => void; }
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const SESSION_KEY = "operax-demo-session";
const PENDING_KEY = "operax-demo-pending";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { const storedSession = window.localStorage.getItem(SESSION_KEY); const storedPending = window.localStorage.getItem(PENDING_KEY); if (storedSession) setUser(JSON.parse(storedSession)); if (storedPending) setPendingUser(JSON.parse(storedPending)); setReady(true); }, []);
  const beginLogin = (email: string) => { const candidate = { email, name: email.split("@")[0].split(/[._-]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") || "Operax User" }; window.localStorage.setItem(PENDING_KEY, JSON.stringify(candidate)); setPendingUser(candidate); };
  const selectRole = (role: AppRole) => { if (!pendingUser) return; const session = { ...pendingUser, role }; window.localStorage.setItem(SESSION_KEY, JSON.stringify(session)); window.localStorage.removeItem(PENDING_KEY); setUser(session); setPendingUser(null); };
  const signOut = () => { window.localStorage.removeItem(SESSION_KEY); window.localStorage.removeItem(PENDING_KEY); setUser(null); setPendingUser(null); };
  return <AuthContext.Provider value={{ user, pendingUser, ready, beginLogin, selectRole, signOut }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error("useAuth must be used within AuthProvider"); return context; }
