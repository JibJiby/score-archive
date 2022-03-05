import { createSlice } from '@reduxjs/toolkit'

export type UserState = {
  me: any
}

const initialState: UserState = {
  me: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.me = action.payload
    },
    logout(state) {
      state.me = null
    },
  },
})

export default userSlice
