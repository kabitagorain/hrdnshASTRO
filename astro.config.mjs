// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

import { services } from './src/data/services';

export default defineConfig({
  site: 'https://hrdnsh.com',
  output: 'server',

  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  integrations: [
    alpinejs(),
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/payment/'),
      customPages: services.map((s) => `/services/${s.id}`),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['alpinejs'],
    },
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@assets': '/src/assets',
        '@utils': '/src/utils',
        '@data': '/src/data',
        '@styles': '/src/styles',
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
    imageService: { build: 'compile', runtime: 'cloudflare-binding' },
  }),
});
