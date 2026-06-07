"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { telHref } from "@/lib/utils";

/**
 * Booking / quote form. Captures the essentials a fitter needs (tyre size,
 * postcode/location, phone) and POSTs to /api/lead which emails the business.
 * Phone/WhatsApp remain the primary conversion path - this is the fallback for
 * people who'd rather not call.
 *
 * `defaultService` lets a service page pre-select the relevant service.
 */
export function BookingForm({
  phone,
  defaultService,
}: {
  phone?: string;
  defaultService?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { service: defaultService ?? "" },
  });

  async function onSubmit(values: LeadInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setServerError(
        "Sorry, something went wrong. Please call us instead and we'll sort it right away."
      );
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--color-whatsapp)]" />
        <h3 className="mt-4 text-xl font-bold">Request received!</h3>
        <p className="mt-2 text-muted-foreground">
          Thanks - we&apos;ve got your details and will call you back shortly. For
          anything urgent, please call us now.
        </p>
        {phone ? (
          <Button asChild variant="cta" size="lg" className="mt-5">
            <a href={telHref(phone)}>
              <Phone /> Call {phone}
            </a>
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border bg-card p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Your name *</Label>
          <Input id="name" {...register("name")} className="mt-1.5" autoComplete="name" />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone number *</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            {...register("phone")}
            className="mt-1.5"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div>
          <Label htmlFor="postcode">Postcode / location *</Label>
          <Input
            id="postcode"
            {...register("postcode")}
            className="mt-1.5"
            placeholder="e.g. ME16 or 'M20 J6'"
            autoComplete="postal-code"
          />
          {errors.postcode && (
            <p className="mt-1 text-sm text-destructive">{errors.postcode.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tyreSize">Tyre size (if known)</Label>
          <Input
            id="tyreSize"
            {...register("tyreSize")}
            className="mt-1.5"
            placeholder="e.g. 205/55 R16"
          />
        </div>

        <div>
          <Label htmlFor="service">What do you need?</Label>
          <Input
            id="service"
            {...register("service")}
            className="mt-1.5"
            placeholder="e.g. puncture repair"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">Anything else?</Label>
          <Textarea
            id="message"
            {...register("message")}
            className="mt-1.5"
            rows={3}
            placeholder="Vehicle make/model, what happened, best time to call…"
          />
        </div>

        {/* Honeypot - visually hidden, must stay empty */}
        <div className="hidden" aria-hidden>
          <label>
            Company
            <input tabIndex={-1} autoComplete="off" {...register("company")} />
          </label>
        </div>
      </div>

      {serverError && (
        <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="cta"
        size="lg"
        className="mt-6 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          "Get my quote"
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We&apos;ll only use your details to respond to your enquiry. No spam, ever.
      </p>
    </form>
  );
}
