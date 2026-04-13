# TP-003: Persist Cache to Disk

**Status:** Pending
**Size:** M
**Priority:** Medium
**Created:** 2026-04-13

## Problem

Currently, the model cache is stored in memory only. This means:
- Cache is lost when pi restarts
- No continuity of the "working model" preference across sessions
- Users may experience unnecessary fallback attempts after restart

## Requirements

1. Persist cache to `~/.pi/fallback-cache.json`
2. Load cache on extension initialization
3. Save cache on every successful request (or on process exit)
4. Handle cache file corruption gracefully (fall back to empty cache)

## Cache File Format

```json
{
  "version": 1,
  "chains": {
    "reviewer": {
      "workingModel": "google/gemini-2.5-pro",
      "timestamp": 1713000000000,
      "workingIndex": 1
    }
  },
  "failedModels": {}
}
```

## Implementation Hints

```typescript
const CACHE_FILE = `${process.env.HOME}/.pi/fallback-cache.json`;

interface PersistedCache {
  version: number;
  chains: Record<string, ChainCache>;
  failedModels: Record<string, FailedModel>;
}

function loadCache(): PersistedCache {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const content = fs.readFileSync(CACHE_FILE, 'utf-8');
      const cache = JSON.parse(content);
      // Validate and return
    }
  } catch {
    // Corrupt file, return default
  }
  return { version: 1, chains: {}, failedModels: {} };
}

function saveCache(cache: PersistedCache): void {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}
```

## Testing

1. Start pi, use a fallback model, verify cache file is created
2. Restart pi, verify cache is loaded and used
3. Manually corrupt cache file, verify graceful fallback

## Files to Modify

- `src/index.ts` - Add persistence functions and integrate
