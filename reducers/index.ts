import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'
import scoreSlice from './score'
import userSlice from './user'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  score: scoreSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// https://redux-toolkit.js.org/usage/usage-with-typescript
// export type RootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof persistedReducer>

// export default rootReducer
export default persistedReducer
