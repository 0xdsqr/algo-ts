# Bubble Sort

## Introduction

Bubble sort is one of the simplest sorting algorithms. It repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the array is repeated until the array is sorted.

> **Key insight:** After each complete pass, the largest unsorted element "bubbles up" to its correct position at the end.

---

## Big O

| Case | Time Complexity |
|------|-----------------|
| Best | O(N) — already sorted (with optimization) |
| Average | O(N²) |
| Worst | O(N²) — reverse sorted |

**Space Complexity:** O(1) — sorts in place.

---

## How It Works

1. Start at the beginning of the array
2. Compare adjacent elements (index i and i+1)
3. If the left element is greater, swap them
4. Move to the next pair
5. Repeat until the end of the array
6. The largest element is now at the end
7. Repeat the process, excluding the last sorted elements

```
[1, 3, 7, 4, 2]  — unsorted

Pass 1:
[1, 3, 7, 4, 2]  1 < 3 → no swap
[1, 3, 7, 4, 2]  3 < 7 → no swap
[1, 3, 4, 7, 2]  7 > 4 → swap
[1, 3, 4, 2, 7]  7 > 2 → swap
                 7 is now in place

Pass 2:
[1, 3, 4, 2, 7]  1 < 3 → no swap
[1, 3, 4, 2, 7]  3 < 4 → no swap
[1, 3, 2, 4, 7]  4 > 2 → swap
                 4 is now in place

Pass 3:
[1, 3, 2, 4, 7]  1 < 3 → no swap
[1, 2, 3, 4, 7]  3 > 2 → swap
                 3 is now in place

Pass 4:
[1, 2, 3, 4, 7]  1 < 2 → no swap
                 Done!
```

---

## Why O(N²)?

Each pass through the array places one element in its final position. With N elements:
- First pass: N-1 comparisons
- Second pass: N-2 comparisons
- Third pass: N-3 comparisons
- ...
- Last pass: 1 comparison

Total comparisons: (N-1) + (N-2) + ... + 1 = N(N-1)/2 = O(N²)

---

## Implementation

```typescript
function bubbleSort(arr: number[]): void {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    // Each pass places one element at the end
    // So we only need to check up to n - 1 - i
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap adjacent elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}
```

### Optimized Version

If no swaps occur during a pass, the array is already sorted:

```typescript
function bubbleSortOptimized(arr: number[]): void {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    // If no swaps, array is sorted
    if (!swapped) break;
  }
}
```

---

## When to Use

**Use bubble sort when:**
- Learning sorting algorithms (educational purposes)
- Array is very small
- Array is nearly sorted (with optimization)
- Simplicity matters more than performance

**Don't use when:**
- Array is large
- Performance matters
- Better alternatives are available (insertion sort, quicksort, etc.)

---

## Bubble Sort vs Insertion Sort

Insertion sort is generally preferred over bubble sort because:
- Fewer swaps on average
- Better performance on nearly sorted data
- Same O(N²) worst case, but faster in practice

---

## Summary

| Aspect | Value |
|--------|-------|
| Time | O(N²) |
| Space | O(1) |
| Stable? | Yes |
| In-place? | Yes |
| Simple? | Yes |
