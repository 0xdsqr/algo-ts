type Node<T> = {
  value: T
  left: Node<T> | undefined
  right: Node<T> | undefined
}

interface BinarySearchTreeInstance<T> {
  find(value: T): T | undefined
  insert(value: T): void
  remove(value: T): T | undefined
}

function depthFirstSearch<T>(node: Node<T> | undefined, value: T): boolean {
  if (!node) return false
  if (value === node.value) return true
  if (node.left) return depthFirstSearch(node.left, value)
  return depthFirstSearch(node.right, value)
}

function breadthFirstSearch<T>(head: Node<T>, value: T): boolean {
  const queue: Array<Node<T>> = [head]

  while (queue.length) {
    const current = queue.shift() as Node<T>
    if (value === current.value) return true
    if (current.left) queue.push(current.left)
    if (current.right) queue.push(current.right)
  }

  return false
}

function createBinarySearchTree<T>(): BinarySearchTreeInstance<T> {
  let root: Node<T> | undefined

  function search(node: Node<T> | undefined, value: T): T | undefined {
    if (!node) return undefined
    if (value === node.value) return value
    if (value < node.value) return search(node.left, value)
    return search(node.right, value)
  }

  function insert<T>(node: Node<T> | undefined, value: T): Node<T> | undefined {
    const newNode: Node<T> = { value, left: undefined, right: undefined }
    if (!node) return newNode
    if (value < node.value) {
      node.left = insert(node.left, value)
    } else {
      node.right = insert(node.right, value)
    }
    return node
  }

  function remove<T>(node: Node<T> | undefined, value: T): Node<T> | undefined {
    if (!node) return undefined

    if (value < node.value) {
      node.left = remove(node.left, value)
    } else if (value > node.value) {
      node.right = remove(node.right, value)
    } else {
      if (!node.left && !node.right) return undefined

      if (!node.left) return node.right
      if (!node.right) return node.left

      const successor = min(node.right)
      node.value = successor.value
      node.right = remove(node.right, successor.value)
    }
    return node
  }

  function min<T>(node: Node<T>): Node<T> {
    while (node.left) node = node.left
    return node
  }

  return {
    find(value: T): T | undefined {
      return search(root, value)
    },
    insert(value: T): void {
      root = insert(root, value)
    },
    remove(value: T): T | undefined {
      return remove(root, value)?.value
    },
  }
}
export type { Node, BinarySearchTreeInstance }
export const BinarySearchTree = {
  create: createBinarySearchTree,
  dfs: depthFirstSearch,
  bfs: breadthFirstSearch,
}
