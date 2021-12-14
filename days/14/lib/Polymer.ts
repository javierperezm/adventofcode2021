import { IStringNumberMap, IStringStringMap } from 'lib/types'

export interface IPolymerStepResults {
  step: number
  result: number
}

export default class Polymer {
  private molecules: IStringNumberMap
  private atoms: IStringNumberMap
  private rules: IStringStringMap
  private step: number

  constructor(polymer: string, rules: IStringStringMap) {
    this.step = 0
    this.molecules = {}
    this.atoms = {}
    this.rules = rules
    this.textToMolecules(polymer)
    this.textToAtoms(polymer)
  }

  doStep(): IPolymerStepResults {
    this.step++

    const newMolecules: IStringNumberMap = {}
    let moleculesList = Object.keys(this.molecules)

    for (let idx = 0; idx < moleculesList.length; idx++) {
      const molecule = moleculesList[idx]
      const insertion = this.rules[molecule]
      if (insertion) {
        Polymer.addKey(insertion, this.atoms, this.molecules[molecule])
        Polymer.addKey(
          molecule[0] + insertion,
          newMolecules,
          this.molecules[molecule]
        )
        Polymer.addKey(
          insertion + molecule[1],
          newMolecules,
          this.molecules[molecule]
        )
        delete this.molecules[molecule]
      }
    }

    Object.keys(newMolecules).forEach((molecule) => {
      Polymer.addKey(molecule, this.molecules, newMolecules[molecule])
    })

    return {
      step: this.step,
      result: this.calculateResult(),
    }
  }

  private calculateResult(): number {
    let greatest = 0
    let lowest = Number.MAX_SAFE_INTEGER

    Object.keys(this.atoms).forEach((a) => {
      greatest = Math.max(greatest, this.atoms[a])
      lowest = Math.min(lowest, this.atoms[a])
    })

    return greatest - lowest
  }

  private textToMolecules(text: string): void {
    for (let idx = 0; idx < text.length - 1; idx++) {
      Polymer.addKey(text.substring(idx, idx + 2), this.molecules)
    }
  }

  private textToAtoms(text: string) {
    text.split('').forEach((a) => Polymer.addKey(a, this.atoms))
  }

  protected static addKey(
    key: string,
    keyMap: IStringNumberMap,
    quantity: number = 1
  ): void {
    keyMap[key] = keyMap[key] ? keyMap[key] + quantity : quantity
  }
}
