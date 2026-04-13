# TP-005: Add Cost Tracking

**Status:** Pending
**Size:** M
**Priority:** Low
**Created:** 2026-04-13

## Problem

Currently, all fallback models report zero cost:

```typescript
cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
```

Users have no visibility into actual API spending across the fallback chain.

## Requirements

1. Track actual costs from delegated model's usage
2. Report aggregated cost through the fallback stream
3. Optionally log cost breakdown per request

## Implementation Hints

The `streamSimple` returns usage in the final event. We need to:

```typescript
// In the success path of fallbackStream:
for await (const event of sourceStream) {
  eventBuffer.push(event);
  
  // Extract usage from done event
  if (event.type === "done") {
    totalUsage = event.message.usage;
  }
}

// When emitting buffered events, update the usage
for (const event of eventBuffer) {
  if (event.type === "start" || event.type === "done") {
    event.partial.usage = totalUsage; // or aggregate
  }
  stream.push(event);
}
```

## Testing

1. Make a request and verify usage is reported
2. Check that costs appear in pi's footer/status
3. Verify fallback to second model still reports correct usage

## Files to Modify

- `src/index.ts` - Track and propagate usage from delegated streams
