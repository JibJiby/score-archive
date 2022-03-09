import React, { useCallback } from 'react'
import { headerStyle, LoginButton, Logo, NewScoreButton, userButtonWrapperStyle } from './styles'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import logoImg from '@assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import scoreSlice from '@reducers/score'
import userSlice, { UserState } from '@reducers/user'
import { RootState } from '@reducers/index'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const me = useSelector<RootState, UserState>((state) => state.user.me) // redux-persist

  const onLogin = useCallback(() => {
    navigate('/login')
  }, [])

  const onLogout = useCallback(() => {
    try {
      signOut(auth)
      dispatch(userSlice.actions.logout())
      dispatch(scoreSlice.actions.resetBasket())
      dispatch(scoreSlice.actions.resetResult())
      // FIXME:
      navigate('/')
    } catch (e) {
      console.error('로그아웃 중 에러.')
    }
  }, [auth])

  return (
    <header css={headerStyle}>
      <Logo
        onClick={() => {
          navigate('/')
          dispatch(scoreSlice.actions.resetResult())
        }}
      >
        <img src={logoImg} style={{ width: '100%' }} />
      </Logo>
      {/* {user ? ( */}
      {me ? (
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
