/**
 * Per-navigation template. Unlike layout.tsx, this re-mounts on every route
 * change, so the fade/slide-in animation replays as the visitor moves between
 * pages. Respects prefers-reduced-motion (handled in globals.css).
 */
export default function SiteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-page-enter">{children}</div>;
}
