import Image from "next/image";

/**
 * Coverage map for the availability page.
 *
 * Uses the real map image at /public/coverage-map.png (the supplied map already
 * has the fitter pins drawn on it). To replace it, just overwrite that file.
 */
export function CoverageMap() {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border bg-[#f3efe7] shadow-sm">
      <Image
        src="/coverage-map.png"
        alt="Map showing available mobile tyre fitters near you"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
      />
    </div>
  );
}
