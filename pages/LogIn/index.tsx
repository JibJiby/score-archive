import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import useInput from '@hooks/useInput'
import { auth } from '../../firebase'

const LogIn = () => {
  const [email, onChangeEmail] = useInput('')
  const [password, onChangepassword] = useInput('')
  const navigate = useNavigate()

  const onLoginClick = useCallback(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('user')
        console.log(user)
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        alert('로그인 오류')
      })
    // dependency 꼭 넣어서 업데이트 확인할 수 있게
  }, [email, password])

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
      <div
        className="input-wrapper"
        style={{
          padding: '24px',
          width: '553px',
        }}
      >
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
