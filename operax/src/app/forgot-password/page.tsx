"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AuthFrame } from "@/components/auth/auth-frame";
import { Button, Input } from "@/components/ui";

export default function ForgotPasswordPage() { const [email, setEmail] = useState(""); const [sent, setSent] = useState(false); return <AuthFrame title="Reset your password" description="Enter your work email and we’ll simulate a recovery message.">{sent ? <div className="mt-8 rounded-xl border bg-card p-5"><CheckCircle2 className="h-7 w-7 text-success" /><h3 className="mt-4 font-semibold">Recovery message queued</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">In a production system, a reset link would be sent to {email}.</p><Link href="/login" className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline">Return to sign in</Link></div> : <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); if (email.includes("@")) setSent(true); }}><Input label="Work email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /><Button className="w-full" type="submit">Send recovery message</Button><Link href="/login" className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Back to sign in</Link></form>}</AuthFrame>; }
