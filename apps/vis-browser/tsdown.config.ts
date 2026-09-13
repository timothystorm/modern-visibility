import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { prism: 'src/prism.ts' },
  platform: 'browser',
  format: 'esm',
  target: 'es2023',
  outDir: 'dist',
  clean: true,
  dts: false,
  minify: true,
  sourcemap: true,
  deps: {
    alwaysBundle: [/.*/],
    onlyBundle: false,
    onlyImport: [],
  },
  outputOptions: {
    entryFileNames: '[name].js',
    chunkFileNames: 'chunks/[name]-[hash].js',
  },
  copy: ['index.html'],
})
