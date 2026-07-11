import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode helps surface bugs during development.
  reactStrictMode: true,

  // We serve uploaded images from the local /public/uploads folder, so no
  // remote image domains are required. If you later move uploads to object
  // storage (S3/R2), add the host here under `images.remotePatterns`.
  images: {
    // Generate modern formats for better Core Web Vitals (LCP/CLS).
    formats: ["image/avif", "image/webp"],
    // Allow next/image to optimise images served from Vercel Blob storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      // Temporary hero placeholder until /public/hero-fitter.jpg is added.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Keep server-only packages (Prisma) out of the client bundle.
  serverExternalPackages: ["@prisma/client", "bcryptjs"],

  // 301 redirects for retired service routes, so any crawled or inbound URL
  // lands on the services hub instead of a 404. The three retired services
  // (wheel alignment, truck and HGV, alloy wheel refurbishment) are no longer
  // offered. The run-flat slug was also shortened to /services/run-flat-tyre.
  async redirects() {
    return [
      // Region pages migrated from root to the nested /areas/[region] tier, so
      // the URL tree matches the topical hierarchy (/areas > region > town).
      // Each old root URL 301s once to its new /areas/[region] URL. 301 only,
      // never to the homepage, no chains.
      { source: "/london", destination: "/areas/london", permanent: true },
      { source: "/kent", destination: "/areas/kent", permanent: true },
      { source: "/sussex", destination: "/areas/sussex", permanent: true },
      { source: "/essex", destination: "/areas/essex", permanent: true },
      { source: "/west-midlands", destination: "/areas/west-midlands", permanent: true },
      { source: "/scotland", destination: "/areas/scotland", permanent: true },

      // The retired root-level town pages (the DB /[county]/[town] system) 301
      // to their true successor: a built town page where one exists, otherwise
      // the parent region. One hop, never the homepage. Bromley points straight
      // at its NESTED town URL so no redirect chain forms.
      { source: "/london/bromley", destination: "/areas/london/bromley", permanent: true },
      { source: "/kent/maidstone", destination: "/areas/kent", permanent: true },
      { source: "/west-midlands/solihull", destination: "/areas/west-midlands", permanent: true },
      { source: "/sussex/brighton", destination: "/areas/sussex", permanent: true },
      { source: "/essex/chelmsford", destination: "/areas/essex", permanent: true },
      { source: "/scotland/glasgow", destination: "/areas/scotland", permanent: true },

      // Town pages migrated from the flat /areas/[town] tier to the nested
      // /areas/[region]/[town] tier so the URL path encodes the geographic
      // hierarchy. Each old flat town URL 301s once, directly to its own new
      // nested URL. One hop, no chains, never the homepage or a bare region.
      // South East London cluster -> /areas/london/[town]
      { source: "/areas/bromley", destination: "/areas/london/bromley", permanent: true },
      { source: "/areas/lewisham", destination: "/areas/london/lewisham", permanent: true },
      { source: "/areas/catford", destination: "/areas/london/catford", permanent: true },
      { source: "/areas/greenwich", destination: "/areas/london/greenwich", permanent: true },
      { source: "/areas/charlton", destination: "/areas/london/charlton", permanent: true },
      { source: "/areas/sydenham", destination: "/areas/london/sydenham", permanent: true },
      { source: "/areas/crystal-palace", destination: "/areas/london/crystal-palace", permanent: true },
      { source: "/areas/forest-hill", destination: "/areas/london/forest-hill", permanent: true },
      { source: "/areas/penge", destination: "/areas/london/penge", permanent: true },
      { source: "/areas/beckenham", destination: "/areas/london/beckenham", permanent: true },
      { source: "/areas/orpington", destination: "/areas/london/orpington", permanent: true },
      { source: "/areas/bexley", destination: "/areas/london/bexley", permanent: true },
      { source: "/areas/sidcup", destination: "/areas/london/sidcup", permanent: true },
      { source: "/areas/eltham", destination: "/areas/london/eltham", permanent: true },
      // Greater Manchester cluster -> /areas/manchester/[town]
      { source: "/areas/didsbury", destination: "/areas/manchester/didsbury", permanent: true },
      { source: "/areas/manchester-city-centre", destination: "/areas/manchester/manchester-city-centre", permanent: true },
      { source: "/areas/salford", destination: "/areas/manchester/salford", permanent: true },
      { source: "/areas/stockport", destination: "/areas/manchester/stockport", permanent: true },
      { source: "/areas/bolton", destination: "/areas/manchester/bolton", permanent: true },
      { source: "/areas/oldham", destination: "/areas/manchester/oldham", permanent: true },
      { source: "/areas/rochdale", destination: "/areas/manchester/rochdale", permanent: true },
      { source: "/areas/bury", destination: "/areas/manchester/bury", permanent: true },
      { source: "/areas/wigan", destination: "/areas/manchester/wigan", permanent: true },
      { source: "/areas/altrincham", destination: "/areas/manchester/altrincham", permanent: true },
      { source: "/areas/sale", destination: "/areas/manchester/sale", permanent: true },
      { source: "/areas/stretford", destination: "/areas/manchester/stretford", permanent: true },
      { source: "/areas/chorlton", destination: "/areas/manchester/chorlton", permanent: true },
      { source: "/areas/withington", destination: "/areas/manchester/withington", permanent: true },
      { source: "/areas/ashton-under-lyne", destination: "/areas/manchester/ashton-under-lyne", permanent: true },

      // Service-page merges: near-duplicate pages 301 to the retained page that
      // absorbed their content. One hop, never the homepage.
      { source: "/services/puncture-repair", destination: "/services/mobile-tyre-repair", permanent: true },
      { source: "/services/home-tyre-fitting", destination: "/services/mobile-tyre-fitting", permanent: true },

      // Exotic-marque brand pages merged into the single performance and
      // prestige page. One hop each, never the homepage.
      { source: "/brands/ferrari-mobile-tyre-fitting", destination: "/brands/performance-mobile-tyre-fitting", permanent: true },
      { source: "/brands/mclaren-mobile-tyre-fitting", destination: "/brands/performance-mobile-tyre-fitting", permanent: true },
      { source: "/brands/lamborghini-mobile-tyre-fitting", destination: "/brands/performance-mobile-tyre-fitting", permanent: true },
      { source: "/brands/rolls-royce-mobile-tyre-fitting", destination: "/brands/performance-mobile-tyre-fitting", permanent: true },
      { source: "/brands/bentley-mobile-tyre-fitting", destination: "/brands/performance-mobile-tyre-fitting", permanent: true },

      // Battery replacement is not a confirmed offered service and has been
      // retired from the tyre-focused silo. Its URL 301s to the services hub.
      {
        source: "/services/battery-replacement",
        destination: "/services",
        permanent: true,
      },

      // Blog -> Guides migration. /guides is the permanent evergreen home for
      // all article content. Every old /blog/[slug] 301s 1-to-1 to its true
      // /guides/[slug] equivalent (slug preserved), and the /blog hub 301s to
      // /guides. The :slug wildcard is scale-agnostic for any future or
      // previously-indexed article. No chains, no loops, no homepage redirects.
      {
        source: "/blog",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/guides/:slug",
        permanent: true,
      },
      {
        source: "/services/mobile-wheel-alignment",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/mobile-truck-hgv-tyre-fitting",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/mobile-alloy-wheel-refurbishment",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/run-flat-tyre-replacement",
        destination: "/services/run-flat-tyre",
        permanent: true,
      },
      // The caravan and motorhome service was published at the shortened slug
      // /services/caravan-tyre-fitting. Redirect the original reserved slug so
      // the URL and any internal link to it never 404.
      {
        source: "/services/mobile-caravan-motorhome-tyre-fitting",
        destination: "/services/caravan-tyre-fitting",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
