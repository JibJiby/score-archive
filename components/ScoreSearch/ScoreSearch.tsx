import scoreSlice from '@reducers/score'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { buttonStyle, inputStyle, logoStyle } from './styles'
import useInput from '@hooks/useInput'
import { firestore, storage } from '../../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { message } from 'antd'

const ScoreSearch = () => {
  const [scoreTitle, onChangeScoreTitle] = useInput('')
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const btnRef = useRef<HTMLButtonElement>(null)

  const onClickSearchBtn = useCallback(async () => {
    if (!user) {
      message.warn('로그인이 필요합니다.')
      return
    }

    // TODO: 훅으로 빼기 ??
    const scoreCol = collection(firestore, 'score')
    const q = query(scoreCol, where('noSpaceTitle', '==', scoreTitle.replace(/\s/g, '')))
    const snapshot = await getDocs(q)
    if (snapshot.empty) {
      message.warn('검색 결과가 없습니다!', 0.7)
      dispatch(scoreSlice.actions.setResult(null))
    } else {
      let resultHrefList
      try {
        //https://stackoverflow.com/questions/54100855/pushing-to-an-array-in-async-function-not-working
        resultHrefList = await Promise.all(
          snapshot.docs.map(async (v) => {
            let resultHref = v.data().href
            const url = await getDownloadURL(ref(storage, resultHref)) // 갑자기 됨 ??
            return url
          }),
        )
        console.log('resultHrefList')
        console.log(resultHrefList)
        dispatch(scoreSlice.actions.setResult(resultHrefList))
      } catch (e) {
        dispatch(scoreSlice.actions.setResult(null))
        message.warn('url이 유효하지 않습니다.')
        console.error(e)
      }
    }
  }, [scoreTitle])

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#f1f3f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          margin: '25px auto',
          fontSize: '30px',
          fontWeight: 700,
          userSelect: 'none',
          transition: 'all 0.5s',
        }}
        css={logoStyle}
      >
        악보 검색
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <input
          style={{
            margin: '50px auto',
            height: '3rem',
            // 너비
            minWidth: '250px',
            width: '50%',
            maxWidth: '768px',
            //
            outline: 'none',
            border: 0,
            fontSize: '16px',
            padding: '10px',
            borderRadius: '6px',
          }}
          css={inputStyle}
          value={scoreTitle}
          onChange={onChangeScoreTitle}
          placeholder="악보 제목을 입력해주세요."
          /* TODO: 엔터사용시 button 클릭 이벤트 */
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if (btnRef.current) {
                btnRef.current.click()
              }
            }
          }}
        />
      </div>
      <button
        style={{
          width: '200px',
          height: '2.5rem',
          margin: '15px auto',
          border: 0,
          borderRadius: '6px',
          fontSize: '20px',
          backgroundColor: '#001C34',
          color: 'white',
          fontWeight: 'bold',
          userSelect: 'none',
          cursor: 'pointer',
          transition: 'all 0.5s',
        }}
        css={buttonStyle}
        onClick={onClickSearchBtn}
        ref={btnRef}
      >
        검색
      </button>
    </div>
  )
}

export default ScoreSearch
