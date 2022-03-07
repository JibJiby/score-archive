import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from '@reducers/index'
import persistedReducer from '@reducers/index'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  // A non-serializable value was detected in ~ 에러 (redux-persist 관련 에러)
  // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
  // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: process.env.NODE_ENV !== 'production',
})

export default store
