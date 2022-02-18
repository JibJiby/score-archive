import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

// 내가 예상한 대로.
import { MenuInfo } from 'rc-menu/lib/interface'

const { Header, Content } = Layout

const AppLayout: React.FC = ({ children }) => {
  const navigate = useNavigate()

  // https://github.com/ant-design/ant-design/issues/25467
  const onMenuClick = ({ key, keyPath }: MenuInfo) => {
    if (key === 'Home') {
      navigate('/home')
    } else if (key === 'Quiz') {
      navigate('/quiz')
    }
  }

  return (
    <>
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header style={{ width: '100%', height: '64px', color: 'white', background: '#343a40' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={onMenuClick}
            style={{
              background: '#343a40',
              fontSize: '18px',
              height: '64px',
            }}
          >
            <Menu.Item key="Home" style={{ color: 'white' }}>
              Home
            </Menu.Item>
            <Menu.Item key="Quiz" style={{ color: 'white' }}>
              Quiz
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ height: '100%' }}>{children}</Content>
      </Layout>
    </>
  )
}

export default AppLayout
