import { createSlice } from '@reduxjs/toolkit'

export type QueryResult = {
  title: string
  href: string
  consonant: Array<string>
}

export type ScoreState = {
  score: Array<QueryResult> | null
}

const initialState: ScoreState = {
  score: null,
}

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore(state, action) {
      state.score = action.payload
    },
  },
  extraReducers: (builder) => {
    //builer
  },
})

export default scoreSlice
