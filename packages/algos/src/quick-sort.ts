function qs(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) {
    return
  }
  const pivotIdx = partition(arr, lo, hi)

  qs(arr, lo, pivotIdx - 1)
  qs(arr, pivotIdx + 1, hi)
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi]
  let idx = lo - 1

  // Walk through all elements except the pivot (lo to hi-1)
  for (let i = lo; i < hi; i++) {
    if (arr[i] <= pivot) {
      // Found an element that belongs on the left side.
      // Expand the "small" region and swap this element into it.
      //
      // Example with [8, 7, 6, 4, 5] (pivot = 5):
      //   - When we find 4, idx becomes 0, we swap arr[3] with arr[0] -> [4, 7, 6, 8, 5]
      //   - This moves small elements to the front, pushing large elements back
      idx++
      const tmp = arr[i]
      arr[i] = arr[idx]
      arr[idx] = tmp
    }
  }

  // Place the pivot in its final position.
  // After the loop, idx points to the last element <= pivot.
  // So idx + 1 is where the pivot belongs (first element > pivot, or end of array).
  // This ensures: all elements left of pivot are <=, all elements right are >.
  idx++
  arr[hi] = arr[idx]
  arr[idx] = pivot

  return idx
}

function quickSort(arr: number[]): void {
  qs(arr, 0, arr.length - 1)
}

export { quickSort }
