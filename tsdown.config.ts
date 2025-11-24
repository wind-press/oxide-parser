import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  exports: {
    customExports(pkg) {
      // Add WASM file export
      pkg['./wasm'] = './dist/oxide_parser_bg.wasm';
      return pkg;
    },
  },
});
