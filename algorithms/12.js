const readfile = require('./readfile')

;(async () => {
  const nodes = {}

  const validSmallCaves = (caves, exception) => {
    if (caves === undefined) return true

    const smallCaves = {}
    caves
      .filter(
        (name) =>
          !['start', 'end'].includes(name) && name.toUpperCase() !== name
      )
      .forEach((name) => {
        smallCaves[name] = smallCaves[name] ? smallCaves[name] + 1 : 1
      })

    // how many small caves repeated more than 1
    let moreThanOne = Object.keys(smallCaves).filter(
      (name) => smallCaves[name] > 1
    )
    // no caves repeated => ok
    if (moreThanOne.length === 0) return true

    // no exception: the small caves cannot be repeated
    if (!exception) return false

    // with exception: one small cave can be repeated twice
    return moreThanOne.length === 1 && smallCaves[moreThanOne[0]] === 2
  }

  const addConnection = (node1, node2) => {
    if (node2 !== 'start') nodes[node1].next.push(node2)
    if (node1 !== 'start') nodes[node2].next.push(node1)
  }

  await readfile('./algorithms/12.txt', (line) => {
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

  const findPaths = (node, previous) => {
    const path = previous === undefined ? [node.name] : [...previous, node.name]
    if (!validSmallCaves(path, false)) return []

    if (node.name === 'end') {
      return [path]
    }

    let paths = []
    node.next.forEach((next) => {
      if (next === 'start') return
      const newPaths = findPaths(nodes[next], path)
      newPaths.forEach((path) => paths.push(path))
    })

    return paths
  }

  const paths = findPaths(nodes['start'])

  // part 1 => 4549
  // part 2 => 120535
  console.log(paths.length)
})()
