import Link from "next/link";
import { Plus, ArrowUpRight, ExternalLink, Settings as SettingsIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Icon } from "@/components/icon";
import { RESOURCES, RESOURCE_ORDER } from "@/lib/admin/resources";
import { SITE } from "@/lib/site-config";

// Always render fresh in the admin (no caching of management views).
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [leads, services, posts, reviews, faqs] = await Promise.all([
    prisma.lead.count(),
    prisma.service.count(),
    prisma.blogPost.count(),
    prisma.review.count(),
    prisma.faq.count(),
  ]);

  const counts: Record<string, number> = {
    leads,
    services,
    posts,
    reviews,
    faqs,
  };

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <header className="overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
        <p className="text-sm font-medium text-primary-foreground/70">
          Tyre Fitting Near Me — content management
        </p>
        <h1 className="mt-1 font-heading text-2xl font-extrabold sm:text-3xl">
          Welcome back 👋
        </h1>
        <p className="mt-2 max-w-xl text-primary-foreground/80">
          Add and edit your locations, services, reviews and FAQs. Changes go live
          within a minute.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/20"
          >
            <ExternalLink className="h-4 w-4" /> View live site
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            <SettingsIcon className="h-4 w-4" /> Site settings
          </Link>
        </div>
      </header>

      {/* Management cards */}
      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Manage content
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCE_ORDER.map((key) => {
            const r = RESOURCES[key];
            return (
              <div
                key={key}
                className="group rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-primary">
                    {counts[key]}
                  </span>
                </div>
                <div className="mt-3 font-semibold">{r.labelPlural}</div>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <Link
                    href={`/admin/${key}`}
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    Manage <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={`/admin/${key}/new`}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add new
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-xs text-muted-foreground">
        Site URL: {SITE.url}
      </p>
    </div>
  );
}
