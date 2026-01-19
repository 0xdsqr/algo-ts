// Data Structures

// Algorithms
import { BinarySearch } from "./algorithms/binary-search/binary-search"
import { BubbleSort } from "./algorithms/bubble-sort/bubble-sort"
import { LinearSearch } from "./algorithms/linear-search/linear-search"
import { BinarySearchTree } from "./data-structure/binary-search-tree/binary-search-tree"
import { Heap } from "./data-structure/heap/heap"
import { LinkedList } from "./data-structure/linked-list/linked-list"
import { Queue } from "./data-structure/queue/queue"
import { Stack } from "./data-structure/stack/stack"

// Individual exports
export { Stack, Queue, Heap, LinkedList, BinarySearchTree }
export { BinarySearch, LinearSearch, BubbleSort }

// Grouped exports
export const DataStructures = {
  Stack,
  Queue,
  Heap,
  LinkedList,
  BinarySearchTree,
}

export const Algorithms = {
  BinarySearch,
  LinearSearch,
  BubbleSort,
}
