"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAIN_NAV } from "@/lib/site-config";
import { telHref } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Sticky site header.
 *  - Always shows a prominent click-to-call button (the #1 conversion action).
 *  - Collapses navigation into a drawer on mobile.
 * Contact details are passed in from the server layout (DB-driven settings).
 */
export function SiteHeader({
  brandName,
  phone,
}: {
  brandName: string;
  phone: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Thin trust strip */}
      <div className="hidden bg-primary text-primary-foreground sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> 24/7 emergency mobile tyre fitting - we come to you
          </span>
          <span>No call-out fee · Home · Work · Roadside</span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary font-bold text-primary-foreground">
            T
          </span>
          <span className="text-lg font-extrabold leading-tight tracking-tight">
            {brandName.replace(/ Ltd$/, "")}
            <span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {phone ? (
            <Button asChild variant="cta" size="lg" className="hidden sm:inline-flex">
              <a href={telHref(phone)}>
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </Button>
          ) : null}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t bg-background transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2" aria-label="Mobile">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b py-3 text-base font-medium last:border-0"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
