import Loading from 'components/Loading'
import ChallengePageLayout from 'layouts/ChallengePageLayout'
import { NextPage } from 'next'

const Day16: NextPage = () => {
  const handleOnLoad = (data: string[]): void => {}

  const handleOnRun = () => {}

  return (
    <ChallengePageLayout
      day={16}
      title="Packet Decoder"
      onRun={handleOnRun}
      onLoadFile={handleOnLoad}
    >
      <Loading />
    </ChallengePageLayout>
  )
}

export default Day16
