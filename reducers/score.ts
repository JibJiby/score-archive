import { createSlice } from '@reduxjs/toolkit'

export type QueryResult = {
  title: string
  href: string
  consonant: Array<string>
}

export type ScoreState = {
  score: Array<QueryResult> | null
  result: string[] | null
}

const initialState: ScoreState = {
  score: null,
  result: null,
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
  extraReducers: (builder) => {
    //builer
  },
})

export default scoreSlice
