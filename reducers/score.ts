import { createSlice } from '@reduxjs/toolkit'
import { addScore, getScore } from '@actions/score'
import { addSecondScore } from '../actions/score'

export type QueryResult = {
  title: string
  href: string
  consonant: Array<string>
  noSpaceTitle: string
}

export type ScoreState = {
  // 새로운 score 등록할 때
  score: Array<QueryResult> | null

  result: string[] | null
  // 악보 로딩 비동기 상태
  loadScoreLoading: boolean
  loadScoreDone: boolean
  loadScoreError: string | null | undefined
  // 악보 추가 비동기 상태
  addScoreLoading: boolean
  addScoreDone: boolean
  addScoreError: string | null | undefined
  //
  // addSecondScoreLoading: boolean
  // addSecondScoreDone: boolean
  // addSecondScoreError: string | null | undefined
}

const initialState: ScoreState = {
  score: null,
  result: null,
  // 악보 로딩 비동기 상태
  loadScoreLoading: false,
  loadScoreDone: false,
  loadScoreError: null,
  // 악보 추가 비동기 상태
  addScoreLoading: false,
  addScoreDone: false,
  addScoreError: null,
  //
  // addSecondScoreLoading: false,
  // addSecondScoreDone: false,
  // addSecondScoreError: null,
}

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //getScore
      .addCase(getScore.pending, (state) => {
        state.loadScoreLoading = true
        state.loadScoreDone = false
        state.loadScoreError = null
      })
      .addCase(getScore.fulfilled, (state, action) => {
        state.loadScoreLoading = false
        state.loadScoreDone = true
        state.result = action.payload
      })
      .addCase(getScore.rejected, (state, action) => {
        state.loadScoreLoading = false
        state.loadScoreError = action.error.message
      })
      //addScore
      .addCase(addScore.pending, (state) => {
        state.addScoreLoading = true
        state.addScoreDone = false
        state.addScoreError = null
      })
      .addCase(addScore.fulfilled, (state, action) => {
        state.addScoreLoading = false
        state.addScoreDone = true
        // 파일 추가는 리스트를 전역 상태에 저장할 필요가 없지.
      })
      .addCase(addScore.rejected, (state, action) => {
        state.addScoreLoading = false
        state.addScoreError = action.error.message
      })
      // second Score (등록 + 추가 제목도)
      // 상태관리 간단하게 하기 위해 똑같은 state를 변경하는 걸로
      .addCase(addSecondScore.pending, (state) => {
        state.addScoreLoading = true
        state.addScoreDone = false
        state.addScoreError = null
      })
      .addCase(addSecondScore.fulfilled, (state, action) => {
        state.addScoreLoading = false
        state.addScoreDone = true
      })
      .addCase(addSecondScore.rejected, (state, action) => {
        state.addScoreLoading = false
        state.addScoreError = action.error.message
      }),
})

export default scoreSlice
