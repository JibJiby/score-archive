import { createSlice } from '@reduxjs/toolkit'
import { getScore } from '@actions/score'

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
}

const initialState: ScoreState = {
  score: null,
  result: null,
  // 악보 로딩 비동기 상태
  loadScoreLoading: false,
  loadScoreDone: false,
  loadScoreError: null,
}

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore(state, action) {
      state.score = action.payload
    },
    setResult(state, action) {
      state.result = action.payload
    },
  },
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
      }),
})

export default scoreSlice
