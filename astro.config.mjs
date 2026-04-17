// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cemuener.de',
  base: '/',
  output: 'static',
  integrations: [sitemap()],
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Note: With @use, variables/mixins are scoped per file
          // Import main.scss in each component that needs styles
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      cssCodeSplit: false,
    },
  },
});
