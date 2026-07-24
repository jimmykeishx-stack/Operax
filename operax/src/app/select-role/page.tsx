"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, Shield, UserCog } from "lucide-react";
import { AuthFrame } from "@/components/auth/auth-frame";
import { useAuth, type AppRole } from "@/components/auth/auth-provider";

const roles: { role: AppRole; title: string; description: string; icon: typeof Shield }[] = [{ role: "super_admin", title: "Super Admin", description: "Full system configuration, reporting, and account control.", icon: Shield }, { role: "supervisor", title: "Supervisor", description: "Dispatch jobs, balance workloads, and manage job states.", icon: BriefcaseBusiness }, { role: "admin", title: "Admin", description: "Manage operational records, archive history, and support teams.", icon: UserCog }];
export default function SelectRolePage() { const { pendingUser, selectRole, user, ready } = useAuth(); const router = useRouter(); useEffect(() => { if (!ready) return; if (user) router.replace("/"); else if (!pendingUser) router.replace("/login"); }, [pendingUser, ready, router, user]); if (!pendingUser) return null; return <AuthFrame title="Choose your workspace" description={`Signed in as ${pendingUser.email}. Select a role to start the simulated session.`}><div className="mt-8 space-y-3">{roles.map(({ role, title, description, icon: Icon }) => <button key={role} onClick={() => { selectRole(role); router.push("/"); }} className="flex w-full items-start gap-4 rounded-xl border bg-card p-5 text-left transition-colors hover:border-primary hover:bg-accent"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground"><Icon className="h-5 w-5" /></span><span><span className="block font-semibold text-card-foreground">{title}</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{description}</span></span></button>)}</div></AuthFrame>; }
