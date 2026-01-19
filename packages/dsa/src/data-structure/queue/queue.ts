type Node<T> = {
  value: T
  next: Node<T> | undefined
}

interface QueueInstance<T> {
  enqueue(item: T): void
  dequeue(): T | undefined
  peek(): T | undefined
  length: number
}

function createQueue<T>(): QueueInstance<T> {
  let length: number = 0
  let head: Node<T> | undefined
  let tail: Node<T> | undefined

  return {
    enqueue(value: T): void {
      const node: Node<T> = { value, next: undefined }
      length++
      if (!tail) {
        head = tail = node
        return
      }

      tail.next = node
      tail = node
      return
    },
    dequeue(): T | undefined {
      if (!head) return undefined
      length--

      const current = head
      head = head.next
      current.next = undefined

      if (!head) tail = undefined

      return current.value
    },
    peek(): T | undefined {
      if (!head) return undefined
      return head.value
    },
    get length(): number {
      return length
    },
  }
}

export type { Node, QueueInstance }
export const Queue = { create: createQueue }
