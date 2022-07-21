import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import AppLayout from '@components/AppLayout'
import ScoreSearch from '@components/ScoreSearch'
import ScoreResultList from '@components/ScoreResultList'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true })
    }
  }, [user])

  return (
    <>
      {user ? (
        <AppLayout>
          <ScoreSearch />
          <ScoreResultList />
        </AppLayout>
      ) : null}
    </>
  )
}
export default Home
