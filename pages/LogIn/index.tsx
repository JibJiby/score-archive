import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useInput from '@hooks/useInput'
import { auth } from '../../firebase'
import { inputWrapperStyle } from './styles'
import { message } from 'antd'

const LogIn = () => {
  const [email, onChangeEmail] = useInput('')
  const [password, onChangepassword] = useInput('')
  const navigate = useNavigate()

  // react firebase hooks
  // https://github.com/csfrequency/react-firebase-hooks/tree/ab6214822fdc0c280ea39e001db09bc2bbc5264d/auth#usesigninwithemailandpassword
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

  const onLoginClick = useCallback(async () => {
    // react firebase hooks
    try {
      const result = await signInWithEmailAndPassword(email, password)
      console.log(result)
      message.success('로그인 성공', 0.4)
    } catch (e) {
      console.error(e)
    }

    // dependency 꼭 넣어서 업데이트 확인할 수 있게
  }, [email, password])

  if (user) {
    // 로그인 중이거나 로그인 성공했다면
    navigate('/')
  }

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
      }}
    >
      <div
        style={{
          backgroundColor: 'tomato',
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
        로고
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
