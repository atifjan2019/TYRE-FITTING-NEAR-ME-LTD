import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Run the edge-safe Auth.js config as middleware. The `authorized` callback
// (in auth.config.ts) decides who may access /admin.
// NOTE: with a `src/` directory this file MUST live in `src/` to be picked up.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Protect the admin area only. Public pages stay fully static/cacheable.
  matcher: ["/admin", "/admin/:path*"],
};
