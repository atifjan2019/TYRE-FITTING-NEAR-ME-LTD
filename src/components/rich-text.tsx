import { cn } from "@/lib/utils";

/**
 * Renders rich-text HTML produced by the Tiptap editor in the admin.
 * Content is authored by trusted admins, so dangerouslySetInnerHTML is
 * acceptable here. Styling comes from `.prose-content` in globals.css.
 */
export function RichText({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  if (!html) return null;
  return (
    <div
      className={cn("prose-content max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
