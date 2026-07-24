"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNavigation } from "@/components/layout/top-navigation";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/components/auth/auth-provider";

const publicPaths = ["/login", "/forgot-password", "/select-role"];
export function AppShell({ children }: { children: React.ReactNode }) { const [mobileMenuOpen, setMobileMenuOpen] = useState(false); const [theme, setTheme] = useState<"light" | "dark">("light"); const pathname = usePathname(); const router = useRouter(); const { user, ready } = useAuth(); const isPublic = publicPaths.includes(pathname); useEffect(() => { const stored = window.localStorage.getItem("operax-theme") as "light" | "dark" | null; const resolved = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); setTheme(resolved); document.documentElement.classList.toggle("dark", resolved === "dark"); }, []); useEffect(() => { if (!ready || isPublic || user) return; router.replace("/login"); }, [isPublic, ready, router, user]); const toggleTheme = () => { const next = theme === "light" ? "dark" : "light"; setTheme(next); window.localStorage.setItem("operax-theme", next); document.documentElement.classList.toggle("dark", next === "dark"); }; if (isPublic) return <>{children}</>; if (!ready || !user) return <div className="grid min-h-screen place-items-center bg-background"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-label="Loading session" /></div>; return <div className="min-h-screen bg-background text-foreground"><Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} /><div className="lg:pl-72"><TopNavigation onMenuClick={() => setMobileMenuOpen(true)} theme={theme} onThemeToggle={toggleTheme} /><main className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">{children}</main><Footer /></div></div>; }
