import React from 'react'
import Header from './Header'

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ width: '100%' }}>{children}</div>
    </>
  )
}

export default AppLayout
