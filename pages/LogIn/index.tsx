import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useInput from '@hooks/useInput'
import { auth } from '../../firebase'
import { inputWrapperStyle } from './styles'
import { message } from 'antd'
import logoImg from '@assets/logo.png'

const LogIn = () => {
  const [email, onChangeEmail] = useInput('')
  const [password, onChangepassword] = useInput('')
  const navigate = useNavigate()

  // react firebase hooks
  // https://github.com/csfrequency/react-firebase-hooks/tree/ab6214822fdc0c280ea39e001db09bc2bbc5264d/auth#usesigninwithemailandpassword
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

  const onLoginClick = useCallback(async () => {
    // react firebase hooks
    // signInWithEmailAndPassword 로그인 성공 유무에 상관없이 undefined 반환
    await signInWithEmailAndPassword(email, password)
    // dependency 꼭 넣어서 업데이트 확인할 수 있게
  }, [email, password])

  useEffect(() => {
    if (user) {
      // 로그인 성공했다면
      navigate('/')
      message.success('로그인 성공', 0.4)
    }
  }, [user])

  useEffect(() => {
    // TODO: status 코드 별 분기 처리
    if (error) {
      // error 초기값인 undefined가 아니라면
      message.warn('로그인 실패하였습니다.', 0.8)
    }
  }, [error])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        userSelect: 'none',
        paddingTop: '30px',
      }}
    >
      <div
        style={{
          display: 'inline',
          width: '300px',
          height: '60px',
          marginBottom: '30px',
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate('/')
        }}
      >
        <img src={logoImg} style={{ width: '100%' }} />
      </div>
      <div className="input-wrapper" css={inputWrapperStyle}>
        <div
          style={{
            borderRadius: '6px 6px 0 0',
            boxShadow: 'none',
          }}
        >
          <input
            type="text"
            placeholder="아이디"
            style={{
              padding: '17px 18px 17px 19px',
              border: '1px solid #dadada',
              width: '100%',
              borderRadius: '6px 6px 0 0',
              textTransform: 'lowercase',
            }}
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            style={{
              padding: '17px 18px 17px 19px',
              border: '1px solid #dadada',
              width: '100%',
              borderRadius: '0 0 6px 6px',
            }}
            value={password}
            onChange={onChangepassword}
          />
        </div>
        <div
          style={{
            marginTop: '42px',
          }}
        >
          <button
            style={{
              backgroundColor: '#0c243b',
              width: '100%',
              display: 'block',
              borderRadius: '6px',
              border: 'solid 1px rgba(0,0,0,.15)',
              cursor: 'pointer',
              padding: '17px 0 15px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
            onClick={onLoginClick}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogIn
