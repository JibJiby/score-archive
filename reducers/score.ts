import { createSlice } from '@reduxjs/toolkit'

export type ScoreState = {
  score: string | null
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
