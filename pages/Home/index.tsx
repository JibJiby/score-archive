import React, { useEffect } from 'react'
import AppLayout from '@components/AppLayout'
import ScoreSearch from '@components/ScoreSearch'
import { useSelector } from 'react-redux'
import { RootState } from '@reducers/index'
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const Home = () => {
  const score = useSelector<RootState>((state) => state.score)
  //https://firebase.google.com/docs/auth/web/manage-users?hl=ko#web-version-9_1
  console.log('auth.currentUser')
  console.log(auth.currentUser) // 기본값 null 로그인 완료하면 객체

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인
      } else {
        // 로그아웃되었을 때
      }
    })
  }, [auth])

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
