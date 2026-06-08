"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Icon } from "@/components/icon";
import { RESOURCES, RESOURCE_ORDER } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";

/** Admin sidebar navigation with active-route highlighting. */
export function AdminNav({
  logo,
  brandName = "Tyre Fitting Near Me Ltd",
}: {
  logo?: string | null;
  brandName?: string;
}) {
  const pathname = usePathname();

  const items = [
    { href: "/admin", label: "Dashboard", icon: "layout-dashboard", exact: true },
    ...RESOURCE_ORDER.map((key) => ({
      href: `/admin/${key}`,
      label: RESOURCES[key].labelPlural,
      icon: RESOURCES[key].icon,
      exact: false,
    })),
    { href: "/admin/settings", label: "Site settings", icon: "settings", exact: false },
  ];

  return (
    <nav className="flex h-full flex-col gap-1 p-3">
      <Link href="/admin" className="mb-2 flex items-center gap-2 px-3 py-3">
        {logo ? (
          <Image
            src={logo}
            alt={brandName}
            width={200}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        ) : (
          <>
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--color-logo-blue)] text-sm font-bold text-white">
              T
            </span>
            <span className="text-sm font-extrabold leading-tight">
              Tyre Fitting<span className="text-accent">.</span>
              <span className="block text-xs font-medium text-muted-foreground">
                Admin panel
              </span>
            </span>
          </>
        )}
      </Link>
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground/80 hover:bg-secondary"
            )}
          >
            <Icon name={item.icon} className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}

      <Link
        href="/admin/logout"
        className="mt-auto flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </Link>
    </nav>
  );
}
