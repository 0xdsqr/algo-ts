import { describe, expect, it } from "bun:test"
import { linearSearch } from "../src/linear-search"

describe("linearSearch", () => {
  it("returns true when target is found", () => {
    expect(linearSearch([1, 2, 3, 4, 5], 3)).toBe(true)
  })

  it("returns false when target is not found", () => {
    expect(linearSearch([1, 2, 3, 4, 5], 6)).toBe(false)
  })

  it("returns false for empty array", () => {
    expect(linearSearch([], 1)).toBe(false)
  })

  it("finds target at first position", () => {
    expect(linearSearch([1, 2, 3], 1)).toBe(true)
  })

  it("finds target at last position", () => {
    expect(linearSearch([1, 2, 3], 3)).toBe(true)
  })
})
