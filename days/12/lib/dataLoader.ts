import { ICaveNodesList } from './types'

export default function dataLoader(data: string[]) {
  const nodes: ICaveNodesList = {}

  const addConnection = (node1: string, node2: string): void => {
    if (node2 !== 'start') nodes[node1].next.push(node2)
    if (node1 !== 'start') nodes[node2].next.push(node1)
  }

  data.forEach((line) => {
    const connectedNodes = line.split('-')

    // create new nodes
    connectedNodes.forEach((name) => {
      if (nodes[name] === undefined) {
        nodes[name] = { name, next: [] }
      }
    })

    // connect nodes
    addConnection(connectedNodes[0], connectedNodes[1])
  })

  return nodes
}
