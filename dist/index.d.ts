/**
 * Fallback Router Extension for pi
 *
 * Implements model fallback chains with smart caching.
 * - Caches the last working model for ~1 hour
 * - On failure, tries next model and remembers the failure
 * - Clears cached model on persistent failures
 *
 * Usage:
 *   1. Create ~/.pi/fallback-chains.json with your chains
 *   2. Load via: pi -e ~/.pi/extensions/pi-fallback-provider/src/index.ts
 *   3. Select models like: fallback/reviewer or fallback/worker
 */
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
/** Extension entry point */
export default function (pi: ExtensionAPI): void;
//# sourceMappingURL=index.d.ts.map