import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from '@reducers/index'
import persistedReducer from '@reducers/index'

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
