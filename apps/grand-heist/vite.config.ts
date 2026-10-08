import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  assetsInclude: ['**/*.atlas'],
  plugins: [svelte()],
  build: {
    assetsInlineLimit: 0,
    sourcemap: false,
  },
});
