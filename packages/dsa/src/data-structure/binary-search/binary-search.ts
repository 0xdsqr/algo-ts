function search<T>(array: T[], value: T): boolean {
  let low = 0
  let high = array.length - 1

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2)
    const midValue = array[mid]

    if (midValue === value) return true

    if (midValue < value) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return false
}

export const BinarySearch = { search }
