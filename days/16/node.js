const readfile = require('../../lib/readfile')

const TEST_MODE = false
const dataFile = './public/data/16' + (TEST_MODE ? 'test' : '') + '.txt'

const hex2bin = (num) => parseInt(num, 16).toString(2).padStart(4, '0')
const bin2dec = (num) => parseInt(num, 2)

function ChunkStream(hexChunk, isBinary = false) {
  this.hexQueue = isBinary ? [] : hexChunk.split('')
  this.binQueue = isBinary ? hexChunk.split('') : []
  this.status = true

  this.read = () => {
    this.status = true

    const V = popd(3)
    const T = popd(3)

    const pack = new Pack(T, V)

    try {
      if (T === 4) {
        pack.value = this._readLiteralValue()
      } else {
        pack.children =
          popd(1) === 0
            ? this._readOperatorChunk()
            : this._readOperatorSubpackets()
      }
    } catch (exception) {
      console.error(exception)
    }

    return this.status ? pack : null
  }

  this._readOperatorChunk = () => {
    const L = popd(15)
    if (L === 0 && !this.status) return null

    const P = pop(L)
    const stream = new ChunkStream(P, true)

    const packs = []
    let pack
    while ((pack = stream.read())) {
      packs.push(pack)
    }

    return packs
  }

  this._readOperatorSubpackets = () => {
    const packs = []

    let L = popd(11)
    if (L === 0 && !this.status) return null

    while (L--) {
      const pack = this.read()
      if (pack) {
        packs.push(pack)
      } else {
        break
      }
    }

    return packs
  }

  this._readLiteralValue = () => {
    /** @type {string[]} */
    let values = []
    /** @type {number} */
    let valueControlKey
    do {
      valueControlKey = popd(1)
      values = values.concat(pop(4))
    } while (valueControlKey === 1)

    return bin2dec(values.join(''))
  }

  const popd = (n) => bin2dec(pop(n))
  const pop = (n) => {
    while (this.binQueue.length < n) {
      if (this.hexQueue.length === 0) {
        this.status = false
        return 0
      }
      this.binQueue = this.binQueue.concat(
        hex2bin(this.hexQueue.shift()).split('')
      )
    }
    const bin = this.binQueue.slice(0, n).join('')
    this.binQueue = this.binQueue.slice(n)
    return bin
  }
}

class Pack {
  type
  version
  value
  children
  constructor(type, version) {
    this.type = type
    this.version = version
    this.children = []
  }

  sumVersions() {
    return (
      this.version +
      (this.children.length
        ? this.children.map((p) => p.sumVersions()).reduce((a, v) => a + v)
        : 0)
    )
  }

  getValue() {
    switch (this.type) {
      case 0: // sum
        return this.children
          .map((pack) => pack.getValue())
          .reduce((acc, val) => acc + val)
      case 1: // product
        return this.children
          .map((pack) => pack.getValue())
          .reduce((acc, val) => acc * val)
      case 2: // minimum
        let min = Number.MAX_SAFE_INTEGER
        this.children.forEach((pack) => (min = Math.min(min, pack.getValue())))
        return min
      case 3: // maximum
        let max = 0
        this.children.forEach((pack) => (max = Math.max(max, pack.getValue())))
        return max
      case 4: // value
        return this.value
      case 5: // greater than
        return this.children[0].getValue() > this.children[1].getValue() ? 1 : 0
      case 6: // less than
        return this.children[0].getValue() < this.children[1].getValue() ? 1 : 0
      case 7: // equal to
        return this.children[0].getValue() == this.children[1].getValue()
          ? 1
          : 0
    }
  }
}

const sumVersions = (packhash) => new ChunkStream(packhash).read().sumVersions()
const getValue = (packhash) => new ChunkStream(packhash).read().getValue()

if (TEST_MODE) {
  // 110   100   10111 11110 00101  000
  // V=6 - T=4 - A     B     C=2021
  console.assert(sumVersions('D2FE28') === 6, 'demo 1 FAILED')

  // 001 110 0 000000000011011 11010001010 0101001000100100 0000000
  // VVV TTT I LLLLLLLLLLLLLLL AAAAAAAAAAA BBBBBBBBBBBBBBBB
  console.assert(sumVersions('38006F45291200') === 9, 'demo 2 FAILED')

  // 111 011 1 00000000011 01010000001 10010000010 00110000011 00000
  // VVV TTT I LLLLLLLLLLL AAAAAAAAAAA BBBBBBBBBBB CCCCCCCCCCC
  // V=7 T=3 1 3           1           2           3
  console.assert(sumVersions('EE00D40C823060') === 14, 'demo 3 FAILED')

  console.assert(sumVersions('8A004A801A8002F478') === 16, '1st FAILED')
  console.assert(sumVersions('620080001611562C8802118E34') === 12, '2nd FAILED')

  console.assert(
    sumVersions('C0015000016115A2E0802F182340') === 23,
    '3rd FAILED'
  )
  console.assert(
    sumVersions('A0016C880162017C3686B18A3D4780') === 31,
    '4th FAILED'
  )

  console.assert(getValue('C200B40A82') === 3, 'part II - 1st FAILED')
  console.assert(getValue('04005AC33890') === 54, 'part II - 2nd FAILED')
  console.assert(getValue('880086C3E88112') === 7, 'part II - 3rd FAILED')
  console.assert(getValue('CE00C43D881120') === 9, 'part II - 4th FAILED')
  console.assert(getValue('D8005AC2A8F0') === 1, 'part II - 5th FAILED')
  console.assert(getValue('F600BC2D8F') === 0, 'part II - 6th FAILED')
  console.assert(getValue('9C005AC2F8F0') === 0, 'part II - 7th FAILED')
  console.assert(
    getValue('9C0141080250320F1802104A08') === 1,
    'part II - 8th FAILED'
  )
} else {
  readfile(dataFile, (line) => {
    console.log(sumVersions(line))
    console.log(getValue(line))
  })
}
