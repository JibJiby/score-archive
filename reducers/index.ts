import { combineReducers } from '@reduxjs/toolkit'
import scoreSlice from './score'

const rootReducer = combineReducers({
  score: scoreSlice.reducer,
})

// https://redux-toolkit.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
