import Loading from 'components/Loading'
import ChallengePageLayout from 'layouts/ChallengePageLayout'
import { NextPage } from 'next'

const Day15: NextPage = () => {
  const handleOnLoad = (data: string[]): void => {}

  const handleOnRun = () => {}

  return (
    <ChallengePageLayout
      day={15}
      title="Chiton"
      onRun={handleOnRun}
      onLoadFile={handleOnLoad}
    >
      <Loading />
    </ChallengePageLayout>
  )
}

export default Day15
