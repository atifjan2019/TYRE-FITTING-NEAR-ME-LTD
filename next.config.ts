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
    ];
  },
};

export default nextConfig;
