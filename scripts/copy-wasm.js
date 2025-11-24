import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Ensure dist directory exists
const distDir = join(rootDir, 'dist');
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy WASM file from pkg to dist (keep the _bg suffix)
const wasmSrc = join(rootDir, 'pkg', 'oxide_parser_bg.wasm');
const wasmDest = join(distDir, 'oxide_parser_bg.wasm');

try {
  copyFileSync(wasmSrc, wasmDest);
  console.log('✓ Copied WASM file to dist/');
} catch (error) {
  console.error('Error copying WASM file:', error.message);
  process.exit(1);
}
