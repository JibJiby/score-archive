import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const AppLayout: React.FC = ({ children }) => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div style={{ width: '100%' }}>{children}</div>
    </>
  )
}

export default AppLayout
