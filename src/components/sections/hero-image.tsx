"use client";

import { useState } from "react";
import Image from "next/image";
import { CircleDot } from "lucide-react";

/**
 * Hero photo anchor: a certified mobile tyre fitter working at a customer's home.
 * Above the fold, so the image is `priority` for LCP. If the image fails to load
 * it falls back to a brand navy -> red gradient with a tyre icon, never an empty
 * grey box.
 *
 * Final asset: swap `HERO_SRC` to "/hero-fitter.jpg" once the real photo is added
 * to /public. Until then it uses a temporary Unsplash placeholder (allowed in
 * next.config remotePatterns).
 */
const HERO_SRC =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=70";

export function HeroImage() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-lg">
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary to-accent text-white">
          <CircleDot className="h-20 w-20 opacity-90" aria-hidden />
          <span className="sr-only">
            Certified mobile tyre fitter replacing a tyre at a customer&apos;s home
          </span>
        </div>
      ) : (
        <Image
          src={HERO_SRC}
          alt="Certified mobile tyre fitter replacing a tyre at a customer's home"
          width={1200}
          height={900}
          priority
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
