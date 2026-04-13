# TP-004: Deduplicate getModelOrder Logic

**Status:** Pending
**Size:** S
**Priority:** Low
**Created:** 2026-04-13

## Problem

The `getModelOrder()` function has duplicated logic in two places:

```typescript
// Lines 229-236 and 255-260 both do:
for (let i = X; i < Y; i++) {
  const model = fallbackList[i];
  const failed = failedModels.get(model);
  if (!failed || now - failed.failedAt > FAILED_COOLDOWN_MS) {
    ordered.push(model);
  }
}
```

## Requirements

1. Extract the "filter out failed models" logic into a helper function
2. Keep the function readable and maintainable
3. Ensure all tests still pass

## Implementation Hints

```typescript
/** Filter models, removing those on cooldown */
function filterAvailable(
  models: string[],
  failedModels: Map<string, FailedModel>,
  now: number
): string[] {
  return models.filter(model => {
    const failed = failedModels.get(model);
    return !failed || now - failed.failedAt > FAILED_COOLDOWN_MS;
  });
}
```

## Testing

```bash
npm run test:run
```

## Files to Modify

- `src/index.ts` - Refactor getModelOrder function
