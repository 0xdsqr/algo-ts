type BinarySearchTreeNode<T> = {
  value: T
  left: BinarySearchTreeNode<T> | undefined
  right: BinarySearchTreeNode<T> | undefined
}

interface BinarySerachTreeUtil<T> {
  min(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
}

interface BinarySearchTree<T> {
  find(value: T): T | undefined
  insert(value: T): void
  remove(value: T): T | undefined
  util: BinarySerachTreeUtil<T>
}

export type { BinarySearchTreeNode, BinarySearchTree }
