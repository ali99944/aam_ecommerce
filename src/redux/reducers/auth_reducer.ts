import Customer from '@/src/types/customer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'



interface AuthState {
  isAuthenticated: boolean
  token: string | null
  customer: Customer | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  customer: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string
        customer: Customer
      }>
    ) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.customer = action.payload.customer
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.customer = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer