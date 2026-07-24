import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { AuthProvider } from "@/components/auth/auth-provider";
import { JobStoreProvider } from "@/components/jobs/job-store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operax | Field Operations",
  description: "A Kibunja Builds System",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="h-full antialiased"><body className="min-h-full"><AuthProvider><JobStoreProvider><AppShell>{children}</AppShell></JobStoreProvider></AuthProvider></body></html>;
}
