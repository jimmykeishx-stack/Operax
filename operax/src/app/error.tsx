"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) { useEffect(() => { console.error(error); }, [error]); return <div className="grid min-h-[55vh] place-items-center"><div className="max-w-md rounded-xl border bg-card p-7 text-center shadow-sm"><AlertCircle className="mx-auto h-9 w-9 text-danger" /><h2 className="mt-4 text-xl font-semibold">Something went wrong</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Operax could not load this workspace. Your saved demo data is still available.</p><Button className="mt-5" onClick={reset}><RefreshCw className="h-4 w-4" />Try again</Button></div></div>; }
