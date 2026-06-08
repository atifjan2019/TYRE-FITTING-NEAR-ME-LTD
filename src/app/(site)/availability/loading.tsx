import { Loader2 } from "lucide-react";

/**
 * Skeleton for the availability page, which is force-dynamic and hits the DB to
 * resolve the searched postcode - so it can take a moment. Mirrors the real
 * layout (heading, map block, CTAs) so the transition feels seamless.
 */
export default function AvailabilityLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:py-14">
      <div className="mx-auto h-9 w-72 max-w-full animate-pulse rounded-lg bg-secondary" />
      <div className="mx-auto mt-3 h-5 w-56 max-w-full animate-pulse rounded bg-secondary" />

      <div className="mt-8 grid h-64 place-items-center rounded-2xl border bg-secondary/40">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <span className="text-sm font-medium">Checking live fitter availability…</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div className="h-14 w-40 animate-pulse rounded-lg bg-secondary" />
        <div className="h-14 w-40 animate-pulse rounded-lg bg-secondary" />
        <div className="h-14 w-40 animate-pulse rounded-lg bg-secondary" />
      </div>
    </div>
  );
}
