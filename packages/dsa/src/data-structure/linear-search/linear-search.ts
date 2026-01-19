function search<T>(array: T[], value: T): boolean {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === value) {
      return true
    }
  }
  return false
}

export const LinearSearch = { search }
