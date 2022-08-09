const numbers: number[] = [5, 2, 7, 4, 9, 1, 3, 10]

console.log("---The numbers---")
for (let val of numbers) {
  console.log(val)
}

type NodeType<T> = {
  left: NodeType<T> | null
  right: NodeType<T> | null
  value: T
}

const nodeNew = <T>(value: T): NodeType<T> => {
  return {
    left: null,
    right: null,
    value: value
  }
}

const simpleNodeAdd = <T>(
  root: NodeType<T>,
  node: NodeType<T>
): NodeType<T> => {
  if (node.value >= root.value) {
    if (root?.right) {
      root.right.right = node
    } else {
      root.right = node
    }
  } else {
    if (root?.left) {
      root.left.left = node
    } else {
      root.left = node
    }
  }
  return node
}

const printNodes = <T>(root: NodeType<T>) => {
  console.log("     " + root.value)
  console.log("  /     \\")
  console.log(
    " " + (root?.left?.value || -1) + "      " + (root?.right?.value || -1)
  )
  if (root?.left) {
    printNodes(root.left)
  }
  if (root?.right) {
    printNodes(root.right)
  }
}

const print2DUtil = <T>(root: NodeType<T>, space: number) => {
  const count = 5

  space += count

  if(root?.right) print2DUtil(root.right, space)

  console.log('')
  for (let i = count; i < space; i++)
    process.stdout.write(' ')
  console.log(root.value)

  if(root?.left) print2DUtil(root.left, space)
}

const findInsertLocation = <T>(
  root: NodeType<T>,
  node: NodeType<T>
): NodeType<T> => {
  let direction: NodeType<T>

  if (node.value > root.value) {
    direction = root.right || root
  } else {
    direction = root.left || root
  }

  if (direction === root) {
    return root
  }
  return findInsertLocation(direction, node)
}

const nodeInsert = <T>(root: NodeType<T>, node: NodeType<T>): void => {
  const insertNode = findInsertLocation(root, node)
  if (node.value < insertNode.value) {
    insertNode.left = node
  } else {
    insertNode.right = node
  }
}

const rootNode: NodeType<number> = nodeNew(0)
let start: NodeType<number> = rootNode

console.log("---simple node---")
for (let val of numbers) {
  let newNode: NodeType<number> = nodeNew(val)
  start = simpleNodeAdd(start, newNode)
}
//printNodes(rootNode)
let space: number = 0
print2DUtil(rootNode, space)

//-----
const iRootNode: NodeType<number> = nodeNew(0)
console.log("\n\n---insert node---")
for (let val of numbers) {
  let newNode: NodeType<number> = nodeNew(val)
  nodeInsert(iRootNode, newNode)
}

//printNodes(iRootNode)
space = 0
print2DUtil(iRootNode, space)
