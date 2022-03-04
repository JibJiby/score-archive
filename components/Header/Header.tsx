import React, { useCallback } from 'react'
import { headerStyle, LoginButton, Logo, NewScoreButton, userButtonWrapperStyle } from './styles'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import logoImg from '@assets/logo.png'

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
          navigate('/')
        }}
      >
        <img src={logoImg} style={{ width: '100%' }} />
      </Logo>
      {user ? (
        <div css={userButtonWrapperStyle}>
          <NewScoreButton
            onClick={() => {
              navigate('/newscore')
            }}
          >
            추가
          </NewScoreButton>
          <LoginButton onClick={onLogout}>로그아웃</LoginButton>
        </div>
      ) : (
        <LoginButton onClick={onLogin}>로그인</LoginButton>
      )}
    </header>
  )
}

export default Header
