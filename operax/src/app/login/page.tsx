"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AuthFrame } from "@/components/auth/auth-frame";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/components/auth/auth-provider";

export default function LoginPage() {
  const [email, setEmail] = useState("sarah.mwangi@operax.example"); const [password, setPassword] = useState("demo-password"); const [error, setError] = useState(""); const { beginLogin, user, ready } = useAuth(); const router = useRouter();
  useEffect(() => { if (ready && user) router.replace("/"); }, [ready, router, user]);
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!email.includes("@") || password.length < 4) { setError("Enter a valid email and a password of at least four characters."); return; } beginLogin(email); router.push("/select-role"); };
  return <AuthFrame title="Welcome back" description="Sign in to access your Operax operations workspace."><form className="mt-8 space-y-5" onSubmit={submit}><Input label="Work email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} error={error} autoComplete="email" /><Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /><div className="flex justify-end"><Link href="/forgot-password" className="text-sm font-semibold text-primary hover:underline">Forgot password?</Link></div><Button className="w-full" type="submit">Continue to role selection <ArrowRight className="h-4 w-4" /></Button></form><div className="mt-8 rounded-xl border bg-card p-4 text-sm text-muted-foreground"><p className="font-semibold text-card-foreground">Demo access</p><p className="mt-1">Use any valid email and a four-character password. Choose your simulated role on the next screen.</p></div></AuthFrame>;
}
