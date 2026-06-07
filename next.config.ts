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
    ],
  },

  // Keep server-only packages (Prisma) out of the client bundle.
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;
