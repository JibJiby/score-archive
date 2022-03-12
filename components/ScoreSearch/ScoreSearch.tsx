import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CandidateItem, Container, HeaderText, SearchButton, SearchInput, SearchWrapper } from './styles'
import useInput from '@hooks/useInput'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { message } from 'antd'
import { getScore } from '@actions/score'
import { RootState } from '@reducers/index'
import { ScoreState } from '@reducers/score'
import getScoreTitleList from '@utils/getScoreTitleList'
import SearchIcon from '@assets/search.svg'
import ClearIcon from '@assets/clear.svg'

const ScoreSearch = () => {
  // const [scoreTitle, onChangeScoreTitle, setScoreTitle] = useInput('')
  const [scoreTitle, setScoreTitle] = useState('')
  const [scoreTitleList, setScoreTitleList] = useState<string[]>([])
  const [candidateList, setCandidateList] = useState<string[]>([])
  const [clickCandidate, setClickCandidate] = useState(false)
  const [visiableCandidate, setVisiableCandidate] = useState(false)
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
    console.log('user')
    console.log(user)
    dispatch(getScore(scoreTitle))
  }, [user, scoreTitle])

  const onChangeScoreTitle = useCallback(
    (e) => {
      setScoreTitle(e.target.value)
      if (!visiableCandidate) setVisiableCandidate(true)
    },
    [visiableCandidate],
  )

  useEffect(() => {
    if (clickCandidate) {
      btnRef?.current?.click()
      setClickCandidate(false)
    }
  }, [clickCandidate])

  // For Autocomplete
  useEffect(() => {
    if (!user) {
      return
    }
    let scoreTitleList
    ;(async () => {
      scoreTitleList = await getScoreTitleList()
      console.log('scoreTitleList')
      console.log(scoreTitleList)

      setScoreTitleList([...scoreTitleList])
    })()
  }, [user])

  useEffect(() => {
    if (result) {
      // 검색 결과가 있는 경우 키보드 사라지게 하기
      inputRef?.current?.blur()
    }
  }, [result])

  // 관련 검색 기능
  useEffect(() => {
    if (scoreTitle) {
      // const noSpacedTitleList = scoreTitleList.map((v) => v.replace(/\s/g, ''))
      // const candidate = noSpacedTitleList.filter((v) => scoreTitle.length > 0 && v.includes(scoreTitle))

      // 빈칸 포함.
      const candidate = scoreTitleList.filter(
        (v) => scoreTitle.length > 0 && v.replace(/\s/g, '').includes(scoreTitle.replace(/\s/g, '')),
      )

      if (scoreTitle.length > 0 && candidate.length > 0) {
        setCandidateList([...candidate])
      }
    } else {
      setCandidateList([])
    }
  }, [scoreTitle])

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
        <SearchWrapper typing={!!scoreTitle}>
          <SearchIcon width="16" height="16" style={{ margin: '0 0 0 16px' }} fill="gray" />
          <SearchInput
            ref={inputRef}
            value={scoreTitle}
            onChange={onChangeScoreTitle}
            onClick={() => {
              setVisiableCandidate(true)
            }}
            placeholder="악보 제목을 입력해주세요."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (btnRef.current) {
                  btnRef.current.click()
                  setVisiableCandidate(false)
                }
              }
            }}
          />
          <div
            style={{ margin: '0 14px 0 0', cursor: 'pointer', display: scoreTitle ? 'initial' : 'none' }}
            onClick={() => {
              setScoreTitle('')
            }}
          >
            <ClearIcon width="12" height="12" fill="gray" />
          </div>
          {scoreTitle && visiableCandidate && (
            <div
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                width: '100%',
                top: '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '0 0 6px 6px',
                outline: 'none',
                // wrapper box shadow와 동일.
                boxShadow: '0 1px 0 rgb(68 121 178 / 8%), 0 2px 10px rgb(68 121 178 / 8%)',
              }}
            >
              {/* <div>검색 후보들</div> */}
              {candidateList.length > 0 &&
                candidateList.map((v) => (
                  <CandidateItem
                    key={v}
                    onClick={() => {
                      setScoreTitle(v)
                      setClickCandidate(true) // 완성된 scoreTitle로 click하기 위해 useEffect 사용
                      setVisiableCandidate(false)
                    }}
                  >
                    {v}
                  </CandidateItem>
                ))}
            </div>
          )}
        </SearchWrapper>
      </div>
      <SearchButton onClick={onClickSearchBtn} ref={btnRef}>
        검색
      </SearchButton>
    </Container>
  )
}

export default ScoreSearch
