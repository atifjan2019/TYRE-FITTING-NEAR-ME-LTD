import { CheckCircle2 } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, sp] = await Promise.all([getSiteSettings(), searchParams]);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Site settings</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        These values appear across the whole site (header, footer, contact
        buttons, default SEO).
      </p>

      {sp.saved ? (
        <p className="mb-6 flex items-center gap-2 rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
          <CheckCircle2 className="h-4 w-4" /> Settings saved.
        </p>
      ) : null}

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
