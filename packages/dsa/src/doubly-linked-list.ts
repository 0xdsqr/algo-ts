interface LinkedList<T> {
  get length(): number
  insertAt(item: T, index: number): void
  remove(item: T): T | undefined
  removeAt(index: number): T | undefined
  append(item: T): void
  prepend(item: T): void
  get(index: number): T | undefined
}

type Node<T> = {
  value: T
  prev: Node<T> | undefined
  next: Node<T> | undefined
}

function createDoublyLinkedList<T>(): LinkedList<T> {
  let length: number = 0
  let head: Node<T> | undefined
  let tail: Node<T> | undefined

  const prepend = (item: T): void => {
    const node: Node<T> = {
      value: item,
      prev: undefined,
      next: undefined,
    }

    length++

    if (!head) {
      head = tail = node
      return
    }

    node.next = head
    head.prev = node
    head = node
  }

  const insertAt = (item: T, index: number): void => {
    if (index > length) {
      throw Error("bingbong, you can't do that.")
    }
    if (index === length) {
      append(item)
      return
    }
    if (index === 0) {
      prepend(item)
      return
    }

    length++
    let current = head
    let count: number = 0
    while (current && count < index) {
      count++
      current = current.next
    }

    current = current as Node<T>

    const node: Node<T> = {
      value: item,
      next: current,
      prev: current.prev,
    }

    if (current.prev) {
      current.prev.next = node
    }
    current.prev = node

    return
  }

  const append = (item: T): void => {
    length++
    const node: Node<T> = {
      value: item,
      next: undefined,
      prev: undefined,
    }
    if (!tail) {
      head = tail = node
    }

    node.prev = tail
    tail.next = node
    tail = node

    return
  }

  const remove = (item: T): T | undefined => {
    let current = head
    while (current) {
      if (current.value === item) {
        break
      }
      current = current.next
    }
    if (!current) {
      return undefined
    }

    length--

    if (length === 0) {
      head = tail = undefined
      return current.value
    }

    if (current.prev) {
      current.prev.next = current.next
    }

    if (current.next) {
      current.next.prev = current.prev
    }

    if (current === head) {
      head = current.next
    }
    if (current === tail) {
      tail = current.prev
    }

    current.prev = current.next = undefined

    return current.value
  }

  const removeAt = (index: number): T | undefined => {
    if (index < 0 || index >= length) {
      return undefined
    }

    let current = head
    let count = 0
    while (current && count < index) {
      count++
      current = current.next
    }

    if (!current) {
      return undefined
    }

    length--

    if (length === 0) {
      head = tail = undefined
      return current.value
    }

    if (current.prev) {
      current.prev.next = current.next
    }

    if (current.next) {
      current.next.prev = current.prev
    }

    if (current === head) {
      head = current.next
    }
    if (current === tail) {
      tail = current.prev
    }

    current.prev = current.next = undefined

    return current.value
  }

  const get = (index: number): T | undefined => {
    if (index < 0 || index >= length) {
      return undefined
    }

    let current = head
    let count = 0
    while (current && count < index) {
      count++
      current = current.next
    }

    return current?.value
  }

  return {
    get length() {
      return length
    },
    prepend,
    insertAt,
    append,
    remove,
    removeAt,
    get,
  }
}

export { createDoublyLinkedList, type LinkedList, type Node }
