import type { BinarySearchTree, BinarySearchTreeNode } from "./types.ts"

function createIterativeBinarySearchTree<T>(): BinarySearchTree<T> {
  let root: BinarySearchTreeNode<T> | undefined

  function descend(
    node: BinarySearchTreeNode<T>,
    value: T,
  ): BinarySearchTreeNode<T> | undefined {
    return value < node.value ? node.left : node.right
  }

  function find(value: T): T | undefined {
    let current = root
    while (current) {
      if (current.value === value) return value
      current = descend(current, value)
    }
    return undefined
  }

  function insert(value: T): void {
    const node: BinarySearchTreeNode<T> = {
      value,
      left: undefined,
      right: undefined,
    }

    if (!root) {
      root = node
      return
    }

    let current: BinarySearchTreeNode<T> | undefined = root
    let parent: BinarySearchTreeNode<T> = root
    while (current) {
      parent = current
      current = descend(current, value)
    }

    if (value < parent.value) {
      parent.left = node
    } else {
      parent.right = node
    }
  }

  function min(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
    while (node.left) node = node.left
    return node
  }

  function remove(value: T): T | undefined {
    if (!root) return undefined

    let current: BinarySearchTreeNode<T> | undefined = root
    let parent: BinarySearchTreeNode<T> | undefined
    let isLeftChild = false

    // Find the node to remove
    while (current && current.value !== value) {
      parent = current
      if (value < current.value) {
        current = current.left
        isLeftChild = true
      } else {
        current = current.right
        isLeftChild = false
      }
    }

    // Not found
    if (!current) return undefined

    // Case 1: leaf node
    if (!current.left && !current.right) {
      if (!parent) {
        root = undefined
      } else if (isLeftChild) {
        parent.left = undefined
      } else {
        parent.right = undefined
      }
    }
    // Case 2: one child
    else if (!current.left) {
      if (!parent) {
        root = current.right
      } else if (isLeftChild) {
        parent.left = current.right
      } else {
        parent.right = current.right
      }
    } else if (!current.right) {
      if (!parent) {
        root = current.left
      } else if (isLeftChild) {
        parent.left = current.left
      } else {
        parent.right = current.left
      }
    }
    // Case 3: two children
    else {
      const successor = min(current.right)
      const successorValue = successor.value
      remove(successorValue)
      current.value = successorValue
    }

    return value
  }
  return {
    find,
    insert,
    remove,
    util: { min },
  }
}

export { createIterativeBinarySearchTree }
