# Queue

## Introduction

A queue is a linear data structure that follows **FIFO** — First In, First Out. Think of a line at a store: the first person in line is the first person served.

> **Key insight:** By constraining what operations we allow, we get guaranteed O(1) performance. No traversal, no searching — just add to back, remove from front.

---

## Why Queues?

The power of a queue comes from its constraints:

| What we give up | What we get |
|-----------------|-------------|
| Random access | O(1) enqueue |
| Traversal | O(1) dequeue |
| Searching | O(1) peek |
| Flexibility | Predictable performance |

By limiting ourselves to operations at the ends, everything becomes constant time.

---

## Interface

A queue has three core operations:

```typescript
interface Queue<T> {
  enqueue(item: T): void   // Add to back
  dequeue(): T | undefined // Remove from front
  peek(): T | undefined    // Look at front (don't remove)
  length: number
}
```

That's it. No `get(index)`, no `insertAt()`, no `remove(value)`. The constraints are the feature.

---

## How It Works

Built on a linked list, using head as front and tail as back:

```
enqueue(D):
                        
  front              back
    ↓                  ↓
   [A] → [B] → [C]    [D]  ← new node
                  ↘   ↗
                   link

  front                   back
    ↓                       ↓
   [A] → [B] → [C] → [D]


dequeue():

  front                   back
    ↓                       ↓
   [A] → [B] → [C] → [D]
    ↑
  remove, return value

       front              back
         ↓                  ↓
        [B] → [C] → [D]
```

---

## Implementation

```typescript
interface Node<T> {
  value: T
  next: Node<T> | null
}

class Queue<T> {
  private head: Node<T> | null = null
  private tail: Node<T> | null = null
  public length = 0

  enqueue(item: T): void {
    const node: Node<T> = { value: item, next: null }

    if (this.tail) {
      this.tail.next = node
    }
    this.tail = node

    if (!this.head) {
      this.head = node
    }

    this.length++
  }

  dequeue(): T | undefined {
    if (!this.head) return undefined

    const value = this.head.value
    this.head = this.head.next

    if (!this.head) {
      this.tail = null
    }

    this.length--
    return value
  }

  peek(): T | undefined {
    return this.head?.value
  }
}
```

### What's Happening

**enqueue:**
1. Create a new node — O(1)
2. Point current tail's next to new node — O(1)
3. Update tail pointer — O(1)

**dequeue:**
1. Save head's value — O(1)
2. Move head to head.next — O(1)
3. Return value — O(1)

**peek:**
1. Return head's value — O(1)

No loops. No traversal. Just pointer updates.

---

## Complexity

| Operation | Time | Space | Why |
|-----------|------|-------|-----|
| `enqueue` | O(1) | O(1) | Create node, update tail pointer |
| `dequeue` | O(1) | O(1) | Update head pointer, return value |
| `peek` | O(1) | O(1) | Read head value |
| `length` | O(1) | O(1) | Maintained counter |

**Overall space:** O(N) for N items in queue.

Everything is constant because:
- We have direct pointers to head and tail
- We only operate at the ends
- We never traverse the middle

---

## Use Cases

Queues are everywhere:

| Use Case | Why Queue? |
|----------|------------|
| Task scheduling | Process jobs in order received |
| BFS traversal | Visit nodes level by level |
| Print spooler | Print documents in order |
| Message queues | Handle requests in order (Kafka, RabbitMQ) |
| Buffer | Stream processing, IO operations |
| Rate limiting | Process N requests per time window |

### Real World Examples

```typescript
// Task queue
const tasks = new Queue<() => void>()
tasks.enqueue(() => sendEmail())
tasks.enqueue(() => processPayment())
tasks.enqueue(() => updateDatabase())

// Process in order
while (tasks.length > 0) {
  const task = tasks.dequeue()
  task?.()
}

// BFS uses a queue
function bfs(root: TreeNode) {
  const queue = new Queue<TreeNode>()
  queue.enqueue(root)

  while (queue.length > 0) {
    const node = queue.dequeue()!
    console.log(node.value)

    if (node.left) queue.enqueue(node.left)
    if (node.right) queue.enqueue(node.right)
  }
}
```

---

## Queue vs Stack

| Aspect | Queue | Stack |
|--------|-------|-------|
| Order | FIFO (First In, First Out) | LIFO (Last In, First Out) |
| Add | `enqueue` (back) | `push` (top) |
| Remove | `dequeue` (front) | `pop` (top) |
| Use case | BFS, task scheduling | DFS, undo/redo, call stack |

---

## Summary

| Aspect | Value |
|--------|-------|
| Order | FIFO |
| enqueue | O(1) |
| dequeue | O(1) |
| peek | O(1) |
| Space | O(N) |
| Built on | Linked list |
| Key insight | Constraints enable performance |
