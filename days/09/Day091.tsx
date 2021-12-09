import Matrix from 'components/Matrix'
import useMatrix from 'hooks/useMatrix'
import type { NextPage } from 'next'
import { MouseEventHandler, useState } from 'react'
import { PanelContainer, Result } from './Day09.styles'

const Day091: NextPage = () => {
  const matrix = useMatrix('/09.txt')
  const [riskSum, setRiskSum] = useState<number>()

  const handleLowestPointsClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    ;(e.target as any).disabled = true

    const riskPoints = matrix.getLowestPoints()

    setRiskSum(
      riskPoints
        .map((val) => matrix.getHeight(val) + 1)
        .reduce((acc, val) => acc + val)
    )

    matrix.markPoints(riskPoints, 10)
  }

  return (
    <Matrix matrix={matrix}>
      <PanelContainer>
        <button onClick={handleLowestPointsClick}>get lowest points</button>
        <Result>{riskSum}</Result>
      </PanelContainer>
    </Matrix>
  )
}

export default Day091
