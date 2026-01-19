import type { BinarySearchTree, BinarySearchTreeNode } from "./types.ts"

function createRecursiveBinarySearchTree<T>(): BinarySearchTree<T> {
  let root: BinarySearchTreeNode<T> | undefined = undefined

  function find(
    node: BinarySearchTreeNode<T> | undefined,
    value: T,
  ): T | undefined {
    if (!node) {
      return undefined
    }

    if (node.value === value) {
      return value
    }

    if (value < node.value) {
      return find(node.left, value)
    }
    return find(node.right, value)
  }

  function insert(
    node: BinarySearchTreeNode<T> | undefined,
    value: T,
  ): BinarySearchTreeNode<T> {
    if (!node) {
      return {
        value,
        left: undefined,
        right: undefined,
      }
    }

    if (value < node.value) {
      node.left = insert(node.left, value)
    } else {
      node.right = insert(node.right, value)
    }
    return node
  }

  function remove(
    node: BinarySearchTreeNode<T> | undefined,
    value: T,
  ): BinarySearchTreeNode<T> | undefined {
    if (!node) return undefined

    if (value < node.value) {
      node.left = remove(node.left, value)
    } else if (value > node.value) {
      node.right = remove(node.right, value)
    } else {
      // case 1: leaf node
      if (!node.left && !node.right) return undefined
      // case 2: one child
      if (!node.left) return node.right
      if (!node.right) return node.left
      // case 3: two children - find in-order successor (smallest in right subtree)
      const successor = min(node.right)
      node.value = successor.value
      node.right = remove(node.right, successor.value)
    }

    return node
  }

  function min(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
    if (!node.left) return node
    return min(node.left)
  }

  return {
    find(value: T): T | undefined {
      return find(root, value)
    },
    insert(value: T): void {
      root = insert(root, value)
    },
    remove(value: T): T | undefined {
      if (!find(root, value)) return undefined
      root = remove(root, value)
      return value
    },
    util: { min },
  }
}

export { createRecursiveBinarySearchTree }
