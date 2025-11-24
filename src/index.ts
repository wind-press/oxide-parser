/**
 * @windpress/oxide-parser
 * WASM-powered Tailwind CSS candidate parser.
 */

// Import the WASM module - this will be handled by the bundler or CDN
let wasmModule: any = null;
let wasmInitialized = false;
let initPromise: Promise<void> | null = null;

/**
 * Initialize the WASM module.
 * Safe to call multiple times (no-op if already initialized).
 * 
 * @param wasmUrl - Optional custom WASM file URL
 */
export async function init(wasmUrl?: string): Promise<void> {
  if (wasmInitialized) {
    return;
  }

  // If initialization is already in progress, return the existing promise
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      // Try to import from the pkg directory (for local builds)
      const module = await import('../pkg/oxide_parser.js');
      
      if (wasmUrl) {
        // If custom WASM URL provided, use it
        await module.default(wasmUrl);
      } else {
        // Auto-detect WASM location
        await module.default();
      }
      
      wasmModule = module;
      wasmInitialized = true;
    } catch (error) {
      initPromise = null; // Reset so retry is possible
      throw new Error(
        `Failed to initialize WASM module: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  })();

  return initPromise;
}

/**
 * Extract Tailwind CSS candidates from input (auto-initializes WASM).
 * Returns unique candidates only.
 * 
 * @param input - String or array of strings to parse
 * @returns Array of unique candidate strings
 */
export async function getCandidates(input: string | string[]): Promise<string[]> {
  // Auto-initialize if not already initialized
  if (!wasmInitialized) {
    await init();
  }

  return wasmModule.getCandidates(input);
}

/**
 * Extract Tailwind CSS candidates synchronously.
 * Requires init() to be called first.
 * 
 * @param input - String or array of strings to parse
 * @returns Array of unique candidate strings
 * @throws Error if not initialized
 */
export function getCandidatesSync(input: string | string[]): string[] {
  if (!wasmInitialized || !wasmModule) {
    throw new Error(
      'WASM module not initialized. Call init() and await it before using getCandidatesSync(), or use the async getCandidates() instead.'
    );
  }

  return wasmModule.getCandidates(input);
}

/**
 * Check if WASM module is initialized.
 */
export function isInitialized(): boolean {
  return wasmInitialized;
}

// Export types
export type TailwindCandidate = string;
export type ParseResult = TailwindCandidate[];
export type BatchParseResult = ParseResult[];

// Re-export for convenience
export { init as default };
