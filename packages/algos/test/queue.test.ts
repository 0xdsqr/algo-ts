import { describe, expect, it } from "bun:test"
import { createQueue } from "../src/queue"

describe("createQueue", () => {
  it("enqueues and dequeues in FIFO order", () => {
    const queue = createQueue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)

    expect(queue.deque()).toBe(1)
    expect(queue.deque()).toBe(2)
    expect(queue.deque()).toBe(3)
  })

  it("returns undefined when dequeuing empty queue", () => {
    const queue = createQueue<number>()
    expect(queue.deque()).toBeUndefined()
  })

  it("peeks without removing", () => {
    const queue = createQueue<number>()
    queue.enqueue(1)
    queue.enqueue(2)

    expect(queue.peek()).toBe(1)
    expect(queue.peek()).toBe(1)
    expect(queue.length).toBe(2)
  })

  it("returns undefined when peeking empty queue", () => {
    const queue = createQueue<number>()
    expect(queue.peek()).toBeUndefined()
  })

  it("tracks length correctly", () => {
    const queue = createQueue<number>()
    expect(queue.length).toBe(0)

    queue.enqueue(1)
    expect(queue.length).toBe(1)

    queue.enqueue(2)
    expect(queue.length).toBe(2)

    queue.deque()
    expect(queue.length).toBe(1)

    queue.deque()
    expect(queue.length).toBe(0)
  })

  it("works with strings", () => {
    const queue = createQueue<string>()
    queue.enqueue("a")
    queue.enqueue("b")

    expect(queue.deque()).toBe("a")
    expect(queue.deque()).toBe("b")
  })

  it("handles enqueue after full dequeue", () => {
    const queue = createQueue<number>()
    queue.enqueue(1)
    queue.deque()
    queue.enqueue(2)

    expect(queue.peek()).toBe(2)
    expect(queue.length).toBe(1)
  })

  it("resets tail when queue becomes empty", () => {
    const queue = createQueue<number>()
    queue.enqueue(1)
    queue.deque()

    queue.enqueue(2)
    queue.enqueue(3)

    expect(queue.deque()).toBe(2)
    expect(queue.deque()).toBe(3)
  })
})
