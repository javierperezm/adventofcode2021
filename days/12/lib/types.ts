export interface IScores {
  part1: number
  part2: number
}

interface ICaveNode {
  name: string
  next: string[]
}

export interface ICaveNodesList {
  [key: string]: ICaveNode
}
