"use client";

import { useEffect, useState } from "react";
import { ClipboardList, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/forms/booking-form";

/**
 * "Request a fitter" CTA that opens the full booking form in a modal. Lets
 * visitors leave their details on the availability page without navigating away.
 * Self-contained lightweight dialog (no extra deps): backdrop click + Escape to
 * close, body scroll lock while open.
 */
export function BookingDialog({
  phone,
  defaultPostcode,
  leadKey,
}: {
  phone?: string;
  defaultPostcode?: string;
  leadKey?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button variant="cta" size="xl" onClick={() => setOpen(true)}>
        <ClipboardList /> Request a Fitter
      </Button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Request a tyre fitter"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative my-8 w-full max-w-lg text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-card text-foreground shadow-md ring-1 ring-border transition hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>
            <BookingForm
              phone={phone}
              defaultPostcode={defaultPostcode}
              leadKey={leadKey}
            />
          </div>
        </div>
      )}
    </>
  );
}
