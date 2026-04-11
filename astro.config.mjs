// @ts-check
import { defineConfig } from 'astro/config';


import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hrdnsh.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Combine all CSS into one file — prevents render-blocking component CSS chunks
      // (e.g. Footer.DhDV2Wdd.css) that create critical-request chains
      cssCodeSplit: false,
    },
  },
});
