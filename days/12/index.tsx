import ActionButton from 'components/ActionButton'
import ChallengeLayout from 'layouts/ChallengeLayout'
import { loadFile } from 'lib/loadFile'
import { NextPage } from 'next'
import { MouseEventHandler, useEffect, useState } from 'react'

const Day12: NextPage = () => {
  useEffect(() => {
    loadFile('/12.txt', (data) => {})
  }, [])

  const handleStartClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    ;(e.target as HTMLButtonElement).disabled = true
  }

  return (
    <ChallengeLayout day={12} title="Passage Pathing" canvas={<h1>TODO</h1>}>
      <ActionButton onClick={handleStartClick}>START</ActionButton>
    </ChallengeLayout>
  )
}

export default Day12
