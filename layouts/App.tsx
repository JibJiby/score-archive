import React from 'react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('@pages/Home'))
// const Quiz = loadable(() => import('@pages/Quiz'))
// const LogIn = loadable(() => import('@pages/LogIn'))
// const SignUp = loadable(() => import('@pages/SignUp'))

const App = () => {
  return (
    <Routes>
      {/* <Redirect  path="/" to="/login" /> */}
      {/* 참고 : https://www.inflearn.com/questions/417079 */}
      <Route path="/" element={<Home />} />
      {/* <Route path="/quiz" element={<Quiz />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} /> */}
    </Routes>
  )
}

export default App
