"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { saveSettings, type ActionState } from "@/app/admin/actions";
import type { SiteSettingsData } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";

/** Site settings editor (single row). */
export function SettingsForm({ settings }: { settings: SiteSettingsData }) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    saveSettings,
    undefined
  );

  return (
    <form action={formAction} className="space-y-8">
      <Section title="Brand & contact">
        <Field label="Brand name" name="brandName" defaultValue={settings.brandName} />
        <Field label="Tagline" name="tagline" defaultValue={settings.tagline} />
        <Field
          label="Phone (shown as click-to-call)"
          name="phone"
          defaultValue={settings.phone}
        />
        <Field
          label="WhatsApp number (international, e.g. 447…)"
          name="whatsapp"
          defaultValue={settings.whatsapp}
        />
        <Field label="Email" name="email" defaultValue={settings.email} />
      </Section>

      <Section title="Logo & favicon">
        <div>
          <Label className="mb-1.5 block">Logo (shown in the header)</Label>
          <ImageUpload name="logo" defaultValue={settings.logo} />
        </div>
        <div>
          <Label className="mb-1.5 block">Favicon (browser tab icon)</Label>
          <ImageUpload name="favicon" defaultValue={settings.favicon} />
        </div>
      </Section>

      <Section title="Social profiles">
        <Field label="Facebook URL" name="facebookUrl" defaultValue={settings.facebookUrl ?? ""} />
        <Field label="Instagram URL" name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} />
        <Field label="TikTok URL" name="tiktokUrl" defaultValue={settings.tiktokUrl ?? ""} />
      </Section>

      <Section title="Default SEO">
        <Field
          label="Default meta title"
          name="defaultMetaTitle"
          defaultValue={settings.defaultMetaTitle}
          wide
        />
        <div className="sm:col-span-2">
          <Label htmlFor="defaultMetaDescription" className="mb-1.5 block">
            Default meta description
          </Label>
          <Textarea
            id="defaultMetaDescription"
            name="defaultMetaDescription"
            defaultValue={settings.defaultMetaDescription}
            rows={3}
          />
        </div>
        <div className="sm:col-span-2">
          <Label className="mb-1.5 block">Default social share image</Label>
          <ImageUpload name="defaultOgImage" defaultValue={settings.defaultOgImage} />
        </div>
      </Section>

      {state?.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="border-t pt-5">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            "Save settings"
          )}
        </Button>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        {title}
      </legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  wide = false,
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <Label htmlFor={name} className="mb-1.5 block">
        {label}
      </Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} />
    </div>
  );
}
