import { PrismaClient } from "@prisma/client";

/**
 * A single shared PrismaClient instance.
 *
 * In development, Next.js hot-reloads modules which would otherwise create a
 * new PrismaClient (and a new DB connection pool) on every reload. We cache it
 * on `globalThis` to avoid exhausting connections.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const validateDatabaseUrl = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return;

  const placeholderValues = ["VPS_PUBLIC_IP", "USER", "PASSWORD", "DBNAME"];
  const unresolvedPlaceholder = placeholderValues.find((value) =>
    databaseUrl.includes(value),
  );

  if (unresolvedPlaceholder) {
    throw new Error(
      `DATABASE_URL still contains the placeholder "${unresolvedPlaceholder}". ` +
        "Update .env.local with the real Postgres connection string, then restart the dev server.",
    );
  }
};

validateDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
