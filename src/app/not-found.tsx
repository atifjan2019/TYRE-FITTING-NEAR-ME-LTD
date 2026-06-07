import Link from "next/link";

/** Global 404 page. Kept static (no DB) so it's cheap to serve. */
export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-4 text-center">
      <div>
        <p className="text-6xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          Sorry, we couldn&apos;t find that page. Need a tyre sorted? We&apos;re here 24/7.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Back to home
          </Link>
          <Link
            href="/areas"
            className="rounded-md border px-5 py-2.5 font-semibold hover:bg-secondary"
          >
            Areas we cover
          </Link>
        </div>
      </div>
    </main>
  );
}
