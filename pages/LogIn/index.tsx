import useInput from '@hooks/useInput'
import fetcher from '@utils/fetcher'
import axios from 'axios'
import React, { ColgroupHTMLAttributes, useCallback, useState } from 'react'
import useSWR from 'swr'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { Navigate } from 'react-router-dom'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
}

const LogIn = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher)

  const [logInError, setLogInError] = useState(false)
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      setLogInError(false)
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          //https://swr.vercel.app/blog/swr-v1#change-revalidate-to-mutate
          mutate()
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401)
        })
    },
    [email, password],
  )

  if (data === undefined) {
    return <div>로딩중...</div>
  }

  if (data) {
    return <Navigate to="/home" />
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* 중앙 정렬을 위한 div */}
      <div style={{ width: '100%' }}>
        <Row>
          <Col xs={20}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LogIn
