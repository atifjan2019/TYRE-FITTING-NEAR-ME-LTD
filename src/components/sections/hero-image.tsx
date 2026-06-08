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
 * Asset lives in /public/hero.webp. It is at the public root (not /uploads,
 * which is gitignored) so it is committed and deploys to production.
 */
const HERO_SRC = "/hero.webp";

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
