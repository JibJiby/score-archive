import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import scoreSlice from './score'

const rootReducer = combineReducers({
  score: scoreSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// https://redux-toolkit.js.org/usage/usage-with-typescript
// export type RootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof persistedReducer>

// export default rootReducer
export default persistedReducer
