# Linked Lists

## Why Start with Linked Lists?

Linked lists are foundational to understanding data structures and algorithms. Master them, and you'll have the building blocks for:

- **Trees** — A tree is just a linked list where each node can have multiple children instead of one `next`
- **Graphs** — Nodes with multiple connections, often implemented with adjacency lists (linked lists!)
- **Queues & Stacks** — Direct applications of linked list operations
- **Hash tables** — Chaining collision resolution uses linked lists
- **LRU Caches** — Doubly linked list + hash map

The concepts you learn here — node references, pointer manipulation, traversal — appear everywhere in computer science.

> **The pattern:** A node holds a value and references to other nodes. That's it. Trees, graphs, and more complex structures are variations of this idea.

---

## Introduction

A linked list is a linear data structure where elements are stored in nodes, and each node points to the next (and possibly previous) node. Unlike arrays, linked lists don't use contiguous memory.

> **Key insight:** Linked lists excel at insertion and deletion (O(1) if you have a reference to the node) but sacrifice random access (O(N) to reach element i).

---

## Why Not Arrays?

Arrays have limitations:

| Operation | Array | Why? |
|-----------|-------|------|
| Insertion at middle | O(N) | Must shift all elements after |
| Deletion at middle | O(N) | Must shift all elements after |
| Growing/resizing | O(N) | Must allocate new memory and copy |

Linked lists solve these problems by using nodes connected via pointers.

---

## How It Works

### Node Structure

Each node contains:
- A **value** of type T
- A **next** pointer to the next node (or null)
- A **prev** pointer to the previous node (doubly linked only)

```typescript
interface Node<T> {
  value: T
  next: Node<T> | null
}

interface DoublyNode<T> {
  value: T
  next: DoublyNode<T> | null
  prev: DoublyNode<T> | null
}
```

---

## Singly vs Doubly Linked

### Singly Linked List

Nodes only point forward:

```
head
 ↓
[A] → [B] → [C] → [D] → null
```

- Can only traverse forward
- Less memory (no prev pointer)
- If you lose a reference, you can't go back

### Doubly Linked List

Nodes point both directions:

```
       head                          tail
        ↓                             ↓
null ← [A] ⇄ [B] ⇄ [C] ⇄ [D] → null
```

