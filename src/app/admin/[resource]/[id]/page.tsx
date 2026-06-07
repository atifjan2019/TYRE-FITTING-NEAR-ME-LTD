import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getResource } from "@/lib/admin/resources";
import { loadOptions } from "@/lib/admin/load-options";
import { AdminForm } from "@/components/admin/admin-form";

export const dynamic = "force-dynamic";

/** Edit an existing record for any resource. */
export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource: key, id } = await params;
  const resource = getResource(key);
  if (!resource) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const record = await (prisma as any)[resource.model].findUnique({
    where: { id },
  });
  if (!record) notFound();

  const optionsMap = await loadOptions(resource);

  return (
    <div>
      <Link
        href={`/admin/${resource.key}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back to {resource.labelPlural.toLowerCase()}
      </Link>
      <h1 className="mb-6 text-2xl font-bold">
        Edit {resource.labelSingular.toLowerCase()}
      </h1>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <AdminForm resource={resource} record={record} optionsMap={optionsMap} />
      </div>
    </div>
  );
}
