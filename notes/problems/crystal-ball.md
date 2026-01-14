# Two Crystal Balls Problem

## Introduction

Given two crystal balls that will break if dropped from a high enough distance, determine the exact floor at which they will break in the most optimized way.

> **Key insight:** We can't use binary search directly because if the first ball breaks, we'd need to linear search from the start. Instead, we jump by sqrt(N) to balance the search.

---

## Big O

| Case | Time Complexity |
|------|-----------------|
| Best | O(1) — breaks at first check |
| Average | O(sqrt(N)) |
| Worst | O(sqrt(N)) — breaks at last position |

**Space Complexity:** O(1) — no extra memory needed.

---

## The Problem

Imagine a building with N floors. You have two identical crystal balls. There's a certain floor F where:
- Dropping from floor F or above: the ball breaks
- Dropping from below floor F: the ball survives

Find floor F using at most O(sqrt(N)) drops.

```
Floors: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
                       ↑
                    Floor F (first breaking point)
```

---

## Why Not Linear Search?

Linear search would work but takes O(N) time in the worst case.

```
[0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
 ↓  ↓  ↓  ↓  ↓  ↓
 Check each floor one by one → O(N)
```

---

## Why Not Binary Search?

Binary search halves the search space each time, but we only have **two balls**.

If we binary search and the first ball breaks at the middle, we have one ball left and must linear search from the beginning — potentially O(N/2) which is still O(N).

```
[0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
                ↑
            Ball breaks at mid
            
Now with 1 ball left, must check: [0, 0, 0, 0, 0] one by one
```

---

## How It Works

Jump by sqrt(N) floors with the first ball. When it breaks, walk back linearly with the second ball.

1. Calculate jump distance: sqrt(N)
2. Jump by sqrt(N) until the first ball breaks
3. Go back to the last safe position
4. Linear search forward with the second ball
5. Return the exact breaking floor

```
N = 16, sqrt(N) = 4

[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
 ↑           ↑           ↑           ↑
 0           4           8          12
                                     ↑
                              Ball 1 breaks!

Go back to position 8, linear search with ball 2:
[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
                         ↓  ↓
                         8  9
                            ↑
                     Ball 2 breaks! Found F = 9
```

**Worst case:** sqrt(N) jumps + sqrt(N) linear steps = O(2 * sqrt(N)) = O(sqrt(N))

---

## Implementation

```typescript
function twoCrystalBalls(breaks: boolean[]): number {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));

  // Jump with first ball
  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break;
    }
  }

  // Go back to last safe position
  i -= jumpAmount;

  // Linear search with second ball
  for (let j = 0; j <= jumpAmount && i < breaks.length; j++, i++) {
    if (breaks[i]) {
      return i;
    }
  }

  return -1; // Never breaks
}
```

---

## When to Use

**Use this approach when:**
- You have limited "attempts" or resources (like 2 balls)
- Binary search would waste resources on failure
- You need to balance between jump size and recovery cost

**Real-world analogies:**
- Finding the maximum load a system can handle (limited test runs)
- A/B testing with limited budget
- Finding breaking points in physical testing

---

## Summary

| Aspect | Value |
|--------|-------|
| Time | O(sqrt(N)) |
| Space | O(1) |
| Requires sorted? | Yes (monotonic sequence) |
| Number of balls | 2 |
