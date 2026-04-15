// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cemuener.github.io',
  base: '/home',
  output: 'static',
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
