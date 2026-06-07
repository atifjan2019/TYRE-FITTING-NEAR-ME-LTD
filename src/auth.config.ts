import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config (no database / bcrypt here so it can run in
 * middleware on the Edge runtime). The Credentials provider that actually
 * touches the DB lives in `src/auth.ts`.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    /**
     * Gatekeeper for the middleware. Protects everything under /admin and
     * bounces logged-in users away from the login page.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname === "/admin/login";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
        return true; // allow anyone to see the login page
      }
      if (isOnAdmin) return isLoggedIn; // unauthenticated -> redirected to signIn
      return true;
    },
    // Persist id/role on the JWT so server components can read them cheaply.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // real providers are attached in src/auth.ts
} satisfies NextAuthConfig;
