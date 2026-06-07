"use client";

import { Trash2 } from "lucide-react";
import { deleteRecord } from "@/app/admin/actions";

/**
 * Delete control. Submits to the bound deleteRecord server action with a
 * client-side confirmation. Kept tiny so it can sit inside list table rows.
 */
export function DeleteButton({
  resourceKey,
  id,
  label,
}: {
  resourceKey: string;
  id: string;
  label?: string;
}) {
  const action = deleteRecord.bind(null, resourceKey, id);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete ${label ?? "this item"}? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1 text-sm text-destructive hover:underline"
      >
        <Trash2 className="h-3.5 w-3.5" /> Delete
      </button>
    </form>
  );
}
