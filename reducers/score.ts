import { createSlice } from '@reduxjs/toolkit'
import { addScore, getScore } from '@actions/score'
import { addSecondScore } from '../actions/score'

export type QueryResult = {
  title: string
  href: string
  consonant: Array<string>
  noSpaceTitle: string
}

type BasketItem = {
  id: string | undefined // 원시값이 제대로 할당되지 않을 경우 undefined
  href: string
}

export type ScoreState = {
  // 새로운 score 등록할 때
  score: Array<QueryResult> | null

  result: string[] | null
  basket: BasketItem[] | null // 악보 체크된 것들 장바구니

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
  basket: null,

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
  reducers: {
    resetResult(state) {
      state.result = null
    },
    resetBasket(state) {
      state.basket = null
    },
    addBasket(state, action) {
      if (!state.basket) {
        // 빈 경우
        state.basket = []
      }
      const count = state.basket.length.toString()
      const item = { id: count, href: action.payload }
      // console.log('item')
      // console.log(item)
      // state.basket?.unshift({ id: count, href: action.payload }) // 가장 앞으로 추가.
      state.basket.push(item)
    },
    removeBasket(state, action) {
      if (!state.basket) {
        // 빈 경우
        state.basket = []
      } else {
        // mutate   2번째 인자 : 갯수
        state.basket.splice(
          state.basket.findIndex((v) => v.href === action.payload),
          1,
        )
        // 하나만 있던 것을 없애면 [] 빈 배열로 됨. --> truely 로 판단되어서 null로 다시 초기화
        if (state.basket.length === 0) state.basket = null
      }
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
