# Quick Sort

## Introduction

Quick sort is a divide-and-conquer sorting algorithm. It picks a "pivot" element, partitions the array so all smaller elements are on the left and larger on the right, then recursively sorts each side.

> **Key insight:** After partitioning, the pivot is in its final sorted position forever. We just need to sort the left and right halves.

---

## Big O

| Case | Time Complexity |
|------|-----------------|
| Best | O(N log N) |
| Average | O(N log N) |
| Worst | O(N²) — already sorted or reverse sorted |

**Space Complexity:** O(log N) — for the recursive call stack.

---

## How It Works

1. Pick a pivot (we use the last element)
2. Partition: move elements <= pivot to the left, > pivot to the right
3. Place the pivot in its final position
4. Recursively sort the left and right sides

---

## Simple Example

```
[3, 1, 2]  pivot = 2

Partition:
  - 3 > 2, skip
  - 1 <= 2, swap with position 0 → [1, 3, 2]
  - Place pivot: swap 2 with position 1 → [1, 2, 3]
  - Pivot index = 1

Left side:  [1]     → already sorted (1 element)
Right side: [3]     → already sorted (1 element)

Done! [1, 2, 3]
```

---

## Detailed Example with Call Stack

Starting array: `[8, 7, 6, 4, 5]`

### First Call: qs(arr, 0, 4)

```
[8, 7, 6, 4, 5]  pivot = 5, idx = -1

Loop through indices 0-3:
  i=0: 8 > 5  → skip
  i=1: 7 > 5  → skip
  i=2: 6 > 5  → skip
  i=3: 4 <= 5 → idx becomes 0, swap arr[3] with arr[0]
       [4, 7, 6, 8, 5]

Place pivot: idx becomes 1, swap arr[4] with arr[1]
       [4, 5, 6, 8, 7]
            ^pivot locked at index 1

Return pivot index = 1
```

### Call Stack Visualization

```
qs(arr, 0, 4)                     [8, 7, 6, 4, 5]
│
├── partition → pivot at index 1   [4, 5, 6, 8, 7]
│
├── qs(arr, 0, 0)                  sort left of pivot
│   └── 0 >= 0, RETURN             (1 element, done)
│
└── qs(arr, 2, 4)                  sort right of pivot
    │                              working on [6, 8, 7]
    │
    ├── partition → pivot at 3     [4, 5, 6, 7, 8]
    │
    ├── qs(arr, 2, 2)              sort left of pivot
    │   └── 2 >= 2, RETURN         (1 element, done)
    │
    └── qs(arr, 4, 4)              sort right of pivot
        └── 4 >= 4, RETURN         (1 element, done)

Final: [4, 5, 6, 7, 8]
```

### Why Does qs(arr, 2, 4) Work?

After the first partition, the array is `[4, 5, 6, 8, 7]`.

The second call `qs(arr, 2, 4)` sorts indices 2-4: `[6, 8, 7]`.

```
[6, 8, 7]  pivot = 7, idx = 1 (starts at lo - 1 = 2 - 1)

Loop through indices 2-3:
  i=2: 6 <= 7 → idx becomes 2, swap arr[2] with arr[2] (no change)
  i=3: 8 > 7  → skip

Place pivot: idx becomes 3, swap arr[4] with arr[3]
       [4, 5, 6, 7, 8]
                ^pivot locked at index 3
```

---

## The Partition Function Explained

The partition does all the real work:

```typescript
function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];      // Last element is the pivot
    let idx = lo - 1;           // Boundary of "small" elements

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;              // Expand the "small" region
            swap(arr, i, idx);  // Move small element to left side
        }
    }

    idx++;                      // Pivot goes right after last small element
    swap(arr, hi, idx);         // Place pivot in final position
    return idx;
}
```

Think of `idx` as a dividing line:
- Left of `idx`: elements <= pivot
- Right of `idx`: elements > pivot

---

## Why O(N log N) Average?

Each partition divides the array roughly in half:

```
Level 0:  [        N        ]     → N comparisons
Level 1:  [   N/2  ] [  N/2 ]     → N comparisons
Level 2:  [N/4][N/4] [N/4][N/4]   → N comparisons
...
```

- log N levels (we keep halving)
- N comparisons per level
- Total: O(N log N)

---

## Why O(N²) Worst Case?

If the pivot is always the smallest or largest element (e.g., sorted array):

```
Level 0:  [1, 2, 3, 4, 5]  pivot=5, left=[1,2,3,4], right=[]
Level 1:  [1, 2, 3, 4]     pivot=4, left=[1,2,3], right=[]
Level 2:  [1, 2, 3]        pivot=3, left=[1,2], right=[]
...
```

N levels instead of log N → O(N²)

---

## Implementation

```typescript
function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }
    const pivotIdx = partition(arr, lo, hi);

    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];
    let idx = lo - 1;

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
}

function quickSort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
```

---

## When to Use

**Use quick sort when:**
- You need fast average-case performance
- Memory is limited (in-place sorting)
- You're sorting primitive types

**Don't use when:**
- You need guaranteed O(N log N) (use merge sort)
- Stability matters (equal elements must keep order)
- Array is nearly sorted (use insertion sort)

---

## Quick Sort vs Merge Sort

| Aspect | Quick Sort | Merge Sort |
|--------|------------|------------|
| Average Time | O(N log N) | O(N log N) |
| Worst Time | O(N²) | O(N log N) |
| Space | O(log N) | O(N) |
| Stable? | No | Yes |
| In-place? | Yes | No |

Quick sort is usually faster in practice due to better cache locality.

---

## Summary

| Aspect | Value |
|--------|-------|
| Time | O(N log N) average, O(N²) worst |
| Space | O(log N) |
| Stable? | No |
| In-place? | Yes |
| Method | Divide and conquer |
