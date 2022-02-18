import AppLayout from '@components/AppLayout'
import { Layout, Menu } from 'antd'
import React from 'react'
import { FC } from 'react'

const { Sider, Content } = Layout

const Quiz = () => {
  return (
    <>
      <AppLayout>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              style={{
                height: '100%',
                borderRight: 0,
              }}
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
            </Menu>
          </Sider>
          <Content>퀴즈</Content>
        </Layout>
      </AppLayout>
    </>
  )
}
export default Quiz
