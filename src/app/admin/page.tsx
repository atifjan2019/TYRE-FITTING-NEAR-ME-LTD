import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Icon } from "@/components/icon";
import { RESOURCES, RESOURCE_ORDER } from "@/lib/admin/resources";

// Always render fresh in the admin (no caching of management views).
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [counties, towns, services, posts, reviews, faqs, brands] =
    await Promise.all([
      prisma.county.count(),
      prisma.town.count(),
      prisma.service.count(),
      prisma.blogPost.count(),
      prisma.review.count(),
      prisma.faq.count(),
      prisma.brand.count(),
    ]);

  const counts: Record<string, number> = {
    counties,
    towns,
    services,
    posts,
    reviews,
    faqs,
    brands,
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Signed in as admin. Manage your site content below.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCE_ORDER.map((key) => {
          const r = RESOURCES[key];
          return (
            <div key={key} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold">{r.labelPlural}</div>
                    <div className="text-sm text-muted-foreground">
                      {counts[key]} item{counts[key] === 1 ? "" : "s"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <Link href={`/admin/${key}`} className="font-medium text-primary hover:underline">
                  Manage
                </Link>
                <Link
                  href={`/admin/${key}/new`}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  <Plus className="h-3.5 w-3.5" /> Add new
                </Link>
              </div>
            </div>
          );
        })}

        <Link
          href="/admin/settings"
          className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon name="settings" className="h-5 w-5" />
            </span>
            <div>
              <div className="font-semibold">Site settings</div>
              <div className="text-sm text-muted-foreground">
                Phone, WhatsApp, counters, SEO
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
