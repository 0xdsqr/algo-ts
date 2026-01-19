type BinaryNode<T> = {
  value: T
  left: BinaryNode<T> | undefined
  right: BinaryNode<T> | undefined
}

function bfs<T>(head: BinaryNode<T>, item: T): boolean {
  const queue: BinaryNode<T>[] = [head]

  while (queue.length) {
    const current = queue.shift() as BinaryNode<T>

    if (current.value === item) {
      return true
    }

    if (current.left) {
      queue.push(current.left)
    }

    if (current.right) {
      queue.push(current.right)
    }
  }

  return false
}

export { bfs, type BinaryNode }
