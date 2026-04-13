# TP-002: Fix parseModelString Edge Case

**Status:** Pending
**Size:** S
**Priority:** Medium
**Created:** 2026-04-13

## Problem

The `parseModelString()` function has an edge case where a leading slash produces an empty provider:

```typescript
parseModelString("/starts-with-slash") 
// Returns: { provider: "", modelId: "starts-with-slash" }
// Should return: null (invalid)
```

## Requirements

1. Update `parseModelString()` to require non-empty provider
2. Add test case for leading slash edge case
3. Ensure all existing tests still pass

## Implementation Hints

```typescript
function parseModelString(modelString: string): { provider: string; modelId: string } | null {
  const parts = modelString.split("/");
  if (parts.length < 2 || !parts[0]) return null;  // Added !parts[0] check
  return {
    provider: parts[0],
    modelId: parts.slice(1).join("/"),
  };
}
```

## Testing

```bash
npm run test:run
```

## Files to Modify

- `src/index.ts` - Fix parseModelString function
- `src/__tests__/fallback.test.ts` - Update test expectations