- Can traverse both directions
- More memory (prev pointer per node)
- Easier deletion (don't need reference to previous node)

---

## Big O

| Operation | Time | Notes |
|-----------|------|-------|
| Access (get index i) | O(N) | Must traverse from head |
| Search | O(N) | Must traverse to find value |
| Insert at head/tail | O(1) | Just update pointers |
| Insert at middle | O(1)* | *If you already have the node reference |
| Delete at head/tail | O(1) | Just update pointers |
| Delete at middle | O(1)* | *If you already have the node reference |

**Space Complexity:** O(N) — one node per element.

---

## Insertion

To insert F between A and B in a doubly linked list:

```
Before: [A] ⇄ [B]

Step 1: Create F, point F.next to B
        [A] ⇄ [B]
        [F] → [B]

Step 2: Point F.prev to A
        [A] ⇄ [B]
        [A] ← [F] → [B]

Step 3: Point A.next to F
        [A] → [F] → [B]
        [A] ← [F]
            ← [B]

Step 4: Point B.prev to F
        [A] ⇄ [F] ⇄ [B]

After:  [A] ⇄ [F] ⇄ [B]
```

```typescript
function insertAfter<T>(node: DoublyNode<T>, value: T): DoublyNode<T> {
  const newNode: DoublyNode<T> = {
    value,
    prev: node,
    next: node.next,
  }

  if (node.next) {
    node.next.prev = newNode
  }
  node.next = newNode

  return newNode
}
```

This is O(1) — just setting pointers, no matter how big the list is.

---

## Deletion

To delete C from a doubly linked list:

```
Before: [B] ⇄ [C] ⇄ [D]

Step 1: Point B.next to D (skip C)
        [B] → [D]
        [B] ← [C] ⇄ [D]

Step 2: Point D.prev to B (skip C)
        [B] ⇄ [D]
        [C] (orphaned)

After:  [B] ⇄ [D]
```

```typescript
function remove<T>(node: DoublyNode<T>): void {
  if (node.prev) {
    node.prev.next = node.next
  }
  if (node.next) {
    node.next.prev = node.prev
  }
}
```

This is O(1) — just updating pointers.

---

## Traversal

Unlike arrays, you can't jump to index i directly. You must walk from head:

```typescript
function get<T>(head: Node<T> | null, index: number): T | null {
  let current = head
  let i = 0

  while (current !== null && i < index) {
    current = current.next
    i++
  }

  return current?.value ?? null
}
```

This is O(N) — must visit each node until reaching index.

---

## When to Use

**Use linked lists when:**
- Frequent insertions/deletions at known positions
- Don't need random access by index
- Size changes frequently
- Implementing queues, stacks, or LRU caches

**Don't use when:**
- Need fast random access (use array)
- Memory is constrained (nodes have pointer overhead)
- Cache performance matters (arrays are cache-friendly)

---

## Arrays vs Linked Lists

| Aspect | Array | Linked List |
|--------|-------|-------------|
| Access by index | O(1) | O(N) |
| Insert/delete at ends | O(1)* | O(1) |
| Insert/delete at middle | O(N) | O(1)** |
| Memory | Contiguous | Scattered |
| Cache performance | Excellent | Poor |

*Amortized for dynamic arrays  
**If you have a reference to the node

---

## Complexity Breakdown

Understanding the real cost of each operation:

### The Container vs The Node

The **node** is the internal structure (value + pointers). The **container** is our abstraction — the LinkedList class that holds references to head, tail, and length.

```typescript
interface LinkedList<T> {
  length: number
  head: Node<T> | null
  tail: Node<T> | null

  // Operations
  prepend(item: T): void
  append(item: T): void
  insertAt(item: T, index: number): void
  get(index: number): T | undefined
  remove(item: T): T | undefined
  removeAt(index: number): T | undefined
}
```

When we return a value (like `get` returning `T`), we don't expose the node — that would leak our internal abstraction.

### Get Head / Get Tail — O(1)

We maintain direct pointers to head and tail:

```typescript
getHead(): T | undefined {
  return this.head?.value
}

getTail(): T | undefined {
  return this.tail?.value
}
```

Constant time — just dereference the pointer.

### Get at Index — O(N)

Must traverse from head (or tail in doubly linked):

```typescript
get(index: number): T | undefined {
  let current = this.head
  for (let i = 0; i < index && current; i++) {
    current = current.next
  }
  return current?.value
}
```

We walk until we reach the index, then return `current.value` — not the node itself.

### Prepend / Append — O(1)

Adding to either end is constant time since we have head/tail pointers:

```typescript
prepend(item: T): void {
  const node = { value: item, next: this.head, prev: null }

  if (this.head) {
    this.head.prev = node
  }
  this.head = node

  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

append(item: T): void {
  const node = { value: item, next: null, prev: this.tail }

  if (this.tail) {
    this.tail.next = node
  }
  this.tail = node

  if (!this.head) {
    this.head = node
  }
  this.length++
}
```

### Insert at Index — O(N)

Two parts: traverse O(N) + insert O(1) = O(N)

```typescript
insertAt(item: T, index: number): void {
  if (index === 0) return this.prepend(item)
  if (index === this.length) return this.append(item)

  // O(N) traversal to find position
  let current = this.head
  for (let i = 0; i < index && current; i++) {
    current = current.next
  }

  // O(1) insertion
  if (current) {
    const node = { value: item, next: current, prev: current.prev }
    if (current.prev) current.prev.next = node
    current.prev = node
    this.length++
  }
}
```

### Delete from Head / Tail — O(1)

Just update the pointers:

```typescript
removeHead(): T | undefined {
  if (!this.head) return undefined

  const value = this.head.value
  this.head = this.head.next

  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }

  this.length--
  return value
}

removeTail(): T | undefined {
  if (!this.tail) return undefined

  const value = this.tail.value
  this.tail = this.tail.prev

  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }

  this.length--
  return value
}
```

### Delete at Index — O(N)

Two parts: traverse O(N) + delete O(1) = O(N)

```typescript
removeAt(index: number): T | undefined {
  if (index === 0) return this.removeHead()
  if (index === this.length - 1) return this.removeTail()

  // O(N) traversal
  let current = this.head
  for (let i = 0; i < index && current; i++) {
    current = current.next
  }

  // O(1) deletion
  if (current) {
    if (current.prev) current.prev.next = current.next
    if (current.next) current.next.prev = current.prev
    this.length--
    return current.value
  }

  return undefined
}
```

### Complete Complexity Table

| Operation | Time | Breakdown |
|-----------|------|-----------|
| `prepend` | O(1) | Just update head pointer |
| `append` | O(1) | Just update tail pointer |
| `insertAt(index)` | O(N) | O(N) traverse + O(1) insert |
| `get(0)` / head | O(1) | Direct pointer |
| `get(length-1)` / tail | O(1) | Direct pointer |
| `get(index)` | O(N) | Must traverse |
| `removeHead` | O(1) | Just update head pointer |
| `removeTail` | O(1) | Just update tail pointer |
| `removeAt(index)` | O(N) | O(N) traverse + O(1) delete |
| `remove(value)` | O(N) | O(N) search + O(1) delete |

---

## Queues and Stacks

Linked lists are the foundation for queues and stacks:

### Queue (FIFO — First In, First Out)

- **Enqueue:** `append` to tail — O(1)
- **Dequeue:** `removeHead` — O(1)

```typescript
interface Queue<T> {
  enqueue(item: T): void  // append
  dequeue(): T | undefined // removeHead
  peek(): T | undefined    // getHead
}
```

Perfect for linked lists! Both operations are O(1).

### Stack (LIFO — Last In, First Out)

- **Push:** `prepend` to head — O(1)
- **Pop:** `removeHead` — O(1)

```typescript
interface Stack<T> {
  push(item: T): void      // prepend
  pop(): T | undefined     // removeHead
  peek(): T | undefined    // getHead
}
```

Also O(1) for both operations.

> **Note:** You could also implement a stack using the tail (append/removeTail), it's the same complexity.

---

## Summary

| Aspect | Value |
|--------|-------|
| Access | O(N) general, O(1) head/tail |
| Insert/Delete at ends | O(1) |
| Insert/Delete at middle | O(N) (traverse) + O(1) (operation) |
| Space | O(N) |
| Memory layout | Non-contiguous |
| Best for | Queues, stacks, frequent insert/delete |

---

## Practice Problems

Start with these to build intuition:

### Easy

| Problem | Description | Key Concept |
|---------|-------------|-------------|
| Reverse a linked list | Reverse the direction of all pointers | Pointer manipulation |
| Find middle node | Return the middle element | Two-pointer (slow/fast) |
| Detect cycle | Check if list has a loop | Floyd's cycle detection |
| Merge two sorted lists | Combine into one sorted list | Traversal + comparison |

### Medium

| Problem | Description | Key Concept |
|---------|-------------|-------------|
| Remove nth from end | Delete node n positions from tail | Two-pointer with gap |
| Add two numbers | Numbers represented as reversed lists | Traversal + carry |
| Copy list with random pointer | Deep copy with random refs | Hash map + traversal |
| LRU Cache | Implement least recently used cache | Doubly linked list + hash map |

### Hard

| Problem | Description | Key Concept |
|---------|-------------|-------------|
| Reverse nodes in k-group | Reverse every k nodes | Recursion + pointer manipulation |
| Merge k sorted lists | Combine k lists efficiently | Heap or divide & conquer |

### Tips for Linked List Problems

1. **Draw it out** — Visualize the pointers before coding
2. **Use dummy nodes** — Simplifies edge cases (empty list, single node)
3. **Two pointers** — Slow/fast pointers solve many problems
4. **Don't lose references** — Save `next` before changing pointers
5. **Check edge cases** — Empty list, single node, two nodes
