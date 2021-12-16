const readfile = require('../../lib/readfile')
const dataFile = './public/data/14.txt'

function textToMolecules(text) {
  const molecules = {}
  for (let idx = 0; idx < text.length - 1; idx++) {
    addMolecule(text.substring(idx, idx + 2), molecules)
  }
  return molecules
}

function textToAtoms(text) {
  const atoms = {}
  text.split('').forEach((a) => addMolecule(a, atoms))
  return atoms
}

function addMolecule(molecule, molecules, quantity = 1) {
  molecules[molecule] = molecules[molecule]
    ? molecules[molecule] + quantity
    : quantity
  return molecules
}

;(async () => {
  let polymerTemplate = null
  const insertionRules = {}
  await readfile(dataFile, (line) => {
    if (polymerTemplate === null) {
      polymerTemplate = line
    } else if (line.length > 0) {
      const rule = line.split(' -> ')
      insertionRules[rule[0]] = rule[1]
    }
  })

  const molecules = textToMolecules(polymerTemplate)
  const atoms = textToAtoms(polymerTemplate)

  for (let step = 1; step <= 40; step++) {
    const newMolecules = {}
    let moleculesList = Object.keys(molecules)

    for (let idx = 0; idx < moleculesList.length; idx++) {
      const molecule = moleculesList[idx]
      const insertion = insertionRules[molecule]
      if (insertion) {
        addMolecule(insertion, atoms, molecules[molecule])
        addMolecule(molecule[0] + insertion, newMolecules, molecules[molecule])
        addMolecule(insertion + molecule[1], newMolecules, molecules[molecule])
        delete molecules[molecule]
      }
    }

    Object.keys(newMolecules).forEach((molecule) => {
      addMolecule(molecule, molecules, newMolecules[molecule])
    })

    if (step === 10 || step === 40) {
      // count
      let greatest = 0
      let lowest = Number.MAX_SAFE_INTEGER
      Object.keys(atoms).forEach((a) => {
        greatest = Math.max(greatest, atoms[a])
        lowest = Math.min(lowest, atoms[a])
      })

      console.log('step', step, '=>', greatest - lowest)
    }
  }
})()
