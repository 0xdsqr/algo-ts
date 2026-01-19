type BinaryNode<T> = {
  value: T
  left: BinaryNode<T> | undefined
  right: BinaryNode<T> | undefined
}

function bstSearch<T>(current: BinaryNode<T> | undefined, item: T): boolean {
  if (!current) {
    return false
  }

  if (current.value === item) {
    return true
  }

  if (item < current.value) {
    return bstSearch(current.left, item)
  }

  return bstSearch(current.right, item)
}

function dfsBst<T>(head: BinaryNode<T>, item: T): boolean {
  return bstSearch(head, item)
}

function search<T>(current: BinaryNode<T> | undefined, item: T): boolean {
  if (!current) {
    return false
  }

  if (current.value === item) {
    return true
  }

  if (item < current.value) {
    return search(current.left, item)
  }

  return search(current.right, item)
}

function dfs<T>(head: BinaryNode<T>, item: T): boolean {
  return search(head, item)
}

export { dfs, dfsBst, type BinaryNode }
