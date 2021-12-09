import Matrix from 'components/Matrix'
import useMatrix, { IPoint } from 'hooks/useMatrix'
import type { NextPage } from 'next'
import React, { MouseEventHandler, useState } from 'react'
import { PanelContainer, Result } from './Day09.styles'

const Day092: NextPage = () => {
  const matrix = useMatrix('/09.txt')
  const [riskSum, setRiskSum] = useState<number>()
  const [basinsResult, setBasinsResult] = useState<number>()
  const [lowestPoints, setLowestPoints] = useState<IPoint[]>([])

  const handleLowestPointsClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    ;(e.target as any).disabled = true

    const lowestPoints = matrix.getLowestPoints()
    setLowestPoints(lowestPoints)

    setRiskSum(
      lowestPoints
        .map((val) => matrix.getHeight(val) + 1)
        .reduce((acc, val) => acc + val)
    )
  }

  const handleGetBasinsClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    ;(e.target as any).disabled = true

    const newMatrixData = matrix.backup()

    const basins = lowestPoints.map((point) => {
      const basin = matrix.getBasins(point)
      matrix.setPoints(newMatrixData, basin, 10)
      return basin
    })

    const basinsResult = basins
      .map((val) => val.length)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b)

    setBasinsResult(basinsResult)

    matrix.restore(newMatrixData)
  }

  return (
    <Matrix matrix={matrix}>
      <PanelContainer>
        <button onClick={handleLowestPointsClick}>get lowest points</button>
        <Result>{riskSum}</Result>

        <button onClick={handleGetBasinsClick} disabled={!riskSum}>
          get basins
        </button>
        <Result>{basinsResult}</Result>
      </PanelContainer>
    </Matrix>
  )
}

export default Day092
