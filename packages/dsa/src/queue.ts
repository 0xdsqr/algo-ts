type Node<T> = {
  value: T
  next: Node<T> | undefined
}

interface Queue<T> {
  enqueue(item: T): void
  deque(): T | undefined
  peek(): T | undefined
  length: number
}

function createQueue<T>(): Queue<T> {
  let length: number = 0
  let head: Node<T> | undefined
  let tail: Node<T> | undefined

  return {
    get length() {
      return length
    },

    enqueue(item: T): void {
      const node: Node<T> = { value: item, next: undefined }
      length++

      if (!tail) {
        tail = head = node
        return
      }

      tail.next = node
      tail = node
    },

    deque(): T | undefined {
      if (!head) return undefined

      length--
      const current = head
      head = head.next
      current.next = undefined

      if (!head) tail = undefined

      return current.value
    },

    peek(): T | undefined {
      return head?.value
    },
  }
}

export { createQueue, type Node, type Queue }
