import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Keep module loading safe during builds. A real DATABASE_URL is required
// when the site/admin/API actually talks to the database at runtime.
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://invalid:invalid@127.0.0.1:5432/invalid";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
