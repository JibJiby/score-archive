import React, { useCallback } from 'react'
import { headerStyle, LoginButton, Logo } from './styles'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

const Header = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const onLogin = useCallback(() => {
    navigate('/login')
  }, [])

  const onLogout = useCallback(() => {
    signOut(auth)
  }, [auth])

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
      {user ? (
        <LoginButton onClick={onLogout}>로그아웃</LoginButton>
      ) : (
        <LoginButton onClick={onLogin}>로그인</LoginButton>
      )}
    </header>
  )
}

export default Header
