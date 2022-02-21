import React from 'react'
import { css } from '@emotion/react'
import { headerStyle, LoginButton, Logo } from './styles'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header css={headerStyle}>
      <Logo
        onClick={() => {
          console.log('/로 이동')
          navigate('/')
        }}
      >
        로고
      </Logo>
      <LoginButton
        onClick={() => {
          navigate('/login')
        }}
      >
        로그인 버튼
      </LoginButton>
    </header>
  )
}

export default Header
