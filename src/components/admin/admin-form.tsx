"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { saveRecord, type ActionState } from "@/app/admin/actions";
import type { FieldConfig, ResourceConfig } from "@/lib/admin/resources";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { cn } from "@/lib/utils";

type RecordData = Record<string, unknown> | null;
type OptionsMap = Record<string, { value: string; label: string }[]>;

/**
 * Renders an editable form for any resource from its field config.
 * Used by both the "new" and "edit" admin pages.
 */
export function AdminForm({
  resource,
  record,
  optionsMap,
}: {
  resource: ResourceConfig;
  record: RecordData;
  optionsMap: OptionsMap;
}) {
  const id = (record?.id as string | undefined) ?? null;
  const action = saveRecord.bind(null, resource.key, id);
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    action,
    undefined
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {resource.fields.map((field) => (
          <div
            key={field.name}
            className={cn(field.colSpan === 2 || isWide(field) ? "sm:col-span-2" : "")}
          >
            <FieldControl
              field={field}
              value={record?.[field.name]}
              options={optionsMap[field.name] ?? field.options ?? []}
            />
          </div>
        ))}
      </div>

      {state?.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 border-t pt-5">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            "Save"
          )}
        </Button>
        <Button asChild variant="ghost">
          <Link href={`/admin/${resource.key}`}>Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

// Rich text / image / stringList controls always take the full width.
function isWide(field: FieldConfig) {
  return field.type === "richtext" || field.type === "image";
}

function FieldControl({
  field,
  value,
  options,
}: {
  field: FieldConfig;
  value: unknown;
  options: { value: string; label: string }[];
}) {
  const labelEl = (
    <Label htmlFor={field.name} className="mb-1.5 block">
      {field.label}
      {field.required ? <span className="text-destructive"> *</span> : null}
    </Label>
  );
  const help = field.help ? (
    <p className="mt-1 text-xs text-muted-foreground">{field.help}</p>
  ) : null;

  switch (field.type) {
    case "boolean":
      return (
        <label className="flex items-center gap-2 pt-6">
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            defaultChecked={Boolean(value)}
            className="h-4 w-4 rounded border-input"
          />
          <span className="text-sm font-medium">{field.label}</span>
        </label>
      );

    case "textarea":
      return (
        <div>
          {labelEl}
          <Textarea
            id={field.name}
            name={field.name}
            defaultValue={(value as string) ?? ""}
            required={field.required}
            rows={4}
          />
          {help}
        </div>
      );

    case "stringList":
      return (
        <div>
          {labelEl}
          <Textarea
            id={field.name}
            name={field.name}
            defaultValue={Array.isArray(value) ? (value as string[]).join("\n") : ""}
            rows={4}
            placeholder="One item per line"
          />
          {help}
        </div>
      );

    case "richtext":
      return (
        <div>
          {labelEl}
          <RichTextEditor name={field.name} defaultValue={(value as string) ?? ""} />
          {help}
        </div>
      );

    case "image":
      return (
        <div>
          {labelEl}
          <ImageUpload name={field.name} defaultValue={(value as string) ?? ""} />
          {help}
        </div>
      );

    case "select":
      return (
        <div>
          {labelEl}
          <select
            id={field.name}
            name={field.name}
            defaultValue={(value as string) ?? ""}
            required={field.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {!field.required && <option value="">- none -</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {help}
        </div>
      );

    case "number":
      return (
        <div>
          {labelEl}
          <Input
            id={field.name}
            name={field.name}
            type="number"
            defaultValue={value === undefined || value === null ? "" : String(value)}
            required={field.required}
          />
          {help}
        </div>
      );

    case "date":
      return (
        <div>
          {labelEl}
          <Input
            id={field.name}
            name={field.name}
            type="date"
            defaultValue={toDateInput(value)}
          />
          {help}
        </div>
      );

    default: // text
      return (
        <div>
          {labelEl}
          <Input
            id={field.name}
            name={field.name}
            defaultValue={(value as string) ?? ""}
            required={field.required}
            placeholder={field.placeholder}
          />
          {help}
        </div>
      );
  }
}

function toDateInput(value: unknown): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}
