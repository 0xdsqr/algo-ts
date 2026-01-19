type Node<T> = {
  value: T
  prev: Node<T> | undefined
  next: Node<T> | undefined
}

interface LinkedListInstance<T> {
  prepend(value: T): void
  append(value: T): void
  insertAt(value: T, index: number): void
  remove(value: T): T | undefined
  removeAt(index: number): T | undefined
  get(index: number): T | undefined
  length(): number
}

function createLinkedList<T>(): LinkedListInstance<T> {
  let head: Node<T> | undefined
  let tail: Node<T> | undefined
  let size = 0

  return {
    prepend(value: T): void {
      //
    },
    append(value: T): void {
      //
    },
    insertAt(value: T, index: number): void {
      //
    },
    remove(value: T): T | undefined {
      return undefined
    },
    removeAt(index: number): T | undefined {
      return undefined
    },
    get(index: number): T | undefined {
      return undefined
    },
    length(): number {
      return size
    },
  }
}

export type { Node, LinkedListInstance }
export const LinkedList = { create: createLinkedList }
