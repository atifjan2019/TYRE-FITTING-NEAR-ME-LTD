"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getResource, type ResourceConfig } from "@/lib/admin/resources";

export type ActionState = { error?: string } | undefined;

/** Dynamic Prisma delegate accessor. Type-unsafe by nature (string -> model),
 *  so it's isolated here and used only by the generic admin. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delegate(model: string): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[model];
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

/**
 * Convert raw FormData into a typed Prisma data object using the resource's
 * field config (the single source of truth for each field's type).
 */
function buildData(resource: ResourceConfig, formData: FormData) {
  const data: Record<string, unknown> = {};

  for (const field of resource.fields) {
    const raw = formData.get(field.name);
    const value = typeof raw === "string" ? raw : "";

    switch (field.type) {
      case "number":
        data[field.name] = value === "" ? 0 : Number(value);
        break;
      case "boolean":
        // Unchecked checkboxes are absent from FormData.
        data[field.name] = raw !== null;
        break;
      case "stringList":
        data[field.name] = value
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean);
        break;
      case "date":
        data[field.name] = value ? new Date(value) : null;
        break;
      case "select":
      case "image":
        // Nullable relations / optional images: empty -> null.
        data[field.name] = value === "" ? null : value;
        break;
      default:
        // text | textarea | richtext
        data[field.name] = value;
    }
  }

  return data;
}

/** Friendly message for common Prisma errors (e.g. duplicate slug). */
function toFriendlyError(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = (error.meta?.target as string[] | undefined)?.join(", ");
      return `That value must be unique${target ? ` (${target})` : ""}. Please change it.`;
    }
  }
  return "Something went wrong saving this record. Please try again.";
}

/**
 * Create or update a record. Bind `resourceKey` and `id` in the form:
 *   saveRecord.bind(null, resourceKey, id)
 * Returns { error } on failure; redirects to the list on success.
 */
export async function saveRecord(
  resourceKey: string,
  id: string | null,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const resource = getResource(resourceKey);
  if (!resource) return { error: "Unknown resource." };

  const data = buildData(resource, formData);

  try {
    if (id) {
      await delegate(resource.model).update({ where: { id }, data });
    } else {
      await delegate(resource.model).create({ data });
    }
  } catch (error) {
    return { error: toFriendlyError(error) };
  }

  // Refresh both the admin list and the public site (ISR on-demand).
  revalidatePath(`/admin/${resourceKey}`);
  revalidatePath("/", "layout");
  redirect(`/admin/${resourceKey}`);
}

/** Delete a record. Bind `resourceKey` and `id` in the form. Called from the
 *  list page, so it revalidates in place rather than redirecting (a redirect to
 *  the page you're already on is redundant and adds a failure point). */
export async function deleteRecord(resourceKey: string, id: string) {
  await requireAdmin();
  const resource = getResource(resourceKey);
  if (!resource) return;

  try {
    await delegate(resource.model).delete({ where: { id } });
  } catch (error) {
    // P2025 = record already gone (e.g. double-click). Treat as success.
    if (
      !(error instanceof Prisma.PrismaClientKnownRequestError) ||
      error.code !== "P2025"
    ) {
      throw error;
    }
  }

  revalidatePath(`/admin/${resourceKey}`);
  revalidatePath("/", "layout");
}

/** Update the singleton site settings row. */
export async function saveSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const str = (k: string) => (formData.get(k) as string | null) ?? "";

  const data = {
    brandName: str("brandName"),
    tagline: str("tagline"),
    logo: str("logo") || null,
    favicon: str("favicon") || null,
    phone: str("phone"),
    whatsapp: str("whatsapp"),
    email: str("email"),
    facebookUrl: str("facebookUrl") || null,
    instagramUrl: str("instagramUrl") || null,
    tiktokUrl: str("tiktokUrl") || null,
    defaultMetaTitle: str("defaultMetaTitle"),
    defaultMetaDescription: str("defaultMetaDescription"),
    defaultOgImage: str("defaultOgImage") || null,
  };

  try {
    await prisma.siteSetting.upsert({
      where: { id: "settings" },
      update: data,
      create: { id: "settings", ...data },
    });
  } catch {
    return { error: "Could not save settings. Please try again." };
  }

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
