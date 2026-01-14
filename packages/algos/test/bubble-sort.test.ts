import { describe, expect, it } from "bun:test"
import { bubbleSort } from "../src/bubble-sort"

describe("bubbleSort", () => {
  it("sorts an unsorted array", () => {
    const arr = [5, 3, 1, 4, 2]
    bubbleSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it("handles already sorted array", () => {
    const arr = [1, 2, 3, 4, 5]
    bubbleSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it("handles reverse sorted array", () => {
    const arr = [5, 4, 3, 2, 1]
    bubbleSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it("handles empty array", () => {
    const arr: number[] = []
    bubbleSort(arr)
    expect(arr).toEqual([])
  })

  it("handles single element array", () => {
    const arr = [1]
    bubbleSort(arr)
    expect(arr).toEqual([1])
  })

  it("handles array with duplicates", () => {
    const arr = [3, 1, 2, 1, 3]
    bubbleSort(arr)
    expect(arr).toEqual([1, 1, 2, 3, 3])
  })
})
