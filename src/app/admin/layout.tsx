import type { Metadata } from "next";
import { auth } from "@/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false }, // never index the admin
};

/**
 * Admin layout. Middleware already protects /admin/*, redirecting unauthenticated
 * users to /admin/login. Here we render the management chrome only when a
 * session exists, so the login page renders bare.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // No session (i.e. the login page): render children without the shell.
  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-dvh bg-secondary/30">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 border-r bg-background md:block">
        <AdminNav />
      </aside>
      <div className="flex-1">
        {/* Mobile top bar with nav */}
        <div className="border-b bg-background md:hidden">
          <AdminNav />
        </div>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
