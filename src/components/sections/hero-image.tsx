"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Hero photo anchor: a uniformed fitter working on a car beside a branded van.
 * Uses next/image with priority for fast LCP. If the photo has not been uploaded
 * yet, it fails gracefully to the brand gradient instead of a broken-image icon.
 * Owner action: add the real photo at the `src` path below.
 */
export function HeroImage() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-[var(--color-muted-blue)] to-secondary shadow-lg">
      {!failed ? (
        <Image
          src="/uploads/hero/mobile-tyre-fitter-driveway.jpg"
          alt="Uniformed Tyre Fitting Near Me mobile tyre fitter replacing a car tyre on a home driveway beside a branded van"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
