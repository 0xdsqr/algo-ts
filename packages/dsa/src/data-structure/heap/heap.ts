interface HeapInstance<T> {
  push(item: T): void
  pop(): T | undefined
}

type HeapType = "min" | "max"

function createHeap<TValue>(heapType: HeapType = "min"): HeapInstance<TValue> {
  let heap: TValue[] = []
  let length: number = 0

  const parent = (index: number): number => Math.floor((index - 1) / 2)
  const leftChild = (index: number): number => index * 2 + 1
  const rightChild = (index: number): number => index * 2 + 2

  const swap = (indexA: number, indexB: number): void => {
    ;[heap[indexA], heap[indexB]] = [heap[indexB], heap[indexA]]
  }

  const shouldSwap = (child: TValue, parent: TValue): boolean => {
    return heapType === "min" ? child < parent : child > parent
  }

  function bubbleUp(index: number): void {
    if (index === 0) return
    const parentIndex = parent(index)
    const parentValue = heap[parentIndex]
    const currentValue = heap[index]
    if (shouldSwap(currentValue, parentValue)) {
      swap(index, parentIndex)
      bubbleUp(parentIndex)
    }
  }

  function bubbleDown(index: number): void {
    const leftIndex = leftChild(index)
    const rightIndex = rightChild(index)
    if (leftIndex >= length) return

    const leftValue = heap[leftIndex]
    const rightValue = heap[rightIndex]
    const currentValue = heap[index]

    let targetIndex = leftIndex
    if (rightIndex < length && shouldSwap(rightValue, leftValue)) {
      targetIndex = rightIndex
    }

    if (shouldSwap(heap[targetIndex], currentValue)) {
      swap(index, targetIndex)
      bubbleDown(targetIndex)
    }
  }

  return {
    push(item: TValue): void {
      heap[length] = item
      bubbleUp(length)
      length++
    },
    pop(): TValue | undefined {
      if (length === 0) return undefined
      const value = heap[0]
      length--
      if (length === 0) {
        heap = []
        return value
      }
      heap[0] = heap[length]
      heap.length = length
      bubbleDown(0)
      return value
    },
  }
}

export type { HeapInstance, HeapType }
export const Heap = { create: createHeap }
