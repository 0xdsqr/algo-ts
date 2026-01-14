# Algorithms vs Data Structures

## Introduction

A common question: "Is a linked list a data structure or an algorithm?" Understanding the difference is fundamental to thinking about programming.

> **Key insight:** Data structures are how you organize data. Algorithms are what you do with that data.

---

## The Difference

| Aspect | Data Structure | Algorithm |
|--------|----------------|-----------|
| What is it? | A way to organize and store data | A set of steps to solve a problem |
| Focus | Storage and access patterns | Operations and transformations |
| Question it answers | "How do I hold this data?" | "How do I process this data?" |
| Examples | Array, linked list, tree, hash map | Binary search, quicksort, BFS |

---

## Is a Linked List a Data Structure or Algorithm?

**Linked list is a data structure.** It defines how nodes are organized (value + pointer to next).

But what about insertion? Deletion? Traversal?

- **Insertion** — Algorithm (the steps to add a node)
- **Deletion** — Algorithm (the steps to remove a node)
- **Traversal** — Algorithm (the steps to visit each node)

The linked list is the structure. The operations on it are algorithms.

```
Data Structure: LinkedList
├── Node { value, next, prev }
├── head pointer
└── tail pointer

Algorithms that operate on it:
├── prepend()
├── append()
├── insertAt()
├── remove()
├── get()
└── traverse()
```

---

## Data Structures Built on Other Data Structures

Here's where it gets interesting. Some data structures are built on top of others:

| Data Structure | Built On | Why? |
|----------------|----------|------|
| Queue | Linked List | O(1) enqueue/dequeue at ends |
| Stack | Linked List (or Array) | O(1) push/pop at one end |
| Hash Map | Array + Linked List | Array for buckets, lists for collisions |
| Binary Tree | Nodes with two children | Like linked list but branching |
| Graph | Nodes + Adjacency Lists | Lists of connections per node |

A **Queue** is probably the most common data structure you'll implement on top of a linked list. It's just a linked list with a restricted interface:

```typescript
// Queue is a data structure
interface Queue<T> {
  enqueue(item: T): void  // Algorithm: append to tail
  dequeue(): T | undefined // Algorithm: remove from head
  peek(): T | undefined    // Algorithm: read head value
}

// Built on LinkedList (another data structure)
class Queue<T> {
  private list = new LinkedList<T>()

  enqueue(item: T) { this.list.append(item) }
  dequeue() { return this.list.removeHead() }
  peek() { return this.list.getHead() }
}
```

---

## The Relationship

Think of it this way:

```
Data Structure = Nouns (the thing)
Algorithm = Verbs (what you do with the thing)
```

You can't have algorithms without data structures — algorithms need something to operate on. And data structures without algorithms are just inert storage.

| You have... | You need... | Together they... |
|-------------|-------------|------------------|
| Array | Binary search | Find elements in O(log N) |
| Linked list | Insertion algorithm | Add elements in O(1) |
| Graph | BFS/DFS | Traverse and search |
| Heap | Heapify algorithm | Maintain heap property |

---

## Does the Distinction Matter?

For interviews and theory — yes, knowing the difference shows understanding.

For practical programming — not really. What matters is:
1. Choosing the right structure for your access patterns
2. Understanding the time/space complexity of operations
3. Implementing correct algorithms on those structures

When someone asks "implement a queue," they want both:
- The data structure (how it's organized)
- The algorithms (enqueue, dequeue, peek)

---

## Quick Reference

**Data Structures (nouns):**
- Array
- Linked List
- Stack
- Queue
- Tree
- Graph
- Hash Map
- Heap

**Algorithms (verbs):**
- Search (linear, binary)
- Sort (bubble, quick, merge)
- Traverse (BFS, DFS)
- Insert, Delete, Update
- Balance (for trees)
- Hash (for hash maps)

---

## Summary

| Question | Answer |
|----------|--------|
| Is linked list a data structure? | Yes |
| Is insertion an algorithm? | Yes |
| Is queue a data structure? | Yes, built on linked list |
| Does the distinction matter? | For understanding, yes. For coding, implement both. |
