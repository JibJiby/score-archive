import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchButton, SearchInput } from './styles'
import useInput from '@hooks/useInput'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { message } from 'antd'
import { getScore } from '@actions/score'
import { RootState } from '@reducers/index'
import { ScoreState } from '@reducers/score'
import getScoreTitleList from '@utils/getScoreTitleList'

const ScoreSearch = () => {
  // const [scoreTitle, onChangeScoreTitle] = useInput('')
  const [scoreTitle, setScoreTitle] = useState('')
  const [scoreTitleList, setScoreTitleList] = useState<string[]>([])
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const btnRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { result } = useSelector<RootState, ScoreState>((state) => state.score)

  const onClickSearchBtn = useCallback(async () => {
    if (!user) {
      message.warn('로그인이 필요합니다.')
      return
    }
    dispatch(getScore(scoreTitle))
  }, [user, scoreTitle])

  const onChangeScoreTitle = useCallback(
    (e) => {
      setScoreTitle(e.target.value)

      const noSpacedTitleList = scoreTitleList.map((v) => v.replace(/\s/g, ''))
      const candidate = noSpacedTitleList.filter((v) => v.includes(scoreTitle))
      if (scoreTitle.length > 0 && candidate.length > 0) {
        // console.log('후보 대상')
        console.log(candidate)
      }
    },
    [scoreTitle, scoreTitleList],
  )

  // For Autocomplete
  useEffect(() => {
    if (!user) {
      return
    }
    let scoreTitleList
    ;(async () => {
      scoreTitleList = await getScoreTitleList()
      // console.log('scoreTitleList')
      // console.log(scoreTitleList)

      setScoreTitleList([...scoreTitleList])
    })()
  }, [user])

  useEffect(() => {
    if (result) {
      // 검색 결과가 있는 경우 키보드 사라지게 하기
      inputRef?.current?.blur()
    }
  }, [result])

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
        <SearchInput
          ref={inputRef}
          value={scoreTitle}
          onChange={onChangeScoreTitle}
          placeholder="악보 제목을 입력해주세요."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if (btnRef.current) {
                btnRef.current.click()
              }
            }
          }}
        />
      </div>
      <SearchButton onClick={onClickSearchBtn} ref={btnRef}>
        검색
      </SearchButton>
    </div>
  )
}

export default ScoreSearch
