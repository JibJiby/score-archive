import React from 'react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('@pages/Home'))
const LogIn = loadable(() => import('@pages/LogIn'))

const App = () => {
  return (
    <Routes>
      {/* <Redirect  path="/" to="/login" /> */}
      {/* 참고 : https://www.inflearn.com/questions/417079 */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  )
}

export default App
