import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/main.js',
      name: 'RoamFlow',
      formats: ['iife'],
      fileName: () => 'roamflow.js'
    },
    rollupOptions: {
      output: {
        // Single file output - no code splitting
        inlineDynamicImports: true,
      }
    },
    minify: false, // Keep readable for debugging, can enable later
  },
  base: '/Wtf-roam/' // GitHub Pages base path
});
