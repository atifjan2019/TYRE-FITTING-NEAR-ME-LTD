import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

/** robots.txt — allow crawling of the public site, block admin/api/auth. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
