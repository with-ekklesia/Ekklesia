import type { Config } from "drizzle-kit";
import { defineConfig, loadEnv } from "vite";

const env = loadEnv("DEV", process.cwd(), "");
const url = env.TURSO_DATABASE_URL;
const auth = env.TURSO_AUTH_TOKEN;

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: url!,
    authToken: auth!,
  },
  // Print all statements
  verbose: true,
  // Always ask for my confirmation
  strict: true,
} satisfies Config;
