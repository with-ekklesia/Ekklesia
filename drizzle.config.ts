import type { Config } from "drizzle-kit";
import { loadEnv } from "vite";

const env = loadEnv("DEV", process.cwd(), "");

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url:
      env.NODE_ENV === 'production'
        ? '/data/db.sqlite3'
        : './db.sqlite3'
  }
} satisfies Config;
