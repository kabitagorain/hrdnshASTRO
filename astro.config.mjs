// @ts-check
import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://hrdnsh.com",
  output: "server",
  trailingSlash: "never",

  server: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  integrations: [alpinejs()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["alpinejs"],
    },
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@assets": "/src/assets",
        "@utils": "/src/utils",
        "@data": "/src/data",
        "@styles": "/src/styles",
      },
    },
    build: {
      // Combine all CSS into one file — prevents render-blocking component CSS chunks
      cssCodeSplit: false,
    },
  },

  image: {
    domains: [],
  },

  adapter: cloudflare({
    imageService: { build: "compile", runtime: "cloudflare-binding" },
    sessionKVBindingName: "HRDNSH_SESSION_BINDING",
    prerenderEnvironment: "node",
  }),
});
