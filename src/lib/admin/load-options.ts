import { prisma } from "@/lib/prisma";
import type { ResourceConfig } from "./resources";

/**
 * For every `select` field that pulls its options from another model, load
 * those options ({ value: id, label }) so the admin form can render them.
 */
export async function loadOptions(resource: ResourceConfig) {
  const map: Record<string, { value: string; label: string }[]> = {};

  for (const field of resource.fields) {
    if (field.type === "select" && field.optionsFrom) {
      const { model, labelField } = field.optionsFrom;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows = await (prisma as any)[model].findMany({
        select: { id: true, [labelField]: true },
        orderBy: { [labelField]: "asc" },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map[field.name] = rows.map((r: any) => ({
        value: r.id,
        label: r[labelField],
      }));
    }
  }

  return map;
}
