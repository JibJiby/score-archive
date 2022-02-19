import scoreSlice from '@reducers/score'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { buttonStyle, inputStyle, logoStyle } from './styles'
import useInput from '@hooks/useInput'
import { firestore } from '../../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, listAll } from 'firebase/storage'

const ScoreSearch = () => {
  const [scoreTitle, onChangeScoreTitle] = useInput('')
  const dispatch = useDispatch()

  const onClickSearchBtn = useCallback(() => {
    dispatch(scoreSlice.actions.setScore(scoreTitle))
  }, [scoreTitle])

  //https://github.com/JamieCurnow/firebase-v9-typescript-example/blob/main/src/composables/useDb.ts

  // 단순화 하는 과정
  //https://javascript.plainenglish.io/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099

  useEffect(() => {
    ;(async () => {
      const scoreCol = collection(firestore, 'score')
      const scoreRef = doc(scoreCol, '7QwInD4KWok3vXafkjya')
      const result = await getDoc(scoreRef)
      console.log(result.data())

      console.log('-'.repeat(100))

      //https://firebase.google.com/docs/storage/web/create-reference?hl=ko
      const storage = getStorage()
      const storageRef = ref(storage, 'images/abc.jpeg')
      console.log(storageRef.name)
      console.log(storageRef.fullPath)

      //https://firebase.google.com/docs/storage/web/download-files?hl=ko#create_a_reference
      // const gsHref = storageRef.toString()
      // console.log(gsHref) // gs:// ~~~

      const url = await getDownloadURL(storageRef)
      console.log(url)

      const url2 = await getDownloadURL(ref(storage, '찬양하세.jpeg')) // 갑자기 됨 ??
      // const url2 = await getDownloadURL(ref(storage, 'images/찬양하세.jpeg'))
      console.log(url2)
    })()
  }, [])

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
      >
        검색
      </button>
    </div>
  )
}

export default ScoreSearch
