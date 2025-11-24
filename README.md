# @windpress/oxide-parser

WASM-powered [Tailwind CSS's Oxide](https://www.npmjs.com/package/@tailwindcss/oxide) parser for browser and Node.js.

> [!NOTE]
>
> This package is automatically generated from the https://github.com/wind-press/oxide-parser repository.

## Installation

```bash
npm install @windpress/oxide-parser
```

## Usage

```typescript
import { getCandidates } from '@windpress/oxide-parser';

// Single string
const candidates = await getCandidates('<div class="flex p-4">');
// ['flex', 'p-4']

// Multiple strings
const batch = await getCandidates([
  '<div class="flex p-4">',
  '<span class="text-white">',
]);
// ['flex', 'p-4', 'text-white']
```

### CDN

```html
<script type="module">
import { getCandidates } from 'https://esm.sh/@windpress/oxide-parser';
const candidates = await getCandidates('<div class="flex p-4">');
</script>
```

### Synchronous API

```typescript
import { init, getCandidatesSync } from '@windpress/oxide-parser';

await init();
const candidates = getCandidatesSync('<div class="flex">');
```

### Custom WASM URL

```typescript
await init('https://cdn.example.com/oxide_parser.wasm');
```

## API

### `getCandidates(input)`
Extracts Tailwind candidates (auto-initializes WASM).
- **input**: `string | string[]`
- **returns**: `Promise<string[]>`

### `getCandidatesSync(input)`
Synchronous version (requires `init()` first).
- **input**: `string | string[]`
- **returns**: `string[]`

### `init(wasmUrl?)`
Initializes WASM module.
- **wasmUrl**: `string` (optional)
- **returns**: `Promise<void>`

### `isInitialized()`
Checks if WASM is ready.
- **returns**: `boolean`

## Development

### Prerequisites
- Rust + wasm-pack: `cargo install wasm-pack`
- Node.js 18+
- pnpm: `npm install -g pnpm`

### Setup

```bash
pnpm install
pnpm run build
pnpm run dev
```
