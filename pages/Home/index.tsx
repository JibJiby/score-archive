import React from 'react'
import AppLayout from '@components/AppLayout'
import ScoreSearch from '@components/ScoreSearch'
import ScoreResultList from '@components/ScoreResultList'

const Home = () => {
  return (
    <>
      <AppLayout>
        <ScoreSearch />
        <ScoreResultList />
      </AppLayout>
    </>
  )
}
export default Home
