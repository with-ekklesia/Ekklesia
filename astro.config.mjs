import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import node from "@astrojs/node";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  vite: {
    optimizeDeps: {
      exclude: ["fsevents"]
    }
  },
  integrations: [tailwind()]
});