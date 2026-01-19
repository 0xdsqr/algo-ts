function sort<T>(array: T[]): void {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        const current = array[j]
        array[j] = array[j + 1]
        array[j + 1] = current
      }
    }
  }
}

export const BubbleSort = { sort }
