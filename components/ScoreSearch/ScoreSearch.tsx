import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, HeaderText, SearchButton, SearchInput } from './styles'
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
  const [candidateList, setCandidateList] = useState<string[]>([])
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
      const candidate = noSpacedTitleList.filter((v) => scoreTitle.length > 0 && v.includes(scoreTitle))
      if (scoreTitle.length > 0 && candidate.length > 0) {
        // console.log('후보 대상')
        // console.log(candidate)
        setCandidateList([...candidate])
      }
    },
    [scoreTitle, scoreTitleList, candidateList],
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
    <Container>
      <HeaderText>악보 검색</HeaderText>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
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
        {/* <div
          style={{
            backgroundColor: 'yellow',
            position: 'absolute',
            top: '100px',
            left: '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>검색 후보들</div>
          {candidateList.length > 0 && candidateList.map((v) => <div>{v}</div>)}
        </div> */}
      </div>
      <SearchButton onClick={onClickSearchBtn} ref={btnRef}>
        검색
      </SearchButton>
    </Container>
  )
}

export default ScoreSearch
