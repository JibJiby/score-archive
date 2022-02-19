import React from 'react'
import AppLayout from '@components/AppLayout'
import ScoreSearch from '@components/ScoreSearch'
import { useSelector } from 'react-redux'
import { RootState } from '@reducers/index'

const Home = () => {
  const score = useSelector<RootState>((state) => state.score)

  return (
    <>
      <AppLayout>
        <ScoreSearch />
        <div style={{ width: '100%' }}>{JSON.stringify(score)}</div>
      </AppLayout>
    </>
  )
}
export default Home
