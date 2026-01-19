type Node<T> = {
  value: T
  prev: Node<T> | undefined
}

interface StackInstance<T> {
  push(item: T): void
  pop(): T | undefined
  peek(): T | undefined
  length: number
}

function createStack<T>(): StackInstance<T> {
  let length: number = 0
  let head: Node<T> | undefined

  return {
    push(value: T): void {
      length++
      head = { value, prev: head } as Node<T>
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
      if (!head) return undefined
      return head.value
    },
    get length(): number {
      return length
    },
  }
}

export type { Node, StackInstance }
export const Stack = { create: createStack }
