import { describe, expect, it } from "bun:test"
import { quickSort } from "../src/quick-sort"

describe("quickSort", () => {
  it("sorts an unsorted array", () => {
    const arr = [5, 3, 1, 4, 2]
    quickSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it("handles already sorted array", () => {
    const arr = [1, 2, 3, 4, 5]
    quickSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it("handles reverse sorted array", () => {
    const arr = [5, 4, 3, 2, 1]
    quickSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it("handles empty array", () => {
    const arr: number[] = []
    quickSort(arr)
    expect(arr).toEqual([])
  })

  it("handles single element array", () => {
    const arr = [1]
    quickSort(arr)
    expect(arr).toEqual([1])
  })

  it("handles array with duplicates", () => {
    const arr = [3, 1, 2, 1, 3]
    quickSort(arr)
    expect(arr).toEqual([1, 1, 2, 3, 3])
  })

  it("handles the example from the docs", () => {
    const arr = [8, 7, 6, 4, 5]
    quickSort(arr)
    expect(arr).toEqual([4, 5, 6, 7, 8])
  })

  it("handles two element array", () => {
    const arr = [2, 1]
    quickSort(arr)
    expect(arr).toEqual([1, 2])
  })

  it("handles array with all same elements", () => {
    const arr = [3, 3, 3, 3]
    quickSort(arr)
    expect(arr).toEqual([3, 3, 3, 3])
  })

  it("handles negative numbers", () => {
    const arr = [3, -1, 0, -5, 2]
    quickSort(arr)
    expect(arr).toEqual([-5, -1, 0, 2, 3])
  })
})
