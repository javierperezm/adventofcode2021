class Caves {
  nodes = {}
  exception = false
  pathsPerMessage = 1
  counter = 0

  constructor(nodes, exception, pathsPerMessage) {
    this.nodes = nodes
    this.exception = exception
    this.pathsPerMessage = pathsPerMessage
  }

  validSmallCaves = (caves) => {
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
    if (!this.exception) return false

    // with exception: one small cave can be repeated twice
    return moreThanOne.length === 1 && smallCaves[moreThanOne[0]] === 2
  }

  findPaths = (node, previous) => {
    const path = previous === undefined ? [node.name] : [...previous, node.name]
    if (!this.validSmallCaves(path)) return

    if (node.name === 'end') {
      this.counter++
      if (this.counter % this.pathsPerMessage === 0) {
        postMessage({
          type: 'paths',
          paths: this.counter,
          exception: this.exception,
        })
      }
      return
    }

    node.next.forEach((next) => {
      if (next === 'start') return
      this.findPaths(this.nodes[next], path)
    })
  }
}

onmessage = function (e) {
  console.log('new message', e.data)

  const exception = e.data.exception
  const nodes = e.data.nodes
  const pathsPerMessage = e.data.pathsPerMessage

  const caves = new Caves(nodes, exception, pathsPerMessage)
  caves.findPaths(nodes['start'])

  postMessage({ type: 'end', paths: caves.counter, exception: exception })
}
