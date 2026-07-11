import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { FOOTER_NAV, SITE } from "@/lib/site-config";
import { telHref, whatsappHref } from "@/lib/utils";
import type { SiteSettingsData } from "@/lib/data";
import { REGIONS } from "@/data/regions";

/**
 * Site footer. Lists service areas (good for internal linking + local SEO),
 * contact actions, and legal links. No street address - service-area business.
 * The "Areas We Cover" column links to the regional tier at /areas/[region].
 */
export function SiteFooter({ settings }: { settings: SiteSettingsData }) {
  return (
    <footer className="mt-16 border-t bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div>
            <Link href="/" className="mb-3 inline-flex items-center">
              {settings.logo ? (
                <Image
                  src={settings.logo}
                  alt={settings.brandName}
                  width={260}
                  height={64}
                  className="h-12 w-auto object-contain sm:h-14"
                />
              ) : (
                <span className="text-lg font-extrabold">{settings.brandName}</span>
              )}
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">{settings.tagline}</p>
            <ul className="space-y-2 text-sm">
              {settings.phone ? (
                <li>
                  <a href={telHref(settings.phone)} className="flex items-center gap-2 font-medium hover:text-primary">
                    <Phone className="h-4 w-4 text-primary" /> {settings.phone}
                  </a>
                </li>
              ) : null}
              {settings.whatsapp ? (
                <li>
                  <a
                    href={whatsappHref(settings.whatsapp, SITE.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[var(--color-whatsapp)]" /> WhatsApp us
                  </a>
                </li>
              ) : null}
              {settings.email ? (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-primary">
                    <Mail className="h-4 w-4 text-primary" /> {settings.email}
                  </a>
                </li>
              ) : null}
              <li className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" /> {settings.openingHours}
              </li>
            </ul>
          </div>

          {/* Areas covered */}
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              Areas We Cover
            </div>
            <ul className="space-y-2 text-sm">
              {REGIONS.map((r) => (
                <li key={r.slug}>
                  <Link href={`/areas/${r.slug}`} className="hover:text-primary">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Link groups */}
          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
                {group.title}
              </div>
              <ul className="space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.brandName}. All rights reserved.
            <span className="ml-1">Registered in England &amp; Wales, company no. 17137653.</span>
          </p>
          <p>Mobile service-area business. We come to you, no shop visits.</p>
        </div>
      </div>
    </footer>
  );
}
