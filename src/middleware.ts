import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Auth.js edge-safe middleware. The `authorized` callback in auth.config.ts
// gates access to /admin and redirects unauthenticated users to the login page.
// NOTE: with a `src/` directory this file MUST live in `src/` to be picked up.
const { auth } = NextAuth(authConfig);

// Next.js 16 requires middleware to export a function (default or named
// `middleware`). Export the Auth.js handler as the default function export.
export default auth;

export const config = {
  // Protect the admin area only. Public pages stay fully static/cacheable.
  matcher: ["/admin", "/admin/:path*"],
};
