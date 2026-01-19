type Node<T> = {
  value: T
  prev: Node<T> | undefined
}

interface Stack<T> {
  push(item: T): void
  pop(): T | undefined
  peek(): T | undefined
  length: number
}

function createStack<T>(): Stack<T> {
  let length: number = 0
  let head: Node<T> | undefined

  return {
    get length() {
      return length
    },

    push(item: T): void {
      const node: Node<T> = { value: item, prev: head }
      length++
      head = node
    },

    pop(): T | undefined {
      if (!head) return undefined

      length--
      const current = head
      head = head.prev
      current.prev = undefined

      return current.value
    },

    peek(): T | undefined {
      return head?.value
    },
  }
}

export { createStack, type Node, type Stack }
