import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "@/auth.config";

/**
 * Auth.js setup with a single-passcode login (no email/username).
 * The passcode is checked against the ADMIN_PASSCODE environment variable, so
 * there are no admin user records to manage.
 *
 * Exports:
 *  - handlers: GET/POST route handlers for /api/auth/[...nextauth]
 *  - auth:     server-side session helper (Server Components / actions)
 *  - signIn / signOut: programmatic helpers
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        passcode: { label: "Passcode", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({ passcode: z.string().min(1) })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const expected = process.env.ADMIN_PASSCODE;
        if (!expected) return null; // not configured -> deny

        // Constant-time-ish comparison (length + char check).
        const input = parsed.data.passcode;
        if (input.length !== expected.length) return null;
        let mismatch = 0;
        for (let i = 0; i < expected.length; i++) {
          mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
        }
        if (mismatch !== 0) return null;

        // Single admin identity (no DB user needed).
        return { id: "admin", name: "Admin", role: "admin" };
      },
    }),
  ],
});
