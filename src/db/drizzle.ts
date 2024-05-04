import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import * as schema from "./schema";
import { Effect, Exit, Either, Config, ConfigProvider, Layer } from "effect";
import { loadEnv } from "vite";

const env = loadEnv("DEV", process.cwd(), "");

const configProvider = ConfigProvider.fromMap(
  new Map([
    ["TURSO_DATABASE_URL", env.TURSO_DATABASE_URL],
    ["TURSO_AUTH_TOKEN", env.TURSO_AUTH_TOKEN],
  ]),
);
const layer = Layer.setConfigProvider(configProvider);

const program = Effect.gen(function* (_) {
  const databaseUrl = yield* _(Config.string("TURSO_DATABASE_URL"));
  const authToken = yield* _(Config.string("TURSO_AUTH_TOKEN"));
  console.log(`Connecting to database with URL: ${databaseUrl}`);

  const client = Effect.runSync(
    Effect.try({
      try: () => createClient({ url: databaseUrl, authToken: authToken }),
      catch: (unknown) => new Error(`something went wrong ${unknown}`),
    }),
  );

  const db = drizzle(client, { schema });
  return db;
});

export const db = Effect.runSync(Effect.provide(program, layer));
