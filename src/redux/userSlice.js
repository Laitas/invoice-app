import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user: null,
 invoices : []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInvoices: (state, action) => {
      state.invoices = action.payload
    },
  },
});

export const {
    setUser, setInvoices
} = userSlice.actions
export default userSlice.reducer