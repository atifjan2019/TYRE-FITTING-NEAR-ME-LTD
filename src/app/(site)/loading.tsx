import { Loader2 } from "lucide-react";

/**
 * Route-group loading fallback. Shown automatically by Next.js during server
 * navigation between site pages, so visitors get instant feedback instead of a
 * frozen UI while the next page renders.
 */
export default function SiteLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <Loader2 className="h-10 w-10 animate-spin text-accent" />
      <p className="font-heading text-lg font-semibold text-primary">Loading…</p>
    </div>
  );
}
