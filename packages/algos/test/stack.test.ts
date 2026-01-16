import { describe, expect, it } from "bun:test"
import { createStack } from "../src/stack"

describe("createStack", () => {
  it("pushes and pops in LIFO order", () => {
    const stack = createStack<number>()
    stack.push(1)
    stack.push(2)
    stack.push(3)

    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
  })

  it("returns undefined when popping empty stack", () => {
    const stack = createStack<number>()
    expect(stack.pop()).toBeUndefined()
  })

  it("peeks without removing", () => {
    const stack = createStack<number>()
    stack.push(1)
    stack.push(2)

    expect(stack.peek()).toBe(2)
    expect(stack.peek()).toBe(2)
    expect(stack.length).toBe(2)
  })

  it("returns undefined when peeking empty stack", () => {
    const stack = createStack<number>()
    expect(stack.peek()).toBeUndefined()
  })

  it("tracks length correctly", () => {
    const stack = createStack<number>()
    expect(stack.length).toBe(0)

    stack.push(1)
    expect(stack.length).toBe(1)

    stack.push(2)
    expect(stack.length).toBe(2)

    stack.pop()
    expect(stack.length).toBe(1)

    stack.pop()
    expect(stack.length).toBe(0)
  })

  it("works with strings", () => {
    const stack = createStack<string>()
    stack.push("a")
    stack.push("b")

    expect(stack.pop()).toBe("b")
    expect(stack.pop()).toBe("a")
  })

  it("handles push after pop", () => {
    const stack = createStack<number>()
    stack.push(1)
    stack.pop()
    stack.push(2)

    expect(stack.peek()).toBe(2)
    expect(stack.length).toBe(1)
  })
})
