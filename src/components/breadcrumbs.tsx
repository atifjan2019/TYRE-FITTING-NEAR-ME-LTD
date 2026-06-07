import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Visual breadcrumb trail. Pair with breadcrumbJsonLd() for the same items.
 * `light` = for use on dark/navy backgrounds (readable contrast).
 */
export function Breadcrumbs({
  items,
  light = false,
}: {
  items: { name: string; path: string }[];
  light?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1",
          light ? "text-primary-foreground/70" : "text-muted-foreground"
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {last ? (
                <span
                  className={cn("font-medium", light ? "text-white" : "text-foreground")}
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className={light ? "hover:text-white" : "hover:text-primary"}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
