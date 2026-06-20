import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, Pencil, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getResource, type ResourceConfig } from "@/lib/admin/resources";
import { DeleteButton } from "@/components/admin/delete-button";

/** Build the live "View" URL for a row, or null if it should be hidden. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildViewUrl(resource: ResourceConfig, row: any): string | null {
  const v = resource.viewPath;
  if (!v) return null;
  if (v.onlyWhen && !row[v.onlyWhen]) return null;
  const slug = row[v.slugField ?? "slug"];
  if (!slug) return null;
  return `${v.base}/${slug}`;
}

export const dynamic = "force-dynamic";

/** Generic list view for any resource. */
export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: key } = await params;
  const resource = getResource(key);
  if (!resource) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[] = await (prisma as any)[resource.model].findMany({
    orderBy: resource.orderBy,
    ...(resource.include ? { include: resource.include } : {}),
  });

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{resource.labelPlural}</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} item{rows.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href={`/admin/${resource.key}/new`}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Add {resource.labelSingular.toLowerCase()}
        </Link>
      </header>

      {rows.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center text-muted-foreground">
          No {resource.labelPlural.toLowerCase()} yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b bg-secondary/40 text-left">
              <tr>
                {resource.listColumns.map((c) => (
                  <th key={c.name} className="px-4 py-3 font-semibold">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  {resource.listColumns.map((c) => (
                    <td key={c.name} className="px-4 py-3">
                      {renderCell(row[c.name])}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      {(() => {
                        const view = buildViewUrl(resource, row);
                        return view ? (
                          <Link
                            href={view}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary hover:underline"
                          >
                            <Eye className="h-3.5 w-3.5" /> View
                          </Link>
                        ) : null;
                      })()}
                      <Link
                        href={`/admin/${resource.key}/${row.id}`}
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <DeleteButton
                        resourceKey={resource.key}
                        id={row.id}
                        label={String(row.name ?? row.title ?? row.author ?? "this item")}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** Render a table cell, handling booleans, related rows and long text nicely. */
function renderCell(value: unknown) {
  // Related rows (e.g. a county's towns): show as chips with a count.
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-muted-foreground">None yet</span>;
    }
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((item, i) => {
          const label =
            item && typeof item === "object"
              ? (item.name ?? item.title ?? "-")
              : String(item);
          return (
            <span
              key={item?.id ?? i}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
            >
              {label}
            </span>
          );
        })}
      </div>
    );
  }
  if (typeof value === "boolean") {
    return (
      <span
        className={
          value
            ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
            : "rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
        }
      >
        {value ? "Yes" : "No"}
      </span>
    );
  }
  if (value instanceof Date) {
    return value.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const str = String(value ?? "-");
  return str.length > 60 ? `${str.slice(0, 60)}…` : str;
}
