import React from 'react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('@pages/Home'))
const LogIn = loadable(() => import('@pages/LogIn'))
const NewScore = loadable(() => import('@pages/NewScore'))
const Download = loadable(() => import('@pages/Download'))

const App = () => {
  return (
    <Routes>
      {/* <Redirect  path="/" to="/login" /> */}
      {/* 참고 : https://www.inflearn.com/questions/417079 */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/newscore" element={<NewScore />} />
      <Route path="/download" element={<Download />} />
    </Routes>
  )
}

export default App
